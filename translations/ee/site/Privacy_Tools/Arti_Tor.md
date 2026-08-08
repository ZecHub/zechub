![Tor logo](/content-images/_unavailable.svg)

# Artie: Xexeme Yeyea ƒe Tor Client le Rust me.
![Atri Logo](/content-images/_unavailable.svg)

Arti nye TOR Project ƒe ɖoɖo be yewoatu dzidzime yeyea me Tor client le mɔ̃ɖaŋununya si woyɔna be Rust dzi. Ewɔ Arti wònye modular, embeddable kple production-ready eye wòna wotrɔ asi le eƒe ŋkɔwo ŋu nyuie wu to ameŋkumenuɖoɖo siwo zãm wole la zazã me. Le ARTI version 1.4.0 nu la wowɔ tɔtrɔ vevi aɖewo:

- Aƒekpo yeye aɖe si wotsɔna ŋlɔa agbalẽwo kple wo nɔewo be wòana kadodo nanɔ ame eve dome.
- Dzadzraɖo ɖe kpekpeɖeŋunana ame bubuwo ŋu.
- Wole agbagba dzem le **ɖaseɖiɖi ɖe mɔxeɖeanyi ƒe dɔwɔwɔ ŋu** me.

Agbalẽ sia yi edzi le Tor Project ƒe agbagbadzedzewo dzi be yeana dedienɔnɔ, dɔwɔwɔ kple modularity nyuie wu na amesiwo zãa Tor kpakple ewɔla.


---


## ** Arti Client ƒe Ðoɖowɔƒe**

Wɔ afɔɖeɖe siawo nàtsɔ aɖo **Arti** anyi eye nàwɔe abe SOCKS ƒe amedɔdɔ ene le wò kɔmpiuta dzi.

---

### **Mɔɖeɖe 1: Ðo Dzĩ ƒe Nɔnɔmewo Ði**

Hafi nàte ŋu awɔ Arti tso eƒe dzɔtsoƒe la, ele be nàɖo **Rust** ƒe gɔmeɖeɖe si li fifia.

#### Ne Èdi Be Yeatsɔ Rust Aɖo:

