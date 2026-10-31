![Tor logo](/content-images/_unavailable.svg)

# **Arti: Mteja [Client] wa Tor wa Kizazi Kijacho katika Rust**
![Atri Logo](/content-images/_unavailable.svg)

**Arti** ni mpango wa Mradi wa Tor wa kujenga mteja wa **Tor** wa kizazi kijacho kwa kutumia lugha ya programu ya **Rust**. Arti imeundwa kuwa ya sehemu mbalimbali, inayoweza kupachikwa, na tayari kwa matumizi ya uzalishaji, ikitoa utekelezaji salama zaidi na wenye ufanisi wa itifaki za kutofichua utambulisho za **Tor**. Kwa **toleo la Arti 1.4.0**, masasisho kadhaa muhimu yameanzishwa:

- **Kiolesura kipya cha RPC** kwa ajili ya mwingiliano ulioboreshwa.
- Kazi za maandalizi kwa ajili ya **usaidizi wa relay**.
- Maboresho katika **ustahimilivu wa upande wa huduma wa onion service dhidi ya kunyimwa huduma**.

Toleo hili linaendeleza juhudi za Mradi wa Tor za kutoa usalama, utendaji, na uwezo wa ugawaji wa sehemu bora zaidi kwa watumiaji na wasanidi programu wa Tor.


---


## **Usakinishaji wa Mteja wa Arti**

Fuata hatua hizi ili kusakinisha na kuendesha **Arti** kama proksi ya SOCKS kwenye mfumo wako.

---

### **Hatua ya 1: Sanidi Mazingira ya Uundaji wa Programu ya Rust**

Kabla ya kujenga Arti kutoka kwenye msimbo chanzi, unahitaji kuwa na toleo thabiti la hivi karibuni la **Rust** lililosakinishwa.

#### Ili Kusakinisha Rust:

