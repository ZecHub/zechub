# 마이그레이션 가이드: zcashd에서 Zebrad/Zallet로

Zcash 생태계는 진화하고 있습니다. *Electric Coin Company (ECC)* / *Zodl*이 유지 관리하는 전통적인 Zcashd 전체 노드는 점차적으로 Zebra와 Zallet으로 대체되고 있습니다.

- Zebra는 Zcash Foundation에서 개발한 현대적인 Rust 기반의 Zcash 프로토콜 구현입니다.
- Zallet은 Zodl이 개발한 가벼운 지갑으로, Zebra 노드와 원활하게 인터페이스할 수 있도록 설계되었습니다.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ChatGPTImageOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

이 가이드는 **Zcashd**에서 **Zebrad** 및 **Zallet**로의 마이그레이션을 안내합니다. 설정, 지갑 임포트, 일반적인 마이그레이션 문제 해결을 포함하고 있습니다.

---

## Zcash 프로젝트는 공식적으로 zcashd가 2025년에 폐지될 것이라고 발표했습니다.

**폐지 상태 및 의미**

- Zcash 프로젝트는 공식적으로 zcashd가 2025년에 폐지될 것이라고 발표했습니다.
- 전체 노드는 Rust 기반의 Zebrad로 이전되고, Zallet은 zcashd의 지갑 구성 요소를 대체하기 위해 설계되었습니다.
- 이에 따라 Zebra 프로젝트는 "Zcashd Deprecation" 마일스톤을 추적하여 호환성, RPC 마이그레이션 및 생태계 지원을 보장하고 있습니다.
- 많은 RPC 메서드에 대해 Zebrad/Zallet은 drop-in 대체물(동작을 모방하거나 일치시킴)이 되려고 노력하지만, 일부는 변경되거나 지원되지 않을 수 있습니다.

**마이그레이션의 이유 - 폐지 외에도**

폐지와 별개로 이전하는 것이 유리한 이유가 여러 가지 있습니다:
- 보안 및 안정성: Rust의 메모리 안전성과 현대적인 도구는 취약점 발생 위험을 줄입니다.
- 성능 및 효율성: Zebrad는 병렬 처리, 더 효율적인 자원 사용, 빠른 동기화를 위해 설계되었습니다.
- 모듈형 아키텍처: 노드 로직(Zebrad)과 지갑 UI(Zallet)을 분리함으로써 명확한 경계와 더 나은 업그레이드 경로를 제공합니다.
- 미래 생태계 호환성: 도구, 개선 사항 및 Zcash의 다른 생태계 구성 요소는 점점 Zebrad/Zallet을 대상으로 하게 될 것입니다.
- 안심: 폐지되고 지원되지 않는 구성 요소에 갇혀 있는 것을 피할 수 있습니다.

### 이제 마이그레이션 가이드로 들어가겠습니다

**1. 모든 항목 백업**
* zcashd 노드에서 wallet.dat (또는 다른 지갑 파일/키 저장소)를 백업합니다.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* zcash.conf 및 기타 사용자 정의 설정을 저장합니다.
* 사용하는 RPC 스크립트나 자동화를 복사하여 내보냅니다.
* 백업이 유효한지 확인하세요 (예: 다른 환경에서 열거나 검토해 보세요).
* 현재 사용 중인 JSON-RPC 메서드를 확인합니다.
* [Zcash 지원 사이트](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com)에 유지되는 계획된 호환성 표와 비교하세요
* 변경되거나 누락된 메서드에 대비해 준비합니다 (일부는 해결책이나 적응이 필요할 수 있습니다).

**2. 시스템 요구 사항 및 디스크 공간**
* 충분한 디스크 공간을 확보하세요(Zcash 체인은 매우 큽니다). 최소 10GB의 무료 디스크 공간.
* 컴퓨터가 안정적인 네트워크, CPU, RAM을 갖추고 있는지 확인하세요.
* 인터넷 연결
* 소스에서 컴파일하려면 Rust 및 Cargo를 설치해야 합니다.

**3. Zebrad 설치 / 설정**
사전 빌드된 바이너리 다운로드 또는 소스에서 빌드할 수 있습니다.
* Zcash Foundation은 Zebra의 릴리스와 바이너리를 출판합니다. 예를 들어, 설치 스크립트나 OS에 맞는 적절한 바이너리를 다운로드하여 사용할 수 있습니다.

