'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { DocumentUploader } from '@/components/DocumentUploader';
import { ReconciliationDashboard } from '@/components/ReconciliationDashboard';
import { CourtReportExporter } from '@/components/CourtReportExporter';
import { 
  ReconciliationRecord 
} from '@/types/reconciliation';
import { 
  getStoredRecords, 
  saveStoredRecords, 
  resetStoredRecords 
} from '@/lib/mockData';

export default function Home() {
  const [records, setRecords] = useState<ReconciliationRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'upload' | 'dashboard' | 'export'>('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);

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

  const handleAddParsedRecord = (newRecord: ReconciliationRecord) => {
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-mono text-sm">
        Re-Hub Insolvency Engine Loading...
      </div>
    );
  }

  const reviewedCount = records.filter((r) => r.decision.status !== 'PENDING').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
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
            onAddParsedRecord={handleAddParsedRecord}
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
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © 2025 <span className="text-slate-300 font-bold">Re-Hub</span> Insolvency Administration SaaS. Court Compliance Ready.
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>서울회생법원 회생채권 서식 준수</span>
            <span>•</span>
            <span>Web3 On-Chain Integrity Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
