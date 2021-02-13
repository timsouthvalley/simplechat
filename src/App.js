import React, { useEffect, useState } from 'react'
import { Container, Paper, InputBase, Divider, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';

const App = () => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(false);
  
  useEffect(() => {
    const socket = new WebSocket('wss://buster:3030');
    
    socket.addEventListener('message', (e) => {
      console.log(e.data);
    });
    
    socket.addEventListener('close', (e) => {
      setSocket(false);
    });
    
    setSocket(socket);
  }, []);
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: '20px',
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));
  const classes = useStyles();
  const sendMesage = (e) => {
      e.preventDefault();
      if (message === "" || !socket) return;
      socket.send(message);
      setMessage("");
  }
  return (
    <Container fixed>
      <Paper component="form" className={classes.root} onSubmit={sendMesage}>
        <InputBase 
          value={message}
          onChange={e => setMessage(e.target.value)} 
          className={classes.input} 
          placeholder="Enter something to chat"
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton type="submit" className={classes.iconButton}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Container>
  );
}

export default App;
