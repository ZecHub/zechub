# Hudumisha Hifadhi ya Github kwa Kutumia IPFS/Serve Github Repo with IPFS 

## Utangulizi

Katika mwongozo huu tunajifunza jinsi ya kuunda URL inayoweza kunakiliwa ya Git kwa ajili ya uhifadhi wako wa Github uliotolewa kwa kutumia IPFS CID. Hii ni muhimu ili kuhakikisha upatikanaji wa yaliyomo bila kujali eneo la kijiografia, upinzani wa ukandamizaji, na kama nakala rudufu thabiti ya habari muhimu!

Kumbuka: Data iliyopakiwa kwenye IPFS inapatikana kwa watumiaji wote wa mtandao. Unaweza kutaka kusimbwa data ya kibinafsi/nyeti kwenye kompyuta yako.

## Sakinisha IPFS Kubo

 Fuata hatua hizi [hapa](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Katika mfano huu, tunatumia Linux, lakini toleo lingine la mfumo wa uendeshaji linapatikana.

Angalia ikiwa ufungaji ulifanikiwa kwa kutumia "ipfs --version".

## Kuiga Hifadhi ya Git 

Ili kuanza, chagua hifadhi ya Git unayotaka kuwa mwenyeji wake na kuiga (clone):

Fanya Amri: "git clone https://github.com/zechub/zechub"

![](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)


Sasa, ili kuandaa kuiga kupitia IPFS.

cd zechub
git update-server-info


Fungua vitu vya Git:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

Kufanya hivi kutawezesha IPFS kufanya kazi ya kuchanganua vitu ikiwa utasasisha hifadhi ya Git baadaye.

## Kuongeza kwenye IPFS

Baada ya kufanya hayo, hifadhi hiyo iko tayari kuwa hudumishwa. Kitu kilichobaki ni kuiongeza kwenye IPFS:

$ pwd

/code/myrepo

$ ipfs add -r .

![](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

CID iliyopatikana: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Baraka! Sasa hifadhi yako imepakia kwenye mtandao.

## Kuiga kwa Kutumia IPFS

Sasa unapaswa kuweza kupata hifadhi ya GitHub kwa kutumia:

git clone http://ipfs.io/ipfs/"yourCID"

Kwa njia mbadala, unaweza kutafuta na kupata kutumia node ya IPFS ya eneo lako. 

Taarifa ya Mwisho: Saraka ya hifadhi kwenye IPFS haitapokea sasisho pamoja na hifadhi halisi ya GitHub. Inapendekezwa kuweka tena saraka hiyo kwa vipindi vya kawaida.
