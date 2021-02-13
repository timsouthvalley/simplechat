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
}

module.exports = Connection;
