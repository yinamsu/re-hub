'use client';

import React, { useState } from 'react';
import { 
  FolderLock, 
  Search, 
  ShieldCheck, 
  FileText, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Hash, 
  Download,
  Filter,
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { ForensicEvidence, EvidenceCategory } from '@/types/forensic';

interface ForensicEvidenceVaultProps {
  evidenceItems: ForensicEvidence[];
}

export const ForensicEvidenceVault: React.FC<ForensicEvidenceVaultProps> = ({
  evidenceItems,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EvidenceCategory | 'ALL'>('ALL');
  const [selectedItem, setSelectedItem] = useState<ForensicEvidence | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  const filteredItems = evidenceItems.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.courtLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sha256Hash.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Banner */}
      <div className="bg-white border border-[#CBD5E1] rounded p-6 shadow-sm border-t-4 border-t-[#004E98] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#1B2E4B] font-bold text-xs mb-1">
            <FolderLock className="w-4 h-4 text-[#004E98]" />
            <span>Module 2. Chain of Custody Forensic Evidence Vault</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">디지털 증거보관소 및 무결성 검증 시스템</h1>
          <p className="text-slate-600 text-xs mt-1">
            법원 제출용 서류(`갑/을 호증`)의 SHA-256 해시값 산출, 입수 이력, 증거 보관 사슬(Chain of Custody)을 관리합니다.
          </p>
        </div>

        <div className="bg-[#F8FAFC] border border-[#CBD5E1] p-3 rounded flex items-center space-x-3 text-xs font-mono">
          <ShieldCheck className="w-6 h-6 text-[#2F855A]" />
          <div>
            <div className="text-slate-500">등록 증거 서류</div>
            <div className="font-bold text-slate-900">{evidenceItems.length} 개 항목 무결성 보증</div>
          </div>
        </div>
      </div>

      {/* 2. Controls: Search & Category Filter */}
      <div className="bg-white border border-[#CBD5E1] rounded p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="호증 번호, 서류명, SHA-256 해시 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-slate-900 pl-9 pr-3 py-2 rounded focus:outline-none focus:border-[#1B2E4B]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto text-xs font-bold">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedCategory === 'ALL' ? 'bg-[#1B2E4B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            전체 ({evidenceItems.length})
          </button>
          <button
            onClick={() => setSelectedCategory('CONTRACT')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedCategory === 'CONTRACT' ? 'bg-[#1B2E4B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            계약서/약정서
          </button>
          <button
            onClick={() => setSelectedCategory('BANK_STATEMENT')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedCategory === 'BANK_STATEMENT' ? 'bg-[#1B2E4B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            금융 원장
          </button>
          <button
            onClick={() => setSelectedCategory('TAX_INVOICE')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedCategory === 'TAX_INVOICE' ? 'bg-[#1B2E4B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            세금계산서
          </button>
          <button
            onClick={() => setSelectedCategory('AUDIT_REPORT')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedCategory === 'AUDIT_REPORT' ? 'bg-[#1B2E4B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            포렌식 보고서
          </button>
        </div>
      </div>

      {/* 3. Evidence Table */}
      <div className="bg-white border border-[#CBD5E1] rounded overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#1B2E4B] text-white font-bold uppercase">
            <tr>
              <th className="py-3 px-4 w-28">법원 라벨</th>
              <th className="py-3 px-4">증거 명칭 & 파일명</th>
              <th className="py-3 px-4 w-28">파일 용량</th>
              <th className="py-3 px-4">SHA-256 검증 해시 (Cryptographic Hash)</th>
              <th className="py-3 px-4 w-36">입수 일시</th>
              <th className="py-3 px-4 w-24 text-center">무결성 상태</th>
              <th className="py-3 px-4 w-20 text-center">상세</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-mono font-black text-[#1B2E4B]">
                  <span className="bg-slate-100 border border-slate-300 px-2 py-0.5 rounded">
                    {item.courtLabel}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">{item.title}</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">📄 {item.fileName}</div>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-600">{item.fileSize}</td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                  <div className="truncate max-w-xs bg-slate-50 p-1.5 rounded border border-slate-200 text-slate-800" title={item.sha256Hash}>
                    {item.sha256Hash.substring(0, 24)}...
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-600">{item.intakeTimestamp}</td>
                <td className="py-3.5 px-4 text-center">
                  {item.verificationStatus === 'VERIFIED' && (
                    <span className="bg-[#ECFDF5] text-[#2F855A] border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="p-1.5 bg-slate-100 hover:bg-[#1B2E4B] hover:text-white rounded border border-slate-300 text-slate-700 transition-colors"
                    title="증거 상세 및 보관 사슬 검증"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Chain of Custody Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#CBD5E1] rounded max-w-2xl w-full shadow-2xl space-y-4 text-slate-900 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2 text-[#1B2E4B]">
                <ShieldCheck className="w-6 h-6 text-[#2F855A]" />
                <h3 className="font-extrabold text-base">법원 제출 증거 무결성 인증서 (Chain of Custody)</h3>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-slate-700 font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-[#F8FAFC] p-4 rounded border border-slate-300 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-lg text-[#1B2E4B]">{selectedItem.courtLabel}</span>
                  <span className="bg-[#ECFDF5] text-[#2F855A] border border-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded">
                    SHA-256 검증 완료
                  </span>
                </div>
                <div className="font-bold text-sm text-slate-900">{selectedItem.title}</div>
                <p className="text-slate-600 text-xs leading-relaxed">{selectedItem.summary}</p>
              </div>

              {/* SHA-256 Box */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-slate-700 font-bold">
                  <span>암호화 검증 해시값 (SHA-256 Hash Algorithm)</span>
                  <button
                    onClick={() => handleCopyHash(selectedItem.sha256Hash)}
                    className="text-[11px] text-[#004E98] hover:underline flex items-center gap-1 font-mono"
                  >
                    {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedHash ? '복사완료' : '해시 복사'}</span>
                  </button>
                </div>
                <div className="bg-[#0A192F] text-amber-300 p-3 rounded font-mono text-xs break-all border border-slate-800 shadow-inner leading-relaxed">
                  {selectedItem.sha256Hash}
                </div>
              </div>

              {/* Provenance Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
                <div>
                  <span className="text-slate-500 font-medium">최초 입수 시각:</span>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">{selectedItem.intakeTimestamp}</div>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">증거 관리자 (Custodian):</span>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedItem.custodian}</div>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">연동 채권 신고번호:</span>
                  <div className="font-mono font-bold text-[#1B2E4B] mt-0.5">{selectedItem.linkedCreditorFilingNo || '해당 없음'}</div>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">파일 크기:</span>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">{selectedItem.fileSize}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 text-right">
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-[#1B2E4B] hover:bg-blue-900 text-white font-bold text-xs px-5 py-2.5 rounded transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
