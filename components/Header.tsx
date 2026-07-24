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
  Scale,
  Search,
  Home,
  ChevronRight,
  Menu,
  Sparkles
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
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
      {/* 1. Topmost Utility Bar (대한민국 법원 전자소송포털 상단 유틸리티 바) */}
      <div className="bg-[#F8F9FA] border-b border-slate-200 text-slate-600 text-[11px] py-1 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-bold">환영합니다</span>
            <span>회생·파산관재인 및 채권자 전용 전자소송포털</span>
          </div>

          <div className="flex items-center space-x-3 text-slate-500 font-medium">
            <button onClick={() => setShowManualModal(true)} className="hover:text-blue-900 transition-colors">
              사이트맵
            </button>
            <span>|</span>
            <span className="text-slate-700 font-bold">관재인 로그인중 (김법률)</span>
            <span>|</span>
            <button className="hover:text-blue-900">English</button>
            <span>|</span>
            <div className="flex items-center space-x-1">
              <span>화면크기</span>
              <button className="px-1 bg-slate-200 rounded font-bold hover:bg-slate-300">+</button>
              <button className="px-1 bg-slate-200 rounded font-bold hover:bg-slate-300">-</button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Official Court Logo & Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          {/* Official Court Scale Logo Emblem */}
          <div className="w-9 h-9 bg-[#1C2A45] rounded-full flex items-center justify-center text-amber-300 shadow-md">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">대한민국 법원</span>
              <span className="font-bold text-[#004E98] text-lg">전자소송포털</span>
              <span className="bg-[#1C2A45] text-amber-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded ml-1">Re-Hub</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">회생·파산관재인 채권 시부인 및 전자신고 시스템</p>
          </div>
        </div>

        {/* Action Tools: Progress & Demo Reset & Shortcuts */}
        <div className="flex items-center space-x-2.5">
          {/* Progress Gauge */}
          <div className="hidden lg:flex items-center space-x-3 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <div className="text-right">
              <div className="text-[11px] text-slate-500 font-medium flex items-center justify-end gap-1">
                <span>관재인 심사 진행률</span>
                <span className="text-blue-900 font-bold">{progressPercent}%</span>
              </div>
              <div className="text-xs font-bold text-slate-800">
                {reviewedRecords} / {totalRecords} 건 완료
              </div>
            </div>
            <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden border border-slate-300">
              <div 
                className="bg-[#004E98] h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setShowShortcutModal(true)}
            className="flex items-center space-x-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md border border-slate-300 transition-colors font-medium"
          >
            <Keyboard className="w-3.5 h-3.5 text-blue-900" />
            <span className="hidden sm:inline">단축키</span>
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center space-x-1 text-xs bg-rose-50 hover:bg-rose-100 text-rose-800 px-3 py-1.5 rounded-md border border-rose-200 transition-colors font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-700" />
            <span className="hidden sm:inline">데모 리셋</span>
          </button>
        </div>
      </div>

      {/* 3. Main Navigation Menu Tabs (전자소송포털 네비게이션 스타일) */}
      <div className="bg-[#1C2A45] text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto">
          <div className="flex space-x-1 font-bold text-sm">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-5 py-3 transition-colors flex items-center space-x-2 border-b-4 ${
                activeTab === 'dashboard'
                  ? 'bg-blue-800/80 text-white border-amber-300'
                  : 'hover:bg-blue-900/60 text-slate-200 border-transparent'
              }`}
            >
              <GitCompare className="w-4 h-4 text-amber-300" />
              <span>나의전자소송 (3-Way 대시보드)</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`px-5 py-3 transition-colors flex items-center space-x-2 border-b-4 ${
                activeTab === 'upload'
                  ? 'bg-blue-800/80 text-white border-amber-300'
                  : 'hover:bg-blue-900/60 text-slate-200 border-transparent'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-300" />
              <span>서류제출 (신고서 AI 파싱)</span>
            </button>

            <button
              onClick={() => setActiveTab('creditor-self')}
              className={`px-5 py-3 transition-colors flex items-center space-x-2 border-b-4 ${
                activeTab === 'creditor-self'
                  ? 'bg-blue-800/80 text-white border-amber-300'
                  : 'hover:bg-blue-900/60 text-slate-200 border-transparent'
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-300" />
              <span>채권자 셀프 전자신고</span>
            </button>

            <button
              onClick={() => setActiveTab('export')}
              className={`px-5 py-3 transition-colors flex items-center space-x-2 border-b-4 ${
                activeTab === 'export'
                  ? 'bg-blue-800/80 text-white border-amber-300'
                  : 'hover:bg-blue-900/60 text-slate-200 border-transparent'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-300" />
              <span>각종신청 (법원 명세서 Excel)</span>
            </button>

            <button
              onClick={() => setShowManualModal(true)}
              className="px-5 py-3 transition-colors flex items-center space-x-2 hover:bg-blue-900/60 text-slate-200 border-b-4 border-transparent"
            >
              <BookOpen className="w-4 h-4 text-slate-300" />
              <span>고객센터 (이용안내)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Sub Breadcrumb Navigation Bar (전자소송포털 위치 경로 바) */}
      <div className="bg-[#F1F3F6] border-b border-slate-300 py-1.5 px-4 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Home className="w-3.5 h-3.5 text-slate-500" />
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span>회생·파산 사건</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-bold text-[#1C2A45]">사건번호: 2025회단142 (주)알파테크놀로지 회생절차</span>
            <span className="bg-[#1C2A45] text-white text-[10px] px-1.5 py-0.2 rounded font-bold ml-1">
              서울회생법원
            </span>
          </div>

          <div className="text-[11px] text-slate-500 font-mono hidden md:block">
            관재인 심사 전용 모드
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
          <div className="bg-white border border-slate-300 rounded-xl p-6 max-w-md w-full shadow-2xl text-slate-900">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-2 text-[#1C2A45]">
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
                <span className="text-xs font-bold text-emerald-800">전액 시인 (Admit All)</span>
                <kbd className="px-2 py-1 text-xs font-mono font-bold text-slate-800 bg-white border border-slate-300 rounded shadow-sm">
                  Alt + A
                </kbd>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-xs font-bold text-rose-800">전액 부인 (Deny All)</span>
                <kbd className="px-2 py-1 text-xs font-mono font-bold text-slate-800 bg-white border border-slate-300 rounded shadow-sm">
                  Alt + D
                </kbd>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-xs font-bold text-[#1C2A45]">이전 채권으로 이동</span>
                <kbd className="px-2 py-1 text-xs font-mono font-bold text-slate-800 bg-white border border-slate-300 rounded shadow-sm">
                  Alt + ←
                </kbd>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-xs font-bold text-[#1C2A45]">다음 채권으로 이동</span>
                <kbd className="px-2 py-1 text-xs font-mono font-bold text-slate-800 bg-white border border-slate-300 rounded shadow-sm">
                  Alt + →
                </kbd>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 text-right">
              <button
                onClick={() => setShowShortcutModal(false)}
                className="bg-[#1C2A45] hover:bg-blue-900 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors"
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
