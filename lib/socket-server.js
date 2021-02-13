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
    
    this.connections.push(connection);
  }
}

module.exports = SocketServer;
