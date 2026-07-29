'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  GitCompare, 
  FolderLock, 
  History, 
  Network, 
  FileSpreadsheet, 
  UserCheck, 
  LayoutDashboard,
  Check
} from 'lucide-react';

export type MainTabType = 
  | 'overview' 
  | 'dashboard' 
  | 'evidence' 
  | 'timeline' 
  | 'graph' 
  | 'export' 
  | 'creditor-self';

interface SidebarProps {
  activeTab: MainTabType;
  setActiveTab: (tab: MainTabType) => void;
  evidenceCount: number;
  unreviewedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  evidenceCount,
  unreviewedCount,
}) => {
  const [isCaseManagementOpen, setIsCaseManagementOpen] = useState(true);

  return (
    <aside className="w-56 bg-[#F8F9FA] text-[#333333] border-r border-[#D5DBE2] flex flex-col justify-between select-none">
      <div>
        {/* 1. Official Court Blue Header Tab ('나의전자소송' 1:1) */}
        <div className="relative bg-[#0A60C2] text-white p-3.5 flex items-center justify-between font-bold text-sm shadow-sm">
          <span>나의전자소송</span>
          {/* Right Pointer Triangle Icon */}
          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-[#0A60C2] absolute -right-2 top-1/2 -translate-y-1/2 z-10"></div>
        </div>

        {/* 2. Structured Accordion Menu (1:1 Court Portal Style) */}
        <div className="text-xs space-y-0.5 pt-2">
          {/* Menu Item 1: 나의사건현황 */}
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-[#EBF0F5] transition-colors border-b border-[#E8ECEF] ${
              activeTab === 'overview' ? 'font-bold text-[#0A60C2] bg-white' : 'text-[#444444]'
            }`}
          >
            <span>나의사건현황</span>
          </button>

          {/* Menu Item 2: 나의사건관리 (Collapsible Header) */}
          <div className="border-b border-[#E8ECEF]">
            <button
              onClick={() => setIsCaseManagementOpen(!isCaseManagementOpen)}
              className="w-full text-left px-4 py-2.5 flex items-center justify-between font-bold text-[#222222] hover:bg-[#EBF0F5] transition-colors"
            >
              <span>나의사건관리</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isCaseManagementOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCaseManagementOpen && (
              <div className="bg-white py-1 space-y-0.5 border-t border-[#F0F4F8]">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left pl-7 pr-4 py-2 flex items-center justify-between hover:bg-[#F0F4F8] transition-colors ${
                    activeTab === 'overview' ? 'font-bold text-[#0A60C2] bg-[#EDF5FC]' : 'text-[#555555]'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A60C2] inline-block"></span> 진행중사건
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left pl-7 pr-4 py-2 flex items-center justify-between hover:bg-[#F0F4F8] transition-colors ${
                    activeTab === 'dashboard' ? 'font-bold text-[#0A60C2] bg-[#EDF5FC]' : 'text-[#555555]'
                  }`}
                >
                  <span>3-Way 채권시부인</span>
                  {unreviewedCount > 0 && (
                    <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 font-bold px-1.5 py-0.2 rounded font-mono">
                      {unreviewedCount}대기
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('evidence')}
                  className={`w-full text-left pl-7 pr-4 py-2 flex items-center justify-between hover:bg-[#F0F4F8] transition-colors ${
                    activeTab === 'evidence' ? 'font-bold text-[#0A60C2] bg-[#EDF5FC]' : 'text-[#555555]'
                  }`}
                >
                  <span>포렌식 증거보관소</span>
                </button>

                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`w-full text-left pl-7 pr-4 py-2 flex items-center justify-between hover:bg-[#F0F4F8] transition-colors ${
                    activeTab === 'timeline' ? 'font-bold text-[#0A60C2] bg-[#EDF5FC]' : 'text-[#555555]'
                  }`}
                >
                  <span>타임라인 쟁점대조</span>
                </button>

                <button
                  onClick={() => setActiveTab('graph')}
                  className={`w-full text-left pl-7 pr-4 py-2 flex items-center justify-between hover:bg-[#F0F4F8] transition-colors ${
                    activeTab === 'graph' ? 'font-bold text-[#0A60C2] bg-[#EDF5FC]' : 'text-[#555555]'
                  }`}
                >
                  <span>자금관계망 분석</span>
                </button>
              </div>
            )}
          </div>

          {/* Menu Item 3: 서류 제출 및 서식 */}
          <button 
            onClick={() => setActiveTab('export')}
            className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-[#EBF0F5] transition-colors border-b border-[#E8ECEF] ${
              activeTab === 'export' ? 'font-bold text-[#0A60C2] bg-white' : 'text-[#444444]'
            }`}
          >
            <span>법원 제출 명세서 (별표 2-2)</span>
          </button>

          {/* Menu Item 4: 채권자 셀프신고 */}
          <button 
            onClick={() => setActiveTab('creditor-self')}
            className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-[#EBF0F5] transition-colors border-b border-[#E8ECEF] ${
              activeTab === 'creditor-self' ? 'font-bold text-[#0A60C2] bg-white' : 'text-[#444444]'
            }`}
          >
            <span>채권자 셀프 전자신고</span>
          </button>

          <div className="px-4 py-2.5 text-[#666666] border-b border-[#E8ECEF]">
            사건기록 열람
          </div>
          <div className="px-4 py-2.5 text-[#666666] border-b border-[#E8ECEF]">
            전자소송 사건등록
          </div>
          <div className="px-4 py-2.5 text-[#666666] border-b border-[#E8ECEF]">
            맞춤형 문서함
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-[#F0F4F8] text-[10px] text-slate-500 border-t border-[#D5DBE2] font-mono leading-tight">
        대한민국 법원 전자소송 규격 연동
        <br />
        서울회생법원 실무 준칙 연동 v3.2
      </div>
    </aside>
  );
};
