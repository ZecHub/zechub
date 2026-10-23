<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Non-Custodial_Exchanges.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# <img src="/content-images/ZEC-USD-a2189a84b9.webp" alt="Alt Text" width="50"/>   Non-Custodial Exchanges

[Zcash Non-Custodial Exchanges](/dex)

In the ever-evolving world of cryptocurrency trading, non-custodial exchanges, also known as Decentralized Exchanges or DEXs, let users trade without handing their funds to an exchange account. You keep your own keys, but that does not mean nobody else is involved. Depending on the route, a swap can pass through a website or wallet app, a routing service, smart contracts, solvers and bridges.

The exchanges listed above let you get and trade Zcash from your own wallet. How private a swap is depends on the service, the network you pay from, and whether your ZEC ends up in a shielded address. The sections below explain the difference.

### **Understanding Non Custodial Exchanges**

Non-custodial exchanges, also known as Decentralized Exchanges (DEXs) are platforms that facilitate cryptocurrency trading without requiring users to deposit their funds into the exchange itself. Instead, users keep control of their private keys and trade from their own wallets. Cross-chain swaps still rely on other parties to quote, route and settle the trade (see below).

This can improve security, as users are not relying on the exchange to hold their assets, which reduces the risk of hacks or mismanagement. It does not make a swap private on its own. Transactions on non-custodial exchanges often use smart contracts, which are public, and the service you use can still see your addresses and connection details.

A key advantage of non-custodial cryptocurrency exchanges lies in the increased control they provide to users over their assets. As these exchanges do not retain the assets, users enjoy complete ownership and authority over their digital currencies.

### **Non Custodial Exchanges Vs Custodial Exchanges**

**#1 Security**: Non-custodial exchanges remove the need to keep funds in a central exchange account. Users keep control of their private keys, reducing the risk of hacks, insider attacks and platform failures that custodial exchanges may experience. Cross-chain swaps can still hold funds for a short time in a deposit address or bridge while the trade settles.

**#2 Privacy**: Non-custodial swaps usually do not need an exchange account, so you often skip signing up with an email or ID. That is not the same as anonymity. The deposit you send on the source network (for example Solana or Ethereum) is public on that chain, and the service can still see your wallet addresses, IP address and swap details. Privacy on the Zcash side depends on where your ZEC lands (see below).

**#3 Decentralization**: Non-custodial exchanges align more closely with the decentralized ethos of cryptocurrencies. Users have greater autonomy and control over their trading activities, in line with the broader principles of blockchain technology.

When it comes to Custodial Exchanges, the level of Decentralization is often quite minimal in most centralized exchanges which give rise to the exchange team or officials managing user data or information on the exchange.

**#4 Adaptability to Changing Regulations**: Non-custodial exchanges are often more adaptable to changing regulatory environments. Since they do not hold user funds, they might have fewer compliance challenges compared to custodial exchanges.

**#5 Innovation and Experimentation**: Non-custodial exchanges frequently drive innovation in the crypto space. They encourage the development of decentralized technologies, such as automated market makers (AMMs) and decentralized finance (DeFi) applications.

**#6 Global Accessibility**: Non-custodial exchanges often provide access to cryptocurrencies for users around the world, including regions where regulatory hurdles might limit the availability of custodial exchange services.

**#7 No KYC Requirements**: Many non-custodial exchanges do not ask for identity documents up front. Most still screen wallet addresses against compliance databases, and a swap can be delayed, blocked or refused if something is flagged. Check the service's terms before relying on it.

### **What Zcash Protects and What It Does Not**

Zcash privacy comes from shielded addresses. When ZEC moves between shielded addresses, the sender, receiver, amount and memo are encrypted on the Zcash chain. See [Shielded Pools](/using-zcash/shielded-pools) for how this works.

A swap has parts that Zcash cannot hide:

- **The source network.** Funds you send from Solana, Ethereum or another public chain are visible on that chain, including your address and the amount.
- **The receiving address.** Some swap routes deliver ZEC to a transparent address. For example, Near Intents lists ZEC as supported for [transparent addresses only](https://docs.near-intents.org/resources/chain-support). ZEC sent to a transparent (t1 or t3) address is public, much like Bitcoin. Shielding it afterwards protects what you do next, but the incoming transfer and the shielding transaction stay visible.
- **The service.** The app and any routing service see the addresses and amounts you give them, plus connection data such as your IP address.

Send the ZEC to a wallet you control and shield it before spending. [Using ZEC Privately](/guides/using-zec-privately) covers the next steps.

### **Who Is Involved in a Swap**

Take a swap routed through the Near Intents 1Click service as an example. Its [API terms](https://docs.near-intents.org/security-compliance/terms-of-service) treat these as separate parts:

- **The interface**: the website or wallet you use. It can be run by Intents Technology or by a third party with its own terms.
- **1Click**: a routing and settlement service run by Intents Technology Limited. You send funds to a deposit address created for your quote. The docs say 1Click does not take custody, but the terms note that assets may be held or locked in bridge infrastructure while a transfer is in progress.
- **The protocol**: the Near Intents smart contracts.
- **Solvers**: independent third parties that fill the quote.
- **Bridges**: native ZEC moves over the PoA Bridge, which Intents Technology operates.

Near Intents also [screens integrated quote flows](https://docs.near-intents.org/security-compliance/risk-and-compliance) against several AML databases, and says coverage varies by flow and integration. Under its terms, a flagged swap can be delayed, blocked, frozen or rejected.

### **What You Share During a Swap**

- The ZEC address that receives the swap, and a refund address on the source network.
- The asset and amount, and the deposit transaction you send, which is public on the source chain.
- Connection data. The 1Click terms say Intents Technology may collect request metadata, IP addresses and wallet addresses, and the privacy policy on near.com lists IP address, location, browser and device information.
- Anything the app adds on top, such as other connected wallet addresses. Apps may also run your wallet through their own compliance checks.

### **Where to Check Terms and Support**

Terms change, so read the current versions before a large swap.

- **Start with the app you use.** It is your main point of contact. The 1Click API terms say Intents Technology has no direct relationship with users of apps built on it.
- **Near Intents:** the terms and privacy policy at near.com/terms and near.com/privacy, plus the [1Click API terms](https://docs.near-intents.org/security-compliance/terms-of-service) and [risk and compliance](https://docs.near-intents.org/security-compliance/risk-and-compliance).
- **Tracking and support:** look up a swap on the [Near Intents Explorer](https://explorer.near-intents.org) or ask in the [Near Intents Telegram](https://t.me/near_intents).
- **Refunds:** a failed swap may be sent back to the refund address you gave, but near.com's terms say a refund is not guaranteed. The 1Click terms also say recovery requests for user errors under USD 300 are not considered.

Now, let us explore a few of the accessible non-custodial exchanges that facilitate Zcash trading. Utilizing these platforms will provide you with a convenient means to acquire more Zcash coins.

### **Summary**

Non-custodial exchanges, or DEXs, let you trade from your own wallet while keeping control of your private keys. That helps security, but privacy depends on the route: the source chain is public, the service sees your addresses and connection data, and your ZEC is only private once it sits in a shielded address.

While non-custodial exchanges offer compelling advantages, it is important to acknowledge that they might come with drawbacks, such as potential liquidity issues and a steeper learning curve for less experienced users.

As with any financial decision, traders should carefully assess their priorities, risk tolerance, and familiarity with the technology before choosing between non-custodial and custodial exchange options.
