# 워크숍 3일차



## 데이터 분석

* 특수한 시스템, 도구 및 기술을 사용하여 원시 데이터를 분석하는 과학으로, 패턴, 트렌드, 통찰을 파악합니다


이 과정에는 다음과 같은 단계가 포함됩니다:
```markdown
                     \
-> 수집         \
-> 정리     =====  \  데이터
-> 조직화   =====  / 
-> 변환       /
-> 최적화        /
```




## Zcash 

* 암호화된 전자 현금. 개인 대 개인의 비공개 결제를 위해 제로 지식 암호화 기술을 처음으로 개발한 첫 번째 암호 화폐입니다.

참고: 정확하고 신뢰할 수 있는 데이터가 필요하다면, 자신의 전체 노드 [zebrad]를 실행하는 것이 좋습니다. 완전하고 견고한 솔루션을 원한다면
z3 인프라 [ zebrad + zainod/lightwalletd + "선택한 지갑"]을 설정할 수 있습니다. 데이터는 RPC(Remote Procedure Calls)를 통해 접근합니다.


이가 어떻게 작동하는지에 대한 빠른 시연을 보려면 이 비디오를 시청해보세요:


https://www.youtube.com/watch?v=Ok9Wa8FNbMA


## 워크숍 시연

이 워크숍은 지갑 수준에서 데이터를 수집하고 변환하는 것에 초점을 맞출 것입니다. 이 수준은 대부분의 사람들이 Zcash 블록체인에 접근할 때 사용하는 수준입니다.


### 사례 (Zkool에서 주어진 계정의 모든 거래 내역을 포함한 .csv 파일 생성)

이 시나리오는 디지털 개인 재무를 정리하고 최적화해야 하는 상황에서 자주 발생합니다.

#### 단계 1

Zkool을 열고 사용할 계좌를 선택하세요

참고: 이 시연에서는 테스트넷 지갑을 사용할 것입니다.

참고2: 여기서 Zkool을 선택하지만, 내보내기 기능이 있는 어떤 지갑도 작동합니다!

https://github.com/hhanh00/zkool2

<img width="1496" height="646" alt="1" src="https://github.com/user-attachments/assets/125adfe8-6be3-4798-8ee8-b96bba9fb9ac" />



#### 단계 2


우측 상단 메뉴로 이동하여 "거래 내보내기"를 선택하세요

<img width="1398" height="718" alt="2" src="https://github.com/user-attachments/assets/4287ceb6-669b-4ef0-ba24-3f7e2d9860b6" />


#### 단계 3

데이터를 변환하기 위해 사용할 bash 스크립트를 다운로드하세요. 개발자 분들께서는 bash를 사용할 것이며, 이는 대부분의 리눅스 배포판에서 표준입니다. 하지만 원하는 언어를 사용해도 됩니다.

비개발자나 처음 시작하는 학생이라면 AI를 활용하세요!

시작에 도움이 될 수 있는 몇 가지 예제 프롬프트:

"bash/rust/python/ ... 등으로 CSV 파일을 변환하는 방법은?"

<img width="1098" height="480" alt="3" src="https://github.com/user-attachments/assets/6503f4be-6fbc-473f-919c-8914e09181bc" />

참고: AI는 일반적으로 비공개가 아니므로, 학생으로서 사용할 때 특히 주의해야 합니다!

#### 단계 4

스크립트를 설정하고 실행합니다.

`chmod +x cleanCSV.sh`

`./cleanCSV.sh "내보내기 백업 이름"`

#### 단계 5 데이터 활용

LibreOffice 또는 기타 CSV 뷰어에서 열어 사용하세요!



<img width="2132" height="942" alt="4" src="https://github.com/user-attachments/assets/1097030d-c0f4-44c4-b15c-f86706a77bdc" />
