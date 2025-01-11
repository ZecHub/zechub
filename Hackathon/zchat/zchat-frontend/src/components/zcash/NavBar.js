import React from "react";
import { NavLink } from "react-router-dom";
import "./messages.css";
import vector7 from "./assets/vectors/vector_14_x2.svg"
import vector8 from "./assets/vectors/vector_57_x2.svg"
import vector10 from "./assets/vectors/vector_63_x2.svg"
import vector13 from "./assets/vectors/vector_55_x2.svg"
import vector9 from "./assets/vectors/vector_98_x2.svg"
import vector11 from "./assets/vectors/vector_123_x2.svg"
import vector12 from "./assets/vectors/vector_86_x2.svg"
import helpIcon from "./assets/vectors/help_icon_3_x2.svg"
import vector17 from "./assets/vectors/vector_60_x2.svg"

const NavBar = ({ icon, label }) => (
  <div className="container-3">
  <div className="group-274">
    <div className="zcash-logo-1">
    </div>
    <div className="chat">
    CHAT
    </div>
  </div>
  <div className="component-14">
    <NavLink to="/" className={({ isActive }) => isActive ? "active-nav dashboard-btn cursor" : "dashboard-btn cursor"}>
      <img alt="test" className="vector-7" src={vector7} />
      <span className="dashboard">
      Dashboard
      </span>
    </NavLink>
    <NavLink to="/profile" className={({ isActive }) => isActive ? "active-nav profile cursor" : "profile cursor"}>
      <img alt="test" className="vector-8" src={vector8} />
      <span className="profile-1">
      Profile
      </span>
    </NavLink>
    <NavLink to="/messages" className={({ isActive }) => isActive ? "active-nav messages-3 cursor" : "messages-3 cursor"}>
      <img alt="test" className="vector-10" src={vector10} />
      <span className="messages-1">
      Messages
      </span>
    </NavLink>
    <NavLink to="/wallet" className={({ isActive }) => isActive ? "active-nav wallet cursor" : "wallet cursor"}>
      <img alt="test" className="vector-13" src={vector13} />
      <div className="wallet-1">
      Wallet
      </div>
    </NavLink>
    <NavLink to="/markets" className={({ isActive }) => isActive ? "active-nav market cursor" : "market cursor"}>
      <img alt="test" className="vector-9" src={vector9} />
      <span className="markets">
      Markets
      </span>
    </NavLink>
    <NavLink to="/transactions" className={({ isActive }) => isActive ? "active-nav transactions-nav cursor" : "transactions-nav cursor"}>
      <img alt="test" className="vector-11" src={vector11} />
      <span className="transactions-1">
      Transactions
      </span>
    </NavLink>
    <NavLink to="/settings" className={({ isActive }) => isActive ? "active-nav settings cursor" : "settings cursor"}>
      <img alt="test" className="vector-12" src={vector12} />
      <span className="settings-1">
      Settings
      </span>
    </NavLink>
  </div>
  <div className="rectangle-1232">
  </div>
  <div className="component-15">
    <NavLink to="/help" className={({ isActive }) => isActive ? "active-nav help-btn cursor" : "help-btn cursor"}>
      <img alt="test" className="help-icon" src={helpIcon} />
      <span className="help">
      Help
      </span>
    </NavLink>
    <NavLink to="/logout" className={({ isActive }) => isActive ? "active-nav log-out-btn cursor" : "log-out-btn cursor"}>
      <img alt="test" className="vector-17" src={vector17} />
      <span className="log-out">
      Log Out
      </span>
    </NavLink>
  </div>
   </div>
);

export default NavBar;