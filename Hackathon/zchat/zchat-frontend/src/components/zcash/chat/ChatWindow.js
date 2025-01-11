import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChatContext } from './contexts/ChatContext';
// import './Chat.css';
import CryptoJS from 'crypto-js';
import "../messages.css";

import send2 from "../assets/vectors/send_26_x2.svg";
import trash from "../assets/vectors/trash_8_x2.svg";

const ChatWindow = ({ transaction, onPopUpClick, chatData, setSenderData, setReceiverData }) => {
  const { updateChatList } = useContext(ChatContext);
  
  const { username } = useParams(); // Using the useParams hook to get the route parameters
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const token = localStorage.getItem('access_token');
  const [currentUser, setCurrentUser] = useState(null);
  const [receipientUser, setReceipientUser] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const ws = useRef(null);
  console.log(connectionStatus, Link)
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0'); // Add leading zero if needed
  const minutes = now.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
  const currentTime = `${hours}:${minutes}`;
  const messageContainerRef = useRef(null);

  // Generate or use a shared key
  const secretKey = 'your-secret-key';

  // Encrypt a message
  const encryptMessage = (message) => {
    return CryptoJS.AES.encrypt(message, secretKey).toString();
  };

  // Decrypt a message
  const decryptMessage = (ciphertext) => {
    if (ciphertext) {
      const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
      const value = bytes.toString(CryptoJS.enc.Utf8);
      if (value) {
        return value;
      }
      return ciphertext;
        // return value;
    }
    return null;
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
      setReceipientUser(chatData);
      console.log(data);

      // Only create a WebSocket if one doesn't already exist
      if (!ws.current) {
        ws.current = new WebSocket(`wss://zchat-api.onrender.com/ws/private/${data.id}`);

        ws.current.onopen = () => {
          setConnectionStatus('Connected');
          console.log('WebSocket connection opened');
        };

        ws.current.onmessage = (event) => {
          console.log('Message received:', event.data);
          const [sender, message] = event.data.split(": ");
          const dMessage = decryptMessage(message);
          console.log(message)
          setMessages(prevMessages => [...prevMessages, { sender_id:+sender, message: dMessage, timestamp: currentTime }]);
          updateChatList(chatData.username, dMessage);
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
  }, [token, chatData, currentTime, updateChatList]);

  // Separate useEffect to fetch messages only after currentUser is set
useEffect(() => {
  if ( currentUser && receipientUser ) {
    setSenderData(currentUser);
    setReceiverData(receipientUser);
    // Fetch chat history
    fetch(`https://zchat-api.onrender.com/messages/${currentUser.username}/${receipientUser.username}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      // .then(data => setMessages(data))
      .then(data => {
        console.log(data);
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
}, [currentUser, receipientUser, username, token, setSenderData, setReceiverData]);

useEffect(() => {
  if (messageContainerRef.current) {
    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    console.log(messageContainerRef.current)
  }
}, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (messageText === "") {
      return;
    }
    const eMessage = encryptMessage(messageText);
    if (messageText) {
      const payload = {
            sender: currentUser.username,      // Ensure this is correct
            receiver: receipientUser.username,       // Ensure this is correct
            message: eMessage,      // Ensure this is correct
            transaction: null
        };
        console.log(transaction)
        fetch('https://zchat-api.onrender.com/messages/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
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


  if (!chatData) {
    return(
      <div className="group-5393">
        <div className="message-group-container">
          <div className="container-chat-3">
          </div>
        </div>
        <div className="vector-3175">
        </div>
       </div>
       )
  }

  return(
  <div className="group-5393">
    <div className="message-group-container">
      <div className="container-chat-3">
        <div className="frame-427320500">
          <div className="chat-profile">
            <div className="container-9">
            </div>
            <div className="quincy-1">
            {chatData.username}
            </div>
          </div>
          <div className="group-3095">
            <div className="vuesaxlineartrash">
              <img alt="test" className="trash" src={trash} />
            </div>
            <div className="clear">
            Clear
            </div>
          </div>
        </div>
        <div className="chat-page" ref={messageContainerRef}>
          <div className="container-7">
          {messages.map((msg, index) => (
            <>
              { !msg.transaction ?
              <div key={index} className={`${msg.sender_id === currentUser.id ? "group-5388" : "group-5385"}`}>
                <div key={index} className={`${msg.sender_id === currentUser.id ? 'frame-427320498' :'frame-427320494'}`}>
                  <span className="hi-there-ill-like-to-know-if-icould-get-adiscount-on-five-plates-of-fried-rice-iwould-really-love-to">
                    {msg.message}
                  </span>
                </div>
                <span className="pm">
                {msg.timestamp}
                </span>
              </div>
                :
                <div className={`${msg.sender_id === currentUser.id ? "group-5388" : "group-5385"}`}>
                  <div className="successful-transactions">
                    <div className="zec">
                    {msg.transaction} ZEC
                    </div>
                    <div className="frame-427320502">
                      <span className="view-transaction-receipt">
                      View transaction receipt
                      </span>
                    </div>
                  </div>
                  <span className="pm-6">
                  9:42 PM
                  </span>
                </div>
              }
            </>
            ))
            }
            {/* <div className="group-5385">
              <div className="frame-427320494">
                <span className="hello-absolutely-wed-be-delighted-to-give-a-10-discount-on-six-plates-we-would-send-abarcode-to-make-payment-other-going-the-normal-payment-process-when-would-you-like-to-get-it-and-how-do-you-want-it-to-be-delivered">
                Hello! Absolutely, we&#39;d be delighted to give a 10% discount on six plates. We would send a barcode to make payment other going the normal payment process. When would you like to get it and how do you want it to be delivered?
                </span>
              </div>
              <span className="pm-1">
              9:27 PM
              </span>
            </div>
            <div className="group-5388">
              <div className="frame-427320498">
                <span className="id-like-to-get-it-today-before-4-pm-and-with-express-delivery">
                I’d like to get it today before 4pm, and with Express delivery?
                </span>
              </div>
              <span className="pm-2">
              9:32 PM
              </span>
            </div>
            <div className="group-5385">
              <div className="frame-427320494">
                <span className="sounds-great-we-are-sorry-about-the-increase-in-the-delivery-fee-it-is-just-because-of-the-current-economic-situation-of-the-country-so-we-have-provided-an-option-of-paired-delivery-if-you-would-like-to-this-option-can-be-also-accessed-by-using-ourpaired-delivery-barcode">
                Sounds great! 🎉 We are sorry about the increase in the delivery fee, it is just because of the current economic situation of the country. so we have provided an option of paired delivery if you would like to. This option can be also accessed by using our ‘paired delivery’ barcode 
                </span>
              </div>
              <span className="pm-4">
              9:37 PM
              </span>
            </div>
            <div className="group-5388">
              <div className="frame-427320498">
                <span className="thats-impressive-ill-like-to-try-the-pair-delivery-some-other-time">
                That’s impressive! I’ll like to try the pair delivery some other time.
                </span>
              </div>
              <span className="pm-3">
              9:42 PM
              </span>
            </div>
            <div className="group-5385">
              <div className="frame-427320494">
                <span className="ijust-need-to-get-some-sleep-btw-did-you-see-the-pump-on-zlately-it-was-massive-iwish-icould-get-some-zec-right-now">
                I just need to get some sleep.<br />
                Btw, did you see the pump on Z lately. It was <br />
                massive. I wish I could get some ZEC right now! 
                </span>
              </div>
              <span className="pm-5">
              9:37 PM
              </span>
            </div> */}
          </div>
        </div>
        <div className="container-13">
          <form onSubmit={sendMessage} className="container-13" action="">
          <div className="brandmark-yellow-1" onClick={onPopUpClick}>
          </div>
          {/* <div className="textbox">
            <span className="type-your-message">
            Type your message
            </span>
          </div> */}
          <input className="textbox"
          // required
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          autoComplete="off"
          placeholder="Type your message..." />
          <button type="submit" className="frame-427320484">
            <div className="ellipse-1267">
            </div>
            <div className="vuesaxlinearsend-2">
              <img alt="test" className="send-2" src={send2} />
            </div>
          </button>
        </form>
        </div>
      </div>
    </div>
    <div className="vector-3175">
    </div>
   </div>
);
}

export default ChatWindow;