[Àmì ọ̀pá àṣẹ Tor]](https://gitlab.torproject.org/uploads/-/system/appearance/header_logo/1/purple.svg)

# *Arti: Ẹ̀rọ-ìmọ̀ràn Tor Ìran Tẹ̀lé ní Rust*
[Àmì Àwòrán Atri]](https://gitlab.torproject.org/uploads/-/system/project/avatar/647/sliced-onions.png)

**Arti** is the Tor Project's initiative to build a next-generation **Tor** client using the **Rust** programming language. Arti is designed to be modular, embeddable, and production-ready, providing a more secure and efficient implementation of the **Tor** anonymity protocols. With **Arti version 1.4.0**, several significant updates have been introduced:

- Àwòrán ìjápọ̀ RPC tuntun fún ìfọ̀rọ̀wérọ̀ tó dára sí i.
- Iṣẹ́ ìmúrasílẹ̀ fún ìtìlẹ́yìn ìfọwọ́sowọ́pò.
- Awọn ilọsiwaju ninu ** iṣẹ-ẹgbẹ onion iṣẹ sẹ-ti-iṣẹ resistance **.

Àtúnṣe yìí ń tẹ̀síwájú ìsapá Tor Project láti pèsè ààbò, iṣẹ́-ṣiṣe, àti modularity fún àwọn oníṣe Tor àti àwọn olùdàgbà.


---


## **Ifi sori ẹrọ ti awọn Arti Onibara**

Tẹle awọn igbesẹ wọnyi lati fi sori ẹrọ ati ṣiṣe **Arti** bi aṣoju SOCKS lori eto rẹ.

---

### **Igbesẹ 1: Ṣeto Àyíká Ìdàgbàsókè Rust**

Ṣaaju ki o to le kọ Arti lati orisun, o nilo lati ni ẹya iduroṣinṣin tuntun ti ** Rust ** ti fi sori ẹrọ.

#### Lati Fi Rust sori ẹrọ:

1. Lọ sí ojú-ìwé Rust](https://www.rust-lang.org/).
2. Tẹle awọn itọnisọna fifi sori ẹrọ fun ẹrọ ṣiṣe rẹ.
3. Ṣayẹwo fifi sori ẹrọ nipa ṣiṣe:
   
   ```sh
   rustc --version
   ```

Eyi yoo jẹrisi pe o ni ẹya iduroṣinṣin tuntun ti Rust ti a fi sori ẹrọ lori eto rẹ.

#### **Àkíyèsí fún Àwọn Olùṣàmúlò Windows**:
- Rust le fi sori ẹrọ lori Windows nipasẹ [**Rustup**](https://rustup.rs/), a toolchain installer. Rii daju pe o ti tun ṣeto kan ibaramu kọ ayika (o le nilo ** Visual Studio Kọ irinṣẹ ** on Windows).
  
---

### **Igbesẹ 2: Ṣe Àdàkọ Ibi-ipamọ Arti**

Lati gba ẹya tuntun ti alabara Arti, iwọ yoo nilo lati ṣe ẹda ibi ipamọ lati [**GitLab**](https://gitlab.torproject.org/tpo/core/arti).

#### Àwọn ìgbésẹ̀:
1. Ṣii àlàfo rẹ (Àlàfo Command, PowerShell, tabi Git Bash lórí Windows).
2. Ṣiṣe aṣẹ yii lati ṣe ẹda ibi ipamọ:
   
   ```sh
   git clone https://gitlab.torproject.org/tpo/core/arti.git
   ```
4. Yọ sí atọ́ka *arti* tí a ṣẹ̀ṣẹ̀ dá:
   
   ```sh
   cd arti
   ```

Èyí yóò mú kóòdì orísun ti Arti wá sí ẹ̀rọ rẹ.

---

### Ìgbésẹ̀ Kẹta: Ṣẹ̀dá Ẹ̀yà Ọ̀tọ̀ọ̀kan Ẹ̀dá

Lẹ́yìn tí o bá ti ṣe àdàkọ ibi ìpamọ́ náà, o ní láti kọ́ Arti nípa lílo Cargo, èyí tí ó jẹ́ olùdarí páálí Rust àti irinṣẹ́ ìkọ́lé.

#### Láti Ṣẹ̀dá Ẹ̀rọ:
1. Ninu ebute, ṣiṣe aṣẹ yii:
   ```sh
   cargo build --release
   ```

Àṣẹ yìí ń ṣe àkójọpọ̀ àdàkọ Arti tí ó sì ń mú kí ó dára jùlọ fún ìmúṣẹ (àdàkọ *--release*).

#### Ibi tí a ti ṣe àdàkọ ẹ̀dà ìlọ́po méjì:
- Lẹ́yìn tí wọ́n bá ti kọ́ ilé náà tán, ibi tí a ó ti gbé e sí nìyí: 
  ```sh
  target/release/arti
  ```

O le ṣe àtúnṣe ìtòlẹ́sẹẹsẹ yìí ní tààràtà láti inú òpópónà.

---

### **Igbesẹ 4: Ṣiṣẹ aṣoju Arti SOCKS**

Láti lo Arti gẹ́gẹ́ bí aṣojú SOCKS (tí yóò darí ìkànnì ayélujára rẹ nípasẹ̀ nẹtiwọọki Tor), o nílò láti dá aṣojú náà sílẹ̀.

#### Lati Bẹrẹ Àgbàṣe SOCKS:
1. Ṣiṣe aṣẹ yii:
   ```sh
   ./target/release/arti proxy -p 9150
   ```

Àṣẹ yìí ń bẹ̀rẹ̀ Arti gẹ́gẹ́ bí aṣojú SOCKS5 lórí èbúté 9150 èyí tí ó jẹ́ èbútó tí Tor ń lò fún ìkọ̀rọ̀ SOCGS.

---

### **Igbese 5: Ṣeto Awọn ohun elo lati Lo Arti**

Lọgan ti Arti ba n ṣiṣẹ bi aṣoju SOCKS, o nilo lati tunto awọn ohun elo rẹ lati lo o fun titele ijabọ nipasẹ nẹtiwọọki Tor.

#### Àwọn ìgbésẹ̀:
1. Nínú ìtòlẹ́sẹẹsẹ ohun èlò rẹ (bí àpẹẹrẹ, aṣàwákiri orí ayélujára, ohun èèlò òpin-iṣẹ́), wá àwọn ìtòlé́sẹ̀ proxy.
2. Ṣeto aṣojú SOCKS5 sí *localhost:9150*.

Eyi yoo ṣalaye gbogbo ijabọ lati awọn ohun elo rẹ nipasẹ ** Tor nẹtiwọọki ** lilo Arti bi alagbata.

---

## **Ìkópọ̀ Arti pẹ̀lú Àkànlò Tor**

Àwòrán-àwòrán tí a mú rọrùn láti fi hàn bí Arti ṣe ń ṣiṣẹ́ papọ̀ pẹ̀lú nẹtiwọọki Tor:


```plaintext
[Application] --(SOCKS5)--> [Arti SOCKS Proxy] --(Tor Protocol)--> [Tor Network]
```

- Ẹ̀rọ-ìmọ̀ràn náà so pọ̀ pẹ̀lú aṣojú Arti Socks nípa lílo ìlànà Socks5.
- Arti wá ń sọ̀rọ̀ pẹ̀lú ẹ̀rọ Tor, tí ó ń rí i dájú wípé ìsọfúnni rẹ ti di àìsí orúkọ nígbà tí ó bá ń kọjá ní ẹ̀ka náà.

---

## **GitLab Àpamọ́ àti Ìpínwó**

Bí o bá ní ìfẹ́ láti kópa nínú ìdàgbàsókè ti Arti, o lè ṣàyẹ̀wò kòódì náà kí o sì kópa nípasẹ̀ GitLab.

- ** Asopọ Ibi ipamọ**: [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti)
- ** Ṣe Àdàkọ Ìròyìn**:
  ```sh
  git clone https://gitlab.torproject.org/tpo/core/arti.git
  ```

### **Gbigba ati Ṣiṣẹpọ**:
1. **Fork** ìpamọ́ náà lórí GitLab (ìpèsè àkọọ́lẹ̀ GitLab kan pọn dandan).
2. Sopọ ibi ipamọ ti a pín si iṣeto agbegbe rẹ:
   ```sh
   git remote add _name_ git@gitlab.torproject.org:_name_/arti.git
   git fetch _name_
   ```
   Rọ́pò *_orúkọ_* pẹ̀lú orúkọ oníṣe GitLab rẹ.

3. **Tẹ ìyípadà** sí àlàfo rẹ:
   ```sh
   git push _name_ main
   ```

4. ** Ṣẹda Ibeere Isopọpọ (MR) ** lori GitLab:
   Yọ lọ sí abala Ìbéèrè Àjọpọ̀ nínú àlàfo GitLab rẹ:
   ```plaintext
   https://gitlab.torproject.org/_name_/arti/-/merge_requests
   ```

### **Awọn itọnisọna fun Awọn ibeere Iṣọkan**:
- **Má ṣe tún báàsì ṣe kí o sì fi àdàkọ ṣe nígbà àtúnyẹ̀wò**.
- Bí ó bá pọn dandan, lo *fixup!* tàbí *squash!* fún àwọn ìmúṣẹ tí ó máa ń pa ara rẹ̀ run.
- Ṣe àfojúsùn láti **fi àwọn àdéhùn tuntun kún** dípò tí wàá fi máa tẹ̀ ẹ́ lójú lásìkò àtúnyẹ̀wò náà.

---

### ** Àwọn Àlàyé Mímọ́**:

- **Pre-built Binaries**: As of now, **Arti** does not provide official pre-built binaries. You must build the client from source as described above.
- **Rust Knowledge**: Ti o ba n ṣe alabapin si Arti, ṣe akiyesi pe ipilẹ koodu ṣi n dagbasoke, ati pe awọn ayipada le wa tabi atunṣe bi awọn ẹya tuntun ti wa ni afikun.

---



Ti o ba nifẹ lati ṣe alabapin si iṣẹ akanṣe naa, ma ṣe ṣiyemeji lati ṣayẹwo koodu naa, pinpin ibi ipamọ naa, ki o fi Ẹbẹ Isopọ kan ranṣẹ. Fun alaye diẹ sii, awọn imudojuiwọn, ati awọn iṣoro, tọka si [Arti GitLab Repository](https://gitlab.torproject.org/tpo/core/arti). 

Ẹ gbádùn ìrírí yín pẹ̀lú Arti àti ìjábá aláyọ̀!

--- 