1. Tembelea tovuti rasmi ya [Rust](https://www.rust-lang.org/).
2. Fuata maagizo ya usakinishaji kwa mfumo wako wa uendeshaji.
3. Thibitisha usakinishaji kwa kuendesha:
   
   ```sh
   rustc --version
   ```

Hii itathibitisha kuwa una toleo thabiti la hivi karibuni la Rust lililosakinishwa kwenye mfumo wako.

#### **Dokezo [Note] kwa Watumiaji wa Windows**:
- Rust inaweza kusakinishwa kwenye Windows kupitia [**rustup**](https://rustup.rs/), kisakinishi cha msururu wa vifaa. Hakikisha pia umesanidi mazingira ya uundaji yanayooana (huenda ukahitaji **Visual Studio Build Tools** kwenye Windows).
  
---

### **Hatua ya 2: Nakili Hazina ya Arti**

Ili kupata toleo la hivi karibuni la mteja wa Arti, utahitaji kunakili hazina kutoka [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Hatua:
1. Fungua terminali yako (Command Prompt, PowerShell, au Git Bash kwenye Windows).
2. Endesha amri ifuatayo ili kunakili hazina:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Nenda kwenye saraka mpya ya *arti*:
   
   ```sh
   cd arti
   ```

Hii itavuta msimbo chanzi wa Arti kwenye mashine yako ya ndani.

---

### **Hatua ya 3: Jenga Faili la Binary la Arti**

Baada ya kunakili hazina, unahitaji kujenga Arti kwa kutumia **Cargo**, ambayo ni msimamizi wa vifurushi na kifaa [tool] cha uundaji cha Rust.

#### Ili Kujenga Arti:
1. Kwenye terminali, endesha amri ifuatayo:
   ```sh
   cargo build --release
   ```

Amri hii hukusanya msimbo wa Arti na kuuboreshia matumizi ya uzalishaji (alama ya *--release*). Faili la binary litaundwa kwenye saraka ya *target/release*.

#### Mahali pa Faili la Binary Lililokusanywa:
- Baada ya kujenga, faili la binary la Arti litapatikana katika:  
  ```sh
  target/release/arti
  ```

Unaweza kuendesha faili hili la binary moja kwa moja kutoka kwenye terminali.

---

### **Hatua ya 4: Endesha Proksi ya Arti SOCKS**

Ili kutumia Arti kama proksi ya SOCKS (ambayo itaelekeza trafiki yako ya intaneti kupitia mtandao wa Tor), unahitaji kuanzisha proksi.

#### Ili Kuanzisha Proksi ya SOCKS:
1. Endesha amri ifuatayo:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Amri hii huanzisha Arti kama **proksi ya SOCKS5** kwenye **bandari 9150**, ambayo ndiyo bandari chaguomsingi inayotumiwa na Tor kwa trafiki ya SOCKS.

---

### **Hatua ya 5: Sanidi Programu Tumiaji ili Zitumia Arti**

Mara Arti inapokuwa inaendesha kama proksi ya SOCKS, unahitaji kusanidi programu zako zitumie proksi hiyo kuelekeza trafiki kupitia mtandao wa Tor.

#### Hatua:
1. Katika mipangilio ya programu yako (kwa mfano, kivinjari cha wavuti, programu ya terminali), tafuta **mipangilio ya proksi**.
2. Weka **proksi ya SOCKS5** kuwa *localhost:9150*.

Hii itaelekeza trafiki yote kutoka kwenye programu zako kupitia **mtandao wa Tor** kwa kutumia Arti kama kiunganishi.

---

## **Ujumuishaji wa Arti na Mtandao wa Tor**

Huu hapa mchoro uliorahisishwa unaoonyesha jinsi Arti inavyofanya kazi pamoja na mtandao wa Tor:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- **Programu Tumiaji** huunganishwa na **Proksi ya Arti SOCKS** kwa kutumia itifaki ya **SOCKS5**.
- Kisha Arti huwasiliana na **mtandao wa Tor**, ikihakikisha kuwa trafiki yako haifichui utambulisho inapopita kwenye mtandao.

---

## **Hazina ya GitLab na Uchangiaji**

Ikiwa una nia ya kuchangia maendeleo ya **Arti**, unaweza kuchunguza msimbo na kuchangia kupitia **GitLab**.

- **Kiungo cha Hazina**: [Hazina ya Arti GitLab](https://gitlab.torproject.org/tpo/core/arti)
- **Nakili Hazina**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Kutengeneza Fork na Kuchangia**:
1. **Tengeneza Fork** ya hazina kwenye GitLab (inahitaji akaunti ya GitLab).
2. Unganisha hazina yako iliyotengenezwa fork na usanidi wako wa ndani:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Badilisha *_name_* kwa jina lako la mtumiaji la GitLab.

3. **Tuma mabadiliko** kwenye fork yako:
   ```sh
   git push _name_ main
   ```

4. **Unda Ombi la Kuunganisha (MR)** kwenye GitLab:
   Nenda kwenye sehemu ya Ombi la Kuunganisha katika fork yako ya GitLab:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Miongozo ya Ombi la Kuunganisha**:
- **Usifanye rebase na squash commits wakati wa ukaguzi**.
- Ikiwa ni lazima, tumia *fixup!* au *squash!* kwa ajili ya kuunganisha commits kiotomatiki.
- Lenga **kuongeza commits mpya** badala ya kuzifanyia squash wakati wa mzunguko wa ukaguzi.

---

### **Madokezo ya Ziada**:

- **Faili za Binary Zilizojengwa Tayari**: Kwa sasa, **Arti** haitoi faili rasmi za binary zilizojengwa tayari. Lazima ujenge mteja kutoka kwenye msimbo chanzi kama ilivyoelezwa hapo juu.
- **Maarifa ya Rust**: Ikiwa unachangia Arti, tambua kuwa msimbo msingi bado unaendelea kubadilika, na huenda kukawa na mabadiliko au urekebishaji wa muundo kadiri vipengele vipya vinavyoongezwa.

---



Ikiwa una nia ya kuchangia mradi huu, jisikie huru kuangalia msimbo, kutengeneza fork ya hazina, na kuwasilisha Ombi la Kuunganisha. Kwa maelezo zaidi, masasisho, na utatuzi wa matatizo, rejelea [Hazina ya Arti GitLab](https://gitlab.torproject.org/tpo/core/arti). 

Ufurahie uzoefu wako na **Arti** na uandishi mwema wa msimbo!

---
