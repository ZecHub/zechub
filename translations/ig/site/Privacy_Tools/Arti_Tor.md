![Tor logo](/content-images/_unavailable.svg)

# **Arti: Onye ahịa Tor Ọgbọ Ọhụrụ na Rust**
![Atri Logo](/content-images/_unavailable.svg)

**Arti** bụ atụmatụ Project Tor iji wuo onye ahịa **Tor** ọgbọ ọhụrụ site n'iji asụsụ mmemme **Rust**. E mere Arti ka ọ bụrụ nke a pụrụ ikewaa n’ụdị modul, tinye n'ime ngwa ọzọ, ma dị njikere maka mmepụta, na-enye mmejuputa usoro amaghị aha **Tor** nke dị nchebe ma dị irè karịa. Site na **Arti version 1.4.0**, e webatala ọtụtụ mmelite dị mkpa:

- **Njikọ RPC ọhụrụ** maka mmekorita ka mma.
- Ọrụ nkwadebe maka **nkwado relay**.
- Mmelite n'ime **mguzogide mwakpo ịgọnarị ọrụ onion service n'akụkụ ọrụ**.

Ntọhapụ a na-aga n'ihu na mbọ Project Tor ịnye nchekwa, arụmọrụ, na nhazi modul ka mma maka ndị ọrụ na ndị onye mmepụta Tor.


---


## **Ịwụnye Onye Ahịa Arti**

Soro usoro ndị a iji wụnye ma gbaa **Arti** dịka SOCKS proxy na sistemụ gị.

---

### **Nzọụkwụ 1: Hazie Gburugburu Mmepe Rust**

Tupu ị nwee ike iwulite Arti site na koodu mmalite, ị ga-enwerịrị ụdị kwụsiri ike kacha ọhụrụ nke **Rust** arụnyere.

#### Iji Wụnye Rust:

