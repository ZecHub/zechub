# Zero to Zero Knowledge: Mpaghara Mmezu A Tụkwasịrị Obi (Trusted Execution Environments, TEEs)

**Usoro:** Zero to Zero Knowledge

Zero to Zero Knowledge alọtala na isiokwu ọhụrụ!  
N’izu a, anyị na-enyocha **Mpaghara Mmezu A Tụkwasịrị Obi (TEEs)** — otu e si eji ha na mkpụrụ ego Nzuzo [privacy] na ngwa blockchain ndị ọzọ.

![Trusted Execution Environments intro](/content-images/Fquj-h2WcAIgSnL-b80c8614cd.webp)

---

## TEEs na Blockchain: Njirimara Ndị Na-akwado Onwe Ha

Blockchain na TEE nwere ike dị iche iche na-akwado ibe ha nke ukwuu:

- **Blockchain** na-ekwe nkwa na ihe ga-adị, ịdịgide nke ọnọdụ, ma na-enye ohere ka ọha nyochaa ọnọdụ dum — mana ha nwere ikike mgbakọ dị ntakịrị.  
- **TEE** nwere ike ịrụ ọrụ mgbakọ siri ike na nzuzo — mana ha enweghị nchekwa ọnọdụ e wuru n’ime ha.

Mgbe ejikọtara ha, ha nwere ike ịmepụta usoro dị ike na-echekwa Nzuzo.

---

## Secret Network: Nzuzo Nke TEE Na-akwado

**Secret Network** na-eji teknụzụ TEE (karịchaa Intel SGX) arụ mgbakọ n’elu ntinye, mmepụta, na ọnọdụ e zoro ezo.

Node validator ọ bụla na-agba mgbawa Intel SGX. A na-ejikọta oyi akwa consensus na mgbakọ:

- A na-ahazi Azụmahia [transaction] n’ime enclaves echekwara.  
- A na-akọwapụta data naanị **n’ime TEE**.

Nke a dị iche na Zcash, nke na-eji **zero-knowledge proof** maka Nzuzo. Na Zcash, a na-ebipụta Azụmahia nke e chebere echebe [shielded] ma na-akwado ha n’ihu ọha na-enweghị ikpughere netwọkụ data ọzọ. Zcash Shielded Assets na-agbasokwa otu ụkpụrụ ahụ.

![Secret Network TEE diagram](/content-images/FqulPjNX0AEfjRp-c7085732a2.webp)

Maka nkọwa zuru ezu banyere otú e si etinye TEEs n’ọrụ na Secret Network, gụọ edemede a magburu onwe ya nke @l_woetzel:  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Otu Secret Network Si Echekwa Igodo na Ọnọdụ

- A na-echekwa **mkpụrụ Nzobe ederede [encryption] consensus** nke netwọkụ n’ime TEE nke validator ọ bụla.  
- Contracts na-eji igodo Nzobe ederede pụrụ iche nke enweghị ike ịgha.  
- Secret contracts na-agba n’elu modul mgbakọ SDK nke Cosmos mana ha na-akwado ntinye/mmepụta na ọnọdụ e zoro ezo.

---

## Nkwenye Ime Obodo

**Nkwenye Ime Obodo (Remote Attestation)** bụ usoro igosi na enclave na-agba n’ezigbo gburugburu ngwaike echekwara.

Ọ na-enye akụkụ dị anya ohere ịchọpụta:
- Na ngwa ziri ezi na-agba  
- Na emetụbeghị ngwa ahụ n’ụzọ na-adịghị mma  
- Na ọ na-arụ ọrụ n’enweghị nsogbu n’ime enclave Intel SGX

![Remote Attestation explanation](/content-images/FqumRjoWwAAeT-M-6eff73af4d.webp)

Enclaves nwekwara igodo nzuzo maka ịbịanye aka na nkwenye nke enweghị ike ịnweta site n’èzí.

![Enclave key protection](/content-images/Fqumv83XoAQq-MO-47c3ab77e0.webp)

---

## Ikpuchi Data

Ebe enclaves enweghị ọnọdụ echekwara, mgbe ụfọdụ a ga-echekwa data n’èzí, n’ebe nchekwa a na-apụghị ịtụkwasị obi.  

**Ikpuchi Data (Data Sealing)** na-eji igodo sitere na CPU zochie data n’ime enclave. Enwere ike ikpughe block e zoro ezo naanị n’otu **usoro ahụ**.

![Data Sealing diagram](/content-images/FqunBwyWYAA-TR3-933c2b0e6f.webp)

---

## Oasis Network

**Oasis Network** na-ejikwa TEEs site na ParaTime nzuzo ya (dịka Sapphire na Cipher).

Data e zoro ezo na-abanye na TEE tinyere smart contract. A na-akọwapụta ya, ahazie ya, ma zookwa ya ọzọ tupu ọ hapụ enclave.

![Oasis Network TEE flow](/content-images/FqunJRDXwAMt4Ob-0e7969c7a8.webp)

---

## TEEs na Netwọkụ Proof-of-Stake

Ọtụtụ blockchain Proof-of-Stake (gụnyere Secret na Oasis) na-eji **Tendermint** dịka usoro consensus ha.

Maka validators PoS:
- A ghaghị ijikwa igodo n’enweghị nsogbu, ghara ikpughe ha n’edemede nkịtị.  
- Validators ga-anọrịrị n’ịntanetị (ntaramahụhụ maka ịnọghị n’ọrụ na-adị).  
- Ịbịanye aka n’ozi ndị na-emegiderịta onwe ha nwere ike ibute mwepụ ego.

**TEEs** dị mma maka imepụta na iji igodo validator n’enweghị nsogbu.

![Tendermint & PoS security](/content-images/Fqun0HEX0AAooxW-7f6163ae1e.webp)

---

## Zcash na Nnyocha Proof-of-Stake

Zcash na-eme nnyocha nke ọma gbasara ịkwaga na Proof-of-Stake.

- Gụọ nyocha ahụ: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Lelee ngalaba a sitere na Community Call nke Zcash Foundation nke na-akọwa atụmatụ PoS dị iche iche na mmetụta ha na Nzuzo:
  
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

**Eriri Ozi Mbụ nke ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*A chịkọtara ibe a site n’eriri ozi mbụ nke Zero to Zero Knowledge maka wiki ZecHub.*
