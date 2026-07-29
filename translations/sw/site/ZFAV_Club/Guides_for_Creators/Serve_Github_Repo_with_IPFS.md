<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kutumikia GitHub Repo na IPFS

## Utangulizi

Katika mwongozo huu sisi kujifunza jinsi ya kujenga git cloneable URL kwa GitHub yako hazina kutumika kwa kutumia IPFS CID. 

Hii ni muhimu kuhakikisha upatikanaji wa maudhui bila kujali mkoa wa kijiografia, upinzani wa udhibiti na kama salama ya kudumu ya habari yenye thamani!

Kumbuka: Data uploaded kwa IPFS inapatikana kwa watumiaji wote wa mtandao. Unaweza kutaka kienyeji encrypt data binafsi / nyeti.

## Kufunga IPFS Kubo

Fuata maagizo ya ufungaji iliyotolewa [hapa](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Katika mfano huu tunatumia Linux, matoleo mengine ya OS zinapatikana.

Angalia ufungaji ulikuwa na mafanikio kwa kutumia ipfs version

## Hifadhi ya Clone

Kuanza, kuchagua Git hazina unataka kuwa mwenyeji & clone ni:

Kuendesha Amri: git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)

Sasa, kupata tayari kuwa cloned kupitia IPFS.

cd zechub git update-server-info

Kufungua vitu vya Gits:

![](https://i.ibb.co/25RwyWz/image-2024-04-20-175848513.png)

Kufanya hivyo itaruhusu IPFS deduplicate vitu kama update Git hazina baadaye.

## Ongeza kwa IPFS

Mara baada ya kufanya hivyo, kwamba hazina ni tayari kutumika. Wote ni kushoto kwa kufanya ni kuongeza kwa IPFS:

$ pwd

/code/myrepo

$ ipfs kuongeza -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

Matokeo CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Ajabu! Sasa hazina yako imepakiwa kwenye mtandao.

## Clone kutumia IPFS

Unapaswa sasa kuwa na uwezo wa kupata hifadhi GitHub kutumia:

kit clone http://ipfs.io/ipfs/yourCID

Vinginevyo wewe ni uwezo wa kutafuta & kupata kutumia yako ya ndani IPFS node.

Mwisho Kumbuka: repo folder juu ya IPFS haina kupokea updates pamoja na halisi github hazina. Inashauriwa reupload folder katika vipindi vya mara kwa mara.
