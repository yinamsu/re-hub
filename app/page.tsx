'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { DocumentUploader } from '@/components/DocumentUploader';
import { ReconciliationDashboard } from '@/components/ReconciliationDashboard';
import { CourtReportExporter } from '@/components/CourtReportExporter';
import { CreditorSelfFiling } from '@/components/CreditorSelfFiling';
import { UserManualModal } from '@/components/UserManualModal';
import { 
  ReconciliationRecord 
} from '@/types/reconciliation';
import { 
  getStoredRecords, 
  saveStoredRecords, 
  resetStoredRecords 
} from '@/lib/mockData';
import { Scale, ExternalLink } from 'lucide-react';

export default function Home() {
  const [records, setRecords] = useState<ReconciliationRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'upload' | 'dashboard' | 'export' | 'creditor-self'>('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFooterManual, setShowFooterManual] = useState(false);

  useEffect(() => {
    const data = getStoredRecords();
    setRecords(data);
    setIsLoaded(true);
  }, []);

  const handleUpdateRecord = (updated: ReconciliationRecord) => {
    setRecords((prev) => {
      const next = prev.map((r) => (r.id === updated.id ? updated : r));
      saveStoredRecords(next);
      return next;
    });
  };

  const handleAddRecord = (newRecord: ReconciliationRecord) => {
    setRecords((prev) => {
      const next = [newRecord, ...prev];
      saveStoredRecords(next);
      return next;
    });
  };

  const handleResetData = () => {
    const fresh = resetStoredRecords();
    setRecords(fresh);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-slate-700 font-mono text-sm">
        대한민국 법원 회생·파산 전자소송포털 로딩 중...
      </div>
    );
  }

  const reviewedCount = records.filter((r) => r.decision.status !== 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans selection:bg-[#1C2A45] selection:text-white">
      {/* Official Court Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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

      {/* Official Court Footer (대한민국 법원 전자소송포털 하단 푸터 규격) */}
      <footer className="mt-auto border-t border-slate-300">
        {/* Top Footer Tier: Links & Site Selector (#363D48) */}
        <div className="bg-[#363D48] text-slate-300 text-xs py-2.5 px-4 border-b border-slate-700">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex flex-wrap items-center space-x-3 text-[11px]">
              <button onClick={() => setShowFooterManual(true)} className="hover:underline font-bold text-white">이용약관</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline font-bold text-amber-300">개인정보처리방침</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline">저작권보호정책</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline">링크사용주의사항</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline">문제해결안내</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline">고객의 소리</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline">원격지원 서비스</button>
            </div>

            <div className="flex items-center space-x-2 text-[11px]">
              <select className="bg-[#2B303A] border border-slate-600 text-slate-200 px-2 py-1 rounded text-xs">
                <option value="ecourt">관련사이트: 대한민국 대법원</option>
                <option value="rehabilitation">서울회생법원 전자민원센터</option>
                <option value="rehub">Re-Hub 관재인 플랫폼</option>
              </select>
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-2.5 py-1 rounded font-bold text-xs">
                바로가기
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer Tier: Court Emblem & Copyright & WA Mark (#2B303A) */}
        <div className="bg-[#2B303A] text-slate-400 text-xs py-5 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left: Court Emblem */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 border border-slate-600 rounded-full flex items-center justify-center text-slate-300 bg-slate-800">
                <Scale className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <div className="text-white text-xs font-bold flex items-center gap-2">
                  <span>이용 및 장애 문의:</span>
                  <span className="text-amber-300 font-mono font-black text-sm">02) 3480-1715</span>
                  <span className="text-slate-400 text-[11px] font-normal">(평일 9시~18시)</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  COPYRIGHT © 2025 SUPREME COURT OF KOREA. ALL RIGHTS RESERVED. (Re-Hub Insolvency SaaS)
                </div>
              </div>
            </div>

            {/* Right: Web Accessibility WA Badge */}
            <div className="flex items-center space-x-3">
              <div className="border border-slate-600 bg-slate-800 px-3 py-1 rounded text-center">
                <div className="text-[10px] font-bold text-amber-300">웹접근성 품질인증</div>
                <div className="text-[9px] text-slate-400 font-mono">WA CERTIFIED</div>
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
