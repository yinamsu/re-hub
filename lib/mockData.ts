import { ReconciliationRecord } from '@/types/reconciliation';

export const INITIAL_MOCK_RECORDS: ReconciliationRecord[] = [
  {
    id: 'rec-001',
    caseNumber: '2025회단142',
    caseName: '(주)알파테크놀로지 회생절차',
    creditor: {
      id: 'cred-001',
      filingNo: '회생-001',
      creditorName: '주식회사 코너스톤벤처스',
      bizNo: '110-86-12345',
      address: '서울특별시 강남구 테헤란로 427, 15층',
      contact: '02-555-0192 (채권담당: 김이사)',
      claimType: '투자금 (전환사채 원리금)',
      declaredPrincipal: 1332450000,
      declaredInterest: 45210000,
      currency: 'KRW',
      exchangeRate: 1.0,
      txId: '0x7a8f9c2d1b4e6a3f9e8d7c6b5a4f3e2d1c0b9a8f',
      txVerified: true,
      txTimestamp: '2025-02-10 14:22:01',
      txBlock: 19842105,
      parsedFromDocument: true,
      submittedDate: '2025-02-10',
    },
    ledger: {
      ledgerPrincipal: 1332450000,
      ledgerInterest: 45210000,
      ledgerTotal: 1377660000,
      hasDiscrepancy: false,
    },
    decision: {
      status: 'ADMITTED',
      admittedPrincipal: 1332450000,
      admittedInterest: 45210000,
      admittedTotal: 1377660000,
      deniedAmount: 0,
      votingRightAdmitted: 1377660000,
      reasonCode: 'FULL_ADMIT',
      reasonText: '채무자 장부 및 원증빙과 일치하여 전액 시인함',
      reviewedAt: '2025-02-12 10:30',
    },
  },
  {
    id: 'rec-002',
    caseNumber: '2025회단142',
    caseName: '(주)알파테크놀로지 회생절차',
    creditor: {
      id: 'cred-002',
      filingNo: '회생-002',
      creditorName: '(주)글로벌크립토파트너스',
      bizNo: '220-88-98765',
      address: '서울특별시 서초구 반포대로 90, 8층',
      contact: '02-789-4321',
      claimType: '외화대여금 (가상자산 담보 대출)',
      declaredPrincipal: 850000000,
      declaredInterest: 32000000,
      currency: 'USD',
      exchangeRate: 1417.5,
      txId: '0x3b8d1a9e7f6c5b4a3d2e1f0a9b8c7d6e5f4a3b2c',
      txVerified: true,
      txTimestamp: '2025-02-11 09:15:44',
      txBlock: 19844211,
      parsedFromDocument: true,
      submittedDate: '2025-02-11',
    },
    ledger: {
      ledgerPrincipal: 620000000,
      ledgerInterest: 15000000,
      ledgerTotal: 635000000,
      hasDiscrepancy: true,
      discrepancyReason: 'FTX 파산 정산 반영 및 평가환율 차이 발생 (신고: 8.82억원 vs 장부: 6.35억원)',
    },
    decision: {
      status: 'PARTIALLY_ADMITTED',
      admittedPrincipal: 620000000,
      admittedInterest: 15000000,
      admittedTotal: 635000000,
      deniedAmount: 247000000,
      votingRightAdmitted: 635000000,
      reasonCode: 'FTX_DEDUCTION',
      reasonText: 'FTX 도산 후 해외 가상자산 정산액 차감 후 잔액 시인함',
      reviewedAt: '2025-02-12 11:15',
    },
  },
  {
    id: 'rec-003',
    caseNumber: '2025회단142',
    caseName: '(주)알파테크놀로지 회생절차',
    creditor: {
      id: 'cred-003',
      filingNo: '회생-003',
      creditorName: '한국투자금융 주식회사',
      bizNo: '101-81-00123',
      address: '서울특별시 영등포구 여의대로 56, 한국투자 빌딩',
      contact: '02-3771-8000',
      claimType: '담보부 회생채권 (기계장치 근질권)',
      declaredPrincipal: 2500000000,
      declaredInterest: 125000000,
      currency: 'KRW',
      exchangeRate: 1.0,
      txId: '0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e',
      txVerified: true,
      txTimestamp: '2025-02-11 16:40:12',
      txBlock: 19846002,
      parsedFromDocument: true,
      submittedDate: '2025-02-11',
    },
    ledger: {
      ledgerPrincipal: 2500000000,
      ledgerInterest: 125000000,
      ledgerTotal: 2625000000,
      hasDiscrepancy: false,
    },
    decision: {
      status: 'ADMITTED',
      admittedPrincipal: 2500000000,
      admittedInterest: 125000000,
      admittedTotal: 2625000000,
      deniedAmount: 0,
      votingRightAdmitted: 2625000000,
      reasonCode: 'FULL_ADMIT',
      reasonText: '채무자 장부 및 원증빙과 일치하여 전액 시인함',
      reviewedAt: '2025-02-12 14:00',
    },
  },
  {
    id: 'rec-004',
    caseNumber: '2025회단142',
    caseName: '(주)알파테크놀로지 회생절차',
    creditor: {
      id: 'cred-004',
      filingNo: '회생-004',
      creditorName: '(주)미래소프트웨어',
      bizNo: '124-87-65432',
      address: '경기도 성남시 분당구 판교역로 166, 4층',
      contact: '031-700-1122',
      claimType: '일반 회생채권 (용역대금)',
      declaredPrincipal: 180000000,
      declaredInterest: 5400000,
      currency: 'KRW',
      exchangeRate: 1.0,
      txId: undefined,
      txVerified: false,
      parsedFromDocument: true,
      submittedDate: '2025-02-12',
    },
    ledger: {
      ledgerPrincipal: 0,
      ledgerInterest: 0,
      ledgerTotal: 0,
      hasDiscrepancy: true,
      discrepancyReason: '신고번호 회생-001과 동일 채권 중복 청구 건 (장부상 이중계상 없음)',
    },
    decision: {
      status: 'DENIED',
      admittedPrincipal: 0,
      admittedInterest: 0,
      admittedTotal: 0,
      deniedAmount: 185400000,
      votingRightAdmitted: 0,
      reasonCode: 'DUPLICATE_CLAIM',
      reasonText: '동일 채권에 대한 중복신고로 부인함',
      reviewedAt: '2025-02-12 15:20',
    },
  },
  {
    id: 'rec-005',
    caseNumber: '2025회단142',
    caseName: '(주)알파테크놀로지 회생절차',
    creditor: {
      id: 'cred-005',
      filingNo: '회생-005',
      creditorName: '(주)삼우물산',
      bizNo: '135-81-45678',
      address: '인천광역시 서구 가좌동 123-4',
      contact: '032-570-9900',
      claimType: '상거래 회생채권 (원자재 납품)',
      declaredPrincipal: 420000000,
      declaredInterest: 84000000,
      currency: 'KRW',
      exchangeRate: 1.0,
      txId: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
      txVerified: true,
      txTimestamp: '2025-02-12 11:05:19',
      txBlock: 19847120,
      parsedFromDocument: true,
      submittedDate: '2025-02-12',
    },
    ledger: {
      ledgerPrincipal: 420000000,
      ledgerInterest: 42000000,
      ledgerTotal: 462000000,
      hasDiscrepancy: true,
      discrepancyReason: '신고 이자율(연 20%)이 약정 법정 상한(연 10%)을 초과함',
    },
    decision: {
      status: 'PARTIALLY_ADMITTED',
      admittedPrincipal: 420000000,
      admittedInterest: 42000000,
      admittedTotal: 462000000,
      deniedAmount: 42000000,
      votingRightAdmitted: 462000000,
      reasonCode: 'INTEREST_EXCEEDED',
      reasonText: '개시 전 이자율 법정 상한 초과분 부인하고 잔액 시인함',
      reviewedAt: '2025-02-12 16:10',
    },
  },
  {
    id: 'rec-006',
    caseNumber: '2025회단142',
    caseName: '(주)알파테크놀로지 회생절차',
    creditor: {
      id: 'cred-006',
      filingNo: '회생-006',
      creditorName: '서울특별시 강남구청',
      bizNo: '211-83-00001',
      address: '서울특별시 강남구 학동로 126',
      contact: '02-3423-5114 (세무2과)',
      claimType: '공익채권 / 조세채권 (지방세 및 체납처분비)',
      declaredPrincipal: 95400000,
      declaredInterest: 0,
      currency: 'KRW',
      exchangeRate: 1.0,
      txId: '0x4f5e6d7c8b9a0f1e2d3c4b5a6f7e8d9c0b1a2f3e',
      txVerified: true,
      txTimestamp: '2025-02-12 17:30:00',
      txBlock: 19848050,
      parsedFromDocument: true,
      submittedDate: '2025-02-12',
    },
    ledger: {
      ledgerPrincipal: 95400000,
      ledgerInterest: 0,
      ledgerTotal: 95400000,
      hasDiscrepancy: false,
    },
    decision: {
      status: 'ADMITTED',
      admittedPrincipal: 95400000,
      admittedInterest: 0,
      admittedTotal: 95400000,
      deniedAmount: 0,
      votingRightAdmitted: 95400000,
      reasonCode: 'TAX_PRIORITY',
      reasonText: '조세 채권 공제권 행사 및 최고액 시인함',
      reviewedAt: '2025-02-12 17:45',
    },
  },
];

const LOCAL_STORAGE_KEY = 're_hub_records_v1';

export const getStoredRecords = (): ReconciliationRecord[] => {
  if (typeof window === 'undefined') return INITIAL_MOCK_RECORDS;
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) return INITIAL_MOCK_RECORDS;
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load stored records:', e);
    return INITIAL_MOCK_RECORDS;
  }
};

export const saveStoredRecords = (records: ReconciliationRecord[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save records:', e);
  }
};

export const resetStoredRecords = (): ReconciliationRecord[] => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
  return INITIAL_MOCK_RECORDS;
};
