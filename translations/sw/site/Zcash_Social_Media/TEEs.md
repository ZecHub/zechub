# Zero kwa Zero Maarifa: Trusted Utekelezaji Mazingira (TEEs)

**Series:** Zero hadi Zero Maarifa

Zero kwa Zero Maarifa ni nyuma na mada mpya! 
Wiki hii sisi kuchunguza ** Trusted Execution Environments (TEEs) ** - jinsi wao ni kutumika katika sarafu faragha na maombi mengine blockchain.

! [Trusted Utekelezaji Mazingira intro](/content-images/Fquj-h2WcAIgSnL-b80c8614cd.webp)

---

## TEEs na Blockchains: Complementary Mali

Blockchains na TEEs zina nguvu sana complementary:

- **Blockchains** kuhakikisha upatikanaji, hali ya kudumu, na kuruhusu uthibitisho wa umma wa hali nzima - lakini wana uwezo mdogo wa kompyuta. 
- ** TEEs ** unaweza kufanya kazi intensive computational binafsi - lakini kukosa hali ya asili uvumilivu.

Kwa pamoja wanaweza kuunda mifumo yenye nguvu ya kuhifadhi faragha.

---

## Mtandao wa Siri: Faragha ya TEE-Powered

** Siri ya Mtandao ** leverages TEE teknolojia (hasa Intel SGX) kufanya mahesabu juu ya encrypted pembejeo, pato, na hali.

Kila node validator anaendesha Intel SGX chips. makubaliano na kompyuta tabaka ni pamoja:

- Matumizi ya fedha hutengenezwa ndani ya vyumba salama. 
- Data ni tu decrypted ** ndani ya TEE **.

Hii ni tofauti na Zcash, ambayo hutumia ** ushahidi wa ujuzi wa sifuri ** kwa faragha. Katika Zcash shughuli zilizohifadhiwa zinatangazwa na kuthibitishwa hadharani bila data ya ziada iliyofunuliwa kwenye mtandao. Mali za Zcash Shielded zinafuata kanuni hiyo hiyo.

[Taabu ya siri Network TEE mchoro](/content-images/FqulPjNX0AEfjRp-c7085732a2.webp)

Kwa maelezo ya kina ya jinsi TEEs zinavyotekelezwa kwenye Mtandao wa Siri, soma makala hii bora na @l_woetzel: 
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Jinsi Mtandao wa Siri Unavyohifadhi Funguo na Hali

- Mtandao wa ** makubaliano encryption mbegu ** ni kuhifadhiwa ndani ya TEE kila validator ya. 
- Mikataba kutumia kipekee unforgeable encryption funguo. 
- Mikataba ya siri kukimbia juu ya Cosmos SDK compute moduli lakini msaada encrypted pembejeo / pato na hali.

---

## Ushuhuda wa Mbali

** Remote Attestation ** ni mchakato wa kuthibitisha kwamba enclave ni mbio katika mazingira halisi salama vifaa.

Ni inaruhusu chama cha mbali ili kuthibitisha:
- Programu sahihi inaendeshwa 
- Maombi hayajabadilishwa 
- Ni kutekeleza salama ndani ya Intel SGX enclave

[Remote Attestation maelezo](/content-images/FqumRjoWwAAeT-M-6eff73af4d.webp)

Enclaves pia vyenye private kusaini na uthibitisho funguo ambayo haiwezi kupatikana kutoka nje.

[Enclave ulinzi muhimu](/content-images/Fqumv83XoAQq-MO-47c3ab77e0.webp)

---

## Data Kufunga

Tangu enclaves ni stateless, data lazima wakati mwingine kuhifadhiwa nje katika kumbukumbu untrusted. 

** Data Sealing ** encrypts data ndani ya enclave kutumia ufunguo inayotokana na CPU. block encrypted inaweza tu kuwa unsealed juu ya ** mfumo huo**.

[Data Kufunga mchoro](/content-images/FqunBwyWYAA-TR3-933c2b0e6f.webp)

---

## Mtandao wa Oasis

** Mtandao wa Oasis ** pia hutumia TEEs kupitia ParaTime yake ya siri (kwa mfano Sapphire na Cipher).

Data encrypted huingia TEE pamoja na mkataba smart. Ni decrypting, kusindika, na re-encrypt before leaving the enclave.

[Oasis Network TEE mtiririko](/content-images/FqunJRDXwAMt4Ob-0e7969c7a8.webp)

---

## TEEs katika Proof-of-Stake Networks

Wengi Proof-ya-Hisa blockchains (ikiwa ni pamoja na siri na Oasis) kutumia ** Tendermint ** kama yao makubaliano mfumo.

Kwa validators PoS:
- Funguo lazima kusimamiwa salama na kamwe wazi katika plaintext. 
- Validators lazima kukaa online (mashtaka downtime kutumika). 
- Kutia sahihi ujumbe unaopingana kunaweza kusababisha mtu apigwe.

** TEEs ** ni bora kwa salama kuzalisha na kutumia validator funguo.

[Tendermint & PoS usalama](/content-images/Fqun0HEX0AAooxW-7f6163ae1e.webp)

---

## Zcash na uthibitisho wa hisa utafiti

Zcash ni kikamilifu kutafiti uhamiaji kwa uthibitisho wa Stake.

- Soma utafiti: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Tazama sehemu hii kutoka kwa Zcash Foundation Community Call inayoelezea miundo tofauti ya PoS na athari zao za faragha:
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ruhusuFullScreen
    loading="lazy"
  />
</div>

---

**Ujumbe wa awali na ZecHub (@ZecHub) ** 
https://x.com/ZecHub/status/1633579659282587651

---

*Ukurasa huu ulikusanywa kutoka kwa mada ya awali ya Zero hadi Zero Knowledge kwa wiki ya ZecHub.*
