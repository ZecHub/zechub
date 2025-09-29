import React, {useState} from "react";
import "./messages.css";
import "./pop2.css";
import NavBar from "./NavBar";
import BaseChat from "./chat/BaseChat";
import PopUp from "./PopUp";

const Background = ({ icon, label }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [sharedData, setSharedData] = useState(null);
  const [sharedCurrentUser, setSharedCurrentUser] = useState(null);
  const [sharedReceiverUser, setSharedReceiverUser] = useState(null);

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  const handleSetSharedReceiverUser = (data) => {
    setSharedReceiverUser(data);
  }

  return(
  <div className="desktop-13">
    <div className="screenshot-3151">
    </div>
    <NavBar />
    <BaseChat data={sharedData} onPopUpClick={togglePopUp} setSender={setSharedCurrentUser} setReceiver={handleSetSharedReceiverUser} />
    {isPopUpVisible && <PopUp setData={setSharedData} currentUseDatar={sharedCurrentUser} reciverUserData={sharedReceiverUser} onClose={togglePopUp} />}
  </div>
);
}
export default Background;