import React, { useEffect, useState, useRef } from 'react'
import SendIcon from '@material-ui/icons/Send';
import { 
  Container,
  Paper, 
  InputBase,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
} from '@material-ui/core';

const App = () => {
  const [clientId, setClientId] = useState(performance.now());
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(false);
  const scrollend = useRef();
  
  useEffect(() => {
    const socketLocation = process.env.REACT_APP_SOCKET_SERVER || '';
    const socket = new WebSocket(`wss://${socketLocation}`);
    
    socket.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      setMessages((a) => [...a, data]);
      scrollend.current.scrollIntoView({ behavior: 'smooth' });
    });
    
    socket.addEventListener('close', (e) => {
      setSocket(false);
    });
    
    setSocket(socket);
  }, []);
  const sendMesage = (e) => {
      e.preventDefault();
      if (message === '' || !socket) return;
      socket.send(JSON.stringify({
        name,
        message,
        clientId
      }));
      setMessage('');
  }
  return (
    <Container fixed className='main-container'>
      <Paper className='input-paper'>
        <InputBase 
          value={name}
          onChange={e => setName(e.target.value)} 
          className='input' 
          placeholder='Enter your name'
        />
      </Paper>
      <Paper className='messages-paper' >
        <List className='chat-list'>
          {messages.map((m, k) => 
            <ListItem className='list-item' key={k}>
              <ListItemAvatar className={clientId === m.clientId ? 'own' : ''}>
                <Avatar>{m.name.substring(0,1).toUpperCase()}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={m.message} />
            </ListItem>
          )}
          {messages.length === 0 && (
            <ListItem>
              <ListItemText secondary='The chat messages will be shown here' />
            </ListItem>
          )}
          <div ref={scrollend} />
        </List>
      </Paper>
      <Paper component='form' className='input-paper' onSubmit={sendMesage}>
        <InputBase 
          value={message}
          onChange={e => setMessage(e.target.value)} 
          className='input'
          placeholder='Enter something to chat'
        />
        <Divider className='divider' orientation='vertical' />
        <IconButton type='submit' className='icon-button'>
          <SendIcon />
        </IconButton>
      </Paper>
    </Container>
  );
}

export default App;
