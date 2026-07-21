<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Àwọn Kókó Ìwòran

Shielded addresses enable users to transact while revealing as little information as possible on the Zcash blockchain. What happens when you need to disclose sensitive information around a shielded Zcash transaction to a specific party? Every shielded address includes a viewing key. Viewing keys were introduced in [ZIP 310](https://zips.z.cash/zip-0310) ati fi kun si ilana ni igbesoke nẹtiwọọki Sapling. Awọn bọtini wiwo jẹ apakan pataki ti Zcash bi wọn ṣe gba awọn olumulo laaye lati ṣafihan alaye ti o yanilenu nipa awọn iṣowo.

### Kí nìdí tá a fi máa ń lo kọ́kọ́rọ́ tó ń wo nǹkan?

Kí ló dé tí ẹnìkan á fi fẹ́ ṣe èyí? láti orí ìkànnì Electric Coin Co. lórí ọ̀rọ̀ náà...

*- An exchange wants to detect when a customer deposits ZEC to a shielded address, while keeping the **spend authority** keys on secure hardware. The exchange could generate an incoming viewing key and load it onto an Internet-connected **detection** node, while the spending key remains on the more secure system.*

*- A custodian needs to provide visibility of their Zcash holdings to auditors. The custodian may generate a full viewing key for each of their shielded addresses and share that key with their auditor. The auditor will be able to verify the balance of those addresses and review past transaction activity to and from those addresses.* 

*- An exchange may need to conduct due diligence checks on a customer who makes deposits from a shielded address. The exchange could request the customers viewing key for their shielded address and use it to review the customers shielded transaction activity as part of these enhanced due diligence procedures.*

### Bii o ṣe le wa bọtini wiwo rẹ

#### zcashd

* Ṣe àkójọ gbogbo àwọn àdírẹ́sì tí a mọ̀ nípa lílo *./zcash-cli listaddresses*

* Ki o si fi awọn wọnyi aṣẹ fun boya UA ká tabi Sapling shielded adirẹsi

  ```bash
  ./zcash-cli z_exportviewingkey "<UA or Z address>"
  ```

#### Ywallet

* Ni igun apa ọtun oke yan "Backup", Ṣe idanimọ foonu rẹ, lẹhinna o kan daakọ bọtini wiwo rẹ ti o han.

### Bii o ṣe le lo bọtini wiwo rẹ

#### zcashd

* Lo ohun ti o tẹle pẹlu vkey tabi ukey: 

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

#### àpamọ́

* Ni igun apa ọtun oke, yan "Akọọlẹ", tẹ lori "+" ni igun isalẹ ọtun lati ṣafikun ati gbe bọtini wiwo rẹ lati fi akọọlẹ 'ka nikan' rẹ kun.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="" width="200" height="280"/>
</a>


#### zcashblockexplorer.com

* Nìkan tọka aṣàwákiri rẹ si [bíi](https://zcashblockexplorer.com/vk) and wait for the results! note: this result is now on the zcashblockexplorer node and thus you're trusting this info with the owners of zcashblockexplorer.com

### Àwọn ohun àmúṣọrọ̀

Bi o tilẹ jẹ pe imọ-ẹrọ nla ni, a ṣe iṣeduro pe ki o lo awọn bọtini wiwo lori ipilẹ bi o ti nilo.

Ṣayẹwo ẹkọ yii lori wiwo awọn bọtini. Akojọ awọn orisun lori koko-ọrọ wa ni isalẹ ti o ba fẹ lati jinlẹ jinlẹ:

- [ECC, Ó Ń Ṣàlàyé Àwọn Kíkọ́ni Láti Rí I]](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Ṣiṣafihan Aṣayan ati Awọn bọtini wiwo](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
