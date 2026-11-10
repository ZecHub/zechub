<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# Jiri IPFS nye Repo GitHub

## Mmalite

N'ime nduzi a, anyị ga-amụta otu esi emepụta URL a pụrụ iji git clone maka ebe nchekwa GitHub gị nke eji IPFS CID enye ọrụ. 

Nke a bara uru iji hụ na ọdịnaya dị mgbe niile n'agbanyeghị mpaghara ala, iguzogide mmachi, nakwa dịka nkwado ndabere na-adịgide adịgide maka ozi bara uru!

Note: Data ebugoro na IPFS dịrị ndị ọrụ netwọk niile. Ị nwere ike ịchọ izobe ederede data nkeonwe/nwere mmetụta n'ime ngwaọrụ gị.

## Wụnye IPFS Kubo

Soro ntuziaka nrụnye enyere [ebe a](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

N'ihe atụ a, anyị na-eji Linux, ụdị OS ndị ọzọ dịkwa.

Lelee na nrụnye gara nke ọma site n'iji   ipfs –version

## Detuo Ebe Nchekwa

Iji malite, họrọ ebe nchekwa Git ịchọrọ ịnabata ma detuo ya:

Gbaa iwu a: …git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

Ugbu a, iji kwadebe ya ka e nwee ike idetu ya site na IPFS.

cd zechub git update-server-info

Kwụpụta ihe Git nwere:

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

Ime nke a ga-ekwe IPFS ikpochapụ ihe ndị yiri ibe ha ma ọ bụrụ na ị melite ebe nchekwa Git ma emechaa.

## Tinye na IPFS

Mgbe ị mechara nke ahụ, ebe nchekwa ahụ adịla njikere ka e nye ya ọrụ. Ihe fọdụrụ ime bụ itinye ya na IPFS:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

CID e nwetara: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Ọ dị mma! Ugbu a, ebugola ebe nchekwa gị na netwọk.

## Detuo site na IPFS

Ugbu a, ị ga-enwe ike weghachite ebe nchekwa GitHub site n'iji:

git clone http://ipfs.io/ipfs/yourCID

N'aka nke ọzọ, ị nwere ike ịchọ ma weghachite ya site na node IPFS dị n'ime ngwaọrụ gị.

Note Ikpeazụ: Folda repo dị na IPFS anaghị enweta mmelite tinyere ebe nchekwa github n'eziokwu. A na-atụ aro ka ebugharịa folda ahụ ọzọ n'oge oge niile.
