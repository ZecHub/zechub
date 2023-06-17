# Nodi Kamili

Nodi Kamili ni programu inayotekeleza nakala kamili ya mlolongo wa vitalu wa sarafu yoyote ya sarafu ya elektroniki, ikitoa ufikiaji wa vipengele vya itifaki.

Inashikilia rekodi kamili ya kila muamala uliotokea tangu mwanzo na kwa hiyo inaweza kuthibitisha uhalali wa muamala mpya na vitalu vinavyoongezwa kwenye mlolongo wa vitalu.

## Zcashd

Zcashd ndio utekelezaji wa Nodi Kamili unaotumiwa na Zcash kwa sasa, ambao umetengenezwa na kudumishwa na Kampuni ya Electric Coin.

Zcashd inafichua seti ya API kupitia kiolesura chake cha RPC. API hizi hutoa kazi zinazoruhusu programu za nje kuingiliana na nodi.

Lightwalletd ni mfano wa programu inayotumia nodi kamili ili kuwezesha watengenezaji kujenga na kudumisha mifuko ya elektroniki inayofaa kwa simu bila ya kulazimika kuwasiliana moja kwa moja na Zcashd.

[orodha kamili](https://zcash.github.io/rpc/)

[kitabu ya Zcashd](https://zcash.github.io/zcash/)

### Kuanzisha Nodi (Linux)

- Kusakinisha Mahitaji 

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Kuiga toleo jipya zaidi, kuangalia, kusanidi, na kujenga:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sawazisha Mlolongo wa Vitalu (inaweza kuchukua masaa kadhaa)

Kuanza nodi, chapa amri ifuatayo::

      ./src/zcashd

- Funguo za Siri zimehifadhiwa katika ~/.zcash/wallet.dat

[Guide for Zcashd on Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Zebra

Zebra ni utekelezaji huru wa Nodi Kamili kwa Itifaki ya Zcash ulioanzishwa na Taasisi ya Zcash.

Kwa sasa, umeanza kufanyiwa majaribio na bado ni jaribio.

Kuna sehemu kuu mbili za Zebra. Sehemu ya mteja inayohusika na uchanganuzi wa mlolongo wa vitalu na jaribio la kufungua-ufunguo wa muamala.

Sehemu ya pili ni zana ya amri ya zebra. Zana hii inasimamia funguo za matumizi, anwani, na mawasiliano na sehemu ya mteja katika zebrad ili kutoa huduma za msingi za mkoba.

Watu wote wenye nia ya kujaribu Zebra kuchimba vitalu wanaalikwa kujiunga na seva ya R&D Discord. Hakikisha pia kusoma kitabu cha Zebra kwa maelekezo ya usanidi.

[Github](https://github.com/ZcashFoundation/zebra/)

[The Zebra Book](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)

## Mtandao/The Network

Kwa kuendesha nodi kamili, unachangia kuimarisha mtandao wa Zcash kwa kusaidia ugawanyaji wake.

Hii husaidia kuzuia udhibiti mbaya na kuweka mtandao kuwa imara dhidi ya aina fulani za uvurugaji.

DNS seeders huonyesha orodha ya nodi nyingine za kuaminika kupitia seva iliyojengwa. Hii inaruhusu muamala kusambaa katika mtandao kwa ufanisi.

### Takwimu za Mtandao/Network Stats

Hizi ni mifano ya majukwaa ambayo inaruhusu ufikiaji wa data ya Mtandao wa Zcash:

[Zcash Block Explorer](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Unaweza pia kuchangia katika maendeleo ya mtandao kwa kufanya majaribio, kuwasilisha maboresho mapya, na kutoa takwimu muhimu. 

### Uchimbaji/Mining

Wachimbaji wanahitaji nodi kamili ili kupata RPC zote zinazohusiana na uchimbaji madini kama vile "getblocktemplate" na "getmininginfo".

Zcashd pia inawezesha uchimbaji wa sarafu zenye kinga (shielded coinbase). Wachimbaji na vikundi vya uchimbaji wana chaguo la kuchimba moja kwa moja ili kukusanya ZEC zenye kinga katika anwani ya "z-address" kwa chaguo-msingi.

Soma [Mining Guide](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) au Jiunge na ukurasa wa Jumuiya ya Majadiliano kuhusu [Zcash Miners](https://forum.zcashcommunity.com/c/mining/13).

### Faragha/Privacy 

Kuendesha nodi kamili kunakuwezesha kuthibitisha kwa uhuru muamala na vitalu vyote kwenye mtandao wa Zcash.

Kuendesha nodi kamili kunakwepa hatari fulani za faragha zinazohusiana na matumizi ya huduma za wakala wa tatu kwa ajili ya kuthibitisha muamala kwa niaba yako.

Kutumia nodi yako mwenyewe pia kuruhusu kuunganisha kwenye mtandao kupitia [Tor](https://zcash.github.io/zcash/user/tor.html).
Hii ina faida ya kuwezesha watumiaji wengine kuunganisha kwa faragha na anwani yako ya nodi .onion address.

**Unahitaji Msaada?**

Soma [Support Documentation](https://zcash.readthedocs.io/en/latest/)

Jiunge [Discord Sever](https://discord.gg/zcash) au wasiliana nasi kupitia [twitter](https://twitter.com/ZecHub)


