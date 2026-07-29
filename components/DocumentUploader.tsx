'use client';

import React, { useState } from 'react';
import { 
  Upload, 
  CheckCircle, 
  ShieldCheck, 
  RefreshCw, 
  Database,
  ArrowRight,
  FileText,
  DollarSign,
  Hash,
  Scale,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ReconciliationRecord } from '@/types/reconciliation';

interface DocumentUploaderProps {
  onAddParsedRecord: (record: ReconciliationRecord) => void;
  onNavigateToDashboard: () => void;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onAddParsedRecord,
  onNavigateToDashboard,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parsingProgress, setParsingProgress] = useState(0);
  const [parsingStep, setParsingStep] = useState('');
  const [parsedData, setParsedData] = useState<ReconciliationRecord | null>(null);
  const [showRawJson, setShowRawJson] = useState(false);

  const samplePresets = [
    {
      label: '샘플 1: (주)대한글로벌 파트너스 (원화 대여금 채권)',
      filename: '2025회단1000_채권신고서_대한글로벌.pdf',
      data: {
        id: `rec-parsed-${Date.now()}`,
        caseNumber: '2025회단1000',
        caseName: '(주)에이치앤컴퍼니 회생절차',
        creditor: {
          id: `cred-parsed-${Date.now()}`,
          filingNo: '회생-006',
          creditorName: '(주)대한글로벌 파트너스',
          bizNo: '110-81-45678',
          address: '서울특별시 중구 남대문로 63, 12층',
          contact: '02-771-0099',
          bankName: '신한은행',
          accountNo: '110-234-567890',
          accountHolder: '(주)대한글로벌 파트너스',
          claimType: '대여금 채권 (단기 차입 원리금)',
          declaredPrincipal: 850000000,
          declaredInterest: 25500000,
          currency: 'KRW',
          exchangeRate: 1.0,
          verificationCode: 'EFV-2025-9981241',
          isVerified: true,
          verifiedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          parsedFromDocument: true,
          submittedDate: new Date().toISOString().split('T')[0],
          submissionSource: 'ADMIN_PARSED' as const,
        },
        ledger: {
          ledgerPrincipal: 850000000,
          ledgerInterest: 25500000,
          ledgerTotal: 875500000,
          hasDiscrepancy: false,
        },
        decision: {
          status: 'PENDING' as const,
          admittedPrincipal: 850000000,
          admittedInterest: 25500000,
          admittedTotal: 875500000,
          deniedAmount: 0,
          votingRightAdmitted: 875500000,
          reasonCode: 'FULL_ADMIT',
          reasonText: '채무자 장부 및 원증빙과 일치하여 전액 시인함',
        },
      },
    },
    {
      label: '샘플 2: (주)글로벌크립토파트너스 (외화 대여금 정산 건)',
      filename: '2025회단142_채권신고서_글로벌.pdf',
      data: {
        id: `rec-parsed-${Date.now()}`,
        caseNumber: '2025회단142',
        caseName: '(주)알파테크놀로지 회생절차 [샘플 체험용]',
        creditor: {
          id: `cred-parsed-${Date.now()}`,
          filingNo: '회생-008',
          creditorName: '(주)글로벌크립토파트너스',
          bizNo: '220-88-98765',
          address: '서울특별시 서초구 반포대로 90, 8층',
          contact: '02-789-4321',
          bankName: '하나은행',
          accountNo: '234-567-890123',
          accountHolder: '(주)글로벌크립토파트너스',
          claimType: '외화대여금 (해외 정산 대출)',
          declaredPrincipal: 850000000,
          declaredInterest: 32000000,
          currency: 'USD',
          exchangeRate: 1417.5,
          verificationCode: 'EFV-2025-142002',
          isVerified: true,
          verifiedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          parsedFromDocument: true,
          submittedDate: new Date().toISOString().split('T')[0],
          submissionSource: 'ADMIN_PARSED' as const,
        },
        ledger: {
          ledgerPrincipal: 620000000,
          ledgerInterest: 15000000,
          ledgerTotal: 635000000,
          hasDiscrepancy: true,
          discrepancyReason: '해외 파산 정산 반영 및 평가환율 차이 발생',
        },
        decision: {
          status: 'PENDING' as const,
          admittedPrincipal: 620000000,
          admittedInterest: 15000000,
          admittedTotal: 635000000,
          deniedAmount: 247000000,
          votingRightAdmitted: 635000000,
          reasonCode: 'FOREIGN_SETTLEMENT',
          reasonText: '해외 거래처 파산 정산액 차감 후 잔액 시인함',
        },
      },
    },
  ];

  const handleSimulateParsing = (recordData: ReconciliationRecord) => {
    setIsParsing(true);
    setParsingProgress(0);
    setParsedData(null);

    const steps = [
      { pct: 15, text: 'PDF 문서 바운딩 박스 레이아웃 및 서식 OCR 스캔 중...' },
      { pct: 40, text: '사건번호, 채권자 인적사항, 주소, 계좌번호 추출 완료' },
      { pct: 65, text: '신고 원금, 개시전 이자 및 적용 환율 검증 중...' },
      { pct: 85, text: '전자금융 원증빙 위변조 무결성 코드 검증 (Verification Check)...' },
      { pct: 100, text: 'AI 파싱 및 데이터 구조화 완료!' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setParsingProgress(steps[currentStep].pct);
        setParsingStep(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsParsing(false);
        setParsedData(recordData);
      }
    }, 350);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleSimulateParsing(samplePresets[0].data);
  };

  const handleSaveAndGoDashboard = () => {
    if (parsedData) {
      onAddParsedRecord(parsedData);
      onNavigateToDashboard();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm border-t-4 border-t-[#1C2A45] relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#1C2A45] font-bold text-xs mb-1">
              <Scale className="w-4 h-4 text-blue-800" />
              <span>Step 1. Input Engine (관재인 전용)</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">채권신고서 PDF 자동 AI 스캔 & 파싱</h2>
            <p className="text-slate-600 text-sm mt-1">
              제출된 PDF 채권신고서 서식에서 사건번호, 채권자 인적사항, 신고 금액 및 이자 데이터를 실시간으로 구조화합니다.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl flex items-center space-x-3">
            <CheckCircle className="w-7 h-7 text-emerald-700" />
            <div>
              <div className="text-[11px] text-slate-500">법원 제출 서식 OCR</div>
              <div className="text-sm font-bold text-slate-900">인식 정확도 99.4%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Uploader Zone & Sample Loader */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Drag & Drop Zone */}
        <div className="lg:col-span-2">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center min-h-[320px] bg-white shadow-sm ${
              isDragOver
                ? 'border-blue-700 bg-blue-50/50 scale-[1.01]'
                : 'border-slate-300 hover:border-blue-600'
            }`}
          >
            <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center text-[#1C2A45] mb-4 shadow-sm">
              <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              채권신고서 PDF 또는 스캔 이미지 파일을 여기에 드래그하세요
            </h3>
            <p className="text-slate-500 text-xs mt-1 max-w-md">
              지원 형식: PDF, PNG, JPG (최대 50MB). 회생채권 신고서 서식, 세금계산서, 계약서 파일 자동 인식.
            </p>

            <div className="mt-6 flex items-center space-x-3">
              <button
                onClick={() => handleSimulateParsing(samplePresets[0].data)}
                disabled={isParsing}
                className="bg-[#1C2A45] hover:bg-blue-900 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center space-x-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>샘플 파일 선택 및 AI 스캔 시작</span>
              </button>
            </div>
          </div>
        </div>

        {/* Demo Preset Selector */}
        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 mb-3">
              <FileText className="w-4 h-4 text-blue-900" />
              <span>데모 신고서 문서 테스트</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              준비된 신고서 서식 데이터로 AI 파싱 엔진을 즉시 테스트해볼 수 있습니다.
            </p>

            <div className="space-y-3">
              {samplePresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSimulateParsing(preset.data)}
                  disabled={isParsing}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-600 hover:bg-blue-50/40 transition-all group disabled:opacity-50"
                >
                  <div className="text-xs font-bold text-slate-800 group-hover:text-blue-900">
                    {preset.label}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">
                    📄 {preset.filename}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Official Court OCR v2.5</span>
            <span className="text-emerald-700 font-bold">Engine Ready</span>
          </div>
        </div>
      </div>

      {/* Parsing Animation Loader */}
      {isParsing && (
        <div className="bg-white border border-blue-400 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-blue-900">
              <RefreshCw className="w-5 h-5 animate-spin text-blue-800" />
              <span className="font-bold text-sm text-slate-900">{parsingStep}</span>
            </div>
            <span className="text-blue-900 font-mono font-bold text-sm">{parsingProgress}%</span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
            <div
              className="bg-[#1C2A45] h-3 rounded-full transition-all duration-300"
              style={{ width: `${parsingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Parsed Result Card View */}
      {parsedData && !isParsing && (
        <div className="bg-white border border-emerald-300 rounded-2xl p-6 shadow-xl space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>신고서 OCR 파싱 성공:</span>
                  <span className="text-blue-900">{parsedData.creditor.creditorName}</span>
                </h3>
                <p className="text-xs text-slate-500">
                  신고서 텍스트 스캔 및 금액 산출 데이터 검증이 정상적으로 완료되었습니다.
                </p>
              </div>
            </div>

            <button
              onClick={handleSaveAndGoDashboard}
              className="w-full sm:w-auto bg-[#1C2A45] hover:bg-blue-900 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all"
            >
              <span>3-Way 시부인 대시보드에 신규 채무 추가</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Key Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                <Hash className="w-3.5 h-3.5 text-blue-800" />
                <span>사건번호 / 신고번호</span>
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">
                {parsedData.caseNumber} <span className="text-blue-900">({parsedData.creditor.filingNo})</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                <span>신고 원금</span>
              </div>
              <div className="text-base font-extrabold text-blue-900 mt-1 font-mono">
                {parsedData.creditor.declaredPrincipal.toLocaleString()} 원
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5 text-amber-700" />
                <span>신고 개시전 이자</span>
              </div>
              <div className="text-sm font-bold text-slate-800 mt-1 font-mono">
                {parsedData.creditor.declaredInterest.toLocaleString()} 원
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-800" />
                <span>서류 무결성 검증</span>
              </div>
              <div className="mt-1 flex items-center space-x-1.5">
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-700" /> Verified Code: {parsedData.creditor.verificationCode || 'EFV-2025-9981241'}
                </span>
              </div>
            </div>
          </div>

          {/* Structured Summary Extraction Table */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-xs font-bold text-slate-800 flex items-center space-x-2">
                <Database className="w-4 h-4 text-blue-900" />
                <span>AI 스캔 파싱 결과 데이터 통계</span>
              </div>
              <button
                onClick={() => setShowRawJson(!showRawJson)}
                className="text-[11px] text-blue-900 font-bold hover:underline flex items-center space-x-1"
              >
                <span>{showRawJson ? '구조화 카드 보기' : '원문 JSON 코드 보기'}</span>
                {showRawJson ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showRawJson ? (
              <pre className="text-[11px] font-mono text-blue-950 bg-white p-4 rounded-lg overflow-x-auto border border-slate-300 max-h-56 leading-relaxed">
                {JSON.stringify(parsedData, null, 2)}
              </pre>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs bg-white p-3 rounded-lg border border-slate-200">
                <div><span className="text-slate-500">채권자 상호:</span> <strong>{parsedData.creditor.creditorName}</strong></div>
                <div><span className="text-slate-500">사업자/주민번호:</span> <strong className="font-mono">{parsedData.creditor.bizNo}</strong></div>
                <div><span className="text-slate-500">연락처:</span> <strong className="font-mono">{parsedData.creditor.contact}</strong></div>
                <div><span className="text-slate-500">채권 종류:</span> <strong>{parsedData.creditor.claimType}</strong></div>
                <div><span className="text-slate-500">변제 계좌:</span> <strong className="font-mono">{parsedData.creditor.bankName} {parsedData.creditor.accountNo}</strong></div>
                <div><span className="text-slate-500">검증 코드:</span> <strong className="font-mono text-blue-900">{parsedData.creditor.verificationCode}</strong></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
