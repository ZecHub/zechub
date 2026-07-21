[Ihe ngosi Tor]](https://gitlab.torproject.org/uploads/-/system/appearance/header_logo/1/purple.svg)

# **Arti: Onye ahịa Tor na-esote ọgbọ na Rust**
[Atri Logo](https://gitlab.torproject.org/uploads/-/system/project/avatar/647/sliced-onions.png)

**Arti** is the Tor Project's initiative to build a next-generation **Tor** client using the **Rust** programming language. Arti is designed to be modular, embeddable, and production-ready, providing a more secure and efficient implementation of the **Tor** anonymity protocols. With **Arti version 1.4.0**, several significant updates have been introduced:

- A ** ọhụrụ RPC interface ** maka enwekwukwa mmekọrịta.
- Nkwadebe ọrụ maka ** relay support **.
- Mma na ** ọrụ-n'akụkụ onion ọrụ jụrụ-nke-ọrụ na-eguzogide**.

This release continues the Tor Project's efforts to offer better security, performance, and modularity for Tor users and developers.


---


## ** Ntinye nke Arti Client **

Soro usoro ndị a iji wụnye ma na-agba ọsọ ** Arti ** dị ka onye nnọchiteanya SOCKS na sistemụ gị.

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

Nke a ga-egosi na ị nwere nsụgharị kachasị ọhụrụ nke Rust arụnyere na sistemụ gị.

#### **Rịba ama maka ndị ọrụ Windows**:
- Rust nwere ike arụnyere na Windows site na [**Rustup**](https://rustup.rs/), a toolchain installer. Jide n'aka na ị melitela gburugburu ebe obibi dakọtara (ị nwere ike ịchọ ** Visual Studio Build Tools ** na Windows).
  
---

### **Nzọụkwụ 2: Iṅomi Arti Repository**

Iji nweta nsụgharị kachasị ọhụrụ nke onye ahịa Arti, ị ga-achọ ịmegharị ebe nchekwa ahụ site na [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Nzọụkwụ:
1. Mepee ọnụ gị (Command Prompt, PowerShell, ma ọ bụ Git Bash na Windows).
2. Gbaa iwu a iji mepụta ebe nchekwa:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Na-agagharị na ndekọ * arti * e mepụtara ọhụrụ:
   
   ```sh
   cd arti
   ```

Nke a ga-adọta koodu isi mmalite nke Arti na igwe mpaghara gị.

---

### **Nzọụkwụ 3: Wulite Arti Binary**

Ozugbo i mepụtaghachiri ebe nchekwa ahụ, ịkwesịrị iwulite Arti site na iji ** Cargo **, nke bụ onye njikwa ngwugwu Rust na ngwa ọrụ.

#### Iji Wulite Arti:
1. Na njedebe, gbaa iwu na-esonụ:
   ```sh
   cargo build --release
   ```

Iwu a na-achịkọta koodu Arti ma na-eme ka ọ dị mma maka mmepụta (mkpado *--release*). A ga-emepụta ọnụọgụ abụọ ahụ na ndekọ aha *target/release*.

#### Ọnọdụ nke Binary Compiled:
- Mgbe e wuchara ya, Arti ga-adị n'ebe: 
  ```sh
  target/release/arti
  ```

Ị nwere ike ịgba ọsọ a ọnụọgụ abụọ kpọmkwem site na ọnụ.

---

### **Nzọụkwụ 4: Gbaa Arti SOCKS Proxy**

Iji jiri Arti dị ka onye nnọchiteanya SOCKS (nke ga-eduzi okporo ụzọ ịntanetị gị site na netwọk Tor), ịkwesịrị ịmalite onye nnọchianya ahụ.

#### Iji malite SOCKS Proxy:
1. Gbaa iwu a:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Iwu a na-amalite Arti dị ka **SOCKS5 proxy** na **port 9150**, nke bụ ọdụ ụgbọ mmiri ndabara nke Tor ji maka okporo ụzọ SOCKS.

---

### **Nzọụkwụ 5: Hazie Ngwaọrụ Iji Jiri Arti**

Ozugbo Arti na-agba ọsọ dị ka onye nnọchiteanya SOCKS, ịkwesịrị ịhazi ngwa gị iji ya maka ịhazi okporo ụzọ site na netwọk Tor.

#### Nzọụkwụ:
1. Na ntọala ngwa gị (dịka, ihe nchọgharị weebụ, ngwa ngwa), chọọ ** proxy ntọala **.
2. Tinye proxy ** SOCKS5 ** na * localhost:9150 *.

Nke a ga-eduzi okporo ụzọ niile site na ngwa gị site na ** netwọkụ Tor ** na-eji Arti dị ka onye etiti.

---

## **Arti Integration na Tor Network**

Nke a bụ eserese dị mfe iji gosi etu Arti si arụ ọrụ na netwọkụ Tor:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- Ngwaọrụ ** jikọtara na ** Arti SOCKS Proxy ** na-eji ** SOCGS5 ** protocol.
- Arti then communicates with the **Tor network**, ensuring that your traffic is anonymized as it passes through the network.

---

## ** GitLab Ebe nchekwa na onyinye **

Ọ bụrụ na ị nwere mmasị inye aka na mmepe nke Arti, ị nwere ike inyocha koodu ma nye aka site na GitLab.

- ** Njikọ Ebe nchekwa **: [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti)
- **Kwugharịa Repo**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### ** Forking na Inye Aka **:
1. **Fork** ebe nchekwa na GitLab (chọrọ akaụntụ GitLab).
2. Jikọọ ebe nchekwa gị na ntọala mpaghara gị:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Dochie *_name_* na aha njirimara GitLab gị.

3. ** Gbanye mgbanwe ** na ndụdụ gị:
   ```sh
   git push _name_ main
   ```

4. ** Mepụta arịrịọ ijikọta (MR) ** na GitLab:
   Na-agagharị na ngalaba Merge Request na GitLab gị:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Ntuziaka maka arịrịọ ijikọ ọnụ**:
- ** Ejila rebase na squash mee ihe n'oge nyochaa **.
- Ọ bụrụ na ọ dị mkpa, jiri *fixup!* ma ọ bụ *squash!* maka nkwenye nkwenye akpaaka.
- Ebumnuche iji **tinye ntinye aka ọhụrụ** kama ịmegharị n'oge usoro nyocha.

---

### ** Ihe ndetu ndị ọzọ **:

- **Pre-built Binaries**: Ka ọ dị ugbu a, **Arti** anaghị enye ndị ọrụ gọọmentị ndị e wuru na mbụ. Ị ga-ewu onye ahịa ahụ site na isi iyi dị ka akọwara n'elu.
- **Rust Knowledge**: If you are contributing to Arti, note that the codebase is still evolving, and there may be changes or refactoring as new features are added.

---



Ọ bụrụ na ị nwere mmasị inye aka na oru ngo ahụ, nweere onwe gị ịlele koodu ahụ, kesaa ebe nchekwa ahụ, ma nyefee arịrịọ njikọta. Maka ozi ndị ọzọ, mmelite, na nchọpụta nsogbu, lelee [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti). 

Nwee ahụmịhe gị na Arti na hacking obi ụtọ!

--- 
