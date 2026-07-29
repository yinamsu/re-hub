'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  RotateCcw, 
  Keyboard, 
  X, 
  Home, 
  ChevronRight, 
  Sparkles, 
  Check,
  Printer,
  Plus
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
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCase,
  onSelectCase,
  totalRecords,
  reviewedRecords,
  onResetData,
  activeTab,
  setActiveTab,
}) => {
  const [showShortcutModal, setShowShortcutModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  return (
    <header className="bg-white border-b border-[#D5DBE2] shadow-sm sticky top-0 z-40 select-none">
      {/* 1. Top Utility Bar */}
      <div className="bg-[#F8F9FA] text-[#444444] text-[11px] py-1 px-4 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto flex justify-between items-center whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <span className="bg-[#1C2A45] text-amber-300 px-2 py-0.2 rounded text-[10px] font-extrabold">Re-Hub</span>
            <span className="font-bold text-[#222222]">Re-Hub 회생·파산 채권 관리 및 포렌식 플랫폼</span>
            <span>|</span>
            <span className="text-slate-600 font-medium">관재인 접속중 (김관재 변호사)</span>
          </div>

          <div className="flex items-center space-x-3 text-slate-600 font-medium">
            <button onClick={() => setShowManualModal(true)} className="hover:underline text-[#0A60C2] font-bold">이용 안내</button>
          </div>
        </div>
      </div>

      {/* 2. Main Branding & Re-Hub Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Re-Hub Brand Logo */}
        <div className="flex items-center space-x-2.5 cursor-pointer flex-shrink-0" onClick={() => setActiveTab('overview')}>
          <div className="w-8 h-8 bg-[#1C2A45] rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="whitespace-nowrap">
            <div className="flex items-center space-x-1.5">
              <span className="text-lg font-black text-[#1C2A45] tracking-tight">Re-Hub</span>
              <span className="text-[10px] bg-[#0A60C2] text-white px-1.5 py-0.2 rounded font-bold font-mono">
                Insolvency Platform
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">회생채권 시부인 & 법원 제출 명세서 시스템</p>
          </div>
        </div>

        {/* Top Main Menu Nav Tabs (Clean, Single Line, No Awkward Wrap) */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-5 text-xs lg:text-sm font-bold text-[#333333] whitespace-nowrap overflow-x-auto">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`py-1.5 transition-colors border-b-2 whitespace-nowrap flex-shrink-0 ${activeTab === 'overview' ? 'text-[#0A60C2] border-[#0A60C2]' : 'hover:text-[#0A60C2] border-transparent'}`}
          >
            사건개요
          </button>

          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`py-1.5 transition-colors border-b-2 whitespace-nowrap flex-shrink-0 ${activeTab === 'dashboard' ? 'text-[#0A60C2] border-[#0A60C2]' : 'hover:text-[#0A60C2] border-transparent'}`}
          >
            3-Way 시부인
          </button>

          <button 
            onClick={() => setActiveTab('evidence')} 
            className={`py-1.5 transition-colors border-b-2 whitespace-nowrap flex-shrink-0 ${activeTab === 'evidence' ? 'text-[#0A60C2] border-[#0A60C2]' : 'hover:text-[#0A60C2] border-transparent'}`}
          >
            증거보관소
          </button>

          <button 
            onClick={() => setActiveTab('timeline')} 
            className={`py-1.5 transition-colors border-b-2 whitespace-nowrap flex-shrink-0 ${activeTab === 'timeline' ? 'text-[#0A60C2] border-[#0A60C2]' : 'hover:text-[#0A60C2] border-transparent'}`}
          >
            사건 타임라인
          </button>

          <button 
            onClick={() => setActiveTab('graph')} 
            className={`py-1.5 transition-colors border-b-2 whitespace-nowrap flex-shrink-0 ${activeTab === 'graph' ? 'text-[#0A60C2] border-[#0A60C2]' : 'hover:text-[#0A60C2] border-transparent'}`}
          >
            자금관계망
          </button>

          <button 
            onClick={() => setActiveTab('export')} 
            className={`py-1.5 transition-colors border-b-2 whitespace-nowrap flex-shrink-0 ${activeTab === 'export' ? 'text-[#0A60C2] border-[#0A60C2]' : 'hover:text-[#0A60C2] border-transparent'}`}
          >
            제출 명세서
          </button>

          <button 
            onClick={() => setActiveTab('creditor-self')} 
            className={`py-1.5 transition-colors border-b-2 whitespace-nowrap flex-shrink-0 ${activeTab === 'creditor-self' ? 'text-[#0A60C2] border-[#0A60C2]' : 'hover:text-[#0A60C2] border-transparent'}`}
          >
            채권자 셀프신고
          </button>

          <button 
            onClick={() => setShowManualModal(true)} 
            className="py-1.5 text-slate-600 hover:text-[#0A60C2] whitespace-nowrap flex-shrink-0"
          >
            이용 매뉴얼
          </button>
        </div>

        {/* Action Controls & Sample Switcher (Strict Single Line) */}
        <div className="flex items-center space-x-1.5 whitespace-nowrap flex-shrink-0">
          {/* Sample Case Switcher */}
          {currentCase.isSampleCase ? (
            <button
              onClick={() => onSelectCase(AVAILABLE_CASES[0])}
              className="text-xs bg-[#2F855A] hover:bg-emerald-800 text-white px-2.5 py-1.5 rounded font-bold transition-all shadow-sm flex items-center gap-1 whitespace-nowrap flex-shrink-0"
            >
              <Check className="w-3.5 h-3.5" />
              <span>기본 사건 전환</span>
            </button>
          ) : (
            <button
              onClick={() => onSelectCase(AVAILABLE_CASES[1])}
              className="text-xs bg-[#008097] hover:bg-[#006B7F] text-white px-2.5 py-1.5 rounded font-bold transition-all shadow-sm flex items-center gap-1 whitespace-nowrap flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>🧪 2025회단142 샘플 체험</span>
            </button>
          )}

          <button
            onClick={() => setShowShortcutModal(true)}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-2 py-1.5 rounded font-bold transition-colors whitespace-nowrap flex-shrink-0 flex items-center gap-1"
          >
            <Keyboard className="w-3.5 h-3.5 text-[#0A60C2]" />
            <span>단축키</span>
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 px-2 py-1.5 rounded font-bold transition-colors whitespace-nowrap flex-shrink-0 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-700" />
            <span>리셋</span>
          </button>
        </div>
      </div>

      {/* 3. Sub Breadcrumb Bar */}
      <div className="bg-[#F8F9FA] border-t border-b border-[#D5DBE2] py-1 px-4 text-xs text-[#555555]">
        <div className="max-w-7xl mx-auto flex items-center justify-between whitespace-nowrap">
          <div className="flex items-center space-x-1.5 whitespace-nowrap overflow-hidden">
            <Home className="w-3.5 h-3.5 text-[#0A60C2] flex-shrink-0" />
            <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="flex-shrink-0">Re-Hub 사건관리</span>
            <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="flex-shrink-0">사건목록</span>
            <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
            
            {/* Case Selector Dropdown */}
            <div className="relative inline-block ml-1 flex-shrink-0">
              <select
                value={currentCase.caseNumber}
                onChange={(e) => {
                  const target = AVAILABLE_CASES.find((c) => c.caseNumber === e.target.value);
                  if (target) onSelectCase(target);
                }}
                className="bg-white border border-[#D5DBE2] rounded px-2 py-0.5 text-xs font-bold text-[#1C2A45] cursor-pointer focus:outline-none focus:border-[#0A60C2] shadow-sm"
              >
                {AVAILABLE_CASES.map((c) => (
                  <option key={c.caseNumber} value={c.caseNumber}>
                    {c.isSampleCase ? '🧪 [샘플 사건] ' : '📁 [진행 사건] '}
                    {c.caseNumber} {c.caseName}
                  </option>
                ))}
              </select>
            </div>

            <span className="bg-[#1C2A45] text-white text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ml-1 flex-shrink-0">
              {currentCase.courtName}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[11px] whitespace-nowrap flex-shrink-0">
            <button className="bg-white border border-slate-300 hover:bg-slate-50 px-2 py-0.5 rounded text-slate-700 font-bold flex items-center gap-1 whitespace-nowrap">
              <Plus className="w-3 h-3 text-[#0A60C2]" /> 사건 추가
            </button>
            <button className="bg-white border border-slate-300 hover:bg-slate-50 px-2 py-0.5 rounded text-slate-700 font-bold flex items-center gap-1 whitespace-nowrap">
              <Printer className="w-3 h-3 text-slate-600" /> 인쇄
            </button>
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
              <div className="flex items-center space-x-2 text-[#1C2A45]">
                <Keyboard className="w-5 h-5" />
                <h3 className="text-base font-bold">키보드 단축키 안내</h3>
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
                <span className="font-bold text-[#1C2A45]">이전 채권으로 이동</span>
                <kbd className="px-2 py-1 font-mono font-bold text-slate-800 bg-white border border-slate-300 rounded">Alt + ←</kbd>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="font-bold text-[#1C2A45]">다음 채권으로 이동</span>
                <kbd className="px-2 py-1 font-mono font-bold text-slate-800 bg-white border border-slate-300 rounded">Alt + →</kbd>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 text-right">
              <button
                onClick={() => setShowShortcutModal(false)}
                className="bg-[#1C2A45] hover:bg-blue-900 text-white font-bold text-xs px-4 py-2 rounded transition-colors"
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
