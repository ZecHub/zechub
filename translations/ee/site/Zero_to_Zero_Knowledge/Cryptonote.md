# Zero to Zero Knowledge: CryptoNote ƒe Protocol

**Series:** Zero to Zero Knowledge

Eya nye nu dzadzɛ aɖe egbe!  
**CryptoNote** protocol na ɣaɣla [privacy] sesẽ le ɖoɖonu dzi. Egbe míesrɔ̃ eƒe nɔnɔme veviwo katã kple ale si ɣaɣla ƒe dɔwɔwɔ xɔasi aɖewo wɔe la.

![CryptoNote intro](/content-images/FrXr5P8WIAAvx36-88db0c8250.webp)

---

## Gɔmedzedze

Wodo CryptoNote ƒe nyadzɔdzɔ ƒe agbalẽ gbãtɔ ɖe go le ŋkɔ bubu **"Nicolas van Saberhagen"** te.  

**Bytecoin** nye crypto ga gbãtɔ si wɔ protocol la. Dɔwɔwɔ si amewo nya wu si zazãna egbe nye **Monero (XMR)**. Wozãe hã le TurtleCoin, Aeon, kple bubuawo me.

---

## CryptoNote ƒe Nɔnɔme Veviwo

CryptoNote Protocol na nɔnɔme vevi etɔ:

1. **Gaɖoɖowo ƒe makpɔkpɔ kple kadodo manɔ anyi [Unlinkability]**
2. **Dɔwɔwɔ ƒe ɖaseɖigbalɛ [Proof of Work] si nye na amewo katã** (ASIC mate ŋu tsi tre na o) 
3. **Gaɖeɖe si trɔna**

---

## 1. Makpɔkpɔ - Ring ƒe Asidede Agbalẽ Te

Wɔna be wo mate ŋu akpɔ afɔɖeɖe o vevie to **Ring ƒe Asidede Agbalẽ Te [Ring Signatures]** zazãme.

Ne nèle gaɖoɖo aɖe ɖom la, woɖea wò key si ame katã ate ŋu akpɔ kple key bubu siwo nye alakpadawo ("ring") — wòwo katã me ga ƒe lolome ɖeka le. Esia wɔe be ezu vevie ŋutɔ be woanya ame kae dɔ gaawo le nyateƒe me.

**Ring ƒe lolome** wɔ tɔtrɔ gã le ame siwo dometɔ woate ŋu anya la ƒe ha me. Ring gãwo na ɣaɣla nyuie.

![Ring Signatures explanation](/content-images/FrXteGHXgAANE0F-f11593a0d9.webp)

**Tsatsamama kple Zcash**:  
Zcash ƒe ame siwo dometɔ woate ŋu anya la ƒe ha nye gaɖoɖowo katã si woɖo kpɔ *ɣe sia ɣe* le ɣaɣla gaƒuƒoƒo aɖe me (esi gã wu CryptoNote ring ƒe lolome si zɔna zi geɖe).

---

## Ring CT (Gaɖoɖowo siwo Ɣaɣla)

**Ring CT** ƒe model na ɣaɣla ɖe CryptoNote ƒe gaawo me wu ale si wònɔ tsã.

Esi wòɣla amedzɔla ko le tsã la teƒe, Ring CT hã **ɣla ga siwo le amedzɔla kple ame si xɔe la dome ƒe lolome**.

![Ring CT diagram](/content-images/FrXuivgWYAAze7B-260071c1b3.webp)

Ezã:
- Elliptic Curve Cryptography
- Pedersen ƒe Adzɔgbeɖeɖe [Commitments]
- Homomorphic ƒe Ɣaɣlaŋlɔŋlɔ [Encryption]

Woza **ɖaseɖigbalɛwo [Proofs]** be woafia be ga ƒe lolome la gã wu 0 eye wònɔ lolome siwo nyo me **ke menye be woafia lolome vavãawo o**.

**Stealth ƒe Gaɖoƒe ƒe Dzesiawo [Addresses]** hã tsɔ gaɖoƒe ƒe dzesi si zɔna ɣetrɔ ɖeka ko kpe ɖe ame si xɔe la ŋu.

![Stealth Addresses + Proofs](/content-images/FrXut5aWAAMhuRb-f3ce8ea3fd.webp)

---

## 2. Dɔwɔwɔ ƒe Ɖaseɖigbalɛ si Nye na Amewo Katã (ePoW)

CryptoNote di be yeawɔ nukuku [mining] ƒe ɖoɖo si nyo na amewo katã to ASICwo ƒe tsiteƒe ŋu.

Ezã **CryptoNight** algorithm (dɔwɔwɔ si bia memory geɖe). To vovototo si le Bitcoin ƒe SHA256 kple CryptoNight dome la, woɖo CryptoNight be wòatsi tre na vovototo si le CPU, GPU, kple ASIC nukulawo dome.

**CryptoNight ƒe afɔwo:**
1. Dze memory ƒe teƒe gã aɖe (scratchpad) gɔme kple nyatakakawo siwo wɔna alea ko
2. Wɔ xexlẽ kple ŋlɔŋlɔ ƒe dɔ geɖe le scratchpad la dzi
3. Ɖe scratchpad la katã ƒe hash be nàkpɔ tɔxɛ mamlɛtɔ

![CryptoNight mining](/content-images/FrXvNs3XsAA37LG-5779657f5c.webp)

(Nyaɖeɖe: Monero tsi CryptoNight ŋu yi algorithm bubuwo gbɔ tso esime ma.)

---

## 3. Gaɖeɖe Si Trɔna

Le fetu ƒe afãmama [halving] ƒe nuwɔna kpuie siwo le (abe Bitcoin ene) teƒe la, CryptoNote zã **gaɖoɖowo ƒuƒoƒe ƒe fetu si ɖea ɖe eɖokui dzi vie vie**.

Esia wɔe be gaɖeɖe ƒe mɔnu la nɔ dzɔdzɔe wu le ɣeyiɣi me.

![Dynamic emission curve](/content-images/FrXv8wpXoAEjUxW-e2bbaebced.webp)

**Zcash ƒe Kadodo**:  
Zcash ƒe mɔ̃ ƒe ɖoɖoŋlɔlawo do go be yewoawɔ gaɖeɖe ƒe mɔnu si dzɔdzɔe wu le etsɔme, ate ŋu atso "Zcash Posterity Fund" aɖe dzi.

---

## Nuƒoƒo

CryptoNote ɖee fia be ye nye mɔnu sesẽ si woɖe to kpɔkpɔ me nyuie na ɣaɣla le ɖoɖonu dzi. Eƒe yenɔamedzi geɖewo kpɔ ŋusẽ le ɣaɣla coin ƒe nutome blibo la me.

Dɔdɔlawo aɖewo xɔe se be CryptoNote ƒe nɔnɔmewo ate ŋu akplɔ kple zero-knowledge ɣaɣla gaƒuƒoƒowo siwo me wometsɔ ame aɖe ƒe dzidease wɔ dɔ o le etsɔme.

---

**Thread Gbãtɔ tso ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*Woxɔ axa sia ƒe nuwo tso Zero to Zero Knowledge ƒe thread gbãtɔ me na ZecHub wiki la.*
