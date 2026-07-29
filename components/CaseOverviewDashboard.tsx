'use client';

import React from 'react';
import { 
  Scale, 
  Clock, 
  Building2, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  TrendingDown,
  Calendar,
  Layers
} from 'lucide-react';
import { CaseOverviewMetadata } from '@/types/forensic';
import { ReconciliationRecord } from '@/types/reconciliation';

interface CaseOverviewDashboardProps {
  metadata: CaseOverviewMetadata;
  records: ReconciliationRecord[];
  onNavigateToTab: (tab: any) => void;
}

export const CaseOverviewDashboard: React.FC<CaseOverviewDashboardProps> = ({
  metadata,
  records,
  onNavigateToTab,
}) => {
  const totalClaimsCount = records.length;
  const totalDeclaredAmount = records.reduce((acc, r) => acc + r.creditor.declaredPrincipal + r.creditor.declaredInterest, 0);
  const totalAdmittedAmount = records.reduce((acc, r) => acc + r.decision.admittedTotal, 0);
  const totalDeniedAmount = records.reduce((acc, r) => acc + r.decision.deniedAmount, 0);
  const reviewedCount = records.filter((r) => r.decision.status !== 'PENDING').length;
  const discrepancyCount = records.filter((r) => r.ledger.hasDiscrepancy).length;

  const procedureStages = [
    { stage: 1, title: '회생 개시 신청', date: '2025-01-05', status: 'COMPLETED' },
    { stage: 2, title: '개시 결정 고시', date: '2025-01-15', status: 'COMPLETED' },
    { stage: 3, title: '채권 신고 & 시부인 심사', date: '진행 중 (D-30)', status: 'IN_PROGRESS' },
    { stage: 4, title: '시부인 명세서 법원 제출', date: '2025-02-28 예정', status: 'UPCOMING' },
    { stage: 5, title: '제1회 관계인 집회', date: '2025-04-15 예정', status: 'UPCOMING' },
    { stage: 6, title: '회생 계획안 인가 결정', date: '2025-05-30 예정', status: 'UPCOMING' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Top Case Overview Banner Header */}
      <div className="bg-[#1B2E4B] text-white p-6 rounded shadow-md border-l-4 border-l-[#004E98] border border-[#0A192F] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-slate-300 text-xs font-mono mb-1">
              <span className="bg-[#004E98] text-white px-2 py-0.5 rounded font-bold">{metadata.courtBranch}</span>
              <span>•</span>
              <span>사건번호: {metadata.caseNumber}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{metadata.caseName}</span>
              <span className="text-xs bg-[#2F855A] text-white px-2.5 py-1 rounded font-bold font-mono">
                PROCEDURE ACTIVE
              </span>
            </h1>
            <p className="text-slate-300 text-xs mt-1 max-w-2xl leading-relaxed">
              관재인 법정 조사 및 3-Way 시부인 심사, 디지털 포렌식 증거 관리 종합 플랫폼.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-[#0A192F] p-3.5 rounded border border-[#334e68]">
            <Scale className="w-8 h-8 text-amber-300 flex-shrink-0" />
            <div className="text-xs font-mono">
              <div className="text-slate-400">선임 관재인</div>
              <div className="font-bold text-white text-sm">{metadata.administrator}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. D-Day Countdown Cards & Key Case Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card 1: D-Day Claims Deadline */}
        <div className="bg-white border-2 border-[#C53030] p-4 rounded shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-[#C53030] flex items-center gap-1">
                <Clock className="w-4 h-4" /> 회생채권 신고 마감기한
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono mt-1">D-30 일</div>
            </div>
            <span className="bg-[#FFF1F2] text-[#C53030] border border-rose-300 text-[10px] font-bold px-2 py-0.5 rounded">
              마감임박
            </span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-2 pt-2 border-t border-slate-200">
            기한: {metadata.claimsSubmissionDeadline}
          </div>
        </div>

        {/* Card 2: Total Claimed Amount */}
        <div className="bg-white border border-[#CBD5E1] p-4 rounded shadow-sm">
          <div className="text-xs font-bold text-slate-600 flex items-center gap-1">
            <FileText className="w-4 h-4 text-[#1B2E4B]" /> 신고 채권 총액 ({totalClaimsCount}건)
          </div>
          <div className="text-xl font-black text-[#1B2E4B] font-mono mt-1">
            {totalDeclaredAmount.toLocaleString()} 원
          </div>
          <div className="text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-200 flex justify-between font-mono">
            <span>심사 완료:</span>
            <span className="font-bold text-slate-900">{reviewedCount} / {totalClaimsCount} 건</span>
          </div>
        </div>

        {/* Card 3: Admitted Amount */}
        <div className="bg-white border border-[#CBD5E1] p-4 rounded shadow-sm">
          <div className="text-xs font-bold text-[#2F855A] flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-[#2F855A]" /> 관재인 시인 총액
          </div>
          <div className="text-xl font-black text-[#2F855A] font-mono mt-1">
            {totalAdmittedAmount.toLocaleString()} 원
          </div>
          <div className="text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-200 flex justify-between font-mono">
            <span>시인 비율:</span>
            <span className="font-bold text-[#2F855A]">
              {totalDeclaredAmount ? Math.round((totalAdmittedAmount / totalDeclaredAmount) * 100) : 0}%
            </span>
          </div>
        </div>

        {/* Card 4: Discrepancy & Denied Amount */}
        <div className="bg-white border border-[#CBD5E1] p-4 rounded shadow-sm">
          <div className="text-xs font-bold text-[#D69E2E] flex items-center gap-1">
            <AlertTriangle className="w-4 h-4 text-[#D69E2E]" /> 장부 불일치 / 부인액
          </div>
          <div className="text-xl font-black text-[#C53030] font-mono mt-1">
            {totalDeniedAmount.toLocaleString()} 원
          </div>
          <div className="text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-200 flex justify-between font-mono">
            <span>불일치 채권:</span>
            <span className="font-bold text-[#C53030]">{discrepancyCount} 건 감지됨</span>
          </div>
        </div>
      </div>

      {/* 3. 6-Stage Insolvency Procedure Progress Bar */}
      <div className="bg-white border border-[#CBD5E1] rounded p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2 text-[#1B2E4B] font-bold text-sm">
            <Layers className="w-4 h-4 text-[#004E98]" />
            <span>회생절차 6단계 공정 진행 상태</span>
          </div>
          <span className="text-xs font-mono font-bold text-[#004E98]">
            현재 단계: 3단계 (채권 신고 & 시부인 심사)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 pt-2">
          {procedureStages.map((s) => {
            const isCompleted = s.status === 'COMPLETED';
            const isInProgress = s.status === 'IN_PROGRESS';

            return (
              <div
                key={s.stage}
                className={`p-3 rounded border text-xs flex flex-col justify-between space-y-2 ${
                  isInProgress
                    ? 'bg-[#1B2E4B] text-white border-[#004E98] shadow-md ring-2 ring-blue-500/50'
                    : isCompleted
                    ? 'bg-[#ECFDF5] text-slate-800 border-emerald-300'
                    : 'bg-[#F8FAFC] text-slate-400 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    isInProgress ? 'bg-amber-300 text-slate-900' : isCompleted ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    STEP 0{s.stage}
                  </span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-[#2F855A]" />}
                </div>

                <div className="font-bold text-xs leading-snug">{s.title}</div>
                <div className="text-[10px] font-mono opacity-80">{s.date}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Quick Action Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigateToTab('dashboard')}
          className="bg-white border border-[#CBD5E1] p-5 rounded hover:border-[#1B2E4B] hover:shadow-md transition-all text-left group flex justify-between items-center"
        >
          <div>
            <div className="text-xs font-bold text-[#1B2E4B] group-hover:text-blue-900">
              3-Way 시부인 대시보드 바로가기
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              장부 vs 신고액 교차 검증 및 관재인 수동/자동 판정
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#1B2E4B] transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={() => onNavigateToTab('evidence')}
          className="bg-white border border-[#CBD5E1] p-5 rounded hover:border-[#1B2E4B] hover:shadow-md transition-all text-left group flex justify-between items-center"
        >
          <div>
            <div className="text-xs font-bold text-[#1B2E4B] group-hover:text-blue-900">
              디지털 증거보관소 (Chain of Custody)
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              SHA-256 해시 검증 및 갑/을 호증 서류 포렌식
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#1B2E4B] transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={() => onNavigateToTab('graph')}
          className="bg-white border border-[#CBD5E1] p-5 rounded hover:border-[#1B2E4B] hover:shadow-md transition-all text-left group flex justify-between items-center"
        >
          <div>
            <div className="text-xs font-bold text-[#1B2E4B] group-hover:text-blue-900">
              자금흐름 & 관계망 그래프 바로가기
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              특수관계인 계좌 추적 및 자금 유출 노드 시각화
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#1B2E4B] transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
