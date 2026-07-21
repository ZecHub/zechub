<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Igodo Nlele

Shielded addresses enable users to transact while revealing as little information as possible on the Zcash blockchain. What happens when you need to disclose sensitive information around a shielded Zcash transaction to a specific party? Every shielded address includes a viewing key. Viewing keys were introduced in [ZIP 310](https://zips.z.cash/zip-0310) ma gbakwunyere na protocol na nkwalite netwọk Sapling. Igodo nlele bụ akụkụ dị mkpa nke Zcash ka ha na-enye ndị ọrụ ohere ịkọwapụta ozi gbasara azụmahịa.

### N'ihi gịnị ka o ji jiri mkpịsị ugodi e ji ahụ ihe mee ihe?

Kedu ihe mere onye ọrụ ga-eji chọọ ime nke a? Site na blọọgụ Electric Coin Co. n'okwu a...

*- An exchange wants to detect when a customer deposits ZEC to a shielded address, while keeping the **spend authority** keys on secure hardware. The exchange could generate an incoming viewing key and load it onto an Internet-connected **detection** node, while the spending key remains on the more secure system.*

*- A custodian needs to provide visibility of their Zcash holdings to auditors. The custodian may generate a full viewing key for each of their shielded addresses and share that key with their auditor. The auditor will be able to verify the balance of those addresses and review past transaction activity to and from those addresses.* 

*- An exchange may need to conduct due diligence checks on a customer who makes deposits from a shielded address. The exchange could request the customers viewing key for their shielded address and use it to review the customers shielded transaction activity as part of these enhanced due diligence procedures.*

### Otu esi achọta igodo nlele gị

#### zcashd

* Depụta adreesị niile a maara site na iji *./zcash-cli listaddresses*

* Mgbe ahụ na-enye ndị na-esonụ iwu maka ma UA si ma ọ bụ Sapling echebe adreesị

  ```bash
  ./zcash-cli z_exportviewingkey "<UA or Z address>"
  ```

#### Ywallet

* Na akuku aka nri elu họrọ "Nchekwa", Nyochaa ekwentị gị, wee detuo igodo nlele gị nke egosiri.

### Otu esi eji igodo nlele gị

#### zcashd

* Jiri ihe ndị a na vkey ma ọ bụ ukey ọ bụla: 

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

#### obere akpa

* N'elu aka nri, họrọ "Akaụntụ", pịa "+" na akuku aka nri ala iji tinye ma bubata igodo nlele gị iji tinye akaụntụ 'agụ naanị' gị.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="" width="200" height="280"/>
</a>


#### zcashblockexplorer.com

* Naanị tinye ihe nchọgharị gị na [ebe a](https://zcashblockexplorer.com/vk) and wait for the results! note: this result is now on the zcashblockexplorer node and thus you're trusting this info with the owners of zcashblockexplorer.com

### Akụrụngwa

Ọ bụ ezie na ọ bụ nnukwu teknụzụ, a na-atụ aro ka ị jiri igodo nlele na ntọala dị mkpa.

Lelee nkuzi a na igodo nlele. Ndepụta nke ihe onwunwe na isiokwu dị n'okpuru ma ọ bụrụ na ịchọrọ ịbanye n'ime omimi:

- [ECC, na-akọwa igodo nlele](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, nhọrọ ngosi na igodo nlele](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
