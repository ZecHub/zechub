# Zero to Zero Knowledge: Miamala ya uwazi [Transparent] dhidi ya Miamala ya faragha [Shielded] & Anwani Zilizounganishwa [Unified Addresses]

**Mfululizo:** Zero to Zero Knowledge

Ikiwa unajifunza kuhusu Zcash kwa mara ya kwanza, utagundua kuwa kuna aina mbili za miamala zinazopatikana: **Ya uwazi** na **Ya faragha**.  

Leo tunajifunza kuzihusu na kuchunguza mojawapo ya vipengele vipya katika mfumo ikolojia wa #Zcash, **Anwani Zilizounganishwa**.

---

## Miamala ya Uwazi dhidi ya Miamala ya Faragha

- **Miamala ya Uwazi** hutumia **t-addresses** (zilizosimbwa kwa Base58). Kila kitu kinaonekana hadharani — kama ilivyo katika Bitcoin.  
- **Miamala ya Faragha** hutumia anwani zilizosimbwa kwa mabwawa [pools] ya Sapling au Orchard. Hizi huficha mtumaji, mpokeaji, na kiasi kwa kutumia mathibitisho ya maarifa sifuri [zero-knowledge proofs].

**Muamala wa Faragha** hurejelea muamala wowote wenye anwani zilizosimbwa kwa mabwawa ya Sapling/Orchard.

![Transparent vs Shielded intro](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

**Anwani Zilizounganishwa (UAs)** zimeundwa **kuunganisha** miamala ya faragha au ya uwazi katika anwani moja.

---

## Aina za Anwani katika Zcash

Kuna aina 3 za anwani zinazotumika:

1. **(T) Ya Uwazi** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Anwani Iliyounganishwa** – Bech32m  

Idadi ya herufi (na hivyo ukubwa wa msimbo wa QR) huongezeka kwa kila aina.

![Address types comparison](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![QR code size comparison](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## Jinsi Anwani Zilizounganishwa Zinavyofanya Kazi

Anwani na funguo husimbwa kama mfuatano wa baiti (**Usimbaji Ghafi [Raw Encoding]**).  
**Usimbaji wa Kipokezi [Receiver Encoding]** hujumuisha taarifa zote muhimu za kuhamisha rasilimali kwa kutumia itifaki maalumu.

Usimbaji ghafi wa Anwani Iliyounganishwa ni mchanganyiko wa misimbaji (typecode, length, addr) ya vipokezi:

- UA: `0x03`  
- Sapling: `0x02`  
- Ya uwazi: `0x01`  

**Muhimu**: Lazima kuwe na **angalau anwani moja ya malipo ya faragha [shielded payment address]** katika kila UA. (Anwani za Sprout hazitumiki tena baada ya boreshaji la Canopy.)

![UA encoding structure](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

Uainishaji kamili: **[ZIP-316: Anwani Zilizounganishwa](https://zips.z.cash/zip-0316)**

---

## Faida za Anwani Zilizounganishwa

- **Rahisi zaidi kwa masoko ya kubadilishana sarafu [exchanges]** - Sasa yanaweza kusaidia amana/utoaji wa faragha kwa usalama zaidi.  
- **Tayari kwa siku zijazo** - Mabwawa mapya ya faragha yanaweza kuongezwa bila kuathiri pochi [wallets].  
- **Ya Faragha kwa Chaguo-msingi [Shielded-by-Default]** - Kila UA ina angalau anwani moja ya faragha, kwa hiyo faragha [privacy] hupatikana daima.

Huu ni mabadiliko ya msingi ambayo tayari yanasaidia ZEC zaidi kuingia katika bwawa la faragha.

---

## Miamala ya Orchard & Vitendo [Actions]

Orchard ilianzisha dhana mpya iitwayo **Vitendo**:

- Hupunguza uvujaji wa data ya maelezo kwa kutumia **nanga moja [single anchor]** kwa Vitendo vyote katika muamala.  
- Huunganisha sehemu za (V4) Matumizi + Tokeo katika commitment moja ya thamani.  
- Hii huwezesha uboreshaji wa utendaji wa mfumo wa thibitisho wa Halo2.

Daira anaeleza nafasi za Nanga (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Salio la Thamani & Faragha

Katika baadhi ya hali (kwa mfano, miamala ya kuvuka mabwawa), kiasi kinaweza kuonekana kwa mwangalizi wa nje. Hata hivyo, `valueBalanceSapling` na `valueBalanceOrchard` hutumia commitment za homomorphic kuthibitisha jumla ya ZEC katika mabwawa ya faragha na kuzuia ughushi.

Soma zaidi: [ZIP 209: Kataza Salio la Bwawa la Thamani ya Mnyororo Nje ya Masafa](https://zips.z.cash/zip-0209)

---

## Maboresho ya Baadaye

Timu ya ECC inafanyia kazi mbinu mpya za RPC katika `zcashd` (ikichukua nafasi ya `z_sendmany`) ambazo zitawawezesha watumiaji kuhakiki mapema na kukubali/kukataa muamala uliopendekezwa kulingana na sifa zake za faragha.

---

## Pendekezo

Mfululizo huu hapo awali ulielekeza kwenye **YWallet**, kwa mpango wa muamala uliouonyesha kabla ya kubonyeza kutuma. YWallet haidumishwi tena na haitasasishwa kwa Ironwood, kwa hiyo haiwezi tena kufuata mnyororo [chain]. Badala yake, chagua pochi inayodumishwa kutoka kwenye ukurasa wa [Pochi](https://zechub.wiki/wallets), na upendeleee ile inayokuambia muamala utafunua nini kabla haujatoka.

Makala bora kuhusu faragha ya miamala: https://medium.com/@hanh.huynh/

---

**Mfululizo wa Asili wa ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*Ukurasa huu ulikusanywa kutoka kwenye mfululizo wa asili wa Zero to Zero Knowledge kwa ajili ya wiki ya ZecHub.*
