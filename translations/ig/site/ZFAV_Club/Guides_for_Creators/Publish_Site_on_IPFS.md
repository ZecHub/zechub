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

IPFS na-echekwa ọdịnaya dị ka block ndị a na-amata site na CID. Itinye faịlụ na-echekwa ya na node gị; ọ naghị eji onwe ya depụtaghachi ya na node ndị ọzọ. Debe otu mbipụta a na-enweta n'ịntanetị, ma ọ bụ hazie ịpịn n'ebe dị anya (remote pinning), ka ndị ọgụgụ ndị ọzọ wee nwee ike weghachite ya. Lee [ịdịgide nke IPFS](https://docs.ipfs.tech/concepts/persistence/).

**Gụọ: [Mmalite maka IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Ịmepụta Saịtị Gị

Maka ihe atụ a, anyị na-emepụta weebụsaịtị dị mfe.

[Saịtị Ihe Atụ](https://squirrel.surf/)

**Nzọụkwụ 1:** Ọ bụrụ na ị maghị maka imewe weebụ, dee isi ọdịnaya maka weebụsaịtị gị, gụnyere Aha, Isi Ahụ nke ederede, yana njikọ gaa na ibe/saịtị ndị ọzọ na footers.

**Nzọụkwụ 2:** Jiri [template HTML!](https://nicepage.com/html-templates). Tapawa ederede ị dere n'ime ya dịka o kwesịrị. Ị nwekwara ike ịmepụta akwụkwọ ụdị .CSS maka weebụsaịtị gị.

**Nzọụkwụ 3:** Tinye ibe mbụ (homepage) nke weebụsaịtị gị n'ime `index.html` na mgbọrọgwụ (root) nke folda saịtị ahụ. Tinyekwa onyonyo ya na CSS ya, jiri ụzọ mmekọ (relative paths) dịka `style.css` ka ha wee rụọkwa ọrụ n'okpuru URL ọnụ ụzọ (gateway) IPFS.

## Ịhazi Node

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) na-elekọta node ahụ maka gị. Biko hapụ ya ka ọ na-arụ ọrụ mgbe ị na-ekesa saịtị gị.

Maka [ụzọ command-line (command-line route)](https://docs.ipfs.tech/how-to/command-line-quick-start/), malite repository ọhụrụ otu ugboro:

```sh
ipfs init
```

Mgbe ahụ, malite node ahụ ma hapụ terminal a ka ọ ghere oghe:

```sh
ipfs daemon
```

Mee iwu ndị fọdụrụ na terminal nke abụọ. Ebidola daemon nke abụọ ma ọ bụrụ na IPFS Desktop na-ejikwalarị repository a.

### **Tinye Folder Saịtị na IPFS**:

Na IPFS Desktop, họrọ folda nwere faịlụ weebụsaịtị gị site n'iji nhọrọ Tinye Folda (Add Folder).

<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

Maka ụzọ CLI (command-line interface), mee nke a site na ndekọ nne (parent directory) nke folda saịtị gị:

```sh
ipfs add -r folder_name
```

Dochie `folder_name` na aha folda gị (tinye aha nwere oghere n'ime akara nkọwa). Chekwaa CID dị n'ahịrị `added ... folder_name` ikpeazụ: ọ na-amata ndekọ (directory) ahụ dum, ọ bụghị naanị `index.html`.

### Tụọ Saịtị na IPFS:

Iwu CLI `ipfs add` na-atụdo (pin) ọdịnaya ebubatara n'ime kọmputa gị dị ka ndabara. Lelee pin nke folder ahụ site na:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

Dochie `YOUR_FOLDER_CID` na CID sitere na nzọụkwụ gara aga; ihe ọ ga-egosipụta kwesịrị ịbụ `recursive`. Ịpịn (pinning) na-echebe mbipụta node a ka a ghara ihichapụ ya site na nhicha ihe mkpofu (garbage collection), mana ọ naghị eme ka kọmputa a gbanyụrụ agbanyụ nọrọ n'ịntanetị. Ka ihe ahụ dịrị mgbe node gị anọghị n'ịntanetị, hazie [ịpịn n'ebe dị anya](https://docs.ipfs.tech/how-to/work-with-pinning-services/) ma kwenye na ọrụ ahụ dị n'ebe dị anya ewechaala ịpịn ya.

### Nweta weebụsaịtị gị na IPFS:

Buru ụzọ lelee saịtị gị site na ọnụ ụzọ mpaghara (local gateway) dị na `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` (jiri nọmba port nke ọnụ ụzọ ahụ daemon gị bipụtara ma ọ bụrụ na ọ dị iche). Akara slash dị na njedebe na-eme ka njikọ ndị metụtara ya (relative links) rụọ ọrụ n'ime ndekọ ahụ (directory).

Ọnụ ụzọ ọha (public gateway) dị ka `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` nwere ike ijere ya ozi ozugbo o nwere ike iweta ọdịnaya ahụ site na node a na-enweta. Nlele mbụ (preview) nke na-aga nke ọma na kọmputa gị anaghị egosi na ọha mmadụ nwere ike ịnweta ya.

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

Maka `example.com`, tinye ndekọ DNS a (DNS record), dochie `YOUR_FOLDER_CID` na CID nke ndekọ faịlụ (directory) gị:

| Ụdị | Aha | Uru |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

Ụfọdụ ndị na-enye ọrụ DNS (DNS providers) na-agbakwunye zone ahụ n'onwe ha; tinye naanị `_dnslink` ebe ahụ. Ọ bụrụ na ị na-eji aha IPNS dị n'elu, uru ya nwere ike ịbụ `dnslink=/ipns/YOUR_IPNS_NAME` kama. Lee [DNSLink](https://docs.ipfs.tech/concepts/dnslink/).

<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


Mgbe DNS gbasasịrị (propagation), nwalee `https://ipfs.io/ipns/example.com/`. Ije ozi saịtị ahụ ozugbo na `https://example.com/` chọkwara gateway nwere ike ịrụ ọrụ DNSLink na nhazi HTTPS; naanị ndekọ TXT ahụ anaghị edozi ihe ndị ahụ. Soro [ntuziaka custom-domain](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/).

*Ekele! Ị nwere ugbu a weebụsaịtị na-eguzogide censorship.*

____

**Akụrụngwa**

[Dokumenteshọn IPFS](https://docs.ipfs.tech/)

[Dokumenteshọn IPNS](https://docs.ipfs.tech/concepts/ipns/)

[Docs njikọ DNS](https://dnslink.io/#introduction)
