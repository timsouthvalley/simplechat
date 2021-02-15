const https =	require("https");
const handler = require("serve-handler");
const fs =	require("fs");
const { SocketServer } = require("./lib");

const PORT = process.env.PORT || 3030;
const httpServer = https.createServer({
  cert: fs.readFileSync(process.env.CERT || "./cert.pem"),
  key: fs.readFileSync(process.env.KEY || "./key.pem")
}, (req, res) => {
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");
  
  return handler(req, res, { public: "./build" });
  
}).listen(PORT);

const socketServer =	new SocketServer(httpServer);

if (socketServer) {
  console.log(`Server listening on port ${PORT}`)
}
