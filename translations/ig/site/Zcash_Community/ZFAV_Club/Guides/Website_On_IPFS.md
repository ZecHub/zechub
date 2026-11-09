<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Bipụta Weebụsaịtị na IPFS 

![](/content-images/IPFS-40c2e22732.webp)

## Mmalite banyere IPFS 

IPFS (InterPlanetary File System) bụ protocol na netwọkụ peer-to-peer e mere iji wulite usoro decentralized nke ịchekwa na ikekọrịta faịlụ. 

N'adịghị ka usoro client-server ọdịnala nke ịntanetị, IPFS na-enye ndị ọrụ ohere ịkekọrịta faịlụ ozugbo n'etiti onwe ha, kama ịdabere na sava etiti iji chekwaa ma kesaa ọdịnaya. 

A na-eji *ịkpọ aha dabere n’ọdịnaya [content-addressing]* achọpụta faịlụ dị na IPFS, nke pụtara na a na-enye faịlụ ọ bụla hash pụrụ iche ma ọ bụ NJIRIMARA ỌDỊNAYA (CID) dabere n’ọdịnaya ya, a na-ejikwa hash a weghachite faịlụ ahụ n’ime netwọkụ.

Mgbe onye ọrụ tinye faịlụ na IPFS, a na-ekewa faịlụ ahụ n’ime obere iberibe a na-akpọ blocks, ma nye block ọ bụla CID. A na-echekwa blocks ndị a na node dị iche iche n’ime netwọkụ, ka e wee nwee ike weghachite faịlụ ahụ n’ụzọ dị mfe site n’ọtụtụ ebe. 

Nke a na-ahụ maka inwe oyiri na iguzogide mmejọ, ma na-emekwa ka o sie ike ka node ọ bụla bụrụ otu ebe mmejọ ma ọ bụ nchịkwa. 

Gụọ [Mmalite banyere IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)



## Ịmepụta Saịtị Gị 

Maka ihe atụ a, anyị na-emepụta weebụsaịtị dị mfe. 

[Saịtị Ihe Nlereanya](https://squirrel.surf)


**Nzọụkwụ 1:** Ọ bụrụ na ị maghị nke ọma maka imewe weebụ, dee ọdịnaya bụ isi maka weebụsaịtị gị, tinyere Aha, Akụkụ ederede bụ isi, njikọ gaa na ibe/saịtị ndị ọzọ na footer.

**Nzọụkwụ 2:** Jiri [template HTML!](https://nicepage.com/html-templates). Tapawa ederede ị dere n’ebe kwesịrị ekwesị. Ị nwekwara ike ịmepụta stylesheet .CSS maka weebụsaịtị gị. 

**Nzọụkwụ 3:** Chekwaa directory gị. Ibe .html niile na onyonyo ga-anọrịrị n’otu Folder. 



## Ịtọlite Node

Budata ma wụnye IPFS site na [weebụsaịtị gọọmentị](https://docs.ipfs.tech/install/ipfs-desktop/).



### Ịmalite IPFS: 

Ọ bụrụ na ị na-eji Ngwa Desktọpụ, ị gaghị achọ ịmalite ya. 

N’iji Terminal ma ọ bụ command prompt, gbaa iwu a: <mark>ipfs init </mark>. 



**Tinye Folder Saịtị na IPFS**: 

Họrọ folder nwere faịlụ weebụsaịtị gị, gaa n’ọrụ nhọrọ Add Folder.

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

Ọ bụrụ na ị na-eji Terminal, gbaa iwu a: <mark>ipfs add -r "folder_name"</mark> iji tinye folder ahụ dum na IPFS n’ụzọ recursive.


### Tinye Pin na Saịtị na IPFS: 

Ozugbo etinyere faịlụ weebụsaịtị gị na IPFS, ị ga-emerịrị **pin** ha iji hụ na ha ga-adịgide n’ime netwọkụ.

--

Ọ bụrụ na ị na-eji Terminal, gbaa iwu a: Ọ bụrụ na ị na-eji Terminal, gbaa iwu a: <mark>ipfs pin add "hash"</mark> 

"hash" = CID nke folder i tinyere na nzọụkwụ gara aga.


N’ụzọ ọzọ, ị nwekwara ike itinye pin na directories site na ọrụ dịka [Pinata](https://pinata.cloud) ma ọ bụ [Dolpin](https://dolpin.io)

Ọ na-echekwa ọtụtụ oge! 

--

### Nweta weebụsaịtị gị na IPFS: 

E bipụtala weebụsaịtị gị ugbu a na IPFS, a pụkwara iji hash nke folder ahụ nweta ya. Iji nweta weebụsaịtị gị, ị nwere ike gaa na https://ipfs.io/ipfs/"hash" 

"hash" = CID nke folder ahụ.

N’ọnọdụ anyị, CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS 

Interplanetary Naming System (IPNS) na-enye gị ohere imelite CID IPFS ndị jikọtara na weebụsaịtị gị, ma ka na-enye njikọ kwụụrụ onwe ya. A na-enye ya dịka igodo. 

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

N’ime menu settings maka foldre saịtị gị na ngwa IPFS desktọpụ, họrọ Publish to IPNS.  

![](/content-images/IPNS-2fe62cc369.webp)

Igodo: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

A pụkwara iji ya lee saịtị anyị site na gateway: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## Njikọ DNS 
 
E mepụtala saịtị ahụ; ugbu a, anyị chọrọ ụzọ iji tụọ URL gaa n’ọdịnaya ahụ. 

Ọ bụrụ na i nweela adreesị weebụ, ị nwere ike tinye ndekọ ọhụrụ site na ndekọ TXT "_dnslink(your domain)". Dabere na onye na-eweta ọrụ, o nwere ike iji onwe ya jupụta. 

![](/content-images/example-c2a9edb28b.webp)

Ọ ga-ewe oge ịgbasa n’ime netwọkụ tupu ị nwee ike ile ya anya. 

Ekele! Ịtọlitela weebụsaịtị na-eguzogide censorship. 


**Akụrụngwa**

[Dokumenteshọn IPFS](https://docs.ipfs.tech)

[Dokumenteshọn IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Docs njikọ DNS](https://dnslink.io/#introduction)
