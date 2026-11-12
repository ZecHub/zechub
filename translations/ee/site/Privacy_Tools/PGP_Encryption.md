<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP) nye kryptografi ƒe software ƒe package si dea mɔɖeɖe dedie na nudzodzro to mɔsiwo me wometsɔa dzi o. PGP zãa ɣaɣlaŋlɔŋlɔ [encryption] kple asidede agbalẽ te [digital signatures] ƒe akpa ƒe ƒoƒo be wòakpɔ be ame si wotu ɖo e nɔe ko ate ŋu axlẽ mesedzia, eye be ame si dɔe lae nye ame si wògblɔ be enye.

## Dɔwɔnu [Tools] Siwo Le Asiwò

PGP dɔwɔnu geɖewo le asiwò, ke esiwo nye amegãwo dometɔ aɖewo nye:

* **[GnuPG (GPG)](https://gnupg.org/)**: Nye OpenPGP command-line dɔwɔnu si nye ablɔɖe, eye wòƒe source code le ʋã. Tia package alo graphical frontend si dze na wò operating system.
* **[Thunderbird](https://www.openpgp.org/software/thunderbird/)**: Nye desktop email client si nye ablɔɖe, eye wòƒe source code le ʋã, si me OpenPGP ƒe kpekpeɖeŋu le tso version 78 dzi. Ehiã Mailvelope o be wòaɣla email.
* **[Mailvelope](https://mailvelope.com/)**: Nye browser extension si nye ablɔɖe, eye wòƒe source code le ʋã, si tsɔ OpenPGP kpe ɖe webmail service siwo wòkpe ɖe ŋu, siwo dome Gmail le, ŋu. Enye webmail dɔwɔnu, menye extension na Thunderbird o.

![PGP Tools](/content-images/44984a75-800a-4f7a-94a5-88827e39b431-c66ef53a2b.webp)

## Ale Si Wòawɔ Kiyiwo

Be nàzã PGP la, ele be nàwɔ kiyi eve: Ale si woawɔ PGP kiyiwo:

1. Ʋu wò PGP software.
2. Zi "Generate Key" button dzi.
3. Ɖe wò ŋkɔ kple email gaɖoƒe ƒe dzesi [address] la.
4. Tia kiyi ƒe didime. Ne kiyi ƒe didime gã wu la, wò kiyiwo nanɔ dedie wu.
5. Zi "Generate" button dzi.

Woawɔ wò PGP kiyi eve la.

![Generate Keys](/content-images/15721ce1-0a77-4ebe-87f4-33e1455f2a40-7699b1771d.webp)

## Ale Si Wòazã PGP Na Email

Ne nèwɔ PGP kiyi eve la vɔ tẹlẹ, àte ŋu azãe atsɔ aɣla email kple atsɔ aɖe email ƒe ɣaɣla. Be nàɣla email aɖe la, ele be nànya ame si wòle dɔm na la ƒe public key. Azɔ àte ŋu azã wò PGP dɔwɔnu atsɔ aɣla email la kple ame si wòle dɔm na la ƒe public key.

Email si woɣla la manye nuxlẽ na ame aɖeke si mekpɔ ame si wòle dɔm na la ƒe private key o. Be wòaɖe email la ƒe ɣaɣla la, ame si wòle dɔm na la ate ŋu azã eƒe private key atsɔ aɖe email la ƒe ɣaɣla.

![PGP Email](/content-images/dafb761d-f399-40c9-9323-526ba3bd0bc4-98503ad98b.webp)

## Nɔnɔme Nyuiwo

Efia nɔnɔme nyui aɖewo na PGP zazã:

* Lé wò private key ɖe afi dedie. Private key nye akpa si le vevie wu le wò PGP kiyi eve me. Ne ame aɖe kpɔ wò private key la, ate ŋu aɖe mesedzi siawo katã ƒe ɣaɣla si woɣla kple wò public key.

![Best Practices 1](/content-images/39a6fae4-a9a1-4061-a97c-4a9b975f6383-eced005c8b.webp)

![Best Practices 2](/content-images/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd-50ca49a070.webp)

* Ma wò public key na ame siwo nèka ɖe wo ŋu. Àte ŋu ama wò public key na wo to eɖoɖo ɖe wo ŋutɔ ƒe asi me, alo to eƒoƒo ɖe PGP keyserver dzi.
* Zã password sesẽ na wò PGP keyring. Wò PGP keyring nye file si le wò PGP kiyiwo ɖom. Ele vevie be nàzã password sesẽ atsɔ akpɔ file sia ŋu.
* Na wò PGP software nanɔ yeyee. Wole PGP software woɖe yeyee ɣesiaɣi be woatso avɔdzesiwo eye woana dedienɔnɔ nanyo. Ele vevie be nàna wò software nanɔ yeyee be nàzã dedienɔnɔ ƒe nɔnɔme yeyewo.

## Ale Si Wòaɣla Email Kple PGP

* Ʋu wò PGP software.
* Ʋu email si nèdi be nàɣla.
* Zi "Encrypt" button dzi.
* Ɖe ame si wòle dɔm na la ƒe public key.
* Zi "Encrypt" button dzi.
* Woaɣla email la.

![Encrypt Email](/content-images/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e-6edd4a03ea.webp)

---

![Encryption Flow](/content-images/da1499e9-fc87-46b2-93ed-28d43cf1fd86-86fdc87d10.webp)

## Ale Si Wòaɖe Email Ƒe Ɣaɣla Kple PGP

* Ʋu wò PGP software.
* Ʋu email si woɣla.
* Zi "Decrypt" button dzi.
* Ɖe wò private key.
* Zi "Decrypt" button dzi.
* Woaɖe email la ƒe ɣaɣla.

![Decrypt Email](/content-images/beae714c-020f-4c1e-aa4f-3dd9430670cc-1e9d38f1ef.webp)
