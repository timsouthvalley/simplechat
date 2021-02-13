import React, { useEffect } from 'react'
import { Button, Container } from '@material-ui/core';

const App = () => {
  
  useEffect(() => {
    const socket = new WebSocket('wss://buster:3030');

    socket.addEventListener('open', function (event) {
      // TODO - handle open
    });

    socket.addEventListener('message', function (event) {
      // TODO - handle messages
    });
  }, []);

  return (
    <Container fixed>
      
    </Container>
  );
}

export default App;
