<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash Lightwallet Nodes

## Introduction

Zcash, a privacy-focused cryptocurrency, supports a feature called "lightwallet nodes" that enables users to interact with the Zcash blockchain without downloading the entire blockchain history. This wiki page provides an overview of lightwallet nodes, the role of the "lightwalletd" service in the Zcash ecosystem, a current list of lightwallet node servers, and instructions on how to change servers in popular wallets like Ywallet and Zingo.

## Lightwalletd Service

The "lightwalletd" service, short for "lightwallet daemon," plays a critical role in Zcash's lightwallet node ecosystem. It acts as an intermediary that provides lightweight clients (lightwallets) with the information they need to function effectively. Here's a brief explainer of the lightwalletd service:

__Data Aggregator__: Lightwalletd aggregates data from the Zcash blockchain, such as transaction information, block data, and shielded pool information.

__Simplified Verification__: Lightwalletd performs simplified verification of this data, allowing lightwallets to access necessary information without having to validate the entire blockchain.

__Privacy Preservation__: The service maintains the privacy of Zcash users by not requiring them to expose their viewing keys or personal transaction information.

__Efficient Synchronization__: Lightwalletd enables efficient synchronization for lightwallets, significantly reducing the time and resources required to get up to date with the Zcash blockchain.


## Current List of Lightwalletd Servers

* [status.zec.rocks](https://status.zec.rocks/)
* [hosh.zec.rocks](https://hosh.zec.rocks/zec)

## Changing Servers in Mobile Wallets

Changing the lightwallet node server is relatively straightforward. Find and access the advanced settings within the application.

__Open Ywallet/Zingo/Zashi/eZcash__: Launch your wallet of choice on your device.

#### Ywallet:

For Ywallet it is the cog on the top right corner - Go to the Zcash tab. 

![SmartSelect_20250313_105128](https://github.com/user-attachments/assets/b0a2910b-dbdf-4292-8e69-af5a386aa183)

#### Zingo:

For Zingo it is in the hamburger menu on the top left corner, then click on settings and scroll down

![SmartSelect_20250313_105737_Zingo](https://github.com/user-attachments/assets/ea8f7672-e644-41a5-a422-db131740404a)

#### Zashi:

For Zashi it is the cog on the top right corner - Go to Advanced Settings, and then Choose a server

![SmartSelect_20250313_110200_Zashi](https://github.com/user-attachments/assets/5a9d050a-8308-4cc2-907e-513072066aed)

#### eZcash

For eZcash it is in the hamburger menu on the top left corner, then click on Settings, tap on Advanced

![SmartSelect_20250313_110616](https://github.com/user-attachments/assets/655c0172-61a0-4322-b8cf-4eee4bb53b51)


## Conclusion

Zcash's lightwallet nodes and the lightwalletd service provide a convenient and privacy-preserving way for users to interact with the blockchain. The ability to change servers offers flexibility in selecting a node that best suits your needs. 
