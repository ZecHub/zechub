# 마이그레이션 가이드: zcashd에서 Zebrad/Zallet으로

*Electric Coin Company (ECC)* / *Zodl*이 유지 관리하던 기존 zcashd 풀 노드는 Zebra와 Zallet으로 대체되었습니다. zcashd는 2026년 7월 18일 지원 종료 중단에 도달했으며 더 이상 실행되지 않습니다.

- Zebra는 Zcash Foundation이 개발한 Zcash 프로토콜의 현대적인 Rust 구현체입니다.
- Zallet은 Zodl이 개발한 Zebra 노드와 원활하게 연동되도록 제작된 경량 지갑입니다.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![다이어그램: 노드 역할의 zebrad와 지갑 역할의 Zallet으로 분리되는 zcashd](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

이 가이드에서는 설정, 지갑 가져오기, 일반적인 마이그레이션 문제 해결을 포함하여 **Zcashd**에서 **Zebrad** 및 **Zallet**으로 마이그레이션하는 방법을 안내합니다.

---

## zcashd는 2026년 7월 18일에 실행을 중단했습니다

**이것이 의미하는 것**

- zcashd는 2026년 7월 18일 지원 종료 중단에 도달했습니다. 더 이상 체인 최상단까지 동기화되지 않으며, 자금을 보내거나 받을 수도 없습니다. 이는 예정된 일이 아니라 이미 완료된 일입니다.
- zcashd의 두 가지 역할은 이제 분리되었습니다. **zebrad**는 풀 노드이고, **Zallet**은 지갑입니다.
- Zallet은 **베타** 상태입니다. 릴리스 간 호환성이 깨지는 변경이 발생할 수 있으며, 일부 zcashd JSON-RPC 메서드는 아직 구현되지 않았습니다. 특정 호출에 의존하기 전에 [메서드 상태 매트릭스](https://zcash.github.io/zallet/)를 확인하세요.
- 아직 **Sprout** 자금을 보유하고 있다면 먼저 6단계의 경고를 읽으세요. Zallet은 Sprout 풀을 지원하지 않으며, 해당 자금을 이동하는 일반적인 방법에는 실행 중인 zcashd가 필요했습니다.

**마이그레이션해야 하는 이유 - 지원 중단 외에도**

지원 중단을 제외하더라도 이전해야 할 강력한 이유가 있습니다:
- 보안 및 견고성: Rust의 메모리 안전성과 현대적인 도구는 취약점 위험을 줄입니다.
- 성능 및 효율성: Zebrad는 병렬 처리, 더 효율적인 리소스 사용, 빠른 동기화를 위해 설계되었습니다.
- 모듈형 아키텍처: 노드 로직(Zebrad)과 지갑 UI(Zallet)를 분리하면 경계가 더 명확해지고 업그레이드 경로가 개선됩니다.
- 미래 생태계 호환성: 도구, 개선 사항 및 나머지 Zcash 생태계는 점점 더 Zebrad/Zallet을 대상으로 하게 됩니다.
- 안심: 지원이 중단되고 더 이상 지원되지 않는 구성 요소를 계속 실행하는 상황을 피할 수 있습니다.

### 이제 마이그레이션 가이드를 살펴보겠습니다

**1. 모든 항목 백업**
* zcashd 노드에서 wallet.dat(또는 기타 지갑 파일 / 키 저장소)를 백업하세요.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* zcash.conf 및 사용자 지정 설정을 저장하세요.
* 사용하는 모든 RPC 스크립트 또는 자동화 도구의 사본을 내보내세요.
* 백업이 유효한지 확인하세요(예: 다른 환경에서 열거나 검사해 보세요).
* 현재 의존하고 있는 JSON-RPC 메서드를 검토하세요.
* [Zcash 지원 사이트](https://z.cash/support/zcashd-deprecation/)에서 유지 관리하는 예정된 호환성 표와 비교하세요. 
* 변경 사항이나 누락된 메서드에 대비하세요(일부는 우회 방법이나 조정이 필요할 수 있습니다).

**2. 시스템 요구 사항 및 디스크 공간**
* 디스크 공간은 사람들이 과소평가하는 요구 사항입니다. Zcash 체인은 2026년 8월에 **270 GB**를 넘었으므로, 가능하면 SSD에서 최소 **300 GB**의 여유 공간을 확보하세요.
* 컴퓨터에 안정적인 네트워크, CPU, RAM이 있는지 확인하세요.
* 인터넷 연결
* 소스에서 컴파일할 계획이라면 Rust 및 Cargo를 설치하세요.

**3. Zebrad 설치 / 설정**
사전 빌드된 바이너리를 다운로드하거나 소스에서 빌드할 수 있습니다.
* Zcash Foundation은 Zebra용 릴리스와 바이너리를 게시합니다. 예를 들어 설치 스크립트를 사용하거나 운영 체제에 맞는 바이너리를 다운로드할 수 있습니다.

* 최근 Zebra 버전에서는 [Docker에서 RPC 엔드포인트가 더 이상 기본적으로 활성화되지 않습니다.](https://zfnd.org/zebra-2-3-0-release/)

**옵션 A: 사전 빌드된 바이너리로 설치**  
**Linux**/**macOS**에서:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

이 작업은 최신 안정 버전의 zebrad를 설치합니다.

**옵션 B: 소스에서 빌드**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

빌드 후 바이너리를 경로에 옮기세요:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![마이그레이션 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. 구성 및 실행**  
기본 구성을 생성하세요:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![마이그레이션2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

환경설정에 맞게 **zebrad.toml**을 편집하세요(수신 주소, 포트, 상태 디렉터리, 캐싱).

**노드 시작:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![이미지](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

노드는 제네시스부터 동기화를 시작합니다. 하드웨어와 네트워크에 따라 몇 시간 이상 걸릴 수 있습니다.

**5. Zallet 설치 / 설정(지갑)**

Zallet은 zcashd의 지갑 부분을 대체하도록 설계되었습니다.

바이너리는 Zallet GitHub / 릴리스 페이지에서 확인하세요.

**또는 소스에서 빌드:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![이미지](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* 설치 방식에 따라 GUI 또는 CLI를 실행하세요.
* RPC 또는 API 엔드포인트를 통해 로컬 Zebrad 노드에 연결하도록 구성하세요.

**6. zcashd 지갑을 Zallet으로 가져오기**

이를 위해 실행 중인 zcashd는 필요하지 않습니다. zcashd는 더 이상 시작할 수 없으므로, Zallet이 `wallet.dat` 파일을 직접 읽는다는 점이 중요합니다.

> **`wallet.dat`을 보관하세요.** 마이그레이션은 Zallet 지갑으로 표현할 수 없는 항목을 가져오는 대신 보고하며, 해당 키 자료는 그 후 `wallet.dat`에만 존재합니다. 마이그레이션 후 삭제하지 마세요.

먼저 `zallet init-wallet-encryption`을 실행하세요. Zallet은 키 자료를 age ID로 암호화하며, 키를 가져오기 전에 해당 ID가 존재해야 합니다.

그런 다음 구성과 지갑을 변환하세요:

```bash
# zcash.conf를 zallet.toml로 변환
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# wallet.dat을 Zallet의 wallet.db로 가져오기
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet`은 `zcashd-import` 기능이 포함된 빌드에만 있으며, `wallet.dat`을 읽으려면 zcashd가 사용한 버전인 Berkeley DB 6.2의 `db_dump` 유틸리티가 필요합니다. 지갑 파일이 둘 이상이라면 파일마다 명령을 한 번씩 실행하고, 이후 실행 시에는 `--allow-multiple-wallet-imports`를 추가하세요. 각 파일은 별도의 계정 집합이 됩니다. Zallet의 JSON-RPC는 기본적으로 쿠키 인증을 사용하므로 `rpcuser`와 `rpcpassword`는 이전되지 않습니다. 필요하다면 `zallet add-rpc-user`로 자격 증명을 추가하세요.

**가져와지는 항목**

* 니모닉 시드와 그로부터 파생된 키, zcashd 지갑에 맞게 다시 구성된 계정
* 독립적으로 가져온 Sapling 지출 키 및 투명 키
* 공개 키 또는 리딤 스크립트를 포함하는 투명 감시 전용 항목
* 계정 생일 정보로, 체인 스캔이 올바른 높이에서 시작되도록 합니다

**가져와지지 않는 항목.** 이러한 항목은 가져오는 대신 개수로 보고됩니다:

* **Sprout 지출 키 및 자금.** Zallet은 Sprout 풀을 지원하지 않습니다. 문서화된 방법은 zcashd를 폐기하기 전에 Sprout 자금을 zcashd로 이동하는 것이었으며, 이제는 불가능합니다. 이 경우에 해당한다면 다른 작업을 하기 전에 [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) 또는 [커뮤니티 포럼](https://forum.zcashcommunity.com/)에서 문의하세요.
* 주소록 항목
* 공개 키 또는 리딤 스크립트 없이 저장된 감시 전용 항목 및 압축되지 않은 공개 키가 있는 항목
* Regtest 지갑

**이후 백업.** 가져온 키는 지갑 데이터베이스에만 존재하므로 니모닉만으로는 완전한 백업이 아닙니다. `wallet.db`, `keystore.encryption_identity` 옵션으로 지정한 age 암호화 ID 파일, 니모닉 구문의 안전한 사본을 보관하고, 원본 `wallet.dat`도 유지하세요. `wallet.db` 자체는 암호화되지 않습니다. 거래 내역과 Viewing Key를 평문으로 보관하므로 백업을 안전한 장소에 저장하세요.

**지갑 재스캔 및 동기화**

* 키를 가져오면 Zallet은 Zebrad를 통해 체인 재스캔을 시작합니다.
* Zallet이 잔액과 거래 내역을 다시 구성할 시간을 충분히 두세요.

**7. 잔액 및 동기화 확인**

가져오기가 완료되면 Zallet은 Zebrad 노드에 연결하여 블록체인을 재스캔합니다.
동기화가 완료되면 잔액과 거래가 이전과 정확히 동일하게 표시되어야 합니다.

다음을 실행하여 노드의 동기화 상태를 확인할 수 있습니다:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![이미지](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

또는 로그를 확인하세요.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![이미지](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. 문제 해결**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">문제</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">가능한 원인</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">해결책</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad가 시작되지 않음</td>
        <td className="px-6 py-4">사용 중인 포트 또는 잘못된 구성</td>
        <td className="px-6 py-4">**zebrad.toml**을 확인하고 사용 가능한 포트를 사용하세요</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">느린 동기화</td>
        <td className="px-6 py-4">네트워크 혼잡</td>
        <td className="px-6 py-4">안정적인 인터넷 연결을 확인하고 Zebrad를 재시작하세요</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">지갑에 거래가 누락됨</td>
        <td className="px-6 py-4">불완전한 키 가져오기</td>
        <td className="px-6 py-4">키를 다시 가져오거나 Zallet에서 재스캔하세요</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet이 노드에 연결할 수 없음</td>
        <td className="px-6 py-4">노드가 실행 중이 아니거나 엔드포인트가 잘못됨</td>
        <td className="px-6 py-4">Zebrad를 시작하고 올바른 RPC 포트를 확인하세요</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet 충돌</td>
        <td className="px-6 py-4">오래된 빌드</td>
        <td className="px-6 py-4">GitHub에서 최신 릴리스로 업데이트하세요</td>
      </tr>
    </tbody>
  </table>
</div>

**9. 결론**

zcashd에서 Zebrad 및 Zallet으로 마이그레이션하면 더 빠르고, 더 안전하며, 더 현대적인 Zcash 경험을 누릴 수 있습니다.
Rust 기반 보안, 모듈형 설계, 개선된 도구를 갖춘 이 구성은 Zcash 생태계가 계속 발전하더라도 노드와 지갑이 미래에 대비된 상태를 유지하도록 보장합니다.

팁: 지갑 키를 오프라인으로 보관하고 Zallet 데이터를 정기적으로 백업하세요.
Zebra는 [zebra.zfnd.org](https://zebra.zfnd.org)를, Zallet은 [The Zallet Book](https://zcash.github.io/zallet/) 또는 [Zallet 저장소](https://github.com/zcash/zallet)를 방문하세요. The Zallet Book의 [zcashd에서 마이그레이션](https://zcash.github.io/zallet/) 장은 6단계의 권위 있는 참고 자료입니다.
