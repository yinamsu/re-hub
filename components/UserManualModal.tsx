'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  X, 
  Scale, 
  FileText, 
  GitCompare, 
  FileSpreadsheet, 
  UserCheck, 
  Keyboard, 
  HelpCircle, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserManualModal: React.FC<UserManualModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'admin' | 'creditor' | 'faq'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-300 rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-xl">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Re-Hub 플랫폼 상세 이용 안내 및 법원 업무 매뉴얼</h2>
              <p className="text-xs text-slate-300">대한민국 회생법원 제출 양식 준수 | 회생·파산관재인 및 채권자 통합 가이드</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-100/80 px-6 pt-3 space-x-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center space-x-2 ${
              activeTab === 'overview'
                ? 'bg-white text-blue-900 border-t-2 border-x border-blue-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>1. 플랫폼 개요 & 서식 규격</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center space-x-2 ${
              activeTab === 'admin'
                ? 'bg-white text-blue-900 border-t-2 border-x border-blue-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            <span>2. 관재인용 심사 매뉴얼</span>
          </button>

          <button
            onClick={() => setActiveTab('creditor')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center space-x-2 ${
              activeTab === 'creditor'
                ? 'bg-white text-blue-900 border-t-2 border-x border-blue-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>3. 채권자 셀프 신고 가이드</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center space-x-2 ${
              activeTab === 'faq'
                ? 'bg-white text-blue-900 border-t-2 border-x border-blue-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>4. 자주 묻는 질문 (FAQ)</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed flex-1">
          {/* TAB 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-blue-900 text-xs">
                <h3 className="font-bold text-sm mb-1">🏛️ Re-Hub 법률 통합 플랫폼 개요</h3>
                <p>
                  Re-Hub는 기업 회생 및 파산 절차에서 엑셀 기반의 수작업으로 진행되던 채권 시부인 업무를 
                  전자소송 수준의 표준화된 디지털 프로세스로 전환한 <strong>법률 전문 SaaS 플랫폼</strong>입니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-700" />
                    <span>회생법원 표준 서식 준수 (별표 2-2)</span>
                  </h4>
                  <p className="text-xs text-slate-600">
                    서울회생법원 실무준칙에 의거하여 『추후보완 신고된 회생채권 시·부인 명세서 (별표 2-2)』 
                    서식에 완전히 일치하는 Excel(.xlsx)을 클릭 한 번으로 자동 산출합니다.
                  </p>
                </div>

                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>3-Way 데이터 교차 무결성 검증</span>
                  </h4>
                  <p className="text-xs text-slate-600">
                    채무자 회사 장부 내역, 채권자 신고서, 관재인 최종 판단을 동일 화면 3컬럼으로 비교하여 
                    오류 없는 의결권 산정 및 부인액 처리를 보장합니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Admin Guide */}
          {activeTab === 'admin' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base">👨‍⚖️ 회생관재인 및 조사위원 심사 가이드</h3>
              
              <div className="space-y-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="font-bold text-blue-900 text-xs">Step 1. 신고서 PDF AI 스캔 파싱</div>
                  <p className="text-xs text-slate-600 mt-1">
                    제출된 PDF/이미지 신고서를 업로드하면 AI 파싱 엔진이 사건번호, 채권자 정보, 신고 원금 및 이자를 자동 추출합니다.
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="font-bold text-blue-900 text-xs">Step 2. 3-Way 대시보드 및 단축키 활용</div>
                  <p className="text-xs text-slate-600 mt-1">
                    장부와 신고액의 불일치 경고를 확인한 후, 단축키 <kbd className="bg-white border px-1 rounded">Alt+A</kbd>(전액 시인) 또는 <kbd className="bg-white border px-1 rounded">Alt+D</kbd>(전액 부인)로 신속히 심사합니다.
                    일부 시인 시 시인 원금 입력 시 부인액과 의결권 인정액이 자동 연동 계산됩니다.
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="font-bold text-blue-900 text-xs">Step 3. 법원 제출용 엑셀 출력</div>
                  <p className="text-xs text-slate-600 mt-1">
                    심사 완료 후 라이브 요약 통계를 확인하고 [법원 제출용 Excel 다운로드]를 실행하여 법원에 즉시 제출 가능한 시부인 명세서를 출력합니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Creditor Guide */}
          {activeTab === 'creditor' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base">🏢 일반 채권자 셀프 전자신고 가이드</h3>

              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-emerald-900 text-xs">
                <p className="font-bold">💡 별도의 변호사/법무사 조력 없이도 온라인에서 직접 채권을 신고할 수 있습니다.</p>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-xs text-slate-700">
                <li className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>사건 및 인적사항 입력:</strong> 회생 사건번호(예: 2025회단142)를 선택하고 채권자 상호명, 주민/사업자번호, 주소, 변제받을 계좌번호를 기재합니다.
                </li>
                <li className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>채권액 및 이자 입력:</strong> 원채권 종류(대여금, 상거래, 임금 등)를 선택하고 개시 전 원금과 약정이자를 입력합니다.
                </li>
                <li className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>원증빙 서류 첨부:</strong> 세금계산서, 금전소비대약서, 송금영수증 스캔본을 파일로 첨부합니다.
                </li>
                <li className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>전자서명 제출:</strong> 작성 내용을 최종 확인 후 신고서를 전자 제출하면 관재인 심사 대시보드로 즉시 송신됩니다.
                </li>
              </ol>
            </div>
          )}

          {/* TAB 4: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-base mb-2">❓ 자주 묻는 질문</h3>

              <div className="border border-slate-200 rounded-xl p-3.5 space-y-1">
                <div className="font-bold text-blue-900 text-xs">Q. 회생개시 전 이자는 어떻게 계산되나요?</div>
                <div className="text-xs text-slate-600">
                  회생절차 개시결정 전날까지 발생한 이자만 신고 이자에 포함할 수 있으며, 법정 상한이율(연 20%)을 초과하는 이자는 관재인 심사 시 부인 처리됩니다.
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-3.5 space-y-1">
                <div className="font-bold text-blue-900 text-xs">Q. 동일한 채권이 장무와 채권자 신고 양쪽에 중복 기재되면 어떻게 되나요?</div>
                <div className="text-xs text-slate-600">
                  Re-Hub 3-Way 대시보드에서 동일 채무 식별 시 경고 뱃지가 표시되며, 관재인은 `DUPLICATE_CLAIM` 사유를 선택하여 원본 채권만 인정하고 중복건은 부인합니다.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Re-Hub Court System Guide v2.5</span>
          <button
            onClick={onClose}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-5 py-2 rounded-xl transition-colors"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
