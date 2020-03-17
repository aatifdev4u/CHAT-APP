import React from 'react'
import './input.css';

function Input({ setMessage, sendMessage, message}) {
    return (
        <form className="form">
            <input
            onChange={(event)=> setMessage(event.target.value)}
            value={message}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            type="text"
            placeholder="Type a messsage..."
            className="input"
            />
            <button
                className="sendButton"
                onClick={(event)=> sendMessage(event)}
            >Send</button>
        </form>
    )
}

export default Input
