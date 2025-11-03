# Ywallet FROST demo


<iframe width="640" height="360" src="https://www.youtube.com/embed/3IZgxDqQNbw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Compile FROST bins

[Github link](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Use the above repo and follow directions on compiling: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Bins will be the the target folder.

## Create FROST UA

`./generateFROST_UA.sh`



## Import UFVK into Ywallet

Accounts -> Click + and paste ufvk from step above

## Create a transaction with Ywallet

Paste in any UA and send a tx. Save the file.

## Start the FROST signing proceedure 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

first input is the location of the raw tx from the step above
second input is the location and name of the signed tx you want to broadcast
This is part where you tell FROST which transction you want everyone to sign

## Start Coordinator

`./runCoordinator.sh`

This coordinates each participants signature and creates a group signature

## Have each Participant sign for this transaction

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Finalize signed Transaction

In the coordinator window, copy the group signature that is output and paste it into the FROST signing window.
This will complete the FROST signing and output 'mysingedtx'


## Broadcast your Transaction with Ywallet

Click 'More' on bottom right side of Ywallet and find 'Broadcast'. Find 'mysignedtx' and click ok.

If everything works you will get a transaction ID :)
