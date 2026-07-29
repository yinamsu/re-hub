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
  Menu,
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
  const [timerSeconds, setTimerSeconds] = useState(1798); // 29:58

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <header className="bg-white border-b border-[#D5DBE2] shadow-sm sticky top-0 z-40 select-none">
      {/* 1. Top Utility Bar (1:1 Supreme Court Portal Top Bar) */}
      <div className="bg-[#FFFFFF] text-[#444444] text-[11px] py-1 px-4 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="bg-[#555555] text-white px-2 py-0.2 rounded text-[10px] font-bold">개인</span>
            <span className="font-bold text-[#222222]">김관재 님 (도산관재인)</span>
            <span>|</span>
            <button className="hover:underline text-slate-600">나의정보</button>
            <span>|</span>
            <div className="flex items-center space-x-1 text-slate-600 font-mono">
              <span>⏱️ {formatTimer(timerSeconds)}</span>
              <button 
                onClick={() => setTimerSeconds(1800)}
                className="bg-[#FFFFFF] border border-[#CCCCCC] text-[#333333] hover:bg-slate-100 text-[10px] px-1.5 py-0.2 rounded font-bold ml-1"
              >
                연장
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-slate-600 font-medium">
            <button className="hover:underline">로그아웃</button>
            <span>|</span>
            <button className="hover:underline">English</button>
            <span>|</span>
            <div className="flex items-center space-x-1">
              <span>화면크기</span>
              <button className="px-1.5 bg-slate-100 border border-slate-300 rounded font-bold hover:bg-slate-200">+</button>
              <button className="px-1.5 bg-slate-100 border border-slate-300 rounded font-bold hover:bg-slate-200">-</button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Logo & Supreme Court Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Official Court Style Logo & Title */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
          <div className="flex items-center space-x-2">
            {/* Supreme Court Scale Symbol Logo */}
            <div className="w-9 h-9 bg-[#0A60C2] rounded-full flex items-center justify-center text-white shadow-sm">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[11px] font-bold text-slate-500 tracking-tight">대한민국 법원</span>
              </div>
              <div className="text-xl font-black text-[#1C2A45] tracking-tight leading-none flex items-center gap-1.5">
                <span>전자소송</span>
                <span className="text-xs bg-[#0A60C2] text-white px-2 py-0.5 rounded font-bold font-mono">
                  Re-Hub 관재인 포털
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Main Menu Nav Tabs */}
        <div className="hidden lg:flex items-center space-x-6 text-sm font-bold text-[#333333]">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`py-2 transition-colors border-b-2 ${activeTab === 'overview' ? 'text-[#0A60C2] border-[#0A60C2]' : 'hover:text-[#0A60C2] border-transparent'}`}
          >
            나의전자소송
          </button>

          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`py-2 transition-colors border-b-2 ${activeTab === 'dashboard' ? 'text-[#0A60C2] border-[#0A60C2]' : 'hover:text-[#0A60C2] border-transparent'}`}
          >
            3-Way 채권 시부인
          </button>

          <button 
            onClick={() => setActiveTab('evidence')} 
            className={`py-2 transition-colors border-b-2 ${activeTab === 'evidence' ? 'text-[#0A60C2] border-[#0A60C2]' : 'hover:text-[#0A60C2] border-transparent'}`}
          >
            디지털 증거보관소
          </button>

          <button 
            onClick={() => setActiveTab('timeline')} 
            className={`py-2 transition-colors border-b-2 ${activeTab === 'timeline' ? 'text-[#0A60C2] border-[#0A60C2]' : 'hover:text-[#0A60C2] border-transparent'}`}
          >
            사건 타임라인
          </button>

          <button 
            onClick={() => setActiveTab('graph')} 
            className={`py-2 transition-colors border-b-2 ${activeTab === 'graph' ? 'text-[#0A60C2] border-[#0A60C2]' : 'hover:text-[#0A60C2] border-transparent'}`}
          >
            자금관계망
          </button>

          <button 
            onClick={() => setActiveTab('export')} 
            className={`py-2 transition-colors border-b-2 ${activeTab === 'export' ? 'text-[#0A60C2] border-[#0A60C2]' : 'hover:text-[#0A60C2] border-transparent'}`}
          >
            법원 제출 명세서
          </button>

          <button 
            onClick={() => setShowManualModal(true)} 
            className="py-2 text-slate-600 hover:text-[#0A60C2]"
          >
            고객센터
          </button>
        </div>

        {/* Action Controls & Sample Switcher */}
        <div className="flex items-center space-x-2">
          {/* Sample Case Switcher */}
          {currentCase.isSampleCase ? (
            <button
              onClick={() => onSelectCase(AVAILABLE_CASES[0])}
              className="text-xs bg-[#2F855A] hover:bg-emerald-800 text-white px-3 py-1.5 rounded font-bold transition-all shadow-sm flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>기본 사건 전환</span>
            </button>
          ) : (
            <button
              onClick={() => onSelectCase(AVAILABLE_CASES[1])}
              className="text-xs bg-[#008097] hover:bg-[#006B7F] text-white px-3 py-1.5 rounded font-bold transition-all shadow-sm flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>🧪 2025회단142 샘플 체험</span>
            </button>
          )}

          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-2.5 py-1.5 rounded font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
            <span>리셋</span>
          </button>
        </div>
      </div>

      {/* 3. Sub Breadcrumb Navigation Bar (1:1 Court Breadcrumb) */}
      <div className="bg-[#F8F9FA] border-t border-b border-[#D5DBE2] py-1.5 px-4 text-xs text-[#555555]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Home className="w-3.5 h-3.5 text-[#0A60C2]" />
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span>나의전자소송</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span>나의사건관리</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            
            {/* Case Selector Dropdown */}
            <div className="relative inline-block ml-1">
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
                    {c.isSampleCase ? '🧪 [샘플 사건] ' : '📁 [진행중 사건] '}
                    {c.caseNumber} {c.caseName}
                  </option>
                ))}
              </select>
            </div>

            <span className="bg-[#1C2A45] text-white text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ml-1">
              {currentCase.courtName} 제11파산부
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[11px]">
            <button className="bg-white border border-slate-300 hover:bg-slate-50 px-2 py-0.5 rounded text-slate-700 font-bold flex items-center gap-1">
              <Plus className="w-3 h-3 text-[#0A60C2]" /> 나의 메뉴 추가
            </button>
            <button className="bg-white border border-slate-300 hover:bg-slate-50 px-2 py-0.5 rounded text-slate-700 font-bold flex items-center gap-1">
              <Printer className="w-3 h-3 text-slate-600" /> 출력
            </button>
          </div>
        </div>
      </div>

      {/* User Manual Modal */}
      <UserManualModal
        isOpen={showManualModal}
        onClose={() => setShowManualModal(false)}
      />

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
