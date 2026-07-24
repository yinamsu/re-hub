export type DecisionStatus = 'PENDING' | 'ADMITTED' | 'DENIED' | 'PARTIALLY_ADMITTED';

export interface CreditorClaim {
  id: string;
  filingNo: string; // 신고번호 (e.g. "회생-001")
  creditorName: string; // 채권자명
  bizNo?: string; // 사업자등록번호 / 주민번호
  address: string; // 주소
  contact?: string; // 연락처
  bankName?: string; // 입금 은행
  accountNo?: string; // 계좌번호
  accountHolder?: string; // 예금주
  claimType: string; // 채권내용 (e.g., "대여금", "상거래 채권", "임금채권", "투자금")
  declaredPrincipal: number; // 신고 원금 (KRW)
  declaredInterest: number; // 신고 개시전이자 (KRW)
  currency: string; // 통화 (KRW, USD, etc.)
  exchangeRate: number; // 적용 환율
  txId?: string; // Web3 트랜잭션 검증 ID
  txVerified?: boolean; // Web3 온체인/해시 검증 여부
  txTimestamp?: string;
  txBlock?: number;
  parsedFromDocument?: boolean; // AI 파싱 완료 여부
  submittedDate: string; // 신고일자
  submissionSource?: 'ADMIN_PARSED' | 'CREDITOR_SELF'; // 신고 출처 (관재인 파싱 / 채권자 셀프신고)
  evidenceFiles?: string[]; // 첨부 증빙 서류 목록
}

export interface CompanyLedger {
  ledgerPrincipal: number; // 장부상 원금
  ledgerInterest: number; // 장부상 이자
  ledgerTotal: number; // 장부상 채권 총액
  hasDiscrepancy: boolean; // 장부와 신고액 불일치 여부
  discrepancyReason?: string; // 불일치 사유 메모
}

export interface AdministratorDecision {
  status: DecisionStatus; // 시부인 상태 (시인, 부인, 일부시인)
  admittedPrincipal: number; // 관재인 시인 원금
  admittedInterest: number; // 관재인 시인 이자
  admittedTotal: number; // 관재인 시인액 총계
  deniedAmount: number; // 관재인 부인액
  votingRightAdmitted: number; // 의결권 인정액
  reasonCode: string; // 시부인 사유 코드
  reasonText: string; // 시부인 상세 사유
  reviewedAt?: string; // 심사 완료 일시
}

export interface ReconciliationRecord {
  id: string;
  caseNumber: string; // 사건번호 (e.g., "2025회단142")
  caseName: string; // 사건명 (e.g., "(주)알파테크놀로지 회생절차")
  creditor: CreditorClaim;
  ledger: CompanyLedger;
  decision: AdministratorDecision;
}

export const PRESET_DECISION_REASONS = [
  { code: 'FULL_ADMIT', text: '채무자 장부 및 원증빙과 일치하여 전액 시인함' },
  { code: 'FTX_DEDUCTION', text: 'FTX 도산 및 해외 가상자산 정산액 차감 후 잔액 시인함' },
  { code: 'DUPLICATE_CLAIM', text: '동일 채권에 대한 중복신고로 부인함' },
  { code: 'NO_VOUCHER', text: '원채권 증빙서류 부존재 및 소멸시효 완성으로 부인함' },
  { code: 'INTEREST_EXCEEDED', text: '개시 전 이자율 법정 상한 초과분 부인하고 잔액 시인함' },
  { code: 'TAX_PRIORITY', text: '조세 채권 공제권 행사 및 최고액 시인함' },
  { code: 'CUSTOM', text: '직접 입력' },
];
