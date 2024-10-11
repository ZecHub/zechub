import React, {useState} from "react";
import "../messages.css";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { ChatProvider } from "./contexts/ChatContext";

const BaseChat = ({data, onPopUpClick, setSender, setReceiver}) => {
  const [selectedChat, setSelectedChat] = useState(null);

  // Function to handle data from the child
  const handleDataFromChild = (data) => {
    setSelectedChat(data);
    setReceiver(data);
  };

  return(
  <ChatProvider>
    <ChatList onSendData={handleDataFromChild} />
    <ChatWindow transaction={data} onPopUpClick={onPopUpClick} chatData={selectedChat} setSenderData={setSender} setReceiverData={setReceiver} />
  </ChatProvider>
);
}
export default BaseChat;