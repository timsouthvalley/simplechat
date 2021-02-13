const EventEmitter = require("events");

class Connection extends EventEmitter {
  constructor(client) {
    super();

    this.client = client;
    this.client.on("message", this.handleMessage.bind(this));
  }

  handleMessage(message) {
    this.emit(Connection.MESSAGE_BROADCAST, message);
  }
  
  write(message) {
    if (!this.client) return;
    this.client.send(message);
  }
  
  close() {
    if (this.client) this.client.close();
    this.client = null;
  }
}

Connection.MESSAGE_BROADCAST = "MESSAGE_BROADCAST";

module.exports = Connection;
