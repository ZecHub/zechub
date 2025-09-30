const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const sequelize = require('./sequelize');

const ZingoLib = require('./zingolib-wrapper/zingolib');
const { TxBuilder } = require('./zingolib-wrapper/utils/utils');
const { Worker } = require('worker_threads');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ['http://127.0.0.1:3000', 'http://localhost:3000'] }));

const client = new ZingoLib("https://zec.rocks:443", "main");

// Session configuration
app.use(session({
    secret: 'ZcashIsAwesome',    // Change to a secure random string in production
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,           // Prevent access from JavaScript
        secure: false,            // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        sameSite: 'lax'     // Adjust based on your needs (e.g., 'strict' or 'none' for cross-site)

    }
}));

const PORT = process.env.PORT || 3001;

const MAX_ZEBRAS = 6;
const OFFSET_FRAMES = 30;
const RACE_INTERVAL = 60;

let zebraOffsets = [];
let zebraPosition = [];
let currentOffset = 0;
let currentRace = 0;
let nextRace = RACE_INTERVAL;
let prizePool = 0;
let paymentAddr;
let payQueue = [];

let depositLock = false;

let offsetInterval;
let payoutInterval;
let detectInterval;

let gamePhase = 'wait';

// app.use((req, res, next) => {
//     console.log(req.sessionID);  // Log session ID for debugging
//     next();
// });

app.get('/', (req, res) => {
  res.send('Zebra Race Backend');
});

app.get('/phase', (req, res) => {
    res.json({
        phase: gamePhase
    });
});

app.get('/offset', (req, res) => {
    res.json({
        offset: currentOffset
    });
});

app.get('/offsets', (req, res) => {
    res.json(zebraOffsets);
});

app.get('/winner', (req, res) => {
    res.json({id: zebraPosition[0].id});
});

app.get('/next', (req, res) => {
    res.json({        
        seconds: nextRace
    });
});

app.get('/current', (req, res) => {
    res.json({        
        id: currentRace
    });
});

app.get('/checkaddress', async(req, res) => {
    const userAddr = req.query.address;
    // console.log(userAddr)
    const parsedAddr = await client.parseAddress(userAddr.toString());
    // console.log(parsedAddr);
    if(parsedAddr && parsedAddr.status == 'success') {
        const addrKind = parsedAddr.address_kind;
        if(addrKind == 'unified' || addrKind == 'sapling') {
            res.json({valid: true});
        }
    }
    else res.json({valid: false});    
});

app.get('/zip321', async(req, res) => {
    if(req.session && req.session.data) {
        const userId = req.session.data.id;
        const zebraId = req.query.id;
        const tx = new TxBuilder()
            .setRecipient(paymentAddr)
            .setAmount(0.0005)
            .setMemo(`{"warning":"DO NOT EDIT", "playerId": ${userId}, "zebraId": ${zebraId}}`);

        // Get zip321 uri        
        const uri = tx.getPaymentURI();
        res.json({uri: uri});
    }
    else res.json({error: true});
});

app.get('/balance', async(req, res) => {
    res.json({pool: prizePool});
});

app.get('/address', async(req, res) => {
    res.json({address: paymentAddr});
});

app.get('/memo', async(req, res) => {
    if(req.session && req.session.data) {
        const userId = req.session.data.id;
        const zebraId = req.query.id;
        const memo = `{"warning": "DO NOT EDIT", "playerId": ${userId}, "zebraId": ${zebraId}}`;
        
        res.json({memo: memo});
    }
    else res.json({error: true});
});

app.post('/login', async (req, res) => {
    const userAddr = req.body.address;
    const vCode = parseInt(1000 + Math.random() * 8000);
    
    try {
        const playerModel = sequelize.models.players;

        const [player, created] = await playerModel.findOrCreate({
            where: {address: userAddr},
            defaults: {
                address: userAddr,
                code: vCode,
                verified: false
            }            
        });
        
        if(created) {
            const playerId = player.dataValues.id;
            const playerAddr = player.dataValues.address;
            const playerCode = player.dataValues.code;
            const playerStatus = player.dataValues.verified;

            // store session information
            req.session.data = {
                id: playerId,
                verified: playerStatus
            };

            console.log(`New player created!\n` +
                `ID: ${playerId}\n` +
                `Wallet Address: ${playerAddr}\n` +
                `Verification code: ${playerCode}\n` +
                `Verified: ${playerStatus}\n`);

            res.sendStatus(200);
        } else {
            const playerId = player.dataValues.id;
            const playerStatus = player.dataValues.verified;

            // store session information
            req.session.data = {
                id: playerId,
                verified: playerStatus
            };
            req.session.foo = 'bar';

            console.log(`User exists!`);
            res.sendStatus(200);
        }
        // Construct transaction
        const tx = new TxBuilder()
            .setRecipient(userAddr)
            .setAmount(0.00001)
            .setMemo(`Zebra racing wallet validation. This is your verification code: ${player.dataValues.code}`);

        // Get sendJson
        const sendJson = tx.getSendJSON();
        // Uncomment the line below!!!
        payQueue.push(sendJson[0]);
    }
    catch(e) {        
        console.log(e);
        res.sendStatus(401);
    } 
});

