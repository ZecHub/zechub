# Zkool 다중 서명 가이드

이 가이드에서는 Zkool을 사용해 다중 서명 거래를 수행하는 방법을 단계별로 안내합니다. 계정 생성, 자금 송금 및 수신, 다중 서명을 위한 분산 키 생성(DKG) 설정 방법을 다룹니다. 주요 단계마다 스크린샷이 포함되어 있습니다.

## 튜토리얼

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Zkool Demo | The Successor to Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. 계정 생성


1. **Zkool 앱**을 열고 **New Account**로 이동합니다.


![img1](/content-images/ee906e49-361a-49b6-9484-904897fe2e3f-074e400a9c.webp)

3. **계정 이름**을 입력합니다(예: Anabelle).  
   

![img2](/content-images/e9c325d3-8507-433a-a0c6-6e8c1ea2a254-a637810ed5.webp)


4. 필요한 경우 **Use Internal Change** 또는 **Restore Account**를 선택적으로 켭니다.


5. 계정을 생성하면 **계정 목록**에 표시됩니다.  


![img3](/content-images/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb-971cf76b33.webp)


## 2. 자금 받기

각 계정에는 여러 유형의 주소가 생성됩니다.

**통합 주소**

**Orchard 전용 주소**

**Sapling 주소**
  
**투명 주소**


사용할 주소 유형을 선택해 공유하면 자금을 받을 수 있습니다.  


![img4](/content-images/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d-a0d6a4e7b7.webp)





## 3. 자금 보내기

1. **수신자** 섹션으로 이동합니다.  


![img5](/content-images/9f3a03b9-dd56-450c-a8dc-4370f9289138-3217d846b7.webp)


3. **수신자 주소**를 입력합니다.  

4. **금액**과 선택 사항인 **메모**를 지정합니다.  

5. 거래 세부 정보를 확인하고 **확인**을 선택합니다.  


완료되면 계정 목록의 잔액이 업데이트됩니다.  


![img6](/content-images/6e6da76b-cd18-4567-a5c0-74f07ddefc64-78dc3362dc.webp)


## 4. 다중 서명 거래 수행: 분산 키 생성 설정(다중 서명)

Zkool의 다중 서명은 여러 참여자가 공유 계정을 제어할 수 있도록 **분산 키 생성(DKG)**을 사용합니다.



### 1단계: DKG 시작
공유 지갑의 **이름**을 선택합니다(예: Anabelle).

**참여자 수**를 설정합니다.
  
**참여자 ID**를 선택합니다.
  
**필요한 서명자 수(임계값)**를 지정합니다.
    
**자금 계정**을 선택합니다.
  

![img7](/content-images/8a90ca85-5439-4937-b16d-a570e69d55f0-1477202a57.webp)



### 2단계: 참여자 주소 추가
- 각 참여자의 **통합 주소**를 입력합니다(권장).


**참고:** Orchard 전용 주소나 Sapling 전용 주소를 사용하면 다중 서명은 해당 풀(Orchard 또는 Sapling)로만 제한됩니다.  
따라서 공유 지갑은 다른 풀에서 자금을 받을 수 없습니다.  
호환성과 유연성을 최대한 확보하려면 항상 **통합 주소**를 사용하세요.  


### 3단계: DKG 라운드 실행
모든 참여자가 **1라운드**와 **2라운드** 패키지를 교환할 때까지 기다립니다.  


![img8](/content-images/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4-b6bb50bbab.webp)



### 4단계: 공유 주소 확정
완료되면 **공유 주소**가 생성됩니다.  


![img9](/content-images/741d1bc6-0102-4e67-bb83-9a1c184bd747-a508ea0371.webp)



## 결론

Zkool을 사용하면 계정을 생성하고, 자금을 보내고 받을 수 있으며, 분산 키 생성을 통해 **다중 서명 지갑**을 설정할 수 있습니다. 이를 통해 **보안이 강화**되고 **협력적이고 비공개적인 자금 관리**가 가능합니다.  
