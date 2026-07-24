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
import { BookOpen, Scale } from 'lucide-react';

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
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-600 font-mono text-sm">
        Re-Hub Court Platform Loading...
      </div>
    );
  }

  const reviewedCount = records.filter((r) => r.decision.status !== 'PENDING').length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-900 selection:text-white">
      {/* Header */}
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

      {/* Footer */}
      <footer className="border-t border-slate-300 bg-white py-6 text-xs text-slate-600 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-blue-900" />
            <span>© 2025 <strong className="text-slate-900">Re-Hub</strong> 회생·파산관재인 및 채권자 통합 플랫폼</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFooterManual(true)}
              className="text-blue-900 font-bold hover:underline flex items-center space-x-1"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-800" />
              <span>상세 이용 안내 및 매뉴얼</span>
            </button>
            <span className="text-slate-300">|</span>
            <span>서울회생법원 규칙 표준 서식 준수</span>
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
