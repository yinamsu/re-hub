# Re-Hub (리허브) — 도산·회생관재인 & 채권자 스마트 포렌식 플랫폼

> **Re-Hub**는 대한민국 회생·파산 사건에서 채권자가 직접 채권 신고 자료를 전자 접수하고, 관재인이 3-Way 교차검증 및 AI 파싱을 거쳐 법원 제출용 표준 시부인 명세서(별표 2-2)를 자동 생성하는 **B2B Legal-Tech SaaS** 플랫폼입니다.

---

## 🎯 플랫폼 핵심 지향점 & 과제 해결 (Core Vision)

### 1. 법원 및 관재인 업무 과부하 (Workload) 혁신적 해소
- **기존 문제점**: 기존 회생·파산 절차에서는 수백~수천 건의 수기 엑셀 및 종이 채권신고서가 제출되어 법원 담당자 및 도산관재인의 심사 과부하가 심각했습니다.
- **Re-Hub 솔루션**: **채권자 셀프 전자신고 포털**을 제공하여 채권자가 직접 웹에서 서류 및 계좌 정보를 입력·접수하게 함으로써 접수 단계부터 데이터를 자동 정제하고 법원 직원의 수기 입력 업무를 최소화합니다.

### 2. 자료 정제 (Data Refining) & 3-Way 교차 검증
- **자료 정제**: 제출된 PDF/스캔 이미지 서류에서 사건번호, 채권자 인적사항, 원금/개시전 이자를 **AI OCR 서식 스캔**으로 자동 추출합니다.
- **3-Way 대조**: `Column 1. 채무자 장부` vs `Column 2. 채권자 신고` vs `Column 3. 관재인 판정`을 한 화면에서 대조하여 장부 불일치 차액을 즉시 감지합니다.

### 3. 실제 재판 및 회생절차 연동 (Court & Trial Ready)
- **법원 표준 명세서 자동 생성**: 심사 완료 즉시 **서울회생법원 실무 준칙 별표 2-2 서식 규격 (`추후보완 신고된 회생채권 시·부인 명세서`)** Excel 파일을 ExcelJS 엔진으로 100% 자동 생성합니다.
- **포렌식 증거 보관 (Chain of Custody)**: Kroll 포렌식 솔루션을 벤치마킹하여 제출 증거 서류(`갑/을 호증`)마다 **SHA-256 암호화 해시**를 부여하고, 자금유출 관계망 그래프 및 타임라인 쟁점 대조표를 제공하여 실제 재판/집회에서 입증 자료로 활용할 수 있도록 지원합니다.

---

## 🏛️ 주요 기능 모듈 (Core Modules)

| 모듈명 | 주요 기능 및 특징 |
| :--- | :--- |
| **📊 사건 개요 & 진행 (Overview)** | 사건 기본 정보(재판부, 관재인, 채무자), 6단계 회생 절차 진행바, 법원 지정 기한 D-Day 카운트다운 |
| **⚖️ 3-Way 채권 시부인 (Dashboard)** | 장부/신고/판정 3열 비교, Alt+A(전액시인)/Alt+D(전액부인) 단축키, 실시간 천단위(`,`) 콤마 및 자동 차액 산출 |
| **📁 디지털 증거보관소 (Evidence)** | `갑 제O호증`, `을 제O호증` 법원 자동 라벨링, SHA-256 위변조 검증, Chain of Custody 이력 관리 |
| **⏳ 타임라인 & 쟁점 대조 (Timeline)** | 사건 발생 시단위 타임라인, **채권자 주장(Claim) vs 관재인 항변(Counter-claim) Dual-Grid 대조표** |
| **🕸️ 자금흐름 & 관계망 (Graph)** | 특수관계인, 페이퍼컴퍼니, 주계좌 간 자금 유출(8.5억 원) 및 차명 지분 구조 시각화 Node-Link 그래프 |
| **📄 법원 제출 명세서 (Exporter)** | 회생법원 별표 2-2 규격 엑셀 출력 (#0F2942 헤더, SUM 자동 수식, KRW 통화 포맷 반영) |
| **📝 채권자 셀프 전자신고 (Self-Filing)** | 일반 채권자가 직접 서류 업로드 및 입금 계좌 접수, 실시간 전자접수증 발급 |

---

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: TailwindCSS + Lucide Icons (대한민국 법원 전자소송포털 inspired 깔끔한 UX)
- **Excel Generation**: `exceljs` (법원 별표 2-2 서식 자동 생성 엔진)
- **Visuals & Animation**: `canvas-confetti` (법원 명세서 완성 축하 효과)
- **State Management**: Client-State Data Persistence (`localStorage` + 데모 사건 Switcher)
- **Deployment**: Vercel Production Deployment

---

## 💡 사건 모드 안내 (Case Selector)

1. **📁 기본 사건 모드 (`2025회단1000 (주)에이치앤컴퍼니 회생절차`)**:
   - 중립적인 표준 기업 회생 사건으로, 실제 업무 환경을 모사한 기본 모드입니다.
2. **🧪 샘플 체험 모드 (`2025회단142 (주)알파테크놀로지 회생절차`)**:
   - 주식회사 코너스톤벤처스 외 5개 채권자 시부인 및 자금유출 포렌식 시뮬레이션을 위한 체험용 샘플 모드입니다.

---

## 🔗 관련 링크 (Deployment & Repository)

- 🌐 **프로덕션 라이브 URL**: [https://rehub-app.vercel.app](https://rehub-app.vercel.app)
- 💻 **로컬 개발 서버**: [http://localhost:3000](http://localhost:3000)
- 📦 **GitHub Repository**: [https://github.com/yinamsu/re-hub](https://github.com/yinamsu/re-hub)

---

**COPYRIGHT © 2025 RE-HUB PLATFORM. ALL RIGHTS RESERVED.**