1. Yi [Rust ƒe nyatakakadzraɖoƒe] si le dukɔa me la dzi.](https://www.rust-lang.org/).
2. Wɔ ɖe ɖoɖo si dzi wowɔ ɖo be nàtsɔ ada dɔwɔnua la nu.
3. Kpɔe ɖa be ɖe wòle eme hã to:
   
   ```sh
   rustc --version
   ```

Esia ana nàkpɔe be Rust ƒe gɔmeɖeɖe si li fifia ye le asiwò.

#### ** Nuxlɔ̃ame na Windows Users**:
- Woate ŋu ada Rust ɖe Windows dzi to [**Rustup**] me.](https://rustup.rs/), toolchain installer. Kpɔ egbɔ be nèɖo ɖoɖowɔƒe si sɔ hã (anya hiã **Visual Studio Build Tools** le Windows dzi).
  
---

### ** Afɔɖeɖe 2: Wɔ Arti-Aɖakaa ƒe Kɔpi**

Be nàkpɔ Arti client ƒe version yeyea la, ele be nàwɔ eƒe nuɖugba tso GitLab me.](https://gitlab.torproject.org/tpo/core/arti).

#### Afɔɖeɖewo:
1. Ʋu wò terminal (Command Prompt, PowerShell, alo Git Bash le Windows).
2. Zã nufiafiã si gbɔna nàtsɔ atrɔ asi le nudzraɖoƒe ŋu:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Yi *arti* dɔdzesi yeye si nèwɔ la me:
   
   ```sh
   cd arti
   ```

Esia ana nàɖe Arti ƒe asitelefon la me nyawo gɔme.

---

### ** Afɔɖeɖe 3: Wɔ Ameŋunyatakakawo Ƒe Kɔmpiuta**

Ne èwɔ nuŋɔŋlɔdzraɖoƒea ƒe kɔpi vɔ la, ele be nàzã Cargo atsɔ atu Arti si nye Rust's package manager kple build tool.

#### Be Nàtu Atikewɔwɔ:
1. Le terminal la me, wɔ dɔdeasi si gbɔna:
   ```sh
   cargo build --release
   ```

Se sia ƒoa Arti ƒe kɔd la nu ƒu eye wònana wòwɔa dɔ nyuie wu (nu si woyɔna be *--release* flag). Woawɔ binary le agbalẽdzraɖoƒe si nye *target/release*.

#### Binary si me woƒo nu le ƒe nɔƒe:
- Ne wowu xɔtuɖoɖoa nu vɔ la, teƒe si Arti ƒe ɣletivi eveawo anɔ lae nye: 
  ```sh
  target/release/arti
  ```

Àte ŋu azã nuŋɔŋlɔ sia tso terminal la dzi tẽe.

---

### ** Afɔɖeɖe 4: Zã Arti SOCKS ƒe Ameƒomegbɔla**

Be nàzã Arti abe SOCKS ƒe amedɔdɔ (si ana internet-ʋuwo naɖo to Tor network dzi) ene la, ele be nàwɔ ameŋɔŋlɔdzesi si le edzi.

#### Be nàdze SOCKS ƒe Ametakpɔla gɔme:
1. Zã dɔdeasi si gbɔna:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Se sia dze Arti gɔme abe **SOCKS5 ƒe amedɔdɔ** le port 9150 dzi, si nye default port si Tor zãna na SOCKS traffic.

---

### ** Afɔɖeɖe 5: Ðoɖo Woƒe Dɔwɔgbalẽviwo Be Woazã Arti**

Ne Arti le dɔ wɔm abe SOCKS ƒe amedɔdɔ ene ko la, ele be nàɖo wò dɔwɔnuwo woazã nɛ atsɔ ato Tor-kadodoa me ayi.

#### Afɔɖeɖewo:
1. Le wò app setting (le kpɔɖeŋu me, internet browser, terminal application) me la di ** proxy settings**.
2. Ðo SOCKS5 ƒe amedɔdɔ ɖe *localhost:9150*.

Esia ana be wò mɔzɔzĩwo katã ato *Tor-kadodoa* dzi eye Arti anye domenɔla.

---

## **Arti ƒe ɖekawɔwɔ kple Tor Network**

Kpɔ nɔnɔmetata si me woɖe alesi Arti wɔa dɔ kple Tor-hadzraɖoƒea le la ɖa:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- **Awɔmɔnu** la ƒoa ka kple Arti SOCKS Proxy* to mɔ̃ɖoɖo si nye **SOCKS5** dzi.
- Arti ƒoa nu kple *Tor network* la, eye wònana be ame aɖeke menya afisi nèle o.

---

## **GitLab ƒe Nudzraɖoƒe kple Akpekpeɖeŋu**

Ne èdi be yeakpe asi ɖe Arti ƒe ŋgɔyiyi ŋu la, àte ŋu adzro eƒe kɔdzenu me eye nàna kpekpeɖeŋu to GitLab dzi.

- **Adzraɖoƒe ƒe kadodo**: [Arti GitLab Dzraɖoƒea](https://gitlab.torproject.org/tpo/core/arti)
- **Tsɔ Ŋgɔdonyawo Wɔ Nuviwoe**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### ** Kpekpeɖeŋu kple Akɔfafa:**
1. **Fork** la le GitLab (ehiãna be woaɖo GitLab account).
2. Do wò gaxɔ si me nudzraɖoƒe le ɖe wo nɔƒe ƒe ɖoɖowɔɖi ŋu:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Tsɔ wò GitLab ŋkɔ ɖɔli *_name_*.

3. **Tsɔ tɔtrɔwo ɖo ɖe wò gavi me:**
   ```sh
   git push _name_ main
   ```

4. **Tsɔ Ƒoƒomɔ̃ (MR) ɖo anyi le GitLab:
   Yi ɖe Akɔdzedze Biabia ƒe akpa le wò GitLab ʋe me:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Mɔfiamewo le Nuteƒeteƒewo ƒe Ðekawɔwɔ Biabia ŋu**:
- ** Mègawɔ asitɔtrɔ le ɖoɖo si nèɖo la ŋu alo atrɔ asi le eŋu ne èle eme dzrom o**.
- Ne ehiã la, zã *fixup!* alo *squash!* na auto-squashing commitwo.
- Taɖodzinu si nye be **woaƒo asi ɖe agba yeyeawo dzi** tsɔ wu be woagbãe le tɔtrɔwɔɣi la me.

---

### **Nɔnɔme Bubuwo**:

- **Binaries siwo wodzra ɖo ɖi**: Fifia la, Arti meɖoa binary siwo wowɔ do ŋgɔ na wo zazã ƒe ɖoɖowo o. Ele be nàdzra client-a tso source dzi abe alesi míeɖe eme le etame ene.
- ** Rust Knowledge**: Ne èle asi kpem ɖe Arti ŋu la, de dzesii be nuŋɔŋlɔdzesiwo le tɔtrɔm kokoko eye tɔtrɔ alo nuwo ƒe ɖoɖowɔwɔ ateŋu ava ne wotsɔ nɔnɔme yeyewo kpee.

---



Ne èdi be yeakpe asi ɖe dɔa ŋu la, àteŋu akpɔ eƒe kɔdzia ɖa ahaƒo nu tso eŋu le afi si míedzra wo ɖo ɖi na wò. [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti). 

Miwɔ nu siwo katã miate ŋui be miaɖu agbe kple Arti eye mianɔ dzidzɔ kpɔm le hacking me!

--- 
