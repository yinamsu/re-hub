'use client';

import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  RotateCcw, 
  Keyboard, 
  X, 
  BookOpen, 
  Home, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  Check,
  PanelRightOpen,
  PanelRightClose
} from 'lucide-react';
import { UserManualModal } from '@/components/UserManualModal';
import { CaseInfo } from '@/types/reconciliation';
import { AVAILABLE_CASES } from '@/lib/mockData';

interface HeaderProps {
  currentCase: CaseInfo;
  onSelectCase: (caseInfo: CaseInfo) => void;
  totalRecords: number;
  reviewedRecords: number;
  onResetData: () => void;
  isRightPanelOpen: boolean;
  onToggleRightPanel: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCase,
  onSelectCase,
  totalRecords,
  reviewedRecords,
  onResetData,
  isRightPanelOpen,
  onToggleRightPanel,
}) => {
  const [showShortcutModal, setShowShortcutModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  const progressPercent = Math.round((reviewedRecords / (totalRecords || 1)) * 100);

  return (
    <header className="bg-[#1B2E4B] text-white border-b border-[#0A192F] shadow-sm sticky top-0 z-40 select-none">
      {/* 1. Topmost Utility Bar (Supreme Court Style) */}
      <div className="bg-[#0A192F] text-slate-300 text-[11px] py-1 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="bg-[#004E98] text-white px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">
              대한민국 법원 전자소송 연동
            </span>
            <span className="text-slate-400 font-mono">Kroll Risk & Forensic Incident Platform</span>
          </div>

          <div className="flex items-center space-x-3 text-slate-400 font-medium">
            <button onClick={() => setShowManualModal(true)} className="hover:text-amber-300 transition-colors">
              이용 안내
            </button>
            <span>|</span>
            <span className="text-slate-200 font-bold">도산관재인 (김관재 변호사)</span>
            <span>|</span>
            <div className="flex items-center space-x-1 font-mono text-[10px]">
              <span className="bg-[#2F855A] text-white px-1.5 py-0.2 rounded font-bold">SECURE LOGGED IN</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Branding & Operational Control Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-9 h-9 bg-[#0A192F] border border-[#004E98] rounded flex items-center justify-center text-amber-300 shadow">
            <Scale className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-white text-lg tracking-tight font-mono">Re-Hub</span>
              <span className="text-[10px] bg-amber-400 text-slate-900 font-extrabold px-1.5 py-0.2 rounded font-mono">
                FORENSIC v3.2
              </span>
            </div>
            <p className="text-[10px] text-slate-300 font-medium">회생채권 3-Way 시부인 및 디지털 포렌식 증거 관리 시스템</p>
          </div>
        </div>

        {/* Action Controls & Sample Switcher */}
        <div className="flex items-center space-x-2.5">
          {/* Sample Case Quick Switcher */}
          {currentCase.isSampleCase ? (
            <button
              onClick={() => onSelectCase(AVAILABLE_CASES[0])}
              className="flex items-center space-x-1.5 text-xs bg-[#2F855A] hover:bg-emerald-800 text-white px-3 py-1.5 rounded font-bold transition-all shadow-sm"
              title="표준 기본 사건으로 돌아가기"
            >
              <Check className="w-3.5 h-3.5" />
              <span>[샘플 모드] 기본 사건으로 전환</span>
            </button>
          ) : (
            <button
              onClick={() => onSelectCase(AVAILABLE_CASES[1])}
              className="flex items-center space-x-1.5 text-xs bg-[#D69E2E] hover:bg-amber-600 text-slate-950 px-3 py-1.5 rounded font-bold transition-all shadow-sm"
              title="2025회단142 샘플 체험 사건 불러오기"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>🧪 2025회단142 샘플 사건 불러오기</span>
            </button>
          )}

          {/* Toggle Right Context Drawer Button */}
          <button
            onClick={onToggleRightPanel}
            className={`flex items-center space-x-1 text-xs px-3 py-1.5 rounded font-bold transition-all border ${
              isRightPanelOpen
                ? 'bg-[#004E98] text-white border-blue-400'
                : 'bg-[#0A192F] text-slate-200 border-slate-700 hover:bg-slate-800'
            }`}
          >
            {isRightPanelOpen ? <PanelRightClose className="w-3.5 h-3.5 text-amber-300" /> : <PanelRightOpen className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">컨텍스트 패널</span>
          </button>

          <button
            onClick={() => setShowShortcutModal(true)}
            className="flex items-center space-x-1 text-xs bg-[#0A192F] hover:bg-slate-800 text-slate-200 px-2.5 py-1.5 rounded border border-slate-700 font-medium"
          >
            <Keyboard className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">단축키</span>
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center space-x-1 text-xs bg-[#C53030] hover:bg-rose-800 text-white px-2.5 py-1.5 rounded font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">리셋</span>
          </button>
        </div>
      </div>

      {/* 3. Sub Breadcrumb & Case Selector Bar */}
      <div className="bg-[#0A192F] border-t border-slate-800 py-1.5 px-4 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span>회생 사건</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            
            {/* Case Selector Dropdown */}
            <div className="relative inline-block">
              <select
                value={currentCase.caseNumber}
                onChange={(e) => {
                  const target = AVAILABLE_CASES.find((c) => c.caseNumber === e.target.value);
                  if (target) onSelectCase(target);
                }}
                className="bg-[#1B2E4B] border border-[#334e68] rounded px-2 py-0.5 text-xs font-bold text-white cursor-pointer focus:outline-none focus:border-blue-500 shadow-sm"
              >
                {AVAILABLE_CASES.map((c) => (
                  <option key={c.caseNumber} value={c.caseNumber}>
                    {c.isSampleCase ? '🧪 [샘플 사건] ' : '📁 [기본 사건] '}
                    {c.caseNumber} {c.caseName}
                  </option>
                ))}
              </select>
            </div>

            <span className="bg-[#004E98] text-white text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
              {currentCase.courtName} 제11파산부
            </span>
          </div>

          <div className="text-[11px] text-slate-400 font-mono hidden md:block">
            {currentCase.isSampleCase ? (
              <span className="text-amber-300 font-bold bg-[#1B2E4B] px-2 py-0.5 rounded border border-amber-500">
                ⚠️ 샘플 데이터 모드 작동 중
              </span>
            ) : (
              <span>표준 실무 사건 모드</span>
            )}
          </div>
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
          <div className="bg-white border border-slate-300 rounded p-6 max-w-md w-full shadow-2xl text-slate-900">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-2 text-[#1B2E4B]">
                <Keyboard className="w-5 h-5" />
                <h3 className="text-base font-bold">Step 2 키보드 단축키 지킴이</h3>
              </div>
              <button onClick={() => setShowShortcutModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="font-bold text-[#2F855A]">전액 시인 (Admit All)</span>
                <kbd className="px-2 py-1 font-mono font-bold text-slate-800 bg-white border border-slate-300 rounded">Alt + A</kbd>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="font-bold text-[#C53030]">전액 부인 (Deny All)</span>
                <kbd className="px-2 py-1 font-mono font-bold text-slate-800 bg-white border border-slate-300 rounded">Alt + D</kbd>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="font-bold text-[#1B2E4B]">이전 채권으로 이동</span>
                <kbd className="px-2 py-1 font-mono font-bold text-slate-800 bg-white border border-slate-300 rounded">Alt + ←</kbd>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="font-bold text-[#1B2E4B]">다음 채권으로 이동</span>
                <kbd className="px-2 py-1 font-mono font-bold text-slate-800 bg-white border border-slate-300 rounded">Alt + →</kbd>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 text-right">
              <button
                onClick={() => setShowShortcutModal(false)}
                className="bg-[#1B2E4B] hover:bg-blue-900 text-white font-bold text-xs px-4 py-2 rounded transition-colors"
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
          <div className="bg-white border border-slate-300 rounded p-6 max-w-md w-full shadow-2xl text-slate-900">
            <div className="flex items-center space-x-3 text-[#C53030] pb-3 border-b border-slate-200">
              <RotateCcw className="w-5 h-5" />
              <h3 className="text-base font-bold">사건 데이터 리셋</h3>
            </div>
            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              현재 선택된 사건 ({currentCase.caseNumber} {currentCase.caseName})의 모든 변경사항이 초기 상태로 복원됩니다. 계속하시겠습니까?
            </p>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  onResetData();
                  setShowResetConfirm(false);
                }}
                className="bg-[#C53030] hover:bg-rose-800 text-white font-bold text-xs px-4 py-2 rounded transition-colors flex items-center space-x-1"
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
