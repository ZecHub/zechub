# Exploring Zcash Payment Request URIs

In the wide west of blockchain technology, private transactions are entering a new era of paradigm shift. I am thrilled to write about one of the most significant features of the Zcash wallet known as the “payment request URI.” 

## Overview of Dynamic QR Codes

URI stands for Universal Resource Identifier. That being said, they are special QR codes that act as unique sequence characters that identify an abstract or physical resource like resources on a web page, mail address, books, etc.“Zcash wallets that recognize this format allow users to swiftly construct transactions by clicking links on web pages or scanning QR codes. Say you have an online coffee shop, your customers can make purchases by scanning these QR codes with their Zcash wallet.”

## Use Cases of Payment Requests 

_It is worth mentioning that several payment request scenarios that exist to facilitate financial transactions, here are some of them:_

* Online Shopping Checkout: Payment requests are initiated by customers during online purchases.

* Hotel and Accommodation Bookings: Various booking platforms leverage payment request URLs for hotel reservations.

* Online Bill Payments: Utility companies use payment request URLs to enable customers to offset their bills seamlessly. 

* Event Ticket Purchases: Event organizers across borders use this mechanism to make ticket purchases easier.

* Peer-to-Peer Payments: Individuals can easily send payment requests to family and friends via messaging apps, with payment links embedded in the messages.

## Code Samples

There’s a [Zcash improvement proposal](https://zips.z.cash/zip-0321) that defines what payment URIs are; visit this web page to get a sneak peek of all Zcash amazing features there is - Having done that, navigate to  [ZIP 321: Payment Request URIs](https://zips.z.cash/zip-0321). Ultimately, anyone looking to create their own QR codes can use this [sample code ](https://zips.z.cash/zip-0321#uri-syntax)as a guide to building their own. 

**Valid Example**: `zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase`

### Mobile Wallet Guide
Below is a step-by-step guide to creating a unique QR code; this method is exclusively for YWallet users:

Firstly, open your YWallet then hit the QR code button.
![step-1](https://drive.google.com/file/d/1QKQnq2psLVsXqKofYNv_CBHiZcdnqfIe/view?usp=sharing)

Check the following address types, fill in your desired amount, and enter your memo preferences.
![step-2](https://drive.google.com/file/d/16Jr8vsLJCTDbLkXshcg_u-5ukYRJ_OtE/view?usp=sharing)

Finally, click the QR code, then hit save - boom! You can now share your QR code with friends or social media communities to initiate transactions.
![step-3](https://drive.google.com/file/d/1RK4rpJfovkCTTD7diatWChPdTEsoIXkw/view?usp=sharing)