app.post('/verify', async (req, res) => {
    if(req.session && req.session.data) {
        const userId = req.session.data.id;
        const vCode = req.body.code;
        sequelize.models.players.findOne({
            where: {
                id: userId
            }
        }).then(async (player) => {
            if(player.code === vCode) {
                console.log('Verification code is correct!')
                player.verified = true;
                await player.save();

                // store session information
                req.session.data = {
                    id: player.id,
                    verified: true
                };

                res.json({message: 'success'});
            }
            else res.json({message: 'fail'});
        }).catch(e => { console.log(e) });
    }    
});

app.post('/fakebet', (req, res) => {
    if(req.session && req.session.data) {
        const userId = req.session.data.id;
        const zebraId = req.body.id;
        console.log('placing fake bet ...')
        sequelize.models.players.findOne({
            where: {
                id: userId
            }
        }).then(async (player) => {
            const raceId = currentRace + 1;
            
            console.log(`User ${userId} placed a fake bet on zebraId ${zebraId}, bet bet will be valid in race ${raceId}`)

            const bet = await player.createBet({
                amount: 0.00001,
                zebra: zebraId,
                new: true,
                raceId: raceId
            });
            // console.log(bet);            
            res.json({message: 'success'});
        }).catch(e => { console.log(e) });
    } 
});

app.get('/bets', async(req, res) => {
    if(req.session && req.session.data) {
        const userId = req.session.data.id;
        try {
            const lastBet = await sequelize.models.bets.findOne({
                where: {playerId: userId},
                order: [['createdAt', 'DESC']],  // Order by createdAt in descending order
            });
            if(lastBet) {                
                const oldBetValues = { ... lastBet.dataValues };
                lastBet.new = false;
                await lastBet.save();
                res.json({bet: oldBetValues, currentRaceId: currentRace});
            }
            else {
                res.json({bet:undefined})
            }
        }
        catch(e) {
            console.log(e);
            res.json({bet: {}, error: true})
        }
    }
    else {
        res.send('not looged in')
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        res.clearCookie('connect.sid'); // Clear the cookie on logout
        res.json({ message: 'Logged out successfully' });
    });
});

app.get('/checklogin', (req, res) => {        
    // console.log(req.sessionID);
    if(req.session && req.session.data) {
        const player = sequelize.models.players.findOne({
            where: {
                id: req.session.data.id
            }
        }).then(db => {
            res.json({        
                id: db.id,
                verified: db.verified
            });
        }).catch(e => { console.log(e) });   
    }
    else {
        res.json({        
            id: -1,
            verified: false
        });
    }  
});

