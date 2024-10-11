import React, {useState, useEffect, useContext} from "react";
import "../messages.css";
import { ChatContext } from "./contexts/ChatContext";

import CryptoJS from 'crypto-js';
import SearchBar from "../SearchBar";
import editIcon from "../assets/vectors/edit_icon_3_x2.svg"

const ChatList = ({ onSendData }) => {
  const { chatList } = useContext(ChatContext); 
  const [childSelectedChat, setChildSelectedChat] = useState(null);
  console.log(chatList);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  // Generate or use a shared key
  const secretKey = 'your-secret-key';

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
    const token = localStorage.getItem('access_token');

    // Fetch the current user's information
    fetch('https://zchat-api.onrender.com/users/me/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => setCurrentUser(data))
      .catch(error => console.error('Error fetching current user:', error));

    // Fetch all users excluding the current user
    // fetch('https://zchat-api.onrender.com/users/', {
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //   },
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     if (Array.isArray(data)) {
    //       // Filter out the current user
    //       const filteredUsers = data.filter(user => user.username !== currentUser.username);
    //       setUsers(filteredUsers);
    //     } else {
    //       console.error('Expected an array but got:', data);
    //     }
    //   })
    //   .catch(error => console.error('Error fetching users:', error));

      // Fetch all users excluding the current user
      if (currentUser.id) {
      fetch(`https://zchat-api.onrender.com/users/latest-messages/${currentUser.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          const decryptedMessages = data.map(user => {
            try {
              // Decrypt each message
              return {
                ...user,
                latest_message: decryptMessage(user.latest_message)  // Decrypt message here
              };
            } catch (error) {
              console.error('Decryption error:', error);
              return user;  // Return message unmodified if decryption fails
            }
          });
          setUsers(decryptedMessages);
        })
        .catch(error => console.error('Error fetching users:', error));
      }
  }, [currentUser.id]);

  // useEffect will run when `childSelectedChat` is updated
  useEffect(() => {
    if (childSelectedChat) {
      // Only send data if `childSelectedChat` is not empty
      onSendData(childSelectedChat);

      console.log(childSelectedChat);
    }
  }, [childSelectedChat, onSendData]);
  
  return(
  <div className="chat-list">
        <div className="frame-427320485">
          <span className="messages">
          Messages
          </span>
          <img alt="test" className="edit-icon" src={editIcon} />
        </div>
        <SearchBar />
        {
          users.map((user, index) => (
            <div 
              key={index} 
              className="message-tile" 
              onClick={() => setChildSelectedChat(user)}
            >
              <div className="frame-427320489 message-tile-cursor">
                <div className="container-4">
                  <div className="container">
                  </div>
                  <div className="frame-4273204861">
                    <div className="damnedest">
                    {user.username}
                    </div>
                    <span className="its-been-along-day-bud-ill-send-you-some-zto-get-some-refre">
                    {user.latest_message ? user.latest_message : user.transaction ? `${user.transaction} ZEC Transfer` : null}
                    </span>
                  </div>
                </div>
                <span className="mins-ago-1">
                  27 mins ago
                </span>
                <div className="unread-1">
                  <span className="container-4">
                  3
                  </span>
                </div>
              </div>
            </div>
            ))
        }
        {/* <div className="message-tile">
          <div className="frame-427320489 message-tile-cursor">
            <div className="container-4">
              <div className="container">
              </div>
              <div className="frame-4273204861">
                <div className="damnedest">
                Damnedest
                </div>
                <span className="its-been-along-day-bud-ill-send-you-some-zto-get-some-refre">
                It’s been a long day, bud. I’ll send you some Z to get some refre...
                </span>
              </div>
            </div>
            <span className="mins-ago-1">
              27 mins ago
            </span>
            <div className="unread-1">
              <span className="container-4">
              3
              </span>
            </div>
          </div>
          <div className="vector-3166">
          </div>
        </div>
        <div className="message-tile">
          <div className="frame-427320488 message-tile-cursor">
            <div className="container-4">
              <div className="container-2">
              </div>
              <div className="frame-4273204861">
                <div className="quincy">
                Quincy
                </div>
                <span className="ijust-need-to-get-some-sleep-btw-did-you-see-the-pump-on-zlatel">
                  I just need to get some sleep. Btw, did you see the pump on Z latel...
                </span>
              </div>
            </div>
            <span className="mins-ago-1">
              27 mins ago
            </span>
            <div className="unread-1">
              <span className="container-4">
              3
              </span>
            </div>
          </div>
          <div className="vector-3167">
          </div>
        </div> */}
   </div>
);}

export default ChatList;