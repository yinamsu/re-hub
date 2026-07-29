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
import { Scale, BookOpen, MessageCircle, ArrowUp } from 'lucide-react';

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
        대한민국 법원 전자소송 연동 Re-Hub 관재인 포털 로딩 중...
      </div>
    );
  }

  const unreviewedCount = records.filter((r) => r.decision.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#222222] flex flex-col font-sans selection:bg-[#0A60C2] selection:text-white relative">
      {/* 1. Top Header (1:1 Supreme Court Portal Bar) */}
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
        {/* Left Pane: Official Court Sidebar */}
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

      {/* 3. Official Supreme Court Electronic Portal 2-Tier Footer (1:1 Court Portal Footer) */}
      <footer className="mt-auto border-t border-slate-300 z-10 text-xs">
        {/* Top Tier (#363D48) */}
        <div className="bg-[#363D48] text-slate-200 py-2.5 px-4 border-b border-[#2B303A]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center space-x-3 text-[11px] text-slate-300">
              <button onClick={() => setShowFooterManual(true)} className="hover:underline font-bold text-white">이용약관</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline font-bold text-amber-300">개인정보처리방침</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline">저작권보호정책</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline">링크생성안내</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline">문제해결 안내</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline">고객의 소리</button>
              <span>|</span>
              <button onClick={() => setShowFooterManual(true)} className="hover:underline">원격지원 서비스</button>
            </div>

            <div className="flex items-center space-x-2 text-[11px]">
              <select className="bg-[#2B303A] text-slate-300 border border-slate-600 rounded px-2 py-0.5">
                <option>관련사이트</option>
                <option>대한민국 대법원</option>
                <option>서울회생법원</option>
                <option>인터넷등기소</option>
              </select>
              <button className="bg-slate-600 hover:bg-slate-500 text-white px-2.5 py-0.5 rounded text-[11px] font-bold">
                바로가기
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Tier (#2B303A) */}
        <div className="bg-[#2B303A] text-slate-300 py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left Supreme Court Emblem */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 border border-slate-600 rounded-full flex items-center justify-center text-white bg-slate-800">
                <Scale className="w-6 h-6 text-slate-200" />
              </div>
              <div className="space-y-1 text-xs">
                <div className="text-white font-bold flex items-center gap-2">
                  <span>이용 및 장애 문의 : 02) 3480-1715</span>
                  <span className="text-slate-400 text-[11px]">(평일 9시~18시)</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  COPYRIGHT © 2025 RE-HUB / SUPREME COURT OF KOREA. ALL RIGHTS RESERVED.
                </div>
              </div>
            </div>

            {/* Right Web Accessibility Badge & Floating Buttons */}
            <div className="flex items-center space-x-4">
              <div className="bg-slate-800 border border-slate-700 px-3 py-1 rounded text-center text-[10px] font-mono text-slate-300">
                WA Web Accessibility Certified
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Icon & TOP Button (1:1 Court Screenshot) */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-2 z-40">
        <button className="w-11 h-11 bg-[#0A60C2] hover:bg-[#084FA3] text-white rounded-full flex items-center justify-center shadow-xl transition-all">
          <MessageCircle className="w-5 h-5" />
        </button>
        <button 
          onClick={scrollToTop}
          className="bg-white border border-slate-300 text-slate-800 text-[10px] font-bold px-2 py-1 rounded-full shadow-md hover:bg-slate-100 flex items-center justify-center space-x-0.5"
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
