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
        {/* 1. Official Court Blue Header Tab ('Re-Hub 관재인 포털') */}
        <div className="relative bg-[#0A60C2] text-white p-3.5 flex items-center justify-between font-bold text-sm shadow-sm">
          <span>Re-Hub 관재인 포털</span>
          {/* Right Pointer Triangle Icon */}
          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-[#0A60C2] absolute -right-2 top-1/2 -translate-y-1/2 z-10"></div>
        </div>

        {/* 2. Structured Accordion Menu */}
        <div className="text-xs space-y-0.5 pt-2">
          {/* Menu Item 1: 사건 개요 */}
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-[#EBF0F5] transition-colors border-b border-[#E8ECEF] ${
              activeTab === 'overview' ? 'font-bold text-[#0A60C2] bg-white' : 'text-[#444444]'
            }`}
          >
            <span>사건개요 현황</span>
          </button>

          {/* Menu Item 2: 사건관리 (Collapsible Header) */}
          <div className="border-b border-[#E8ECEF]">
            <button
              onClick={() => setIsCaseManagementOpen(!isCaseManagementOpen)}
              className="w-full text-left px-4 py-2.5 flex items-center justify-between font-bold text-[#222222] hover:bg-[#EBF0F5] transition-colors"
            >
              <span>사건 심사 & 포렌식</span>
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
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A60C2] inline-block"></span> 진행중사건 개요
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
                  <span>디지털 증거보관소</span>
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

        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-[#F0F4F8] text-[10px] text-slate-500 border-t border-[#D5DBE2] font-mono leading-tight">
        Re-Hub v3.2 | 회생채권 시부인 및 포렌식 시스템
      </div>
    </aside>
  );
};
