# WHY PRIVACY MATTERS

In the digital era, safeguarding your [privacy](https://www.privacyguides.org/en/) has become increasingly vital. While some may view privacy as a lost cause, it is not. Your privacy is at stake and should be a concern. Privacy holds significant value as it relates to power, and ensuring that power is wielded responsibly is crucial.

## Tor & I2P Technologies

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) is a proxy tool that ustilizes the Tor network to establish connections for applications. Torbot achieves this by routing their traffic through Tor, thus enhancing [privacy and anonymity](https://www.torproject.org/) for these applications.

## I2P Network

The I2P network, also known as the [Invisible Internet Project](https://geti2p.net/en/about/intro), is a fully encrypted peer-to-peer overlay network. It ensures that the contents, source, and destination of messages are hidden from observers. In other words, nobody can see the origin or destination of the traffic or the actual contents of the messages being transmitted. The encryption used in I2P ensures a high level of privacy and anonymity for its users.

## Tor and I2P share common features but also have significant differences. 

Both Tor and I2P are decentralized and anonymous peer-to-peer networks, but I2P provides higher levels of security compared to Tor. However, I2P is primarily designed for accessing services like email, chat, and torrenting within its network and cannot be used to access the regular internet. On the other hand, Tor allows users to access the deep web, just like I2P, but it also functions as a regular browser for accessing websites on the surface web.

*Note: For more information on similarities and differences of Tor & I2P visit [here](https://geti2p.net/en/comparison/tor)*

## Intergrating Tor with Ywallet on Smartphone

Orbot is a no-cost virtual private network (VPN) designed for smartphones that directs traffic from all applications on your device through the Tor network.

Follow these instructions below to Connect Tor to Zcash Wallet *(Ywallet)*:

1.  Download and install *Orbot* from the app store.

2.  After insatllation, a greetings message will appear. Continue to the *Orbot* home page and click on *'Tor Enabled Apps'.*              

3. This will prompt a page on the screen showing the Tor-compatible applications. Look For the *Ywallet* App and make sure it is selected.

4. A connection request to set up a VPN will appear, which will allow *Orbot* to monitor the network traffic. *Orbot* will Initialise once this permission has been approved. 

5. Check the taskbar or the Orbot homepage to verify that Tor is runnung, this is confirmed when you see 'Connected to the Tor network'.

* For video tutorial wacth [here](https://drive.google.com/file/d/12ODTLrjgSzYFeAOTrv-P9LvfBVOvrSXK/view?usp=sharing)

*Note: If Tor is blocked by your mobile network, you may use a Bridge Server as an alternative way to connect.*

![download Orbot](https://i.ibb.co/sbTLtGz/Download-Orbot.jpg/img)
![Welcomemessage](https://i.ibb.co/7t7FVHB/Welcome-message.jpg/img)
![OrbotHomePage](https://i.ibb.co/jkZDbq6/Orbotmainpage.jpg/img)
![YwalletinTor](https://i.ibb.co/CQK6fST/Zcashywallet.jpg/img)
![ConnectionRequest](https://i.ibb.co/zX7WhWM/Connection-Request.jpg/img)
![Orbotisstarting](https://i.ibb.co/g4SrDWv/Orbotis-Starting.jpg/img)
![ActiveconnectionbetweenYwallet&Tor](https://i.ibb.co/2qRp0xh/Ywallet-Tor.jpg/img)
![Activeconnectionontaskbar](https://i.ibb.co/xDKFC7f/Activeconnection.jpg/img)
![Bridges](https://i.ibb.co/CM8GjbC/Bridges.jpg/img)

## How to set up a Zcash wallet with Torbot on PC/Desktop

## Tor support in Zcash?

* Tor browser can be downloaded from the official website, you can access the link [here](https://www.torproject.org/download/).

 The most convenient way for installing Tor is through the Tor Browser Bundle. If you prefer headless installations, you may opt to install the Tor daemon separately. 

*Note: By default, Tor Browser bundle esxposes a SOCKS listtener on tcp/9150 and Tor daemon exposes the SOCKS listener on tcp/9050.*

* Refer to the installation [instructions](https://support.torproject.org/apt/) specific to your operating system as provided by the Tor Project.

## Install Zcashd wallet

Zcashd is the official linux-based full-node wallet which is updated and maintained by core developers from the Electric coin Co. It is intentded for users who may want to mine and validate zcash transactions, as well as sending and receing Zcash.

* The official website to download Zcashd Wallet can be found [here](https://electriccoin.co/zcashd/) 

* Install wallet: Link to the Tutorial video [here](https://www.youtube.com/watch?v=hTKL0jPu7X0) provided by the Zcash wallet developers.

##  Run Zcashd over Tor 

* In order to Configure Zcashd to use Tor SOCKS proxy, you will be required to modify the Zcash.conf file. Follow the instructions below:

 To enable Tor SOCKS proxy add the following line: 

  $ zcashd -proxy=127.0.0.1:9050
      
For configuration changes to take effect,it is advised to restart zcashd. 

