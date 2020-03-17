import React, { useState, useEffect} from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';
import Infobar from '../Infobar/Infobar'
import Input from '../Input/Input';
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer';
import './chat.css';
let socket = '';
function Chat({ location }) {
    const ENDPOINT = 'localhost:5000'
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState('')

    useEffect(() => {
       const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT)
        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, (error)=>{
            if(error) alert(error);
        });
       
    }, [ENDPOINT, location.search])

    useEffect(() => {
      socket.on('message', (message)=>{
        setMessages([...messages, message])
      })

      socket.on('roomData', ({ users }) => {
        setUsers(users);
      })
  
      return () => {
        socket.emit('disconnect');
  
        socket.off();
      } 

    }, [messages])


    const sendMessage = (event)=>{
        event.preventDefault();

        if(messages){
            socket.emit('sendMessage', message, ()=> setMessage(''));
        }

    }
   
    return (
        <div className="outerContainer">
            <div className="container">
                <Infobar room={room} />
                <Messages messages={messages} name={name} />
               <Input
                setMessage={setMessage}
                sendMessage={sendMessage}
                message={message}
               />
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat
