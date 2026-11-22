# 마이그레이션 안내서: zcashd에서 Zebrad/Zallet로

*Electric Coin Company(ECC)* / *Zodl*에서 관리하던 기존 zcashd 풀 노드는 Zebra와 Zallet로 대체되었습니다. zcashd는 2026년 7월 18일 지원 종료와 함께 작동을 멈췄으며, 더 이상 실행되지 않습니다.

- Zebra는 Zcash Foundation에서 개발한 Zcash 프로토콜의 최신 Rust 구현체입니다.
- Zallet는 Zodl에서 개발한 Zebra 노드와 원활하게 연동하도록 만들어진 경량 지갑입니다.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagram: zcashd splitting into zebrad for node duties and Zallet for wallet duties](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

이 안내서에서는 설정, 지갑 가져오기, 일반적인 마이그레이션 문제 해결을 포함해 **zcashd**에서 **Zebrad** 및 **Zallet**로 마이그레이션하는 방법을 설명합니다.

---

## zcashd는 2026년 7월 18일 작동을 멈췄습니다

**의미**

- zcashd는 2026년 7월 18일 지원 종료와 함께 작동을 멈췄습니다. 다시는 체인 최신 상태까지 동기화되지 않으며, 자금을 보내거나 받을 수도 없습니다. 이미 종료된 상태이며, 종료 예정인 것이 아닙니다.
- zcashd의 2가지 역할은 이제 분리되었습니다. **zebrad**는 풀 노드이고, **Zallet**는 지갑입니다.
- Zallet는 **베타** 단계입니다. 릴리스 간에 호환성이 깨지는 변경 사항이 있을 수 있으며, 일부 zcashd JSON-RPC 메서드는 아직 구현되지 않았습니다. 특정 호출에 의존하기 전에 [메서드 상태 표](https://zcash.github.io/zallet/)를 확인하세요.
- 아직 **Sprout** 자금을 보유하고 있다면 먼저 6단계의 경고를 읽으세요. Zallet는 Sprout 풀을 지원하지 않으며, 해당 자금을 옮기는 일반적인 방법에는 실행 중인 zcashd가 필요했습니다.

**지원 중단을 넘어, 마이그레이션해야 하는 이유**

지원 중단 문제를 제외하더라도 이전해야 할 이유는 충분합니다.
- 보안 및 견고성: Rust의 메모리 안전성과 최신 도구를 통해 취약성 위험을 줄일 수 있습니다.
- 성능 및 효율성: Zebrad는 병렬 처리, 더 효율적인 리소스 사용, 더 빠른 동기화를 고려해 설계되었습니다.
- 모듈형 아키텍처: 노드 로직(Zebrad)과 지갑 UI(Zallet)를 분리해 경계를 명확히 하고 업그레이드 경로를 개선합니다.
- 향후 생태계와의 호환성: Zcash 생태계의 도구, 개선 사항 및 기타 요소는 점차 Zebrad/Zallet를 대상으로 개발될 것입니다.
- 안심: 지원이 종료된 구성 요소를 계속 사용해야 하는 상황을 피할 수 있습니다.

### 이제 마이그레이션 안내서를 살펴보겠습니다

**1. 모든 항목 백업하기**
* zcashd 노드의 wallet.dat(또는 다른 지갑 파일/키 저장소)를 백업하세요.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* zcash.conf와 사용자 지정 설정을 저장하세요.
* 사용하는 RPC 스크립트나 자동화 도구를 복사해 내보내세요.
* 백업이 유효한지 확인하세요(예: 다른 환경에서 열거나 내용을 확인해 보세요).
* 현재 의존하고 있는 JSON-RPC 메서드를 검토하세요.
* [Zcash 지원 사이트](https://z.cash/support/zcashd-deprecation/)에서 관리하는 예정 호환성 표와 비교하세요.
* 변경되거나 누락된 메서드에 대비하세요(일부 메서드는 우회 방법이나 조정이 필요할 수 있습니다).

**2. 시스템 요구 사항 및 디스크 공간**
* 사람들이 과소평가하는 요구 사항은 디스크 공간입니다. Zcash 체인은 2026년 8월에 **270 GB**를 넘어섰으므로, 가능하면 SSD에 최소 **300 GB**의 여유 공간을 확보하세요.
* 컴퓨터의 네트워크, CPU, RAM이 안정적인지 확인하세요.
* 인터넷에 연결되어 있어야 합니다.
* 소스에서 컴파일할 계획이라면 Rust와 Cargo를 설치하세요.

**3. Zebrad 설치 및 설정**
미리 빌드된 바이너리를 다운로드하거나 소스에서 빌드할 수 있습니다.
* Zcash Foundation에서는 Zebra용 릴리스와 바이너리를 제공합니다. 예를 들어 설치 스크립트를 사용하거나 운영체제에 맞는 바이너리를 다운로드할 수 있습니다.

* 최근 Zebra 버전에서는 Docker의 [RPC 엔드포인트가 더 이상 기본적으로 활성화되지 않는다는 점에 유의하세요.](https://zfnd.org/zebra-2-3-0-release/)

**선택 사항 A: 미리 빌드된 바이너리로 설치하기**  
**Linux**/**macOS**에서:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

이렇게 하면 zebrad의 최신 안정 버전이 설치됩니다.

**선택 사항 B: 소스에서 빌드하기**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

빌드한 후 바이너리를 PATH에 있는 디렉터리로 이동하세요.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. 설정 및 실행**  
기본 설정 파일을 생성하세요.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

**zebrad.toml**을 원하는 설정(수신 주소, 포트, 상태 디렉터리, 캐싱)에 맞게 편집하세요.

**노드 시작하기:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

노드는 제네시스 블록부터 동기화를 시작합니다. 하드웨어와 네트워크에 따라 몇 시간 이상 걸릴 수 있습니다.

**5. Zallet 설치 및 설정(지갑)**

Zallet는 zcashd의 지갑 기능을 대체하도록 설계되었습니다.

바이너리는 Zallet GitHub / 릴리스 페이지를 확인하세요.

**또는 소스에서 빌드하기:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* 설치 방식에 따라 GUI 또는 CLI를 실행하세요.
* RPC 또는 API 엔드포인트를 통해 로컬 Zebrad 노드에 연결하도록 설정하세요.

**6. zcashd 지갑을 Zallet로 가져오기**

이 작업에는 실행 중인 zcashd가 필요하지 않습니다. Zallet는 `wallet.dat` 파일을 직접 읽습니다. 이는 zcashd를 더 이상 시작할 수 없으므로 중요합니다.

> **`wallet.dat`를 보관하세요.** 마이그레이션 과정에서는 변환할 수 없는 항목을 가져오는 대신 Zallet 지갑에 보고합니다. 해당 키 자료는 그때부터 `wallet.dat`에만 존재합니다. 마이그레이션 후에도 이를 삭제하지 마세요.

먼저 `zallet init-wallet-encryption`를 실행하세요. Zallet는 키 자료를 age 아이덴티티로 암호화하므로, 키를 가져오기 전에 해당 아이덴티티가 있어야 합니다.

그런 다음 설정과 지갑을 변환하세요.

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet`는 `zcashd-import` 기능을 포함한 빌드에서만 사용할 수 있으며, `wallet.dat`를 읽으려면 zcashd에서 사용하는 Berkeley DB 6.2의 `db_dump` 유틸리티가 필요합니다. 지갑 파일이 여러 개라면 파일마다 명령을 한 번씩 실행하고, 두 번째 실행부터는 `--allow-multiple-wallet-imports`를 추가하세요. 각 파일은 별도의 계정 집합으로 만들어집니다. `rpcuser`와 `rpcpassword`는 이전되지 않습니다. Zallet의 JSON-RPC는 기본적으로 쿠키 인증을 사용하므로, 자격 증명이 필요하면 `zallet add-rpc-user`를 사용해 추가하세요.

**가져오는 항목**

* 니모닉 시드와 해당 시드에서 파생된 키. 계정은 zcashd 지갑과 일치하도록 다시 구성됩니다.
* 개별적으로 가져온 Sapling spending key와 투명 키
* 공개 키 또는 리딤 스크립트가 포함된 투명 보기 전용 항목
* 계정 생일. 이를 통해 올바른 높이부터 체인 검색을 시작합니다.

**가져오지 않는 항목.** 해당 항목은 가져오는 대신 개수로 보고됩니다.

* **Sprout spending key와 자금.** Zallet은 Sprout 거래정보 보호 구역을 지원하지 않습니다. 문서에 안내된 방법은 폐기하기 전에 zcashd을 사용해 Sprout 자금을 옮기는 것이었지만, 이제는 더 이상 가능하지 않습니다. 영향을 받는 경우 다른 조치를 하기 전에 [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) 또는 [커뮤니티 포럼](https://forum.zcashcommunity.com/)에서 문의하세요.
* 주소록 항목
* 공개 키나 redeem script 없이 저장된 보기 전용 항목 및 압축되지 않은 공개 키가 있는 항목
* Regtest 지갑

**이후 백업하기.** 니모닉만으로는 완전한 백업이 되지 않습니다. 가져온 키는 지갑 데이터베이스에만 저장되기 때문입니다. `wallet.db`, `keystore.encryption_identity` 옵션으로 지정된 age 암호화 아이덴티티 파일, 니모닉 문구를 안전하게 복사해 보관하고 원본 `wallet.dat`도 보관하세요. `wallet.db` 자체는 암호화되지 않으므로 유의하세요. 이 파일에는 거래 내역과 viewing key가 암호화되지 않은 상태로 저장되므로, 백업은 안전한 곳에 보관하세요.

**지갑 다시 검색 및 동기화**

* 키를 가져오면 Zallet가 Zebrad를 통해 체인 다시 검색을 시작합니다.
* Zallet가 잔액과 거래 내역을 다시 구성할 때까지 기다리세요.

**7. 잔액 및 동기화 확인하기**

가져오기가 완료되면 Zallet가 Zebrad 노드에 연결해 블록체인을 다시 검색합니다.
동기화가 완료되면 이전과 똑같이 잔액과 거래가 표시되어야 합니다.

다음 명령을 실행해 노드의 동기화 상태를 확인할 수 있습니다.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

또는 로그를 확인하세요.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. 문제 해결**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">문제</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">가능한 원인</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">해결 방법</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad가 시작되지 않음</td>
        <td className="px-6 py-4">포트가 사용 중이거나 설정이 잘못됨</td>
        <td className="px-6 py-4">**zebrad.toml**을 확인하고 사용 가능한 포트를 지정하세요.</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">동기화가 느림</td>
        <td className="px-6 py-4">네트워크 혼잡</td>
        <td className="px-6 py-4">인터넷 연결이 안정적인지 확인하고 Zebrad를 다시 시작하세요.</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">지갑에 거래가 표시되지 않음</td>
        <td className="px-6 py-4">키를 일부만 가져옴</td>
        <td className="px-6 py-4">키를 다시 가져오거나 Zallet에서 다시 검색하세요.</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet가 노드에 연결할 수 없음</td>
        <td className="px-6 py-4">노드가 실행 중이지 않거나 엔드포인트가 잘못됨</td>
        <td className="px-6 py-4">Zebrad를 시작하고 올바른 RPC 포트를 사용하는지 확인하세요.</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet가 비정상 종료됨</td>
        <td className="px-6 py-4">오래된 빌드</td>
        <td className="px-6 py-4">GitHub에서 최신 릴리스로 업데이트하세요.</td>
      </tr>
    </tbody>
  </table>
</div>

**9. 결론**

zcashd에서 Zebrad 및 Zallet로 마이그레이션하면 더 빠르고 안전하며 현대적인 Zcash 경험을 누릴 수 있습니다.
Rust 기반 보안, 모듈형 설계, 향상된 도구를 갖춘 이 구성은 Zcash 생태계가 계속 발전하는 동안에도 노드와 지갑을 미래에 대비된 상태로 유지해 줍니다.

팁: 지갑 키를 오프라인에 보관하고 Zallet 데이터를 정기적으로 백업하세요.
[zebra.zfnd.org](https://zebra.zfnd.org)에서 Zebra를 확인하고, [The Zallet Book](https://zcash.github.io/zallet/) 또는 [Zallet 저장소](https://github.com/zcash/zallet)에서 Zallet를 확인하세요. The [Migrating from zcashd](https://zcash.github.io/zallet/) 장은 6단계에 관한 권위 있는 참고 자료입니다. — The Zallet Book.
