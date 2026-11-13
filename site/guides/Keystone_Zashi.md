<a href="https://github.com/zechub/zechub/edit/main/site/guides/Keystone_Zashi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Keystone Zodl (formerly Zashi) User Guide

> Keep shielded ZEC in cold storage: pair a Keystone hardware wallet with the Zodl app (formerly Zashi, rebranded in February 2026) and sign transactions by QR code.

## TL;DR

* Keystone 3 Pro (or Keystone 3) with the Cypherpunk firmware works as an air-gapped signer for Zodl, so shielded ZEC can stay in cold storage.
* Before you start: battery above 20%, the USB cable (or a FAT32 MicroSD card) for firmware updates, and the Zodl app on your phone.
* Verify the device on Keystone's website first. This checks that it was not tampered with in transit.
* Create the wallet on the Keystone and write down the 24-word seed phrase offline. It never goes into Zodl.
* Connect: on Keystone tap "..." > Connect Software Wallet > Zodl, then in Zodl tap Connect Hardware Wallet and scan the QR.
* Zodl builds each transaction; you approve and sign it on the Keystone screen by scanning QR codes back and forth.

## Core Explanation

A hardware wallet keeps your spending keys on a separate device that never touches the internet. Keystone is air-gapped: it talks to your phone only through QR codes, not Bluetooth or USB.

In this setup Zodl is the "watch" side. It syncs with the Zcash network, shows your shielded balance and prepares transactions. The Keystone holds the seed phrase and signs. A compromised phone can see your balance, but it cannot move funds without approval on the Keystone.

The steps below cover preparing the device, verifying it, updating the firmware, creating the wallet and connecting it to Zodl.

## Overview

Twitter Guide:  => [Zodl (formerly Zashi) x Keystone Hardware Wallet Integration Twitter Guide](https://x.com/zashi_app/status/1869793574880973144) 

This integration marks a significant evolution in Zcash usability by enabling cold storage of shielded ZEC. The Zcash community has faced setbacks with other hardware wallet platforms in the past, but Keystone emerged as a collaborative partner willing to push boundaries and innovate alongside the Electric Coin Company. The Keystone team received a ZCG grant to fuel their side of the work.

## Keystone X Zodl Tutorial

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zodl Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## Preparation
[Order & Receive Your Keystone 3 Pro or Keystone 3](https://keyst.one) 

Battery Level: Ensure your keystone device has a battery level above 20%.

USB Cable or SD Card:

- USB cable for firmware Update (included).
- Micro SD card (under 1 TB) for upgrades (purchase separately).

Access to Keystones official website for Verification and Firmware Update.

Zodl app setup on your mobile device.

## [Step by Step Guide(Keystone Device)](https://keyst.one/get-started) 


**Choose Your Language**

- **Device Verification (via QR):** Device Verification is crucial to detect potential contamination during transportation, prevent supply chain attacks, and ensure the safety of installed firmware.
  - Visit the Device Verification page on the Keystone website.
  - Click on Scan QR Code on the official website.
  - Use your Keystone camera to scan the QR code shown on the website.
  - A verification code will appear on your Keystone screen.
  - Enter this code on the website to complete the verification process.

- **Firmware Update:**
  - Update via MicroSD card
    - Make sure your Keystone wallet has at least 20% battery charge.
    - Insert the SD card into your computer and format it as FAT32.
    - Download the latest Cypherpunk firmware version from the [Keystone Firmware Update page](https://keyst.one/firmware) and save the keystone3.bin file to the root of your MicroSD card.
    - Place the SD card with the firmware into your Keystone wallet.
    - Access the "Upgrade" option on your Keystone wallet, then follow the on-screen instructions to initiate the update process.
  - **Update via USB Cable**
    - If your firmware version is below 1.0.4, you will need to perform the initial update using a MicroSD card before you can proceed with USB updates.
    - Ensure your Keystone wallet has at least 20% battery charge.
    - Tap on via USB and use the USB cable to connect your Keystone wallet to your computer. Tap [Approve] to grant your Keystone wallet USB access, as it might otherwise only allow charging.
    - Open your computers web browser and go to the [Keystone Firmware Update page](https://keyst.one/firmware)
    - On the update page, click the Install Update button and follow the provided instructions to install the latest firmware.
- **Create Wallet:**
    - Secure Password: Choose a strong PIN or password to protect your wallet.
    - Name Your Wallet (Optional): Optionally, give your wallet a name for easy identification or skip this step.
    - Select Create New Wallet if you are setting up a wallet for the first time.
    - Your device will generate a 24 word seed phrase.
    - Write down this seed phrase and store it securely.
    - Confirm the seed phrase by verifying the words in the correct order as displayed on the screen.
- **Connect Zodl + Keystone Wallet:**
    - On the Keystone device: Tap … on the main page
    - Tap Connect Software Wallet and choose Zodl. The QR code for connection to Zodl will appear.
    - In Zodl App: Tap Zodl dropdown (top left of screen)
    - Tap Connect Hardware Wallet
    - Tap Ready to Scan
    - Scan the QR displayed on Keystone Device
    - In Zodl App: Confirm Keystone Wallet Account by tapping displayed account
    - Tap Connect on bottom of screen


## Extra Help

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Connect Keystone Hardware Wallet to Zodl"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Sign an Outgoing Transaction with Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>




