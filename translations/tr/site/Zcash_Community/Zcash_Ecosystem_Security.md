<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Zcash Ekosistem Güvenliği

## Ekosistem Güvenliği Lideri

Zcash Ekosistem Güvenliği Lideri rolü, ECC ve ZF dışında, daha geniş Zcash ekosistemi — özellikle de ZCG hibe alıcıları — için özel güvenlik mühendisliği sağlamak amacıyla bir ZCG hibesi aracılığıyla oluşturulmuştur.

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090), ilk Ekosistem Güvenliği Lideri olarak görev yaptı. Daha fazla bilgi için [zecsec.com](https://zecsec.com) adresine bakın.
- **2024–2025:** ZCG, rolü yeni bir [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723) aracılığıyla sürdürmesi için [Least Authority](https://leastauthority.com)'yi seçti. Güncellemeler [burada](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541) bulunabilir.
- **2026:** Shielded Labs, Zcash'ın güvenlik kabiliyetlerini güçlendirmek için [Taylor Hornby ile anlaştı](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) ve onu güvenlik danışmanı olarak görevlendirdi.

## ZCG Güvenlik ve Güvenlik Açığı Açıklama Girişimi

[ZCG Güvenlik ve Güvenlik Açığı Açıklama Girişimi](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545), Zcash ekosistemi genelinde güvenlik açıklarının koordineli biçimde açıklanması için bir çerçeve sunar.

## Son Güvenlik Güncellemeleri (2026)

- **Zebra 4.4.1 (Mayıs 2026):** [Kritik güvenlik düzeltmesi](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588) yayımlandı. Tüm node operatörlerinin derhal yükseltme yapması tavsiye edilir.
- **Zebra 4.3.1 (Nisan 2026):** [Kritik güvenlik düzeltmeleri, dockerized mining ve CI güçlendirmesi](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389) yayımlandı.
- **Birden Fazla Güvenlik Açığı Giderildi (Nisan 2026):** [Çeşitli Zcash güvenlik açıkları başarıyla yamalandı](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388); bu süreç kullanıcı fonlarını veya gizliliği etkilemedi.
- **zcashd Uyarısı (Nisan 2026):** Trafiği Zebra üzerinden yönlendirerek [zcashd saldırı yüzeyini azaltmaya yönelik tavsiye](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390).

## Sorumlu Açıklama

Electric Coin Company ve Zcash Foundation, aşağıdaki sapmayla birlikte bu Sorumlu Açıklama [standardına](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) uymaktadır:

> "Zcash, güçlü gizlilik sağlayan bir teknolojidir. Notes, hedeflerine şifrelenir ve ardından para arzı, yalnızca gerçek Zcash sahibinin oluşturabileceği şekilde tasarlanmış sıfır bilgi ispatları aracılığıyla korunur. Eğer bu başarısız olur ve bir sahtecilik hatası ortaya çıkarsa, bu sahtecilik hatası, blockchain analizcilerinin faili ya da blockchain'deki hangi verilerin hatayı istismar etmek için kullanıldığını tespit etmesinin hiçbir yolu olmadan istismar edilebilir. Bu nedenle, bazı diğer projelerde bu tür durumlarda uygulanmış olanlar gibi, o noktadan önceye dönük rollback'ler imkânsızdır. Standart, güvenlik açıklarını bildiren kişilerin bir sorunun tüm ayrıntılarını, onu yeniden üretmek amacıyla dahil etmesini tarif eder. Bu, örneğin harici bir araştırmacının gerçekten bir güvenlik sorunu olduğunu ve bu güvenlik sorununun gerçekten söylediği etkiye sahip olduğunu hem göstermesi hem de kanıtlaması durumunda gereklidir — böylece geliştirme ekibi sorunu doğru şekilde önceliklendirebilir ve çözebilir. Ancak bir sahtecilik hatası durumunda, tıpkı CVE-2019-7167'de olduğu gibi, koordineli sürümden önce partnerlere sunduğumuz raporlara bu ayrıntıları dahil etmemeye karar verebiliriz; yeter ki onların savunmasız olduğundan emin olalım."

## Güvenlik Kaynakları

- [Zcash Güvenlik Danışmaları](https://github.com/zcash/zcash/security/advisories)
- [Zebra Güvenlik Danışmaları](https://github.com/ZcashFoundation/zebra/security/advisories)
- [ECC'ye Güvenlik Açığı Bildirin](https://electriccoin.co/blog/disclosure-of-a-major-bug-in-cryptonote-based-currencies/)
- [ZF'ye Güvenlik Açığı Bildirin](https://zfnd.org/contact/)
