<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Halaman"/>
</a>

# Keamanan Ekosistem Zcash

## Ecosystem Security Lead

Peran Zcash Ecosystem Security Lead dibentuk melalui hibah ZCG untuk menyediakan rekayasa keamanan khusus bagi ekosistem Zcash yang lebih luas — khususnya penerima hibah ZCG — di luar ECC dan ZF.

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) menjabat sebagai Ecosystem Security Lead pertama. Pelajari lebih lanjut di [zecsec.com](https://zecsec.com).
- **2024–2025:** ZCG memilih [Least Authority](https://leastauthority.com) untuk melanjutkan peran tersebut melalui [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723) baru. Pembaruan dapat ditemukan [di sini](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).
- **2026:** Shielded Labs [menunjuk Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) sebagai konsultan keamanan untuk memperkuat kemampuan keamanan Zcash.

## Inisiatif Pengungkapan Kerentanan & Keamanan ZCG

Inisiatif Pengungkapan Keamanan & Kerentanan [ZCG](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) menyediakan kerangka kerja untuk pengungkapan kerentanan keamanan yang terkoordinasi di seluruh ekosistem Zcash.

## Pembaruan Keamanan Terbaru (2026)

- **Zebra 4.4.1 (Mei 2026):** Perbaikan keamanan kritis ](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588) dari [ telah dirilis. Semua operator node sangat disarankan untuk segera melakukan upgrade.
- **Zebra 4.3.1 (April 2026):** Perbaikan keamanan kritis, penambangan dockerized, dan penguatan CI ](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389) telah dirilis [.
- **Berbagai Kerentanan Telah Diperbaiki (April 2026):** Beberapa kerentanan Zcash dari [ berhasil ditambal ](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388) tanpa memengaruhi dana atau privasi pengguna.
- **Pemberitahuan zcashd (April 2026):** Pemberitahuan untuk mengurangi permukaan serangan ](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) dari [ dengan mengarahkan lalu lintas melalui Zebra zcashd.

## Pengungkapan yang Bertanggung Jawab

Baik Electric Coin Company maupun Zcash Foundation sama-sama mematuhi standar [Pengungkapan Bertanggung Jawab](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) berikut dengan penyimpangan sebagai berikut:

> "Zcash adalah teknologi yang menyediakan privasi yang kuat. Catatan dienkripsi ke tujuannya, dan kemudian basis moneter dijaga melalui zero-knowledge proofs yang dimaksudkan agar hanya dapat dibuat oleh pemegang asli dari Zcash. Jika hal ini gagal, dan bug pemalsuan terjadi, bug pemalsuan tersebut mungkin dieksertasi tanpa ada cara bagi analis blockchain untuk mengidentifikasi pelaku atau data mana dalam blockchain yang telah digunakan untuk mengeksploitasi bug tersebut. Oleh karena itu, rollback sebelum titik tersebut, seperti yang telah dilakukan pada beberapa proyek lain dalam kasus serupa, adalah mustahil. Standar ini menjelaskan pelaporan kerentanan termasuk detail lengkap dari suatu masalah, guna mereproduksinya. Hal ini diperlukan, misalnya, dalam kasus peneliti eksternal yang mendemonstrasikan sekaligus membuktikan bahwa memang benar ada masalah keamanan, dan masalah keamanan tersebut benar-benar memiliki dampak seperti yang mereka katakan — sehingga memungkinkan tim pengembang untuk memprioritaskan dan menyelesaikan masalah tersebut secara akurat. Namun, dalam kasus bug pemalsuan, sama seperti pada CVE-2019-7167, kami mungkin memutuskan untuk tidak menyertakan detail tersebut dalam laporan kami kepada mitra sebelum rilis terkoordinasi, selama kami yakin bahwa mereka rentan."

## Sumber Daya Keamanan

- [Zcash Saran Keamanan](https://github.com/zcash/zcash/security/advisories)
- [Zebra Saran Keamanan](https://github.com/ZcashFoundation/zebra/security/advisories)
- [Laporkan Kerentanan di zcash/zcash](https://github.com/zcash/zcash/security/policy)
- [Laporkan Kerentanan ke ZF](https://github.com/ZcashFoundation/zebra/security/policy)