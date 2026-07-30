# Nimdeɛ a Ɛwɔ Zero kosi Zero: Nneɛma a Wɔde Di Dwuma a Wogye Di (TEEs) .

**Series:** Zero kosi Zero Nimdeɛ

Zero to Zero Nimdeɛ asan aba bio de asɛmti foforo aba! 
Dapɛn yi yɛhwehwɛ **Trusted Execution Environments (TEEs)** - sɛnea wɔde di dwuma wɔ kokoam sika ne blockchain application afoforo mu.

![Trusted Execution Nneɛma a Atwa Yɛn Ho Ahyia intro](https://pbs.twimg.com/media/Fquj-h2WcAIgSnL.jpg)

---

## TEEs ne Blockchains: Nneɛma a ɛka bom

Blockchains ne TEEs wɔ ahoɔden a ɛboa kɛse:

- **Blockchains** hyɛ bɔ sɛ ɛbɛba, ɔman no bɛkɔ so atra hɔ, na ɛma ɔmanfoɔ di adanseɛ a ɛfa ɔman no nyinaa ho - nanso wɔwɔ akontabuo tumi a ɛsua. 
- **TEEs** tumi yɛ akontabuo nnwuma a emu yɛ den wɔ kokoam - nanso enni native state persistence.

Wɔbom betumi ayɛ nhyehyɛe ahorow a tumi wom a ɛkora kokoam nsɛm so.

---

## Ahintasɛm Nkitahodi: TEE-Powered Privacy

**Secret Network** de TEE mfiridwuma (titiriw Intel SGX) di dwuma de yɛ akontaabu wɔ encrypted inputs, outputs, ne state so.

Validator node biara de Intel SGX chips di dwuma. Wɔaka adwene a ɛwɔ hɔ ne akontaabu ntoatoaso no abom:

- Wɔyɛ nkitahodi ahorow ho adwuma wɔ enclaves a ahobammɔ wom mu. 
- Data no yɛ decrypted **wɔ TEE no mu** nkutoo.

Eyi yɛ soronko wɔ Zcash a ɛde **zero-knowledge proofs** di dwuma ma kokoam nsɛm. Wɔ Zcash mu no, wɔbɔ nnwuma a wɔabɔ ho ban no ho dawuru na wɔgye tom wɔ baguam a wɔda data foforo biara adi mma ntwamutam no. Zcash Shielded Assets di nnyinasosɛm koro no ara akyi.

![Ahintasɛm Network TEE mfonini](https://pbs.twimg.com/media/FqulPjNX0AEfjRp.png)

Sɛ wopɛ nkyerɛkyerɛmu a ɛkɔ akyiri wɔ sɛnea wɔde TEE ahorow di dwuma wɔ Secret Network so a, kenkan asɛm a eye kyɛn so yi a @l_woetzel kyerɛwee: 
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Sɛnea Secret Network Bɔ Keys ne Ɔman Ho Ban

- Wɔde network no **consensus encryption seed** no asie wɔ validator biara TEE mu. 
- Apam ahorow de encryption key soronko a wontumi nwene di dwuma. 
- Kokoam apam ahorow no tu mmirika wɔ Cosmos SDK kɔmputa module no so nanso ɛboa encrypted inputs/outputs ne state.

---

## Akyirikyiri Adansedi

**Remote Attestation** yɛ adeyɛ a ɛkyerɛ sɛ enclave bi reyɛ adwuma wɔ hardware tebea a ahobammɔ wom ankasa mu.

Ɛma kwan ma ɔfã bi a ɛwɔ akyirikyiri tumi hwɛ sɛ:
- Application a ɛteɛ no reyɛ adwuma 
- Wɔnsɛee akwammisa krataa no 
- Ɛreyɛ adwuma yiye wɔ Intel SGX enclave mu

![Remote Attestation nkyerɛkyerɛmu](https://pbs.twimg.com/media/FqumRjoWwAAeT-M.png)

Enclaves nso kura kokoam nsaano nkyerɛwee ne adansedi safe a wontumi mfi abɔnten nkɔ mu.

![Enclave safoa ahobammɔ](https://pbs.twimg.com/media/Fqumv83XoAQq-MO.png)

---

## Data a Wɔde Nsɔano

Esiane sɛ enclaves nni tebea nti, ɛtɔ mmere bi a ɛsɛ sɛ wɔde data sie abɔnten wɔ memory a wontumi mfa wɔn ho nto mu mu. 

**Data Sealing** de safoa a wonya fi CPU no mu di dwuma de encrypt data a ɛwɔ enclave no mu. Wobetumi ayi block a wɔabɔ no encrypt no afi mu wɔ **system koro no ara** no so nkutoo.

![Data Nsɔano ho mfonini](https://pbs.twimg.com/media/FqunBwyWYAA-TR3.jpg)

---

## Oasis Nkitahodibea

**Oasis Network** nso de TEEs di dwuma denam ne kokoam ParaTime (e.g. Sapphire ne Cipher) so.

Encrypted data hyɛn TEE no mu ka smart contract no ho. Wɔpae mu, wɔyɛ ho adwuma, na wɔsan de encrypt no ansa na wɔafi enclave no mu.

![Oasis Network TEE nsuo a ɛsen](https://pbs.twimg.com/media/FqunJRDXwAMt4Ob.png)

---

## TEEs wɔ Proof-of-Stake Networks mu

Proof-of-Stake blockchains pii (a Secret ne Oasis ka ho) de **Tendermint** di dwuma sɛ wɔn adwene a ɛwɔ mu nhyehyɛe.

Wɔ PoS validators fam no:
- Ɛsɛ sɛ wɔhwɛ safoa so yiye na wɔmfa nsɛm a emu da hɔ nna adi da. 
- Ɛsɛ sɛ validators tra intanɛt so (downtime asotwe wɔ hɔ). 
- Sɛ wode wo nsa hyɛ nkrasɛm a ɛbɔ abira ase a, ebetumi ama woatwitwa mu.

**TEEs** yɛ papa ma ahobammɔ mu generating ne validator keys a wɔde bedi dwuma.

![Tendermint & PoS ahobammɔ](https://pbs.twimg.com/media/Fqun0HEX0AAooxW.jpg)

---

## Zcash ne Adanse a ɛkyerɛ sɛ wɔde wɔn ho ahyɛ mu nhwehwɛmu

Zcash reyɛ nhwehwɛmu denneennen wɔ tu a wɔbɛtu akɔ Proof-of-Stake ho.

- Kenkan nhwehwɛmu no: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Hwɛ ɔfa yi firi Zcash Foundation Community Call a ɛkyerɛkyerɛ PoS nhyehyɛɛ ahodoɔ ne ne kokoam nsɛm mu:
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ma kwan maFullScreen no
    loading="lazy"
  />
</div>

---

**Mfitiaseɛ Nhama a ZecHub (@ZecHub) kyerɛwee** 
https://x.com/ZecHub/status/1633579659282587651

---

*Wɔboaboaa krataafa yi ano fii mfitiase Zero to Zero Knowledge thread no mu maa ZecHub wiki.*
