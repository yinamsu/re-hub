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
import { ShieldCheck, BookOpen } from 'lucide-react';

export default function Home() {
  const [currentCase, setCurrentCase] = useState<CaseInfo>(AVAILABLE_CASES[0]);
  const [records, setRecords] = useState<ReconciliationRecord[]>([]);
  const [activeTab, setActiveTab] = useState<MainTabType>('overview');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFooterManual, setShowFooterManual] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

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
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center text-amber-300 font-mono text-sm">
        Kroll Legal Forensic Platform Loading...
      </div>
    );
  }

  const unreviewedCount = records.filter((r) => r.decision.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-[#1B2E4B] selection:text-white">
      {/* 1. Top Pane Header */}
      <Header
        currentCase={currentCase}
        onSelectCase={handleSelectCase}
        totalRecords={records.length}
        reviewedRecords={records.length - unreviewedCount}
        onResetData={handleResetData}
        isRightPanelOpen={isRightPanelOpen}
        onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
      />

      {/* 2. Main 3-to-4 Pane Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          evidenceCount={FORENSIC_EVIDENCE_ITEMS.length}
          unreviewedCount={unreviewedCount}
        />

        {/* Center Main Workspace */}
        <main className="flex-1 overflow-y-auto px-6 py-6 bg-[#F8FAFC]">
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

      {/* 3. Re-Hub Supreme Court SaaS Footer */}
      <footer className="mt-auto border-t border-slate-300 z-10">
        {/* Top Tier (#1B2E4B) */}
        <div className="bg-[#1B2E4B] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
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
              <button onClick={() => setShowFooterManual(true)} className="hover:underline">포렌식 가이드라인</button>
            </div>

            <div className="flex items-center space-x-2 text-[11px]">
              <span className="text-slate-400 font-mono">서울회생법원 실무 준칙 별표 2-2 표준 서식 100% 연동</span>
            </div>
          </div>
        </div>

        {/* Bottom Tier (#0A192F) */}
        <div className="bg-[#0A192F] text-slate-400 text-xs py-4 px-4 border-t border-slate-900">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border border-slate-700 rounded flex items-center justify-center text-amber-300 bg-[#060F1E]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="space-y-0.5">
                <div className="text-white text-xs font-extrabold flex items-center gap-2 font-mono">
                  <span>Re-Hub Kroll Forensic SaaS</span>
                  <span className="text-amber-300 text-[10px] bg-slate-800 px-1.5 py-0.2 rounded border border-slate-700">
                    Supreme Court e-Filing Compliant
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  COPYRIGHT © 2025 RE-HUB FORENSIC PLATFORM. ALL RIGHTS RESERVED.
                </div>
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
