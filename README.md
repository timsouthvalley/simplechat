# Using simplechat

## Install

To install the application, use:

```.bash
npm ci
```

## Running

To start the react app, use:

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
