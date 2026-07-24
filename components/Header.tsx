'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  GitCompare, 
  FileSpreadsheet, 
  RotateCcw, 
  Keyboard, 
  Building2, 
  X,
  UserCheck,
  BookOpen,
  Scale
} from 'lucide-react';
import { UserManualModal } from '@/components/UserManualModal';

interface HeaderProps {
  activeTab: 'upload' | 'dashboard' | 'export' | 'creditor-self';
  setActiveTab: (tab: 'upload' | 'dashboard' | 'export' | 'creditor-self') => void;
  totalRecords: number;
  reviewedRecords: number;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  totalRecords,
  reviewedRecords,
  onResetData,
}) => {
  const [showShortcutModal, setShowShortcutModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  const progressPercent = Math.round((reviewedRecords / (totalRecords || 1)) * 100);

  return (
    <header className="bg-slate-900 text-slate-100 border-b border-slate-800 sticky top-0 z-40 shadow-md">
      {/* Top Court Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Official Court System Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-blue-900 text-white px-3 py-1.5 rounded-lg shadow-sm border border-blue-700">
              <Scale className="w-5 h-5 text-amber-300" />
              <span className="font-extrabold text-lg tracking-tight">Re-Hub</span>
            </div>

            <div className="hidden md:flex items-center space-x-2 text-xs bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-md">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300 font-medium">대한민국 회생법원</span>
              <span className="text-slate-500">|</span>
              <span className="text-blue-300 font-bold">2025회단142</span>
              <span className="text-slate-200 font-semibold">(주)알파테크놀로지 회생절차</span>
            </div>
          </div>

          {/* Quick Action Tools & Manual Modals */}
          <div className="flex items-center space-x-2.5">
            {/* Progress Gauge */}
            <div className="hidden lg:flex items-center space-x-3 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg">
              <div className="text-right">
                <div className="text-[11px] text-slate-300 font-medium flex items-center justify-end gap-1">
                  <span>관재인 심사 진행률</span>
                  <span className="text-emerald-400 font-bold">{progressPercent}%</span>
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  {reviewedRecords} / {totalRecords} 건 완료
                </div>
              </div>
              <div className="w-20 bg-slate-700 rounded-full h-2 overflow-hidden border border-slate-600">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* User Manual Modal Trigger */}
            <button
              onClick={() => setShowManualModal(true)}
              className="flex items-center space-x-1.5 text-xs bg-blue-900/80 hover:bg-blue-800 text-blue-200 px-3 py-1.5 rounded-lg border border-blue-700 transition-colors shadow-sm font-semibold"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">이용 매뉴얼</span>
            </button>

            {/* Shortcuts Modal Trigger */}
            <button
              onClick={() => setShowShortcutModal(true)}
              className="flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors shadow-sm"
              title="단축키 안내"
            >
              <Keyboard className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">단축키</span>
            </button>

            {/* Reset Demo Data Button */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center space-x-1.5 text-xs bg-rose-950/50 hover:bg-rose-900 text-rose-200 px-3 py-1.5 rounded-lg border border-rose-800 transition-colors shadow-sm"
              title="초기 더미 데이터로 리셋"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">데모 리셋</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1.5 border-t border-slate-800 pt-2 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'upload'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Step 1. 신고서 AI 파싱</span>
            <span className="bg-slate-900 text-blue-200 text-[10px] px-1.5 py-0.5 rounded font-mono">
              관재인용
            </span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            <span>Step 2. 3-Way 시부인 대시보드</span>
            <span className="bg-emerald-900 text-emerald-200 text-[10px] px-1.5 py-0.5 rounded font-mono">
              핵심
            </span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'export'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Step 3. 법원 표준 명세서 Excel</span>
            <span className="bg-amber-900 text-amber-200 text-[10px] px-1.5 py-0.5 rounded font-mono">
              별표 2-2
            </span>
          </button>

          {/* Creditor Self Filing Mode */}
          <button
            onClick={() => setActiveTab('creditor-self')}
            className={`flex items-center space-x-2 px-4 py-2 text-xs font-extrabold rounded-lg transition-all ${
              activeTab === 'creditor-self'
                ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400'
                : 'bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-300" />
            <span>채권자 셀프 전자신고 센터</span>
            <span className="bg-emerald-900 text-emerald-200 text-[10px] px-1.5 py-0.5 rounded">
              일반 채권자용
            </span>
          </button>
        </div>
      </div>

      {/* User Manual Modal */}
      <UserManualModal
        isOpen={showManualModal}
        onClose={() => setShowManualModal(false)}
      />

      {/* Keyboard Shortcuts Modal */}
      {showShortcutModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-xl p-6 max-w-md w-full shadow-2xl text-slate-900">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-2 text-blue-900">
                <Keyboard className="w-5 h-5" />
                <h3 className="text-base font-bold">Step 2 키보드 단축키 지킴이</h3>
              </div>
              <button 
                onClick={() => setShowShortcutModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-xs font-bold text-emerald-700">전액 시인 (Admit All)</span>
                <kbd className="px-2 py-1 text-xs font-mono font-bold text-slate-800 bg-white border border-slate-300 rounded shadow-sm">
                  Alt + A
                </kbd>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-xs font-bold text-rose-700">전액 부인 (Deny All)</span>
                <kbd className="px-2 py-1 text-xs font-mono font-bold text-slate-800 bg-white border border-slate-300 rounded shadow-sm">
                  Alt + D
                </kbd>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-xs font-bold text-blue-900">이전 채권으로 이동</span>
                <kbd className="px-2 py-1 text-xs font-mono font-bold text-slate-800 bg-white border border-slate-300 rounded shadow-sm">
                  Alt + ←
                </kbd>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-xs font-bold text-blue-900">다음 채권으로 이동</span>
                <kbd className="px-2 py-1 text-xs font-mono font-bold text-slate-800 bg-white border border-slate-300 rounded shadow-sm">
                  Alt + →
                </kbd>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 text-right">
              <button
                onClick={() => setShowShortcutModal(false)}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-xl p-6 max-w-md w-full shadow-2xl text-slate-900">
            <div className="flex items-center space-x-3 text-rose-600 pb-3 border-b border-slate-200">
              <RotateCcw className="w-5 h-5" />
              <h3 className="text-base font-bold">시뮬레이션 데이터 리셋</h3>
            </div>
            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              모든 시부인 변경사항 및 신고 내역이 초기 더미 데이터 (2025회단142 사건 6개 채권) 상태로 복원됩니다. 계속하시겠습니까?
            </p>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-lg transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  onResetData();
                  setShowResetConfirm(false);
                }}
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>데이터 초기화 실행</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
