![Tor logo](/content-images/_unavailable.svg)

# Arti: Tor Client a ɔreba wɔ Rust mu no**
![Atri Logo](/content-images/_unavailable.svg)

Arti yɛ Tor Project no nhyehyɛɛ a wɔde siesie ne ho sɛ wɔbɛbɔ ɔkyena awoɔ ntoatoasoɔ **Tor** kͻmputa de adi dwuma wɔ kasahodo mu. Arti na w'ayɛ ma ayɛ modular, wobɛtumi afra mu, na wayɛ krado ama adwuma, ɛde ahobanbɔ akwanmu nsεmpa bi aba so. Ɛnam *Arti version 1.4.0* no nti, wɔayɛ nsakrae ahorow pii:

- A ** RPC interface foforo** ma ɛne no adi nkitaho yiye.
- Nhyehyɛeɛ a wɔde siesie adwuma no.
- Ntɔsoɔ wɔ "service-side onion service denial of service resistance" mu.

Saa nkyerɛase yi kɔ so ma Tor Project mmɔdenbɔ no sɛ ɛbɛma ahobammɔ, dwumadie pa ne modularity ama wɔn a wɔde Tor di dwuma ne developer.


---


## **Sɔhwɛfoɔ a ɔhyehyɛ Arti no**

Di anammɔn yi so fa to **Arti** sɛ SOCKS proxy wɔ wo system no mu.

---

### **Ntoasoɔ 1: Siesie baabi a w'atumi de dadeɛ ayɛ adwuma**

Ansa na wobɛtumi abɔ Arti afi source no, ehia sɛ wode Rust a edi kan pa ara di dwuma.

#### Deɛ wode bɛhyɛ Rust:

