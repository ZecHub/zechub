<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Som GitHub Repo ne IPFS

## Nnianimu

Wɔ saa akwankyerɛ yi mu no yɛsua sɛdeɛ yɛbɛbɔ git cloneable URL ama wo GitHub akoraeɛ a wɔde IPFS CID som. 

Eyi ho wɔ mfaso de hwɛ hu sɛ nneɛma a ɛwɔ mu no wɔ hɔ a asasesin a ɛwɔ ɔmantam, censorship resistance ne sɛ nsɛm a ɛsom bo a ɛkɔ so daa a wɔde sie mfa ho!

Hyɛ no nsow: Data a wɔde akɔ IPFS so no wɔ hɔ ma network dwumadiefoɔ nyinaa. Ebia wobɛpɛ sɛ wode w’ankasa/nsɛm a ɛho hia sie wɔ wo mpɔtam hɔ.

## Fa IPFS Kubo no hyɛ mu

Di instɔlehyɛn akwankyerɛ a wɔde ama no akyi [ha](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Wɔ saa nhwɛsoɔ yi mu no yɛde Linux di dwuma, OS nkyerɛaseɛ foforɔ wɔ hɔ.

Hwɛ sɛ instɔlehyɛn no dii nkonim denam ipfs –version so

## Clone Adekorabea

Sɛ wopɛ sɛ wohyɛ aseɛ a, paw Git akoraeɛ a wopɛ sɛ wo host & clone no:

Run Ahyɛde: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)

Afei, sɛnea ɛbɛyɛ a ɛbɛyɛ krado sɛ wɔbɛfa IPFS so ayɛ no clone.

cd zechub git update-server-nsɛm a ɛfa ho

Yi Gits nneɛma no mu:

![](https://i.ibb.co/25RwyWz/image-2024-04-20-175848513.png)

Wei a wobɛyɛ no bɛma IPFS atumi deduplicate nneɛma sɛ wo update Git repository no akyiri yi a.

## Fa ka IPFS ho

Sɛ woyɛ saa wie a, saa adekorabea no ayɛ krado sɛ wɔbɛsom. Nea aka ara ne sɛ wode bɛka IPFS ho:

$ pwd

/kode/myrepo na ɛwɔ hɔ

$ ipfs de -r ka ho 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

CID a efi mu ba ne: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Adenim! Seesei wɔde wo repository no akɔ network no so.

## Clone denam IPFS so

Afei ɛsɛ sɛ wotumi gye GitHub akoraeɛ no denam:

git clone a wɔde yɛ nneɛma http://ipfs.io/ipfs/yourCID

Sɛnea ɛbɛyɛ a wobɛtumi ahwehwɛ & agye denam wo mpɔtam hɔ IPFS node no so.

Hyɛ no nsow a etwa to: Repo folda a ɛwɔ IPFS so no nnya nsɛm foforo wɔ github akorae ankasa no nkyɛn. Wɔkamfo kyerɛ sɛ wobɛsan de folda no akɔ so bere ne bere mu.
