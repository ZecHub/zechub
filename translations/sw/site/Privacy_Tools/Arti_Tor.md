![Tor logo](/content-images/_unavailable.svg)

# **Arti: Kizazi kijacho Tor mteja katika kutu**
![Atri Logo](/content-images/_unavailable.svg)

**Arti** is the Tor Project's initiative to build a next-generation **Tor** client using the **Rust** programming language. Arti is designed to be modular, embeddable, and production-ready, providing a more secure and efficient implementation of the **Tor** anonymity protocols. With **Arti version 1.4.0**, several significant updates have been introduced:

- ** interface mpya RPC** kwa kuimarishwa mwingiliano.
- Kazi ya maandalizi kwa ajili ** msaada relay**.
- Maboresho katika ** huduma-upande vitunguu huduma ya kukataa upinzani wa huduma**.

Hii kutolewa inaendelea juhudi Tor Project ya kutoa usalama bora, utendaji na modularity kwa watumiaji wa Tor na watengenezaji.


---


## ** Ufungaji wa Arti Mteja**

Fuata hatua hizi kufunga na kukimbia ** Arti ** kama wakala SOCKS kwenye mfumo wako.

---

### ** Hatua 1: Kuanzisha mazingira ya maendeleo kutu**

Kabla ya unaweza kujenga Arti kutoka chanzo, unahitaji kuwa na latest imara toleo la **Rust** imewekwa.

#### Kuweka kutu:

1. Tembelea rasmi [Rust tovuti](https://www.rust-lang.org/).
2. Fuata maelekezo ya usakinishaji kwa ajili ya mfumo wako wa uendeshaji.
3. Angalia ufungaji kwa kuendesha:
   
   ```sh
   rustc --version
   ```

Hii kuthibitisha kwamba una latest imara toleo la Rust imewekwa kwenye mfumo wako.

#### ** Kumbuka kwa watumiaji wa Windows**:
- Kutu inaweza kuwa imewekwa kwenye Windows kupitia [**Rustup**](https://rustup.rs/), toolchain installer. Hakikisha kwamba wewe pia kuweka mazingira ya kujenga sambamba (unaweza haja ** Visual Studio Build Tools** juu ya Windows).
  
---

### ** Hatua ya 2: Clone Arti Repository**

Ili kupata toleo la karibuni wa mteja Arti, unahitaji clone hazina kutoka [** GitLab **]](https://gitlab.torproject.org/tpo/core/arti).

#### Hatua:
1. Fungua terminal yako (Command Prompt, PowerShell, au Git Bash kwenye Windows).
2. Endesha amri ifuatayo kuiunganisha hifadhi: @ info / plainbox
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Nenda kwenye orodha *arti* iliyoundwa hivi karibuni:
   
   ```sh
   cd arti
   ```

Hii itavuta chanzo cha kanuni ya Arti kwa mashine yako ndani.

---

### Hatua ya 3: Kujenga Binary Artificial **

Mara baada ya cloned hazina, unahitaji kujenga Arti kutumia ** Cargo**, ambayo ni Rust's mfuko meneja na zana jengo.

#### Kujenga Arti:
1. Katika terminal, kukimbia amri ifuatayo:
   ```sh
   cargo build --release
   ```

Amri hii compiles Arti code na optimizes ni kwa ajili ya uzalishaji (kuachiliwa * bendera). binary itakuwa kuundwa katika orodha * lengo / kutolewa *.

#### Mahali ya Binary Compiled:
- Baada ya ujenzi, Arti binary itakuwa iko katika: 
  ```sh
  target/release/arti
  ```

Unaweza kuendesha hii binary moja kwa moja kutoka terminal.

---

### ** Hatua 4: Run Arti SOCKS Proxy**

Kutumia Arti kama wakala wa SOCKS (ambayo itaelekeza trafiki yako ya mtandao kupitia mtandao wa Tor), unahitaji kuanza wakala.

#### Kuanza SOCKS Proxy:
1. Tumia amri ifuatayo:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Amri hii huanza Arti kama ** SOCKS5 wakala** juu ya *** bandari 9150**, ambayo ni default bandari kutumika na Tor kwa trafiki SOCGS.

---

### ** Hatua 5: Configure Maombi ya kutumia Arti**

Mara Arti ni mbio kama wakala SOCKS, unahitaji kusanidi programu yako kwa kuitumia kwa trafiki routing kupitia mtandao Tor.

#### Hatua:
1. Katika mipangilio ya programu yako (kwa mfano, kivinjari cha wavuti, maombi terminal), tafuta **mipangilio wakala**.
2. Kuweka ** SOCKS5 wakala** kwa * mwenyeji wa ndani: 9150 *.

Hii itakuwa njia trafiki yote kutoka maombi yako kwa njia ya ** mtandao wa Tor** kutumia Arti kama mpatanishi.

---

## **Arti Ushirikiano na Mtandao wa Tor**

Hapa ni mchoro rahisi kuonyesha jinsi Arti kazi kwa kushirikiana na mtandao Tor:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- ** Programu ya** unajumuisha na ** Arti SOCKS Proxy ** kutumia itifaki ya ** SOCCS5 **.
- Arti kisha kuwasiliana na ** mtandao wa Tor, kuhakikisha kwamba trafiki yako ni anonymized kama inapita kupitia mtandao.

---

## ** GitLab Repository na Mchango**

Kama una nia ya kuchangia katika maendeleo ya Arti, unaweza kugundua kanuni na kuchangie kupitia GitLab.

- ** Kiungo cha Hifadhi**: [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti)
- **Kupanga Repo**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### ** Kugawanyika na kuchangia**:
1. ** Fork** hazina juu ya GitLab (inahitaji akaunti ya Gitlab).
2. Kuunganisha hazina yako forked kwa kuanzisha wako wa ndani:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Badilisha *_name_* na jina lako la mtumiaji GitLab.

3. **Push mabadiliko** kwa uma wako:
   ```sh
   git push _name_ main
   ```

4. ** Kuunda Ombi la Uunganisho (MR)** kwenye GitLab:
   Nenda kwenye sehemu ya Maombi ya Kuunganisha katika uma wako wa GitLab:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Mwongozo wa Maombi ya Kuunganisha**:
- ** Je, si rebase na squash commits wakati wa mapitio**.
- Kama ni lazima, kutumia * fixup!* au * squash! kwa ajili ya auto-squashing commits.
- Lengo la ** kuongeza ahadi mpya** badala ya squashing wakati wa mzunguko ukaguzi.

---

### **Maelezo ya ziada**:

- ** Pre-kujengwa Binaries**: Kama ya sasa, Arti haina kutoa rasmi pre-kujenga binary. Lazima kujenga mteja kutoka chanzo kama ilivyoelezwa hapo juu.
- **Rust Maarifa**: Kama wewe ni kuchangia Arti, kumbuka kwamba codebase bado inakuwa, na kunaweza kuwa mabadiliko au refactoring kama makala mpya zinaongezwa.

---



Kama una nia ya kuchangia mradi, jisikie huru kuangalia nje code, gable hazina, na kuwasilisha ombi la kuunganisha. Kwa habari zaidi, updates, na utatuzi wa matatizo, rejea [Arti GitLab Repository]](https://gitlab.torproject.org/tpo/core/arti). 

Kufurahia uzoefu wako na Arti na hacking furaha!

--- 
