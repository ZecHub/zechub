# Maarifa ya Sufuri hadi Sufuri: Uwazi dhidi ya Miamala Iliyolindwa na Anwani Zilizounganishwa

**Mfululizo:** Maarifa ya sifuri hadi sifuri

Ukijifunza kuhusu Zcash kwa mara ya kwanza utagundua kuwa kuna aina mbili za miamala inayopatikana: **Uwazi** na **Imehifadhiwa**. 

Leo tunajifunza kuzihusu na kuzungumzia mojawapo ya vipengele vipya katika mfumo ikolojia wa #Zcash, **Anwani Zilizounganishwa**.

---

## Miamala ya Uwazi dhidi ya Iliyolindwa

- **Miamala ya Uwazi** hutumia **anwani za t** (Base58 imesimbwa). Kila kitu kinaonekana hadharani - kama vile Bitcoin. 
- **Miamala Iliyolindwa** hutumia anwani zilizosimbwa kwa ajili ya mabwawa ya **Sapling** au **Orchard**. Hizi huficha mtumaji, mpokeaji, na kiasi kwa kutumia uthibitisho wa kutojua chochote.

**Muamala Uliolindwa** unarejelea muamala wowote wenye anwani zilizosimbwa kwa ajili ya mabwawa Sapling/Orchard.

![Transparent vs Shielded intro](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

**Anwani Zilizounganishwa (UA)** zimeundwa ili kuunganisha** miamala iliyolindwa au iliyo wazi katika anwani moja.

---

## Aina za Anwani katika Zcash

Kuna aina 3 za anwani zinazotumika:

1. **(T) Uwazi** – Msingi58 
2. **(Z) Sapling** – Bech32 
3. **(UA) Unified Address** – Bech32m 

Idadi ya herufi (na kwa hivyo ukubwa wa msimbo wa QR) huongezeka kwa kila aina.

![Address types comparison](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![QR code size comparison](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## Jinsi Anwani Zilizounganishwa Zinavyofanya Kazi

Anwani na funguo zimesimbwa kama mfuatano wa baiti (**Usimbaji Mbichi**). 
**Usimbaji wa Mpokeaji** unajumuisha taarifa zote muhimu ili kuhamisha mali kwa kutumia itifaki maalum.

Usimbaji mbichi wa Unified Address ni mchanganyiko wa usimbaji (msimbo wa aina, urefu, anwani) wa wapokeaji:

- UA: `0x03`  
- Sapling: `0x02`  
- Uwazi: `0x01`  

**Muhimu**: Lazima kuwe na **angalau anwani moja ya malipo iliyolindwa** katika kila UA. (Sprout hazitumiki tena baada ya uboreshaji wa Canopy.)

![UA encoding structure](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

Vipimo kamili: **[ZIP-316: Anwani Zilizounganishwa](https://zips.z.cash/zip-0316)**

---

## Faida za Anwani Zilizounganishwa

- **Rahisi zaidi kwa kubadilishana** - Sasa wanaweza kusaidia amana/utoaji uliolindwa kwa usalama zaidi. 
- **Haiwezi kuharibika** - Mabwawa mapya ya kuogelea yaliyofunikwa yanaweza kuongezwa bila pochi kuvunjika. 
- **Imehifadhiwa kwa Chaguo-Msingi** - Kila UA ina angalau anwani moja iliyolindwa, kwa hivyo faragha inapatikana kila wakati.

Huu ni mabadiliko ya msingi ambayo tayari yanasaidia ZEC zaidi kuingia kwenye bwawa lenye ulinzi.

---

## Miamala na Vitendo Orchard

Orchard ilianzisha dhana mpya inayoitwa **Vitendo**:

- Hupunguza uvujaji wa metadata kwa kutumia **nanga moja** kwa Vitendo vyote katika muamala. 
- Huunganisha sehemu za (V4) Spend + Output katika ahadi moja ya thamani. 
- Hii inawezesha uboreshaji wa utendaji wa mfumo wa uthibitishaji wa Halo2.

Daira anaelezea nafasi za Nanga (zcon3):

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

## Salio la Thamani na Faragha

Katika baadhi ya matukio (km miamala ya pamoja) kiasi kinaweza kuonekana kwa mwangalizi wa nje. Hata hivyo, `valueBalanceSapling` na `valueBalanceOrchard` tumia **ahadi za homomorphic** kuthibitisha jumla ya ZEC katika mabwawa yaliyolindwa na kuzuia ughushi.

Soma zaidi: [ZIP 209: Kataza Mizani ya Thamani ya Mnyororo Ulio Nje ya Masafa](https://zips.z.cash/zip-0209)

---

## Maboresho ya Baadaye

Timu ECC inafanyia kazi mbinu mpya za RPC katika `zcashd` (kubadilisha `z_sendmany`) ambayo itawaruhusu watumiaji kuhakiki na kukubali/kukataa muamala uliopendekezwa kulingana na sifa zake za faragha.

---

## Mapendekezo

Uzi huu awali ulielekeza kwenye **YWallet**, kwa mpango wa muamala ulioonyeshwa kabla ya kubofya tuma. YWallet haitumiki tena na haitasasishwa kwa Ironwood, kwa hivyo haiwezi tena kufuata mnyororo. Chagua pochi inayodumishwa kutoka [Pochi](https://zechub.wiki/wallets) badala yake, na unapendelea ile inayokuambia muamala utaonyesha nini kabla haujatoka.

Makala nzuri kuhusu faragha ya miamala: https://medium.com/@hanh.huynh/

---

**Uzi Asili kutoka kwa ZecHub (@ZecHub)** 
https://x.com/ZecHub/status/1628498645627666432

---

*Ukurasa huu ulikusanywa kutoka kwa uzi asili wa Maarifa ya Zero hadi Zero kwa wiki ya ZecHub.*
