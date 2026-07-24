'use client';

import React, { useState } from 'react';
import { 
  Upload, 
  FileCheck, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  Database,
  ArrowRight,
  FileText,
  DollarSign,
  Hash,
  Scale
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

  const samplePresets = [
    {
      label: '샘플 1: 코너스톤벤처스 (원화 투자금)',
      filename: '2025회단142_채권신고서_코너스톤.pdf',
      data: {
        id: `rec-parsed-${Date.now()}`,
        caseNumber: '2025회단142',
        caseName: '(주)알파테크놀로지 회생절차',
        creditor: {
          id: `cred-parsed-${Date.now()}`,
          filingNo: '회생-007',
          creditorName: '(주)코너스톤 벤처투자',
          bizNo: '110-86-99881',
          address: '서울특별시 강남구 역삼동 702-1, 10층',
          contact: '02-555-8811',
          claimType: '투자금 (신주인수권부사채)',
          declaredPrincipal: 500000000,
          declaredInterest: 18500000,
          currency: 'KRW',
          exchangeRate: 1.0,
          txId: '0x8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c',
          txVerified: true,
          txTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          txBlock: 19850123,
          parsedFromDocument: true,
          submittedDate: new Date().toISOString().split('T')[0],
        },
        ledger: {
          ledgerPrincipal: 500000000,
          ledgerInterest: 18500000,
          ledgerTotal: 518500000,
          hasDiscrepancy: false,
        },
        decision: {
          status: 'PENDING' as const,
          admittedPrincipal: 500000000,
          admittedInterest: 18500000,
          admittedTotal: 518500000,
          deniedAmount: 0,
          votingRightAdmitted: 518500000,
          reasonCode: 'FULL_ADMIT',
          reasonText: '채무자 장부 및 원증빙과 일치하여 전액 시인함',
        },
      },
    },
    {
      label: '샘플 2: 퀀텀블록파트너스 (외화 및 온체인 해시 검증건)',
      filename: '2025회단142_채권신고서_퀀텀블록.pdf',
      data: {
        id: `rec-parsed-${Date.now()}`,
        caseNumber: '2025회단142',
        caseName: '(주)알파테크놀로지 회생절차',
        creditor: {
          id: `cred-parsed-${Date.now()}`,
          filingNo: '회생-008',
          creditorName: 'Quantum Block Partners Inc.',
          bizNo: '990-11-00231',
          address: '77 Broad Street, New York, NY 10004, USA',
          contact: '+1-212-555-0199',
          claimType: '외화대여금 (Web3 Smart Contract Loan)',
          declaredPrincipal: 1417500000, // $1,000,000 @ 1417.50
          declaredInterest: 70875000,
          currency: 'USD',
          exchangeRate: 1417.5,
          txId: '0x99281a8c7b6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f',
          txVerified: true,
          txTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          txBlock: 19850999,
          parsedFromDocument: true,
          submittedDate: new Date().toISOString().split('T')[0],
        },
        ledger: {
          ledgerPrincipal: 1200000000,
          ledgerInterest: 50000000,
          ledgerTotal: 1250000000,
          hasDiscrepancy: true,
          discrepancyReason: '외화 평가 환율 및 스마트 컨트랙트 담보 정산 차액 발생',
        },
        decision: {
          status: 'PENDING' as const,
          admittedPrincipal: 1200000000,
          admittedInterest: 50000000,
          admittedTotal: 1250000000,
          deniedAmount: 238375000,
          votingRightAdmitted: 1250000000,
          reasonCode: 'FTX_DEDUCTION',
          reasonText: '스마트 컨트랙트 담보 정산액 차감 후 잔액 시인함',
        },
      },
    },
  ];

  const handleSimulateParsing = (recordData: ReconciliationRecord) => {
    setIsParsing(true);
    setParsingProgress(0);
    setParsedData(null);

    const steps = [
      { pct: 15, text: 'PDF 문서 바운딩 박스 레이아웃 및 텍스트 OCR 스캔 중...' },
      { pct: 40, text: '사건번호, 채권자명, 주소, 사업자번호 메타데이터 추출 완료' },
      { pct: 65, text: '신고 원금, 개시전 이자 및 적용 환율(1,417.50) 계산 엔진 검증 중...' },
      { pct: 85, text: 'Web3 트랜잭션 ID 온체인 해시 무결성 검증 (Etherscan API Verification)...' },
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
    }, 450);
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
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 mb-1">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Step 1. Input Engine</span>
            </div>
            <h2 className="text-2xl font-black text-white">채권신고서 (PDF/이미지) AI 파싱 시뮬레이터</h2>
            <p className="text-slate-400 text-sm mt-1">
              회생/파산 채권자가 제출한 PDF 신고서를 AI OCR로 자동 분석하여 사건번호, 신고금액, 이자, Web3 트랜잭션 검증값을 추출합니다.
            </p>
          </div>
          <div className="bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl flex items-center space-x-3">
            <Scale className="w-8 h-8 text-emerald-400" />
            <div>
              <div className="text-[11px] text-slate-400">자동 파싱 정확도</div>
              <div className="text-sm font-bold text-slate-200">99.4% (법원 양식 전용 모델)</div>
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
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center min-h-[320px] bg-slate-900/60 backdrop-blur-sm ${
              isDragOver
                ? 'border-indigo-500 bg-indigo-950/20 scale-[1.01]'
                : 'border-slate-700 hover:border-slate-500'
            }`}
          >
            <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
              <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-slate-200">
              채권신고서 PDF 또는 스캔 이미지 파일을 여기에 드래그하세요
            </h3>
            <p className="text-slate-400 text-xs mt-1 max-w-md">
              지원 형식: PDF, PNG, JPG (최대 50MB). 법원 서식 회생채권 신고서, 계약서, 송금 영수증 자동 인식.
            </p>

            <div className="mt-6 flex items-center space-x-3">
              <button
                onClick={() => handleSimulateParsing(samplePresets[0].data)}
                disabled={isParsing}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-blue-900/30 transition-all flex items-center space-x-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>파일 선택 및 AI 파싱 시작</span>
              </button>
            </div>
          </div>
        </div>

        {/* Demo Preset Selector */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2 mb-3">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>원클릭 데모 PDF 파싱 테스트</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              준비된 실제 채권신고서 샘플 데이터로 AI 파싱 엔진을 즉시 테스트해보세요.
            </p>

            <div className="space-y-3">
              {samplePresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSimulateParsing(preset.data)}
                  disabled={isParsing}
                  className="w-full text-left p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900 transition-all group disabled:opacity-50"
                >
                  <div className="text-xs font-bold text-slate-200 group-hover:text-indigo-300">
                    {preset.label}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">
                    📄 {preset.filename}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Powered by Re-Hub AI Engine v2.4</span>
            <span className="text-emerald-400 font-semibold">Ready</span>
          </div>
        </div>
      </div>

      {/* Parsing Animation Overlay / Loader */}
      {isParsing && (
        <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl space-y-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-indigo-400">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span className="font-bold text-sm text-slate-100">{parsingStep}</span>
            </div>
            <span className="text-indigo-400 font-mono font-bold">{parsingProgress}%</span>
          </div>

          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${parsingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Parsed JSON Result Card View */}
      {parsedData && !isParsing && (
        <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <span>AI extraction result:</span>
                  <span className="text-emerald-400">{parsedData.creditor.creditorName}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  신고서 OCR 분석 및 Web3 온체인 무결성 검증이 완료되었습니다.
                </p>
              </div>
            </div>

            <button
              onClick={handleSaveAndGoDashboard}
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg shadow-emerald-900/30 flex items-center justify-center space-x-2 transition-all"
            >
              <span>3-Way 시부인 대시보드에 신규 채무 추가</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Key Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                <Hash className="w-3.5 h-3.5 text-blue-400" />
                <span>사건번호 / 신고번호</span>
              </div>
              <div className="text-sm font-bold text-slate-200 mt-1">
                {parsedData.caseNumber} <span className="text-indigo-400">({parsedData.creditor.filingNo})</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>신고 원금</span>
              </div>
              <div className="text-base font-extrabold text-emerald-400 mt-1 font-mono">
                {parsedData.creditor.declaredPrincipal.toLocaleString()} 원
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>신고 개시전 이자</span>
              </div>
              <div className="text-sm font-bold text-amber-300 mt-1 font-mono">
                {parsedData.creditor.declaredInterest.toLocaleString()} 원
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Web3 Tx Verification</span>
              </div>
              <div className="mt-1 flex items-center space-x-1.5">
                {parsedData.creditor.txVerified ? (
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" /> Verified Hash
                  </span>
                ) : (
                  <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-rose-400" /> Unverified
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* JSON Tree Preview */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs font-bold text-slate-400 mb-2 flex items-center space-x-2">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>Extracted Schema (JSON View)</span>
            </div>
            <pre className="text-[11px] font-mono text-indigo-300 bg-slate-900/90 p-4 rounded-lg overflow-x-auto border border-slate-800 max-h-60 leading-relaxed">
              {JSON.stringify(parsedData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