1. Gaa na weebụsaịtị gọọmentị [Rust](https://www.rust-lang.org/).
2. Soro ntuziaka nrụnye maka sistemụ arụmọrụ gị.
3. Nyochaa nrụnye ahụ site n'ịgba:
   
   ```sh
   rustc --version
   ```

Nke a ga-akwado na i nwere ụdị kwụsiri ike kacha ọhụrụ nke Rust arụnyere na sistemụ gị.

#### **Note maka Ndị Ọrụ Windows**:
- Enwere ike ịwụnye Rust na Windows site na [**rustup**](https://rustup.rs/), nke bụ onye nrụnye toolchain. Hụ na ị hazikwala gburugburu iwulite dabara adaba (ị nwere ike ịchọ **Visual Studio Build Tools** na Windows).
  
---

### **Nzọụkwụ 2: Clone Ebe Nchekwa Arti**

Iji nweta ụdị onye ahịa Arti kacha ọhụrụ, ị ga-achọ clone ebe nchekwa ahụ site na [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Usoro:
1. Mepee terminal gị (Command Prompt, PowerShell, ma ọ bụ Git Bash na Windows).
2. Gbaa iwu na-esonụ iji clone ebe nchekwa ahụ:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Gaa na ndekọ *arti* e mepụtara ọhụrụ:
   
   ```sh
   cd arti
   ```

Nke a ga-ebudata koodu mmalite Arti na igwe mpaghara gị.

---

### **Nzọụkwụ 3: Wulite Binary Arti**

Mgbe i clonechara ebe nchekwa ahụ, ị ga-achọ iwulite Arti site na **Cargo**, nke bụ onye njikwa ngwugwu na ngwá ọrụ iwulite nke Rust.

#### Iji Wulite Arti:
1. Na terminal, gbaa iwu na-esonụ:
   ```sh
   cargo build --release
   ```

Iwu a na-achịkọta koodu Arti ma kwalite ya maka mmepụta (akara *--release*). A ga-emepụta binary ahụ n'ime ndekọ *target/release*.

#### Ebe Binary A Chịkọtara Dị:
- Mgbe iwulitechara, binary Arti ga-adị na:  
  ```sh
  target/release/arti
  ```

Ị nwere ike ịgba binary a ozugbo site na terminal.

---

### **Nzọụkwụ 4: Gbaa Arti SOCKS Proxy**

Iji Arti dịka SOCKS proxy (nke ga-esi na netwọk Tor duzie okporo ụzọ ịntanetị gị), ị ga-ebido proxy ahụ.

#### Iji Malite SOCKS Proxy:
1. Gbaa iwu na-esonụ:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Iwu a na-amalite Arti dịka **SOCKS5 proxy** na **port 9150**, nke bụ port ndabara Tor ji eme okporo ụzọ SOCKS.

---

### **Nzọụkwụ 5: Hazie Ngwa Ka Ha Jiri Arti**

Ozugbo Arti na-agba dịka SOCKS proxy, ị ga-ahazi ngwa gị ka ha jiri ya duzie okporo ụzọ site na netwọk Tor.

#### Usoro:
1. N'ime ntọala ngwa gị (dịka ọmụmaatụ, ihe nchọgharị weebụ ma ọ bụ ngwa terminal), chọọ **ntọala proxy**.
2. Tọọ **SOCKS5 proxy** ka ọ bụrụ *localhost:9150*.

Nke a ga-esi n'aka Arti, dịka onye etiti, duzie okporo ụzọ niile sitere na ngwa gị site na **netwọk Tor**.

---

## **Njikọta Arti na Netwọk Tor**

Nke a bụ eserese dị mfe iji gosi otú Arti si arụkọ ọrụ na netwọk Tor:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- **Ngwa** ahụ na-ejikọ na **Arti SOCKS Proxy** site na protokọl **SOCKS5**.
- Arti na-ekwurịta okwu na **netwọk Tor**, na-ahụ na e zoro okporo ụzọ gị ka ọ na-agafe na netwọk ahụ.

---

## **Ebe Nchekwa GitLab na Ntinye Aka**

Ọ bụrụ na ị nwere mmasị itinye aka na mmepe **Arti**, ị nwere ike inyocha koodu ahụ ma tinye aka site na **GitLab**.

- **Njikọ Ebe Nchekwa**: [Ebe Nchekwa Arti na GitLab](https://gitlab.torproject.org/tpo/core/arti)
- **Clone Repo ahụ**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Ịmepụta Fork na Itinye Aka**:
1. **Fork** ebe nchekwa ahụ na GitLab (chọrọ akaụntụ GitLab).
2. Jikọọ ebe nchekwa i forkịrị na nhazi mpaghara gị:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Dochie *_name_* na aha njirimara GitLab gị.

3. **Push mgbanwe** na fork gị:
   ```sh
   git push _name_ main
   ```

4. **Mepụta Merge Request (MR)** na GitLab:
   Gaa na ngalaba Merge Request n'ime fork GitLab gị:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Ntuziaka Merge Request**:
- **Emegharịla akụkọ commit ma ọ bụ squash commits n'oge nyocha**.
- Ọ bụrụ na ọ dị mkpa, jiri *fixup!* ma ọ bụ *squash!* maka commits auto-squashing.
- Gbalịa **itinye commits ọhụrụ** kama ịme squash n'oge okirikiri nyocha.

---

### **Notes Ndị Ọzọ**:

- **Binaries Ewubere Tupu Oge**: Ka ọ dị ugbu a, **Arti** anaghị enye binaries ewubere tupu oge n’ọrụ. Ị ga-ewulite onye ahịa ahụ site na koodu mmalite dịka akọwara n'elu.
- **Ihe Ọmụma Rust**: Ọ bụrụ na ị na-atụnye aka na Arti, mara na koodu ntọala ahụ ka na-etolite, ma mgbanwe ma ọ bụ nhazigharị nwere ike ịdị ka a na-agbakwunye atụmatụ ọhụrụ.

---



Ọ bụrụ na ị nwere mmasị itinye aka na ọrụ a, nweere onwe gị inyocha koodu ahụ, fork ebe nchekwa ahụ, ma nyefee Merge Request. Maka ozi ndị ọzọ, mmelite, na idozi nsogbu, lee [Ebe Nchekwa Arti na GitLab](https://gitlab.torproject.org/tpo/core/arti). 

Nwee ahụmịhe ọma na **Arti**, ma nwee ọṅụ n'ịrụ ọrụ!

---
