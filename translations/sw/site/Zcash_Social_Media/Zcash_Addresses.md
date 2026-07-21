# Zero hadi Zero Maarifa: Uwazi dhidi ya Shielded Transactions & Unified Anwani

**Series:** Zero hadi Zero Maarifa

Kama wewe ni kujifunza kuhusu Zcash kwa mara ya kwanza utapata kuna aina mbili za shughuli inapatikana: ** Uwazi ** na ** Shielded **. 

Leo tunajifunza juu yao na kufunika moja ya vipengele vipya katika mfumo wa #Zcash, **Anwani za Umoja**.

---

## Uwazi dhidi ya Shielded Transactions

- **Transparent Transactions** kutumia **t-anwani** (Base58 encoded). Kila kitu ni wazi kwa umma - tu kama Bitcoin. 
- **Shielded Transactions** kutumia anwani encoded kwa ajili ya **Sapling** au **Orchard** mabwawa. Hizi kuficha mtumaji, mpokeaji, na kiasi kutumia zero-ujuzi uthibitisho.

**Shielded Transaction** inahusu shughuli yoyote na anwani encoded kwa Sapling / Orchard mabwawa.

[Transparent dhidi ya Shielded intro](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

** Unified Anwani (UA) ** ni iliyoundwa na ** kuunganisha ** ulinzi au uwazi shughuli katika anwani moja.

---

## Aina ya anwani katika Zcash

Kuna aina 3 za anwani katika matumizi:

1. **(T) Uwazi**  Msingi58 
2. **(Z) Sapling**  Bech32 
3. **(UA) Unified Address** – Bech32m  

Idadi ya herufi (na kwa hiyo ukubwa wa nambari ya QR) huongezeka kwa kila aina.

![Kulinganisha aina ya anwani](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

! [QR code kulinganisha ukubwa](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## Jinsi Anwani Zilizounganishwa Zinavyofanya Kazi

Anwani na funguo ni encoded kama byte mlolongo (** Raw Encoding**). 
**Receiver Encoding** ni pamoja na taarifa zote muhimu kuhamisha mali kwa kutumia itifaki maalum.

The raw encoding of a Unified Address is a combination of encodings (typecode, length, addr) of receivers:

- UA: `0x03`  
- Sapling: `0x02`  
- Uwazi: `0x01`  

** Muhimu **: Kuna lazima ** angalau moja walinzi malipo anwani ** katika kila UA. (anwani za shina ni tena mkono baada ya kuboresha Canopy.)

[UA encoding muundo](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

Maelezo kamili: **[ZIP-316: Unified Anwani](https://zips.z.cash/zip-0316)**

---

## Faida za Anwani za Kutumiwa kwa Njia Moja

- ** Rahisi kwa ajili ya kubadilishana ** - Wao sasa wanaweza kusaidia amana shielded / pesa zaidi salama. 
- ** Future-uthibitisho ** - New hifadhi ulinzi inaweza kuongezwa bila kuvunja pochi. 
- **Shielded-by-Default** - Kila UA ina angalau anwani moja ulinzi, hivyo faragha ni daima inapatikana.

Hii ni mabadiliko ya msingi ambayo tayari kusaidia ZEC zaidi hoja katika pool shielded.

---

## Orchard Transactions & Actions (Ufanyabiashara na Vitendo vya Bustani)

Orchard ilianzisha dhana mpya inayoitwa ** Vitendo **:

- Wao kupunguza uvujaji wa metadata kwa kutumia ** single nanga ** kwa ajili ya Vitendo vyote katika shughuli. 
- Wao kuchanganya mashamba ya (V4) Gharama + pato katika dhamana moja thamani. 
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

Katika baadhi ya kesi (kwa mfano shughuli za msalaba pool) kiasi inaweza kuonekana kwa mwangalizi nje. Hata hivyo, `valueBalanceSapling` na `valueBalanceOrchard` kutumia ** homomorphic ahadi ** kuthibitisha ZEC jumla katika mabwawa shielded na kuzuia bandia.

Soma zaidi: [Ulinzi Dhidi ya bandia katika mabwawa Shielded](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Maboresho ya Wakati Ujao

Timu ya ECC ni kazi juu ya mbinu mpya RPC katika `zcashd` (kubadilisha `z_sendmany`) ambayo itawawezesha watumiaji hakikisho na kukubali / kukataa shughuli iliyopendekezwa kulingana na sifa zake za faragha.

---

## Mapendekezo

Jaribu toleo la karibuni la **YWallet**! 
Tayari inaonyesha "Mpango wa Manunuzi" kwenye skrini kabla ya kubonyeza kutuma, kukusaidia kufanya uchaguzi wa kibinafsi zaidi.

Makala kubwa juu ya faragha shughuli: https://medium.com/@hanh.huynh/

---

**Ujumbe wa awali na ZecHub (@ZecHub) ** 
https://x.com/ZecHub/status/1628498645627666432

---

*Ukurasa huu ulikusanywa kutoka kwa mada ya awali ya Zero hadi Zero Knowledge kwa wiki ya ZecHub.*
