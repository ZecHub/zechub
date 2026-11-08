![Tor logo](/content-images/_unavailable.svg)

# **Arti: Ƒevi [Client] si nye Tor ƒe dzidzime ƒevi le Rust me**
![Atri Logo](/content-images/_unavailable.svg)

**Arti** nye Tor Project ƒe dɔwɔwɔ be woatu dzidzime ƒe **Tor** ƒevi kple **Rust** ƒe ɖoɖoŋlɔ ƒe gbegbɔgblɔ. Woɖoe Arti ɖe ɖoɖo vovovowo nu, eye wòate ŋu anɔ dɔwɔnu bubu me, eye wòdzra ɖo be woate ŋu azãe le dɔwɔƒe me. Ena **Tor** ƒe ame-menyaɖeɖe ƒe ɖoɖowo nanɔ dedie wu eye wòawɔ dɔ nyuie wu. Kple **Arti version 1.4.0**, woɖo yeye vevi aɖewo ɖe eme:

- **RPC interface yeye** si ana míaƒe kadodo nadzɔ nyuie wu.
- Dɔ gɔmedzedze si wɔna be **relay support** nanɔa dzadzra.
- Dzidzɔ ɖe **service-side onion service denial-of-service resistance** ŋu.

Toto sia yi edzi kple Tor Project ƒe dɔwɔwɔ be wòana dedienɔnɔ, dɔwɔwɔ ƒe ŋusẽ, kple ɖeɖe vovovo nanɔ nyuie na Tor ƒe zãlawo kple mɔ̃ ƒe ɖoɖoŋlɔla.


---


## **Arti ƒevi ƒe ɖoɖe**

Dze ɖe afɔɖeɖe siawo yome be nàɖo **Arti** eye nàwɔ dɔ kplii abe SOCKS proxy ene le wò ƒe ɖoɖo dzi.

---

### **Afɔ 1: Ðo Rust ƒe Dɔwɔƒe Ƒe Nɔnɔ ɖe Anyi**

Hafi nàte ŋu atu Arti tso eƒe gɔmedze nu la, ele be **Rust** ƒe version si nyo keŋkeŋ wu nanɔ wò gbɔ.

#### Be Nàɖo Rust:

