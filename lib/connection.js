const EventEmitter = require("events");

class Connection extends EventEmitter {
  constructor(client) {
    super();

    this.client = client;
    this.client.on("message", this.handleMessage.bind(this));
  }

  handleMessage(message) {
      // TODO - handle messages
  }
  
  close() {
    if (this.client) this.client.close();
    this.client = null;
  }
}

module.exports = Connection;
