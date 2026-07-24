'use client';

import React, { useState } from 'react';
import { ReconciliationRecord } from '@/types/reconciliation';
import ExcelJS from 'exceljs';
import confetti from 'canvas-confetti';
import { 
  FileSpreadsheet, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Scale, 
  Building2, 
  Sparkles, 
  Table,
  CheckSquare
} from 'lucide-react';

interface CourtReportExporterProps {
  records: ReconciliationRecord[];
}

export const CourtReportExporter: React.FC<CourtReportExporterProps> = ({ records }) => {
  const [isExporting, setIsExporting] = useState(false);

  // Live Totals Calculations
  const totalDeclaredPrincipal = records.reduce((acc, r) => acc + r.creditor.declaredPrincipal, 0);
  const totalDeclaredInterest = records.reduce((acc, r) => acc + r.creditor.declaredInterest, 0);
  const totalDeclared = totalDeclaredPrincipal + totalDeclaredInterest;

  const totalAdmittedPrincipal = records.reduce((acc, r) => acc + r.decision.admittedPrincipal, 0);
  const totalAdmittedInterest = records.reduce((acc, r) => acc + r.decision.admittedInterest, 0);
  const totalAdmitted = records.reduce((acc, r) => acc + r.decision.admittedTotal, 0);

  const totalDenied = records.reduce((acc, r) => acc + r.decision.deniedAmount, 0);
  const totalVotingAdmitted = records.reduce((acc, r) => acc + r.decision.votingRightAdmitted, 0);

  const admittedCount = records.filter((r) => r.decision.status === 'ADMITTED').length;
  const partialCount = records.filter((r) => r.decision.status === 'PARTIALLY_ADMITTED').length;
  const deniedCount = records.filter((r) => r.decision.status === 'DENIED').length;

  const handleExportExcel = async () => {
    setIsExporting(true);

    try {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Re-Hub Insolvency Platform';
      workbook.created = new Date();

      const worksheet = workbook.addWorksheet('회생채권 시부인 명세서 (별표2-2)');

      // Set Page Setup for Printing / Court Submission
      worksheet.pageSetup.orientation = 'landscape';
      worksheet.pageSetup.fitToPage = true;

      // Title Banner Rows
      worksheet.mergeCells('A1:K1');
      const titleCell = worksheet.getCell('A1');
      titleCell.value = '추후보완 신고된 회생채권 시·부인 명세서 (별표 2-2)';
      titleCell.font = { name: 'Pretendard', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
      titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
      titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
      worksheet.getRow(1).height = 40;

      // Subtitle Info Row
      worksheet.mergeCells('A2:K2');
      const subTitleCell = worksheet.getCell('A2');
      subTitleCell.value = `사건번호: 2025회단142  |  사건명: (주)알파테크놀로지 회생절차  |  작성일자: ${new Date().toISOString().split('T')[0]}  |  회생관재인 제출용`;
      subTitleCell.font = { name: 'Pretendard', size: 10, italic: true, color: { argb: 'FF94A3B8' } };
      subTitleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
      subTitleCell.alignment = { horizontal: 'center', vertical: 'middle' };
      worksheet.getRow(2).height = 24;

      // Empty spacing row
      worksheet.getRow(3).height = 10;

      // Table Headers (Row 4)
      const headers = [
        '순번',
        '신고번호',
        '채권자명',
        '주소',
        '채권내용',
        '신고 원금 (원)',
        '신고 개시전이자 (원)',
        '관재인 시인액 (원)',
        '부인액 (원)',
        '의결권 인정액 (원)',
        '시부인 사유',
      ];

      const headerRow = worksheet.getRow(4);
      headerRow.height = 30;

      headers.forEach((h, i) => {
        const cell = headerRow.getCell(i + 1);
        cell.value = h;
        cell.font = { name: 'Pretendard', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF334E68' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FF64748B' } },
          left: { style: 'thin', color: { argb: 'FF64748B' } },
          bottom: { style: 'medium', color: { argb: 'FF0F172A' } },
          right: { style: 'thin', color: { argb: 'FF64748B' } },
        };
      });

      // Populate Data Rows starting at Row 5
      let currentRowIdx = 5;
      records.forEach((rec, index) => {
        const row = worksheet.getRow(currentRowIdx);
        row.height = 26;

        row.getCell(1).value = index + 1;
        row.getCell(2).value = rec.creditor.filingNo;
        row.getCell(3).value = rec.creditor.creditorName;
        row.getCell(4).value = rec.creditor.address;
        row.getCell(5).value = rec.creditor.claimType;
        row.getCell(6).value = rec.creditor.declaredPrincipal;
        row.getCell(7).value = rec.creditor.declaredInterest;
        row.getCell(8).value = rec.decision.admittedTotal;
        row.getCell(9).value = rec.decision.deniedAmount;
        row.getCell(10).value = rec.decision.votingRightAdmitted;
        row.getCell(11).value = rec.decision.reasonText;

        // Styling data cells
        for (let col = 1; col <= 11; col++) {
          const cell = row.getCell(col);
          cell.font = { name: 'Pretendard', size: 9.5 };

          // Alignment
          if (col === 1 || col === 2) {
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
          } else if (col >= 6 && col <= 10) {
            cell.alignment = { horizontal: 'right', vertical: 'middle' };
            cell.numFmt = '#,##0 "원"';
          } else {
            cell.alignment = { horizontal: 'left', vertical: 'middle' };
          }

          // Borders & Alternate Row Shading
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          };

          if (index % 2 === 1) {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
          }
        }

        currentRowIdx++;
      });

      // Total Summary Row at Bottom
      const totalRow = worksheet.getRow(currentRowIdx);
      totalRow.height = 32;

      totalRow.getCell(1).value = '합계';
      worksheet.mergeCells(`A${currentRowIdx}:E${currentRowIdx}`);

      const mergedSummaryCell = totalRow.getCell(1);
      mergedSummaryCell.font = { name: 'Pretendard', size: 10, bold: true, color: { argb: 'FF0F172A' } };
      mergedSummaryCell.alignment = { horizontal: 'center', vertical: 'middle' };

      totalRow.getCell(6).value = { formula: `SUM(F5:F${currentRowIdx - 1})` };
      totalRow.getCell(7).value = { formula: `SUM(G5:G${currentRowIdx - 1})` };
      totalRow.getCell(8).value = { formula: `SUM(H5:H${currentRowIdx - 1})` };
      totalRow.getCell(9).value = { formula: `SUM(I5:I${currentRowIdx - 1})` };
      totalRow.getCell(10).value = { formula: `SUM(J5:J${currentRowIdx - 1})` };
      totalRow.getCell(11).value = `총 ${records.length}건 시부인 심사 완료`;

      for (let col = 1; col <= 11; col++) {
        const cell = totalRow.getCell(col);
        cell.font = { name: 'Pretendard', size: 10, bold: true };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };
        cell.border = {
          top: { style: 'medium', color: { argb: 'FF0F172A' } },
          bottom: { style: 'double', color: { argb: 'FF0F172A' } },
          left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          right: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        };
        if (col >= 6 && col <= 10) {
          cell.alignment = { horizontal: 'right', vertical: 'middle' };
          cell.numFmt = '#,##0 "원"';
        }
      }

      // Auto Column Widths
      worksheet.columns = [
        { width: 8 },  // 순번
        { width: 14 }, // 신고번호
        { width: 28 }, // 채권자명
        { width: 36 }, // 주소
        { width: 24 }, // 채권내용
        { width: 20 }, // 신고원금
        { width: 20 }, // 신고이자
        { width: 20 }, // 시인액
        { width: 20 }, // 부인액
        { width: 20 }, // 의결권인정액
        { width: 38 }, // 시부인사유
      ];

      // Export file to browser
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `2025회단142_회생채권_시부인명세서_별표2-2.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);

      // Celebration Confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.error('Failed to generate excel:', e);
      alert('Excel 파일 생성 중 오류가 발생했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Top Banner & Export Trigger */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 mb-1">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Step 3. Output Generator</span>
          </div>
          <h2 className="text-2xl font-black text-white">대한민국 회생법원 표준 양식 Excel 출력</h2>
          <p className="text-slate-400 text-sm mt-1">
            서울회생법원 규칙 표준 서식 『추후보완 신고된 회생채권 시·부인 명세서 (별표 2-2)』로 즉시 산출됩니다.
          </p>
        </div>

        <button
          onClick={handleExportExcel}
          disabled={isExporting}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-emerald-900/30 flex items-center space-x-2 transition-all transform hover:scale-105 disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          <span>{isExporting ? 'Excel 파일 생성 중...' : '법원 제출용 Excel (.xlsx) 다운로드'}</span>
        </button>
      </div>

      {/* Live Totals Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg">
          <div className="text-xs text-slate-400 font-medium">총 신고 금액 (원금+이자)</div>
          <div className="text-xl font-black text-slate-100 font-mono mt-1">
            {totalDeclared.toLocaleString()} 원
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">
            원금: {totalDeclaredPrincipal.toLocaleString()}원
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-emerald-900/60 bg-emerald-950/20 shadow-lg">
          <div className="text-xs text-emerald-400 font-bold">관재인 총 시인액</div>
          <div className="text-xl font-black text-emerald-400 font-mono mt-1">
            {totalAdmitted.toLocaleString()} 원
          </div>
          <div className="text-[11px] text-emerald-300/80 mt-1">
            {admittedCount}건 전액시인 / {partialCount}건 일부시인
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-rose-900/60 bg-rose-950/20 shadow-lg">
          <div className="text-xs text-rose-400 font-bold">총 부인액</div>
          <div className="text-xl font-black text-rose-400 font-mono mt-1">
            {totalDenied.toLocaleString()} 원
          </div>
          <div className="text-[11px] text-rose-300/80 mt-1">
            {deniedCount}건 전액부인 처리 완료
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-indigo-900/60 bg-indigo-950/20 shadow-lg">
          <div className="text-xs text-indigo-300 font-bold">총 의결권 인정액</div>
          <div className="text-xl font-black text-indigo-300 font-mono mt-1">
            {totalVotingAdmitted.toLocaleString()} 원
          </div>
          <div className="text-[11px] text-indigo-400 mt-1 font-semibold">
            조정 시인율: {Math.round((totalAdmitted / (totalDeclared || 1)) * 100)}%
          </div>
        </div>
      </div>

      {/* Live Table Preview Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-slate-200">
            <Table className="w-5 h-5 text-indigo-400" />
            <h3 className="font-extrabold text-base">법원 서식 실시간 미리보기 (별표 2-2 양식)</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">총 {records.length}개 채권 심사 항목</span>
        </div>

        {/* Scrollable Court Form Table */}
        <div className="overflow-x-auto border border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs text-slate-300 border-collapse font-sans">
            <thead className="bg-slate-950 text-slate-300 text-[11px] uppercase font-bold border-b border-slate-800">
              <tr>
                <th className="p-3 text-center border-r border-slate-800">순번</th>
                <th className="p-3 text-center border-r border-slate-800">신고번호</th>
                <th className="p-3 border-r border-slate-800">채권자명</th>
                <th className="p-3 border-r border-slate-800">채권내용</th>
                <th className="p-3 text-right border-r border-slate-800">신고 원금</th>
                <th className="p-3 text-right border-r border-slate-800">신고 이자</th>
                <th className="p-3 text-right border-r border-slate-800 text-emerald-400">관재인 시인액</th>
                <th className="p-3 text-right border-r border-slate-800 text-rose-400">부인액</th>
                <th className="p-3 text-right border-r border-slate-800 text-indigo-300">의결권 인정액</th>
                <th className="p-3">시부인 사유</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
              {records.map((rec, idx) => (
                <tr key={rec.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 text-center font-mono text-slate-500 border-r border-slate-800">
                    {idx + 1}
                  </td>
                  <td className="p-3 text-center font-mono font-bold text-indigo-400 border-r border-slate-800">
                    {rec.creditor.filingNo}
                  </td>
                  <td className="p-3 font-extrabold text-slate-100 border-r border-slate-800">
                    {rec.creditor.creditorName}
                  </td>
                  <td className="p-3 text-slate-300 border-r border-slate-800">
                    {rec.creditor.claimType}
                  </td>
                  <td className="p-3 text-right font-mono text-slate-200 border-r border-slate-800">
                    {rec.creditor.declaredPrincipal.toLocaleString()}원
                  </td>
                  <td className="p-3 text-right font-mono text-slate-400 border-r border-slate-800">
                    {rec.creditor.declaredInterest.toLocaleString()}원
                  </td>
                  <td className="p-3 text-right font-mono font-extrabold text-emerald-400 border-r border-slate-800">
                    {rec.decision.admittedTotal.toLocaleString()}원
                  </td>
                  <td className="p-3 text-right font-mono font-extrabold text-rose-400 border-r border-slate-800">
                    {rec.decision.deniedAmount.toLocaleString()}원
                  </td>
                  <td className="p-3 text-right font-mono font-extrabold text-indigo-300 border-r border-slate-800">
                    {rec.decision.votingRightAdmitted.toLocaleString()}원
                  </td>
                  <td className="p-3 text-slate-300 text-[11px]">
                    {rec.decision.reasonText}
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Table Footer Totals */}
            <tfoot className="bg-slate-950 font-bold text-xs text-slate-100 border-t-2 border-slate-700">
              <tr>
                <td colSpan={4} className="p-3 text-center border-r border-slate-800">
                  합 계 (총 {records.length}건)
                </td>
                <td className="p-3 text-right font-mono border-r border-slate-800">
                  {totalDeclaredPrincipal.toLocaleString()}원
                </td>
                <td className="p-3 text-right font-mono border-r border-slate-800">
                  {totalDeclaredInterest.toLocaleString()}원
                </td>
                <td className="p-3 text-right font-mono text-emerald-400 border-r border-slate-800">
                  {totalAdmitted.toLocaleString()}원
                </td>
                <td className="p-3 text-right font-mono text-rose-400 border-r border-slate-800">
                  {totalDenied.toLocaleString()}원
                </td>
                <td className="p-3 text-right font-mono text-indigo-300 border-r border-slate-800">
                  {totalVotingAdmitted.toLocaleString()}원
                </td>
                <td className="p-3 text-slate-500 font-normal">
                  -
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
