'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { DocumentUploader } from '@/components/DocumentUploader';
import { ReconciliationDashboard } from '@/components/ReconciliationDashboard';
import { CourtReportExporter } from '@/components/CourtReportExporter';
import { CreditorSelfFiling } from '@/components/CreditorSelfFiling';
import { UserManualModal } from '@/components/UserManualModal';
import { 
  ReconciliationRecord,
  CaseInfo
} from '@/types/reconciliation';
import { 
  getStoredRecords, 
  saveStoredRecords, 
  resetStoredRecords,
  AVAILABLE_CASES
} from '@/lib/mockData';
import { ShieldCheck, BookOpen } from 'lucide-react';

export default function Home() {
  const [currentCase, setCurrentCase] = useState<CaseInfo>(AVAILABLE_CASES[0]);
  const [records, setRecords] = useState<ReconciliationRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'upload' | 'dashboard' | 'export' | 'creditor-self'>('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFooterManual, setShowFooterManual] = useState(false);

  useEffect(() => {
    const data = getStoredRecords(currentCase.caseNumber);
    setRecords(data);
    setIsLoaded(true);
  }, [currentCase]);

  const handleSelectCase = (caseInfo: CaseInfo) => {
    setCurrentCase(caseInfo);
    const data = getStoredRecords(caseInfo.caseNumber);
    setRecords(data);
  };

  const handleUpdateRecord = (updated: ReconciliationRecord) => {
    setRecords((prev) => {
      const next = prev.map((r) => (r.id === updated.id ? updated : r));
      saveStoredRecords(next, currentCase.caseNumber);
      return next;
    });
  };

  const handleAddRecord = (newRecord: ReconciliationRecord) => {
    setRecords((prev) => {
      const next = [newRecord, ...prev];
      saveStoredRecords(next, currentCase.caseNumber);
      return next;
    });
  };

  const handleResetData = () => {
    const fresh = resetStoredRecords(currentCase.caseNumber);
    setRecords(fresh);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-slate-700 font-mono text-sm">
        Re-Hub Insolvency SaaS Loading...
      </div>
    );
  }

  const reviewedCount = records.filter((r) => r.decision.status !== 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans selection:bg-[#1C2A45] selection:text-white">
      {/* Re-Hub Court-Style Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentCase={currentCase}
        onSelectCase={handleSelectCase}
        totalRecords={records.length}
        reviewedRecords={reviewedCount}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'upload' && (
          <DocumentUploader
            onAddParsedRecord={handleAddRecord}
            onNavigateToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'dashboard' && (
          <ReconciliationDashboard
            records={records}
            onUpdateRecord={handleUpdateRecord}
          />
        )}

        {activeTab === 'export' && (
          <CourtReportExporter records={records} />
        )}

        {activeTab === 'creditor-self' && (
          <CreditorSelfFiling
            onAddRecord={handleAddRecord}
            onNavigateToDashboard={() => setActiveTab('dashboard')}
          />
        )}
      </main>

      {/* Re-Hub Clean SaaS Footer */}
      <footer className="mt-auto border-t border-slate-300">
        {/* Top Footer Tier (#363D48) */}
        <div className="bg-[#363D48] text-slate-300 text-xs py-2.5 px-4 border-b border-slate-700">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex flex-wrap items-center space-x-3 text-[11px]">
              <button onClick={() => setShowFooterManual(true)} className="hover:underline font-bold text-white">이용약관</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline font-bold text-amber-300">개인정보처리방침</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline flex items-center gap-1 text-blue-200">
                <BookOpen className="w-3 h-3" />
                <span>상세 이용 매뉴얼</span>
              </button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline">시스템 문제해결안내</button>
            </div>

            <div className="flex items-center space-x-2 text-[11px]">
              <span className="text-slate-400">회생법원 실무 준칙 별표 2-2 서식 규격 지원</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer Tier (#2B303A) */}
        <div className="bg-[#2B303A] text-slate-400 text-xs py-5 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 border border-slate-600 rounded-xl flex items-center justify-center text-amber-300 bg-slate-800">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="space-y-0.5">
                <div className="text-white text-xs font-extrabold flex items-center gap-2">
                  <span>Re-Hub Insolvency Administration SaaS</span>
                  <span className="text-amber-300 text-[10px] font-mono font-bold bg-slate-800 px-1.5 py-0.2 rounded border border-slate-700">
                    Court Compliance Ready
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  COPYRIGHT © 2025 RE-HUB PLATFORM. ALL RIGHTS RESERVED.
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <div className="border border-slate-700 bg-slate-800 px-3 py-1 rounded text-center">
                <div className="text-[10px] font-bold text-slate-300">서울회생법원 표준 양식 연동</div>
                <div className="text-[9px] text-slate-400 font-mono">STRICT COURT COMPLIANCE</div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer User Manual Modal */}
      <UserManualModal
        isOpen={showFooterManual}
        onClose={() => setShowFooterManual(false)}
      />
    </div>
  );
}
