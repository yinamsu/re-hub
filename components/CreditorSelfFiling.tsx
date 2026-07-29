'use client';

import React, { useState } from 'react';
import { 
  UserCheck, 
  Building, 
  FileText, 
  CreditCard, 
  ShieldCheck, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Scale,
  Sparkles,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { ReconciliationRecord } from '@/types/reconciliation';

interface CreditorSelfFilingProps {
  onAddRecord: (record: ReconciliationRecord) => void;
  onNavigateToDashboard: () => void;
}

export const CreditorSelfFiling: React.FC<CreditorSelfFilingProps> = ({
  onAddRecord,
  onNavigateToDashboard,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submittedReceipt, setSubmittedReceipt] = useState<ReconciliationRecord | null>(null);

  // Form State
  const [caseNumber, setCaseNumber] = useState('2025회단1000');
  const [caseName, setCaseName] = useState('(주)에이치앤컴퍼니 회생절차');
  const [creditorName, setCreditorName] = useState('');
  const [bizNo, setBizNo] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [bankName, setBankName] = useState('국민은행');
  const [accountNo, setAccountNo] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  const [claimType, setClaimType] = useState('일반 회생채권 (대여금)');
  const [declaredPrincipal, setDeclaredPrincipal] = useState<number>(0);
  const [declaredInterest, setDeclaredInterest] = useState<number>(0);
  const [evidenceFiles, setEvidenceFiles] = useState<string[]>([]);

  // Helper functions for Thousand Separators (천단위 , 콤마 포맷터)
  const formatNumberWithCommas = (val: number | string | undefined | null) => {
    if (val === undefined || val === null || val === '') return '0';
    const numStr = String(val).replace(/[^0-9]/g, '');
    if (!numStr) return '0';
    return Number(numStr).toLocaleString('ko-KR');
  };

  const parseFormattedNumber = (val: string) => {
    const cleanStr = val.replace(/[^0-9]/g, '');
    return cleanStr ? Number(cleanStr) : 0;
  };

  // Demo auto-fill
  const handleAutoFillDemo = () => {
    setCreditorName('(주)한국첨단소재');
    setBizNo('120-88-54321');
    setAddress('서울특별시 성동구 아차산로 113, 5층');
    setContact('02-460-8890 (담당자: 김철수 팀장)');
    setBankName('신한은행');
    setAccountNo('110-456-789012');
    setAccountHolder('(주)한국첨단소재');
    setDeclaredPrincipal(350000000);
    setDeclaredInterest(10500000);
    setEvidenceFiles(['세금계산서_원본.pdf', '공급계약서_스캔.pdf', '법인인감증명서.pdf']);
  };

  const handleSubmitFiling = (e: React.FormEvent) => {
    e.preventDefault();
    const filingNo = `회생-${Math.floor(100 + Math.random() * 900)}`;
    const total = declaredPrincipal + declaredInterest;

    const newRecord: ReconciliationRecord = {
      id: `self-cred-${Date.now()}`,
      caseNumber: caseNumber,
      caseName: caseName,
      creditor: {
        id: `self-c-${Date.now()}`,
        filingNo,
        creditorName: creditorName || '신규 신청 채권자',
        bizNo: bizNo || '000-00-00000',
        address: address || '서울특별시 중구',
        contact: contact || '010-0000-0000',
        bankName,
        accountNo: accountNo || '110-000-000000',
        accountHolder: accountHolder || creditorName || '채권자',
        claimType,
        declaredPrincipal,
        declaredInterest,
        currency: 'KRW',
        exchangeRate: 1.0,
        verificationCode: `EFV-2025-${Math.floor(100000 + Math.random() * 900000)}`,
        isVerified: true,
        verifiedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        parsedFromDocument: false,
        submittedDate: new Date().toISOString().split('T')[0],
        submissionSource: 'CREDITOR_SELF',
        evidenceFiles,
      },
      ledger: {
        ledgerPrincipal: declaredPrincipal,
        ledgerInterest: declaredInterest,
        ledgerTotal: total,
        hasDiscrepancy: false,
      },
      decision: {
        status: 'PENDING',
        admittedPrincipal: declaredPrincipal,
        admittedInterest: declaredInterest,
        admittedTotal: total,
        deniedAmount: 0,
        votingRightAdmitted: total,
        reasonCode: 'FULL_ADMIT',
        reasonText: '채권자 직접 셀프 전자신고 건 (관재인 검토 대기 중)',
      },
    };

    onAddRecord(newRecord);
    setSubmittedReceipt(newRecord);
    setStep(4);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm border-t-4 border-t-emerald-700 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs mb-1">
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>채권자 전용 셀프 포털</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">회생채권 간편 전자신고 시스템</h2>
            <p className="text-slate-600 text-sm mt-1">
              채권자는 복잡한 서면 제출 없이 웹에서 간편하게 채권액 및 증빙을 직접 입력·신고할 수 있습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAutoFillDemo}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>시뮬레이션 예시 데이터 자동채우기</span>
          </button>
        </div>
      </div>

      {/* Progress Steps Header Bar */}
      <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-emerald-800' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
            <span>채권자 인적사항</span>
          </div>
          <span className="text-slate-300">───</span>
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-emerald-800' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
            <span>채권 내역 및 금액</span>
          </div>
          <span className="text-slate-300">───</span>
          <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-emerald-800' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
            <span>증빙 첨부 & 제출</span>
          </div>
          <span className="text-slate-300">───</span>
          <div className={`flex items-center space-x-2 ${step === 4 ? 'text-emerald-800' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 4 ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'}`}>4</span>
            <span>전자접수증 발급</span>
          </div>
        </div>
      </div>

      {/* Main Wizard Form Card */}
      <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-md">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center space-x-2">
              <Building className="w-5 h-5 text-blue-900" />
              <span>Step 1. 채권자 기본 정보 및 입금 계좌</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">회생 사건 선택</label>
                <input
                  type="text"
                  value={`${caseNumber} ${caseName}`}
                  readOnly
                  className="w-full bg-slate-100 border border-slate-300 rounded-lg p-2.5 font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">채권자 상호 / 성명 *</label>
                <input
                  type="text"
                  placeholder="예: (주)한국첨단소재"
                  value={creditorName}
                  onChange={(e) => setCreditorName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 font-bold text-slate-900 focus:outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">사업자등록번호 / 주민번호 *</label>
                <input
                  type="text"
                  placeholder="예: 120-88-54321"
                  value={bizNo}
                  onChange={(e) => setBizNo(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 font-mono text-slate-900 focus:outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">연락처 / 채권 담당자 *</label>
                <input
                  type="text"
                  placeholder="예: 02-460-8890 (담당: 김철수 팀장)"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-blue-700"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">주소 (송달장소) *</label>
                <input
                  type="text"
                  placeholder="예: 서울특별시 성동구 아차산로 113, 5층"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-blue-700"
                />
              </div>

              <div className="md:col-span-2 pt-2 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center space-x-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-700" />
                  <span>변제금 수령 입금 계좌</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">입금 은행</label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900"
                    >
                      <option value="국민은행">국민은행</option>
                      <option value="신한은행">신한은행</option>
                      <option value="우리은행">우리은행</option>
                      <option value="하나은행">하나은행</option>
                      <option value="기업은행">기업은행</option>
                      <option value="농협은행">농협은행</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">계좌번호</label>
                    <input
                      type="text"
                      placeholder="예: 110-456-789012"
                      value={accountNo}
                      onChange={(e) => setAccountNo(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2.5 font-mono text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">예금주</label>
                    <input
                      type="text"
                      placeholder="예: (주)한국첨단소재"
                      value={accountHolder || creditorName}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-[#1C2A45] hover:bg-blue-900 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center space-x-2 transition-all shadow-md"
              >
                <span>다음: 채권 내역 및 금액 입력</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-900" />
              <span>Step 2. 채권 종류 및 신고 금액 산출</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">채권 종류 및 발생 원인 *</label>
                <select
                  value={claimType}
                  onChange={(e) => setClaimType(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 font-bold text-slate-900"
                >
                  <option value="일반 회생채권 (대여금)">일반 회생채권 (대여금 / 차입금)</option>
                  <option value="상거래 회생채권 (물품/용역대금)">상거래 회생채권 (원자재 납품 / 용역비)</option>
                  <option value="담보부 회생채권 (근저당/근질권)">담보부 회생채권 (부동산 근저당 / 기계 질권)</option>
                  <option value="임금 및 퇴직금 채권 (공익채권)">임금 및 퇴직금 채권 (공익채권)</option>
                  <option value="조세 및 공과금 채권">조세 및 공과금 채권</option>
                </select>
              </div>

              {/* Formatted Number Inputs with Thousand Separators (,) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-slate-900 font-bold mb-1">신고 원금 (KRW) *</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={formatNumberWithCommas(declaredPrincipal)}
                    onChange={(e) => setDeclaredPrincipal(parseFormattedNumber(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-lg p-3 text-base font-black text-blue-900 font-mono focus:outline-none focus:border-blue-700"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">천단위 콤마(,)가 자동 적용됩니다.</span>
                </div>

                <div>
                  <label className="block text-slate-900 font-bold mb-1">신고 개시전 이자 (KRW)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={formatNumberWithCommas(declaredInterest)}
                    onChange={(e) => setDeclaredInterest(parseFormattedNumber(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-lg p-3 text-base font-black text-slate-800 font-mono focus:outline-none focus:border-blue-700"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">개시 전일까지 발생한 약정 이자</span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl flex items-center justify-between">
                <span className="font-bold text-emerald-900 text-sm">신고 총액 합계 (원금 + 이자):</span>
                <span className="text-xl font-black text-emerald-900 font-mono">
                  {(declaredPrincipal + declaredInterest).toLocaleString()} 원
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>이전</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-[#1C2A45] hover:bg-blue-900 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center space-x-2 transition-all shadow-md"
              >
                <span>다음: 증빙 서류 첨부</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-blue-900" />
              <span>Step 3. 소명 증빙 서류 첨부 및 최종 전자제출</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="border-2 border-dashed border-slate-300 bg-slate-50 p-6 rounded-xl text-center">
                <Upload className="w-8 h-8 text-blue-900 mx-auto mb-2" />
                <div className="font-bold text-slate-800">계약서, 세금계산서, 약속어음 스캔 파일 첨부</div>
                <p className="text-[11px] text-slate-500 mt-1">전자금융 무결성 암호화 검증 코드가 자동으로 부여됩니다.</p>
              </div>

              {evidenceFiles.length > 0 && (
                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-700">첨부 완료된 파일 목록 ({evidenceFiles.length}건):</div>
                  {evidenceFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-200 font-mono text-[11px]">
                      <span>📄 {file}</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 암호화 완료
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>이전</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitFiling}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs px-8 py-3.5 rounded-xl flex items-center space-x-2 transition-all shadow-lg"
              >
                <FileCheck className="w-4 h-4" />
                <span>회생채권 신고서 최종 전자제출</span>
              </button>
            </div>
          </div>
        )}

        {step === 4 && submittedReceipt && (
          <div className="space-y-6 text-center py-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">회생채권 전자신고 접수 완료</h3>
              <p className="text-xs text-slate-600">
                관재인 심사 시스템에 접수번호가 부여되어 실시간 전송되었습니다.
              </p>
            </div>

            {/* Electronic Receipt Card */}
            <div className="bg-slate-50 border border-slate-300 rounded-2xl p-6 text-left max-w-lg mx-auto font-mono space-y-3 text-xs shadow-sm">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-sans">사건번호:</span>
                <span className="font-bold text-[#1C2A45]">{submittedReceipt.caseNumber}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-sans">접수 부여 번호:</span>
                <span className="font-bold text-blue-900">{submittedReceipt.creditor.filingNo}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-sans">채권자 상호:</span>
                <span className="font-bold text-slate-900">{submittedReceipt.creditor.creditorName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-sans">신고 총액:</span>
                <span className="font-bold text-emerald-800">
                  {(submittedReceipt.creditor.declaredPrincipal + submittedReceipt.creditor.declaredInterest).toLocaleString()} 원
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">전자 검증 코드:</span>
                <span className="font-bold text-blue-950">{submittedReceipt.creditor.verificationCode}</span>
              </div>
            </div>

            <div className="flex justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={onNavigateToDashboard}
                className="bg-[#1C2A45] hover:bg-blue-900 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center space-x-2"
              >
                <span>3-Way 관재인 시부인 대시보드에서 확인</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
