<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP), güvensiz kanallar üzerinden güvenli iletişim sağlayan bir kriptografik yazılım paketidir. PGP, yalnızca hedeflenen alıcının bir mesajı okuyabilmesini ve gönderenin iddia ettiği kişi olmasını sağlamak için şifreleme ile dijital imzaların bir kombinasyonunu kullanır.

## Mevcut Araçlar

Kullanılabilir birçok farklı PGP aracı vardır, ancak en popüler olanlardan bazıları şunlardır:

* **[GPG](https://gpgtools.org/)**: GPG, Windows, macOS ve Linux için kullanılabilen ücretsiz ve açık kaynaklı bir PGP uygulamasıdır.
* **[PGPMail](https://www.openpgp.org/software/)**: PGPMail, Windows ve macOS için kullanılabilen ticari bir PGP e-posta istemcisidir.
* **[Mailvelope](https://www.comparitech.com/blog/information-security/pgp-encryption-gmail/)**: Mailvelope, Gmail ve Thunderbird için ücretsiz ve açık kaynaklı bir PGP eklentisidir.

![PGP Tools](https://github.com/ZecHub/zechub/assets/81990132/44984a75-800a-4f7a-94a5-88827e39b431)

## Anahtarlar Nasıl Oluşturulur

PGP kullanmak için bir anahtar çifti oluşturmanız gerekir: PGP anahtarları nasıl oluşturulur:

1. PGP yazılımınızı açın.
2. "Generate Key" düğmesine tıklayın.
3. Adınızı ve e-posta adresinizi girin.
4. Anahtar uzunluğunu seçin. Anahtar uzunluğu ne kadar büyükse, anahtarlarınız o kadar güvenli olur.
5. "Generate" düğmesine tıklayın.

PGP anahtar çiftiniz oluşturulacaktır.

![Generate Keys](https://github.com/ZecHub/zechub/assets/81990132/15721ce1-0a77-4ebe-87f4-33e1455f2a40)

## E-posta için PGP Nasıl Kullanılır

Bir PGP anahtar çifti oluşturduktan sonra, bunu e-postaları şifrelemek ve şifrelerini çözmek için kullanabilirsiniz. Bir e-postayı şifrelemek için alıcının açık anahtarını bilmeniz gerekir. Ardından PGP aracınızı kullanarak e-postayı alıcının açık anahtarıyla şifreleyebilirsiniz.

Şifrelenmiş e-posta, alıcının özel anahtarına sahip olmayan hiç kimse tarafından okunamaz. E-postanın şifresini çözmek için alıcı, e-postanın şifresini çözmek üzere kendi özel anahtarını kullanabilir.

![PGP Email](https://github.com/ZecHub/zechub/assets/81990132/dafb761d-f399-40c9-9323-526ba3bd0bc4)

## En İyi Uygulamalar

PGP kullanımı için bazı en iyi uygulamalar şunlardır:

* Özel anahtarınızı güvende tutun. Özel anahtar, PGP anahtar çiftinizin en önemli parçasıdır. Birisi özel anahtarınızı ele geçirirse, açık anahtarınızla şifrelenmiş tüm mesajların şifresini çözebilir.

![Best Practices 1](https://github.com/ZecHub/zechub/assets/81990132/39a6fae4-a9a1-4061-a97c-4a9b975f6383)

![Best Practices 2](https://github.com/ZecHub/zechub/assets/81990132/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd)

* Açık anahtarınızı güvendiğiniz kişilerle paylaşın. Açık anahtarınızı onlara doğrudan göndererek veya bir PGP anahtar sunucusuna yükleyerek paylaşabilirsiniz.
* PGP anahtarlığınız için güçlü parolalar kullanın. PGP anahtarlığınız, PGP anahtarlarınızı saklayan bir dosyadır. Bu dosyayı korumak için güçlü bir parola kullanmak önemlidir.
* PGP yazılımınızı güncel tutun. PGP yazılımı, hataları düzeltmek ve güvenliği artırmak için sürekli güncellenir. En son güvenlik özelliklerini kullandığınızdan emin olmak için yazılımınızı güncel tutmanız önemlidir.

## PGP ile bir e-posta nasıl şifrelenir

* PGP yazılımınızı açın.
* Şifrelemek istediğiniz e-postayı açın.
* "Encrypt" düğmesine tıklayın.
* Alıcının açık anahtarını girin.
* "Encrypt" düğmesine tıklayın.
* E-posta şifrelenecektir.

![Encrypt Email](https://github.com/ZecHub/zechub/assets/81990132/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e)

---

![Encryption Flow](https://github.com/ZecHub/zechub/assets/81990132/da1499e9-fc87-46b2-93ed-28d43cf1fd86)

## PGP ile bir e-postanın şifresi nasıl çözülür

* PGP yazılımınızı açın.
* Şifrelenmiş e-postayı açın.
* "Decrypt" düğmesine tıklayın.
* Özel anahtarınızı girin.
* "Decrypt" düğmesine tıklayın.
* E-postanın şifresi çözülecektir.

![Decrypt Email](https://github.com/ZecHub/zechub/assets/81990132/beae714c-020f-4c1e-aa4f-3dd9430670cc)
