'use client';

import React, { useState } from 'react';
import { 
  Scale, 
  Clock, 
  Building2, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  Search,
  Printer,
  Plus,
  Info,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { CaseOverviewMetadata } from '@/types/forensic';
import { ReconciliationRecord } from '@/types/reconciliation';

interface CaseOverviewDashboardProps {
  metadata: CaseOverviewMetadata;
  records: ReconciliationRecord[];
  onNavigateToTab: (tab: any) => void;
}

export const CaseOverviewDashboard: React.FC<CaseOverviewDashboardProps> = ({
  metadata,
  records,
  onNavigateToTab,
}) => {
  const [searchFilterType, setSearchFilterType] = useState('ALL');
  const [selectedDateRange, setSelectedDateRange] = useState('ALL');

  const totalClaimsCount = records.length;
  const totalDeclaredAmount = records.reduce((acc, r) => acc + r.creditor.declaredPrincipal + r.creditor.declaredInterest, 0);
  const totalAdmittedAmount = records.reduce((acc, r) => acc + r.decision.admittedTotal, 0);
  const totalDeniedAmount = records.reduce((acc, r) => acc + r.decision.deniedAmount, 0);

  return (
    <div className="space-y-6 pb-12 text-[#222222]">
      {/* 1. Official Court Page Title & Utility Controls (1:1 Court Portal Header) */}
      <div className="flex justify-between items-center pb-2 border-b-2 border-[#1C2A45]">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-[#0A60C2] bg-white inline-block"></span>
          <h1 className="text-xl font-black text-[#1C2A45]">진행중 사건 (회생채권 시부인 심사 대시보드)</h1>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button className="bg-white border border-[#D5DBE2] hover:bg-slate-50 px-2.5 py-1 rounded text-slate-700 font-bold flex items-center gap-1 shadow-sm">
            <Plus className="w-3.5 h-3.5 text-[#0A60C2]" /> 나의 메뉴 추가
          </button>
          <button className="bg-white border border-[#D5DBE2] hover:bg-slate-50 px-2.5 py-1 rounded text-slate-700 font-bold flex items-center gap-1 shadow-sm">
            <Printer className="w-3.5 h-3.5 text-slate-600" /> 출력
          </button>
        </div>
      </div>

      {/* 2. Official Supreme Court Search Filter Box (1:1 Court Portal Filter) */}
      <div className="bg-white border border-[#D5DBE2] rounded p-4 space-y-3 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700 w-16">소송유형</span>
            <select className="flex-1 bg-white border border-[#D5DBE2] rounded p-1.5 text-slate-800">
              <option value="ALL">전체 (도산/회생채권)</option>
              <option value="REHAB">회생절차 사건</option>
              <option value="BANKRUPT">파산절차 사건</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700 w-12">법원</span>
            <select className="flex-1 bg-white border border-[#D5DBE2] rounded p-1.5 text-slate-800">
              <option value="SEOUL">서울회생법원 제11파산부</option>
              <option value="SUWON">수원회생법원</option>
              <option value="BUSAN">부산회생법원</option>
            </select>
          </div>

          <div className="md:col-span-2 flex items-center space-x-3">
            <div className="flex items-center space-x-2 font-bold text-slate-700">
              <label className="flex items-center space-x-1 cursor-pointer">
                <input type="radio" name="searchRange" defaultChecked className="text-[#0A60C2]" />
                <span>접수일자</span>
              </label>
              <label className="flex items-center space-x-1 cursor-pointer">
                <input type="radio" name="searchRange" className="text-[#0A60C2]" />
                <span>사건번호</span>
              </label>
            </div>

            <div className="flex items-center space-x-1">
              <button onClick={() => setSelectedDateRange('TODAY')} className={`px-2 py-1 border rounded text-[11px] font-bold ${selectedDateRange === 'TODAY' ? 'bg-[#0A60C2] text-white border-[#0A60C2]' : 'bg-white text-slate-700 border-slate-300'}`}>오늘</button>
              <button onClick={() => setSelectedDateRange('3DAYS')} className={`px-2 py-1 border rounded text-[11px] font-bold ${selectedDateRange === '3DAYS' ? 'bg-[#0A60C2] text-white border-[#0A60C2]' : 'bg-white text-slate-700 border-slate-300'}`}>3일</button>
              <button onClick={() => setSelectedDateRange('1WEEK')} className={`px-2 py-1 border rounded text-[11px] font-bold ${selectedDateRange === '1WEEK' ? 'bg-[#0A60C2] text-white border-[#0A60C2]' : 'bg-white text-slate-700 border-slate-300'}`}>1주일</button>
              <button onClick={() => setSelectedDateRange('1MONTH')} className={`px-2 py-1 border rounded text-[11px] font-bold ${selectedDateRange === '1MONTH' ? 'bg-[#0A60C2] text-white border-[#0A60C2]' : 'bg-white text-slate-700 border-slate-300'}`}>1개월</button>
              <button onClick={() => setSelectedDateRange('ALL')} className={`px-2 py-1 border rounded text-[11px] font-bold ${selectedDateRange === 'ALL' ? 'bg-[#0A60C2] text-white border-[#0A60C2]' : 'bg-white text-slate-700 border-slate-300'}`}>전체</button>
            </div>
          </div>
        </div>

        {/* Centered Teal Search Button ('조회' 1:1) */}
        <div className="pt-2 border-t border-slate-100 text-center">
          <button className="bg-[#008097] hover:bg-[#006B7F] text-white font-extrabold text-xs px-10 py-2 rounded transition-colors shadow">
            조회
          </button>
        </div>
      </div>

      {/* 3. Official Supreme Court Table Structure (1:1 Court Portal Table) */}
      <div className="bg-white border border-[#D5DBE2] rounded overflow-hidden shadow-sm space-y-2">
        <div className="p-3 bg-[#F8F9FA] border-b border-[#D5DBE2] flex items-center justify-between text-xs font-bold">
          <div className="flex items-center space-x-2">
            <span className="text-[#1C2A45]">전체 사건 목록 (총 {records.length}건)</span>
            <span className="text-[11px] text-slate-500 font-mono">사건번호: {metadata.caseNumber}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={() => onNavigateToTab('dashboard')} className="bg-white border border-[#0A60C2] text-[#0A60C2] hover:bg-[#EDF5FC] px-2.5 py-1 rounded text-xs font-bold">
              관심사건 지정
            </button>
            <button onClick={() => onNavigateToTab('export')} className="bg-[#2F855A] text-white hover:bg-emerald-800 px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1">
              📊 엑셀로 저장 (별표 2-2)
            </button>
          </div>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-[#F0F4F8] text-[#222222] font-bold border-b border-[#D5DBE2]">
            <tr>
              <th className="py-2.5 px-3 w-10 text-center"><input type="checkbox" /></th>
              <th className="py-2.5 px-3">관할법원</th>
              <th className="py-2.5 px-3">사건번호</th>
              <th className="py-2.5 px-3">재판부</th>
              <th className="py-2.5 px-3">신고번호</th>
              <th className="py-2.5 px-3">채권자명</th>
              <th className="py-2.5 px-3 text-right">신고 채권총액</th>
              <th className="py-2.5 px-3 text-right">관재인 시인액</th>
              <th className="py-2.5 px-3 text-center">시부인 상태</th>
              <th className="py-2.5 px-3 text-center">바로가기</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {records.map((r) => {
              const totalDeclared = r.creditor.declaredPrincipal + r.creditor.declaredInterest;

              return (
                <tr key={r.id} className="hover:bg-[#F0F4F8] transition-colors">
                  <td className="py-3 px-3 text-center"><input type="checkbox" /></td>
                  <td className="py-3 px-3 font-bold text-slate-700">서울회생법원</td>
                  <td className="py-3 px-3 font-mono font-bold text-[#0066CC] underline cursor-pointer" onClick={() => onNavigateToTab('dashboard')}>
                    {r.caseNumber}
                  </td>
                  <td className="py-3 px-3 text-slate-600">제11파산부</td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-800">{r.creditor.filingNo}</td>
                  <td className="py-3 px-3 font-bold text-slate-900">{r.creditor.creditorName}</td>
                  <td className="py-3 px-3 font-mono font-bold text-right text-slate-900">{totalDeclared.toLocaleString()}원</td>
                  <td className="py-3 px-3 font-mono font-bold text-right text-[#0A60C2]">{r.decision.admittedTotal.toLocaleString()}원</td>
                  <td className="py-3 px-3 text-center font-bold">
                    {r.decision.status === 'ADMITTED' && <span className="bg-[#ECFDF5] text-[#2F855A] border border-emerald-300 px-2 py-0.5 rounded text-[10px]">전액시인</span>}
                    {r.decision.status === 'DENIED' && <span className="bg-[#FFF1F2] text-[#C53030] border border-rose-300 px-2 py-0.5 rounded text-[10px]">전액부인</span>}
                    {r.decision.status === 'PARTIALLY_ADMITTED' && <span className="bg-[#FFFBEB] text-[#D69E2E] border border-amber-300 px-2 py-0.5 rounded text-[10px]">일부시인</span>}
                    {r.decision.status === 'PENDING' && <span className="bg-slate-100 text-slate-600 border border-slate-300 px-2 py-0.5 rounded text-[10px]">미심사</span>}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button 
                      onClick={() => onNavigateToTab('dashboard')}
                      className="bg-white border border-[#CCCCCC] hover:border-[#0A60C2] text-slate-800 px-2.5 py-1 rounded text-[11px] font-bold shadow-sm"
                    >
                      시부인 심사
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination Controls (1:1 Court Portal Pagination) */}
        <div className="p-3 bg-white flex items-center justify-between border-t border-[#D5DBE2] text-xs">
          <div className="text-slate-500 font-mono">총 {records.length}건</div>

          <div className="flex items-center space-x-1 font-mono font-bold text-slate-700">
            <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">{'<<'}</button>
            <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">{'<'}</button>
            <button className="px-3 py-1 bg-[#0A60C2] text-white rounded font-bold">1</button>
            <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">{'>'}</button>
            <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-100">{">>"}</button>
          </div>

          <select className="bg-white border border-slate-300 rounded px-2 py-1 text-slate-700">
            <option>10개씩 보기</option>
            <option>20개씩 보기</option>
          </select>
        </div>
      </div>

      {/* 4. Official Supreme Court Notice Box ('참고하세요' 1:1) */}
      <div className="bg-[#EDF5FC] border border-[#B2D4F5] rounded p-5 space-y-2 text-xs text-[#333333]">
        <div className="flex items-center space-x-2 text-[#0A60C2] font-black text-sm pb-2 border-b border-[#B2D4F5]">
          <Info className="w-5 h-5 text-[#0A60C2]" />
          <span>참고하세요</span>
        </div>

        <ul className="space-y-1.5 pl-4 list-disc text-slate-700 leading-relaxed text-[11px]">
          <li>
            채권자가 셀프 전자신고 포털을 통해 접수한 채권 내역은 '3-Way 채권 시부인' 모듈로 즉시 연동됩니다.
          </li>
          <li>
            장부상 금액과 신고 금액의 차액 발생 시 3-Way 대조 화면에서 원증빙 및 소명 사유를 확인 후 시부인 판정을 진행하시기 바랍니다.
          </li>
          <li>
            시부인 심사 완료 후 '법원 제출 명세서' 모듈에서 서울회생법원 실무 준칙 별표 2-2 서식 규격 엑셀을 다운로드하실 수 있습니다.
          </li>
        </ul>
      </div>
    </div>
  );
};
