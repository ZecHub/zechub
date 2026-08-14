<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Why Privacy Matters

In the digital era, safeguarding your [privacy](https://www.privacyguides.org/en/) has become increasingly vital. While some may view privacy as a lost cause, it is not. Your privacy is at stake and should be a concern. Privacy holds significant value as it relates to power, and ensuring that power is wielded responsibly is crucial.

## Tor & I2P Technologies

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) is a proxy tool that ustilizes the Tor network to establish connections for applications. Torbot achieves this by routing their traffic through Tor, thus enhancing [privacy and anonymity](https://www.torproject.org/) for these applications.

## I2P Network

The I2P network, also known as the [Invisible Internet Project](https://geti2p.net/en/about/intro), is a fully encrypted peer-to-peer overlay network. It ensures that the contents, source, and destination of messages are hidden from observers. In other words, nobody can see the origin or destination of the traffic or the actual contents of the messages being transmitted. The encryption used in I2P ensures a high level of privacy and anonymity for its users.

### Installing I2P

There are two implementations. The original [Java I2P](https://geti2p.net/en/download) runs on Windows, macOS, Linux and Android. [i2pd](https://i2pd.website/), written in C++, is lighter and is the usual choice on a server or a low-powered machine.

Once it is running, I2P exposes a local console on `127.0.0.1:7657` and proxies on `127.0.0.1:4444` (HTTP) and `127.0.0.1:4447` (SOCKS). Expect it to take several minutes on first start: I2P has to build tunnels through the network before anything works, and it gets faster the longer it stays online.

### Using I2P with Zcash

Be aware that **no current Zcash node speaks I2P natively.** Zebra has no I2P support, and neither did zcashd. If you see a guide claiming to run a Zcash node over I2P, it is describing something the software does not do.

What I2P is genuinely useful for here is everything around the wallet: reaching a site, a forum or a service without revealing your address. For anonymising the wallet connection itself, Tor is the practical option today, and the sections below cover it.

## Tor and I2P share common features but also have significant differences. 

Both Tor and I2P are decentralized and anonymous peer-to-peer networks, but I2P provides higher levels of security compared to Tor. However, I2P is primarily designed for accessing services like email, chat, and torrenting within its network and cannot be used to access the regular internet. On the other hand, Tor allows users to access the deep web, just like I2P, but it also functions as a regular browser for accessing websites on the surface web.

*Note: For more information on similarities and differences of Tor & I2P visit [here](https://geti2p.net/en/comparison/tor)*

## Routing a mobile wallet through Tor with Orbot

Orbot is a no-cost virtual private network (VPN) designed for smartphones that directs traffic from all applications on your device through the Tor network.

Follow these instructions to route a Zcash wallet through Tor. Note that Ywallet, which earlier versions of this guide used, is no longer maintained and will not follow the network after Ironwood, so pick a maintained wallet from the [Wallets](/using-zcash/wallets) page.

1.  Download and install *Orbot* from the app store.

2.  After insatllation, a greetings message will appear. Continue to the *Orbot* home page and click on *'Tor Enabled Apps'.*              

3. This will prompt a page on the screen showing the Tor-compatible applications. Find your Zcash wallet in the list and make sure it is selected.

4. A connection request to set up a VPN will appear, which will allow *Orbot* to monitor the network traffic. *Orbot* will Initialise once this permission has been approved. 

5. Check the taskbar or the Orbot homepage to verify that Tor is runnung, this is confirmed when you see 'Connected to the Tor network'.

*Note: If Tor is blocked by your mobile network, you may use a Bridge Server as an alternative way to connect.*


## Installing Tor on PC or desktop

* Tor browser can be downloaded from the official website, you can access the link [here](https://www.torproject.org/download/).

 The most convenient way for installing Tor is through the Tor Browser Bundle. If you prefer headless installations, you may opt to install the Tor daemon separately. 

*Note: By default, the Tor Browser bundle exposes a SOCKS listener on tcp/9150 and the Tor daemon exposes the SOCKS listener on tcp/9050.*

* Refer to the installation [instructions](https://support.torproject.org/apt/) specific to your operating system as provided by the Tor Project.

## Running a node over Tor

This is the part that has changed most, and the honest answer is that it is currently harder than it was.

**zcashd is gone.** It reached end of support and halted on 18 July 2026 at block 3,417,100. It will not restart, its download page returns a 404, and the apt repository is no longer served. Any instruction telling you to run `zcashd -proxy=127.0.0.1:9050` no longer applies to anything.

**Zebra cannot do it yet either.** Zebra is the maintained node, and its network crate does contain isolated-connection code for Tor, but the feature is commented out in `zebra-network/Cargo.toml`:

```
# tor = ["arti-client", "tor-rtcompat"]
```

The crate documentation says the same thing plainly: *"Tor connections are currently disabled until `arti-client`'s dependency `x25519-dalek v1.2.0` is updated."* The `connect_isolated_tor` function is commented out along with it. So there is no supported way to run a Zcash node over Tor today.

If you need node-level anonymity now, the workable approach is to put the whole machine behind Tor or a VPN at the operating-system level rather than configuring the node itself. That protects your network location without relying on node features that are not built.

### What you can still do today

- **Route your wallet through Tor** with Orbot on mobile, as described above. This is the practical option for most people, and it hides your IP from the lightwalletd server your wallet talks to
- **Use Tor Browser** for block explorers, forums and anything else where you would rather not be linked by address
- **Remember what Tor does not hide.** It anonymises your network location, not your on-chain activity. Sending from a transparent address is still public, and value crossing between shielded pools still publishes the amount. See [Shielded Pools](/using-zcash/shielded-pools) for what stays visible
