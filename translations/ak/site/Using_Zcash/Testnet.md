# Zcash Testnet a Wɔde Yɛ Adwuma

## Dɛn Ne Zcash Testnet no?

**Zcash Testnet** yɛ blockchain a ɛne no di nsɛ wɔ Zcash main network (Mainnet) ankasa a ɛsan yɛ protocol, mmara, ne asɛmdi mu nteaseɛ pɛpɛɛpɛ - nanso ɛwɔ nsonsonoeɛ titire mmienu:

1. **Nsika biara nni sika boɔ ankasa** - wɔfrɛ no **TAZ**, ɛnyɛ ZEC, na wɔde yɛ sɔhwɛ nko ara. 
2. **Wɔsɔ network upgrades, nnwinnade, ne software hwɛ wɔ ha kan** ansa na wɔde adi dwuma wɔ Zcash blockchain ankasa no so. 

Ɔkwan foforɔ so no, Testnet te sɛ **sandbox anaa experimental environment** a developers, auditors, ne builders betumi asɔ adwene ahwɛ a wɔmfa sika ankasa nto asiane mu.


## Dɛn Nti na Testnet Wɔ Hɔ?

Testnet ho hia ma blockchain nkɔsoɔ ɛfiri sɛ **blockchains ankasa te sɛ Zcash yɛ nea ɛnsakra** - sɛ wɔsi nnwuma so dua wɔ network titire no so pɛ a, wɔrentumi nsan nyɛ. Testnet ma **safe replica** a wode bɛsɔ ahwɛ, asɔ ahwɛ, na woasiesie nneɛma ansa na wode akɔ Mainnet.

### Testnet a wɔde di dwuma

#### 1. Software Nkɔsoɔ & Nkitahodiɛ

Wɔn a wɔyɛ sika kotoku, nsakrae, softwea a wɔde tu fagude, anaa kokoam nnwinnade betumi asɔ ahwɛ dwoodwoo wɔ Testnet so. Nneɛma a wotumi yɛ no bi ne:

- Nkitahodi a wɔde mena ne nea wogye 
- TAZ sika a ne bo nyɛ den a wɔde tu block foforo 
- Ɔdefoɔ ntam nkitahodi ne API ahodoɔ a wɔbɛkyekyere 
- Sɔhwɛ ayɔnkofa kokoam nsɛm (transparent vs shielded) . 

