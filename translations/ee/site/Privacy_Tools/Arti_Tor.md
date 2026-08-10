![Tor logo](/content-images/_unavailable.svg)

# **Arti: Dzidzime Si Gbɔna Tor Asitsalawo le Rust**
![Atri Logo](/content-images/_unavailable.svg)

**Arti** nye Tor Dɔwɔha ƒe ɖoɖo be woatu dzidzime si gbɔna ƒe **Tor** asisi to **Rust** dɔwɔɖoɖo ƒe gbegbɔgblɔ zazã me. Wotrɔ asi le Arti ŋu be wòanye modular, embeddable, eye wòanɔ klalo na ewɔwɔ, si ana **Tor** ƒe ŋkɔmaɖemaɖe ƒe ɖoɖowo ƒe dɔwɔwɔ le dedie wu eye wòwɔa dɔ nyuie wu. Le **Arti ƒe tɔtrɔ 1.4.0** me la, woto tɔtrɔ vevi geɖewo vɛ:

- **RPC ƒe ŋgɔdonya yeye** na kadodo si nyo ɖe edzi.
- Dzadzraɖodɔ na **relay support**.
- Ŋgɔyiyi le **subɔsubɔ-kpa dzi sabala subɔsubɔdɔ gbegbe-subɔsubɔ-tsitretsitsi**.

Asiɖeɖe le eŋu sia yi Tor Dɔwɔɖoɖoa ƒe agbagbadzedzewo dzi be yeana dedienɔnɔ, dɔwɔwɔ, kple modularity nyuitɔ Tor zãlawo kple dɔwɔlawo.


---


## **Arti Client ƒe ɖoɖowɔwɔ**

Wɔ ɖe afɔɖeɖe siawo dzi be nàda **Arti** ɖe wò kɔmpiuta dzi eye nàwɔe abe SOCKS teƒenɔla ene.

---

### **Afɔɖeɖe 1: Ðo Rust Development Environment**

Hafi nàteŋu atu Arti tso dzɔtsoƒe la, ele be nàna **Rust** ƒe tɔtrɔ yeyetɔ si li ke la nanɔ asiwò.

#### Be Nàde Rust:

