'use client';

import React, { useState } from 'react';
import { 
  History, 
  Search, 
  FileText, 
  Scale, 
  ArrowRightLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Building, 
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { TimelineEvent, TimelineSide } from '@/types/forensic';

interface CaseTimelineMappingProps {
  timelineEvents: TimelineEvent[];
}

export const CaseTimelineMapping: React.FC<CaseTimelineMappingProps> = ({
  timelineEvents,
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | TimelineSide>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = timelineEvents.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.partiesInvolved.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSide = activeFilter === 'ALL' || ev.claimSide === activeFilter;

    return matchesSearch && matchesSide;
  });

  const claimEvents = timelineEvents.filter((ev) => ev.claimSide === 'PLAINTIFF_CLAIM' || ev.claimSide === 'NEUTRAL_FACT');
  const rebuttalEvents = timelineEvents.filter((ev) => ev.claimSide === 'DEFENDANT_REBUTTAL');

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Banner */}
      <div className="bg-white border border-[#CBD5E1] rounded p-6 shadow-sm border-t-4 border-t-[#1B2E4B] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#1B2E4B] font-bold text-xs mb-1">
            <History className="w-4 h-4 text-[#004E98]" />
            <span>Module 3. Chronological Incident Timeline & Fact Mapping</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">사건 타임라인 및 쟁점 대조 매핑</h1>
          <p className="text-slate-600 text-xs mt-1">
            채권자의 신고 주장(Claim)과 관재인/채무자의 항변 및 자금유출 소명(Counter-claim)을 시단위 타임라인으로 대조 분석합니다.
          </p>
        </div>

        <div className="bg-[#F8FAFC] border border-[#CBD5E1] p-3 rounded flex items-center space-x-3 text-xs font-mono">
          <ArrowRightLeft className="w-6 h-6 text-[#1B2E4B]" />
          <div>
            <div className="text-slate-500 font-sans">Dual-Grid Fact Matrix</div>
            <div className="font-bold text-slate-900">주장 {claimEvents.length}건 vs 항변 {rebuttalEvents.length}건</div>
          </div>
        </div>
      </div>

      {/* 2. Controls & Search */}
      <div className="bg-white border border-[#CBD5E1] rounded p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="타임라인 사건명, 당사자, 내용 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-slate-900 pl-9 pr-3 py-2 rounded focus:outline-none focus:border-[#1B2E4B]"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeFilter === 'ALL' ? 'bg-[#1B2E4B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            전체 사건 타임라인 ({timelineEvents.length})
          </button>
          <button
            onClick={() => setActiveFilter('PLAINTIFF_CLAIM')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeFilter === 'PLAINTIFF_CLAIM' ? 'bg-[#004E98] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            채권자 주장 사건
          </button>
          <button
            onClick={() => setActiveFilter('DEFENDANT_REBUTTAL')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeFilter === 'DEFENDANT_REBUTTAL' ? 'bg-[#C53030] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            관재인 부인/항변 사건
          </button>
        </div>
      </div>

      {/* 3. Dual-Grid Fact Comparison View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Plaintiff Claim (채권자 주장) */}
        <div className="bg-white border border-[#CBD5E1] rounded p-5 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-[#004E98] pb-3 border-b border-slate-200">
            <Scale className="w-5 h-5" />
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
              [주장] 채권자 원인관계 및 대여 사실
            </h3>
          </div>

          <div className="space-y-3">
            {claimEvents.map((ev) => (
              <div key={ev.id} className="bg-[#F8FAFC] border border-[#CBD5E1] p-4 rounded text-xs space-y-2 relative border-l-4 border-l-[#004E98]">
                <div className="flex items-center justify-between text-slate-500 font-mono text-[11px]">
                  <span>🗓️ {ev.date} {ev.time}</span>
                  {ev.linkedEvidenceLabel && (
                    <span className="bg-[#1B2E4B] text-amber-300 font-bold px-2 py-0.5 rounded text-[10px]">
                      증거: {ev.linkedEvidenceLabel}
                    </span>
                  )}
                </div>

                <div className="font-extrabold text-slate-900 text-sm">{ev.title}</div>
                <p className="text-slate-600 text-xs leading-relaxed">{ev.description}</p>

                {ev.amount && (
                  <div className="text-xs font-mono font-extrabold text-[#004E98] pt-1 border-t border-slate-200 flex justify-between">
                    <span>관련 금액:</span>
                    <span>{ev.amount.toLocaleString()} 원</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Defendant Rebuttal (관재인/채무자 항변) */}
        <div className="bg-white border border-[#CBD5E1] rounded p-5 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-[#C53030] pb-3 border-b border-slate-200">
            <AlertTriangle className="w-5 h-5 text-[#C53030]" />
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
              [항변/포렌식] 관재인 부인권 행사 & 불일치 정황
            </h3>
          </div>

          <div className="space-y-3">
            {rebuttalEvents.map((ev) => (
              <div key={ev.id} className="bg-[#FFF1F2] border border-rose-200 p-4 rounded text-xs space-y-2 relative border-l-4 border-l-[#C53030]">
                <div className="flex items-center justify-between text-rose-900 font-mono text-[11px]">
                  <span>🗓️ {ev.date} {ev.time}</span>
                  {ev.linkedEvidenceLabel && (
                    <span className="bg-[#C53030] text-white font-bold px-2 py-0.5 rounded text-[10px]">
                      포렌식증거: {ev.linkedEvidenceLabel}
                    </span>
                  )}
                </div>

                <div className="font-extrabold text-rose-950 text-sm">{ev.title}</div>
                <p className="text-rose-900/90 text-xs leading-relaxed">{ev.description}</p>

                {ev.amount && (
                  <div className="text-xs font-mono font-extrabold text-[#C53030] pt-1 border-t border-rose-200 flex justify-between">
                    <span>유출/부인액:</span>
                    <span>{ev.amount.toLocaleString()} 원</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
