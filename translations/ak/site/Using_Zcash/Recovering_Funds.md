<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Wallet Fund Recovery (Ɔkwampa a wobɛtumi de agye sika)

Adɛn nti na wode wo kokoam safoa no sie?

Private keys ne ahintasɛm a ɛhwɛ wo digital assets no ahobammɔ so. Ɛho hia sɛ wode sie wɔn yiye na w'akyɛ wɔ nnipa foforɔ biara nkyɛn da.

> Wɔ saa kwan yi so no, wobetumi ahu sɛ **Seed Phrase** yɛ ade a ɛne private key hyia.

By maintaining control over your private keys, the recovery process is always possible. There are 2 types of Zcash private keys (transparent and shielded), you can easily import them into your wallet, whether by using the Sweep Funds function or importing them as a new account. By keeping control over your private keys, you maintain total control over your assets, ensuring ownership, security and peace of mind.

# Ahotɔ ne Asɛyɛde

It is crucial for users to understand the risks involved in dealing with private keys and to keep these keys protected from unauthorized access. The security of funds depends on the user's responsibility to safeguard their private keys.

> **Ansa na wo bɛfiri ase:** recovery guides used to point at Ywallet. Ne developer no agye atom sɛ ɔrenyɛ update wɔ Ironwood (NU6.3) network upgrade, enti entumi nni chain no akyi bio. Use **Zkool**, a ɛyɛ same developer ne deɛ ɔdi akyire ma wɔn no. See [Ywallet is no longer maintained](#ywallet-is-no-longer-maintained) wɔ kratafa yi ase.

## Sika a wo nsa bɛka wɔ Zkool ho no

[Zkool] Ɔyɛ ɔkwampaefo.](https://github.com/hhanh00/zkool2/releases) Ywallet a ne deε edi yεn anim no, na ɔboa ma wͻtumi nya nsesaeԑ anaa ntweaso.

Nsɛm mmienu na yɛreka ho asɛm wɔ ha:

1. **Sane account** firi seed phrase, private key anaa viewing key so
2. **Sweeping funds** afi sika kotoku a daa na ɛboa address ahorow a emu da hɔ nkutoo so

### 1) Dwumadi no a wobɛma so aba foforo

1. Fa Zkool si hɔ firi [ɛfa nsɛm a wɔayi adi] so.](https://github.com/hhanh00/zkool2/releases) na bue no
2. Wɔ **Account Manager** (ɔmanfofidie) so no, mia button a ɛkyerɛ sɛ woahyehyɛ akaw foforo bi.
3. Fa **Account Name** hyɛ aseɛ na hu saa account yi.
4. SƐ W'ayi wͻn adi no, na wo de wei ato dwa a, wobɛtumi ahu ne abodin ɛne n'awoɔ tenten.
5. Paste your key into **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool accepts a seed phrase, a Sapling secret key, a transparent extended key, or a viewing key
6. Sε wokura wo bͻne a, fa w'abrabᴐ mu tenten to hɔ. Eyi ma Zkool hu baabi a wobɛtumi afi ase ayԑ nhwehwεmu no de agye bere pii

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

> **Nnipa a wɔwoo wɔn no tenten?** Ma ɛho ntew na ma wohu sɛ saa kɔkɔbɔ yi yɛ nokware. Zkool bɛ hwehwɛ afiri chain no mfiase, nea ɛyɛ katee nanso ɛrenhunu biribiara. Sɛ w'ahodeɛ firi ansaana Sapling upgrade bɛyɛ October 2018, gyaa ho hunu sene sɛ wobɛka akyiri ne kɛse mu nsɛm bi akyerɛ obi foforo, anyɛ saa deɛ scan no betumi abu n'ani agu wo transaction nyinaa so koraa.

7. Kyekyɛ account no, na afei sync no

### Ɔbaako firi sika kotoku foforo mu resane de aba no asi hɔ bio

Sɛ aba no fi sika kotoku foforo mu na ne nkae hunu sɛ ɛnyɛ saa wɔ bere a wɔde di dwuma akyi, mpɛn pii no address nsesaeɛ ho nhwehwɛmu kyerɛ nea enti.

Sesa **Advanced Options** no, na kɔ soro wɔ New Account screen koro no ara so, na senea saa to **Use Internal Change** ansa na woagye.

Wallets nyinaa mfa ɔkwan koro so nya change address. Sɛ wode ZODL aba bi hyɛ Zkool mu a, sɛ woanyɛ saa no de sika kakra bɛtumi ayera wɔ w'asesaw ho nkrataa mu na ayɛ te sɛ nea sika pii afi hɔ nanso ɛnyɛ ɛno ankasa. Zkools tooltip ma switch no da so ara kyerɛ Zashi, ɛne deɛ anka wɔfrɛ ZOLD no.

Nsase foforo mmienu na ɛwɔ **Advanced Options**:

- ** Extra Passphrase (ntumi nsiw)**, sɛ mfoni kotoku a edi kan no de baako na ɛfaa so aa.
- **Account Index**, sε mfidie a w'ayi no adi kan de aka nkonta pii wɔ aba koro so. Sika betumi abͻ index soronko bi ase

> **Saa mmienu yi da adi bere a aba bi wɔ Key afedie no mu.** Sɛ mfidie no nni hwee, anaa wo kura private key anaasɛ wokura viewing key a, Zkool kyerɛ sɛ fa Internal Change na H/W Ledger di dwuma. Fa aba no to hɔ kan ansa na woabue Advanced Options.

### 2) Sika a woayi afi sika kotoku bi mu no, w'atumi ahu ne nyinaa wɔ hɔ.

Sɛ wo sika wɔ wallet a ɛnni adansedie bi da (Trust, Coinomi, Guarda ne nea ɛtete saa), san fa account no di kan na afei twe sika no kɔ baabi foforo.

1. Fa akwan a ɛwɔ soro no so san fa account no si hɔ
2. bue account no na kɔ **Receive Funds** kratafa so.
3. Wɔmfa adansedie a ɛsakra, te sɛ Ledger ne Exodus no yɛ akwantuo pii wɔ abodin baako mu na eyi ma wɔn nsa ka sika ahorow.
4. **Sete na sync account no akyiri yi.** Adesamma a wohuu wɔn foforo no bɛgye wɔn sika wɔ scan foforɔ mu, enti sɛ wompɛ wei aa ɛbɛte sε nea wonhu hwee.
5. Kɔ w'abodin no so na fa ahyɛnsode mmiɛnsa yi to hɔ. Wonni text label, enti hover anaa long press hwɛ wɔn din:
   - **Shield One** (ɛkyerɛ ɔfasuo) twe address baako a ani tua bere biara mu
   - **Shield All** (ɔfasuo a ɛyɛ den) twe biribiara fi baabiara wɔ bere koro mu
   - **Wɔn a wɔantoto wɔn ho ban no nyinaa** (n'abankɛseɛ a abue) kɔ ɔkwan foforo so, akɔ baabi a emu da hɔ ma obiara hu.

> *Shield One yɛ ade a ɛtaa fa nnipa ho.** Sɛ wode address bebree sie wɔ dwumadie baako mu a, ɛma obiara hu sɛ ɛyɛ obi koro dea. Zkool ankasa bɔ kɔkɔ ansa na ɔde Shield All adi dwuma no.

6. Hwɛ adwuma no na fa to hɔ.

Unshield All yɛ adepa bere a woreyi wo sika wɔ sikakorabea bi so na wogye adrɛs ahodoɔ nko ara. Adwumayɛfoɔ no bɔ wɔn ho ban, nanso sɛ account no kura address a ɛbɔ ne ho ban nkutoo a, ɛnna unshield all nso ba saa aberɛ yi mu.

## Sika a wɔgye fii wɔn nsam ne Ironwood pool no

Efi Ironwood (NU6.3) upgrade a wɔde dii dwuma wɔ July 28, 2026 no, Orchard pool yɛ nea wotumi de sika to mu nkutoo. Ɛnsɛ sɛ wode biribi foforo kɔ hɔ na mmom wofa nneɛma bi a ɛwɔ hɔ ma ɛkɔ Ironwood so.

Sɛ wo sika a w'atwe no aba Orchard mu aa, ɛhia sɛ wɔ sesa ansa na ayɛ adwuma. bue account menu na yi **Ntoasoɔ Sesae** . saa kwan yi da adi bere biara a biribi ankasa bɛsesa.

The screen is titled **Orchard to Ironwood Migration** and runs in two phases. First it splits non-standard notes into standard denominations, then it moves those notes one at a time. **Migration Speed** is a slider from Ultra Fast to Slow that sets the random delay between steps. **Start Migration** runs the staged process in the background, and you can close the page and resume later. **One Shot** does it in a single pass.

Ninyɛne ne mɔ ko biala le ngyehyɛleɛ, ɔti bɛ nuhua ko biala lɛ ezukoa mɔɔ ɔbava yeabɔ la.

> **Nneɛma a w'ayi no yɛ baguam.** Sɛ ɛmu kɔ soro wɔ ɔdan mu, ne dodoɔ ne ntramu tenten nyinaa da adi wɔ chain so. Ɛmfa ho sɛ nea ɔsomaa woɔ ne deɛ ogyee woɔ no hyɛ ban mpo. Nnansa soronko bi betumi ama woahu wo din, enti fa akwantu nketewa kwan a ɛnkyɛ ntɛmntɛm sen bere koro pɛ na di kan susuw sɛnea wode Tor anaa VPN bɛfa afa wo ahokafoɔ ansa na wɔde IP address aka sika dodow a wosesae no ho.

## Deep Recovery a ZExCavator yɛ no so

[ZExCavator] no ne ho yɛ hu.](https://github.com/zingolabs/zexcavator) Ɛyɛ dwumadie a wɔfa so nya sika fi Zingo Labs hɔ ma nsɛm tebea ahorow mu, sɛ daa ɔsan yɛ adwuma no anyɛ yiye te sɛ adaka fael a asɛe anaa emu bi.

> Ne update a etwa to no di kan wɔ network upgrades foforo yi, enti fa yɛ sɛ nea aka akyire na hwɛ sɛ wo nsa bɛka keys biara wɔ wallet bi mu ansa na wode w'ani ato ne so.

## Ywallet no nni hɔ bio.

Ywallet yɛ dwumadie a wɔhyɛɛ ho nkuran sɛ wɔde bɛgye obi afiri mu bere tenten, na akwankyerεfoɔ dada no pii da so de wɔn ani si ɛno so.

N'adwumayɛni no aka sɛ ɔrenyɛ adwuma wɔ Ironwood. Akwanhodeɛ a ɛnni mprenpren mmara mu tumi yɛ tratraaksɔn, enti wontumi mfa nyɛ adwuma bio na ama sika aba so. **Zkool** ne nea ɔdi hɔ ma saa adwadie yi seesei ara.

Sɛ wowɔ sika a ɛda Ywallet mu dada no, fa saa asɛmfua koro yi ara san kɔ Zkool so denam anammɔn ahorow a ɛwɔ soro hɔ no so.

## Nkrataafa a ɛfa ho

- [Nkrataa nkekaho](/using-zcash/wallets) - nkotoku a w'ɔhwɛ so ne Ironwood ahobanbɔ no.
- [Nkyekyere nnua](/zcash-tech/ironwood) - nea upgrade no sesae ne deɛn nti na sika kɔ baabi foforɔ a, ɛnneɛ ɛhe na ɛde nkuro ba?
- [Nsɛm a wode bɛto dwa](/using-zcash/memos) - sɛnea nkrataa a wɔde ahyɛnsode ayɛ yɛ adwuma no.
- [Kyerԑkyerԑmu Nsaano Nkyea](/zcash-tech/viewing-keys) - nea wotumi kenkan nkutoo a wontua tumi so ka biara nni hɔ
