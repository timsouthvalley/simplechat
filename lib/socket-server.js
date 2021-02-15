const EventEmitter = require("events");
const { Server } = require("ws");
const Connection = require("./connection");

class SocketServer extends EventEmitter {
  constructor(https) {
    super();
    
    this.connections = [];
    this.buffer = [];
    this.socket = new Server({ server: https });
    this.socket.on("error", (error) => console.error(`Socket error: ${error}`));
    this.socket.on("connection", this.onConnection.bind(this));
  }
  
  onConnection(client) {
    const connection = new Connection(client);
    
    connection.on(Connection.MESSAGE_BROADCAST, this.onMessageBroadcast.bind(this));
    client.on("close", this.onClose.bind(this, connection));

    this.connections.push(connection);

    // Write the inital message list
    connection.write(this.buffer);
  }

  onMessageBroadcast(message) {
    if (this.connections.length === 0) return;
    this.connections.forEach((connection) => connection.write(message));
    this.setToMessageBuffer(message);
  }

  onClose(connection) {
    const idx = this.connections.indexOf(connection);

    if (idx < 0) return;

    delete this.connections.splice(idx, 1);

    connection.close();
    connection = null;
  }

  setToMessageBuffer(message) {
    this.buffer.push(message);

    if (this.buffer.length > SocketServer.BUFFER_LENGTH) {
      this.buffer.shift();
    }
  }
}

SocketServer.BUFFER_LENGTH = 10;

module.exports = SocketServer;
