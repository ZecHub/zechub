# Zero kwa ujuzi sifuri: Uwazi dhidi ya Shielded Transactions & Unified Anwani

**Series:** Zero hadi ujuzi zero

Kama wewe ni kujifunza kuhusu Zcash kwa mara ya kwanza utapata kuna aina mbili za shughuli inapatikana: ** Uwazi** na ** Shielded. 

Leo tunajifunza juu yao na kufunika moja ya vipengele mpya katika mfumo wa #Zcash, **Anwani za Umoja**.

---

## Uwazi dhidi ya Shielded Transactions

- **Transparent Transactions** kutumia *t-anwani* (Base58 encoded). Kila kitu ni wazi kwa umma - kama Bitcoin. 
- **Shielded Transactions** kutumia anwani encoded kwa ajili ya *** Sapling au ** Orchard matangi. Hizi kuficha mtumaji, mpokeaji na kiasi cha kutumia zero-ujuzi uthibitisho.

**Shielded Transaction** inahusu shughuli yoyote na anwani encoded kwa Sapling / Orchard mabwawa.

![Transparent vs Shielded intro](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

** Unified Anwani (UA)** ni iliyoundwa na ** kuunganisha ** ulinzi au uwazi shughuli katika anwani moja.

---

## Aina ya anwani katika Zcash

Kuna aina 3 za anwani katika matumizi:

1. **(T) Uwazi**  Msingi58 
2. **(Z) Sapling**  Bech32 
3. **(UA) Unified Address** – Bech32m  

Idadi ya herufi (na kwa hiyo ukubwa wa nambari za QR) huongezeka na kila aina.

![Address types comparison](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![QR code size comparison](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## Jinsi Anwani za Kutumika Zinavyofanya Kazi kwa Umoja

Anwani na funguo ni encoded kama mlolongo byte (** Raw Encoding **). 
**Receiver Encoding** ni pamoja na taarifa zote muhimu kuhamisha mali kwa kutumia itifaki maalum.

The raw encoding of a Unified Address is a combination of encodings (typecode, length, addr) of receivers:

- UA: `0x03`  
- Sapling: `0x02`  
- Uwazi: `0x01`  

** Muhimu**: Kuna lazima kuwa na angalau moja walinzi malipo anwani katika kila UA. (Anwani za shina ni tena mkono baada ya kuboresha Canopy.)

![UA encoding structure](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

Maelezo kamili: **[ZIP-316: Anwani za Umoja wa Kijamii](https://zips.z.cash/zip-0316)**

---

## Faida za Anwani Zinazofanana

- ** Rahisi kwa ajili ya kubadilishana** - Sasa wanaweza kusaidia amana shielded / pesa zaidi salama. 
- **Kesi za wakati ujao** - New hifadhi ulinzi inaweza kuongezwa bila kuvunja pochi. 
- ** Shielded-by-Default** - Kila UA ina angalau anwani moja ulinzi, hivyo faragha ni daima inapatikana.

Hii ni mabadiliko ya msingi ambayo tayari kusaidia ZEC zaidi hoja katika pool shielded.

---

## Orchard Transactions & Actions (Ufanyabiashara na Vitendo vya Bustani)

Orchard ilianzisha dhana mpya inayoitwa ** Vitendo**:

- Wao kupunguza uvujaji wa metadata kwa kutumia ** single nanga** kwa ajili ya Vitendo vyote katika shughuli. 
- Wao kuunganisha maeneo ya (V4) Gharama + pato katika dhamana moja thamani. 
- Hii inawezesha optimizations utendaji wa mfumo Halo2 uthibitisho.

Daira anaelezea Anchor nafasi (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ruhusuFullScreen
    loading="lazy"
  />
</div>

---

## Usawaziko wa Thamani na Faragha

Katika baadhi ya kesi (kwa mfano shughuli za msalaba-pool) kiasi inaweza kuwa inayoonekana kwa mtazamaji nje. Hata hivyo, `valueBalanceSapling` na `valueBalanceOrchard` kutumia ** homomorphic ahadi** kuthibitisha ZEC jumla katika mabwawa shielded na kuzuia bandia.

Soma zaidi: [Ulinzi Dhidi ya Kutengeneza Nakala Bandia Katika Vibanda vya Kuhifadhi](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Maboresho ya Wakati Ujao

Timu ya ECC ni kazi juu ya mbinu mpya RPC katika `zcashd` (kuchukua nafasi ya `z_sendmany`) ambayo itawawezesha watumiaji hakikisho na kukubali / kukataa shughuli iliyopendekezwa kulingana na sifa zake za faragha.

---

## Mapendekezo

Hii thread awali alielekeza ** Ywallet, kwa mpango wa shughuli ilionyesha kabla ya hit kutuma. Ywalle tena ni iimarishwe na haitakuwa updated kwa Ironwood, hivyo inaweza tena kufuata mlolongo. Pick mfuko kudumishwa kutoka kwenye orodha hii: * Wallets inapatikana katika akaunti yako sasa; * Fedha za fedha zilizohifadhiwa bado zinatumika kama wallets halali au hazikuwepo wakati huo. [Mkoba](https://zechub.wiki/wallets) ukurasa badala yake, na wanapendelea moja kwamba anakuambia nini manunuzi itaonyesha kabla ya kwenda nje.

Makala kubwa juu ya faragha shughuli: https://medium.com/@hanh.huynh/

---

**Ujumbe wa awali na ZecHub (@ZecHub)** 
https://x.com/ZecHub/status/1628498645627666432

---

*Ukurasa huu ulikusanywa kutoka kwa mada ya awali Zero hadi Maarifa ya Zero kwa wiki ya ZecHub.*
