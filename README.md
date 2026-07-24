# Re-Hub (도산·회생관재인 채권 시부인 관리 플랫폼)

> **Legal-Tech SaaS MVP for Bankruptcy & Restructuring Administrators**  
> 엑셀 기반의 소모적 수작업 채권 시부인 업무를 혁신하는 **AI 신고서 파싱, 3-Way 교차 검증 대시보드, 회생법원 제출용 표준 명세서(별표 2-2) 자동 생성 서비스**입니다.

[![Live Demo](https://img.shields.io/badge/Vercel-Live_Demo-000000?style=for-the-badge&logo=vercel)](https://rehub-app.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/yinamsu/re-hub)
[![Framework](https://img.shields.io/badge/Next.js_14-App_Router-blue?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## 🌐 라이브 주소 (Live App)
- **메인 배포 주소**: [https://rehub-app.vercel.app](https://rehub-app.vercel.app)
- **보조 배포 주소**: [https://rehub-kr.vercel.app](https://rehub-kr.vercel.app)

---

## 🛠️ 핵심 주요 기능 (Key Features)

### 1. Step 1: 채권신고서 AI 파싱 시뮬레이터 (Input Engine)
- **PDF/스캔 이미지 AI OCR 스캔**: 회생채권 신고서 서식을 분석하여 메타데이터(사건번호, 채권자명, 신고 원금, 이자, 적용 환율)를 자동 추출합니다.
- **원클릭 샘플 문서 파싱**: 실제 법원 제출용 채권신고서 데모 샘플(원화 투자금, 외화 가상자산 담보 대출 등)을 클릭 한 번으로 테스트할 수 있습니다.
- **Web3 온체인 위변조 검증 (Etherscan Verification)**: 금융 거래 해시(TxID) 및 블록체인 스마트 컨트랙트 원장을 대조하여 채권 신고 서류의 위변조 여부를 실시간 검증합니다.
- **JSON 추출 스키마 검증**: 추출된 구조화 데이터를 즉시 3-Way 대시보드로 연동합니다.

---

### 2. Step 2: 3-Way Reconciliation 대시보드 (Process)
- **3-Column comparative Terminal Layout**:
  - **Column 1 (채무자 장부)**: 회사 장부상 원금, 이자, 채권 총액 및 불일치 경고 메시지 표시.
  - **Column 2 (채권자 신고)**: AI 파싱된 신고 원금, 이자, 적용 환율 및 Web3 검증 뱃지.
  - **Column 3 (관재인 판정)**: 전액시인, 전액부인, 일부시인 원클릭 판정, 의결권 인정액 입력 및 시부인 사유 프리셋 선택.
- **⌨️ 키보드 단축키 지킴이 (Shortcuts Engine)**:
  - `Alt + A`: 전액 시인 (Admit All)
  - `Alt + D`: 전액 부인 (Deny All)
  - `Alt + ←` / `Alt + →`: 이전 / 다음 채권자로 즉시 이동
- **🛡️ 자동 계산 안전장치 (Reactive Auto-calculation)**:
  - 관재인이 시인 원금을 수정하면 `[신고 총액 - 시인액 = 부인액]`이 자동 계산되어 부인액 필드에 연동 기재되며, 의결권 인정액도 실시간 동기화됩니다.
- **🔄 시뮬레이션 데이터 원클릭 리셋**:
  - 테스트 중 변경된 모든 시부인 내역을 초기 `2025회단142 (주)알파테크놀로지 회생절차` 더미 데이터(6개 다양한 채권자 케이스)로 언제든 즉시 복원합니다.

---

### 3. Step 3: 대한민국 회생법원 표준 명세서 Excel 출력 (Output Generator)
- **실시간 집계 대시보드**: 총 신고 금액, 총 관재인 시인액, 총 부인액, 총 의결권 인정액 및 조정 시인율을 한눈에 파악합니다.
- **서울회생법원 규칙 준수 서식**:
  - **양식명**: 『추후보완 신고된 회생채권 시·부인 명세서 (별표 2-2)』
  - **ExcelJS 스타일링**: 법원 제출에 적합한 폰트(Pretendard), 테두리 격자, 헤더 색상(`#334E68`), 원화 통화 서식(`#,##0 "원"`), 수식(`SUM`) 합계 행 자동 생성.

---

## 📖 플랫폼 사용 설명서 (User Manual)

### 1단계: 신고서 입력 및 AI 파싱
1. 상단 탭에서 **`Step 1. 신고서 AI 파싱`** 메뉴를 선택합니다.
2. PDF 채권신고서를 드래그 앤 드롭하거나, 오른쪽 **[원클릭 데모 PDF 파싱 테스트]** 버튼을 클릭합니다.
3. OCR 및 이자 산출, Web3 온체인 해시 검증 프로세스(0% ➔ 100%)가 진행됩니다.
4. 파싱이 완료되면 추출 결과 및 Web3 검증 뱃지 확인 후 **[3-Way 시부인 대시보드에 신규 채무 추가]** 버튼을 누릅니다.

### 2단계: 3-Way 대시보드에서 시부인 심사
1. **`Step 2. 3-Way 시부인 대시보드`**로 이동합니다.
2. 왼쪽 채권자 목록에서 심사할 채권을 선택합니다 (또는 `Alt + ← / →` 키로 이동).
3. **Column 1(장부)**과 **Column 2(신고액)**의 금액 불일치 여부를 확인합니다.
4. 키보드 단축키 `Alt + A`(전액 시인) 또는 `Alt + D`(전액 부인)를 눌러 빠른 판정을 내리거나, **Column 3**에서 시인 원금/이자를 직접 수정합니다.
5. 시부인 사유 드롭다운(예: *FTX 도산 후 정산액 차감*, *중복신고로 부인* 등)을 선택하거나 메모를 작성합니다.
6. 실시간 자동 저장이 이루어지며, 심사 완료 시 진행률 게이지가 업데이트됩니다.

### 3단계: 법원 제출용 Excel 출력
1. **`Step 3. 법원 표준 명세서 Excel 출력`** 메뉴를 선택합니다.
2. 총 신고액, 총 시인액, 총 부인액, 의결권 인정액 라이브 요약 카드 및 미리보기 테이블을 확인합니다.
3. 우측 상단 **[법원 제출용 Excel (.xlsx) 다운로드]** 버튼을 클릭합니다.
4. `2025회단142_회생채권_시부인명세서_별표2-2.xlsx` 파일이 다운로드되며 축하 포일(Confetti) 효과가 실행됩니다.

---

## 🏗️ 테크 스택 (Tech Stack)

| 구분 | 기술 / 라이브러리 |
| :--- | :--- |
| **Framework** | Next.js 14.2 (App Router, React 18, TypeScript 5) |
| **Styling** | Tailwind CSS 3.4, Lucide Icons |
| **Excel Generator** | `exceljs` 4.4 (Korean Court Form Standard 2-2 Style) |
| **State / Storage** | Client-driven Reactive State (`localStorage` Sync & Hard Reset) |
| **UX Multipliers** | Global Keyboard Listener (`Alt+A`, `Alt+D`), `canvas-confetti` |
| **Deployment** | Vercel (Automated CI/CD with GitHub) |

---

## 📂 프로젝트 구조 (Directory Structure)

```
Krol/
├── app/
│   ├── globals.css           # Pretendard 폰트 및 커스텀 터미널 스타일
│   ├── layout.tsx            # Root 레이아웃 및 SEO 메타데이터
│   └── page.tsx              # Step 1 ~ Step 3 탭 제어 메인 클라이언트 스위처
├── components/
│   ├── Header.tsx            # 사건 정보 바, 진행률, 단축키 모달, 리셋 버튼
│   ├── DocumentUploader.tsx  # Step 1: PDF 드래그존 및 AI OCR / Web3 파싱 시뮬레이터
│   ├── ReconciliationDashboard.tsx # Step 2: 3-Way 시부인 대시보드 & 단축키 지킴이
│   └── CourtReportExporter.tsx # Step 3: 별표 2-2 회생법원 양식 ExcelJS 생성기
├── lib/
│   └── mockData.ts           # 2025회단142 사건 6개 채권자 더미 데이터 & localStorage 관리
├── types/
│   └── reconciliation.ts     # CreditorClaim, CompanyLedger, AdministratorDecision 타입
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 💻 로컬 개발 환경 실행 방법 (Local Setup)

```bash
# 1. 저장소 클론
git clone https://github.com/yinamsu/re-hub.git
cd re-hub

# 2. 의존성 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 프로덕션 빌드 테스트
npm run build
```

---

© 2025 **Re-Hub**. Built for Bankruptcy & Restructuring Administrators. All rights reserved.
