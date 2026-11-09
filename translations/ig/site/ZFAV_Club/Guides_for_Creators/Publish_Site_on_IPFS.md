<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Bipụta Saịtị na IPFS

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## Mmalite maka IPFS

IPFS (InterPlanetary File System) bụ protocol na netwọk ibe-na-ibe e mere iji mepụta ụzọ decentralized [decentralised] maka ịchekwa na ikekọrịta faịlụ.

N'adịghị ka usoro client-server ọdịnala nke ịntanetị, IPFS na-enye ndị ọrụ ohere ịkekọrịta faịlụ ozugbo n'etiti onwe ha, kama ịdabere na server etiti iji chekwaa ma kesaa ọdịnaya.

A na-enye faịlụ ndị dị na IPFS adreesị site n'iji *adreesị ọdịnaya [content-addressing]*, nke pụtara na a na-enye faịlụ ọ bụla hash pụrụ iche ma ọ bụ NJIRIMARA ỌDỊNAYA (CID) dabere n’ọdịnaya ya, a na-ejikwa hash a weghachite faịlụ ahụ site na netwọk.

Mgbe onye ọrụ tinyere faịlụ na IPFS, a na-ekewa faịlụ ahụ n'ime obere akụkụ a na-akpọ block [blocks], a na-enyekwa block ọ bụla CID. A na-echekwa block ndị a na node dị iche iche n'ime netwọk, ka e wee nwee ike weghachite faịlụ ahụ n'ụzọ dị mfe site n'ọtụtụ ebe.

Nke a na-ahụ na e nwere nkwado ndabere na nnagide mmejọ, ma na-emekwa ka o sie ike ka node ọ bụla bụrụ otu ebe ọdịda ma ọ bụ njikwa.

**Gụọ: [Mmalite maka IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Ịmepụta Saịtị Gị

Maka ihe atụ a, anyị na-emepụta weebụsaịtị dị mfe.

[Saịtị Ihe Atụ](https://squirrel.surf/)

**Nzọụkwụ 1:** Ọ bụrụ na ị maghị maka imewe weebụ, dee isi ọdịnaya maka weebụsaịtị gị, gụnyere Aha, Isi Ahụ nke ederede, yana njikọ gaa na ibe/saịtị ndị ọzọ na footers.

**Nzọụkwụ 2:** Jiri [template HTML!](https://nicepage.com/html-templates). Tapawa ederede ị dere n'ime ya dịka o kwesịrị. Ị nwekwara ike ịmepụta akwụkwọ ụdị .CSS maka weebụsaịtị gị.

**Nzọụkwụ 3:** Chekwaa directory gị. Ibe .html niile na onyonyo ga-adịrị n'otu Folder.

## Ịhazi Node

Budata ma wụnye IPFS site na [weebụsaịtị gọọmenti](https://docs.ipfs.tech/install/ipfs-desktop/).

### Malite IPFS:

Ọ bụrụ na ị na-eji Ngwa Desktop, ị gaghị achọ ịmalite ya.

N'iji Terminal ma ọ bụ command prompt, gbaa iwu a: ipfs init

### **Tinye Folder Saịtị na IPFS**:

Họrọ folder nwere faịlụ weebụsaịtị gị, gaa na nhọrọ Add Folder.


<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

Ọ bụrụ na ị na-eji Terminal, gbaa iwu a: ipfs add -r folder_name iji tinye folder niile na IPFS n'usoro recursive.

### Tụọ Saịtị na IPFS:

Ozugbo etinyere faịlụ weebụsaịtị gị na IPFS, ị ga-**pin** ha iji hụ na ha ka dị na netwọk.

–

Ọ bụrụ na ị na-eji Terminal, gbaa iwu a: Ọ bụrụ na ị na-eji Terminal, gbaa iwu a: ipfs pin add **hash**

**hash** = CID nke folder ị tinyere na nzọụkwụ gara aga.

N'aka nke ọzọ, ị nwekwara ike ịpin directory site na ọrụ dịka [Pinata](https://pinata.cloud/) ma ọ bụ [Dolpin](https://dolpin.io/)

Ọ na-echekwa ọtụtụ oge!

–

### Nweta weebụsaịtị gị na IPFS:

E bipụtala weebụsaịtị gị ugbu a na IPFS, ma enwere ike ịnweta ya site n'iji hash nke folder ahụ. Iji nweta weebụsaịtị gị, ị nwere ike ịga na https://ipfs.io/ipfs/**hash**

**hash** = CID nke folder ahụ.

N'ọnọdụ anyị, CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

Interplanetary Naming System (IPNS) na-enye gị ohere imelite IPFS CID ndị ejikọtara na weebụsaịtị gị, ma ka na-enye njikọ static. A na-enye ya dịka key.


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


N'ime menu ntọala maka folder saịtị gị na ngwa desktop IPFS, họrọ Publish to IPNS.

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


Key: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

A pụkwara iji ya lee saịtị anyị site na gateway: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## Njikọ DNS

E mepụtala saịtị ahụ; ugbu a, anyị chọrọ ụzọ iji tụọ URL gaa na ọdịnaya ahụ.

Ọ bụrụ na i nweelarị adreesị weebụ, ị nwere ike itinye record ọhụrụ site n'iji TXT record _dnslink(domain gị). Dabere na provider, ọ nwere ike iji aka ya jupụta.


<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


Ọ ga-ewe oge ịgbasa n'ime netwọk tupu ị nwee ike ịhụ ya.

*Ekele! Ị nwere ugbu a weebụsaịtị na-eguzogide censorship.*

____

**Akụrụngwa**

[Dokumenteshọn IPFS](https://docs.ipfs.tech/)

[Dokumenteshọn IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Docs njikọ DNS](https://dnslink.io/#introduction)
