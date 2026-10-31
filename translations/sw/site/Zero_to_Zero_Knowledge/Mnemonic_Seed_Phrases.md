# Zero to Zero Knowledge: Maneno ya kurejesha pochi [Mnemonic Seed Phrases]

**Mfululizo:** Zero to Zero Knowledge

Maneno ya kurejesha pochi ni msingi wa mojawapo ya vipengele muhimu zaidi vya sarafu-fiche—**umiliki binafsi [self-custody]**.  
Leo tutajifunza jinsi maneno ya kurejesha pochi yanavyozalishwa na kutumiwa katika pochi [wallets].

---

## Maneno ya kurejesha pochi ni nini?

Maneno ya kurejesha pochi yanafafanuliwa na vipimo vya **BIP-39**, aina inayotumika zaidi ya maneno ya kurejesha pochi leo.

Uundaji wa maneno ya kurejesha pochi huanza kwa kuzalisha **nasibu [randomness]**. Entropia [entropy] zaidi humaanisha usalama wa juu zaidi. **Biti 128** za entropia huchukuliwa kuwa za kutosha kwa watumiaji wengi.

![Seed phrase concept](/content-images/FooM3qWWACgrwzn-f222c4081f.webp)

Kulingana na urefu wa entropia ya awali, maneno ya kurejesha pochi yatakuwa na **maneno 12 hadi 24**.

---

## Hatua kwa Hatua: Jinsi Maneno ya kurejesha pochi yenye Maneno 12 Yanavyozalishwa

### 1. Zalisha Entropia
Tunaanza kwa kuzalisha **biti 128** za entropia.

### 2. Ongeza Jumla ya Ukaguzi
Tunafanya hash ya entropia kwa kutumia **SHA256**. Biti chache za kwanza za hash hii huwa jumla ya ukaguzi [checksum].  
Hii hutupatia alama ya kipekee ya utambulisho wa entropia yetu.

![Entropy + Checksum diagram](/content-images/FooNoOEXgAAu-g6-613238fa7e.webp)

### 3. Gawanya katika Makundi ya Biti 11
Jumla ya biti 132 (entropia 128 + jumla ya ukaguzi 4) hutenganishwa katika makundi ya biti 11.

### 4. Linganisha na Orodha ya Maneno
Kila mfuatano wa biti 11 hubadilishwa kuwa nambari ya desimali (0-2047).  
Orodha za maneno za BIP-39 zina **maneno 2048** kamili (Kiingereza, Kihispania, Kichina, n.k.).

Nambari hizi hutumiwa kupata neno linalolingana katika orodha ya maneno.

![Word mapping example](/content-images/FooN9rfXEBoQuU2-d11331fc0a.webp)

**Matokeo:** Sasa tuna maneno salama ya kurejesha pochi yenye maneno 12 yanayosomeka na binadamu!

---

## Kutoka kwa Maneno ya kurejesha pochi -> Seed -> Anwani za Malipo

Kwa kutumia maneno ya kurejesha pochi, pochi inaweza kuzalisha funguo za kuunda anwani za malipo [payment] na akaunti tofauti za pochi.

Funguo zinazozalishwa ni **thabiti [deterministic]**—ingizo lilelile daima hutoa matokeo yaleyale.

### Uzalishaji wa Seed
Seed ya pochi hutokana na maneno ya mnemoniki kwa kutumia **Key Derivation Function (KDF)**:

- Katika **Bitcoin**: PBKDF2  
- Katika **Zcash**: Blake2b-256/512

Hii huzalisha seed ya **baiti 64 (biti 512)**.

![Seed to master keys](/content-images/FooOuumXEAgcBm1-dc7c66b84a.webp)

### Funguo Kuu
Seed hugawanywa katika mifuatano miwili ya baiti 32:
- **Ufunguo Mkuu wa kutumia pesa**
- **Msimbo Mkuu wa Mnyororo**

Hizi hutumiwa katika **Pochi za Kithabiti za Kihierarkia [Hierarchical Deterministic (HD) Wallets]** kwa uundaji wa funguo za watoto.

---

## Vipengele Mahususi vya Zcash (ZIP-32)

Katika Zcash, **mamlaka ya kutazama [viewing authority]** au **mamlaka ya kutumia pesa [spending authority]** yanaweza kukabidhiwa kwa kujitegemea kwa miti-midogo bila kuhatarisha seed kuu.

**ZIP-32** hufafanua kiwango cha uundaji wa funguo thabiti za kihierarkia kilichorekebishwa kwa vipengele vya faragha vya Zcash.

Kutoka kwa **Expanded Spending Key** tunapata:
- Full Viewing Key
- Incoming Viewing Key
- Seti ya anwani za malipo

Mbinu tofauti za uundaji huzalisha anwani za nje zinazofaa kutolewa kwa watumaji katika mabwawa ya faragha [shielded pools] (Sapling & Orchard).

![Zcash key derivation hierarchy](/content-images/FooPKd4XEBUQhJ6-af133c01bf.webp)

Zcash pia inaunga mkono **anwani za ndani [internal addresses]** kwa shughuli za pochi kama vile Auto-Shielding.

---

## Rasilimali

- [ZIP-32: Pochi za Kithabiti za Kihierarkia za Faragha](https://zips.z.cash/zip-0032)  
- [Vipimo vya Itifaki vya Zcash (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Muhtasari wa pochi za faragha kwa chaguomsingi](https://zechub.wiki)

---

**Mfululizo Asilia wa ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1624125037945946145

---

*Ukurasa huu ulikusanywa kutoka kwa mfululizo asilia wa Zero to Zero Knowledge kwa ajili ya wiki ya ZecHub.*
