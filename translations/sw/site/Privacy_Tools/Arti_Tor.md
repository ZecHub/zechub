[Logo ya Tor](https://gitlab.torproject.org/uploads/-/system/appearance/header_logo/1/purple.svg)

# **Arti: Kizazi kijacho Tor mteja katika kutu**
[Atri Logo](https://gitlab.torproject.org/uploads/-/system/project/avatar/647/sliced-onions.png)

**Arti** is the Tor Project's initiative to build a next-generation **Tor** client using the **Rust** programming language. Arti is designed to be modular, embeddable, and production-ready, providing a more secure and efficient implementation of the **Tor** anonymity protocols. With **Arti version 1.4.0**, several significant updates have been introduced:

- A ** mpya RPC interface ** kwa kuimarishwa mwingiliano.
- Kazi ya maandalizi kwa ajili ya ** msaada relay **.
- Maboresho katika ** huduma-upande vitunguu huduma ya kukataa-ya-huduma upinzani **.

Hii kutolewa inaendelea juhudi Tor Mradi wa kutoa usalama bora, utendaji, na modularity kwa watumiaji Tor na watengenezaji.


---


## ** Ufungaji wa Arti Mteja **

Fuata hatua hizi kufunga na kukimbia ** Arti ** kama wakala SOCKS kwenye mfumo wako.

---

### ** Hatua ya 1: Kuanzisha mazingira ya maendeleo Rust **

Kabla ya unaweza kujenga Arti kutoka chanzo, unahitaji kuwa na latest imara toleo la **Rust** imewekwa.

#### Kuweka kutu:

1. Tembelea rasmi [Rust tovuti](https://www.rust-lang.org/).
2. Fuata maelekezo ya usakinishaji kwa ajili ya mfumo wako wa uendeshaji.
3. Kuthibitisha ufungaji kwa kuendesha:
   
   ```sh
   rustc --version
   ```

Hii kuthibitisha kwamba una latest imara toleo la Rust imewekwa kwenye mfumo wako.

#### ** Kumbuka kwa watumiaji wa Windows **:
- Kutu inaweza kuwa imewekwa kwenye Windows kupitia [**Rustup**](https://rustup.rs/), toolchain installer. Kuhakikisha kwamba wewe pia kuanzisha mazingira kujenga sambamba (unaweza haja ** Visual Studio Build Tools ** juu ya Windows).
  
---

### ** Hatua ya 2: Clone Arti Repository **

Ili kupata toleo la karibuni la mteja Arti, unahitaji clone hazina kutoka [** GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Hatua:
1. Fungua terminal yako (Command Prompt, PowerShell, au Git Bash kwenye Windows).
2. Endesha amri ifuatayo kuiunganisha kumbukumbu:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Nenda kwenye orodha *arti* iliyoundwa hivi karibuni:
   
   ```sh
   cd arti
   ```

Hii itakuwa kuvuta chanzo code ya Arti kwa mashine yako ya ndani.

---

### ** Hatua ya 3: Kujenga Arti Binary **

Mara baada ya cloned hazina, unahitaji kujenga Arti kutumia ** Cargo **, ambayo ni Rust ya mfuko meneja na kujenga chombo.

#### Kujenga Arti:
1. Katika terminal, kukimbia amri ifuatayo:
   ```sh
   cargo build --release
   ```

Amri hii compiles Arti code na optimizes ni kwa ajili ya uzalishaji (ya *--release* bendera). binary itakuwa kuundwa katika * lengo / kutolewa * directory.

#### Mahali ya Binary Compiled:
- Baada ya ujenzi, Arti binary itakuwa iko katika: 
  ```sh
  target/release/arti
  ```

Unaweza kuendesha hii binary moja kwa moja kutoka terminal.

---

### ** Hatua ya 4: Run Arti SOCKS Proxy **

Kutumia Arti kama wakala wa SOCKS (ambayo itaelekeza trafiki yako ya mtandao kupitia mtandao wa Tor), unahitaji kuanza wakala.

#### Kuanza SOCKS Proxy:
1. Tumia amri ifuatayo:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Amri hii huanza Arti kama ** SOCKS5 wakala ** juu ya ** bandari 9150 **, ambayo ni bandari default kutumika na Tor kwa SOCGS trafiki.

---

### ** Hatua 5: Configure Maombi ya kutumia Arti **

Mara Arti ni mbio kama wakala SOCKS, unahitaji kusanidi maombi yako kuitumia kwa trafiki routing kupitia mtandao Tor.

#### Hatua:
1. Katika mipangilio yako ya maombi (kwa mfano, kivinjari cha wavuti, programu ya terminal), tafuta **mipangilio ya wakala**.
2. Kuweka ** SOCKS5 wakala ** kwa * localhost: 9150 *.

Hii itaelekeza trafiki yote kutoka maombi yako kupitia ** mtandao wa Tor ** kutumia Arti kama mpatanishi.

---

## **Arti Ushirikiano na Mtandao wa Tor**

Hapa ni mchoro rahisi kuelezea jinsi Arti kazi kwa kushirikiana na mtandao Tor:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- ** Programu ya ** inaunganisha kwa ** Arti SOCKS Proxy ** kutumia ** SOCCS5 ** itifaki.
- Arti kisha kuwasiliana na ** mtandao wa Tor **, kuhakikisha kwamba trafiki yako ni anonymized kama inapita kwa njia ya mtandao.

---

## ** GitLab Repository na Mchango**

Kama wewe ni nia ya kuchangia katika maendeleo ya Arti, unaweza kuchunguza kanuni na kuchanga kupitia GitLab.

- ** Kiungo cha Hifadhi**: [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti)
- **Kupanga Repo**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### ** Forking na kuchangia **:
1. **Fork** hazina juu ya GitLab (inahitaji akaunti ya Gitlab).
2. Kuunganisha hazina yako forked kwa kuanzisha yako ya ndani:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Badilisha *_name_* na jina lako la mtumiaji wa GitLab.

3. **Push mabadiliko** kwa uma wako:
   ```sh
   git push _name_ main
   ```

4. **Kuunda Ombi la Kuunganisha (MR) ** kwenye GitLab:
   Nenda kwenye sehemu ya Ombi la Kuunganisha katika uma wako wa GitLab:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Mwongozo wa Maombi ya Kuunganisha**:
- ** Je, si rebase na squash commits wakati wa mapitio **.
- Kama ni lazima, tumia *fixup!* au *squash!* kwa auto-squashing commits.
- Lengo la ** kuongeza ahadi mpya ** badala ya squashing wakati wa mzunguko wa ukaguzi.

---

### **Maelezo ya ziada**:

- **Pre-kujengwa Binaries**: Kama ya sasa, **Arti** haina kutoa rasmi kabla ya kujengwa binaries. Lazima kujenga mteja kutoka chanzo kama ilivyoelezwa hapo juu.
- ** Rust Maarifa **: Kama wewe ni kuchangia Arti, kumbuka kwamba codebase bado ni kuendeleza, na kunaweza kuwa na mabadiliko au refactoring kama makala mpya ni aliongeza.

---



Kama wewe ni nia ya kuchangia mradi, jisikie huru kuangalia nje ya kanuni, pembejeo hazina, na kuwasilisha ombi la kuunganisha. Kwa habari zaidi, updates, na matatizo, rejea [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti). 

Kufurahia uzoefu wako na Arti na hacking furaha!

--- 
