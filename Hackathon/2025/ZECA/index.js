const DiscordEngine = require('./engines/discord.engine');
const native = require('./dist/');
const { Transaction } = require ('./db');

require('dotenv').config();

const POLL_INTERVAL = process.env.POLL_INTERVAL;

let syncLock = false;

const engines = [
    new DiscordEngine({
        token: process.env.DISCORD_BOT_TOKEN,
        channelId: process.env.DISCORD_CHANNEL_ID,
    }),
];

async function startAll(ua) {
    for (const e of engines) {
        try {
            await e.start(ua);
        }
        catch (err) {
            console.error('Engine start failed', err);
        }
    }
}

async function broadcast(message, value, txid) {
    await Promise.allSettled(engines.map(e => e.post(message, value, txid)));
}

// APP entrypoint

(async () => {
    // Initialize zcash-walletd
    try {
        native.init();

        // Get default address
        const addrStr = native.getAddresses();
        const addrJson = JSON.parse(addrStr);

        let ua = "";
        if(addrJson[0] && addrJson[0].address) {
            ua = addrJson[0].address;
        }
        else {
            throw new Error("No addresses found.");
        }
        // Initialize engines (Discord)
        await startAll(ua);

        // Create timer to look for transactions
        setInterval(async () => {
            if(syncLock) {
                console.log("Already have a sync process.");
                return;
            }

            // First, wait for wallet sync
            console.log("Starting wallet sync");
            syncLock = true;

            const scan = native.requestScan();
            console.log(scan);
        
            // Then look for new transactions (account 0, index 0)

            const txnsStr = native.getTransfers(0, [0]);
            const txnsJson = JSON.parse(txnsStr);
            //console.log(txnsJson);

            // Get latest known transaction in the database
            const latest = await Transaction.max('height') || 0;

            // Keep only new transactions
            const newTxns = txnsJson.in.filter(tx => tx.height > latest);
            if (newTxns.length === 0) {
                console.log("No new incoming transactions.");
                syncLock = false;
                return;
            }

            console.log(`Received a total of ${newTxns.length} transactions`);

            // Add new transactions into the database
            const rows = newTxns.map(t => ({
                txid: t.txid,
                value: Number(t.amount) || 0,
                height: Number(t.height),
                memo: t.note ?? null,
            }));

            await Transaction.bulkCreate(rows, { ignoreDuplicates: true });

            // Send the memo to the platform engines
            for (const t of newTxns) {
                if (t.note && String(t.note).trim().length > 0) {
                    await broadcast(t.note, t.amount, t.txid);
                }
            }
            syncLock = false;            
        }, POLL_INTERVAL * 1000);
    }
    catch(err) {
        console.log(err);
        process.exit(0);
    }
})();