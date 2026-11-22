<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP)는 안전하지 않은 채널을 통해 안전하게 통신할 수 있도록 하는 암호화 소프트웨어 패키지입니다. PGP는 암호화(encryption)와 디지털 서명을 조합해 의도한 수신자만 메시지를 읽을 수 있고 발신자가 본인이라고 주장하는 사람과 일치하도록 합니다.

## 사용 가능한 도구

다양한 PGP 도구를 사용할 수 있으며, 널리 사용되는 도구는 다음과 같습니다.

* **[GnuPG (GPG)](https://gnupg.org/)**: 무료 오픈 소스 OpenPGP 명령줄 도구입니다. 운영 체제에 적합한 패키지나 그래픽 프런트엔드를 선택하세요.
* **[Thunderbird](https://www.openpgp.org/software/thunderbird/)**: 버전 78부터 OpenPGP 기능을 기본으로 제공하는 무료 오픈 소스 데스크톱 이메일 클라이언트입니다. 이메일을 암호화하는 데 Mailvelope가 필요하지 않습니다.
* **[Mailvelope](https://mailvelope.com/)**: Gmail을 비롯한 지원되는 웹메일 서비스에 OpenPGP 기능을 추가하는 오픈 소스 브라우저 확장 프로그램입니다. 웹메일 도구이며 Thunderbird용 확장 프로그램은 아닙니다.

![PGP Tools](/content-images/44984a75-800a-4f7a-94a5-88827e39b431-c66ef53a2b.webp)

## 키 생성 방법

PGP를 사용하려면 키 쌍을 생성해야 합니다. PGP 키를 생성하는 방법은 다음과 같습니다.

1. PGP 소프트웨어를 엽니다.
2. “키 생성” 버튼을 클릭합니다.
3. 이름과 이메일 주소를 입력합니다.
4. 키 길이를 선택합니다. 키가 길수록 보안성이 높아집니다.
5. “생성” 버튼을 클릭합니다.

이제 PGP 키 쌍이 생성됩니다.

![Generate Keys](/content-images/15721ce1-0a77-4ebe-87f4-33e1455f2a40-7699b1771d.webp)

## 이메일에 PGP를 사용하는 방법

PGP 키 쌍을 생성하면 이를 사용해 이메일을 암호화하고 복호화할 수 있습니다. 이메일을 암호화하려면 수신자의 공개 키를 알아야 합니다. 그런 다음 PGP 도구를 사용해 수신자의 공개 키로 이메일을 암호화할 수 있습니다.

수신자의 개인 키가 없는 사람은 암호화된 이메일을 읽을 수 없습니다. 이메일을 복호화하려면 수신자가 자신의 개인 키를 사용하면 됩니다.

![PGP Email](/content-images/dafb761d-f399-40c9-9323-526ba3bd0bc4-98503ad98b.webp)

## 모범 사례

PGP 사용 시 권장되는 모범 사례는 다음과 같습니다.

* 개인 키를 안전하게 보관하세요. 개인 키는 PGP 키 쌍에서 가장 중요한 부분입니다. 누군가 개인 키를 얻으면 공개 키로 암호화된 메시지를 모두 복호화할 수 있습니다.

![Best Practices 1](/content-images/39a6fae4-a9a1-4061-a97c-4a9b975f6383-eced005c8b.webp)

![Best Practices 2](/content-images/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd-50ca49a070.webp)

* 신뢰하는 사람들과 공개 키를 공유하세요. 공개 키를 직접 보내거나 PGP 키 서버에 업로드해 공유할 수 있습니다.
* PGP 키링에 강력한 비밀번호를 사용하세요. PGP 키링은 PGP 키를 저장하는 파일입니다. 이 파일을 보호하려면 강력한 비밀번호를 사용해야 합니다.
* PGP 소프트웨어를 최신 상태로 유지하세요. PGP 소프트웨어는 버그를 수정하고 보안을 개선하기 위해 계속 업데이트됩니다. 최신 보안 기능을 사용하려면 소프트웨어를 최신 상태로 유지해야 합니다.

## PGP로 이메일을 암호화하는 방법

* PGP 소프트웨어를 엽니다.
* 암호화할 이메일을 엽니다.
* “암호화” 버튼을 클릭합니다.
* 수신자의 공개 키를 입력합니다.
* “암호화” 버튼을 클릭합니다.
* 이메일이 암호화됩니다.

![Encrypt Email](/content-images/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e-6edd4a03ea.webp)

---

![Encryption Flow](/content-images/da1499e9-fc87-46b2-93ed-28d43cf1fd86-86fdc87d10.webp)

## PGP로 이메일을 복호화하는 방법

* PGP 소프트웨어를 엽니다.
* 암호화된 이메일을 엽니다.
* “복호화” 버튼을 클릭합니다.
* 개인 키를 입력합니다.
* “복호화” 버튼을 클릭합니다.
* 이메일이 복호화됩니다.

![Decrypt Email](/content-images/beae714c-020f-4c1e-aa4f-3dd9430670cc-1e9d38f1ef.webp)
