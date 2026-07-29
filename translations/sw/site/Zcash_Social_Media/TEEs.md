# Zero kwa Zero Maarifa: Trusted Utekelezaji Mazingira (TEEs)

**Series:** Zero hadi Zero Maarifa

Zero kwa Zero Maarifa ni nyuma na mada mpya! 
Wiki hii sisi kuchunguza ** Trusted Execution Environments (TEEs) ** - jinsi wao ni kutumika katika sarafu faragha na maombi mengine blockchain.

! [Trusted Utekelezaji Mazingira intro](https://pbs.twimg.com/media/Fquj-h2WcAIgSnL.jpg)

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

[Taabu ya siri Network TEE mchoro](https://pbs.twimg.com/media/FqulPjNX0AEfjRp.png)

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

[Remote Attestation maelezo](https://pbs.twimg.com/media/FqumRjoWwAAeT-M.png)

Enclaves pia vyenye private kusaini na uthibitisho funguo ambayo haiwezi kupatikana kutoka nje.

[Enclave ulinzi muhimu](https://pbs.twimg.com/media/Fqumv83XoAQq-MO.png)

---

## Data Kufunga

Tangu enclaves ni stateless, data lazima wakati mwingine kuhifadhiwa nje katika kumbukumbu untrusted. 

** Data Sealing ** encrypts data ndani ya enclave kutumia ufunguo inayotokana na CPU. block encrypted inaweza tu kuwa unsealed juu ya ** mfumo huo**.

[Data Kufunga mchoro](https://pbs.twimg.com/media/FqunBwyWYAA-TR3.jpg)

---

## Mtandao wa Oasis

** Mtandao wa Oasis ** pia hutumia TEEs kupitia ParaTime yake ya siri (kwa mfano Sapphire na Cipher).

Data encrypted huingia TEE pamoja na mkataba smart. Ni decrypting, kusindika, na re-encrypt before leaving the enclave.

[Oasis Network TEE mtiririko](https://pbs.twimg.com/media/FqunJRDXwAMt4Ob.png)

---

## TEEs katika Proof-of-Stake Networks

Wengi Proof-ya-Hisa blockchains (ikiwa ni pamoja na siri na Oasis) kutumia ** Tendermint ** kama yao makubaliano mfumo.

Kwa validators PoS:
- Funguo lazima kusimamiwa salama na kamwe wazi katika plaintext. 
- Validators lazima kukaa online (mashtaka downtime kutumika). 
- Kutia sahihi ujumbe unaopingana kunaweza kusababisha mtu apigwe.

** TEEs ** ni bora kwa salama kuzalisha na kutumia validator funguo.

[Tendermint & PoS usalama](https://pbs.twimg.com/media/Fqun0HEX0AAooxW.jpg)

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
