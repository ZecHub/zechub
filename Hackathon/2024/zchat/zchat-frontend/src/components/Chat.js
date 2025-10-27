import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Chat.css';
import CryptoJS from 'crypto-js';

const Chat = () => {
  const { username } = useParams(); // Using the useParams hook to get the route parameters
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const token = localStorage.getItem('access_token');
  const [currentUser, setCurrentUser] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const ws = useRef(null);

  // Generate or use a shared key
  const secretKey = 'your-secret-key';

  // Encrypt a message
  const encryptMessage = (message) => {
    return CryptoJS.AES.encrypt(message, secretKey).toString();
  };

  // Decrypt a message
  const decryptMessage = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const value = bytes.toString(CryptoJS.enc.Utf8);
    if (value) {
      return value;
    }
    return ciphertext;
      // return value;
  };

  useEffect(() => {
    console.log("Fetching current user...");
    // Fetch client_id from backend
    fetch('https://zchat-api.onrender.com/users/me/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setCurrentUser(data);
      console.log(data);

      // Only create a WebSocket if one doesn't already exist
      if (!ws.current) {
        ws.current = new WebSocket(`ws://localhost:8000/ws/private/${data.id}`);

        ws.current.onopen = () => {
          setConnectionStatus('Connected');
          console.log('WebSocket connection opened');
        };

        ws.current.onmessage = (event) => {
          console.log('Message received:', event.data);
          const [sender, message] = event.data.split(": ");
          const dMessage = decryptMessage(message);
          setMessages(prevMessages => [...prevMessages, { sender_id:+sender, message: dMessage }]);
        };

        ws.current.onclose = (event) => {
          setConnectionStatus(`Disconnected: ${event.code}`);
          console.log('WebSocket connection closed:', event);
        };

        ws.current.onerror = (error) => {
          setConnectionStatus(`Error: ${error.message}`);
          console.error('WebSocket error:', error);
        };
      }
    })
    .catch(error => console.error('Error:', error));

    return () => {
      if (ws.current) {
        ws.current.close();
        console.log("WebSocket connection closed in cleanup");
        ws.current = null;  // Clear the ref to avoid issues if the component is remounted
      }
    };
  }, [token]);

  // Separate useEffect to fetch messages only after currentUser is set
useEffect(() => {
  if ( currentUser ) {
    // Fetch chat history
    fetch(`https://zchat-api.onrender.com/messages/${currentUser.username}/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      // .then(data => setMessages(data))
      .then(data => {
        const decryptedMessages = data.map(msg => {
          try {
            // Decrypt each message
            return {
              ...msg,
              message: decryptMessage(msg.message)  // Decrypt message here
            };
          } catch (error) {
            console.error('Decryption error:', error);
            return msg;  // Return message unmodified if decryption fails
          }
        });
        setMessages(decryptedMessages);  // Set decrypted messages
      })
      .catch(error => console.error('Error fetching messages:', error));
  }
}, [currentUser, username, token]);

  const sendMessage = (event) => {
    event.preventDefault();
    const eMessage = encryptMessage(messageText);
    if (messageText) {
        fetch('https://zchat-api.onrender.com/messages/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                sender: currentUser.username,      // Ensure this is correct
                receiver: username,       // Ensure this is correct
                message: eMessage      // Ensure this is correct
            }),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err });
            }
            setMessageText('');
        })
        .catch(error => console.error('Error sending message:', error));
    }
    if (ws.current && eMessage) {
      ws.current.send(eMessage);
      setMessageText('');
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <div className="status">{connectionStatus}</div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender_id === currentUser.id ? 'sent' : 'received'}`}>
            <div className="message-content">{msg.message}</div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          autoComplete="off"
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
      <Link to="/">Back to Users</Link>
    </div>
  );
};

export default Chat;
