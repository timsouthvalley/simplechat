const EventEmitter = require("events");
const { Server } = require("ws");
const Connection = require("./connection");

class SocketServer extends EventEmitter {
  constructor(https) {
    super();
    
    this.connections = [];
    this.socket = new Server({ server: https });
    this.socket.on("error", (error) => console.error(`Socket error: ${error}`));
    this.socket.on("connection", this.onConnection.bind(this));
  }
  
  onConnection(client) {
    const connection = new Connection(client);
    
    client.on("close", this.onClose.bind(this, connection));
    
    this.connections.push(connection);
  }
  
  onClose(connection) {
    const idx = this.connections.indexOf(connection);

    if (idx < 0) return;

    delete this.connections.splice(idx, 1);

    connection.close();
    connection = null;
    
  }
}

module.exports = SocketServer;
