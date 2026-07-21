<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nodes kamili

Full Node ni programu ambayo anaendesha nakala kamili ya blockchain yoyote cryptocurrency ya kutoa upatikanaji wa vipengele vya itifaki.

Ina rekodi kamili ya kila shughuli ambayo imetokea tangu genesis na kwa hivyo ina uwezo wa kuthibitisha uhalali wa shughuli mpya na vitalu ambavyo vinaongezwa kwenye blockchain.

## Zcashd

Zcashd kwa sasa ni utekelezaji kuu Full Node kutumika na Zcash maendeleo na kudumishwa na Electric Coin Company.

Zcashd inaonyesha seti ya APIs kupitia interface yake ya RPC. API hizi hutoa kazi ambazo huruhusu programu za nje kuingiliana na node.

[Lightwalletd](https://github.com/zcash/lightwalletd) ni mfano wa maombi ambayo inatumia node kamili ili kuwezesha watengenezaji kujenga na kudumisha mkononi-kirafiki wallets mwanga ulinzi bila ya kuwa na kuingiliana moja kwa moja na Zcashd.

[Orodha kamili ya amri mkono RPC](https://zcash.github.io/rpc/)

[Kitabu Zcashd](https://zcash.github.io/zcash/)


### Kuanza Node (Linux)

- Weka Mategemeo 

      sudo apt update

      sudo apt-get install \
      kujenga-muhimu pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3-zmq
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Clone latest kutolewa, checkout, kuanzisha na kujenga:

      kit clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$ ((nproc)

- Sync blockchain (inaweza kuchukua masaa kadhaa)

    Kuanza node kukimbia:

      ./src/zcashd

- Funguo binafsi ni kuhifadhiwa katika ~/.zcash/wallet.dat

[Mwongozo kwa Zcashd juu ya Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra ni kujitegemea kamili node utekelezaji kwa Zcash Itifaki iliyoundwa na Zcash Foundation. 

Kwa sasa inajaribiwa na bado ni ya majaribio.

Kuna sehemu kuu mbili za Zebra. sehemu ya mteja ambayo ni wajibu wa blockchain skanning na majaribio decryption ya shughuli. 

Sehemu ya pili ni chombo cha mstari wa amri ya zebra. Chombo hiki kinasimamia funguo za matumizi, anwani na kuwasiliana na sehemu ya Mteja katika zebrad kutoa utendaji wa msingi wa mkoba.

Mtu yeyote nia ya kujaribu nje Zebra kuchimba vitalu ni kuwakaribisha kujiunga R & D discord server. Pia kuwa na uhakika wa kusoma kitabu Zebra kwa maelekezo ya kuanzisha. 

[Github](https://github.com/ZcashFoundation/zebra/)

[Kitabu cha Zebra](https://zebra.zfnd.org) 

[Kutoelewana](https://discord.gg/uvEdHsrb)



## Mtandao

Kwa kuendesha node kamili wewe ni kusaidia kuimarisha mtandao zcash kwa kusaidia utengamano wake. 

Hii husaidia kuzuia udhibiti adui na kuweka mtandao sugu kwa baadhi ya aina ya usumbufu.

Seeders DNS yatangaza orodha ya nodes nyingine ya kuaminika kupitia server kujengwa katika. Hii inaruhusu shughuli kuenea katika mtandao. 

### Takwimu za Mtandao

Hizi ni mifano ya majukwaa ambayo kuruhusu upatikanaji wa data Zcash Network:

[Zcash Block Explorer](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Kiti cha kulala](https://blockchair.com/zcash)

Unaweza pia kuchangia maendeleo ya mtandao kwa kuendesha vipimo au kupendekeza maboresho mapya & kutoa metrics. 



### Uchimbaji

Wachimbaji wanahitaji full nodes kupata wote madini kuhusiana RPC ya kama vile getblock template & getmininginfo. 

Zcashd pia itawezesha madini kwa walinzi coinbase. Wachimbaji na madini ya madini wana chaguo kuchimba moja kwa moja kukusanya walinzi ZEC katika z-anwani default. 

Soma [Mwongozo wa Uchimbaji](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) au Kujiunga na Jamii Forum ukurasa kwa ajili ya [Zcash Miners](https://forum.zcashcommunity.com/c/mining/13).

### Faragha 

Kuendesha node kamili inaruhusu wewe kujitegemea kuthibitisha shughuli zote na vitalu juu ya mtandao Zcash.

Kuendesha full node kuepuka baadhi ya hatari ya faragha kuhusishwa na kutumia huduma za tatu-party kuthibitisha shughuli kwa niaba yako.

Kutumia node yako mwenyewe pia inaruhusu kuunganisha na mtandao kupitia [Tor](https://zcash.github.io/zcash/user/tor.html).
Hii ina faida ya ziada ya kuruhusu watumiaji wengine kuungana binafsi kwa node yako .onion anwani.


Unahitaji Msaada?

Soma [Usaidizi wa Hati](https://zcash.readthedocs.io/en/latest/)

Kujiunga yetu [Discord Sever](https://discord.gg/zcash) au wasiliana nasi kwenye [twitter](https://twitter.com/ZecHub)




---

**Protected terms (keep in English):** `Zaino` `Zallet`
