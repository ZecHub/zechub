<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kutumikia Github Repo na IPFS 

## Utangulizi

Katika mwongozo huu sisi kujifunza jinsi ya kujenga git cloneable URL kwa Github yako hazina kutumika kwa kutumia IPFS CID. Hii ni muhimu ili kuhakikisha maudhui upatikanaji bila kujali mkoa wa kijiografia, upinzani udhibiti na kama chelezo perisistent ya habari yenye thamani!

Kumbuka: Data uploaded kwa IPFS inapatikana kwa * wote * watumiaji wa mtandao. Unaweza kutaka kienyeji encrypt data binafsi / nyeti.


## Kufunga IPFS Kubo

Fuata maagizo ya ufungaji iliyotolewa [hapa](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Katika mfano huu tunatumia Linux, matoleo mengine ya OS zinapatikana. 

Angalia mitambo ilikuwa na mafanikio kutumia "ipfs --version" 


## Hifadhi ya Clone 

Kuanza, kuchagua Git hazina unataka kuwa mwenyeji & clone ni:

Run amri: "git clone https://github.com/zechub/zechub"

![](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)


Sasa, kupata tayari kuwa cloned kupitia IPFS.

cd zechub
git update-server-info


Unpack Git ya vitu:

mv vitu/pakiti/*.pakiti.
git unpack-objects < *. pakiti
rm -f *.pakiti vitu/pakiti/*

Kufanya hivyo itaruhusu IPFS deduplicate vitu kama update Git hazina baadaye.


## Ongeza kwa IPFS 

Mara baada ya kuwa umefanya kwamba, kwamba hazina ni tayari kutumika. yote kushoto kwa kufanya ni kuongeza kwa IPFS:

$ pwd

/code/myrepo

$ ipfs kuongeza -r .

![](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

Matokeo CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Ajabu! Sasa hazina yako imepakiwa kwenye mtandao.


## Clone kutumia IPFS 

Unapaswa sasa kuwa na uwezo wa kupata hifadhi github kutumia:

kit clone http://ipfs.io/ipfs/"yourCID"

Vinginevyo wewe ni uwezo wa kutafuta & kupata kutumia yako ya ndani IPFS node. 

Mwisho Kumbuka: repo folder juu ya IPFS haina kupokea updates pamoja na halisi github hazina. Inashauriwa reupload folder katika vipindi vya mara kwa mara. 
