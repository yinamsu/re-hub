'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Sidebar, MainTabType } from '@/components/Sidebar';
import { RightContextPanel } from '@/components/RightContextPanel';
import { CaseOverviewDashboard } from '@/components/CaseOverviewDashboard';
import { ForensicEvidenceVault } from '@/components/ForensicEvidenceVault';
import { CaseTimelineMapping } from '@/components/CaseTimelineMapping';
import { EntityRelationshipGraph } from '@/components/EntityRelationshipGraph';
import { ReconciliationDashboard } from '@/components/ReconciliationDashboard';
import { DocumentUploader } from '@/components/DocumentUploader';
import { CourtReportExporter } from '@/components/CourtReportExporter';
import { CreditorSelfFiling } from '@/components/CreditorSelfFiling';
import { UserManualModal } from '@/components/UserManualModal';

import { ReconciliationRecord } from '@/types/reconciliation';
import { CaseInfo } from '@/types/reconciliation';
import { 
  getStoredRecords, 
  saveStoredRecords, 
  resetStoredRecords,
  AVAILABLE_CASES
} from '@/lib/mockData';
import { 
  INITIAL_CASE_METADATA, 
  FORENSIC_EVIDENCE_ITEMS, 
  TIMELINE_EVENTS, 
  ENTITY_NODES, 
  TRANSACTION_LINKS 
} from '@/lib/forensicData';
import { ShieldCheck, BookOpen, ArrowUp } from 'lucide-react';

export default function Home() {
  const [currentCase, setCurrentCase] = useState<CaseInfo>(AVAILABLE_CASES[0]);
  const [records, setRecords] = useState<ReconciliationRecord[]>([]);
  const [activeTab, setActiveTab] = useState<MainTabType>('overview');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFooterManual, setShowFooterManual] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-[#0A60C2] font-mono text-sm font-bold">
        Re-Hub 회생·파산 플랫폼 로딩 중...
      </div>
    );
  }

  const unreviewedCount = records.filter((r) => r.decision.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#222222] flex flex-col font-sans selection:bg-[#0A60C2] selection:text-white relative">
      {/* 1. Top Header */}
      <Header
        currentCase={currentCase}
        onSelectCase={handleSelectCase}
        totalRecords={records.length}
        reviewedRecords={records.length - unreviewedCount}
        onResetData={handleResetData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* 2. Main 3-to-4 Pane Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Re-Hub Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          evidenceCount={FORENSIC_EVIDENCE_ITEMS.length}
          unreviewedCount={unreviewedCount}
        />

        {/* Center Main Workspace */}
        <main className="flex-1 overflow-y-auto px-6 py-6 bg-[#F8F9FA]">
          {activeTab === 'overview' && (
            <CaseOverviewDashboard
              metadata={INITIAL_CASE_METADATA}
              records={records}
              onNavigateToTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'dashboard' && (
            <ReconciliationDashboard
              records={records}
              onUpdateRecord={handleUpdateRecord}
            />
          )}

          {activeTab === 'evidence' && (
            <ForensicEvidenceVault
              evidenceItems={FORENSIC_EVIDENCE_ITEMS}
            />
          )}

          {activeTab === 'timeline' && (
            <CaseTimelineMapping
              timelineEvents={TIMELINE_EVENTS}
            />
          )}

          {activeTab === 'graph' && (
            <EntityRelationshipGraph
              nodes={ENTITY_NODES}
              links={TRANSACTION_LINKS}
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

        {/* Right Pane: Context Inspector Drawer */}
        <RightContextPanel
          isOpen={isRightPanelOpen}
          onClose={() => setIsRightPanelOpen(false)}
          metadata={INITIAL_CASE_METADATA}
          evidenceItems={FORENSIC_EVIDENCE_ITEMS}
        />
      </div>

      {/* 3. Re-Hub Clean 2-Tier Footer */}
      <footer className="mt-auto border-t border-slate-300 z-10 text-xs">
        {/* Top Tier (#363D48) */}
        <div className="bg-[#363D48] text-slate-200 py-2.5 px-4 border-b border-[#2B303A]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center space-x-3 text-[11px] text-slate-300">
              <button onClick={() => setShowFooterManual(true)} className="hover:underline font-bold text-white">이용약관</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline font-bold text-amber-300">개인정보처리방침</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline flex items-center gap-1 text-blue-200">
                <BookOpen className="w-3 h-3" />
                <span>관재인·채권자 상세 이용 매뉴얼</span>
              </button>
            </div>

            <div className="flex items-center space-x-2 text-[11px]">
              <span className="text-slate-400">서울회생법원 실무 준칙 별표 2-2 표준 서식 출력 지원</span>
            </div>
          </div>
        </div>

        {/* Bottom Tier (#2B303A) */}
        <div className="bg-[#2B303A] text-slate-300 py-5 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 border border-slate-600 rounded-lg flex items-center justify-center text-amber-300 bg-[#1C2A45]">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="space-y-0.5">
                <div className="text-white text-xs font-bold flex items-center gap-2">
                  <span>Re-Hub 회생·파산 채권 관리 플랫폼</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  COPYRIGHT © 2025 RE-HUB PLATFORM. ALL RIGHTS RESERVED.
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <span className="text-[11px] text-slate-400">서울회생법원 별표 2-2 규격 엑셀 다운로드 지원</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating TOP Button */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-2 z-40">
        <button 
          onClick={scrollToTop}
          className="bg-white border border-slate-300 text-slate-800 text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-md hover:bg-slate-100 flex items-center justify-center space-x-0.5"
        >
          <span>TOP</span>
          <ArrowUp className="w-3 h-3" />
        </button>
      </div>

      {/* Footer User Manual Modal */}
      <UserManualModal
        isOpen={showFooterManual}
        onClose={() => setShowFooterManual(false)}
      />
    </div>
  );
}