app.listen(PORT, async() => {
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
        const lastRace = await sequelize.models.races.findOne({
            order: [['createdAt', 'DESC']],  // Order by createdAt in descending order
        });
        if(lastRace) currentRace = lastRace.id;
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }

    console.log("Initializing zingolib ...")
    client.init().then(async (res)=> {
        console.log(res);
        console.log("==============")
        // Fetch wallet balance
        const bal = await client.fetchTotalBalance();
        prizePool = bal;
        console.log("Balance: ", bal);
        // Fetch wallet main address
        const addr = await client.fetchAllAddresses();
        console.log(addr[0].address);
        paymentAddr = addr[0].address;
        
        const txid = await client.fetchLastTxId();
        
        const [lastTx, created] = await sequelize.models.state.findOrCreate({
            where: {txid: txid},
            defaults: {
                txid: txid
            }
        });
        if(!created) {
            console.log(lastTx.txid);
        }                        
    }).catch(e => {
        console.log(e);
        process.exit(1);
    })


    console.log(`Server running on port ${PORT}`);
    nextRace = 5;
    setInterval(() => {
        if(gamePhase == 'active') {
            // console.log("A game is already in progress ...")
            return;
        }

        if(nextRace > 0) nextRace -= 1;
        
        // Start a new race every RACE_INTERVAL seconds
        if(nextRace == 0) {
            setupNewRace();

            // Tick current animation offset every second
            offsetInterval = setInterval(() => {
                currentOffset += 1;
                if(currentOffset >= OFFSET_FRAMES) {
                    sendPayments(currentRace, zebraPosition[0].id);
                    clearInterval(offsetInterval);   
                    currentOffset = 0;
                    gamePhase = 'wait';
                    nextRace = RACE_INTERVAL;                    
                }
            }, 1000);
        }

    }, 1 * 1000);

    // Iinterval for prize pool update and payout
    payoutInterval = setInterval(async() => {
        // Update balce (prize pool)
        const bal = await client.fetchTotalBalance();
        prizePool = bal;
        // console.log("Balance: ", bal);
        
        // Send queued transactions
        const sendProgress = client.isSending;
        const notes = await client.fetchNotes();
        let pending = notes.pending_orchard_notes.length > 0 || notes.pending_sapling_notes.length > 0 || notes.pending_utxos.length > 0;        
        syncing = client.inRefresh;

        console.log(`Queue: ${payQueue.length} | Sending: ${sendProgress} | Pending: ${pending} | Syncing: ${syncing}`);
        if(payQueue.length > 0 && !sendProgress && !pending && !syncing) {
            const tmpQueue = payQueue.slice().flat();
            console.log(tmpQueue);

            const worker = new Worker('./send_tx.js', {
                workerData: { tmpQueue }
            });

            // Listen for a message from the worker (e.g., the txid)
            worker.on('message', (message) => {
                const { success, txid, error } = message;
                if (success) {
                    console.log(txid);

                    // sequelize.models.state.findOne().then(async (state) => {
                    //     state.txid = txid;
                    //     await state.save();
                    // })

                    // clear the queue
                    tmpQueue.forEach((el) => {
                        payQueue.splice(payQueue.indexOf(el), 1);
                    });
                } else {
                    console.log("Error sending tx", error)
                }
            });
        
            // Handle worker errors
            worker.on('error', (e)=>{console.log(e)});
        
            // Handle worker exit event
            worker.on('exit', (code) => {
                if (code !== 0) {
                console.log(`Worker stopped with exit code ${code}`);
                }
            });           
        }
    }, 75 * 1000);

    // Interval for payment detection
    detectInterval = setInterval(() => {
        if(depositLock || client.isSending) {
            console.log('Already scanning new payments ...');
            return;
        }

        // console.log("Scanning for new deposits ...");

        depositLock = true;
        
        sequelize.models.state.findOne().then(async (state) => {
            const appTxid = state.txid;
            const txSummaries = await client.getTransactionsSummaries();
            const receivedTxns = txSummaries.transaction_summaries.filter((t) => t.kind == 'received').reverse();
            if(receivedTxns.length > 0) {
                const lastTxid = receivedTxns[0].txid;
                let txCount = 0;
                if(lastTxid && appTxid != lastTxid) {               
                    for(const tx of receivedTxns) {
                        if(tx.txid == appTxid) {
                            console.log('this is old tx')
                            break;
                        }

                        const t = await parseTransaction(tx);
                        console.log(t);

                        txCount ++;
                    }
                    state.txid = lastTxid;
                    await state.save();      
                    
                    console.log(`Received a total of ${txCount} new transactions.`)
                }
            }

            depositLock = false;
        }).catch((e) => { console.log(e) });
            
    }, 5 * 1000);
});

