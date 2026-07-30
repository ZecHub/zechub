# MetaMask Zcash Snap 통합 가이드

전체 사용 흐름과 시각적 설명은 이 [**YouTube 가이드**](https://www.youtube.com/watch?v=UJh9Ilkohdw)를 시청하세요: 

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
     

이제 MetaMask는 **ChainSafe가 개발한 Zcash Snap**을 통해 **실드된 Zcash (ZEC)** 를 지원하므로, 브라우저 지갑에서 직접 비공개 ZEC를 보내고, 받고, 관리할 수 있습니다. **Hacken**의 감사를 받았으며 **공식 MetaMask Snaps Directory**에 등록되어 있어, **별도의 Zcash 소프트웨어 없이** MetaMask와 Snap만 있으면 됩니다.

---

## **사전 준비 사항**


> [**MetaMask Extension**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (데스크톱 전용) - Chrome, Edge 또는 Firefox.
> MetaMask 계정 - 시드 문구를 안전하게 보관하세요. Snap은 이 시드 문구로부터 Zcash 키를 파생합니다.  
> 안정적인 인터넷 연결 - Zcash 네트워크와 동기화하기 위해 필요합니다.  
> 자금 - ZEC로 스왑할 ETH 또는 거래소에서 출금할 ZEC.

> **팁:** MetaMask 복구 문구를 안전하게 보호하세요. 이 문구는 ETH와 ZEC 모두를 제어합니다.

---

## **1. Zcash Snap 설치하기**

1. [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/)로 이동합니다.  
2. [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) 또는 [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/)을 검색합니다.  
3. **Install/Add to MetaMask**를 클릭합니다.
4. 다음과 같은 권한을 승인합니다:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](https://hackmd.io/_uploads/Hy5MSG2Oex.png)


---

## **2. (선택 사항) Zcash 네트워크 추가하기**

MetaMask에서 **Add Network**를 선택하고 다음을 입력합니다:

**BNB SmartChain**의 경우;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
이렇게 하면 네트워크 정보와 익스플로러 링크를 사용할 수 있습니다.
![Add-a-custom-Net....](https://hackmd.io/_uploads/S1hq7f2Oel.png)

**Zcash Mainnet**의 경우;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://mainnet.lightwalletd.com:9067 
- Symbol: ZEC
```

---

## **3. ChainSafe WebZjs Wallet에 연결하기**

1. [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev)에 방문합니다.  
2. **Connect MetaMask Snap**을 클릭합니다.  

![Zcash-web-wallet](https://hackmd.io/_uploads/Sk8nSz3dgl.png)

3. 연결을 승인합니다.  
4. 다음을 포함한 Zcash 계정 요약을 확인합니다:
   - Unified 주소 및 Transparent 주소

![Account-summary-unif....](https://hackmd.io/_uploads/r17c_Mhdel.jpg)


5. 동기화가 완료될 때까지 기다립니다.




---

## **4. 지갑에 자금 넣기**

> **ETH -> ZEC 스왑** - **LeoDex** 같은 서비스를 사용하고, 실드된 주소로 전송하세요.  
> **거래소 출금** - 구매한 ZEC를 WebZjs 실드된 주소로 출금하세요.  

![LEODEX-SWAP](https://hackmd.io/_uploads/HyLQ0G2ugg.png)


> => **완전한 프라이버시**를 위해 실드된 (z) 주소를 사용하세요.

---

## **5. ZEC 보내기 / 받기**

1. **WebZjs**에서 **Transfer Balance**로 이동합니다.  
2. 다음을 입력합니다:
```
   - 실드된 수신자 주소  
   - 금액
```
   ![Transfer-Balance](https://hackmd.io/_uploads/rkvcFfhdex.png)

4. MetaMask에서 트랜잭션을 확인합니다(트랜잭션 서명).  
5. 수신한 자금은 확인 후 WebZjs에 표시됩니다.

---

## **6. 확인 / 문제 해결**

> 갱신된 잔액은 **WebZjs**에서 확인하세요 **(MetaMask는 아직 ZEC를 직접 표시하지 않습니다)** .  
> 문제가 발생하면:
  ```
  - 공식 ChainSafe Snap인지 확인하세요.  
  - 올바른 네트워크 설정인지 확인하세요.  
  - 주소 형식이 올바른지 확인하세요.  
  - 필요하면 **Connect Snap**으로 다시 연결하세요.
  ``` 

> **보안 팁:** 반드시 **감사를 완료한 ChainSafe Snap**만 설치하고, 승인 전에 권한을 검토하세요.

---

## **7. 주소 구성 요소 확인하기**

1. **Receive** 섹션으로 이동하면 기본적으로 Unified Address가 표시됩니다.  
2. Unified Address를 복사한 뒤 [Zcash Block Explorer](https://mainnet.zcashexplorer.app/)에 방문합니다.  
3. 검색창에 Unified Address를 붙여넣습니다.  
4. 이제 Unified Address의 모든 구성 요소를 확인할 수 있으며, 여기에는 다음이 포함됩니다:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](https://hackmd.io/_uploads/SyPR2f2_gg.png)



---

## **추가 참고 사항**

> [**최신 MetaMask 버전**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)을 사용하세요 - 공개 릴리스가 Snaps를 지원합니다.  
> 실드된 증명 생성에는 시간이 걸릴 수 있으며, WebAssembly가 브라우저 내에서 계산을 처리합니다.  
> 복구는 간단합니다. MetaMask와 Snap을 설치한 뒤 기존 시드를 가져오면 됩니다.  
> Snap은 기본적으로 **실드된 ZEC**를 사용하며, Transparent 주소는 **주요 초점이 아닙니다**.  
> 트랜잭션 확인에는 [zcashblockexplorer.com](https://zcashblockexplorer.com)을 사용하세요.
