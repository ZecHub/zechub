# Sidzedze Zero vaseɖe Zero: Amewuwu ƒe Nɔnɔme Siwo Dzi Woka Ðo (TEEs) .

**Series:** Zero vaseɖe Zero Sidzedze

Zero to Zero Knowledge trɔ gbɔ kple nyati yeye aɖe! 
Kwasiɖa sia me la, míedzro **Trusted Execution Environments (TEEs)** - alesi wozãa wo le adzame gakuwo kple blockchain dɔ bubuwo me.

![Amewuwu ƒe Nɔnɔme siwo dzi Woka ɖo intro](/content-images/Fquj-h2WcAIgSnL-b80c8614cd.webp)

---

## TEEs kple Blockchains: Nusiwo Kpena Ðe Wo Nɔewo Ŋu

Blockchains kple TEEs ƒe ŋusẽwo kpena ɖe wo nɔewo ŋu ŋutɔ:

- **Blockchains** ka ɖe edzi be ele, dukɔa ƒe kutrikuku, eye wòɖea mɔ na dutoƒo ƒe kpeɖodzinana le dukɔ bliboa ŋu - gake akɔntabubu ƒe ŋusẽ seɖoƒe li na wo. 
- **TEEs** ateŋu awɔ akɔntabubudɔ sesẽwo le adzame - gake native state persistence mele wo si o.

Woate ŋu awɔ ɖoɖo sẽŋu siwo akpɔ ame ŋutɔ ƒe nyatakakawo ta.

---

## Adzame Nyatakakadzraɖoƒe: TEE-Powered Privacy

**Secret Network** zãa TEE mɔ̃ɖaŋununya (vevietɔ Intel SGX) tsɔ wɔa akɔntabubu le nya ɣaɣlawo tsɔtsɔ de eme, nusiwo dona, kple nɔnɔme dzi.

Validator node ɖesiaɖe zãa Intel SGX chips. Woƒo nusiwo dzi woda asi ɖo kple akɔntabubu ƒe ƒuƒoƒoawo nu ƒu:

- Wowɔa asitsatsa ŋudɔ le nuto siwo le dedie me. 
- Woɖea nyatakakawo ɖa **le TEE la me** ko.

Esia to vovo na Zcash, si zãa **sidzedze zero-kpeɖodzi** hena ame ŋutɔ ƒe nyawo tsɔtsɔ aɣla. Le Zcash me la, woɖea gbeƒã adzɔnuwɔna siwo wokpɔ ta na eye woɖoa kpe wo dzi le dutoƒo eye womeɖea nyatakaka bubu aɖeke fiana na network la o. Zcash Shielded Assets hã zɔna ɖe gɔmeɖose ma ke dzi.

![Network TEE ƒe nɔnɔmetata ɣaɣla](/content-images/FqulPjNX0AEfjRp-c7085732a2.webp)

Ne èdi numeɖeɖe tsitotsito tso alesi wowɔa TEEwo ŋudɔ le Secret Network dzi ŋu la, xlẽ nyati nyui sia si @l_woetzel ŋlɔ: 
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Alesi Secret Network Dea Safuiwo Kple Dukɔa Ta

- Wodzraa network la ƒe **consensus encryption seed** ɖo ɖe validator ɖesiaɖe ƒe TEE me. 
- Nubablawo zãa nya ɣaɣlawo ƒe safui tɔxɛ siwo womate ŋu aŋlɔ o. 
- Adzame nubablawo zɔna le Cosmos SDK akɔntabubu module gake doa alɔ encrypted inputs/outputs kple nɔnɔme.

---

## Adzɔge Ðaseɖiɖi

**Adzɔge Ðaseɖiɖi** nye ɖoɖo si wowɔna tsɔ ɖoa ​​kpe edzi be enclave le dɔ wɔm le hardware nɔnɔme vavãtɔ si le dedie me.