1. Tsa le amegã la gbɔ [Rust ƒe nyatakakadzraɖoƒe](https://www.rust-lang.org/).
2. Wɔ ɖe mɔfiame siwo ku ɖe wò dɔwɔɖoɖoa ɖoɖo ŋu dzi.
3. Kpɔe ɖa be èɖoe ɖa to ewɔwɔ me:
   
   ```sh
   rustc --version
   ```

Esia aɖo kpe edzi be Rust ƒe tɔtrɔ yeyetɔ si li ke la le wò kɔmpiuta dzi.

#### **De dzesii na Windows Zãlawo**:
- Woate ŋu aɖo Rust ɖe Windows dzi to [**Dzidzedzekpɔkpɔ**](https://rustup.rs/), si nye dɔwɔnuwo ƒe kɔsɔkɔsɔ ƒe ɖoɖowɔla. Kpɔ egbɔ be yeɖo xɔtuƒe si sɔ hã (àte ŋu ahiã **Visual Studio Tu Dɔwɔnuwo** le Windows dzi).
  
---

### **Afɔɖeɖe 2: Wɔ Arti Nudzraɖoƒea ƒe nɔnɔmetata**

Be nàxɔ Arti ƒe asitsaha ƒe tɔtrɔ yeyetɔ la, ahiã be nàwɔ nudzraɖoƒea ƒe nɔnɔmetata tso [**GitLab** ƒe ƒuƒoƒo](https://gitlab.torproject.org/tpo/core/arti).

#### Afɔɖeɖewo:
1. Ʋu wò terminal (Sedede ƒe Nyabiase, PowerShell, alo Git Bash le Windows dzi).
2. Wɔ sedede si gbɔna be nàwɔ nudzraɖoƒea ƒe nɔnɔmetata:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Yi *arti* ƒe nyatakakadzraɖoƒe yeye si wowɔ la me:
   
   ```sh
   cd arti
   ```

Esia ahe Arti ƒe dzɔtsoƒe ƒe nuŋɔŋlɔa ayi wò nutoa me mɔ̃a gbɔ.

---

### **Afɔɖeɖe 3: Tu Arti Binary la**

Ne ènya wɔ nudzraɖoƒea ƒe nɔnɔmetata vɔ la, ele be nàtu Arti to **Cargo** zazã me, si nye Rust ƒe package manager kple xɔtudɔwɔnu.

#### Be Woatu Arti:
1. Le terminal la me la, wɔ sedede si gbɔna:
   ```sh
   cargo build --release
   ```

Sedede sia ƒoa Arti ƒe kɔda nu ƒu eye wòtrɔa asi le eŋu nyuie na ewɔwɔ (*--release* aflaga). Woawɔ binary la le *target/release* ƒe nuŋlɔɖi me.

#### Afisi Woƒo Binary Siwo Woƒo Ƒu Le:
- Le xɔtutu vɔ megbe la, Arti binary la anɔ: 
  ```sh
  target/release/arti
  ```

Àte ŋu awɔ binary sia tẽ tso terminal la dzi.

---

### **Afɔɖeɖe 4: Ƒu du Arti SOCKS Proxy**

Be nàzã Arti abe SOCKS teƒenɔla ene (si akplɔ wò internet ʋuɖoɖo to Tor network dzi) la, ele be nàdze proxy la gɔme.

#### Be Nàdze SOCKS ƒe Teƒenɔla la gɔme:
1. Wɔ sedede si gbɔna:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Sedede sia dze Arti gɔme abe **SOCKS5 teƒenɔla** le **ʋudzeƒe 9150**, si nye ʋɔtru gbãtɔ si Tor zãna na SOCKS ʋuɖoɖo.

---

### **Afɔɖeɖe 5: Trɔ asi le Dɔwɔɖoɖowo ŋu be woazã Arti**

Ne Arti nya le dɔ wɔm abe SOCKS teƒenɔla ene ko la, ele be nàɖo wò dɔwɔɖoɖowo be woazãe hena mɔzɔzɔ to Tor network dzi.

#### Afɔɖeɖewo:
1. Le wò dɔwɔwɔ ƒe ɖoɖowo me (e.g., web browser, terminal application), di **proxy settings**.
2. Ðo **SOCKS5 teƒenɔla** ɖe *localhost:9150* dzi.

Esia akplɔ ʋuwo katã tso wò dɔwɔɖoɖowo me to **Tor network** dzi to Arti zazã abe domenɔla ene.

---

## **Arti ƒe Ðekawɔwɔ kple Tor Network**

Nɔnɔmetata si wowɔ bɔbɔe be woatsɔ aɖe alesi Arti wɔa dɔe le ɖekawɔwɔ me kple Tor network lae nye esi:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- **Application** la doa ka kple **Arti SOCKS Proxy** to **SOCKS5** ƒe ɖoɖowɔɖi zazã me.
- Emegbe Arti ɖoa dze kple **Tor network**, kpɔa egbɔ be womeyɔ wò ʋuwo ƒe ŋkɔ o ne ele to network la me.

---

## **GitLab Nudzraɖoƒe kple Nudzɔdzɔ**

Ne èdi be yeakpe asi ɖe **Arti** ƒe ŋgɔyiyi ŋu la, àte ŋu aku nu me le kɔdasia ŋu eye nàkpe asi ɖe eŋu to **GitLab** dzi.

- **Nudzraɖoƒe ƒe Kadodo**: [Arti GitLab Nudzraɖoƒe](https://gitlab.torproject.org/tpo/core/arti)
- **Klo Repo la ƒe nɔnɔmetata**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Forking kple Nudzɔdzɔ**:
1. **Fork** nudzraɖoƒe si le GitLab (ebia GitLab akɔnta).
2. Do ƒome wò forked nudzraɖoƒea kple wò nutoa me ɖoɖo:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Tsɔ wò GitLab zãla ƒe ŋkɔ ɖɔ li *_name_*.

3. **Tu tɔtrɔwo** ɖe wò fɔkpa ŋu:
   ```sh
   git push _name_ main
   ```

4. **Wɔ Ƒoƒu Biabia (MR)** le GitLab dzi:
   Yi akpa si nye Merge Request le wò GitLab fork me:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Merge Biabia ƒe Mɔfiamewo**:
- **Mègagbugbɔ ɖoa ​​gɔmeɖoanyi kple squash commits le ŋkuléleɖenuŋu me o**.
- Ne ehiã la, zã *fixup!* alo *squash!* na auto-squashing commits.
- Taɖodzinu be **tsɔ commit yeyewo akpe ɖe eŋu** tsɔ wu be nàƒoe le totoɖeme ƒe tsatsam me.

---

### **Nya Bubuwo**:

- **Binaries siwo wotu do ŋgɔ**: Le fifia nu la, **Arti** menaa binaries siwo wotu do ŋgɔ le se nu o. Ele be nàtu asisi la tso dzɔtsoƒe abe alesi míegblɔe le etame ene.
- **Rust Knowledge**: Ne èle asi kpem ɖe Arti ŋu la, de dzesii be codebase la gale tɔtrɔm, eye tɔtrɔ alo refactoring ateŋu anɔ anyi ne wole nɔnɔme yeyewo kpem ɖe eŋu.

---



Ne èdi be yeadzɔ nu le dɔa me la, ke lé ŋku ɖe kɔdasia ŋu faa, tsɔ fork ƒo nudzraɖoƒea, eye nàtsɔ Merge Request aɖo ɖa. Ne èdi nyatakaka bubuwo, yeyewo, kple kuxiwo gbɔ kpɔkpɔ la, kpɔ... [Arti GitLab Nudzraɖoƒe](https://gitlab.torproject.org/tpo/core/arti). 

Se vivi na wò nuteƒekpɔkpɔ le **Arti** kple dzidzɔ hacking!

--- 
