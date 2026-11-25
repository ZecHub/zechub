<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP), güvenli olmayan kanallar üzerinden güvenli iletişim sağlayan bir kriptografik yazılım paketidir. PGP, yalnızca hedeflenen alıcının mesajı okuyabilmesini ve gönderenin iddia ettiği kişi olmasını sağlamak için şifreleme ve dijital imzaların birleşimini kullanır.

## Kullanılabilir Araçlar

Kullanılabilir birçok farklı PGP aracı vardır. En popüler olanlardan bazıları şunlardır:

* **[GnuPG (GPG)](https://gnupg.org/)**: Ücretsiz ve açık kaynaklı bir OpenPGP komut satırı aracıdır. İşletim sisteminize uygun paketi veya grafik arayüzünü seçin.
* **[Thunderbird](https://www.openpgp.org/software/thunderbird/)**: 78. sürümden itibaren yerleşik OpenPGP desteği sunan, ücretsiz ve açık kaynaklı bir masaüstü e-posta istemcisidir. E-postaları şifrelemek için Mailvelope gerekmez.
* **[Mailvelope](https://mailvelope.com/)**: Gmail dâhil olmak üzere desteklenen web posta hizmetlerine OpenPGP ekleyen açık kaynaklı bir tarayıcı uzantısıdır. Bu bir web posta aracıdır; Thunderbird için bir uzantı değildir.

![PGP araçları](/content-images/44984a75-800a-4f7a-94a5-88827e39b431-c66ef53a2b.webp)

## Anahtarlar Nasıl Oluşturulur

PGP kullanmak için bir anahtar çifti oluşturmanız gerekir. PGP anahtarları şu şekilde oluşturulur:

1. PGP yazılımınızı açın.
2. “Anahtar Oluştur” düğmesine tıklayın.
3. Adınızı ve e-posta adresinizi girin.
4. Anahtar uzunluğunu seçin. Anahtar ne kadar uzunsa anahtarlarınız o kadar güvenli olur.
5. “Oluştur” düğmesine tıklayın.

PGP anahtar çiftiniz oluşturulacaktır.

![Generate Keys](/content-images/15721ce1-0a77-4ebe-87f4-33e1455f2a40-7699b1771d.webp)

## E-posta İçin PGP Nasıl Kullanılır

Bir PGP anahtar çifti oluşturduktan sonra e-postaları şifrelemek ve şifrelerini çözmek için bu anahtar çiftini kullanabilirsiniz. Bir e-postayı şifrelemek için alıcının açık anahtarını bilmeniz gerekir. Ardından PGP aracınızı kullanarak e-postayı alıcının açık anahtarıyla şifreleyebilirsiniz.

Şifrelenmiş e-posta, alıcının özel anahtarına sahip olmayan kişiler tarafından okunamaz. E-postanın şifresini çözmek için alıcı, özel anahtarını kullanabilir.

![PGP e-postası](/content-images/dafb761d-f399-40c9-9323-526ba3bd0bc4-98503ad98b.webp)

## En İyi Uygulamalar

PGP kullanırken uygulayabileceğiniz bazı en iyi yöntemler şunlardır:

* Özel anahtarınızı güvende tutun. Özel anahtar, PGP anahtar çiftinizin en önemli parçasıdır. Birisi özel anahtarınızı ele geçirirse açık anahtarınızla şifrelenmiş tüm mesajların şifresini çözebilir.

![En iyi uygulamalar 1](/content-images/39a6fae4-a9a1-4061-a97c-4a9b975f6383-eced005c8b.webp)

![En iyi uygulamalar 2](/content-images/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd-50ca49a070.webp)

* Açık anahtarınızı güvendiğiniz kişilerle paylaşın. Açık anahtarınızı doğrudan göndererek veya bir PGP anahtar sunucusuna yükleyerek paylaşabilirsiniz.
* PGP anahtar zinciriniz için güçlü parolalar kullanın. PGP anahtar zinciriniz, PGP anahtarlarınızı saklayan bir dosyadır. Bu dosyayı korumak için güçlü bir parola kullanmanız önemlidir.
* PGP yazılımınızı güncel tutun. PGP yazılımları hataları gidermek ve güvenliği artırmak için sürekli güncellenir. En yeni güvenlik özelliklerini kullandığınızdan emin olmak için yazılımınızı güncel tutmanız önemlidir.

## PGP ile e-posta nasıl şifrelenir

* PGP yazılımınızı açın.
* Şifrelemek istediğiniz e-postayı açın.
* “Şifrele” düğmesine tıklayın.
* Alıcının açık anahtarını girin.
* “Şifrele” düğmesine tıklayın.
* E-posta şifrelenecektir.

![Encrypt Email](/content-images/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e-6edd4a03ea.webp)

---

![Şifreleme akışı](/content-images/da1499e9-fc87-46b2-93ed-28d43cf1fd86-86fdc87d10.webp)

## PGP ile e-postanın şifresi nasıl çözülür

* PGP yazılımınızı açın.
* Şifrelenmiş e-postayı açın.
* “Şifreyi Çöz” düğmesine tıklayın.
* Özel anahtarınızı girin.
* “Şifreyi Çöz” düğmesine tıklayın.
* E-postanın şifresi çözülecektir.

![Decrypt Email](/content-images/beae714c-020f-4c1e-aa4f-3dd9430670cc-1e9d38f1ef.webp)
