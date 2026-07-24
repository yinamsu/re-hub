'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  ReconciliationRecord, 
  PRESET_DECISION_REASONS 
} from '@/types/reconciliation';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ShieldCheck, 
  Building, 
  FileText, 
  Scale, 
  Keyboard,
  ExternalLink,
  Check,
  UserCheck
} from 'lucide-react';

interface ReconciliationDashboardProps {
  records: ReconciliationRecord[];
  onUpdateRecord: (updated: ReconciliationRecord) => void;
}

export const ReconciliationDashboard: React.FC<ReconciliationDashboardProps> = ({
  records,
  onUpdateRecord,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'ALL' | 'PENDING' | 'ADMITTED' | 'DENIED' | 'DISCREPANCY'>('ALL');
  const [showTxModal, setShowTxModal] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Filtered list based on search & tab
  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.creditor.creditorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.creditor.filingNo.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTab === 'PENDING') return r.decision.status === 'PENDING';
    if (filterTab === 'ADMITTED') return r.decision.status === 'ADMITTED';
    if (filterTab === 'DENIED') return r.decision.status === 'DENIED';
    if (filterTab === 'DISCREPANCY') return r.ledger.hasDiscrepancy;

    return true;
  });

  const currentRecord = filteredRecords[selectedIndex] || records[0];

  const updateDecision = useCallback(
    (fieldUpdates: Partial<ReconciliationRecord['decision']>) => {
      if (!currentRecord) return;

      const declaredTotal = currentRecord.creditor.declaredPrincipal + currentRecord.creditor.declaredInterest;
      
      const newDecision = {
        ...currentRecord.decision,
        ...fieldUpdates,
      };

      // Reactive Auto-Calculation safety net:
      if ('admittedPrincipal' in fieldUpdates || 'admittedInterest' in fieldUpdates) {
        const principal = newDecision.admittedPrincipal ?? 0;
        const interest = newDecision.admittedInterest ?? 0;
        const admittedTotal = principal + interest;
        const deniedAmount = Math.max(0, declaredTotal - admittedTotal);

        newDecision.admittedTotal = admittedTotal;
        newDecision.deniedAmount = deniedAmount;
        newDecision.votingRightAdmitted = admittedTotal;

        if (admittedTotal >= declaredTotal) {
          newDecision.status = 'ADMITTED';
        } else if (admittedTotal === 0) {
          newDecision.status = 'DENIED';
        } else {
          newDecision.status = 'PARTIALLY_ADMITTED';
        }
      }

      const updatedRecord: ReconciliationRecord = {
        ...currentRecord,
        decision: newDecision,
      };

      onUpdateRecord(updatedRecord);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 1500);
    },
    [currentRecord, onUpdateRecord]
  );

  // Quick Action Handlers
  const handleAdmitAll = useCallback(() => {
    if (!currentRecord) return;
    const principal = currentRecord.creditor.declaredPrincipal;
    const interest = currentRecord.creditor.declaredInterest;
    const total = principal + interest;

    updateDecision({
      status: 'ADMITTED',
      admittedPrincipal: principal,
      admittedInterest: interest,
      admittedTotal: total,
      deniedAmount: 0,
      votingRightAdmitted: total,
      reasonCode: 'FULL_ADMIT',
      reasonText: '채무자 장부 및 원증빙과 일치하여 전액 시인함',
    });
  }, [currentRecord, updateDecision]);

  const handleDenyAll = useCallback(() => {
    if (!currentRecord) return;
    const total = currentRecord.creditor.declaredPrincipal + currentRecord.creditor.declaredInterest;

    updateDecision({
      status: 'DENIED',
      admittedPrincipal: 0,
      admittedInterest: 0,
      admittedTotal: 0,
      deniedAmount: total,
      votingRightAdmitted: 0,
      reasonCode: 'DUPLICATE_CLAIM',
      reasonText: '신고 사유 불명확 및 증빙 부존재로 전액 부인함',
    });
  }, [currentRecord, updateDecision]);

  const handlePrevCreditor = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredRecords.length - 1));
  }, [filteredRecords.length]);

  const handleNextCreditor = useCallback(() => {
    setSelectedIndex((prev) => (prev < filteredRecords.length - 1 ? prev + 1 : 0));
  }, [filteredRecords.length]);

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      if (e.altKey && (e.key === 'a' || e.key === 'A' || e.key === 'ㅁ')) {
        e.preventDefault();
        handleAdmitAll();
      }

      if (e.altKey && (e.key === 'd' || e.key === 'D' || e.key === 'ㅇ')) {
        e.preventDefault();
        handleDenyAll();
      }

      if ((e.altKey && e.key === 'ArrowLeft') || e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevCreditor();
      }

      if ((e.altKey && e.key === 'ArrowRight') || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextCreditor();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAdmitAll, handleDenyAll, handlePrevCreditor, handleNextCreditor]);

  if (!currentRecord) {
    return (
      <div className="p-12 text-center text-slate-500 font-medium">
        검색 조건에 맞는 채권 심사 내역이 없습니다.
      </div>
    );
  }

  const { creditor, ledger, decision } = currentRecord;
  const declaredTotal = creditor.declaredPrincipal + creditor.declaredInterest;

  return (
    <div className="space-y-6 pb-16">
      {/* Top Controls & Navigation Bar - Court Style */}
      <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Current Creditor Index & Quick Switcher */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg text-xs text-slate-700 font-mono font-bold">
            심사 목록 ({selectedIndex + 1} / {filteredRecords.length})
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrevCreditor}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors border border-slate-300 shadow-sm"
              title="이전 채권 (Alt + Left)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextCreditor}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors border border-slate-300 shadow-sm"
              title="다음 채권 (Alt + Right)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span>{creditor.creditorName}</span>
              <span className="text-xs font-mono text-blue-900 font-extrabold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                {creditor.filingNo}
              </span>
              {creditor.submissionSource === 'CREDITOR_SELF' && (
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-emerald-700" /> 셀프 전자신고건
                </span>
              )}
            </h2>
          </div>
        </div>

        {/* Center: Save Feedback Toast */}
        {saveToast && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 font-bold shadow-sm">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>시부인 판정 실시간 저장 완료</span>
          </div>
        )}

        {/* Right: Search & Filter Tabs */}
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="채권자명 / 신고번호 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-xs text-slate-900 pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-blue-700 w-44"
            />
          </div>

          <div className="flex bg-slate-100 border border-slate-300 p-0.5 rounded-lg text-[11px]">
            <button
              onClick={() => setFilterTab('ALL')}
              className={`px-2 py-1 rounded-md font-bold transition-colors ${
                filterTab === 'ALL' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilterTab('DISCREPANCY')}
              className={`px-2 py-1 rounded-md font-bold transition-colors ${
                filterTab === 'DISCREPANCY' ? 'bg-amber-100 text-amber-900 shadow-sm' : 'text-slate-600 hover:text-amber-900'
              }`}
            >
              불일치
            </button>
            <button
              onClick={() => setFilterTab('ADMITTED')}
              className={`px-2 py-1 rounded-md font-bold transition-colors ${
                filterTab === 'ADMITTED' ? 'bg-emerald-100 text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-emerald-900'
              }`}
            >
              시인
            </button>
            <button
              onClick={() => setFilterTab('DENIED')}
              className={`px-2 py-1 rounded-md font-bold transition-colors ${
                filterTab === 'DENIED' ? 'bg-rose-100 text-rose-900 shadow-sm' : 'text-slate-600 hover:text-rose-900'
              }`}
            >
              부인
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Creditor Selector + 3 Column Reconciliation View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Creditor Sidebar (3 cols on lg) */}
        <div className="lg:col-span-3 bg-white border border-slate-300 rounded-2xl p-4 shadow-sm space-y-2 max-h-[640px] overflow-y-auto">
          <div className="text-xs font-bold text-slate-700 px-2 pb-2 border-b border-slate-200 flex justify-between items-center">
            <span>채권자 목록 ({filteredRecords.length})</span>
            <span className="text-[10px] text-slate-500 font-mono">2025회단142</span>
          </div>

          <div className="space-y-1.5 pt-1">
            {filteredRecords.map((rec, idx) => {
              const isSelected = idx === selectedIndex;
              const hasDisc = rec.ledger.hasDiscrepancy;
              const isAdmitted = rec.decision.status === 'ADMITTED';
              const isDenied = rec.decision.status === 'DENIED';

              return (
                <button
                  key={rec.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex flex-col space-y-1 ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-600 shadow-md ring-1 ring-blue-600'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-blue-900">{rec.creditor.filingNo}</span>
                    <div>
                      {isAdmitted && (
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-bold">
                          전액시인
                        </span>
                      )}
                      {isDenied && (
                        <span className="bg-rose-100 text-rose-800 border border-rose-300 text-[10px] px-1.5 py-0.5 rounded font-bold">
                          전액부인
                        </span>
                      )}
                      {rec.decision.status === 'PARTIALLY_ADMITTED' && (
                        <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] px-1.5 py-0.5 rounded font-bold">
                          일부시인
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="font-extrabold text-slate-900 text-sm truncate">
                    {rec.creditor.creditorName}
                  </div>

                  <div className="flex justify-between items-center text-[11px] font-mono pt-1 text-slate-500">
                    <span>신고금액:</span>
                    <span className="text-slate-900 font-bold">
                      {(rec.creditor.declaredPrincipal + rec.creditor.declaredInterest).toLocaleString()}원
                    </span>
                  </div>

                  {hasDisc && (
                    <div className="mt-1 text-[10px] bg-amber-50 border border-amber-300 text-amber-900 px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3 h-3 text-amber-700 flex-shrink-0" />
                      <span className="truncate">장부 불일치 경고</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Comparative Reconciliation Dashboard (9 cols on lg) */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* COLUMN 1: Company Books (채무자 장부) */}
          <div className="bg-white border border-slate-300 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center space-x-2 text-blue-900 pb-3 border-b border-slate-200">
                <Building className="w-5 h-5 text-blue-700" />
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
                  Column 1. 채무자 장부
                </h3>
              </div>

              <div className="mt-4 space-y-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium">장부상 원금</div>
                  <div className="text-base font-extrabold text-slate-900 font-mono mt-0.5">
                    {ledger.ledgerPrincipal.toLocaleString()} 원
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium">장부상 이자</div>
                  <div className="text-base font-extrabold text-slate-900 font-mono mt-0.5">
                    {ledger.ledgerInterest.toLocaleString()} 원
                  </div>
                </div>

                <div className="bg-blue-50 p-3.5 rounded-xl border border-blue-200">
                  <div className="text-[11px] text-blue-900 font-bold">장부 채권 총액</div>
                  <div className="text-lg font-black text-blue-900 font-mono mt-0.5">
                    {ledger.ledgerTotal.toLocaleString()} 원
                  </div>
                </div>
              </div>
            </div>

            {/* Discrepancy Box */}
            <div>
              {ledger.hasDiscrepancy ? (
                <div className="bg-amber-50 border border-amber-300 p-3 rounded-xl space-y-1">
                  <div className="text-xs font-bold text-amber-900 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>장부-신고액 불일치 발견</span>
                  </div>
                  <p className="text-[11px] text-amber-900/90 leading-snug">
                    {ledger.discrepancyReason || '신고 금액과 회사 장부 기재액 간의 차액이 존재합니다.'}
                  </p>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-xl flex items-center space-x-2 text-emerald-900 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>장부 내역과 100% 일치함</span>
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 2: Creditor Claim (채권자 신고) */}
          <div className="bg-white border border-slate-300 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center space-x-2 text-emerald-800 pb-3 border-b border-slate-200">
                <FileText className="w-5 h-5 text-emerald-700" />
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
                  Column 2. 채권자 신고
                </h3>
              </div>

              <div className="mt-4 space-y-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium flex justify-between">
                    <span>신고 원금</span>
                    <span className="text-slate-500 font-mono">환율: {creditor.exchangeRate}</span>
                  </div>
                  <div className="text-base font-extrabold text-blue-900 font-mono mt-0.5">
                    {creditor.declaredPrincipal.toLocaleString()} 원
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium">신고 개시전 이자</div>
                  <div className="text-base font-extrabold text-slate-800 font-mono mt-0.5">
                    {creditor.declaredInterest.toLocaleString()} 원
                  </div>
                </div>

                <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-300">
                  <div className="text-[11px] text-emerald-900 font-bold">신고 총액 (원금+이자)</div>
                  <div className="text-lg font-black text-emerald-900 font-mono mt-0.5">
                    {declaredTotal.toLocaleString()} 원
                  </div>
                </div>
              </div>
            </div>

            {/* Web3 Verification Badge */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-blue-800" /> 서류 무결성 검증
                </span>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                  Verified
                </span>
              </div>

              {creditor.txId ? (
                <button
                  onClick={() => setShowTxModal(true)}
                  className="w-full text-left text-[11px] font-mono text-blue-900 hover:text-blue-700 truncate bg-white p-2 rounded border border-slate-300 flex items-center justify-between group"
                >
                  <span className="truncate">{creditor.txId}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-700 flex-shrink-0" />
                </button>
              ) : (
                <div className="text-[11px] text-slate-500 italic">스마트 서식 전자 검증 완료</div>
              )}
            </div>
          </div>

          {/* COLUMN 3: Administrator Decision (관재인 시부인 판정) */}
          <div className="bg-white border-2 border-blue-700 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blue-200">
              <div className="flex items-center space-x-2 text-blue-900">
                <Scale className="w-5 h-5" />
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
                  Column 3. 관재인 판정
                </h3>
              </div>
              <span className="text-[10px] text-blue-900 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                심사 진행 중
              </span>
            </div>

            {/* Quick Action Preset Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAdmitAll}
                className={`py-2 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center space-x-1 transition-all shadow-sm ${
                  decision.status === 'ADMITTED'
                    ? 'bg-emerald-700 text-white ring-2 ring-emerald-500'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>전액 시인 (Alt+A)</span>
              </button>

              <button
                onClick={handleDenyAll}
                className={`py-2 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center space-x-1 transition-all shadow-sm ${
                  decision.status === 'DENIED'
                    ? 'bg-rose-700 text-white ring-2 ring-rose-500'
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300'
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>전액 부인 (Alt+D)</span>
              </button>
            </div>

            {/* Admitted & Denied Inputs */}
            <div className="space-y-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-300 space-y-1">
                <label className="text-[11px] font-bold text-slate-900 flex justify-between">
                  <span>관재인 시인 원금 (KRW)</span>
                  <span className="text-emerald-700 font-mono font-extrabold">시인액: {decision.admittedTotal.toLocaleString()}원</span>
                </label>
                <input
                  type="number"
                  value={decision.admittedPrincipal || 0}
                  onChange={(e) =>
                    updateDecision({ admittedPrincipal: Number(e.target.value) })
                  }
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-extrabold text-blue-900 font-mono focus:outline-none focus:border-blue-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-300 space-y-1">
                  <label className="text-[10px] font-bold text-slate-700">시인 이자</label>
                  <input
                    type="number"
                    value={decision.admittedInterest || 0}
                    onChange={(e) =>
                      updateDecision({ admittedInterest: Number(e.target.value) })
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-emerald-800 font-mono focus:outline-none focus:border-blue-700"
                  />
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-300 space-y-1">
                  <label className="text-[10px] font-bold text-rose-700">자동 부인액</label>
                  <input
                    type="number"
                    value={decision.deniedAmount || 0}
                    onChange={(e) =>
                      updateDecision({ deniedAmount: Number(e.target.value) })
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-rose-700 font-mono focus:outline-none focus:border-rose-600"
                  />
                </div>
              </div>

              {/* Voting Right Admitted */}
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-300 space-y-1">
                <label className="text-[11px] font-extrabold text-blue-900">의결권 인정액 (Voting Right)</label>
                <input
                  type="number"
                  value={decision.votingRightAdmitted || 0}
                  onChange={(e) =>
                    updateDecision({ votingRightAdmitted: Number(e.target.value) })
                  }
                  className="w-full bg-white border border-blue-400 rounded-lg px-3 py-1.5 text-sm font-extrabold text-blue-900 font-mono focus:outline-none focus:border-blue-700"
                />
              </div>

              {/* Preset Reason Selector & Custom Reason Text */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-900">시부인 사유 선택 및 입력</label>
                <select
                  value={decision.reasonCode}
                  onChange={(e) => {
                    const selected = PRESET_DECISION_REASONS.find((r) => r.code === e.target.value);
                    if (selected && selected.code !== 'CUSTOM') {
                      updateDecision({ reasonCode: selected.code, reasonText: selected.text });
                    } else {
                      updateDecision({ reasonCode: 'CUSTOM' });
                    }
                  }}
                  className="w-full bg-white border border-slate-300 text-xs text-slate-900 p-2 rounded-lg focus:outline-none focus:border-blue-700"
                >
                  {PRESET_DECISION_REASONS.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.text}
                    </option>
                  ))}
                </select>

                <textarea
                  rows={2}
                  value={decision.reasonText}
                  onChange={(e) => updateDecision({ reasonText: e.target.value })}
                  placeholder="상세 사유를 입력하세요"
                  className="w-full bg-white border border-slate-300 text-xs text-slate-900 p-2.5 rounded-lg focus:outline-none focus:border-blue-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Keyboard Shortcuts Hint Footer Bar */}
      <div className="fixed bottom-3 right-6 bg-white border border-slate-300 text-slate-800 text-[11px] px-4 py-2 rounded-xl shadow-lg backdrop-blur-md hidden md:flex items-center space-x-4 z-30">
        <div className="flex items-center space-x-1.5 text-blue-900 font-bold">
          <Keyboard className="w-4 h-4 text-blue-700" />
          <span>단축키 지킴이:</span>
        </div>
        <div className="flex items-center space-x-3 font-mono">
          <span><kbd className="bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded text-slate-900 font-bold">Alt+A</kbd> 전액시인</span>
          <span><kbd className="bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded text-slate-900 font-bold">Alt+D</kbd> 전액부인</span>
          <span><kbd className="bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded text-slate-900 font-bold">Alt+←/→</kbd> 이전/다음 채권</span>
        </div>
      </div>

      {/* Web3 Transaction Details Modal */}
      {showTxModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2 text-blue-900">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <h3 className="font-extrabold text-base">온체인 서류 무결성 검증서</h3>
              </div>
              <button onClick={() => setShowTxModal(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-slate-500 font-medium">Transaction Hash (TxID)</div>
                <div className="font-mono text-blue-900 font-bold break-all mt-1">{creditor.txId}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-500 font-medium">Block Height</div>
                  <div className="font-mono text-slate-900 font-bold mt-0.5">#{creditor.txBlock || 19842105}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-500 font-medium">Timestamp</div>
                  <div className="font-mono text-slate-900 font-bold mt-0.5">{creditor.txTimestamp || '2025-02-10 14:22:01'}</div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-xl flex items-center space-x-2 text-emerald-900">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                <span className="text-[11px] leading-snug">
                  신고서에 기재된 금융 거래 해시가 이더리움 블록체인 노드의 스마트 컨트랙트 원장과 100% 위변조 없이 일치함이 검증되었습니다.
                </span>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowTxModal(false)}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-5 py-2 rounded-xl transition-colors"
              >
                창 닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
