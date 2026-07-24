'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  UserCheck, 
  FileText, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Scale, 
  DollarSign, 
  CreditCard,
  CheckSquare
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
  const [submittedFilingNo, setSubmittedFilingNo] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    creditorName: '',
    bizNo: '',
    address: '',
    contact: '',
    bankName: '국민은행',
    accountNo: '',
    accountHolder: '',
    claimType: '상거래 회생채권 (물품대금)',
    declaredPrincipal: 120000000,
    declaredInterest: 3600000,
    evidenceNote: '세금계산서 3매, 거래명세서 및 은행 송금확인서 첨부',
    signatureAccepted: false,
  });

  const nextFilingNumber = `회생-00${Math.floor(Math.random() * 80) + 10}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecord: ReconciliationRecord = {
      id: `rec-self-${Date.now()}`,
      caseNumber: '2025회단142',
      caseName: '(주)알파테크놀로지 회생절차',
      creditor: {
        id: `cred-self-${Date.now()}`,
        filingNo: nextFilingNumber,
        creditorName: formData.creditorName || '(주)성진인포텍',
        bizNo: formData.bizNo || '214-88-54321',
        address: formData.address || '서울특별시 구로구 디지털로 306, 902호',
        contact: formData.contact || '02-860-1122',
        bankName: formData.bankName,
        accountNo: formData.accountNo || '123-456-789012',
        accountHolder: formData.accountHolder || formData.creditorName || '(주)성진인포텍',
        claimType: formData.claimType,
        declaredPrincipal: Number(formData.declaredPrincipal) || 0,
        declaredInterest: Number(formData.declaredInterest) || 0,
        currency: 'KRW',
        exchangeRate: 1.0,
        parsedFromDocument: false,
        submittedDate: new Date().toISOString().split('T')[0],
        submissionSource: 'CREDITOR_SELF',
        evidenceFiles: [formData.evidenceNote],
      },
      ledger: {
        ledgerPrincipal: Number(formData.declaredPrincipal) || 0,
        ledgerInterest: Number(formData.declaredInterest) || 0,
        ledgerTotal: (Number(formData.declaredPrincipal) || 0) + (Number(formData.declaredInterest) || 0),
        hasDiscrepancy: false,
      },
      decision: {
        status: 'PENDING',
        admittedPrincipal: Number(formData.declaredPrincipal) || 0,
        admittedInterest: Number(formData.declaredInterest) || 0,
        admittedTotal: (Number(formData.declaredPrincipal) || 0) + (Number(formData.declaredInterest) || 0),
        deniedAmount: 0,
        votingRightAdmitted: (Number(formData.declaredPrincipal) || 0) + (Number(formData.declaredInterest) || 0),
        reasonCode: 'FULL_ADMIT',
        reasonText: '채권자 온라인 셀프 신고 접수 건 (관재인 서류 검토 대기)',
      },
    };

    onAddRecord(newRecord);
    setSubmittedFilingNo(nextFilingNumber);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header Banner - Official Court Style */}
      <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-md border-t-4 border-t-blue-900">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-blue-900 mb-1 font-bold text-xs">
              <Scale className="w-4 h-4 text-blue-700" />
              <span>대한민국 회생법원 전자신고 채널</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">일반 채권자 셀프 채권신고 센터</h2>
            <p className="text-slate-600 text-sm mt-1">
              법률대리인 없이 채권자가 직접 회생 사건의 채권 원금, 이자 및 증빙 서류를 온라인으로 편리하게 신고할 수 있습니다.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-right">
            <div className="text-[11px] text-slate-500">현재 대상 사건</div>
            <div className="text-sm font-bold text-blue-900 font-mono">2025회단142</div>
            <div className="text-xs text-slate-700 font-medium">(주)알파테크놀로지 회생절차</div>
          </div>
        </div>
      </div>

      {/* Submitted Success Receipt View */}
      {submittedFilingNo ? (
        <div className="bg-white border border-emerald-300 rounded-2xl p-8 shadow-xl space-y-6 animate-in zoom-in-95 duration-300">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">회생채권 신고서 전자 접수가 완료되었습니다!</h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              제출하신 신고서는 회생관재인의 3-Way 검증 대시보드로 즉시 송신되었으며, 법원 서식 규격으로 심사됩니다.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-300 rounded-xl p-6 max-w-lg mx-auto space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 text-xs">
              <span className="text-slate-500 font-bold">발급 접수번호</span>
              <span className="font-mono font-bold text-blue-900 text-sm bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {submittedFilingNo}
              </span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-slate-500">채권자 상호명</span>
              <span className="font-bold text-slate-900">{formData.creditorName || '(주)성진인포텍'}</span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-slate-500">신고 채권 총액</span>
              <span className="font-bold font-mono text-emerald-700 text-sm">
                {((Number(formData.declaredPrincipal) || 0) + (Number(formData.declaredInterest) || 0)).toLocaleString()} 원
              </span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-slate-500">접수 일시</span>
              <span className="font-mono text-slate-700">{new Date().toLocaleString('ko-KR')}</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4 pt-4">
            <button
              onClick={() => {
                setSubmittedFilingNo(null);
                setStep(1);
              }}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
            >
              추가 채권 신고하기
            </button>

            <button
              onClick={onNavigateToDashboard}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg transition-colors flex items-center space-x-2"
            >
              <span>관재인 심사 대시보드에서 내역 확인</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Step-by-Step Form Wizard */
        <div className="bg-white border border-slate-300 rounded-2xl shadow-lg overflow-hidden">
          {/* Step Progress Bar */}
          <div className="bg-slate-100 border-b border-slate-200 px-6 py-4 grid grid-cols-4 gap-2 text-center text-xs font-bold">
            <div className={`p-2 rounded-lg transition-all ${step === 1 ? 'bg-blue-900 text-white shadow' : 'text-slate-500 bg-slate-200'}`}>
              1. 채권자 인적사항
            </div>
            <div className={`p-2 rounded-lg transition-all ${step === 2 ? 'bg-blue-900 text-white shadow' : 'text-slate-500 bg-slate-200'}`}>
              2. 채권 금액 및 이자
            </div>
            <div className={`p-2 rounded-lg transition-all ${step === 3 ? 'bg-blue-900 text-white shadow' : 'text-slate-500 bg-slate-200'}`}>
              3. 증빙서류 첨부
            </div>
            <div className={`p-2 rounded-lg transition-all ${step === 4 ? 'bg-blue-900 text-white shadow' : 'text-slate-500 bg-slate-200'}`}>
              4. 최종 서명 제출
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-black text-slate-900 text-lg border-b border-slate-200 pb-2">
                  1. 채권자 기본 인적사항 및 입금 계좌
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">채권자 성명 / 상호명 *</label>
                    <input
                      type="text"
                      required
                      placeholder="예: (주)성진인포텍 또는 홍길동"
                      value={formData.creditorName}
                      onChange={(e) => setFormData({ ...formData, creditorName: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">사업자등록번호 / 주민번호 *</label>
                    <input
                      type="text"
                      required
                      placeholder="예: 214-88-54321"
                      value={formData.bizNo}
                      onChange={(e) => setFormData({ ...formData, bizNo: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-700"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-700">주소 (송달장소) *</label>
                    <input
                      type="text"
                      required
                      placeholder="서울특별시 구로구 디지털로 306, 902호"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">연락처 *</label>
                    <input
                      type="text"
                      required
                      placeholder="010-1234-5678"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">변제받을 입금 은행 및 계좌번호 *</label>
                    <div className="flex gap-2">
                      <select
                        value={formData.bankName}
                        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                        className="border border-slate-300 rounded-lg p-2.5 text-xs bg-white"
                      >
                        <option value="국민은행">국민은행</option>
                        <option value="신한은행">신한은행</option>
                        <option value="우리은행">우리은행</option>
                        <option value="하나은행">하나은행</option>
                        <option value="기업은행">기업은행</option>
                      </select>
                      <input
                        type="text"
                        required
                        placeholder="계좌번호 입력"
                        value={formData.accountNo}
                        onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
                        className="flex-1 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors flex items-center space-x-2"
                  >
                    <span>다음 단계 (채권 금액 입력)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-black text-slate-900 text-lg border-b border-slate-200 pb-2">
                  2. 신고 채권 세부 내용 및 개시전 이자
                </h3>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">채권의 종류 및 원인 *</label>
                    <select
                      value={formData.claimType}
                      onChange={(e) => setFormData({ ...formData, claimType: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-blue-700"
                    >
                      <option value="상거래 회생채권 (물품대금)">상거래 회생채권 (물품대금 납품)</option>
                      <option value="대여금 회생채권 (원리금)">대여금 회생채권 (금전소비대차)</option>
                      <option value="임금 및 퇴직금 채권">임금 및 퇴직금 채권 (공익채권)</option>
                      <option value="투자금 회생채권">투자금 회생채권 (사채원리금)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                      <label className="text-xs font-bold text-slate-900">신고 원금 (KRW) *</label>
                      <input
                        type="number"
                        required
                        value={formData.declaredPrincipal}
                        onChange={(e) => setFormData({ ...formData, declaredPrincipal: Number(e.target.value) })}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-base font-extrabold text-blue-900 font-mono focus:outline-none focus:border-blue-700"
                      />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                      <label className="text-xs font-bold text-slate-900">신고 개시전 이자 (KRW)</label>
                      <input
                        type="number"
                        value={formData.declaredInterest}
                        onChange={(e) => setFormData({ ...formData, declaredInterest: Number(e.target.value) })}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-base font-bold text-slate-800 font-mono focus:outline-none focus:border-blue-700"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex justify-between items-center text-xs text-blue-900">
                    <span className="font-bold">신고 총액 (원금 + 이자)</span>
                    <span className="font-black text-base font-mono">
                      {((Number(formData.declaredPrincipal) || 0) + (Number(formData.declaredInterest) || 0)).toLocaleString()} 원
                    </span>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl transition-colors flex items-center space-x-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>이전 단계</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors flex items-center space-x-2"
                  >
                    <span>다음 단계 (증빙 서류 첨부)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-black text-slate-900 text-lg border-b border-slate-200 pb-2">
                  3. 채권 원증빙 서류 파일 첨부
                </h3>

                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-3 bg-slate-50">
                  <Upload className="w-10 h-10 text-blue-800 mx-auto" />
                  <div className="text-xs font-bold text-slate-800">
                    계약서, 세금계산서, 금융 송금영수증 PDF 또는 이미지 첨부
                  </div>
                  <p className="text-[11px] text-slate-500">
                    관재인이 장부 내역과 교차 검증하기 위한 원본 증빙 서류 스캔본을 첨부하세요.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">첨부 증빙 서류 목록 메모</label>
                  <input
                    type="text"
                    value={formData.evidenceNote}
                    onChange={(e) => setFormData({ ...formData, evidenceNote: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl transition-colors flex items-center space-x-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>이전 단계</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors flex items-center space-x-2"
                  >
                    <span>최종 검토 및 서명 단계</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-black text-slate-900 text-lg border-b border-slate-200 pb-2">
                  4. 신고서 최종 검토 및 전자 서명 제출
                </h3>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 text-xs space-y-2">
                  <div className="font-bold text-blue-900 text-sm">신고서 최종 내용 확인</div>
                  <div className="grid grid-cols-2 gap-2 text-slate-700 pt-1">
                    <div><strong>채권자:</strong> {formData.creditorName || '(주)성진인포텍'}</div>
                    <div><strong>신고원금:</strong> {(Number(formData.declaredPrincipal) || 0).toLocaleString()}원</div>
                    <div><strong>채권종류:</strong> {formData.claimType}</div>
                    <div><strong>신고이자:</strong> {(Number(formData.declaredInterest) || 0).toLocaleString()}원</div>
                  </div>
                </div>

                <div className="border border-amber-300 bg-amber-50 p-3.5 rounded-xl text-xs text-amber-900 flex items-start space-x-2">
                  <CheckSquare className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>서약 사항:</strong> 본 채권신고서에 기재된 내용 및 첨부 서류는 사실과 다름없으며, 허위 신고 시 민·형사상 불이익을 감수할 것을 확인합니다.
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="sigCheck"
                    required
                    checked={formData.signatureAccepted}
                    onChange={(e) => setFormData({ ...formData, signatureAccepted: e.target.checked })}
                    className="w-4 h-4 text-blue-900 rounded focus:ring-blue-800"
                  />
                  <label htmlFor="sigCheck" className="text-xs font-bold text-slate-900 cursor-pointer">
                    위 서약 사항에 동의하며 전자 신고서를 회생법원에 제출합니다.
                  </label>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl transition-colors flex items-center space-x-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>이전 단계</span>
                  </button>

                  <button
                    type="submit"
                    disabled={!formData.signatureAccepted}
                    className="bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all disabled:opacity-40 flex items-center space-x-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>채권신고서 최종 전자 제출</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
