# Zero to Zero Knowledge: Hash ƒe dɔwɔnuwo [Hash Functions]

**Ƒeƒle ƒe gɔmedzedze**  
Woezɔ na mi le ƒeƒle yeye sia me: **Zero to Zero Knowledge**!  

Le ƒeƒle sia me la, míeasrɔ gɔmedzedzeƒe nyanya tso teknolojia vovovo geɖe siwo wozãna le míaƒe ɣaɣla ƒe protocolwo me ŋu.

---

## Akpa 1: Hash ƒe dɔwɔnuwo

Egbe míedze egɔme kple **Hash ƒe dɔwɔnuwo [Hash Functions]** - cryptography ƒe akpa vevi aɖe si wozãna le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonuwo me. Le ƒeƒle sia me megbe la, míatsɔ nya aɖewo siwo ɖo wɔnɔwo ɖe eƒe nɔnɔwo ŋu aɖe.

### Nu kae nye Hash ƒe dɔwɔnu?

Hash ƒe dɔwɔnuwo xɔ nu si ƒe didime ate ŋu anɔ aleke kee, eye wowɔ eme na nuɖeɖe si ƒe didime le ɖoɖo me.

- **Mesedzi si woawɔ hash na** = Nudzɔdzɔ  
- **Algorithm si wozãna** = Hash ƒe dɔwɔnu  
- **Nuɖeɖe si do tso eme** = Hash ƒe asixɔxɔ  


![Hash Function diagram](/content-images/Fn_NkFHXgAEtgse-474c24c373.webp)

### Wò ŋutɔ nàte ŋu ado eŋu!

Mina míakpɔ egɔme kple asiɖeɖe le dɔwɔnu sia zãm!  
Ɖo nuŋlɔɖi ɖe eme aleke kee be nàkpɔ nuɖeɖe si ƒe didime le ɖoɖo me. Kpɔ ale si nuɖeɖe la trɔna ɖe hash wɔwɔ ƒe algorithm vovovowo nu.

**Do eŋu:** https://cryptii.com/pipes/hash-function

---

### Cryptographic Hash ƒe dɔwɔnuwo ƒe nɔnɔwo

Cryptographic Hash ƒe dɔwɔnuwo ele be woanɔ kple **nɔnɔ 3 siawo**:

1. **Mɔ ɖeka** - Eŋu nɔa vevie be wòatrɔ hash ƒe dɔwɔnu aɖe ƒe dɔwɔwɔ megbe  
2. **Woɖea woaƒe teƒe vovovo** - Nudzɔdzɔ vovovo eve mate ŋu awɔ hash ɖe nuɖeɖe ma ke ŋu o  
3. **Wɔwɔ si mele trɔtrɔ me o** - Na nudzɔdzɔ ɖe sia ɖe, hash ƒe dɔwɔnu aɖe ana nuɖeɖe ma ke ɣe sia ɣe

---

### Hash ƒe dɔwɔnu siwo wozãna zi geɖe

Hash ƒe dɔwɔnu ƒe ƒomevi geɖe li. Woƒe kpɔɖeŋu aɖewo nye:

- Secure Hashing Algorithm (**SHA-3**)  
- Message Digest Algorithm 5 (**MD5**)  
- **BLAKE2b** - Wozãna le Zcash ƒe kɔkɔe kplɔɖeɖe me

**Gɔmedzedze na BLAKE2**: https://www.blake2.net

---

### Hash ƒe dɔwɔnuwo ƒe zãzã le xexeame

#### 1. Nyatakakawo ƒe blibonyenye hash wɔwɔ (Nyatakakawo ƒe blibonyenye ƒe kpekpeɖeŋuwo)
Nyatakakawo ƒe blibonyenye ƒe kpekpeɖeŋuwo nye "Nyatakakawo ƒe blibonyenye hash wɔwɔ" ƒe kpɔɖeŋu aɖe. Wozãna wo be woawɔ checksumwo na nyatakaka ƒe faɛlwo, eye woana kakaɖedzi na ezãla aɖe be nuwo le ete ŋu.

