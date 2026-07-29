export type EvidenceCategory = 'CONTRACT' | 'BANK_STATEMENT' | 'TAX_INVOICE' | 'EMAIL' | 'CHAT_LOG' | 'AUDIT_REPORT';
export type VerificationStatus = 'VERIFIED' | 'TAMPERED' | 'PENDING';

export interface ForensicEvidence {
  id: string;
  courtLabel: string; // 갑 제1호증, 을 제2호증
  title: string;
  category: EvidenceCategory;
  fileName: string;
  fileSize: string;
  sha256Hash: string; // e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
  intakeTimestamp: string;
  custodian: string;
  verificationStatus: VerificationStatus;
  linkedCreditorFilingNo?: string;
  summary: string;
}

export type TimelineSide = 'PLAINTIFF_CLAIM' | 'DEFENDANT_REBUTTAL' | 'NEUTRAL_FACT';

export interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  category: 'BANK_TRANSFER' | 'LEGAL_BRIEF' | 'CONTRACT' | 'BOARD_MEETING' | 'FORENSIC_DISCOVERY' | 'COURT_ORDER';
  description: string;
  claimSide: TimelineSide;
  linkedEvidenceId?: string;
  linkedEvidenceLabel?: string;
  amount?: number;
  partiesInvolved: string[];
}

export type NodeType = 'COMPANY' | 'INDIVIDUAL' | 'BANK_ACCOUNT' | 'AFFILIATE';

export interface EntityNode {
  id: string;
  name: string;
  type: NodeType;
  role: string; // e.g. "채무자 회생기업", "최대주주 및 대표이사", "특수관계 법인", "투자 주간사"
  registrationNo?: string;
  riskScore: number; // 0 - 100
  x: number; // visual layout %
  y: number;
}

export interface TransactionLink {
  id: string;
  sourceId: string;
  targetId: string;
  relationType: 'FUNDS_TRANSFER' | 'SHAREHOLDING' | 'GUARANTEE' | 'CONTRACTUAL';
  label: string;
  amountKRW?: number;
  isSuspicious: boolean;
}

export interface CaseOverviewMetadata {
  caseNumber: string;
  caseName: string;
  courtBranch: string;
  presidingJudge: string;
  debtorCompany: string;
  debtorRepresentative: string;
  administrator: string;
  filingDate: string;
  statuteOfLimitationsDeadline: string;
  claimsSubmissionDeadline: string;
  stakeholdersMeetingDate: string;
  currentProcedureStage: number; // 1 to 6
}
