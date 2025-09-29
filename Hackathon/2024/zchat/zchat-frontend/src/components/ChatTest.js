import React from "react";
import "./messages.css";

const NavItem = ({ icon, label }) => (
  <div className="nav-item">
    <img className="nav-icon" src={icon} alt={label} />
    <span>{label}</span>
  </div>
);

const ChatItem = ({ name, message, time, unreadCount }) => (
  <div className="chat-item">
    <div className="chat-details">
      <div className="chat-avatar"></div>
      <div className="chat-info">
        <div className="chat-name">{name}</div>
        <span className="chat-message">{message}</span>
      </div>
    </div>
    <span className="chat-time">{time}</span>
    {unreadCount && (
      <div className="chat-unread">
        <span>{unreadCount}</span>
      </div>
    )}
  </div>
);

const ChatList = () => (
  <div className="chat-list">
    <div className="chat-list-header">
      <span>Messages</span>
      <img className="edit-icon" src="assets/vectors/edit_icon_3_x2.svg" alt="Edit" />
    </div>
    <div className="chat-search-bar">
      <img className="search-icon" src="assets/vectors/search_icon_x2.svg" alt="Search" />
      <span>Search for chats</span>
      <img className="add-icon" src="assets/vectors/add_icon_4_x2.svg" alt="Add" />
    </div>
    <ChatItem
      name="Damnedest"
      message="It’s been a long day, bud. I’ll send you some Z to get some refre..."
      time="27 mins ago"
      unreadCount="3"
    />
    <ChatItem
      name="Quincy"
      message="I just need to get some sleep. Btw, did you see the pump on Z latel..."
      time="27 mins ago"
    />
    <ChatItem
      name="Carina"
      message="You just kept sending me Z, that’s sweet. I’ll talk to you later"
      time="34 mins ago"
      unreadCount="3"
    />
    <ChatItem
      name="James"
      message="You just kept sending me Z, that’s sweet. I’ll talk to you later"
      time="40 mins ago"
    />
  </div>
);

const Sidebar = () => (
  <div className="sidebar">
    <NavItem icon="assets/vectors/vector_14_x2.svg" label="Dashboard" />
    <NavItem icon="assets/vectors/vector_57_x2.svg" label="Profile" />
    <NavItem icon="assets/vectors/vector_63_x2.svg" label="Messages" />
    <NavItem icon="assets/vectors/vector_55_x2.svg" label="Wallet" />
    <NavItem icon="assets/vectors/vector_98_x2.svg" label="Markets" />
    <NavItem icon="assets/vectors/vector_123_x2.svg" label="Transactions" />
    <NavItem icon="assets/vectors/vector_86_x2.svg" label="Settings" />
  </div>
);

const ChatScreen = () => (
  <div className="chat-screen">
    <div className="chat-header">
      <div className="chat-profile">
        <div className="chat-avatar"></div>
        <div className="chat-name">Quincy</div>
      </div>
      <div className="chat-actions">
        <img className="trash-icon" src="assets/vectors/trash_8_x2.svg" alt="Trash" />
        <span>Clear</span>
      </div>
    </div>
    <div className="chat-conversation">
      <div className="message">
        <span className="message-text">
          Hi there! I’ll like to know if I could get a discount on five plates of fried rice. I would really love to.
        </span>
        <span className="message-time">9:23 PM</span>
      </div>
      <div className="message">
        <span className="message-text">
          Hello! Absolutely, we'd be delighted to give a 10% discount on six plates. We would send a barcode to make payment...
        </span>
        <span className="message-time">9:27 PM</span>
      </div>
    </div>
  </div>
);

const App = () => (
  <div className="app">
    <div className="app-header">
      <div className="zcash-logo"></div>
      <span>CHAT</span>
    </div>
    <div className="app-body">
      <Sidebar />
      <ChatList />
      <ChatScreen />
    </div>
  </div>
);

export default App;
