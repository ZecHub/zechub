---
published: 2025-08-02
---

<a href="https://github.com/Zechub/zechub/edit/main/site/Research/Namada_Best_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

![Namada Ahyɛnsode](/content-images/nam-078c7b6883.webp)

# Namada Kokoam Nsɛm Nneyɛe Pa

> Akwankyerɛ a ɛyɛ adwuma, a wotumi de di dwuma a ɛbɛma woanya kokoamsɛm a ɛsen biara wɔ Namada so - na woate baabi pɔtee a n’ahobammɔ ahorow no ba awiei ase.

**Kokoamsɛm yɛ hokwan titiriw.** Wɔyɛɛ Namada atirimpɔw bi sɛ wɔde bɛbɔ ho ban denam nimdeɛ a enni cryptography a ɛkɔ anim so. Saa akwankyerɛ yi distills nneyɛe a etu mpɔn sen biara a wɔn a wɔde di dwuma ne wɔn a wɔyɛ kokoam nsɛm de di dwuma.

---

## Sɛnea Namada Bɔ Wo Kokoam Nsɛm Ho Ban

Namada yɛ tumidi, kokoamsɛm-di kan blockchain a ɛde sika kotoku address, asɛmdi sika, ne sika a aka denam **zero-nimdeɛ adanse (zk-SNARKs)** so.

### Nneɛma Titiriw a Ɛfa Kokoam Nsɛm Ho

- **Shielded Transactions** - Ɛde nea ɔde kɔma, nea ogye, ne sika dodow sie koraa.
- **Multi-Asset Shielded Pool (MASP)** - Ankorankoro a wɔde ma, sesa, ne bridge a ɛfa agyapadeɛ biara ho.
- **Cross-Chain Privacy** - Shielded bridging via IBC (Ethereum ne Solana mmoa reba nnansa yi ara).
- **Shielded Yield Rewards** - Nya NAM tokens denam nnwuma a wobɛbɔ ho ban kɛkɛ so.
- **Low Fees** - Kokoamsɛm a emu yɛ den a wɔmfa dwumadie mmɔ afɔre.

---

## Anohyeto ahorow a Ɛho Hia

Kokoamsɛm a emu yɛ den sen biara mpo a ɛwɔ nkɔnsɔnkɔnsɔn mu no betumi asɛe denam nea ɔde di dwuma no nneyɛe anaa nneɛma a ɛnyɛ nkɔnsɔnkɔnsɔn no so.

<div class="border-l-4 border-yellow-400 bg-yellow-400/10 p-6 my-8 rounded-r-xl text-sm">

**Namada NNI ho ban mfi:**

- Nkitahodi a wunni VPN anaa Tor (wo IP address no ada adi) .
- Address ahorow a wɔabɔ ho ban a wɔbɛsan de adi dwuma mpɛn pii
- Nnwuma a ɛda adi pefee (a wɔanbɔ ho ban) a wɔyɛ
- Wo Namada address a wode bɛbata social media anaa wiase ankasa mu nipasu ho
- KYC a wɔde sesa nneɛma a ɛwɔ mfinimfini a wɔde bedi dwuma de agye sika a wɔde asie anaasɛ wɔayi afi mu

</div>

---

## Nneyɛe Pa a Wɔde Siesie Kokoam Nsɛm a Ɛsen Biara

### 1. Nnyinasosɛm ahorow a ɛfa nneɛma nyinaa ho
- Default to **shielded transactions** ma adeyɛ biara.
- Mfa address ahorow a wɔabɔ ho ban nsan nni dwuma bio da wɔ atirimpɔw ahorow ho.
- Kwati sɛ wode dwumadi a wɔabɔ ho ban ne nea ɛda adi pefee bɛfrafra wɔ adesua koro no ara mu.

### 2. Bridging Agyapadeɛ
- Fa address a wɔatu ho ama a ɛda adi **nko** di dwuma ma bridges a ɛba.
- Ntɛm ara na wobɔ agyapade ho ban bere a woayɛ bridging awie no.
- Tew bridge a wobɛfa so afi Namada bere a ɛbɛyɛ yiye no.

### 3. MASP (Agyapade pii a Wɔabɔ ho ban) .
- Fa agyapadeɛ nyinaa sie MASP no mu default so.
- Fa wo MASP sika a aka no sɛ wo kokoam sika kotoku titiriw.

### 4. Hwɛ Safoa
- Kyɛ viewing keys **nko** ma apontow ahorow a wowɔ wɔn mu ahotoso koraa.
- Mma ntintim anaa mfa viewing keys nhyɛ baguam da.

### 5. Aguadi mu Ahotew
- Randomize bere ne sika dodow a ɛda nnwuma ntam.
- Batch nnwuma pii bere a ɛbɛyɛ yiye.
- Kwati sɛ wode sika a ɛyɛ kurukuruwa anaasɛ wotumi hu kɛse bɛmena.

### 6. Adwumayɛ mu Ahobammɔ
- Fa **VPN** (a ɛyɛ papa sɛ Tor) di dwuma bere nyinaa bere a wo ne sika kotoku anaa dApps redi nkitaho.
- Mfa screenshots a address anaa balances wom nkyɛ da.
- Fa sika kotoku a ɛsono emu biara di dwuma ma dwumadi ahorow (aguadi, ntoboa, w’ankasa de di dwuma).

---

## Kokoam Nsɛm Ho Nhwehwɛmu a Wɔatrɛw Mu

1. **Bere nyinaa shield first** - fa agyapadeɛ kɔ MASP ansa na woayɛ adwuma.
2. **Denkyin address ahorow a wɔabɔ ho ban** daa ma dwumadie ahodoɔ.
3. **Twe wo ho tẽẽ kɔ address ahorow a wɔabɔ ho ban** fi nsakrae ahorow mu bere a ɛbɛyɛ yiye no.
4. **Sesa bere a wɔde di gua** de bubu nhwɛso ahorow a wotumi hu.
5. **Fa hardware sika kotoku** di dwuma ma nneɛma akɛse a wokura.
6. **Ma software updated** - bere nyinaa fa Namada client a aba foforo no di dwuma.
7. **Fa encryption ne password managers a ɛyɛ den bɔ wo device no ho ban**.
8. **Hwɛ yiye kɛse** wɔ metadata a ɛtwetwe wɔ nkɔmmɔbɔ anaa ɔmanfo nsɛm a wɔakyerɛw mu no ho.

---

## Boa

So wowɔ nneyɛe pa anaa nsɛm foforo a wobɛka? 
[Kɔka nkɔmmɔbɔ a ɛfa Discord ho no ho](https://discord.gg/srC76aE6)

---
*Wɔyɛɛ no ​​foforo nea etwa to: March 2026*
