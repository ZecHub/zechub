![Tor logo](/content-images/_unavailable.svg)

# **Arti: Awo Ntoatoaso a Edi Hɔ Tor Client wɔ Rust**
![Atri Logo](/content-images/_unavailable.svg)

**Arti** yɛ Tor Project no nhyehyɛe a wɔde bɛkyekye awo ntoatoaso a edi hɔ **Tor** afɛfo a wɔde **Rust** nhyehyɛe kasa no bedi dwuma. Wɔayɛ Arti sɛ ɛbɛyɛ modular, embeddable, na ayɛ krado sɛ wɔbɛyɛ, na ɛma **Tor** anonymity protocols no a wɔde bedi dwuma a ahobammɔ wom na etu mpɔn. **Arti version 1.4.0** no, wɔde nsakraeɛ a ɛho hia pii aba:

- **RPC interface foforo** ma nkitahodi a ɛkɔ anim.
- Ahosiesie adwuma ma **relay mmoa**.
- Nkɔso a aba wɔ **ɔsom-afã onion ɔsom pow-ɔsom resistance**.

Saa a wɔayi no adi yi toa Tor Project mmɔdenbɔ so sɛ ɛbɛma ahobanbɔ, adwumayɛ, ne modularity a eye ama Tor dwumadiefoɔ ne wɔn a wɔyɛ no.


---


## **Arti Client no a wɔde si hɔ**

Di anammɔn yi akyi na fa instɔl na fa **Arti** yɛ adwuma sɛ SOCKS proxy wɔ wo system no so.

---

### **Anamɔn 1: Fa Rust Nkɔso Atwa Yɛn Ho Ahyia** .

Ansa na wobɛtumi ayɛ Arti afiri fibea no, ɛsɛ sɛ wonya **Rust** a ɛyɛ stable version a ɛtwa toɔ a wɔde ahyɛ mu.

#### Sɛ Wobɛhyehyɛ Rust a:

