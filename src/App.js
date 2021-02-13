import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { 
  Container,
  Paper, 
  InputBase,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(false);
  
  useEffect(() => {
    const socket = new WebSocket('wss://buster:3030');
    
    socket.addEventListener('message', (e) => {
      setMessages((a) => [e.data, ...a]);
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
    messages: {
      margin: '20px',
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 500,
    }
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
      <Paper className={classes.messages} >
        <List>
          {messages.map((m, k) => 
            <ListItem key={k}>
              <ListItemText primary={m} />
            </ListItem>
          )}
          {messages.length === 0 && (
            <ListItem>
              <ListItemText secondary="The chat messages will be shown here" />
            </ListItem>
          )}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
