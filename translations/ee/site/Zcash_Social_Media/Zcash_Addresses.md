# Zero vaseɖe Zero Sidzedze: Transparent vs Shielded Transactions & Adrɛs Siwo Wowɔ Ðeka

**Series:** Zero vaseɖe Zero Sidzedze

Ne èle nu srɔ̃m tso Zcash ŋu zi gbãtɔ la, àkpɔe be asitsatsa ƒomevi eve li: **Transparent** kple **Shielded**. 

Egbea míesrɔ̃ nu tso wo ŋu & ƒo nu tso nu yeye siwo le #Zcash ecosystem me dometɔ ɖeka ŋu, **Unified Addresses**.

---

## Transparent vs Shielded Asitsatsa

- **Adzɔnuwɔna siwo me kɔ** zãa **t-adrɛs** (Base58 encoded). Nusianu dzena le dutoƒo - abe Bitcoin ene. 
- **Shielded Transactions** zãa adrɛs siwo woŋlɔ ɖe kɔpi me na **Sapling** alo **Orchard** taawo. Esiawo ɣlaa ame si ɖoe ɖa, amesi xɔe, kple ga home to kpeɖodzi siwo me sidzedze aɖeke mele o zazã me.

**Shielded Transaction** fia asitsatsa ɖesiaɖe si ƒe adrɛswo woŋlɔ na Sapling/Orchard pools.

![Gbeɖiɖi vs Akpoxɔnu ƒe ŋgɔdonya](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

Wotrɔ asi le **Unified Addresses (UAs)** be woatsɔ **awɔ ɖeka** le asitsatsa siwo ŋu wokpɔ ta na alo esiwo me kɔ la me ɖe adrɛs ɖeka me.

---

## Adrɛs Ƒomeviwo le Zcash me

Adrɛs ƒomevi 3 ye wozãna:

1. **(T) Nusi me kɔ** – Gɔmeɖoanyi58 
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

Ŋɔŋlɔdzesiwo ƒe xexlẽme (eye le esia ta QR-kɔda ƒe lolome) dzina ɖe edzi le ƒomevi ɖesiaɖe me.

![Adrɛs ƒomeviwo tsɔtsɔ sɔ kple wo nɔewo](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![QR code ƒe lolome tsɔtsɔ sɔ kple wo nɔewo](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## Alesi Adrɛs Siwo Wɔ Ðeka Wɔa Dɔe

Woŋlɔa adrɛswo kple safuiwo ɖe kɔpi me abe byte ƒe ɖoɖo ene (**Raw Encoding**). 
**Receiver Encoding** lɔ nyatakaka siwo katã hiã be woatsɔ atsɔ nunɔamesi aɖe ayi teƒe bubu to ɖoɖo tɔxɛ aɖe zazã me.

The raw encoding of a Unified Address is a combination of encodings (typecode, length, addr) of receivers:

- UA: `0x03`  
- Sapling: `0x02`  
- Si me kɔ: `0x01`  

**Vevietɔ**: Ele be **fexexe ƒe adrɛs ɖeka ya teti si wokpɔ ta na** nanɔ UA ɖesiaɖe me. (Womegale asi kpem ɖe Sprout adrɛswo ŋu le Canopy ƒe dodoɖeŋgɔ megbe o.)

![UA ƒe nuŋɔŋlɔ ƒe ɖoɖo](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

Nyatakaka bliboa: **[ZIP-316: Adrɛs Siwo Wowɔ Ðeka](https://zips.z.cash/zip-0316)**

---

## Viɖe Siwo Le Adrɛs Siwo Wowɔ Ðeka Me

- **Ele bɔbɔe na asitɔtrɔ** - Woate ŋu ado alɔ shielded deposits/withdrawals azɔ dedie wu. 
- **Etsɔme-kpeɖodzi** - Woate ŋu atsɔ ta yeye siwo ŋu wokpɔ akpoxɔnu le akpe ɖe eŋu evɔ womagbã gakotokuwo o. 
- **Shielded-by-Default** - Adrɛs ɖeka ya teti si wokpɔ ta na le UA ɖesiaɖe me, eyata adzamenyawo nɔa anyi ɣesiaɣi.

Esia nye tɔtrɔ vevi aɖe si le kpekpem ɖe ZEC geɖe wu ŋu xoxo be woaʋu ayi ta si wotsɔ akpoxɔnu wɔe la me.

---

## Orchard Transactions & Actions

Orchard to nukpɔsusu yeye aɖe vɛ si woyɔna be **Actions**:

- Woɖea metadata ƒe sisi dzi kpɔtɔna to **seke ɖeka** zazã na Nuwɔnawo katã le asitsatsa me. 
- Woƒoa (V4) Spend + Output ƒe agblewo nu ƒu ɖe asixɔxɔ ɖeka ƒe ɖokuitsɔtsɔna me. 
- Esia wɔnɛ be woate ŋu awɔ Halo2 kpeɖodziɖoɖoa ƒe dɔwɔwɔ nyuie wu.

Daira ɖe Anchor ƒe nɔƒewo me (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ɖe mɔ ɖeFullScreen ŋu
    loading="lazy"
  />
</div>

---

## Asixɔxɔ ƒe Dadaɖeanyi & Adzamenyawo

Le go aɖewo me (e.g. cross-pool transactions) ga homewo ateŋu adze na gotagome ŋkuléla. Gake la, `valueBalanceSapling` kple `valueBalanceOrchard` zã **homomorphic commitments** tsɔ ɖo kpe ZEC bliboa dzi le tadeaguƒe siwo wokpɔ ta na me eye nàxe mɔ ɖe aʋatsokaka nu.

Xlẽ nu geɖe: [Ametakpɔnu Tsi Aʋatsonuwo Wɔwɔ Le Ta Siwo Wotsɔ Akpoxɔnu Wɔe Me](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Etsɔme ƒe Ŋgɔyiyiwo

ECC ƒe ƒuƒoƒoa le dɔ wɔm tso RPC mɔnu yeyewo ŋu le... `zcashd` (si le eteƒe `z_sendmany`) si ana ezãlawo nakpɔ asitsatsa si wodo ɖa la do ŋgɔ eye woalɔ̃ ɖe edzi/gbee le eƒe ameŋunyatakakawo ƒe nɔnɔmewo nu.

---

## Kafukafunya

Te **YWallet** ƒe tata yeyetɔ kpɔ! 
Eɖea "Adzɔnuwɔwɔ ƒe Ðoɖo" fiana xoxo le screen dzi hafi nàzi send dzi, si kpena ɖe ŋuwò be nàwɔ tiatia geɖe wu le ɖokuiwò si.

Nyati gã aɖe si ku ɖe asitsatsa ƒe adzamenyawo ŋu: https://medium.com/@hanh.huynh/

---

**Ka gbãtɔ si ZecHub (@ZecHub) ŋlɔ** 
https://x.com/ZecHub/status/1628498645627666432

---

*Woƒo axa sia nu ƒu tso Zero yi Zero Sidzedze ƒe ka gbãtɔ me na ZecHub wiki.*
