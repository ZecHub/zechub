# Zero to Zero Knowledge: Woate Ŋu Ɖe Dɔwɔƒewo (TEEs)

**Series:** Zero to Zero Knowledge

Zero to Zero Knowledge trɔ gbɔ kple nya yeye!  
Kɔsiɖa sia me míele **Woate Ŋu Ɖe Dɔwɔƒewo (TEEs)** dzrom - ale si woazã wo le ɣaɣla gaɖeawo kple gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] ƒe dɔwɔwɔ bubuwo me.

![Trusted Execution Environments intro](/content-images/Fquj-h2WcAIgSnL-b80c8614cd.webp)

---

## TEEs kple Gaɖoɖowo Ƒuƒoƒowo: Nɔnɔme Siwo Ɖo Ŋu Ɖe Ŋunye

Gaɖoɖowo ƒuƒoƒowo kple TEEs ƒe ŋusẽwo ƒo ɖe wo nɔewo ŋu ŋutɔ:

- **Gaɖoɖowo ƒuƒoƒowo** doa ŋugbe be nuwo anɔ anyi, nɔnɔme nanɔ yi, eye wòate ŋu akpɔ nɔnɔme blibo la katã ƒe kpekpeɖeŋu le amewo katã ŋkume - ke woƒe akɔnta ƒe ŋusẽ megbɔ o.  
- **TEEs** ate ŋu awɔ akɔnta ƒe dɔ sesẽwo le ɣaɣla me - ke nɔnɔme si anɔ yi le wo me le dzidzime o.

Ne woƒo ƒu la, woate ŋu awɔ ɣaɣla-sesĩe ƒe ɖoɖowo siwo ƒe ŋusẽ le ŋutɔ.

---

## Secret Network: TEE-Ɖe Ŋusẽ Na Ɣaɣla

**Secret Network** zã TEE mɔ̃ (vevie Intel SGX) be wòawɔ akɔnta le nu siwo woŋlɔ ɣaɣla kple ɣaɣlaŋlɔŋlɔ [encryption] me, nu siwo doa go, kple nɔnɔme ŋu.

Validator ɣaɣla dzesi ŋɔŋlɔ [node] sia sia wɔa dɔ kple Intel SGX chips. Woƒo gbegbɔgblɔ ɖi [consensus] kple akɔnta ƒe papa ɖeka:

- Woaɖe gaɖoɖowo [transactions] le enclave siwo le dedie me.  
- Woaɖe ɣaɣlaŋlɔŋlɔ le **TEE me ko**.

Esia to vovo na Zcash, si zã **zero-knowledge ɖaseɖigbalɛwo [proofs]** na ɣaɣla. Le Zcash me la, woɖea ɣaɣla gaɖoɖowo ɖe go eye wole kpekpeɖeŋu wɔm le amewo katã ŋkume, eye data bubu aɖeke meɖea fia network la o. Zcash Shielded Assets wɔa ɖe gɔme sia ke dzi.

![Secret Network TEE diagram](/content-images/FqulPjNX0AEfjRp-c7085732a2.webp)

Ne nàdi be yeanya ale si woawɔ TEEs le Secret Network dzi ƒe numeɖeɖe blibo la, xlẽ nyatakaka nyui sia si @l_woetzel ŋlɔ:  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Ale Si Secret Network Lea Keys Kple Nɔnɔme Ɖe Asi

- Network la ƒe **gbegbɔgblɔ ɖi ƒe ɣaɣlaŋlɔŋlɔ ƒe nuku** le validator sia sia ƒe TEE me.  
- Mɔ̃ŋlɔ ƒe dɔwɔwɔwo [smart contracts] zã ɣaɣlaŋlɔŋlɔ ƒe keys tɔxɛ siwo meate ŋu woakpɔe o.  
- Secret contracts wɔa dɔ le Cosmos SDK compute module dzi, ke woɖoa alɔ na nu siwo woŋlɔ ɣaɣla kple nu siwo doa go, kple nɔnɔme.

---

## Remote Attestation

**Remote Attestation** nye ɖeɖeɖase be enclave a le dɔ wɔm le hardware ƒe dedie teƒe vavã me.

Ena mɔ na ame si le didime be wòakpɔe be:
- Dɔwɔwɔ nyuitɔe la le dɔ wɔm  
- Meɖe asi le dɔwɔwɔ la ŋu o  
- Ele dɔ wɔm le dedie me le Intel SGX enclave me

![Remote Attestation explanation](/content-images/FqumRjoWwAAeT-M-6eff73af4d.webp)

Enclaves hã le signing kple attestation keys siwo nye ame ŋutɔ tɔ, siwo meate ŋu woakpɔ wo tso gota o.

![Enclave key protection](/content-images/Fqumv83XoAQq-MO-47c3ab77e0.webp)

---

## Data Sealing

Elabena enclaves menye nɔnɔme ƒe nuwo o la, zi aɖewo woate ŋu aɖo data ɖe memori si mewɔ ŋu se o me.  

**Data Sealing** zã key si tso CPU me va la na data ɣaɣlaŋlɔŋlɔ le enclave me. Gaɖoɖowo ƒuƒoƒe [block] si woŋlɔ ɣaɣla la ate ŋu aɖe ɣaɣlaŋlɔŋlɔ la le **ɖoɖo ma ke** dzi ko.

![Data Sealing diagram](/content-images/FqunBwyWYAA-TR3-933c2b0e6f.webp)

---

## Oasis Network

**Oasis Network** hã zã TEEs to eƒe confidential ParaTime (kpɔɖeŋu, Sapphire kple Cipher) me.

Data si woŋlɔ ɣaɣla kple mɔ̃ŋlɔ ƒe dɔwɔwɔ la ge ɖe TEE me. Woaɖe ɣaɣlaŋlɔŋlɔ na data la, woawɔ dɔ kple e, eye woaŋlɔe ɣaɣla ake hafi wòado go tso enclave me.

![Oasis Network TEE flow](/content-images/FqunJRDXwAMt4Ob-0e7969c7a8.webp)

---

## TEEs Le Proof-of-Stake Networks Me

Proof-of-Stake gaɖoɖowo ƒuƒoƒowo geɖe (siwo katã Secret kple Oasis hã le) zã **Tendermint** abe woƒe gbegbɔgblɔ ɖi ƒe ɖoɖo ene.

Na PoS validators:
- Ele be woakpɔ keys le dedie me eye woaɖe wo fia le plaintext me gbeɖe o.  
- Ele be validators anɔ online (woaɖe fe na wo ne woɖe mɔ).  
- Ne ame dea asi le mesajewo siwo ƒo tsiam na nɔewo ŋu la, wòate ŋu akplɔ ame ɖe slashing me.

**TEEs** dze egbe na validator keys ƒe wɔwɔ kple zãzã le dedie me.

![Tendermint & PoS security](/content-images/Fqun0HEX0AAooxW-7f6163ae1e.webp)

---

## Zcash Kple Proof-of-Stake Ƒe Nudzodzro

Zcash le nudzodzro wɔm vevi tso ale si wòava yi ɖe Proof-of-Stake ŋu.

- Xlẽ nudzodzro la: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Kpɔ akpa sia le Zcash Foundation Community Call me si me woɖe PoS ƒe ɖoɖo vovovowo kple woƒe ɣaɣla ƒe nɔnɔmewo me:  
  
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

**Thread Gbãtɔ si ZecHub (@ZecHub) ŋlɔ**  
https://x.com/ZecHub/status/1633579659282587651

---

*Woxɔ axa sia ƒe nuwo tso Zero to Zero Knowledge ƒe thread gbãtɔ me na ZecHub wiki.*