1. Kɔsra ɔpanyin no [Rust wɛbsaet hɔ](https://www.rust-lang.org/).
2. Di akwankyerɛ a ɛfa instɔlehyɛn a ɛfa wo operating system ho no akyi.
3. Hwɛ sɛ instɔlehyɛn no yɛ nokware denam:
   
   ```sh
   rustc --version
   ```

Wei bɛsi so dua sɛ wowɔ Rust a ɛyɛ stable version a ɛtwa toɔ a wɔde ahyɛ wo system no so.

#### **Hyɛ no nsow ma Windows Dwumadifo**:
- Wobetumi de Rust ahyɛ Windows so denam [**Rustup** .](https://rustup.rs/), adwinnade a wɔde hyɛ mu. Hwɛ sɛ woasan nso asiesie adansi tebea a ɛne no hyia (ebia wubehia **Visual Studio Build Tools** wɔ Windows so).
  
---

### **Anamɔn 2: Clone Arti Adekorabea no**

Sɛ wopɛ sɛ wunya Arti client no nkyerɛase a aba foforo a, ɛho behia sɛ wo clone repository no fi [**GitLab** na ɛyɛ adwuma.](https://gitlab.torproject.org/tpo/core/arti).

#### Anamɔn a wobɛfa so:
1. Bue wo terminal (Ahyɛde Nkrasɛm, PowerShell, anaa Git Bash wɔ Windows so).
2. Fa ahyɛde a edidi so yi yɛ clone akorae no:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Kɔ *arti* kyerɛwtohɔ a wɔayɛ no foforo no so:
   
   ```sh
   cd arti
   ```

Wei bɛtwe Arti source code no akɔ wo mpɔtam hɔ mfiri no so.

---

### **Anamɔn 3: Yɛ Arti Binary no**

Sɛ wo clone repository no wie a, ɛsɛ sɛ wode **Cargo** a ɛyɛ Rust package manager ne build tool na ɛkyekye Arti.

#### Sɛnea Wobɛkyekye Arti:
1. Wɔ terminal no mu no, fa ahyɛde a edidi so yi di dwuma:
   ```sh
   cargo build --release
   ```

Saa ahyɛdeɛ yi boaboa Arti koodu no ano na ɛyɛ no yie ma adwumayɛ (*--release* frankaa no). Wɔbɛbɔ binary no wɔ *target/release* directory no mu.

#### Beae a Wɔde Binary a Wɔaboaboa Ano no Wɔ:
- Sɛ wosi wie a, Arti binary no bɛtena wɔ: 
  ```sh
  target/release/arti
  ```

Wubetumi ayɛ saa binary yi tẽẽ afi terminal no so.

---

### **Anamɔn 4: Fa Arti SOCKS Proxy no tu mmirika**

Sɛ wode Arti bedi dwuma sɛ SOCKS proxy (a ɛbɛma wo intanɛt akwantuo afa Tor ntwamutam no so) a, ɛhia sɛ wohyɛ proxy no ase.

#### Sɛ wopɛ sɛ wohyɛ SOCKS Proxy no ase a:
1. Fa ahyɛde a edidi so yi yɛ adwuma:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Saa ahyɛdeɛ yi hyɛ Arti ase sɛ **SOCKS5 proxy** wɔ **port 9150**, a ɛyɛ default port a Tor de di dwuma ma SOCKS traffic.

---

### **Anamɔn 5: Hyehyɛ Application ahorow a wɔde Arti Di Dwuma**

Sɛ Arti reyɛ adwuma sɛ SOCKS proxy wie a, ɛsɛ sɛ wo hyehyɛ wo application ahorow no sɛ wɔmfa nni dwuma mma akwantuo a ɛfa Tor ntwamutam no so.

#### Anamɔn a wobɛfa so:
1. Wɔ wo aplikeshɔn nhyehyɛe mu (e.g., wɛb brawsa, terminal aplikeshɔn), hwehwɛ **proxy nhyehyɛe**.
2. Set **SOCKS5 proxy** no sɛ *localhost:9150*.

Wei bɛma traffic nyinaa a ɛfiri wo applications no mu afa **Tor network** no so de Arti adi dwuma sɛ ntamgyinafoɔ.

---

## **Arti Nkabom ne Tor Network**

Mfonini a wɔayɛ no mmerɛw a ɛkyerɛ sɛnea Arti ne Tor ntwamutam no bom yɛ adwuma ni:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- **Application** no de **SOCKS5** protocol no di dwuma de di nkitaho ne **Arti SOCKS Proxy**.
- Afei Arti ne **Tor network** no di nkitaho, hwɛ hu sɛ wo traffic no yɛ nea wɔmmɔ din bere a ɛfa network no so no.

---

## **GitLab Adekorabea ne Ntoboa**

Sɛ w'ani gye ho sɛ wobɛboa ma **Arti** anya nkɔsoɔ a, wobɛtumi ahwehwɛ koodu no mu na woafa **GitLab** so aboa.

- **Akorae Nkitahodi**: [Arti GitLab Adekorabea](https://gitlab.torproject.org/tpo/core/arti)
- **Clone Repo no ho mfonini**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Forking ne Ntoboa a Wɔde Ma**:
1. **Fork** akoraeɛ a ɛwɔ GitLab so (ɛhwehwɛ GitLab akonta).
2. Fa wo forked repository no bata wo mpɔtam hɔ nhyehyɛe no ho:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Fa wo GitLab dwumadie din si *_name_* ananmu.

3. **Pia nsakrae** kɔ wo fork so:
   ```sh
   git push _name_ main
   ```

4. **Yɛ Merge Request (MR)** wɔ GitLab so:
   Kɔ Merge Request ɔfa a ɛwɔ wo GitLab fork no mu:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Merge Abisadeɛ Akwankyerɛ**:
- **Nsan nnyɛ rebase na squash commits bere a worehwɛ mu**.
- Sɛ ɛho hia a, fa *fixup!* anaa *squash!* di dwuma ma auto-squashing commits.
- Fa botaeɛ **de commits foforɔ bɛka ho** sene sɛ wobɛbɔ wo squashing wɔ review cycle no mu.

---

### **Nsɛm a Wɔahyɛ no Nsow**:

- **Pre-built Binaries**: Sɛnea ɛte mprempren no, **Arti** mfa aban binaries a wɔadi kan asi no mma. Ɛsɛ sɛ wokyekye client no fi source sɛnea yɛaka ho asɛm wɔ atifi hɔ no.
- **Rust Knowledge**: Sɛ woreboa Arti a, hyɛ no nsow sɛ codebase no da so ara rekɔ so, na ebia nsakrae anaa refactoring bɛba bere a wɔde nneɛma foforo aka ho no.

---



Sɛ w’ani gye ho sɛ wobɛboa adwuma no a, ntwentwɛn wo nan ase sɛ wobɛhwɛ koodu no, fork akorae no, na fa Merge Request mena. Sɛ wopɛ nsɛm pii, nsɛm foforo, ne ɔhaw ahorow ano aduru a, hwɛ [Arti GitLab Adekorabea](https://gitlab.torproject.org/tpo/core/arti). 

Nya anigye wɔ wo suahu a ɛfa **Arti** ne anigye hacking ho!

--- 