Enaa mɔnukpɔkpɔ ame aɖe si le didiƒe be wòaɖo kpe edzi be:
- Dɔdamɔnu si sɔ la le dɔ wɔm 
- Wometrɔ asi le dɔbiagbalẽvia ŋu o 
- Ele dɔ wɔm dedie le Intel SGX enclave me

![Adzɔge Ðaseɖiɖi ƒe numeɖeɖe](/content-images/FqumRjoWwAAeT-M-6eff73af4d.webp)

Ame ŋutɔ ƒe asidede agbalẽ te kple ɖaseɖiɖi ƒe safui siwo womate ŋu akpɔ tso egodo o hã le enclaves me.

![Enclave safui takpɔkpɔ](/content-images/Fqumv83XoAQq-MO-47c3ab77e0.webp)

---

## Nyatakakawo ƒe Nutrenu

Esi wònye be enclavewo nye esiwo me nɔnɔme aɖeke mele o ta la, ele be woadzra nyatakakawo ɖo ɣeaɖewoɣi le gota le ŋkuɖodzinu si dzi womate ŋu aka ɖo o me. 

**Data Sealing** tsɔa nyatakaka siwo le enclave la me ɣlana to safui si wokpɔ tso CPU me zazã me. Woateŋu aɖe mɔxenu si wotsɔ nya ɣaɣlawo ŋlɔ la le **ɖoɖo ɖeka ma ke** dzi ko.

![Data Sealing ƒe nɔnɔmetata](/content-images/FqunBwyWYAA-TR3-933c2b0e6f.webp)

---

## Oasis ƒe Nyatakakadzraɖoƒe

**Oasis Network** hã zãa TEEwo to eƒe ParaTime ɣaɣla (e.g. Sapphire kple Cipher) dzi.

Nyatakaka siwo wotsɔ nya ɣaɣlawo ŋlɔ la gena ɖe TEE la me kpe ɖe smart contract la ŋu. Woɖea nya ɣaɣlawo me, wowɔa dɔ tso eŋu, eye wogbugbɔa nya ɣaɣlawo dea eme hafi dzona le enclave la me.

![Oasis Network TEE ƒe sisi](/content-images/FqunJRDXwAMt4Ob-0e7969c7a8.webp)

---

## TEEwo le Kpeɖodzi-ɖe-Adzɔxexe ƒe Nyatakakadzraɖoƒewo

Proof-of-Stake blockchain geɖewo (siwo dome Secret kple Oasis hã le) zãa **Tendermint** abe woƒe nukpɔsusu ɖeka ƒe ɖoɖo ene.

Le PoS ƒe kpeɖodzinalawo gome la:
- Ele be woakpɔ safuiwo dzi dedie eye womagaɖe wo ɖe go le nuŋɔŋlɔ si me kɔ me gbeɖe o. 
- Ele be amesiwo ɖo kpe edzi nanɔ Internet dzi (tohehe siwo woatsɔ axe mɔ ɖe dɔa nu). 
- De asi gbedasi siwo tsi tre ɖe wo nɔewo ŋu te ate ŋu ana woaɖe asi le wo ŋu.

**TEEs** nyo ŋutɔ na validator keys wɔwɔ kple wo zazã dedie.

![Tendermint & PoS ƒe dedienɔnɔ](/content-images/Fqun0HEX0AAooxW-7f6163ae1e.webp)

---

## Zcash kple Kpeɖodzi-of-Stake Numekuku

Zcash le numekuku wɔm vevie le ʋuʋu yi Proof-of-Stake ŋu.

- Xlẽ numekukua: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Kpɔ akpa sia tso Zcash Foundation Community Call me si ɖe PoS ƒe nɔnɔme vovovowo kple woƒe adzamenyawo me ɖeɖe me:
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ɖe mɔ ɖeFullScreen ŋu
    loading="lazy"
  />
</div>

---

**Ka gbãtɔ si ZecHub (@ZecHub) ŋlɔ** 
https://x.com/ZecHub/status/1633579659282587651

---

*Woƒo axa sia nu ƒu tso Zero yi Zero Sidzedze ƒe ka gbãtɔ me na ZecHub wiki.*
