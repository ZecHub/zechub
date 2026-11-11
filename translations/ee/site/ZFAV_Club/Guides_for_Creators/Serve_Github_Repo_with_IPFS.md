<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ɖe GitHub Repo Dɔ Kple IPFS

## Gɔmedzedze

Le mɔfiafia sia me la, míesrɔ ale si nàwɔ URL si woate ŋu awɔ git clone kple na wò GitHub repository si woɖe dɔe kple IPFS CID.

Esia wɔ dɔ na emetɔnu be nusiwo le eme nali sɔ gbɔna togbɔ be afi kae wònɔ, be wòakpɔ tso ƒomevi ƒe xexlẽ ɖe eŋu, eye wòanye nuteƒe si me xɔasi le na nyatakakadzɔdzɔe!

Didienu [Note]: Nyatakaka si woɖo ɖe IPFS la le network la ƒe zazãla katãwo ƒe asime. Èate ŋu adi be nàwɔ ɣaɣlaŋlɔŋlɔ [encryption] na wò ŋutɔ ƒe nyatakaka alo nyatakaka si le vevie le afi sia.

## Ɖo IPFS Kubo

Dze installation ƒe mɔfiafia si woɖo ɖe [afi sia](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions) yome.

Le kpɔɖeŋu sia me la, míezã Linux, OS ƒe version bubuwo hã le mɔ.

Kpɔ be installation la dzɔ edzi kple   ipfs –version

## Wɔ Repository ƒe Clone

Be nàdze egɔme la, tia Git repository si nèdi be nàhost eye nàwɔ clone na:

Wɔ sedede sia: "git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

Fifia, be wòanɔ klalo be woawɔ clone nae to IPFS dzi.

cd zechub git update-server-info

Ʋu Git ƒe objects:

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

Esia awɔ be IPFS nate ŋu awɔ objects deduplication ne nàle Git repository la yɔm le megbe.

## Tsɔe Ɖe IPFS

Ne wowɔ esia vɔ la, repository ma le klalo be woaɖe dɔe. Nusi koe gale na wòawɔ lae nye be nàtsɔe aɖo ɖe IPFS:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

CID si tsoa eme lae nye: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Enyo ŋutɔ! Fifia la, wò repository la le network la dzi.

## Wɔ Clone Kple IPFS

Fifia la, ele be nàte ŋu axɔ GitHub repository la kple:

git clone http://ipfs.io/ipfs/yourCID

Le mɔ bubu nu la, àte ŋu adi eye nàxɔe kple wò ŋutɔ ƒe IPFS ɣaɣla dzesi ŋɔŋlɔ [node].

Didienu Mlɔeba: Repo folder si le IPFS dzi la mexɔa updatewo ɖe GitHub repository ŋutɔ la ƒe updatewo kplii o. Woɖe aɖaŋu be nàtsɔ folder la aɖo ake le ɣeyiɣi siwo ɖoɖo me.
