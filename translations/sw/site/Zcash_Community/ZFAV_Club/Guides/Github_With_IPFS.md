<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Hudumia Hazina ya GitHub kwa IPFS 

## Utangulizi

Katika mwongozo huu tunajifunza jinsi ya kuunda URL inayoweza kuigwa kwa git kwa ajili ya hazina yako ya GitHub inayohudumiwa kwa kutumia CID ya IPFS. Hii ni muhimu ili kuhakikisha upatikanaji wa maudhui bila kujali eneo la kijiografia, upinzani dhidi ya udhibiti, na kama nakala endelevu ya taarifa muhimu!

Dokezo: Data inayopakiwa kwenye IPFS inapatikana kwa *watumiaji wote* wa mtandao. Unaweza kutaka kusimba fiche data binafsi/nyeti ndani ya kifaa chako.


## Sakinisha IPFS Kubo

Fuata maelekezo ya usakinishaji yaliyotolewa [hapa](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Katika mfano huu tunatumia Linux, matoleo mengine ya OS yanapatikana. 

Thibitisha kuwa usakinishaji ulifanikiwa kwa kutumia "ipfs --version" 


## Igiza Hazina 

Kuanza, chagua hazina ya Git unayotaka kupangisha na uiige:

Endesha Amri: "git clone https://github.com/zechub/zechub"

![](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)


Sasa, itayarishe ili iweze kuigwa kupitia IPFS.

cd zechub
git update-server-info


Fungua vitu vya Git:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

Kufanya hivi kutaruhusu IPFS kuondoa nakala rudufu za vitu ikiwa utasasisha hazina ya Git baadaye.


## Ongeza kwenye IPFS 

Ukishafanya hivyo, hazina hiyo iko tayari kuhudumiwa. Kinachobaki kufanya ni kuiongeza kwenye IPFS:

$ pwd

/code/myrepo

$ ipfs add -r .

![](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

CID inayotokana: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Vizuri sana! Sasa hazina yako imepakiwa kwenye mtandao.


## Igiza kwa kutumia IPFS 

Sasa unapaswa kuweza kurejesha hazina ya github kwa kutumia:

git clone http://ipfs.io/ipfs/"yourCID"

Vinginevyo unaweza kutafuta na kurejesha kwa kutumia node yako ya IPFS ya ndani. 

Dokezo la Mwisho: Folda ya hazina kwenye IPFS haipokei masasisho sambamba na hazina halisi ya github. Inapendekezwa kupakia upya folda hiyo kwa vipindi vya kawaida.
