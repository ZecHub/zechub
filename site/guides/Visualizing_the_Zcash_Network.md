
#  Visualizing the Zcash Network

The following is a guide on how to run the Ziggurat 3.0 Crawler for Zcash as well as the associated programs Crunchy and P2P-Viz on Ubuntu 22.04 for gathering and visualizing Zcash network information.  
The linked video below follows the same process.

https://www.youtube.com/watch?v=Nq5cLiAHxPI

----------------
## Install Requirements: 

Rust [https://rustup.rs/](https://rustup.rs/)

## Optional:
jq [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(for displaying json information in the terminal)

curl [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(for querying the crawler RPC)

npm (with nvm) [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(for displaying P2P-Viz in the browser)

----------------


----------------
Ziggurat 3.0 Repository
[https://github.com/runziggurat](https://github.com/runziggurat)

Crawler Repo
[https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Crunchy Repo
[https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

P2P-Viz Repo
[https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Begin by applying normal updates.

>  Run the following commands:
```fish
sudo apt update
sudo apt upgrade
```

----------------

## Zcash Network Crawler

The Zcash Crawler lives inside of a folder named 'zcash' so it may be advisable to create a new directory before cloning the crawler (runziggurat/zcash repo).


>  From the /Home directory, Run the following commands:
```fish
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Navigate in browser to 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Or open the readme at 
'/runziggurat/zcash/src/tools/crawler/README.md'

This page contains information about specific usage. 

----------------


```fish
$ cargo run --release --features crawler --bin crawler -- --help

OPTIONS:
    -c, --crawl-interval <CRAWL_INTERVAL>
            The main crawling loop interval in seconds [default: 5]

    -h, --help
            Print help information

    -r, --rpc-addr <RPC_ADDR>
            If present, start an RPC server at the specified address

    -s, --seed-addrs <SEED_ADDRS>...
            A list of initial standalone IP addresses and/or DNS servers to connect to

    -n, --node-listening-port <NODE_LISTENING_PORT>
            Default port used for connecting to the nodes [default: 8233]

    -V, --version
            Print version information
```

`--seed-addrs` \ `--dns-seed` is the only required argument and needs at least one specified address for it to run.



----------------

The command 'cargo run --release --features crawler --bin crawler -- --help' is the literal run command and will print the help menu shown.


>  Run the command
```fish
cargo run --release --features crawler --bin crawler -- --help
```


This will compile the program and ensure everything is working properly.

To run the Crawler, it is required to add a '--seed-addrs' flag to the start command, containing at least one, valid, Zcash node IP address. The crawler should be allowed to run for a reasonable amount of time to get an accurate result. Some sample node IP addresses can be found on  [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

To get information from the Crawler while its running, it is required to add the '--rpc-addr' flag to the start command. This isn't required to only run the crawler itself but will otherwise require stopping the crawler (ctrl+c or SIGKILL) to display any information at all.


>  Run the command
```fish
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

The crawler will begin communicating with the network (default every 20 secs) and gathering network data. 
Information from the Crawler can be displayed by using curl to query the node (this requires jq for displaying that info). 
The Crawler RPC address in this example is set to '127.0.0.1:54321'


>  In another Terminal, Run the command
```fish
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

This will display the current collected '.protocol_version' data contained within the '.result' field. The '.result' field is very large so it is useful to call specific portions of it instead. Other useful data types are '.num_known_nodes', '.num_good_nodes', '.user_agents' etc. See the metrics section [Here](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
To run Crunchy and P2P-Viz, it is required to pipe the '.result' into a .json file. 


>  Run the command
```fish
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

This will create a 'latest.json' file in the current directory.This 'latest.json' file will be used with Crunchy. 

At this point, the Crawler may be stopped with 'ctrl+c' if no more data is required. The Crawler will output a report to the terminal of useful information.


----------------

## Crunchy

Crunchy is required to aggregate the output json file for use with P2P-Viz.


To build Crunchy, navigate to your '/runziggurat' folder 

>  To  clone into the Crunchy repo, Run the following commands
```fish
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Copy and paste the 'latest.json' file into the 'crunchy/testdata/' folder.

>  Run the following commands 
```fish
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

This will create a Zcash node filtered 'state.json' file in the 'crunchy/testdata/' folder to be used with P2P-Viz.

----------------

## P2P-Viz

To build P2P-Viz, it is required to have npm. 


>  To install npm with nvm, run the following commands:
```fish
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Close and restart the terminal.


>  Run the command:
```fish
nvm install --lts
```

navigate to your '/runziggurat' folder


>  To clone into the P2P-Viz repo and start, Run the following commands
```fish
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Open a browser at [http://localhost:3000](http://localhost:3000). 

Select 'Geolocation' and then select 'Choose state file'.

From the file explorer pop-up, select the 'state.json' file. 

The node explorer World Map will populate with the file data. See the readme [Here](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) for more details on usage options and settings.


----------------
TIPS! 

You can set the Crawler on a timed crawl simply with the 'timeout' command which will issue a specific kill command after a set amount of time. Run 'timeout --help' for more info.
The following command will start and also automatically stop the crawler after 50 mins.

>  Run the command
```fish
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
TIPS! 

The 'latest.json' can be called and written into the '/testdata' so you don't have to manually copy and paste it.

----------------
TIPS! 

IP Address information can be gathered from the output and then used to reseed the Crawler at start (--seed-addrs). This will reduce the time required to conduct a full crawl! 
