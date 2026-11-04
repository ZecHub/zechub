# Zero to Zero Knowledge: Mazingira ya Utekelezaji Yanayoaminika (Trusted Execution Environments, TEEs)

**Mfululizo:** Zero to Zero Knowledge

Zero to Zero Knowledge imerejea na mada mpya!  
Wiki hii tunachunguza **Mazingira ya Utekelezaji Yanayoaminika (TEEs)** - jinsi yanavyotumika katika sarafu za faragha (privacy coins) na matumizi mengine ya blockchain.

![Trusted Execution Environments intro](/content-images/Fquj-h2WcAIgSnL-b80c8614cd.webp)

---

## TEEs na Blockchain: Sifa Zinazokamilishana

Blockchain na TEEs zina nguvu zinazokamilishana sana:

- **Blockchain** zinahakikisha upatikanaji, uhifadhi endelevu wa hali, na kuruhusu uthibitishaji wa umma wa hali nzima - lakini zina uwezo mdogo wa ukokotoaji.  
- **TEEs** zinaweza kutekeleza kazi nzito za ukokotoaji kwa faragha - lakini hazina uhifadhi asilia wa hali.

Kwa pamoja zinaweza kuunda mifumo yenye nguvu inayohifadhi faragha.

---

## Secret Network: Faragha Inayoendeshwa na TEE

**Secret Network** hutumia teknolojia ya TEE (hasa Intel SGX) kutekeleza ukokotoaji kwenye pembejeo, matokeo, na hali zilizosimbwa fiche [encrypted].

Kila node ya validator huendesha chipu za Intel SGX. Tabaka za makubaliano na ukokotoaji zinaunganishwa:

- Miamala huchakatwa ndani ya enclaves salama.  
- Data hufumbuliwa usimbaji fiche **ndani ya TEE pekee**.

Hii ni tofauti na Zcash, inayotumia **mathibitisho ya maarifa sifuri [zero-knowledge proofs]** kwa faragha. Katika Zcash, miamala ya faragha [shielded transactions] hutangazwa na kuthibitishwa hadharani bila data ya ziada kufichuliwa kwa mtandao. Mali za Faragha za Zcash hufuata kanuni hiyo hiyo.

![Secret Network TEE diagram](/content-images/FqulPjNX0AEfjRp-c7085732a2.webp)

Kwa maelezo ya kina kuhusu jinsi TEEs zinavyotekelezwa kwenye Secret Network, soma makala hii bora ya @l_woetzel:  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Jinsi Secret Network Inavyolinda Funguo na Hali

- **Mbegu ya usimbaji fiche ya makubaliano [consensus encryption seed]** ya mtandao huhifadhiwa ndani ya TEE ya kila validator.  
- Mikataba hutumia funguo za kipekee za usimbaji fiche zisizoweza kughushiwa.  
- Mikataba ya Secret huendeshwa kwenye moduli ya ukokotoaji ya SDK ya Cosmos lakini inasaidia pembejeo/matokeo na hali zilizosimbwa fiche.

---

## Uthibitishaji wa Mbali

**Uthibitishaji wa Mbali (Remote Attestation)** ni mchakato wa kuthibitisha kwamba enclave inaendeshwa katika mazingira halisi ya maunzi salama.

Humruhusu mhusika wa mbali kuthibitisha:
- Programu sahihi inaendeshwa  
- Programu haijaharibiwa au kubadilishwa  
- Inatekelezwa kwa usalama ndani ya enclave ya Intel SGX

![Remote Attestation explanation](/content-images/FqumRjoWwAAeT-M-6eff73af4d.webp)

Enclaves pia zina funguo binafsi za kutia saini na uthibitishaji ambazo haziwezi kufikiwa kutoka nje.

![Enclave key protection](/content-images/Fqumv83XoAQq-MO-47c3ab77e0.webp)

---

## Kufunga Data

Kwa kuwa enclaves hazina hali, wakati mwingine data lazima ihifadhiwe nje katika kumbukumbu isiyoaminika.  

**Kufunga Data (Data Sealing)** husimba fiche data ndani ya enclave kwa kutumia ufunguo unaotokana na CPU. Block iliyosimbwa fiche inaweza kufumbuliwa usimbaji fiche kwenye **mfumo huo huo pekee**.

![Data Sealing diagram](/content-images/FqunBwyWYAA-TR3-933c2b0e6f.webp)

---

## Oasis Network

**Oasis Network** pia hutumia TEEs kupitia ParaTime yake ya siri (kwa mfano Sapphire na Cipher).

Data iliyosimbwa fiche huingia kwenye TEE pamoja na mkataba mahiri [smart contract]. Hufumbuliwa usimbaji fiche, huchakatwa, na kusimbwa fiche tena kabla ya kuondoka kwenye enclave.

![Oasis Network TEE flow](/content-images/FqunJRDXwAMt4Ob-0e7969c7a8.webp)

---

## TEEs katika Mitandao ya Proof-of-Stake

Blockchain nyingi za Proof-of-Stake (zikiwemo Secret na Oasis) hutumia **Tendermint** kama mfumo wao wa makubaliano.

Kwa validators wa PoS:
- Funguo lazima zisimamiwe kwa usalama na zisiwe wazi kamwe katika maandishi wazi.  
- Validators lazima waendelee kuwa mtandaoni (adhabu za kutokuwa mtandaoni hutumika).  
- Kutia saini ujumbe unaokinzana kunaweza kusababisha slashing.

**TEEs** zinafaa sana kwa kutengeneza na kutumia funguo za validator kwa usalama.

![Tendermint & PoS security](/content-images/Fqun0HEX0AAooxW-7f6163ae1e.webp)

---

## Zcash na Utafiti wa Proof-of-Stake

Zcash inatafiti kwa bidii uhamaji kuelekea Proof-of-Stake.

- Soma utafiti: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Tazama sehemu hii kutoka kwa Community Call ya Zcash Foundation inayoeleza miundo tofauti ya PoS na athari zake kwa faragha:
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**Mjadala Asili wa ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*Ukurasa huu ulikusanywa kutoka kwa mjadala asili wa Zero to Zero Knowledge kwa ajili ya wiki ya ZecHub.*
