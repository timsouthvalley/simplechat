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

1. √Get a socket server working
2. √Get client to connect - generate client.
3. Send create chat
4. √Save chat, save perhaps ten messages
5. √List chats.
6. √Write to chat
7. √Print out chats.
8. Reconnect the socket
9. Add chat indent.
10. Separate out the server from the react app for better deployment.
11. More messages for setting user details etc.
12. Add help docs.
