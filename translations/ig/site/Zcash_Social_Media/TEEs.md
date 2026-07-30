# Ihe Ọmụma Na-enweghị Ihe Ọ Bụla: Ebe A Tụkwasịrị Obi (TEEs)

**Series:** Zero to Zero Knowledge

Zero to Zero Knowledge alọghachila na isiokwu ọhụrụ! 
N'izu a, anyị na-enyocha gburugburu ebe a tụkwasịrị obi (TEEs) - otu esi eji ha na mkpụrụ ego nzuzo na ngwa blockchain ndị ọzọ.

[Tụkwasịrị Obi Execution Environments mmeghe](https://pbs.twimg.com/media/Fquj-h2WcAIgSnL.jpg)

---

## TEEs na Blockchains: Njirimara ndị ọzọ

Blockchains na TEEs nwere ike dị iche iche:

- **Blockchains** na-ekwe nkwa nnweta, nkwụsi ike nke steeti, ma kwe ka ọha na eze nyochaa steeti ahụ dum - mana ha nwere ikike ngụkọta oge pere mpe. 
- **TEEs** nwere ike ịrụ ọrụ mgbagwoju anya na nzuzo - mana enweghị nkwụsi ike nke ala.

Ha niile jikọrọ aka mee ka e nwee usoro dị ike nke na-echebe ihe nzuzo.

---

## Ntanetị Nzuzo: Nzuzo nke TEE kwadoro

**Secret Network** na-eji teknụzụ TEE (ọkachasị Intel SGX) iji mee ngụkọta na ntinye, mmepụta, na steeti ezoro ezo.

Onye ọ bụla na-agba ọsọ Intel SGX ibe. A na-ejikọta nkwekọrịta na nhazi ọkwa:

- A na-edozi azụmahịa n'ime oghere ndị nwere nchebe. 
- A na-edozi data naanị n'ime TEE.

This is different from Zcash, which uses **zero-knowledge proofs** for privacy. In Zcash, shielded transactions are broadcast and validated publicly with no additional data revealed to the network. Zcash Shielded Assets follow the same principle.

[Ihe osise nzuzo nke TEE Network]](https://pbs.twimg.com/media/FqulPjNX0AEfjRp.png)

Maka nkọwa zuru ezu banyere etu esi etinye TEEs na Secret Network, gụọ ọmarịcha edemede a site n'aka @l_woetzel: 
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Otú Ntaneti Nzuzo Si Echebe Mkpịsị Ụzọ na Ọnọdụ

- A na-echekwa **mkpụrụ nzuzo nzuzo nke netwọk ahụ** n'ime TEE nke onye nyocha ọ bụla. 
- Nkwekọrịta na-eji igodo ezoro ezo pụrụ iche. 
- Secret contracts run on the Cosmos SDK compute module but support encrypted inputs/outputs and state.

---

## Ịgba Àmà Site n'Ebe Dị Anya

**Remote Attestation** bụ usoro nke igosi na ogige na-agba ọsọ na ezigbo nchekwa ngwaike.

Ọ na-enye ohere ka onye dịpụrụ adịpụ nyochaa:
- Ngwa ziri ezi na-agba ọsọ 
- A gbanwebeghị ngwa ahụ. 
- Ọ na-agba ọsọ n'enweghị nsogbu n'ime Intel SGX enclave

[Nkọwapụta Nkwupụta Nkwụsị]](https://pbs.twimg.com/media/FqumRjoWwAAeT-M.png)

Enclaves na-enwekwa mbinye aka nke onwe na igodo nkwenye nke na-enweghị ike ịnweta site n'èzí.

[Enclave isi nchedo](https://pbs.twimg.com/media/Fqumv83XoAQq-MO.png)

---

## Ịkpọchi data

Ebe ọ bụ na enklave enweghị steeti, a ga-echekwa data mgbe ụfọdụ n'èzí na ebe nchekwa a na-atụkwasịghị obi. 

**Data Sealing** encrypts data inside the enclave using a key derived from the CPU. The encrypted block can only be unsealed on the **same system**.

[Ihe osise data na-emechi emechi](https://pbs.twimg.com/media/FqunBwyWYAA-TR3.jpg)

---

## Oasis Network

**Oasis Network** na-ejikwa TEEs site na nzuzo ya ParaTime (dịka Sapphire na Cipher).

A na-abanye data ezoro ezo na TEE yana nkwekọrịta smart. A na - agbagha ya, hazie ya, ma degharịa ya tupu ịhapụ ogige ahụ.

[Oasis Network TEE na-agagharị agagharị](https://pbs.twimg.com/media/FqunJRDXwAMt4Ob.png)

---

## TEEs na Proof-of-Stake Networks

Ọtụtụ Proof-of-Stake blockchains (gụnyere Nzuzo na Oasis) jiri **Tendermint** dị ka usoro nkwekọrịta ha.

N'ihi na PoS validators:
- A ghaghị ijikwa igodo n'ụzọ dị nchebe ma ghara ikpughe na ederede ederede. 
- Ndị nyocha ga-anọ n'ịntanetị (ụgwọ ntaramahụhụ na-emetụta). 
- Ịbịanye aka n'akwụkwọ ozi ndị na-emegiderịta onwe ha pụrụ iduga n'igbu mmadụ.

** TEEs ** dị mma maka ịmepụta ma jiri igodo validator rụọ ọrụ nke ọma.

[Tendermint & PoS nchebe](https://pbs.twimg.com/media/Fqun0HEX0AAooxW.jpg)

---

## Zcash na Nnyocha Ihe Akaebe

Zcash na-arụsi ọrụ ike na-enyocha mbugharị na Proof-of-Stake.

- Gụọ nchọpụta ahụ: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Lelee akụkụ a site na Zcash Foundation Community Call na-akọwa atụmatụ PoS dị iche iche na ihe nzuzo ha:
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    kweeFullScreen
    loading="lazy"
  />
</div>

---

**Original Thread by ZecHub (@ZecHub) ** 
https://x.com/ZecHub/status/1633579659282587651

---

*A chịkọtara peeji a site na isi mmalite Zero to Zero Knowledge maka wiki ZecHub.*
