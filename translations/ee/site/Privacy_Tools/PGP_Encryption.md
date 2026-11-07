<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nya Ɣaɣla (Pretty Good Privacy, PGP)

Pretty Good Privacy (PGP) nye cryptographic software package si naa kadodo dedie to mɔ siwo menye dedie o dzi. PGP zã ɣaɣlaŋlɔŋlɔ (encryption) kple asidede agbalẽ te (digital signatures) ƒe akpa woawɔ ɖeka be ame si woɖo ta na koe ate ŋu axle mesaj la eye be ɖela lae nye ame si wògblɔ be ye nye.

## Dɔwɔnu Siwo Le Asiwò

PGP dɔwɔnu vovovo geɖewo le asiwò, gake siwo ŋkɔ wɔnɔna ŋutɔ dometɔe nye:

* **[GPG](https://gpgtools.org/)**: GPG nye PGP ƒe dɔwɔwɔ si nye baɖe eye wòƒe source code le kɔkɔe, si le asiwò na Windows, macOS, kple Linux.
* **[PGPMail](https://www.openpgp.org/software/)**: PGPMail nye PGP email client si wole asi le mɔxɔxɔ me, si le asiwò na Windows kple macOS.
* **[Mailvelope](https://www.comparitech.com/blog/information-security/pgp-encryption-gmail/)**: Mailvelope nye PGP extension si nye baɖe eye wòƒe source code le kɔkɔe na Gmail kple Thunderbird.

![PGP Tools](/content-images/44984a75-800a-4f7a-94a5-88827e39b431-c66ef53a2b.webp)

## Ale Si Nàwɔ Keys

Be nàte ŋu azã PGP la, ele be nàwɔ keys ƒe fli eve: Ale si woawɔ PGP keys:

1. Ʋu wò PGP software.
2. Zi "Generate Key" button dzi.
3. Ŋlɔ wò ŋkɔ kple email gaɖoƒe ƒe dzesi.
4. Tia key ƒe didime. Ne key ƒe didime ganganɔ la, wò keys anɔ dedie wu.
5. Zi "Generate" button dzi.

Woawɔ wò PGP key fli la.

![Generate Keys](/content-images/15721ce1-0a77-4ebe-87f4-33e1455f2a40-7699b1771d.webp)

## Ale Si Nàzã PGP Na Email

Ne èwɔ PGP key fli la vɔ la, àte ŋu azãe atsɔ aɣlaŋlɔ eye nàɣe emailwo ƒe ɣaɣlaŋlɔŋlɔ. Be nàɣlaŋlɔ email aɖe la, ele be nanya ame si wòle dzodzom na ƒe public key. Emegbe la, àte ŋu azã wò PGP dɔwɔnu atsɔ ame si wòle dzodzom na ƒe public key aɣlaŋlɔ email la.

Email si woɣlaŋlɔ la, ame si mekpɔ ame si wòle dzodzom na ƒe private key o la mate ŋu axlee o. Be ame si wòle dzodzom na la aɣe email la ƒe ɣaɣlaŋlɔŋlɔ, ate ŋu azã eƒe private key.

![PGP Email](/content-images/dafb761d-f399-40c9-9323-526ba3bd0bc4-98503ad98b.webp)

## Nɔnɔme Nyuiwo

Esiae nye nɔnɔme nyui aɖewo na PGP zazã:

* Lé wò private key ɖe dzidzɔme. Private key nye akpa vevitɔ kekeake le wò PGP key fli me. Ne ame aɖe xɔ wò private key la, ate ŋu aɣe mesaj siwo woɣlaŋlɔ kple wò public key la ƒe ɣaɣlaŋlɔŋlɔ.

![Best Practices 1](/content-images/39a6fae4-a9a1-4061-a97c-4a9b975f6383-eced005c8b.webp)

![Best Practices 2](/content-images/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd-50ca49a070.webp)

* Ma wò public key na ame siwo nèka ɖe wo ŋu. Àte ŋu ama wò public key na wo to eɖoɖo na wo tsitre, alo to eɖoɖo ɖe PGP keyserver dzi.
* Zã password sesẽwo na wò PGP keyring. Wò PGP keyring nye file si le wò PGP keyswo dzram. Ele vevie be nàzã password sesẽ atsɔ aɖo file sia.
* Lé wò PGP software ɖe yeyee. Wole PGP software yɔm ɣe sia ɣe be woaɖɔ nu vɔ̃wo eye woana dedie nadze edzi. Ele vevie be nàlé wò software ɖe yeyee be nàka ɖe edzi be èle dedie ƒe nɔnɔme yeyetɔwo zazã.

## Ale Si Nàɣlaŋlɔ Email Kple PGP

* Ʋu wò PGP software.
* Ʋu email si nèdi be nàɣlaŋlɔ.
* Zi "Encrypt" button dzi.
* Ŋlɔ ame si wòle dzodzom na ƒe public key.
* Zi "Encrypt" button dzi.
* Woaɣlaŋlɔ email la.

![Encrypt Email](/content-images/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e-6edd4a03ea.webp)

---

![Encryption Flow](/content-images/da1499e9-fc87-46b2-93ed-28d43cf1fd86-86fdc87d10.webp)

## Ale Si Nàɣe Email Ƒe Ɣaɣlaŋlɔŋlɔ Kple PGP

* Ʋu wò PGP software.
* Ʋu email si woɣlaŋlɔ.
* Zi "Decrypt" button dzi.
* Ŋlɔ wò private key.
* Zi "Decrypt" button dzi.
* Woaɣe email la ƒe ɣaɣlaŋlɔŋlɔ.

![Decrypt Email](/content-images/beae714c-020f-4c1e-aa4f-3dd9430670cc-1e9d38f1ef.webp)
