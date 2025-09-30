import React, {useEffect, useState} from 'react';
// import { Link } from 'react-router-dom';

import HttpCommons from '../http';

const Navbar = ({ onHelpClick, onConnectClick, onDisconnectClick, isLoggedIn }) => {
  const api = new HttpCommons('http://192.168.0.46:3001');

  const [currentRace, setCurrentRace] = useState(0);
  const [nextRace, setNextRace] = useState(0);
  const [prizePool, setPrizePool] = useState(0.0);
  
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateData = () => {
    api.get('/current').then(data => {
      if(data && data.id) setCurrentRace(data.id);
    });

    api.get('/next').then(data => {
      if(data && data.seconds) setNextRace(data.seconds);
    });

    api.get('/balance').then(data => {
      if(data && data.pool) setPrizePool(data.pool);
    });
  }

  useEffect(() => {
    updateData();
    const interval = setInterval(() => {
      updateData();            
    }, 1000);
    
    // api.get('/checklogin').then(data => {
    //   // console.log(data);
    //   if(data && data.verified) {
    //     setIsLoggedIn(true);
    //   }
    // });

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isLoggedIn]);
  
  return (
    <nav style={styles.navbar}>
      <div style={styles.leftItems}>
        <ul style={styles.ul}>  
        <li style={styles.li}>
            <span>Race number: {currentRace}</span>
          </li>        
          <li style={styles.li}>
            <span>Next race in {nextRace} seconds</span>
          </li>
          <li style={styles.li}>
            <span>Prize pool: {prizePool} ZEC</span>
          </li>
          <li style={styles.li}>
            <button style={styles.link} onClick={onHelpClick}>Help</button>
          </li>
        </ul>
        
      </div>
      <div style={styles.rightItems}>
        {isLoggedIn ? (
            <>
              <button style={styles.button} onClick={onDisconnectClick}>
                Disconnect Wallet
              </button>
            </>
          ) : (
            <>
              <button style={styles.button} onClick={onConnectClick}>
                Connect Wallet
              </button>
            </>
          )
        }
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between', // This will push the items to both sides
    padding: '10px 20px',
    backgroundColor: '#E49B0F',
    color: '#FFF8DB',
  },
  leftItems: {
    display: 'flex',
  },
  rightItems: {
    display: 'flex',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginRight: '20px',
  },
  ul: {
    display: 'flex',        // Aligns the list items horizontally
    alignItems: 'center',   // Vertically centers the list items
    listStyleType: 'none',  // Removes bullet points
    margin: 0,              // Removes default margin
    padding: 0,             // Removes default padding
  },
  li: {
    marginRight: '20px',    // Adds space between each list item
  },
  button: {
    backgroundColor: '#c5bfb4ff',
    borderColor: '#a87c17ff',
    borderWidth: '2px',
    borderRadius: '8px',    
    padding: '10px 20px',
    cursor: 'pointer',
    color: '#282c34',
  },
};

export default Navbar;
