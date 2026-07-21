<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP)는 보안이 취약한 채널을 통해 안전한 통신을 제공하는 암호화 소프트웨어 패키지입니다. PGP는 암호화와 디지털 서명을 결합하여 메시지를 받는 사람이 누구인지 확인하고, 메시지를 읽을 수 있는 사람은 원래의 수신자만 되도록 보장합니다.

## 사용 가능한 도구

다양한 PGP 도구가 있지만, 가장 인기 있는 몇 가지 도구는 다음과 같습니다:

* **[GPG](https://gpgtools.org/)**: GPG는 Windows, macOS 및 Linux에서 사용할 수 있는 무료이고 오픈소스인 PGP 구현입니다.
* **[PGPMail](https://www.openpgp.org/software/)**: PGPMail은 Windows와 macOS에서 사용 가능한 상용 PGP 이메일 클라이언트입니다.
* **[Mailvelope](https://www.comparitech.com/blog/information-security/pgp-encryption-gmail/)**: Mailvelope는 Gmail과 Thunderbird에 사용되는 무료이고 오픈소스인 PGP 확장 프로그램입니다.

![PGP Tools](https://github.com/ZecHub/zechub/assets/81990132/44984a75-800a-4f7a-94a5-88827e39b431)

## 키 생성 방법

PGP를 사용하려면 키 쌍을 생성해야 합니다: PGP 키를 생성하는 방법은 다음과 같습니다:

1. PGP 소프트웨어를 열고,
2. "키 생성" 버튼을 클릭하고,
3. 이름과 이메일 주소를 입력한 후,
4. 키 길이를 선택합니다. 키 길이가 더 길수록 보안성이 높아집니다.
5. "생성" 버튼을 클릭하면 됩니다.

PGP 키 쌍이 생성됩니다.

![Generate Keys](https://github.com/ZecHub/zechub/assets/81990132/15721ce1-0a77-4ebe-87f4-33e1455f2a40)

## PGP를 사용한 이메일 사용 방법

PGP 키 쌍을 생성한 후에는 이를 이용해 이메일을 암호화하고 복호화할 수 있습니다. 이메일을 암호화하려면 수신자의 공개 키가 필요합니다. 그런 다음 PGP 도구를 사용하여 수신자의 공개 키로 이메일을 암호화할 수 있습니다.

암호화된 이메일은 수신자의 개인 키를 가지고 있지 않은 사람에게는 읽을 수 없습니다. 수신자는 자신의 개인 키를 이용해 이메일을 복호화할 수 있습니다.

![PGP Email](https://github.com/ZecHub/zechub/assets/81990132/dafb761d-f399-40c9-9323-526ba3bd0bc4)

## 권장 사항

PGP를 사용하는 데 있어 다음과 같은 권장사항이 있습니다:

* 개인 키는 안전하게 보관하세요. 개인 키는 PGP 키 쌍에서 가장 중요한 부분입니다. 누군가 당신의 개인 키를 얻으면, 당신의 공개 키로 암호화된 메시지를 복호화할 수 있습니다.
  
![Best Practices 1](https://github.com/ZecHub/zechub/assets/81990132/39a6fae4-a9a1-4061-a97c-4a9b975f6383)

![Best Practices 2](https://github.com/ZecHub/zechub/assets/81990132/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd)

* 신뢰할 수 있는 사람에게 공개 키를 공유하세요. 직접 전송하거나 PGP 키 서버에 업로드하여 공개 키를 공유할 수 있습니다.
* PGP 키링에 강력한 비밀번호를 사용하세요. PGP 키링은 PGP 키를 저장하는 파일입니다. 이 파일을 보호하기 위해 강력한 비밀번호를 사용하는 것이 중요합니다.
* PGP 소프트웨어는 항상 최신 상태로 유지하세요. PGP 소프트웨어는 버그 수정과 보안성 향상을 위해 지속적으로 업데이트되고 있습니다. 최신 보안 기능을 활용하기 위해 소프트웨어를 최신 상태로 유지하는 것이 중요합니다.

## PGP로 이메일 암호화 방법

* PGP 소프트웨어를 열고,
* 암호화하고자 하는 이메일을 엽니다.
* "암호화" 버튼을 클릭합니다.
* 수신자의 공개 키를 입력합니다.
* "암호화" 버튼을 클릭합니다.
* 이메일이 암호화됩니다.

![Encrypt Email](https://github.com/ZecHub/zechub/assets/81990132/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e)

---

![Encryption Flow](https://github.com/ZecHub/zechub/assets/81990132/da1499e9-fc87-46b2-93ed-28d43cf1fd86)

## PGP로 이메일 복호화 방법

* PGP 소프트웨어를 열고,
* 암호화된 이메일을 엽니다.
* "복호화" 버튼을 클릭합니다.
* 개인 키를 입력합니다.
* "복호화" 버튼을 클릭합니다.
* 이메일이 복호화됩니다.

![Decrypt Email](https://github.com/ZecHub/zechub/assets/81990132/beae714c-020f-4c1e-aa4f-3dd9430670cc)
