<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Hudumia Hazina [Repository] ya GitHub kwa IPFS

## Utangulizi

Katika mwongozo huu tunajifunza jinsi ya kuunda URL inayoweza kufanyiwa git clone kwa ajili ya hazina yako ya GitHub inayohudumiwa kwa kutumia CID ya IPFS. 

Hii ni muhimu ili kuhakikisha upatikanaji wa maudhui bila kujali eneo la kijiografia, ukinzani dhidi ya udhibiti, na kama nakala rudufu ya kudumu ya taarifa zenye thamani!

Kumbuka: Data inayopakiwa kwenye IPFS inapatikana kwa watumiaji wote wa mtandao. Unaweza kutaka kusimba fiche data binafsi/nyeti ndani ya kifaa chako.

## Sakinisha IPFS Kubo

Fuata maelekezo ya usakinishaji yaliyotolewa [hapa](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Katika mfano huu tunatumia Linux, matoleo mengine ya OS yanapatikana.

Thibitisha kuwa usakinishaji ulifanikiwa kwa kutumia   ipfs –version

## Nakili Hazina

Kuanza, chagua hazina ya Git unayotaka kupangisha na uinakili:

Endesha Amri: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

Sasa, iandae ili iweze kunakiliwa kupitia IPFS.

cd zechub git update-server-info

Fungua Vifurushi vya Vitu vya Git:

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

Kufanya hivi kutaruhusu IPFS kuondoa urudufu wa vitu ikiwa utasasisha hazina ya Git baadaye.

## Ongeza kwenye IPFS

Baada ya kufanya hivyo, hazina hiyo iko tayari kuhudumiwa. Kilichobaki ni kuiongeza kwenye IPFS:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

CID inayotokana: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Vizuri sana! Sasa hazina yako imepakiwa kwenye mtandao.

## Nakili kwa Kutumia IPFS

Sasa unapaswa kuweza kurejesha hazina ya GitHub kwa kutumia:

git clone http://ipfs.io/ipfs/yourCID

Vinginevyo, unaweza kutafuta na kurejesha kwa kutumia node yako ya IPFS ya ndani.

Kumbuka la Mwisho: Folda ya hazina kwenye IPFS haipokei masasisho pamoja na hazina halisi ya github. Inapendekezwa kuipakia upya folda hiyo kwa vipindi vya kawaida.
