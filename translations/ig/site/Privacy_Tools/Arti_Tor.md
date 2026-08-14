![Tor logo](/content-images/_unavailable.svg)

# **Arti: Onye ahịa Tor na-esote ọgbọ n'ime Rust**
![Atri Logo](/content-images/_unavailable.svg)

**Arti** is the Tor Project's initiative to build a next-generation **Tor** client using the **Rust** programming language. Arti is designed to be modular, embeddable, and production-ready, providing a more secure and efficient implementation of the **Tor** anonymity protocols. With **Arti version 1.4.0**, several significant updates have been introduced:

- A ** ọhụrụ RPC interface** maka enwekwukwa mmekọrịta.
- Ọrụ nkwadebe maka ** nkwado relay.
- Mma na ** ọrụ-n'akụkụ onion ọrụ jụrụ nke ọrụ iguzogide**.

Mgbapụta a na-aga n'ihu mgbalị Tor Project iji nye nchebe, arụmọrụ, na modularity ka mma maka ndị ọrụ Tor na ndị mmepe.


---


## ** Ntinye nke Arti Client**

Soro usoro ndị a iji wụnye ma na-agba ọsọ ** Arti** dị ka onye nnọchiteanya SOCKS na sistemụ gị.

---

### **Nzọụkwụ 1: Mepụta a nchara Development Environment**

Tupu ị nwee ike iwulite Arti site na isi mmalite, ịkwesịrị ịnwe ụdị nrụpụta kachasị ọhụrụ nke **Rust** arụnyere.

#### Iji Wụnye Rust:

