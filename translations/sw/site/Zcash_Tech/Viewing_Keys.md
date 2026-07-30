<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kuangalia funguo

anwani Shielded kuwawezesha watumiaji kufanya manunuzi wakati akifunua kama kidogo ya habari iwezekanavyo juu ya blockchain Zcash. Nini kinatokea wakati unahitaji kutoa taarifa nyeti karibu shughuli Shielded Zcash kwa chama maalum? Kila anwani shielded ni pamoja na kuangalia muhimu. kuona funguo zilianzishwa katika [ZIP 310](https://zips.z.cash/zip-0310) and added to the protocol in the Sapling network upgrade. Viewing keys are a crucial part of Zcash as they allow users to selectively disclose information about transactions.

### Kwa nini utumie ufunguo wa kutazama?

Kwa nini mtumiaji angetaka kufanya hivi? Kutoka kwa blogi ya Electric Coin Co juu ya jambo hilo...

*- An exchange wants to detect when a customer deposits ZEC to a shielded address, while keeping the **spend authority** keys on secure hardware. The exchange could generate an incoming viewing key and load it onto an Internet-connected **detection** node, while the spending key remains on the more secure system.*

*- A custodian needs to provide visibility of their Zcash holdings to auditors. The custodian may generate a full viewing key for each of their shielded addresses and share that key with their auditor. The auditor will be able to verify the balance of those addresses and review past transaction activity to and from those addresses.* 

*- Kubadilishana inaweza kuhitaji kufanya ukaguzi wa bidii kwa mteja ambaye hufanya amana kutoka anwani ya ulinzi. Kubadilisha kunaweza kuuliza wateja kuona ufunguo wa anwani yao ya ulinde na kuitumia kukagua shughuli za shughuli za wateja zilizohifadhiwa kama sehemu ya taratibu hizi za uangalifu.*

### Jinsi ya kupata ufunguo wako wa kutazama

#### zcashd

* Orodha anwani zote inayojulikana kwa kutumia *./zcash-cli listaddresses*

* Kisha kutoa amri ifuatayo kwa ama UA au Sapling anwani ulinzi

  ```bash
  ./zcash-cli z_exportviewingkey "<UA or Z address>"
  ```

#### Ywallet

* Katika kona ya juu kulia chagua "Backup", kuthibitisha simu yako, kisha tu nakala yako kuangalia muhimu kwamba ni kuonyeshwa.

### Jinsi ya kutumia ufunguo wako viewing

#### zcashd

* Tumia yafuatayo na yoyote vkey au ukey: 

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

#### mkoba

* Katika kona ya juu kulia, teua "Akaunti", bonyeza "+" katika kona ya chini kulia kuongeza na kuagiza yako kuangalia muhimu kuongeza yako 'kusoma tu' akaunti.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="" width="200" height="280"/>
</a>


#### zcashblockexplorer.com

* Tu kuelekeza kivinjari chako kwa [hapa](https://zcashblockexplorer.com/vk) na kusubiri kwa ajili ya matokeo! kumbuka: matokeo haya sasa ni juu ya node zcashblockexplorer na hivyo wewe ni kuamini habari hii na wamiliki wa zcashblock.com

### Rasilimali

Wakati teknolojia kubwa, ni ilipendekeza kwamba wewe kutumia viewing funguo juu ya kama inahitajika msingi.

Angalia mafunzo haya juu ya kuona funguo. orodha ya rasilimali juu ya mada ni chini kama unataka kupiga mbizi zaidi:

- [ECC, Kueleza Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure na Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
