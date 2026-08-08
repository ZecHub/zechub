![Tor logo](/content-images/_unavailable.svg)

# Arti: Ẹ̀rọ-ìgbésí ayé Tor ti ìran tó ń bọ́ nínú Rust**
![Atri Logo](/content-images/_unavailable.svg)

**Arti** jẹ́ ìgbésẹ̀ Àkànṣe Tor láti kọ ìran tó ń bọ̀ wá di onígbàwòkò tí ó nlo èdè ètò Rust. Arti ni a ṣe kí o lè máa lo, kó sì wà ní sẹpín-sílẹ̀ fún ṣíṣe iṣẹ́ jáde, èyí ti yóò pèsè àtúnse àti òpò ìlò àwọn ìlànà àìdánimọ̀ Tórì.* Pẹlu Arti version 1.4.0**, ọpọ awọn imudojuiwọn pataki ni wọ́n ṣafihan:

- Àwòrán ìjápọ̀ RPC tuntun kan fún ìbálòpọ̀ tí ó dára sí i.
- Iṣẹ́ ìmúrasílẹ̀ fún àtìlẹ́yìn rélà.
- Awọn ilọsiwaju ninu ** iṣẹ-ọna onion service denial of service resistance**.

Ìmújáde yìí ń tẹ̀síwájú ìsapá Tor Project láti pèsè ààbò, iṣẹ́-ṣiṣe àti modularity tó dára fún àwọn olùlo Tor àtàwọn onímọ̀.


---


## **Ìfi sori ẹrọ ti awọn Arti Onibara**

Tẹle awọn igbesẹ wọnyi lati fi sori ẹrọ ati ṣiṣe **Arti** bi aṣoju SOCKS lori eto rẹ.

---

### **Igbesẹ 1: Ṣeto Ayika Idagbasoke Iṣelọpọ**

Ṣaaju ki o to le kọ Arti lati orisun, o nilo lati ni ẹya iduroṣinṣin tuntun ti **Rust** sori ẹrọ.

#### Lati Fi Rust sori ẹrọ:

