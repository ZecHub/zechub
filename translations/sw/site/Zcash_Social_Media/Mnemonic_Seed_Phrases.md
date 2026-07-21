# Zero hadi Zero Maarifa: Mnemonic Seed Maneno

**Series:** Zero hadi Zero Maarifa

Mnemonic seed phrases underpin one of the most important aspects of cryptocurrency - ** kujilinda **. 
Leo tunajifunza jinsi ya mbegu maneno ni yanayotokana na kutumika katika pochi.

---

## Maneno ya Kumbuka ya Mbegu Ni Nini?

Sentensi za kupona zinafafanuliwa na vipimo vya ** BIP-39 **, aina ya kawaida ya kifungu cha kupona kinachotumiwa leo.

Uundaji wa maneno ahueni huanza kwa kuzalisha ** randomness **. entropy zaidi ina maana usalama zaidi. ** 128 bits ** ya entropic inachukuliwa kutosha kwa watumiaji wengi.

![Usemi mbegu dhana](https://pbs.twimg.com/media/FooM3qWWACgrwzn.jpg)

Kulingana na urefu wa entropy ya awali, phrase ahueni itakuwa **12 kwa 24 maneno ** muda mrefu.

---

## Hatua kwa Hatua: Jinsi Maneno ya Msingi ya Maneno 12 Yanavyoundwa

### 1. Kuzalisha Entropy
Sisi kuanza kwa kuzalisha ** 128 bits ** ya entropy.

### 2. Ongeza Checksum
Sisi hash entropy kutumia ** SHA256 **. bits chache za kwanza ya hash hii kuwa checksum. 
Hii inatupa kipekee alama ya vidole kwa entropy yetu.

[Entropy + Checksum mchoro](https://pbs.twimg.com/media/FooNoOEXgAAu-g6.png)

### 3. Kugawanywa katika vipande vya 11-bit
Jumla ya 132 bits (128 entropy + 4 checksum) ni kutengwa katika chunks ya 11 bits.

### 4. Ramani ya Wordlist
Kila mfululizo 11-bit ni waongofu kwa idadi decimal (0-2047). 
Orodha ya maneno ya BIP-39 ina maneno halisi ya ** 2048 ** (Kiingereza, Kihispania, Kichina, nk).

Nambari hizi hutumiwa kupata neno linalolingana katika orodha ya maneno.

![Mfano wa ramani ya neno](https://pbs.twimg.com/media/FooN9rfXEBoQuU2.png)

** Matokeo:** Sasa tuna salama, binadamu-readable 12-neno ahueni kifungu!

---

## Kutoka Recovery Maneno -> Mbegu -> Malipo anwani

Kwa kutumia kifungu cha kupona, mkoba unaweza kuzalisha funguo za kuunda anwani za malipo na akaunti tofauti za mkoba.

Funguo yanayotokana ni **deterministic** - sawa pembejeo daima inazalisha matokeo sawa.

### Uzazi wa Mbegu
Mbegu ya mkoba hutokana na kifungu cha mnemonic kwa kutumia ** Key Derivation Function (KDF) **:

- Katika **Bitcoin**: PBKDF2 
- Katika ** Zcash **: Blake2b-256/512

Hii inazalisha mbegu ya ** 64-byte (512-bit).

[Mbegu kwa funguo kuu](https://pbs.twimg.com/media/FooOuumXEAgcBm1.jpg)

### Funguo Kuu
Mbegu ni kugawanywa katika mbili 32-byte mfululizo:
- **Master Gharama muhimu**
- **Master Chain Code**

Hizi ni kutumika katika ** Hierarchical Deterministic (HD) Wallets ** kwa mtoto muhimu derivation.

---

## Zcash Sifa za kipekee (ZIP-32)

Katika Zcash, ** mamlaka ya kutazama ** au ** kutumia mamlaka ** inaweza kuhamishwa kwa kujitegemea kwa miti ndogo bila kuathiri mbegu kuu.

**ZIP-32** hufafanua kiwango cha kizazi cha ufunguo cha uongozi wa uongozi ilichukuliwa kwa vipengele vya faragha vya Zcash.

Kutoka ** Expanded matumizi Key ** sisi kupata:
- Full Viewing Key
- Incoming Viewing Key (Funguo ya Kuona Inayoingia)
- Seti ya anwani za malipo

Mifumo tofauti ya derivation kuzalisha nje anwani yanafaa kwa ajili ya kutoa nje kwa watumaji katika mabwawa shielded (Sapling & Orchard).

![Zcash ufunguo derivation uongozi](https://pbs.twimg.com/media/FooPKd4XEBUQhJ6.jpg)

Zcash pia inasaidia ** anwani za ndani ** kwa shughuli za mkoba kama vile Auto-Shielding.

---

## Rasilimali

- [ZIP-32: Shielded Kiwango cha deterministic Wallets](https://zips.z.cash/zip-0032)  
- [Zcash Itifaki Specification (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Kuhifadhiwa-na-default pochi maelezo ya jumla](https://zechub.wiki)

---

**Ujumbe wa awali na ZecHub (@ZecHub) ** 
https://x.com/ZecHub/status/1624125037945946145

---

*Ukurasa huu ulikusanywa kutoka kwa mada ya awali ya Zero hadi Zero Knowledge kwa wiki ya ZecHub.*
