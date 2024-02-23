# Namada Protocol

<a href="">
    <img src="https://i.ibb.co/BZcZHS1/logo.png" alt="" width="400" height="200"/>
</a>


## What is Namada?

Namada Protocol serves as a Layer 1 platform based on proof-of-stake consensus, designed to provide interchain asset-agnostic privacy. Through the Inter-Blockchain Communication (IBC) protocol, Namada seamlessly integrates with fast-finality chains, enabling smooth interoperability. Additionally, Namada establishes a trustless two-way bridge with Ethereum, facilitating secure and reliable communication between the two networks.

Namada prioritizes privacy by implementing an enhanced iteration of the Multi-Asset Shielded Pool (MASP) circuit. This upgraded version enables all types of assets, including both fungible and non-fungible tokens, to utilize a shared shielded set just exactly as that of Zcash. As a result, the act of transferring supported assets on Namada becomes distinct as it becomes difficult to identify due to the high level of privacy involved. Also, the latest update to the Multi Asset Shielded Pool circuit enables shielded set rewards which is a groundbreaking feature or incentive that allocates resources to promote privacy as a public good.

## Ethereum Bridge + IBC Compatible

The integration of the Ethereum bridge into Namada eliminates the need for a separate protocol, as it becomes an integral part of the Namada ecosystem. Validators within Namada are entrusted with running the bridge alongside the core Namada protocol. These validators also serve as relayers when it comes to transferring assets to Namada, making the involvement of additional actors unnecessary. On the other hand, when transferring assets to Ethereum, external parties (known as relayers) are involved, although they bear no responsibility for validating or securing the bridge.

<a href="">
    <img src="https://i.ibb.co/wKds5RP/image.jpg" alt="" width="400" height="200"/>
</a>

Namada Protocol also has the ability to seamlessly connect with any fast-finality chain that supports the Inter-Blockchain Communication (IBC) protocol. When it comes to interoperating with Ethereum, Namada implements a specialized and secure Ethereum bridge that operates in a trustless manner. This bridge is carefully designed to prioritize safety by enforcing flow controls for all bridge connections and treating any faulty Ethereum transfers as a serious offense that can result in slashing penalties.

## Shielded Set Rewards

In the latest update of the [Namada Protocol](https://blog.namada.net/what-is-namada/), users who hold shielded assets are incentivized to actively participate in the shared shielded set. This is made possible through the integration of the updated MASP circuit, which now includes the innovative Convert Circuit. By leveraging this new feature, Namada encourages users to contribute to the shared shielded set by holding shielded assets.

In Namada, the shielded set is considered a non-exclusive and anti-rivalrous public good. This means that as more individuals utilize shielded transfers, the level of privacy guarantees improves for each participant. The protocol recognizes the importance of collective adoption and participation in enhancing privacy for all users. Therefore, by incentivizing users to hold shielded assets and contribute to the shared shielded set, Namada fosters a stronger and more robust privacy ecosystem.

## Shielded Assets Transaction

When it comes to shielded transfers, whether it involves an Ethereum non-fungible token (NFT), ATOM, or NAM, they are indistinguishable from one another. This means that the privacy-preserving features provided by the MASP (Modified Accumulator Sapling Protocol), an enhanced version of the Zcash Sapling circuit, apply uniformly to all types of assets. The MASP circuit enables all assets within the Namada ecosystem to share the same shielded set. This approach ensures that privacy guarantees are not fragmented among individual assets. Regardless of the transaction volume associated with a particular asset, the privacy protection remains consistent and independent.

<a href="">
    <img src="https://i.ibb.co/7CDmWk6/image-1.png" alt="" width="400" height="200"/>
</a>


By unifying the shielded set across different assets, Namada ensures that privacy is upheld uniformly, regardless of the specific asset type involved in a shielded transfer. This approach promotes a cohesive privacy framework within the protocol and enhances the confidentiality of transactions involving Ethereum NFTs, ATOM, NAM, and other supported assets. Namada also enables private transfer of fungible and non-fungible tokens using novel zk-SNARKs, ensuring confidentiality for native and non-native tokens just like it is done on Zcash.

## Less Fees and Fast Transactions

Namada combines two key elements to deliver fast transaction speed and finality: fast-proof generation and modern Byzantine Fault Tolerant (BFT) consensus. These two features enable Namada to achieve a transaction processing rate comparable to Visa, a well-known payment network recognized for its high throughput capabilities. Fast-proof generation refers to the efficient production of cryptographic proofs that validate the correctness and integrity of transactions on the Blockchain. By employing advanced techniques and optimizations, Namada Protocol minimizes the computational overhead required to generate these proofs, resulting in swift verification and confirmation of transactions.

Additionally, Namada utilizes modern BFT consensus algorithms, which ensure the integrity and agreement of transactions across the network. These consensus mechanisms enable Namada to reach a consensus on the order and validity of transactions, providing a strong guarantee of finality. With finality, transactions are considered irreversible, reducing the risk of double-spending or transaction rollback. Namada follows a similar approach to Anoma, another protocol known for its scalability solutions. Namada adopts fractal instances, which allow for the creation of nested chains within the main blockchain. This fractal structure enables horizontal scaling by distributing the load across multiple instances, enhancing the overall capacity and performance of the network.

## Namada and Zcash Strategic Alliance

According to a recent publication which can be found [Namada Protocol Blog](https://blog.namada.net/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/), the team behind Namada Protocol is excited to present a proposal and request-for-comment (RFC) for a strategic alliance between the Namada and Zcash assets, chains, and communities.


<a href="">
    <img src="https://i.ibb.co/FqsmkMb/image-2.png" alt="" width="400" height="200"/>
</a>

The proposed alliance encompasses three primary elements. Firstly, there is a grants pool that will be created to provide funding for projects that bring advantages to both Zcash and Namada. Secondly, an airdrop of NAM tokens will be allocated to ZEC holders. Lastly, a plan is in place to establish a trust-minimized bridge connecting Zcash and Namada. Once implemented, this bridge will enable ZEC holders, referred to as Zolders, to utilize their ZEC on Namada. Furthermore, Zolders will have the opportunity to access the wider Cosmos and Ethereum ecosystems through Namada. You can learn more about the strategic alliance on [Zcash Community Forum](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)

## Reference Links

![Thumbnail](https://img.youtube.com/vi/Wg_WtPdBig0/0.jpg)

[https://www.youtube.com/watch?v=Wg_WtPdBig0](https://www.youtube.com/watch?v=Wg_WtPdBig0)

[Namada Protocol Official Website](https://namada.net/)

[Namada Blog](https://blog.namada.net/)

[Namada Docs](https://docs.namada.net/)