1. Lọ sí ojú-ìwé Rust [Ojú-ìkànnì](https://www.rust-lang.org/).
2. Tẹle awọn itọnisọna fifi sori ẹrọ fun eto iṣiṣẹ rẹ.
3. Ṣayẹwo fifi sori ẹrọ nipa ṣiṣe:
   
   ```sh
   rustc --version
   ```

Èyí yóò jẹ́ ìdánilójú wípé o ní àtúnṣe tuntun ti Rust tí ó wà lórí ẹ̀rọ rẹ.

#### **Àkíyèsí fún Àwọn Olùṣàmúlò Windows**:
- Rust le fi sori ẹrọ lori Windows nipasẹ [**Rustup**](https://rustup.rs/), ohun toolchain installer. Rii daju wipe o ti tun ṣeto soke a ibaramu kọ ayika (o le nilo ** Visual Studio Kọ irinṣẹ** on Windows).
  
---

### **Igbesẹ 2: Ṣàtúnṣe Ibi-ipamọ Arti**

Lati gba ẹya tuntun ti alabara Arti, o nilo lati ṣe ẹda ibi ipamọ naa lati [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Àwọn ìgbésẹ̀:
1. Ṣii ebute rẹ (Iṣẹ-ìmọ̀, PowerShell, tabi Git Bash lori Windows).
2. Ṣiṣẹ aṣẹ yii lati ṣe ẹda ibi ipamọ:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Yíyára lọ sí àdàkọ *arti* tí a ṣẹ̀ṣẹ̀ dá:
   
   ```sh
   cd arti
   ```

Èyí yóò mú kókó orísun Arti wá sí ẹ̀rọ rẹ.

---

### Ìgbésẹ̀ 3: Ṣíṣe Ẹlẹ́yà Ọkàn-méjì Àdáni.

Lọgan ti o ba ṣe ẹda ibi ipamọ, iwọ nilo lati kọ Arti nipa lilo ** Cargo **, eyiti o jẹ oluṣakoso package Rust ati ọpa ikole.

#### Láti Ṣẹ̀dá Ẹrọ:
1. Ninu ebute, ṣe igbesẹ aṣẹ yii:
   ```sh
   cargo build --release
   ```

Àṣẹ yìí ń ṣe àkójọpọ̀ àdàkọ Arti tí ó sì máa mú un dára fún ìmújáde (ìdìpò *--release*). Ẹlẹ́ẹ̀mejì náà yóò di èyí tó wà nínú ìwé-atójútó *target/release*.

#### Àdúgbò ti ìdìpò̀ méjì:
- Lẹ́yìn tí wọ́n bá ti kọ ilé náà tán, ibi tí ẹ̀rọ-ìmọye ìsọfúnni Arti yóò wà nìyí: 
  ```sh
  target/release/arti
  ```

O le ṣe àtúnṣe ìtòlẹ́sẹẹsẹ yìí láti orí òpó.

---

### **Igbesẹ 4: Ṣiṣẹ́ Àjọṣe Ẹ̀rọ Arti SOCKS**

Lati lo Arti gẹgẹ bi aṣoju SOCKS (eyiti yoo ṣe ọna ijabọ intanẹẹti rẹ nipasẹ nẹtiwọọki Tor), o nilo lati bẹrẹ aṣoju naa.

#### Lati Bẹrẹ Àgbàlá SOCKS:
1. Ṣiṣẹ aṣẹ yii:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Àṣẹ yìí ń bẹ̀rẹ̀ Arti gẹ́gẹ́ bíi aṣojú SOCKS5 lórí èbúté 9150 èyí tí ó jẹ ẹ̀rọ ìkọjá-ìmọ̀ ti Tor nlo fún ìrìnàjò SOCGS.

---

### **Igbese 5: Ṣeto Awọn ohun elo lati Lo Arti**

Lọgan ti Arti ba n ṣiṣẹ bi aṣoju SOCKS, o nilo lati tunto awọn ohun elo rẹ lati lo fun lilọ kiri ijabọ nipasẹ nẹtiwọọki Tor.

#### Àwọn ìgbésẹ̀:
1. Ninu awọn eto ohun elo rẹ (fun apẹẹrẹ, aṣàwákiri wẹẹbu, ohun elo ebute), wa fun **awọn iṣeto proxy**.
2. Ṣeto aṣojú SOCKS5 sí *localhost:9150*.

Eyi yoo ṣalaye gbogbo ijabọ lati awọn ohun elo rẹ nipasẹ ** Tor nẹtiwọọki** lilo Arti bi alagbata.

---

## **Ìkópọ̀ Arti pẹlú Àjọ Tor**

Àwòrán-àkọsílẹ̀ tí a ṣe rọ́pò láti fi hàn bí Arti ti ń ṣiṣẹ́ ní ìsopọ̀ pẹlú nẹtiwọọki Tor:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- Àtòjọ àpapọ̀ àwọn ohun èlò ìkànnì tí ó ń lo ìlànà SOCKS5 ni a fi so pọ̀ pẹlú ètò aránmọ́ra Arti Socks Proxy.
- Arti wá ń bá àwon òpó Tor sọ̀rọ̀, ó sì rí i dájú pé àwọn ìsọfúnni tí o kó jáde kò ní jẹ́ kí ẹnikẹ́ni mọ orúkọ rẹ bí wọ́n ṣe n kọjá lórí ẹ̀.

---

## ** Ibi ipamọ GitLab ati Igbesẹ**

Bí o bá ní ìfẹ́ láti ṣe àfikún sí ìdàgbàsókè ti Arti, ìwọ lè ṣàwárí kókó náà kí o sì ṣètìlẹyìn nípa lílo GitLab.

- **Rípò ìsọfúnni: [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti)
- **Ṣàdàkọ Àtẹ̀wò**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Ipín àti Ìfúnpá**:
1. **Fork** ìpamọ́ náà lórí GitLab (ìfi àkáǹtì GitLab sílò).
2. So ibi ipamọ́ tí o pín sí méjì pọ̀ mọ́ ìmúrasílẹ̀ àdúgbò rẹ:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Fi orúkọ oníṣe GitLab rẹ rọ́pò *_name_* .

3. **Tẹ àtúnṣe** sí ìlọ̀ rẹ:
   ```sh
   git push _name_ main
   ```

4. **Ṣẹda Àbáwọlé Ìsojọpọ (MR)** lórí GitLab:
   Yọ sí abala Ìbéèrè Àjọpọ̀ nínú àlàfo GitLab rẹ:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Awọn Itọsọna fun Awọn ibeere Iṣọkan**:
- **Má ṣe tún báàsì àti squash kọmítì nígbà àtúnyẹ̀wò**.
- Bí ó bá pọn dandan, lo *fixup!* tàbí *squash!* fún àwọn ìmúṣẹ tí ń pa ara rẹ̀ run.
- Ṣe àfojúsùn láti fi àwọn ìmúṣẹ tuntun kún dípò kí o máa ṣe àṣekúdórógbó nígbà tí a bá ń ṣàyẹ̀wò.

---

### ** Àwọn Àlàyé Mímọ́**:

- ** Awọn akojọpọ ti a ṣe tẹlẹ**: Gẹgẹbi bayi, Arti ko pese awọn akojọ aṣayan alakoso. O gbọdọ kọ alabara lati orisun bi o ti ṣalaye loke.
- **Rust Knowledge**: Bí o bá ń ṣe àfikún sí Arti, má gbàgbé pé ìpilẹ̀kọ kòódì ṣì wà ní títúbọ́síwájú, ó sì lè jẹ́ àwọn àyípadà tàbí refactoring bí a ti n fi àwọn ohun tuntun kún un.

---



Ti o ba nife ninu lati se iranwo fun ise agbese na, ma ṣe ṣiyemeji lati wo koodu naa jade, pin ibi ipamọ naa, ki o si fi ibeere isopọpọ kan ranṣẹ. Fun alaye siwaju sii, awọn imudojuiwọn ati iṣatunṣe iṣoro, tọka si [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti). 

Ẹ gbádùn ìrírí yín pẹ̀lú Arti àti ìjábá aláyọ̀!

--- 
