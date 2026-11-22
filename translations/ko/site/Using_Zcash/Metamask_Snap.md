<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# MetaMask Zcash Snap 통합 가이드

> MetaMask 브라우저 확장 프로그램에서 ChainSafe의 Zcash Snap와 WebZjs 웹 지갑을 사용해 보호된 ZEC를 보관하고 전송하세요.

## 요약

* ChainSafe Zcash Snap은 데스크톱(Chrome, Edge, Firefox)의 MetaMask에 보호된 ZEC를 추가합니다. 별도의 Zcash 소프트웨어는 필요하지 않습니다.
* Zcash 키는 MetaMask 복구 문구에서 파생됩니다. 이제 이 문구 하나로 ETH와 ZEC를 모두 보호할 수 있습니다.
* ZEC는 WebZjs 지갑(webzjs.chainsafe.dev)에서 관리하며, MetaMask 자체 자산 목록에서는 관리하지 않습니다.
* 계정에 통합 주소가 생성되므로, 전송자는 지원하는 풀 중 가장 높은 프라이버시를 제공하는 풀을 통해 자금을 보냅니다.
* 스왑(예: ETH를 ZEC로)하거나 거래소에서 ZEC를 보호된 주소로 출금해 지갑에 자금을 넣으세요.
* 복구하려면 MetaMask와 Snap를 다시 설치한 다음 기존 복구 문구를 가져오세요.

## 핵심 설명

MetaMask Snap는 MetaMask에 새로운 블록체인을 사용할 수 있게 하는 작고 샌드박스화된 추가 기능입니다. ChainSafe가 개발하고 Hacken의 감사를 받은 Zcash Snap를 사용하면 MetaMask가 기존 복구 문구에서 Zcash 키를 파생하고 Zcash 트랜잭션에 서명할 수 있습니다.

MetaMask 자체에는 ZEC 잔액이 표시되지 않습니다. 대신 WebZjs 웹 지갑이 Snap에 연결되고, lightwalletd 서버를 통해 Zcash 네트워크와 동기화하여 주소와 잔액을 표시합니다. 보호된 증명은 브라우저에서 WebAssembly를 사용해 계산하므로 전송에 시간이 조금 걸릴 수 있습니다.

아래 단계에서는 Snap 설치, WebZjs 연결, 지갑에 자금 넣기, 송수신, 통합 주소 구성 요소 확인 방법을 안내합니다.

## 전체 가이드

전체 과정과 시각적 설명을 보려면 다음 [**YouTube 가이드**](https://www.youtube.com/watch?v=UJh9Ilkohdw)를 시청하세요: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="How to use ZEC on Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMask에서 이제 **보호된 Zcash(ZEC)**를 지원합니다. **ChainSafe가 개발한 Zcash Snap**를 통해 브라우저 지갑에서 비공개 ZEC를 직접 보내고 받고 관리할 수 있습니다. **Hacken의 감사**를 받았으며 **공식 MetaMask Snaps Directory**에 등록되어 있습니다. 별도의 **Zcash 소프트웨어** 없이 MetaMask와 Snap만 있으면 됩니다.

---

## **사전 준비 사항**


> [**MetaMask 확장 프로그램**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/)(데스크톱 전용) - Chrome, Edge 또는 Firefox.
> MetaMask 계정 - 시드 문구를 안전하게 보관하세요. Snap가 이 문구에서 Zcash 키를 파생합니다.  
> 안정적인 인터넷 연결 - Zcash 네트워크와 동기화하는 데 필요합니다.  
> 자금 - ZEC로 스왑할 ETH 또는 거래소에서 출금할 ZEC.

> **팁:** MetaMask 복구 문구를 안전하게 보관하세요. 이 문구로 ETH와 ZEC를 모두 관리합니다.

---

## **1. Zcash Snap 설치**

1. [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/)로 이동합니다.  
2. [**"Zcash WebZjs Wallet"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) 또는 [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/)을 검색합니다.  
3. **설치/MetaMask에 추가**를 클릭합니다.
4. 다음과 같은 권한을 승인합니다:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (선택 사항) Zcash 네트워크 추가**

MetaMask에서 **네트워크 추가**를 선택하고 다음 정보를 입력합니다:

**BNB SmartChain**의 경우;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
네트워크 정보와 블록 탐색기 링크를 사용할 수 있습니다.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

**Zcash Mainnet**의 경우;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks`는 [zec.rocks](https://zec.rocks)(@emersonian)가 운영하는 WebZjs 호환(gRPC-web) lightwalletd 서버입니다. 테스트넷에는 `https://zjs.zec.rocks/testnet`를 사용하세요. WebZjs 웹 지갑을 직접 운영한다면 이 값을 `LIGHTWALLETD_PROXY`로 설정하세요.

---

## **3. ChainSafe WebZjs 지갑에 연결**

1. [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev)를 방문합니다.  
2. **MetaMask Snap 연결**을 클릭합니다.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. 연결을 승인합니다.  
4. 다음을 포함한 Zcash 계정 요약을 확인합니다:
   - 통합 주소 및 투명 주소

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. 동기화가 완료될 때까지 기다립니다.




---

## **4. 지갑에 자금 넣기**

> **ETH -> ZEC 스왑** - **LeoDex** 같은 서비스를 사용하고 보호된 주소로 전송합니다.  
> **거래소 출금** - 구매한 ZEC를 WebZjs 보호된 주소로 출금합니다.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => **완전한 프라이버시**를 위해 보호된(z) 주소를 사용하세요.

---

## **5. ZEC 송수신**

1. **WebZjs**에서 **잔액 전송**으로 이동합니다.  
2. 다음을 입력합니다:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. MetaMask에서 트랜잭션을 확인합니다(트랜잭션에 서명).
5. 확인이 끝나면 받은 자금이 WebZjs에 표시됩니다.

---

## **6. 확인 및 문제 해결**

> 잔액이 최신 상태인지 **WebZjs**에서 확인하세요. **(MetaMask에는 ZEC가 직접 표시되지 않습니다)** .  
> 문제가 발생하면:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **보안 팁:** 감사를 받은 **ChainSafe Snap**만 설치하고, 승인 전에 권한을 확인하세요.

---

## **7. 주소 구성 요소 확인**

1. **받기** 섹션으로 이동합니다. 통합 주소가 기본으로 표시됩니다.  
2. 통합 주소를 복사해 [Zcash Block Explorer](https://mainnet.zcashexplorer.app/)로 이동합니다.  
3. 검색창에 통합 주소를 붙여 넣습니다.  
4. 다음을 포함한 통합 주소의 모든 구성 요소가 표시됩니다:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **추가 참고 사항**

> [**최신 MetaMask 버전**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)을 사용하세요. 공개 버전은 Snaps를 지원합니다.  
> 보호된 증명 생성에는 시간이 걸릴 수 있습니다. WebAssembly가 브라우저에서 계산을 처리합니다.  
> 복구는 간단합니다. MetaMask와 Snap를 설치한 다음 기존 시드를 가져오세요.  
> Snap는 기본적으로 **보호된 ZEC**를 사용하며, 투명 주소는 **주요 기능이 아닙니다**.  
> 트랜잭션 확인에는 [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app)를 사용하세요.
