[![페이지 편집](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md)

# Zcash 지갑 자금 복구

**왜 개인키를 보관해야 하나요?**

개인키는 디지털 자산의 보안에 대한 비밀입니다. 이들을 안전하게 보관하고 제3자와 공유하지 않는 것은 필수적입니다.

> 이 맥락에서 **시드 구문**(Seed Phrase)은 개인키와 동일한 것으로 간주될 수 있습니다.

개인키를 유지함으로써 복구 과정이 항상 가능합니다. Zcash의 개인키는 두 가지 유형(투명 및 보호된)이 있으며, 이들을 지갑에 쉽게 가져올 수 있습니다. Sweep Funds 기능을 사용하거나 새 계좌로 가져오는 방법 등이 있습니다. 개인키를 유지함으로써 자산에 대한 전체적인 통제권을 유지할 수 있어 소유권, 보안 및 안정감을 확보할 수 있습니다.

# 보안과 책임

사용자가 개인키와 관련된 위험을 이해하고 이들을 비인가 접근으로부터 보호하는 것이 중요합니다. 자금의 보안은 사용자의 책임에 따라 결정됩니다.

## Ywallet을 통한 자금 복구

YWallet은 *투명만* 및 보호된 개인키에서 접근 불가능한 자금을 복구하기 위한 최고의 선택지 중 하나로 인정받고 있습니다.

### 1) 개인키 가져오기 

1. [Ywallet](https://ywallet.app) 다운로드

2. 열면 오른쪽 하단에 있는 'More' 클릭

3. 'Accounts' 선택

4. 우측 상단의 '+' 버튼 클릭

![더하기 버튼](https://i.postimg.cc/xJbVz7gB/plus.png)

5. '계좌 복구' 토글

6. 시드 구문 또는 개인키 입력

> **참고**: Trust, Coinomi, Guarda 등 보호 주소를 지원하지 않는 지갑에서 자금을 보유한 경우 'Sweep Funds' 기능을 사용해야 합니다.

### 2) 자금 가져오기

1. [Ywallet](https://ywallet.app) 다운로드

2. 열면 오른쪽 하단에 있는 'More' 클릭

3. 도구 섹션으로 스크롤 내리고 'Sweep' 클릭

4. 시드 구문 입력 (간격 제한은 시드가 생성한 추가 주소를 스캔합니다)

![자금 가져오기 화면](https://i.postimg.cc/3055CBcN/sweep.png)

5. 목적지로 사용하고 싶은 Value Pool 입력 (거래소는 투명을 사용)

6. 자금을 입금하고 싶은 목적지 주소 입력.

## Zkool

자금 복구의 또 다른 방법으로 Zkool 문서를 확인해 보세요:

- [Zkool Docs](https://hhanh00.github.io/zkool2/guide/start.html)
- [Github](https://github.com/hhanh00/zkool2/)

## ZExCavator

ZExCavator는 잃어버린 ZEC를 복구(굴착!)하는 도구입니다:

- [ZExCavator](https://zexcavator.com/)
- [Github](https://github.com/zingolabs/zexcavator)
