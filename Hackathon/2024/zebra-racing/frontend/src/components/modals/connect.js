import React, { useEffect, useState } from 'react';
import Modal from '../modal'

import HttpCommons from '../../http';

const ConnectModal = ({closeModalFn, setConnectedFn}) => {      
  const [isVerifing, setIsVerifing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [inputValue, setInputValue] = useState(''); // Initialize state
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [isInvalidCode, setIsInvalidCode] = useState(false);

  const api = new HttpCommons('http://192.168.0.46:3001');

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update state on input change
  };

  useEffect(() => {
    api.get('/checklogin').then(data => {
      // console.log(data);
      if(data && data.id > 0) {
        setIsVerifing(true);
      }
    });
    // const interval = setInterval(() => {
      
    // }, 3000);
    
    // return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  async function isValidShieldedAddress(addr) {
    const res = await api.get('/checkaddress', {address: addr});
    console.log(res.valid);
    if(res.valid) return true;
    return false;    
  }

  async function waitForConfirmation() {    
    const addr = inputValue;
    const validAddr = await isValidShieldedAddress(addr);
    if(!validAddr) {
      setInvalidAddress(true);
      setInputValue('');
    }
    else {
      api.post('/login', {address: addr}).then(res => {        
        api.get('/checklogin').then(res2 => {        
          console.log(res2);
        });
        setInputValue('');
        setIsVerifing(true);
      });      
    }    
  }

  function verifyAddress() {   
    const inputCode = inputValue;
    console.log(inputCode);
    api.post('/verify', {code: inputCode}).then(res => {        
      console.log(res);
      if(res && res.message === 'success') {
        setIsVerifing(false);
        setIsVerified(true);
        closeModalFn();
        setConnectedFn(true);
      }
      else {
        setIsInvalidCode(true);
        return;
      }      
    }); 
  }
  
  return (
    <Modal 
        title="Connect your Zcash Wallet"
        description="To play the game, please connect your Zcash wallet."
        // thumbnail="https://via.placeholder.com/100" // Replace with your image
        onClose={closeModalFn}
        >    
        
        {isVerifing ? (
          // Wait for confirmation
          <>            
            <p>In a few minutes you will receive a shielded memo with a confirmation code. Please inform this code below:</p>
            <input value={inputValue} onChange={handleInputChange} autoComplete="off" type="text" style={{padding: '8px', margin: '16px', width: '80%'}} />
            {isInvalidCode && (
              <div style={{color: 'red', marginBottom: '12px'}}>The provided verification code is invalid</div>
            )}
            <button type="submit" onClick={verifyAddress}>Verify</button>
            <p>Please, don't close this window.</p>
         </>
        ) : ( 
          // Ask for user address
          <>
            <p>Please inform your shielded Zcash address:</p>            
            <input value={inputValue} onChange={handleInputChange} autoComplete="off" type="text" style={{padding: '8px', margin: '16px', width: '80%'}} />
            {invalidAddress && (
              <div style={{color: 'red', marginBottom: '12px'}}>The provided Zcash address is invalid</div>
            )}
            <button type="submit" onClick={waitForConfirmation}>Send verification code</button>
          </>
        )
      }
    </Modal> 
  );
};

export default ConnectModal;