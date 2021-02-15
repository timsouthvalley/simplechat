# A simple chat experiment

## Install

To install the application, use:

```.bash
nvm use
npm ci
```

## Running

To start the react app for development, use:

```.bash
HTTPS=true REACT_APP_SOCKET_SERVER=<domain>:3030  npm start
```

To start the socket server use nodemon, e.g.:

```.bash
PORT=3030 nodemon
```

##	HTTPS

You will need an HTTPS connection to allow the Chrome to connect to the socket:

~~~~~~~~~~~~~~~~~~~~~~~~~~.bash
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
~~~~~~~~~~~~~~~~~~~~~~~~~~

## Building

To build, do:

```.bash
npm run build
```
This will generate a build of the react app into `./build` - this can then be deployed by the socket server.

### Todo list

- [x] Get a socket server working
- [x] Get client to connect - generate client
- [ ] Send create chat
- [ ] Add tests
- [x] Save chat, save perhaps ten messages
- [x] List chats
- [x] Write to chat
- [x] Print out chats
- [x] Add a client id, save
- [ ] Reconnect the socket
- [ ] Add chat indent
- [ ] Separate out the server from the react app for better deployment.
- [ ] More messages for setting user details etc
- [ ] Add code doc