1. Kɔ wɛbsaet a wɔn ani gye ho no so. [Rust website]](https://www.rust-lang.org/).
2. Di akwankyerɛ a ɛfa sɛnea wobɛhyehyɛ wo operating system no so.
3. Hwɛ sɛ woahyehyɛ no denam:
   
   ```sh
   rustc --version
   ```

Eyi bɛkyerɛ sɛ wowɔ Rust a edi mu paa no wɔ wo afidie so.

#### **Nteaseɛ ma Windows Users**:
- Wobetumi de Rust asi Windows so wɔ [**Rustup**]](https://rustup.rs/)Hunu sɛ woahyehyɛ nhyehyɛɛ a ɛne no bɔ mu nso (obɛtumi ahwehwɛ Visual Studio Build Tools wɔ Windows so).
  
---

### **Anammɔn 2: Fa Arti akoraeɛ no yɛ krado**

Sɛ wopɛ Arti dwumadie no foforɔ a, ɛsɛ sɛ wofa [**GitLab**] so yɛ w'adwumakuo mu nneɛma nyinaa.](https://gitlab.torproject.org/tpo/core/arti).

#### Akwan a ɛsɛ sɛ yɛfa so:
1. Bue wo terminal (Command Prompt, PowerShell, anaa Git Bash wɔ Windows so).
2. Run saa ɔkyerԑ no sԑnea wobɛtumi atoto akoraeɛ yi:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Kɔ *arti* nkrataa a woabɔ no foforo mu:
   
   ```sh
   cd arti
   ```

Eyi bɛma Arti fibea mmara no akɔ wo kɔmputa so.

---

### **Anammɔn 3: Si adwinni a wɔaka no dua**

Sɛ woayɛ no sɛ wode resan akɔto hɔ a, ɛsɛsɛ w'ɔde Artie yɛ adwuma de Cargo di dwuma. Eyi ne Rust nhyehyɛeɛ ho dwumadie na ɛsan nso yɛ ade foforɔ bi.

#### Sɛ Wode Besi Ahonhonsɛm:
1. Fa saa akwankyerɛ yi yɛ adwuma wɔ terminal no mu:
   ```sh
   cargo build --release
   ```

Saa ɔhyɛ yi de Arti code no yɛ adwuma na ɛyɛ yie ma ne tintim (ɔwɔ *--release* ahyɛnsodeɛ). Binary no bɛyɛ wɔ directory a ɛne *target/release*.

#### Binary a wɔakyinkyim no bea:
- Sɛ wɔsi wie a, Arti nsoroma no bɛtena: 
  ```sh
  target/release/arti
  ```

Wobɛtumi de binary yi adi dwuma tẽẽ afi terminal no so.

---

### **Anammɔn 4: Fa Arti SOCKS Proxy no di dwuma**

Sɛ wode Arti bɛyɛ SOCKS proxy (a ɛbɛfa wo internet traffic afa Tor network so), ɛhia sɛ wufi ase de saa proxy no di dwuma.

#### Sɛ worebɔ SOCKS Proxy no a:
1. Yɛ saa ahyɛde yi:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Saa ɔhyɛ yi bɔ Arti ase sɛ **SOCKS5 proxy** wɔ port 9150** so, a ɛyɛ port no faako na Tor de SOCKS traffic di dwuma.

---

### **Ntuho 5: Sesa dwumadie no ma wɔde Arti** adi dwuma.

Sɛ Arti yɛ adwuma sɛ SOCKS proxy a, ɛsɛsɛ wo siesie w'adwuma no sɛnea ɛbɛyɛ na wode adi dwuma de akɔtra Tor network so.

#### Akwan a ɛsɛ sɛ yɛfa so:
1. W'apomuden nhyehyeɛ mu (te sɛ, wɛb browser, terminal app), hwehwɛ ** proxy settings** no.
2. Fa SOCKS5 abodin no to *localhost:9150*.

Eyi bɛma wo dwumadi ahorow no mu akwan nyinaa afa *Tor network* so de Arti ayɛ ɔfahyɛ.

---

## **Arti Nkrataafa a ɛne Tor Network di dwuma**

Sεnea y'akyerɛ no wɔ mfoni a emu da hɔ yi mu na ama wo ahu sɛnea Arti ne Tor network di dwuma:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- Saa afidie yi de ne ho bɔ Arti SOCKS Proxy so denam adiyie a ɔde di dwuma wɔ Socs5 no.
- Afei Arti ne Tor network di nkitaho, na ɔma wo traffic no yɛ nea obiara nnim bere a ɛretwam wɔ saa network no mu.

---

## **GitLab akoraeɛ ne mmoa**

Sɛ w'ani gye ho sɛ wobɛboa ma wɔayɛ Arti a, wobɛtumi asua ne nkyerɛwee no na woaboa wɔ GitLab so.

- **Nkɔmmɔbea Ntwerɔne**: [Arti GitLab Nkɔmmɔ bea]](https://gitlab.torproject.org/tpo/core/arti)
- **Fa Repo no yɛ adwuma**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Nneɛma a wɔde di dwuma ne nea wɔboa**:
1. **Fork** akoraeɛ no wɔ GitLab (hia sɛ wonya GitLab account).
2. Fa wo repository a wɔakyekyɛ no to w'asafidie so:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Fa wo GitLab din hyɛ *_name_* ananmu.

3. **Fa nsakrae** to wo fork so:
   ```sh
   git push _name_ main
   ```

4. **Ma Merge Request (MR)** wɔ GitLab:
   Kɔ Merge Request ɔfã no mu wɔ wo GitLab fork:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Nneɛma a wobisa fa nnɔbae ho no akwankyerɛ**:
- ** Mma no nnsi bio na mma no ntwe obi a woagye ato mu bere a worehwehwε ade**.
- Sɛ ɛho hia a, fa *fixup!* anaa *squash!* yɛ auto-squashing commit.
- Yԑde yԑn botae sԑ **bԑto nkyerԑkyerԑ foforo** mmom sen sɛ yɛbɛma asensenee no aba awiei wɔ bere a yɛresusu nsesae yi ho.

---

### *Notes a Ɛto so Abiesa:

- **Pre-built Binaries**: Seesei de, Arti mma nhyehyeɛ a wɔasiesie no mmma. Ɛwɔ sɛ w'atwe ɔmofoɔ no firi source mu sɛdeɛ yɛakyerɛkyerɛmu dada yi.
- **Rust Knowledge**: Sɛ woreboa Arti a, kae sɛ code base no da so ara resesa na nsakrae anaa refactoring betumi aba bere biara wɔ dwumadie foforɔ mu.

---



Sɛ w'ani gye ho sɛ wobɛboa wɔ dwumadie no mu a, to wo bo ase hwehwɛ code no mu na fa Merge Request. Wopɛ nsɛm pii ne nkyerɛɛmu ɛne ɔhaw ahorow ano aduru a, kɔ [Arti GitLab Repository] hɔ ma yɛn mmoa.](https://gitlab.torproject.org/tpo/core/arti). 

Fa w'ani gye wo suahu no ho wɔ Arti ne hacking anigye mu!

--- 
