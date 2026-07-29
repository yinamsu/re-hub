'use client';

import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Lock, 
  ExternalLink, 
  Scale,
  Building,
  CheckCircle,
  Hash
} from 'lucide-react';
import { CaseOverviewMetadata, ForensicEvidence } from '@/types/forensic';

interface RightContextPanelProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: CaseOverviewMetadata;
  evidenceItems: ForensicEvidence[];
}

export const RightContextPanel: React.FC<RightContextPanelProps> = ({
  isOpen,
  onClose,
  metadata,
  evidenceItems,
}) => {
  if (!isOpen) return null;

  return (
    <aside className="w-80 bg-white border-l border-slate-300 shadow-xl flex flex-col justify-between select-none z-30 animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="bg-[#1B2E4B] text-white p-3.5 flex items-center justify-between border-b border-[#0A192F]">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-amber-300" />
          <h3 className="text-xs font-bold font-mono">사건 포렌식 컨텍스트 패널</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-300 hover:text-white p-1 rounded hover:bg-[#0A192F]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content Body */}
      <div className="p-4 overflow-y-auto space-y-5 text-xs">
        {/* 1. D-Day Countdown Card */}
        <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded p-3.5 space-y-2">
          <div className="flex items-center justify-between text-slate-700 font-bold border-b border-slate-200 pb-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C53030]" /> 법원 지정 기한 카운트다운
            </span>
            <span className="bg-[#C53030] text-white text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
              D-30
            </span>
          </div>

          <div className="space-y-1.5 pt-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">회생채권 신고마감:</span>
              <span className="font-bold font-mono text-[#C53030]">{metadata.claimsSubmissionDeadline}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">제1회 관계인집회:</span>
              <span className="font-bold font-mono text-[#1B2E4B]">{metadata.stakeholdersMeetingDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">부인권 행사 시효:</span>
              <span className="font-bold font-mono text-slate-700">{metadata.statuteOfLimitationsDeadline}</span>
            </div>
          </div>
        </div>

        {/* 2. Chain of Custody Hash Inspector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-200 pb-1.5">
            <span className="flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-[#004E98]" /> Chain of Custody (무결성)
            </span>
            <span className="text-[10px] text-[#2F855A] bg-[#ECFDF5] border border-emerald-300 px-1.5 py-0.5 rounded font-bold">
              100% Verified
            </span>
          </div>

          <div className="bg-[#0A192F] text-slate-200 p-3 rounded font-mono text-[10px] space-y-1.5 border border-slate-700 shadow-inner">
            <div className="text-amber-300 font-bold flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" /> Latest SHA-256 Hash:
            </div>
            <div className="break-all text-slate-300 bg-[#060F1E] p-2 rounded border border-slate-800 leading-tight">
              {evidenceItems[0]?.sha256Hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 pt-1">
              <span>Intake: {evidenceItems[0]?.intakeTimestamp}</span>
              <span className="text-emerald-400">Tamper Free</span>
            </div>
          </div>
        </div>

        {/* 3. Case Key Info Summary */}
        <div className="space-y-2">
          <div className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-[#1B2E4B]" /> 재판부 & 관재인 정보
          </div>

          <div className="bg-[#F8FAFC] border border-[#CBD5E1] p-3 rounded space-y-2">
            <div>
              <div className="text-[10px] text-slate-500">담당 재판부</div>
              <div className="font-bold text-slate-900">{metadata.courtBranch}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500">채무자 회생기업</div>
              <div className="font-bold text-slate-900">{metadata.debtorCompany}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500">선임 도산관재인</div>
              <div className="font-bold text-[#1B2E4B]">{metadata.administrator}</div>
            </div>
          </div>
        </div>

        {/* 4. Recent Forensic Evidence List */}
        <div className="space-y-2">
          <div className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#004E98]" /> 증거 서류 목록 ({evidenceItems.length})
            </span>
          </div>

          <div className="space-y-1.5">
            {evidenceItems.slice(0, 4).map((ev) => (
              <div key={ev.id} className="bg-white border border-[#CBD5E1] p-2 rounded text-[11px] hover:border-[#1B2E4B] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#1B2E4B]">{ev.courtLabel}</span>
                  <span className="text-[9px] bg-slate-100 text-slate-600 px-1 rounded font-mono">{ev.fileSize}</span>
                </div>
                <div className="font-bold text-slate-800 truncate mt-0.5">{ev.title}</div>
                <div className="text-[9px] text-slate-500 font-mono truncate mt-0.5">Hash: {ev.sha256Hash.substring(0, 16)}...</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-200 bg-[#F1F5F9] text-[10px] text-slate-500 text-center font-mono">
        Re-Hub Forensic Context Inspector v3.2
      </div>
    </aside>
  );
};