1. Yi [Rust ƒe nyatakakadzraƒe [website] si nye wɔnɔa me](https://www.rust-lang.org/).
2. Dze ɖe ɖoɖe ƒe mɔfiamewo yome le wò ƒe dɔwɔɖoɖo [operating system] nu.
3. Kpɔ be ɖoɖea dze egɔme to esia wɔwɔ me:
   
   ```sh
   rustc --version
   ```

Esia aɖe fia be Rust ƒe version si nyo keŋkeŋ wu la le wò ƒe ɖoɖo dzi.

#### **Didienu na Windows ƒe Zãlawo**:
- Woate ŋu aɖo Rust le Windows dzi to [**rustup**](https://rustup.rs/), si nye toolchain ƒe ɖoɖe dɔwɔnu. Kpɔ be nàɖo dɔwɔƒe si sɔ kplee hã ɖe anyi (wòate ŋu ahiã **Visual Studio Build Tools** le Windows dzi).
  
---

### **Afɔ 2: Wɔ Arti Repository ƒe Clone**

Be nàkpɔ Arti ƒevi ƒe version si yeyee wu la, ele be nàwɔ repository la ƒe clone tso [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Afɔwo:
1. Ʋu wò ƒe terminal (Command Prompt, PowerShell, alo Git Bash le Windows).
2. Wɔ sedede sia be nàwɔ repository la ƒe clone:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Yi *arti* ƒe folder si wowɔ yeyi la me:
   
   ```sh
   cd arti
   ```

Esia ahe Arti ƒe gɔmedze code la va wò ƒe mɔ̃.

---

### **Afɔ 3: Tu Arti Binary**

Ne nèwɔ repository la ƒe clone vɔ la, ele be nàtu Arti kple **Cargo**, si nye Rust ƒe package manager kple tutu dɔwɔnu.

#### Be Nàtu Arti:
1. Le terminal me, wɔ sedede sia:
   ```sh
   cargo build --release
   ```

Sedede sia tu Arti ƒe code la eye wòwɔe be wòasɔ na dɔwɔƒe me zãzã (le *--release* flag ta). Woawɔ binary la le *target/release* ƒe folder me.

#### Binary Si Wotu ƒe Nɔƒe:
- Ne wotu vɔ la, Arti binary la anɔ afisia:  
  ```sh
  target/release/arti
  ```

Àte ŋu awɔ dɔ kple binary sia tẽ tso terminal me.

---

### **Afɔ 4: Wɔ Arti SOCKS Proxy Dɔ**

Be nàzã Arti abe SOCKS proxy ene (si ato wò ƒe internet ƒe mɔzɔzɔ katã le Tor network me) la, ele be nàdzo proxy la gɔme.

#### Be Nàdzo SOCKS Proxy Gɔme:
1. Wɔ sedede sia:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Sedede sia dzo Arti gɔme abe **SOCKS5 proxy** ene le **port 9150**, si nye port si Tor zãna zi geɖe na SOCKS ƒe mɔzɔzɔ.

---

### **Afɔ 5: Ðo Appwo Be Woazã Arti**

Ne Arti le dɔ wɔm abe SOCKS proxy ene vɔ la, ele be nàɖo wò ƒe appwo be woazãe be woato mɔzɔzɔ le Tor network me.

#### Afɔwo:
1. Le wò ƒe app ƒe ɖoɖowo me (abe web browser alo terminal app ene), di **proxy ƒe ɖoɖowo**.
2. Ðo **SOCKS5 proxy** la ɖe *localhost:9150*.

Esia ato mɔzɔzɔ katã tso wò ƒe appwo me le **Tor network** me, eye Arti anɔa dome abe mɔtɔla ene.

---

## **Arti ƒe Ɖekakpɔkpɔ kple Tor Network**

Esia nye nɔnɔmetata bɔbɔe aɖe si fia ale si Arti wɔa dɔ kple Tor network:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- **Application** la ƒoa kadodo kple **Arti SOCKS Proxy** kple **SOCKS5** protocol.
- Arti wɔa kadodo kple **Tor network**, eye wòkpɔa be woɖe wò ƒe mɔzɔzɔ ƒe ame-menyanɔnɔ ɖa ne wòle network la me tom.

---

## **GitLab Repository kple Nuɖekeke**

Ne èdi be yeanɔ **Arti** ƒe ŋgɔyiyi me akpe ɖe eŋu la, àte ŋu akpɔ code la eye nàkpe ɖe eŋu to **GitLab** dzi.

- **Repository Ƒe Ƒometɔ**: [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti)
- **Wɔ Repo La Ƒe Clone**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Fork Wɔwɔ kple Nuɖekeke**:
1. Wɔ repository la ƒe **Fork** le GitLab (ehiã be GitLab account nanɔ asiwò).
2. Ƒo wò ƒe repository si nèwɔ fork la kple wò ƒe ɖoɖo le afi:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Ɖe *name* ɖe wò ƒe GitLab zãla ƒe ŋkɔ.

3. **Push tɔtrɔwo** ɖe wò ƒe fork dzi:
   ```sh
   git push _name_ main
   ```

4. Wɔ **Merge Request (MR)** le GitLab:
   Yi Merge Request ƒe akpa le wò ƒe GitLab fork me:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Merge Request Ƒe Mɔfiamewo**:
- **Mègawɔ rebase eye nàɖe commits ɖe ɖeka me le review me o**.
- Ne ehiã la, zã *fixup!* alo *squash!* be woaɖe commits ɖe ɖeka me le eɖokui dzi.
- Di be nà**tsɔ commits yeye akpe ɖe eŋu** ɖe bubu ƒe teƒe le review ƒe ɣeyiɣi me.

---

### **Didienu Bubuwo**:

- **Binaries Si Wotu Xoxo**: Fifia, **Arti** mena binaries si wotu xoxo le wɔnɔa me o. Ele be nàtu ƒevi la tso gɔmedze nu, abe ale si woɖe fia doŋgɔ ene.
- **Rust Ƒe Sidzedze**: Ne èle nu kpekpe ɖe Arti ŋu la, ɖo ŋku edzi be codebase la le tɔtrɔm haɖe, eye tɔtrɔ alo refactoring ate ŋu ava ne woakpe features yeye ɖe eme.

---



Ne èdi be yeanɔ project la ƒe dɔwɔwɔ me akpe ɖe eŋu la, kpɔ code la, wɔ repository la ƒe fork, eye nàtsɔ Merge Request aɖe ava. Na nyatakaka bubu, yeyewo, kple kuxiwo ƒe ɖeɖe la, kpɔ [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti). 

Nàkpɔ dzidzɔ le wò ƒe **Arti** ƒe zãzã me, eye nàwɔ hacking nyuie!

---
