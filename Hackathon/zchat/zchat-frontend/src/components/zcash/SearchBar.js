import React from "react";
import "./messages.css";
import searchIcon from "./assets/vectors/search_icon_x2.svg"
import addIcon from "./assets/vectors/add_icon_4_x2.svg"

const SearchBar = ({ icon, label }) => (
    <div className="searchbar-container-8">
      <div className="search-bar">
        <img alt="test" className="search-icon" src={searchIcon} />
        <span className="search-for-chats">
        Search for chats 
        </span>
      </div>
      <img alt="test" className="add-icon" src={addIcon} />
    </div>
);

export default SearchBar;