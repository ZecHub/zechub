import React, { useEffect, useState } from 'react';
import Modal from '../modal'
import HttpCommons from '../../http';

const BetModal = ({zebraId, zebraName, closeModalFn, isLoggedIn, isBetActive}) => {      
  const api = new HttpCommons('http://192.168.0.46:3001');

  const [paymentUri, setPaymentUri] = useState('');
  const [memoMsg, setMemoMsg] = useState('');
  const [maxBetAmount, setMaxBetAmount] = useState(0.0);
  const [paymentAddress, setPaymentAddress] = useState('');

  useEffect(() => {
    api.get('/zip321', {id: zebraId}).then((res) => {
      // console.log(res);
      setPaymentUri(res.uri);
    });

    api.get('/address').then((res) => {      
      setPaymentAddress(res.address);
    });

    api.get('/memo', {id: zebraId}).then((res) => {      
      setMemoMsg(res.memo);
    });

    api.get('/balance').then((res) => {      
      const maxBet = parseFloat(res.pool / 3).toFixed(8);
      setMaxBetAmount(maxBet);
    });

    
  }, [paymentUri, memoMsg, maxBetAmount]);

  const placeFakeBet = () => {
    api.post('/fakebet', {id: zebraId}).then(res => {
      console.log(res);
    });
  }
  
  return (
    <>
    {isLoggedIn ? (
      <>
        {isBetActive ? (
          <>
            <Modal 
              title={`${zebraName}`}
              description={`You cannot bet again, you already have a bet in place. Only 1 bet per race is supported!`}
              // thumbnail="https://via.placeholder.com/100" // Replace with your image
              onClose={closeModalFn}
              >      
            </Modal> 
          </>
        ):(
          <>
            <Modal 
              title={`${zebraName}`}
              description={`Want to bet on ${zebraName}? Scan the QR code above or copy and paste the values below into your wallet application.`}
              // thumbnail="https://via.placeholder.com/100" // Replace with your image
              qrcode={paymentUri}
              onClose={closeModalFn}
              >
                <b>Minimum bet is 0.00005 ZEC and maximum  is {maxBetAmount} ZEC.</b><br/>
              <p>
                <a href={paymentUri}>Pay using your Zcash Wallet</a>
              </p>
              <p></p>
              
              {/* <b>Payment URI:</b> */}
              {/* <code style={{
                wordWrap: 'break-word',
                background: '#c5bfb4ff',
                whiteSpace: 'pre-wrap',
                maxWidth: '100%',
                padding: '16px',
                display: 'block',
                overflowWrap: 'break-word'
              }}>
                {paymentUri}                                
              </code> */}
              <b>Address:</b>
              <code style={{
                wordWrap: 'break-word',
                background: '#c5bfb4ff',
                whiteSpace: 'pre-wrap',
                maxWidth: '100%',
                padding: '16px',
                display: 'block',
                overflowWrap: 'break-word'
              }}>
                {paymentAddress}                                
              </code>
              <b>Memo:</b>
              <code style={{
                wordWrap: 'break-word',
                background: '#c5bfb4ff',
                whiteSpace: 'pre-wrap',
                maxWidth: '100%',
                padding: '16px',
                display: 'block',
                overflowWrap: 'break-word'
              }}>
                {memoMsg}                                
              </code>
              

              {/* <button onClick={placeFakeBet}>Place bet</button>     */}
            </Modal> 
          </>
        )}
      </>
    ) : (
      <Modal 
        title={`${zebraName}`}
        description={`Want to bet on ${zebraName}? Please connect your wallet by clicking the "Connect wallet" button on the top right..`}
        // thumbnail="https://via.placeholder.com/100" // Replace with your image
        onClose={closeModalFn}
        >          
     </Modal>
    )}    
    </>
  );
};

export default BetModal;