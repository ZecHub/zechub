
Zchat MessagingApp: ZecHub 2024 Hackathon

Introduction

This project is a Zchat messaging app that accepts and processes funds in Zcash ($ZEC) while sending messages to loved ones. The app is a proof of concept (PoC) created for the ZecHub 2024 Hackathon, demonstrating interoperability with Zcash through fast payments processing directly from the blockchain and its integration to an everyday messaging platform.

Zcash Interoperability

Wallet Connect Feature

The app allows players to connect their Zcash shielded wallet in order to use the messaging ap. The process for connecting the wallet is as follows:

• The user creates an account and a shielded Zcash address is created for that particular user

Sending Messages and Processing Payments

• Sending Messages: Players can send messages by selecting their preferred user to chat with from the list of users. Each message is cryptographically encrypted and it is end to end. On the backend, it is also cryptographically encrypted hence a different message hash is stored in the database so if it is leaked, it will useless as another layer of encryption is present. As messages are sent it is updated in real time with the help of websocketsthachat transaction includes a memo field with a specially crafted JSON payload. The memo format helps the backend system process and verify the bet.

• Processing Payments: Payments are initiated with two options: Request and Send. On Request, users can scan a QR Code to quickly transfer the payment details to their wallet address. On send, users can send funds only requiring and amount input and then quickly processes it as soon as transactions enter the mempool, without waiting for full confirmations.


Known Bugs

Please note that this project is a PoC and not intended for production use. Below are some known bugs and issues.

• Message List User Animation: Not all the parts of the message page updates when messages or transactions are updated.

• Zcash Service: Zcash can sometimes fail temporarily or unexpectedly stop which renders transaction and registration logic inactive.

• No Refunds: If the backend fails to parse the memo field correctly or if the  message transaction is outside the valid range, there are no refunds.

• Further Issues: This is a proof of concept, so there may be additional bugs or limitations.


Financing  
To continue its trajectory toward full-scale implementation, the developer is seeking additional funding to enhance and expand Zchat's features. The focus will be on scaling infrastructure to support more users, conducting extensive security audits, and refining the user interface. Future development plans include the introduction of group chat capabilities, multi-device synchronization, and support for additional cryptocurrencies. While the initial development has been a success, external financing is crucial to move beyond the proof-of-concept stage and bring Zchat to a broader audience. With the right financial backing, Zchat can evolve into a fully functional, secure, and scalable application, ready to take its place at the forefront of decentralized communication and cryptocurrency integration.
