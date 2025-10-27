import React, { useEffect, useState } from 'react';

import Game from './game/game';

import ConnectModal from './components/modals/connect';
import HelpModal from './components/modals/help';
import BetModal from './components/modals/bet';

import Navbar from './components/navbar';

import HttpCommons from './http';

import './App.css';

function App() {
  const api = new HttpCommons('http://192.168.0.46:3001');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalName, setModalName] = useState('none');

  const [zebraId, setZebraId] = useState(-1);
  const [zebraName, setZebraName] = useState('');

  const [isBetActive, setIsBetActive] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openModal = () => setIsModalOpen(true);  
  const closeModal = () => setIsModalOpen(false);

  const openConnectModal = (callback) => {
    setModalName('connect');
    openModal();
  }

  const openHelpModal = () => {
    setModalName('help');
    openModal();
  }

  const handleLogOut = () => {
    api.post('/logout').then(data => {
      console.log(data);
      if(data) {
        setIsLoggedIn(false);
      }
    });
  }

  const openBetModal = (bet) => {
    setModalName('bet');
    setIsBetActive(bet);
    openModal();
  }
  useEffect(() => {
    api.get('/checklogin').then(data => {
      // console.log(data);
      if(data && data.verified) {
        setIsLoggedIn(true);
      }
    });
  }, []);
 
  return (
    <div className="App">      
      <Navbar onHelpClick={openHelpModal} onConnectClick={openConnectModal} onDisconnectClick={handleLogOut} isLoggedIn={isLoggedIn}/>

      {isModalOpen && (   
        <>     
          {modalName === 'connect' && <ConnectModal setConnectedFn={setIsLoggedIn} closeModalFn={closeModal} />}
          {modalName === 'help' && <HelpModal closeModalFn={closeModal} />}
          {modalName === 'bet' && <BetModal zebraId={zebraId} zebraName={zebraName} closeModalFn={closeModal} isLoggedIn={isLoggedIn} isBetActive={isBetActive} />}
        </>
      )}

      <Game setGameZebraId={setZebraId} setGameZebraName={setZebraName} onZebraClick={openBetModal} closeModalFn={closeModal} />                  
    </div>
  );
}

export default App;
