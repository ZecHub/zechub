import Phaser, { NONE } from 'phaser';
import Zebra from './zebra';
import StatusMessage from './statusmessage';

import React, { useEffect, useState } from 'react';
import HttpCommons from '../http';

const Game = ({setGameZebraId, setGameZebraName, onZebraClick, closeModalFn}) => {  
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 1271,
      height: window.innerHeight-60, /* Ugly hack to make game fit on screen */
      parent: 'phaser-game',      
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };
    
    const game = new Phaser.Game(config);
    let statusMessage;
    let betAck = false;
    let zId = -1;

    // Resize the game if the window size changes
    // window.addEventListener('resize', () => {
    //   game.scale.resize(window.innerWidth, window.innerHeight);
    // });

    let scene;

    const api = new HttpCommons('http://192.168.0.46:3001');
    
    const MAX_ZEBRAS = 6;
    const OFFSET_FRAMES = 30;
    const zebras = [];
    const zebraNames = ["Michae2xl", "vito", "iogy.zkp", "Mine", "James Katz", "e-Zec"];

    let zebraOffsets = [];
    let currentOffset = 0;
    let gamePhase = 'wait';

    let mountains, fence_upper, fence_lower;
    
    let lastTime = 0;

    let startPosition = (game.config.width/2) - 400;

    function preload() {
      this.load.image('mountains', './assets/montains.png');
      this.load.image('fence_up', './assets/fence_upper.png');
      this.load.image('fence_low', './assets/fence_lower.png');
      this.load.image('track', './assets/track2.png');
      
      // Load Zebra animation frames
      for(let i = 0; i < 24; i ++) {
        this.load.image(`zebraFrame${i+1}`, `./assets/frames/${(i+1).toString().padStart(2, '0')}.png`);
      }      
    }
    
    function create() {      
      // Create the mountain layer
      mountains = this.add.tileSprite(0, 0, 1271, 0, 'mountains')
      .setOrigin(0, 0)
      .setScrollFactor(0); // No scroll factor to ensure it's in the background
    
      // Create the track layer
      this.add.image(0, 126, 'track').setOrigin(0, 0);
    
      // Create the upper fence layer
      fence_upper = this.add.tileSprite(0, 156, 1271, 0, 'fence_up')
      .setOrigin(0, 0)  
      .setScrollFactor(0); // No scroll factor to ensure it's in the background
    
      // Create the lower fence layer
      fence_lower = this.add.tileSprite(0, 650, 1271, 0, 'fence_low')
      .setOrigin(0, 0)  
      .setScrollFactor(0); // No scroll factor to ensure it's in the background
    
      // Create and place the Zebras
      for(let i = 0; i < MAX_ZEBRAS; i ++) {
        const y = 218 + (74 * i);
        let z = new Zebra(this, startPosition, y);
        zebras.push(z);

        // Add Zebra names and handle clicks
        const btn = this.add.text(20, y + 8, zebraNames[i], { font: '32px Arial', fill: '#fff' });
        btn.setInteractive();
        
        btn.on('pointerdown', () => {
          setGameZebraId(i);
          setGameZebraName(zebraNames[i]);
          onZebraClick(betAck);
          console.log(`received click on zebra `, i);
        });        
      }      
      statusMessage = new StatusMessage(this, 30);

      statusMessage.setText("Hello!");
      statusMessage.display();

      scene = this;
    }
    
    // Update game logic
    function update(time) {     
      if(time - lastTime >= 1000) {
        lastTime = time;      

        if(!betAck) {
          // console.log(betAck)
          api.get('/bets').then(res => {        
            if(res && res.bet && res.bet.new) {
              console.log('received bet', res)
              zId = res.bet.zebra;
              const betZebra = zebraNames[zId];
              const betAmount = res.bet.amount;
              const betRace = res.bet.raceId;

              closeModalFn();

              statusMessage.setText(`Your bet of ${betAmount} ZEC on ${betZebra} was received! It will be placed on race ${betRace}`);
              statusMessage.display();

              betAck = true;
            }
          });          
        }
           
        api.get('/phase').then(data => {          
          if(data && data.phase == 'active' && gamePhase != 'active') {
            api.get('/offset').then(offsetData => {          
              api.get('/offsets').then(offsetsData => {          
                // maybe add an if clause here, offset errors
                if(offsetData && offsetsData) {
                  startRace(offsetData, offsetsData);
                }
              });
            });
          }
          else if(data && data.phase == 'wait' && gamePhase != 'wait') {
            api.get('/winner').then(async (data) => {          
              console.log(zebraNames[data.id]);
              let wonText = `${zebraNames[data.id]} won the race!`;
                
              const bets = await api.get('/bets');   
              // console.log(data);
              if(bets && bets.bet) {
                if(bets.currentRaceId == bets.bet.raceId && bets.bet.zebra == data.id) wonText += `\nYou will receive your prize in few minutes!`;
              }

              statusMessage.setText(wonText);
              statusMessage.display();

              resetRace();
            });
            
            // resetRace();
          }

          if(gamePhase == 'active') {
            // maybe add an if clause here, offset errors
            for(let zebra of zebras) {
              const idx = zebras.indexOf(zebra);
              const offsetList = zebraOffsets.filter((o) => o.id == idx).flat();
              const nextMove = offsetList[currentOffset];              
              if(nextMove && nextMove.offset) zebra.move(nextMove.offset);
                         
            }
            if(currentOffset < OFFSET_FRAMES) currentOffset += 1;                                            
          }
        });          
      }

      // Animation stuff, only when game is active       
      if(gamePhase == 'active') {        
        // Scroll mountains slower
        mountains.tilePositionX += 1.5; // Slow scrolling for mountains
      
        // Scroll upper fence sligtly faster than mountains
        fence_upper.tilePositionX += 3.25; // Faster scrolling for upper fence
      
        // Scroll lower fence sligtly faster than upper fence (or not)
        fence_lower.tilePositionX += 4.75; // Even faster scrolling for lower fence
      }
    }

    function startRace(offset, offsets) {
      zebraOffsets = offsets;      

      for(let zebra of zebras) {
        zebra.setPos(startPosition);
        
        if(currentOffset < offset.offset) {
          const idx = zebras.indexOf(zebra);
          const offsetList = zebraOffsets.filter((o) => o.id == idx).flat().slice(0, offset.offset);
          const totalOffset = offsetList.reduce((acc, off) =>  off.offset + acc, 0)
          zebra.move(totalOffset);
        }        

        zebra.startAnimation();               
      }

      currentOffset = offset.offset;
      gamePhase = 'active';
    }

    function resetRace() {      
      currentOffset = 0;        
      zebraOffsets = [];
      gamePhase = 'wait';
      betAck = false;      
      zId = -1;
      for(let zebra of zebras) {
        // zebra.setPos(startPosition);
        zebra.stopAnimation();
      }
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-game"></div>;
};

export default Game;