function setupNewRace() {
    // First clear previous offsets
    zebraOffsets = [];
    zebraPosition = [];
    currentOffset = 0

    // Then generate new ones
    for(let i = 0; i < MAX_ZEBRAS; i ++) {  
        let distance = 0;      
        for(let j = 0; j < OFFSET_FRAMES; j ++) {
            let offsetX = -8 + Math.random() * 64;
            distance += offsetX;
            zebraOffsets.push({
                id: i,
                offset: offsetX
            });
        }
        zebraPosition.push({id: i, distance: distance});
    }

    // Sort zebra position by distance
    zebraPosition = zebraPosition.sort((a, b) => b.distance - a.distance);
    console.log(`Winning zebra: ${zebraPosition[0].id}`);

    // Give winning zebra a boost, so it's clear which one is the winner
    const winningOffsets = zebraOffsets.filter((z) => z.id == zebraPosition[0].id);
    const boostMove = winningOffsets[OFFSET_FRAMES - 3];
    // console.log(zebraOffsets[zebraOffsets.indexOf(boostMove)])
    zebraOffsets[zebraOffsets.indexOf(boostMove)].offset = 128;
    // console.log(zebraOffsets[zebraOffsets.indexOf(boostMove)])

    // Save the new race to db
    console.log("Creating new race.");
    try {
        const raceModel = sequelize.models.races;
        raceModel.create({
            winner: zebraPosition[0].id
        }).then((race) => {
            const raceId = race.dataValues.id;
            const zebraId = race.dataValues.winner;
            currentRace = raceId;
            console.log(`New race created!\nRace id: ${raceId} | Winning zebra id: ${zebraId}`)
        })
    }
    catch {
        console.log("PANIC! Error creating new race!")
    }
    
    // Set game phase to active
    gamePhase = 'active';
}

function placeBet(userId, zebraId, amount, txid) {
    console.log(`placing bet ...`)
    sequelize.models.players.findOne({
        where: {
            id: userId
        }
    }).then(async (player) => {
        const raceId = currentRace + 1;
        
        console.log(`User ${userId} placed a bet on zebraId ${zebraId}, bet bet will be valid in race ${raceId}`)

        const bet = await player.createBet({
            amount: amount,
            zebra: zebraId,
            new: true,
            raceId: raceId,
            txid: txid
        });
        // console.log(bet);        
    }).catch(e => { console.log('fail :(') });
}

function sendPayments(currentRaceId, winnerId) {
    // first get all bets for current race
    sequelize.models.bets.findAll({
        where: { raceId: currentRaceId }
    }).then((allBets) => {
        for(const bet of allBets) {
            if(bet.zebra == winnerId) {
                // Get user wallet address
                sequelize.models.players.findOne({
                    where: {
                        id: bet.playerId
                    }
                }).then((player) => {
                    const playerWallet = player.address;
                    const prize = bet.amount * 2;
                    const memo = `Thank you for playing Zebra Racing. This is your prize for winning race ${currentRaceId}`;
                    const payTx = new TxBuilder()
                        .setRecipient(playerWallet)
                        .setAmount(prize)
                        .setMemo(memo)
                    const payJson = payTx.getSendJSON();
                    payQueue.push(payJson[0]);
                }).catch((e) => { console.log(e) });
            }
        }
    }).catch((e) => { console.log(e) });
}

async function parseTransaction(tx) {
    console.log(tx);
    return new Promise(async (resolve, reject) => {
        const value = parseFloat(tx.value / 10 ** 8).toFixed(8);
        const txid = tx.txid;
        
        let memo;

        if(tx.orchard_notes[0] && tx.orchard_notes[0].memo) memo = tx.orchard_notes[0].memo.replace(/\n/g, '');
        else if(tx.sapling_notes[0] && tx.sapling_notes[0].memo) memo = tx.sapling_notes[0].memo.replace(/\n/g, '');
        // console.log(memo);
        if(memo) {
            try {
                const memoJson = JSON.parse(memo);
                if(memoJson) {
                    const playerId = memoJson.playerId;
                    const zebraId = memoJson.zebraId;
                    const amount = value;

                    let refund = false;
                    if(amount >= prizePool / 3) refund = true;
                    if(!zebraId || zebraId < 0 || zebraId > 5) refund = true;

                    if(refund) {
                        const player = await sequelize.models.players.findOne({
                            where: {
                                id: playerId
                            }
                        });
                        const memo = `We couldn't place your bet, either you sent an invalid bet amount or an invalid zebra id.`;
                        console.log(memo);
                        const refundTx = new TxBuilder()
                            .setRecipient(player.address)
                            .setAmount(amount)
                            .setMemo(memo);
                        // console.log(refundTx);
                        const refundJson = refundTx.getSendJSON();
                        payQueue.push(refundJson[0]);
                        resolve("Deposit refunded.")
                    }
                    else {
                        placeBet(playerId, zebraId, amount, txid);
                        resolve("Bet ok")
                    }
                }
            }
            catch(e) {
                console.log("Error parsing memo, cannot place a bet or refund ...");
                resolve('something wrong');
            }
        }
    });
}