1. Gaa na ebe nrụọrụ weebụ gọọmentị [Rust website](https://www.rust-lang.org/).
2. Soro ntuziaka ntinye maka sistemụ arụmọrụ gị.
3. Nyochaa nrụnye site na ịgba ọsọ:
   
   ```sh
   rustc --version
   ```

Nke a ga-egosi na ị nwere ụdị kachasị ọhụrụ nke Rust arụnyere na sistemụ gị.

#### **Mara maka ndị ọrụ Windows**:
- Rust nwere ike arụnyere na Windows site [**Rustup**](https://rustup.rs/), onye na-arụ ọrụ ngwá ọrụ. Jide n'aka na ị melitela gburugburu ebe obibi dakọtara (ị nwere ike ịchọ ** Visual Studio Build Tools ** na Windows).
  
---

### **Nzọụkwụ 2: Iṅomi Arti Repository**

Iji nweta ụdị kachasị ọhụrụ nke onye ahịa Arti, ị ga-achọ iṅomi ebe nchekwa ahụ site na [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Nzọụkwụ:
1. Mepee ọnụ gị (Command Prompt, PowerShell, ma ọ bụ Git Bash na Windows).
2. Gbaa iwu a iji mepụta ebe nchekwa:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Gaa na ndekọ * arti* e mepụtara ọhụrụ:
   
   ```sh
   cd arti
   ```

Nke a ga-adọta koodu isi mmalite nke Arti n'ime igwe gị.

---

### **Nzọụkwụ 3: Wulite Arti Binary**

Ozugbo i mepụtara ihe nchekwa ahụ, ịkwesịrị ịmepụta Arti site na iji ** Cargo ** , nke bụ onye njikwa ngwugwu Rust ma wuo ngwá ọrụ.

#### Iji Wulite Arti:
1. Na njedebe, gbaa iwu a:
   ```sh
   cargo build --release
   ```

Iwu a na-achịkọta koodu Arti ma bulie ya maka mmepụta (ọkọlọtọ *--release*). A ga -emepụta ọnụọgụ abụọ ahụ n'ime ndekọ aha *target/release*.

#### Ebe nke Binary Compiled:
- Mgbe e wuchara ya, Arti ga-adị n'ebe: 
  ```sh
  target/release/arti
  ```

Ị nwere ike ịgba ọsọ a ọnụọgụ abụọ ozugbo site na njedebe.

---

### **Nzọụkwụ 4: Gbaa Arti SOCKS Proxy**

Iji jiri Arti dị ka onye nnọchi anya SOCKS (nke ga-agagharị okporo ụzọ ịntanetị gị site na netwọk Tor), ịkwesịrị ịmalite proxy.

#### Iji Malite Onye nnọchiteanya SOCKS:
1. Gbaa iwu a:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Iwu a na-amalite Arti dị ka onye nnọchiteanya ** SOCKS5** n'ọdụ ụgbọ mmiri 9150**, nke bụ ọdụ ụgbọ elu ndabara Tor ji maka okporo ụzọ SOCGS.

---

### **Nzọụkwụ 5: Hazie Ngwaọrụ Iji Jiri Arti**

Ozugbo Arti na-agba ọsọ dị ka onye nnọchiteanya SOCKS, ịkwesịrị ịhazi ngwa gị iji ya maka okporo ụzọ site na netwọk Tor.

#### Nzọụkwụ:
1. Na ntọala ngwa gị (dịka, ihe nchọgharị weebụ, ngwa ngwụcha), chọọ ** proxy settings**.
2. Tinye proxy ** SOCKS5** na * localhost:9150*.

Nke a ga-eme ka okporo ụzọ niile si na ngwa gị site na netwọkụ ** Tor** jiri Arti dị ka onye etiti.

---

## **Arti Integration na Tor Network**

Nke a bụ eserese dị mfe iji gosipụta otú Arti si arụ ọrụ na netwọk Tor:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- Ngwaọrụ ahụ jikọtara na Arti SOCKS Proxy site n'iji usoro **SOCKS5**.
- Arti na-ekwurịta okwu mgbe ahụ ** netwọk Tor, hụ na a naghị akpọ aha okporo ụzọ gị ka ọ gafere n'ime netwọk.

---

## ** GitLab Ebe nchekwa na Mgbakwunye**

Ọ bụrụ na ị nwere mmasị inye aka n'ịzụlite Arti, ịnwere ike inyocha koodu ma nye onyinye site na GitLab.

- ** Njikọ Ebe nchekwa**: [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti)
- **Kpọgharia Repo**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### ** Ịgba na Inye Aka**:
1. **Fork** ebe nchekwa na GitLab (chọrọ akaụntụ GitLab).
2. Jikọọ ebe nchekwa gị na ntọala mpaghara:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Dochie *_name_* na aha njirimara GitLab gị.

3. **Gbanye mgbanwe** na ndụdụ gị:
   ```sh
   git push _name_ main
   ```

4. ** Mepụta arịrịọ ijikọta (MR)** na GitLab:
   Gaa na ngalaba Merge Request n'ime GitLab gị:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Ntuziaka maka arịrịọ ijikọta ọnụ**:
- ** Ejila ihe ndị ọzọ na-eme ka ị ghara imebi iwu mgbe a na-enyocha gị**.
- Ọ bụrụ na ọ dị mkpa, jiri *fixup!* maọbụ *squash!* maka nkwenye akpaghị aka.
- Gbalịa ịtinye ihe ọhụrụ kama ịgbachi nkịtị n'oge usoro nyocha.

---

### ** Ihe ndetu ndị ọzọ**:

- **Pre-built Binaries**: Ka ọ dị ugbu a, Arti anaghị enye ndị ọrụ gọọmentị na - arụpụta ihe. Ị ga - ewu onye ahịa ahụ site n'isi mmalite dịka akọwara n'elu.
- **Rust Knowledge**: If you are contributing to Arti, note that the codebase is still evolving, and there may be changes or refactoring as new features are added.

---



Ọ bụrụ na ị nwere mmasị inye aka n'ọrụ ahụ, nweere onwe gị ileba anya koodu ahụ, kesaa ebe nchekwa ya ma nyefee arịrịọ njikọta. Maka ozi ndị ọzọ, mmelite, yana nchọpụta nsogbu, lelee [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti). 

Nwee ahụmịhe gị na Arti ma nwee ọ happyụ hacking!

--- 