**Nhwɛsoɔ:** 
Nnwinnade te sɛ [ .`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) fa Testnet di dwuma de yɛ nkitahodi na sɔ Zcash shielded asset functionalities hwɛ. 

**Wiase ankasa mu tebea:** 
Wallet developer betumi de software abɔ Testnet RPC endpoint na wayɛ asetena nyinaa ho mfonini - ɔbɔ address, ɔde shielded transactions bɛmena, na wagye sika a aka no atom - ansa na wakɔ live wɔ Mainnet so.

#### 2. Wɔsɔ Network Upgrades hwɛ

Zcash yɛ ne core protocol no foforo bere ne bere mu (e.g., Nu5, Nu6). Testnet ma nkɔsoɔ foforɔ yɛ adwuma **ansa na Mainnet** aba, ɛma developers ne mpɔtam hɔfoɔ tumi hunu na wɔsiesie mfomsoɔ.

**Nhwɛsoɔ:** 
Wɔdi kan pia adwene foforɔ mmara anaa ayɔnkofa su kɔ Testnet. Sɛ wɔsɔ hwɛ yiye wie a, ɛyɛ adwuma wɔ Mainnet so wɔ block sorokɔ a wɔahyɛ ato hɔ.

#### 3. Sɔhwɛ Node Nnwuma a Wɔde Di Dwuma

Zcash boa node software dwumadie ahodoɔ pii - . `zcashd` ne **Zebra** (Rust-based node a Zcash Foundation na ɛhwɛ so). Testnet ma wotumi sɔ nodes hwɛ wɔ tebea ankasa mu a sikasɛm mu asiane biara nni mu. 

Node developers betumi:

- Fa block trɛw no yɛ nokware 
- Sɔ RPC nkitahodi ahorow hwɛ 
- Hwɛ node suban wɔ adesoa ase 
- Sɔ mining software nkitahodi ahorow hwɛ 

#### 4. Adesua & Nhomasua

Wɔn a wɔrefi ase no betumi asua Zcash nneɛma te sɛ mining, shielded transactions a wɔyɛ, ne Unified Addresses a wɔde di dwuma. 
Mpɔtam hɔ nkyerɛkyerɛ ne nkrataa ma kwan ma wonya **Testnet faucets, explorers, ne akwankyerɛfo**.


## Testnet a Wɔde Di Dwuma Ankasa

### 1. Ɔdebɔfo Sɔhwɛ (Wallet / App) .

- Fa wo ho to Zcash Testnet so 
- Bisa TAZ fi faucet bi mu 
- Fa nnwuma a wɔabɔ ho ban mena 
- Hwɛ sɛ kokoamsɛm ne UI no gyina pintinn 

ZEC ankasa biara nni hɔ a ɛyera sɛ mfomso bi mpo a.

### 2. Nsesaeɛ Nkabom Sɔhwɛ

- Fa Testnet node bi di dwuma 
- Fa Zebrad JSON-RPC endpoints di dwuma de di nnwuma ho dwuma 
- Sɔ automated deposit/withdrawal ntease hwɛ 

Ɛhwɛ hu sɛ ahobammɔ ho mmara a ɛfa nneɛma a wɔyɛ ho na esiw sikasɛm mu adehwere ano.

### 3. Mining Nhyehyɛe Sɔhwɛ ahorow

- Fa mining templates di dwuma 
- Sɔ block validation hwɛ 
- Hwɛ akatua a wɔde ma wɔ atuo ho (TAZ nkutoo) . 
- Tune mining adwumayɛ 

Siw bere a wɔde yɛ adwuma anaasɛ sika a wɔhwere bere a worekɔ Mainnet no ano.

### 4. Adesua / Protocol Nhwehwɛmu

Nhwehwɛmufoɔ bɛtumi asɔ nneɛma foforɔ te sɛ **stateless verification**, **zero-knowledge proof optimization**, anaa protocol nhwehwɛmu foforɔ a wɔde Testnet di dwuma ahwɛ. 
Wɔn a wɔde di dwuma a ɛkɔ anim nso betumi ayɛ **custom Testnets anaa regtest environments** ama sɔhwɛ titiriw.


## Nsonsonoe Titiriw a Ɛda Mainnet ne Testnet Ntam

| Feature a ɛwɔ | Mainnet | Testnet |
|-----------------------|-----------------|--------------------------|
| Bo a ɛsom wɔ sika a wɔde yɛ nneɛma | Ankasa ZEC | TAZ (sika a ɛsom bo biara nni mu) |
| Asiane a Ɛwɔ Hɔ | Sikasɛm mu asiane | Ahobammɔ ma sɔhwɛ |
| Protocol a wɔayɛ no foforo | Nneɛma a wɔyɛ | Ntɛm a wɔde yɛ adwuma |
| Mining akatua | Ankasa a wɔde ma | Sɔhwɛ akatua nkutoo |
| Network mfasoɔ | Nkitahodi a ɛkɔ so wɔ nkwa mu| Sɔhwɛ ne nkɔso |

## Nsusuwii a ɛnteɛ a wɔtaa nya

- **Testnet sika boɔ yɛ biribi** -> Atoro, TAZ wɔ zero value. 
- **Testnet sika a wobɛhwere no ho hia** -> Atoro, bo ankasa biara nni hɔ a ɛyera. 
- **Testnet ne Mainnet yɛ pɛ** -> Atoro, Testnet reset mpɛn pii na ɛnyɛ sikasɛm mu ahobammɔ te sɛ Mainnet.

---

## Dɛn Ne TAZ?

**TAZ** yɛ Testnet nkyerɛaseɛ a ɛfa Zcash sika ho: 

- Ɛnyɛ sika ankasa; wontumi mfa ZEC anaa fiat nsesa 
- Wɔde yɛ sɔhwɛ, nkɔso, ne adesua 
- Di Zcash mmara nyinaa akyi: wobetumi de amena, atu, na wɔde adi dwuma wɔ address ahorow a wɔabɔ ho ban mu 

**Nhwɛsoɔ:** 
Ɔdebɔfoɔ bi bɛtumi de TAZ 100 afiri Testnet address baako so akɔ foforɔ so de asɔ sika kotokuo bi ahwɛ a ɔmfa ZEC ankasa nto asiane mu. 

Susuw TAZ ho sɛ **"agoru sika" ma Zcash Testnet**.


## Dɛn Ne Faucets?

**faucet** yɛ ɔsom a ɛma TAZ sika a wontua hwee de sɔ hwɛ:

- Mpɛn pii no, wɛbsaet anaa API ahorow 
- Wɔn a wɔde di dwuma no de Testnet address ma; faucet no de TAZ kakraa bi mena 
- Kwati hia a ehia sɛ wode nsa tu TAZ 

**Nhwɛsoɔ:** 
1. Kɔ Testnet faucet bi so (e.g., [testnet.zecfaucet.com](https://testnet.zecfaucet.com) | [fauzec.com so na ɔkyerɛwee](https://fauzec.com/))  
2. Hyehyɛ wo Testnet address no 
3. Bisa TAZ 
4. Nya TAZ ntɛm ara na fi ase sɔ hwɛ 

**Nea enti a ɛho hia:** 
- Sɔhwɛ a ahobammɔ wom a wɔmfa ZEC nto asiane mu 
- Nneɛma a wobetumi anya ama wɔn a wɔrefi ase ne wɔn a wɔreyɛ 
- Nhwɛso a wɔyɛ no ntɛmntɛm ma sika kotoku, nsakrae, ne app ahorow



## Zkool ne Zingo! Sika kotoku

### Zkool

- Multi-account wallet ma Zcash dwumadiefoɔ a wɔakɔ anim 
- Ɛboa aba kasasin, hwɛ safe, address a ɛda adi na wɔabɔ ho ban 
- Wobetumi afa nodes a edi mũ anaa lightwallet servers so akɔ Mainnet, Testnet, anaa Regtest so

### Zingo!

- Mobile wallet twee adwene sii kokoamsɛm ne nneɛma a ɛnyɛ den so 
- Ɛboa address ahorow a wɔabɔ ho ban ne nea wɔaka abom 
- Wɔayɛ no foforo sɛnea ɛbɛyɛ a ɛbɛboa Testnet protocols (a NU6 Testnet ka ho) .

## Testnet a wɔma ɛyɛ adwuma wɔ Walets mu

### Zkool Sikakorabea

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/XCGwwqLZILg"
    title="Zkool Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ma kwan maFullScreen no
    loading="lazy"
  />
</div>

**Ano:** 
- Wallet betumi asan afi ase bere a woresakra network ahorow no 
- Mainnet ZEC akontaabu ahorow no nnya nkɛntɛnso biara 
- Fa Testnet lightwallet server di dwuma sɛ wɔsrɛ wo a

### Zingo! Sikabɔtɔ

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/To7WAkiBldA"
    title="Zingo Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ma kwan maFullScreen no
    loading="lazy"
  />
</div>


Sɛ wɔma ɛyɛ adwuma wie a, sika kotoku betumi de TAZ amena na wɔagye, asɔ nnwuma a wɔabɔ ho ban ahwɛ, na wɔasɔ ahwɛ dwoodwoo.


## Bere a Woama Testnet ayɛ adwuma akyi

- Nkitahodi yɛ wɔn ade te sɛ Mainnet nanso ɛwɔ **zero-value TAZ** . 
- Wobetumi asɔ nnwuma a wɔabɔ ho ban, address ahorow pii, ne kokoam nsɛm a wɔde sie ahwɛ 
- Developers betumi debug na wɔasɔ features ahwɛ a wɔmfa ZEC ankasa asiane nni dwuma


## Nsɛm a Wɔaboaboa Ano Ntɛmntɛm

- **Zcash Testnet** yɛ sandbox tebea a ahobammɔ wom a wɔde si, sɔ hwɛ, na wɔsɔ hwɛ 
- Nsɛm a wɔde di dwuma: developer sɔhwɛ, node sɔhwɛ, exchange integration, nhwehwɛmu, ne nhomasua 
- **TAZ sika** na wɔde di dwuma sen ZEC na enni bo ankasa 
- Testnet ho hia ansa na wode nneɛma a ɛwɔ Mainnet so no adi dwuma
