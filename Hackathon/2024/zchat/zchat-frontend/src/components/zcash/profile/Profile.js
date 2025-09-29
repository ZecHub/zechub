import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import "../messages.css";
import "../pop2.css";
import "./profile.css"

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
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
        // setReceipientUser(chatData);
        console.log(data);
        })
    }, [])
    return(
        <div className="desktop-13">
          <div className="screenshot-3151">
          </div>
            <NavBar />
            {/* <div className="wallet-info-container"> */}
            <div className="css-test">
            { currentUser &&
                <div className="wallet-info">
                    <div className="wallet-title">
                        <h2>ZCash Profile Information</h2>
                    </div>
                    <div className="wallet-info-data-container">
                        <span className="wallet-info-label">Username: </span>
                        <span className="wallet-info-data">{currentUser.username}</span>
                    </div>
                    <div className="wallet-info-data-container">
                        <span className="wallet-info-label">Email: </span>
                        <span className="wallet-info-data">{currentUser.email}</span>
                    </div>
                    <div className="wallet-info-data-container">
                        <span className="wallet-info-label">Transparent Address: </span>
                        <span className="wallet-info-data">{currentUser.zcash_transparent_address}</span>
                    </div>
                    <div className="wallet-info-data-container">
                        <span className="wallet-info-label">Balance: </span>
                        <span className="wallet-info-data-balance">{parseFloat(currentUser.balance).toFixed(2)} ZEC</span>
                    </div>
                </div>
            }
            </div>
        </div>
    )
}

export default Profile;