* 최근 Zebra 버전에서는 [Docker에서 RPC 엔드포인트가 기본적으로 활성화되지 않습니다.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

**옵션 A: 사전 빌드된 바이너리로 설치**
**Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

이 명령은 최신 안정 버전의 zebrad를 설치합니다.

**옵션 B: 소스에서 빌드**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

빌드 후 바이너리를 경로에 이동합니다:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. 설정 및 실행**
기본 구성 파일 생성:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

**zebrad.toml**을 편집하여 선호하는 설정(리슨 주소, 포트, 상태 디렉토리, 캐싱)으로 변경합니다.

노드 실행:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

노드는 생성자부터 동기화를 시작할 것이며, 하드웨어와 네트워크에 따라 몇 시간 이상 소요될 수 있습니다.

**5. Zallet 설치 / 설정 (지갑)**

Zallet은 zcashd의 지갑 부분을 대체하도록 설계되었습니다.

Zallet GitHub / 릴리스 페이지에서 바이너리를 확인하세요.

**또는 소스에서 빌드:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* GUI 또는 CLI(설치에 따라)를 실행합니다.
* 로컬 Zebrad 노드와 RPC 또는 API 엔드포인트를 통해 연결하도록 구성합니다.

**6. zcashd 지갑을 Zallet으로 임포트**
개인 키 덤프를 통한 임포트

zcashd에서 개인 키를 내보냅니다:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* Zallet에서 '키 임포트' 또는 유사한 옵션을 선택합니다.
* **zcashd_keys.txt**를 지정합니다. 
* Zallet은 ZEC 주소와 관련된 키를 파싱하고 임포트할 것입니다.

**시드 구문을 통한 임포트**(적용 가능한 경우)

* 지갑이 시드 백업을 지원하는 경우, Zallet에서 '시드 구문으로 복원' 기능을 사용합니다.
* 이는 zcashd 지갑이 시드로 유도되었거나(또는 시드 변환을 가지고 있는 경우)만 작동합니다.

**지갑 재스캔 및 동기화**

* 키가 임포르트된 후, Zallet은 Zebrad를 통해 체인의 재스캔을 트리거할 것입니다.
* Zallet이 균형과 거래 내역을 다시 구성하는 데 시간이 걸릴 수 있습니다.

**7. 균형 및 동기화 확인**

임포트 후, Zallet은 Zebrad 노드에 연결하고 블록체인을 재스캔합니다.
동기화가 완료되면 균형과 거래는 이전과 정확히 같아야 합니다.

노드의 동기 상태를 확인하려면 다음 명령어를 실행하세요:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

또는 로그를 확인합니다.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/r1HfVPF6gg.png)
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
        <td className="px-6 py-4">포트 사용 중이거나 잘못된 설정</td>
        <td className="px-6 py-4">**zebrad.toml**을 확인하고 사용 가능한 포트를 사용하세요</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">동기화가 느림</td>
        <td className="px-6 py-4">네트워크 혼잡</td>
        <td className="px-6 py-4">안정적인 인터넷을 확인하고 Zebrad를 재시작하세요</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">거래가 누락됨</td>
        <td className="px-6 py-4">부분적인 키 임포트</td>
        <td className="px-6 py-4">Zallet에서 다시 키를 임포트하거나 재스캔하세요</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet이 노드에 연결할 수 없음</td>
        <td className="px-6 py-4">노드가 실행되지 않거나 잘못된 엔드포인트</td>
        <td className="px-6 py-4">Zebrad를 시작하고 올바른 RPC 포트를 확인하세요</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet이 충돌</td>
        <td className="px-6 py-4">구식 빌드</td>
        <td className="px-6 py-4">GitHub에서 최신 릴리스로 업데이트하세요</td>
      </tr>
    </tbody>
  </table>
</div>

**9. 결론**

zcashd에서 Zebrad 및 Zallet으로 마이그레이션하면 더 빠르고 안전하며 현대적인 Zcash 경험을 제공합니다.
Rust 기반의 보안, 모듈형 설계, 그리고 더 나은 도구를 통해 이 설정은 Zcash 생태계가 계속 진화함에 따라 노드와 지갑이 미래에도 대응할 수 있도록 합니다.

팁: 지갑 키는 오프라인 상태로 유지하고 Zallet 데이터를 정기적으로 백업하세요.
[zebra.zfnd.org](https://zebra.zfnd.org) 및 [zallet.zfnd.org](https://zallet.zfnd.org)에서 업데이트와 커뮤니티 지원을 확인하세요.
