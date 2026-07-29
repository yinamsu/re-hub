'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  GitCompare, 
  FolderLock, 
  History, 
  Network, 
  FileSpreadsheet, 
  UserCheck, 
  ChevronRight,
  ShieldCheck,
  Scale
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
  const menuItems = [
    {
      id: 'overview' as MainTabType,
      label: '사건 개요 & 진행',
      icon: LayoutDashboard,
      badge: 'D-30',
      badgeColor: 'bg-[#1B2E4B] text-amber-300',
      description: '재판부/당사자/절차 진행바',
    },
    {
      id: 'dashboard' as MainTabType,
      label: '3-Way 채권 시부인',
      icon: GitCompare,
      badge: unreviewedCount > 0 ? `${unreviewedCount}건 대기` : '완료',
      badgeColor: unreviewedCount > 0 ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900',
      description: '장부 vs 신고 vs 관재인 판정',
    },
    {
      id: 'evidence' as MainTabType,
      label: '디지털 증거보관소',
      icon: FolderLock,
      badge: `${evidenceCount}개 증증`,
      badgeColor: 'bg-[#004E98] text-white',
      description: 'Chain of Custody & 해시검증',
    },
    {
      id: 'timeline' as MainTabType,
      label: '타임라인 & 쟁점 대조',
      icon: History,
      badge: 'Dual Grid',
      badgeColor: 'bg-[#1B2E4B] text-slate-200',
      description: '주장 vs 항변 대조 포렌식',
    },
    {
      id: 'graph' as MainTabType,
      label: '자금흐름 & 관계망',
      icon: Network,
      badge: 'Node-Link',
      badgeColor: 'bg-[#C53030] text-white',
      description: '특수관계인 계좌추적 그래프',
    },
    {
      id: 'export' as MainTabType,
      label: '법원 제출 명세서 (별표2-2)',
      icon: FileSpreadsheet,
      badge: 'Excel',
      badgeColor: 'bg-emerald-800 text-white',
      description: '서울회생법원 표준 서식 출력',
    },
    {
      id: 'creditor-self' as MainTabType,
      label: '채권자 셀프 전자신고',
      icon: UserCheck,
      badge: '포털',
      badgeColor: 'bg-slate-700 text-slate-200',
      description: '채권자 직접 서류 접수',
    },
  ];

  return (
    <aside className="w-64 bg-[#0A192F] text-slate-200 border-r border-[#1B2E4B] flex flex-col justify-between select-none">
      {/* Top Section: System Header */}
      <div>
        <div className="p-4 border-b border-[#1B2E4B] bg-[#060F1E] flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#1B2E4B] border border-[#004E98] rounded flex items-center justify-center text-amber-300 shadow">
            <Scale className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs font-black tracking-widest text-white uppercase font-mono">
              KROLL FORENSIC
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              대법원 전자소송 연동 시스템
            </div>
          </div>
        </div>

        {/* Navigation Menu List */}
        <div className="p-2 space-y-1">
          <div className="px-3 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider font-mono">
            사건 분석 & 포렌식 모듈
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded text-xs font-medium transition-all flex items-center justify-between group court-border ${
                  isActive
                    ? 'bg-[#1B2E4B] text-white font-bold border-[#004E98] shadow-md ring-1 ring-blue-500/50'
                    : 'bg-[#0A192F] text-slate-300 border-transparent hover:bg-[#102A43] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-amber-300' : 'text-slate-400 group-hover:text-white'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Forensic System Status */}
      <div className="p-3 border-t border-[#1B2E4B] bg-[#060F1E] text-[11px] space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1 font-bold text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Chain of Custody
          </span>
          <span className="font-mono text-emerald-400 text-[10px] font-bold">SECURE</span>
        </div>
        <div className="text-[10px] text-slate-500 font-mono leading-tight">
          SHA-256 Hash Verification Active
          <br />
          Official Court Compliance v3.2
        </div>
      </div>
    </aside>
  );
};
