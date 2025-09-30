import React, { useEffect, useState } from 'react';
import Modal from '../modal'

const HelpModal = ({closeModalFn}) => {      
  return (
    <Modal 
        title="Zebra Racing"
        description="This is a proof-of-concept game created for the ZecHub Hackathon."
        // thumbnail="https://via.placeholder.com/100"         
        onClose={closeModalFn}
        >   
        <p>First, connect your wallet by clicking the 'Connect Wallet' button. You’ll need to enter your address and the confirmation code found in the memo you received.</p> 
        <p>To place a bet, click on the zebra's name on the left and choose your bet amount.</p> 
        <p>The minimum bet is 0.00005 ZEC, and the maximum bet is one-third of the prize pool shown in the navigation bar.</p> 
        <p>Bets higher than the maximum will be refunded, but bets lower than the minimum will not.</p>       
    </Modal> 
  );
};

export default HelpModal;