![Integrity Hashing example](/content-images/Fn_Or0MWIAI6sgx-9aab89b808.webp)

#### 2. Merkle ƒe atiwo (Hash ƒe atiwo)
**Hash ƒe ati** alo **Merkle ƒe ati** wɔe kple alɔ̃wo kple atiaƒe ƒe ɣaɣla dzesi ŋɔŋlɔwo, siwo dzi wode cryptographic hash na nyatakaka ƒe gaɖoɖowo ƒuƒoƒe aɖe.

![Merkle Tree diagram](/content-images/Fn_O7ndWIAY5PA-8e30e442ed.webp)

Merkle ƒe atiwo nye **cryptographic adzɔgbeɖeɖe ƒe ɖoɖo** ƒe kpɔɖeŋu aɖe. Wokpɔna ati la ƒe Root be enye adzɔgbeɖeɖe, eye wode ɖase be atiaƒe ƒe ɣaɣla dzesi ŋɔŋlɔwo le adzɔgbeɖeɖe gɔmedze la me.

Wonɔa nyatakaka si wode ɖe P2P networkwo dzi alo si wotra la kpɔm, eye wonye be nyatakaka si tso wɔnɔviwo gbɔ va la metrɔ o.

#### 3. Didienu ƒe adzɔgbeɖeɖe ƒe ati le Zcash
Le Zcash **Sapling** kple **Orchard** ɣaɣla gaƒuƒoƒowo me la, wozãna **Didienu ƒe adzɔgbeɖeɖe ƒe ati** be woakpɔ be gaɖoɖowo sɔ ɖe gbegbɔgblɔ ɖi nu, le esime woɣla dɔla, xɔla kple ga siwo wozã la ɖe bliboa.

#### 4. Asidede agbalẽ te ƒe hash (Bitcoin ƒe nɔnɔ nu gaɖoɖowo ƒuƒoƒewo)
**SHA256** nye "Asidede agbalẽ te ƒe hash" ƒe kpɔɖeŋu aɖe si wozãna be gaɖoɖowo ƒuƒoƒe ɖe sia ɖe le Bitcoin ƒe ɖoɖonu me nanɔ ɖe etɔ̃ me. Nukulawo zãna gaɖoɖowo ƒuƒoƒe si va yi la ƒe hash + gaɖoɖowo katã ƒe hash le gaɖoɖowo ƒuƒoƒe si li fifia me (hashMerkleRoot) + Ɣeyiɣi ƒe dzesi + xexlẽme si menye ɖoɖo me o / network ƒe sesẽ na gaɖoɖowo ƒuƒoƒe yeye.

![SHA256 block diagram](/content-images/Fn_PaVZXoAApHPf-936e479067.webp)

#### 5. Equihash (Zcash Nukuku)
**Equihash** nye hash wɔwɔ ƒe algorithm si wozãna le Zcash nukuku me. Wozãnae hã le networkwo abe Komodo kple Horizen ene me.

**Equihash: Asymmetric Proof-of-Work Based on the Generalized Birthday Problem** (Biryukov kple Khovratovich): https://eprint.iacr.org/2015/946

---

### Nuxexlẽ bubuwo

Be nàgase Hash ƒe dɔwɔnu ƒe ƒomevi vovovoawo kple wɔnɔƒe zãzãwo nyuie wu la, esi nye nuƒoɖeŋu nyui aɖe:  
https://en.wikipedia.org/wiki/Hash_function

---

**Kakaɖi tso ZecHub (@ZecHub) gbɔ**  
X ƒe kakaɖi gɔmedze: https://x.com/ZecHub/status/1621240109663227906  

---

*Wotsɔ Zero to Zero Knowledge ƒe kakaɖi gɔmedze la wɔ axa sia na ZecHub wiki.*
