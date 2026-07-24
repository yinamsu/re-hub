'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  GitCompare, 
  FileSpreadsheet, 
  RotateCcw, 
  Keyboard, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Building2,
  X
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'upload' | 'dashboard' | 'export';
  setActiveTab: (tab: 'upload' | 'dashboard' | 'export') => void;
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

  const progressPercent = Math.round((reviewedRecords / (totalRecords || 1)) * 100);

  return (
    <header className="bg-slate-950 border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-xl backdrop-blur-md bg-opacity-90">
      {/* Top Status & Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Case Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 rounded-lg shadow-lg">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span className="font-extrabold text-xl tracking-tight text-white">Re-Hub</span>
            </div>

            <div className="hidden md:flex items-center space-x-2 text-xs bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-md">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="text-slate-400 font-medium">사건번호:</span>
              <span className="text-blue-300 font-bold">2025회단142</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-200 font-semibold">(주)알파테크놀로지 회생절차</span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                서울회생법원
              </span>
            </div>
          </div>

          {/* Progress & Quick Tools */}
          <div className="flex items-center space-x-3">
            {/* Progress Gauge */}
            <div className="hidden lg:flex items-center space-x-3 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
              <div className="text-right">
                <div className="text-[11px] text-slate-400 font-medium flex items-center justify-end gap-1">
                  <span>관재인 심사 진행률</span>
                  <span className="text-emerald-400 font-bold">{progressPercent}%</span>
                </div>
                <div className="text-xs font-semibold text-slate-300">
                  {reviewedRecords} / {totalRecords} 건 완료
                </div>
              </div>
              <div className="w-20 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Shortcuts Modal Trigger */}
            <button
              onClick={() => setShowShortcutModal(true)}
              className="flex items-center space-x-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 transition-colors shadow-sm"
              title="단축키 안내"
            >
              <Keyboard className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">단축키</span>
            </button>

            {/* Reset Demo Data Button */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center space-x-1.5 text-xs bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 px-3 py-1.5 rounded-lg border border-rose-800/50 transition-colors shadow-sm"
              title="초기 더미 데이터로 리셋"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">데모 리셋</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-t border-slate-900 pt-2 pb-2">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'upload'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Step 1. 신고서 AI 파싱 (Document Uploader)</span>
            <span className="bg-slate-950/50 text-blue-200 text-xs px-2 py-0.5 rounded-full border border-blue-400/20">
              입력
            </span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            <span>Step 2. 3-Way 시부인 대시보드 (Reconciliation)</span>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded-full border border-emerald-500/30">
              핵심
            </span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'export'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Step 3. 법원 표준 명세서 Excel 출력 (Court Form Exporter)</span>
            <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded-full border border-amber-500/30">
              별표 2-2
            </span>
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showShortcutModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-indigo-400">
                <Keyboard className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-100">Step 2 키보드 단축키 지킴이</h3>
              </div>
              <button 
                onClick={() => setShowShortcutModal(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs text-slate-400">
                대량의 채권 시부인 심사 시 마우스 없이 빠른 처리가 가능합니다.
              </p>
              
              <div className="space-y-2.5">
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-sm font-semibold text-emerald-400">전액 시인 (Admit All)</span>
                  <kbd className="px-2.5 py-1 text-xs font-mono font-bold text-slate-200 bg-slate-800 border border-slate-700 rounded shadow">
                    Alt + A
                  </kbd>
                </div>

                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-sm font-semibold text-rose-400">전액 부인 (Deny All)</span>
                  <kbd className="px-2.5 py-1 text-xs font-mono font-bold text-slate-200 bg-slate-800 border border-slate-700 rounded shadow">
                    Alt + D
                  </kbd>
                </div>

                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-sm font-semibold text-blue-400">이전 채권으로 이동</span>
                  <div className="flex gap-1">
                    <kbd className="px-2 py-1 text-xs font-mono font-bold text-slate-200 bg-slate-800 border border-slate-700 rounded shadow">
                      Alt + ←
                    </kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-sm font-semibold text-blue-400">다음 채권으로 이동</span>
                  <div className="flex gap-1">
                    <kbd className="px-2 py-1 text-xs font-mono font-bold text-slate-200 bg-slate-800 border border-slate-700 rounded shadow">
                      Alt + →
                    </kbd>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-right">
              <button
                onClick={() => setShowShortcutModal(false)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center space-x-3 text-rose-400 pb-3 border-b border-slate-800">
              <RotateCcw className="w-6 h-6" />
              <h3 className="text-lg font-bold text-slate-100">시뮬레이션 데이터 리셋</h3>
            </div>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              모든 시부인 변경사항 및 심사 내역이 초기 더미 데이터 (2025회단142 사건 6개 채권) 상태로 완전히 복원됩니다. 계속하시겠습니까?
            </p>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  onResetData();
                  setShowResetConfirm(false);
                }}
                className="bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors flex items-center space-x-1"
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
