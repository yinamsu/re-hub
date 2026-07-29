'use client';

import React, { useState } from 'react';
import { 
  Network, 
  Building2, 
  User, 
  CreditCard, 
  ShieldAlert, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2,
  DollarSign,
  Info
} from 'lucide-react';
import { EntityNode, TransactionLink } from '@/types/forensic';

interface EntityRelationshipGraphProps {
  nodes: EntityNode[];
  links: TransactionLink[];
}

export const EntityRelationshipGraph: React.FC<EntityRelationshipGraphProps> = ({
  nodes,
  links,
}) => {
  const [selectedNode, setSelectedNode] = useState<EntityNode | null>(nodes[0]);
  const [selectedLink, setSelectedLink] = useState<TransactionLink | null>(links[4]); // default to suspicious link

  const getNodeIcon = (type: EntityNode['type']) => {
    switch (type) {
      case 'COMPANY':
        return Building2;
      case 'INDIVIDUAL':
        return User;
      case 'BANK_ACCOUNT':
        return CreditCard;
      case 'AFFILIATE':
        return ShieldAlert;
      default:
        return Building2;
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'bg-[#FFF1F2] text-[#C53030] border-rose-300';
    if (score >= 40) return 'bg-[#FFFBEB] text-[#D69E2E] border-amber-300';
    return 'bg-[#ECFDF5] text-[#2F855A] border-emerald-300';
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Banner */}
      <div className="bg-white border border-[#CBD5E1] rounded p-6 shadow-sm border-t-4 border-t-[#C53030] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#C53030] font-bold text-xs mb-1">
            <Network className="w-4 h-4" />
            <span>Module 4. Entity Relationship & Transaction Flow Network Graph</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">특수관계자 및 자금 유출 네트워크 그래프</h1>
          <p className="text-slate-600 text-xs mt-1">
            채무자 회생기업, 대표이사, 특수관계인, 주요 채권자 간의 차명 지분 관계 및 의심스러운 자금 유출 흐름(8.5억원)을 시각적으로 추적합니다.
          </p>
        </div>

        <div className="bg-[#FFF1F2] border border-rose-300 p-3 rounded flex items-center space-x-3 text-xs font-mono text-[#C53030]">
          <ShieldAlert className="w-6 h-6" />
          <div>
            <div className="text-slate-600 font-sans">이상자금 유출 탐지</div>
            <div className="font-bold">고위험 노드 2개 감지됨</div>
          </div>
        </div>
      </div>

      {/* 2. Interactive SVG Node-Link Canvas & Right Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-[#0A192F] border border-[#1B2E4B] rounded p-6 shadow-xl relative min-h-[480px] flex flex-col justify-between select-none">
          <div className="flex items-center justify-between text-xs text-slate-300 font-mono border-b border-[#1B2E4B] pb-3">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Network className="w-4 h-4 text-emerald-400" /> Interactive Node-Link Forensic Diagram
            </span>
            <span className="text-[10px] text-slate-400">노드 및 연결선을 클릭하여 포렌식 정보를 확인하세요</span>
          </div>

          {/* Canvas SVG Links & Absolute HTML Nodes */}
          <div className="relative w-full h-[380px] my-4">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {links.map((link) => {
                const source = nodes.find((n) => n.id === link.sourceId);
                const target = nodes.find((n) => n.id === link.targetId);
                if (!source || !target) return null;

                const isSelected = selectedLink?.id === link.id;

                return (
                  <g key={link.id}>
                    <line
                      x1={`${source.x}%`}
                      y1={`${source.y}%`}
                      x2={`${target.x}%`}
                      y2={`${target.y}%`}
                      stroke={link.isSuspicious ? '#C53030' : isSelected ? '#38BDF8' : '#475569'}
                      strokeWidth={link.isSuspicious ? 3 : 2}
                      strokeDasharray={link.relationType === 'SHAREHOLDING' ? '5,5' : 'none'}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Absolute Positioned HTML Nodes */}
            {nodes.map((node) => {
              const Icon = getNodeIcon(node.type);
              const isSelected = selectedNode?.id === node.id;
              const isHighRisk = node.riskScore >= 80;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                    isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl border flex flex-col items-center shadow-lg transition-all ${
                      isSelected
                        ? 'bg-[#1B2E4B] border-amber-300 ring-2 ring-amber-300 text-white'
                        : isHighRisk
                        ? 'bg-[#1E1B4B] border-[#C53030] text-rose-200'
                        : 'bg-[#060F1E] border-slate-700 text-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <div className={`p-2 rounded-full mb-1 ${
                      isHighRisk ? 'bg-[#C53030] text-white' : 'bg-[#1B2E4B] text-amber-300'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-xs text-center whitespace-nowrap">{node.name}</div>
                    <div className="text-[9px] text-slate-400 font-mono mt-0.5">{node.role}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono border-t border-[#1B2E4B] pt-3">
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#C53030]"></span> 의심 자금유출</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-slate-500 stroke-dash"></span> 지분 관계</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-slate-400"></span> 정상 채권관계</span>
            </div>
            <span>Nodes: {nodes.length} | Links: {links.length}</span>
          </div>
        </div>

        {/* Right Inspector Panel (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#CBD5E1] rounded p-5 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-[#1B2E4B] pb-3 border-b border-slate-200 font-bold text-sm">
            <Info className="w-4 h-4 text-[#004E98]" />
            <span>선택 노드 및 자금 유출 포렌식 검계</span>
          </div>

          {selectedNode ? (
            <div className="space-y-4 text-xs">
              <div className="bg-[#F8FAFC] border border-[#CBD5E1] p-4 rounded space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[10px] text-slate-500 font-mono">{selectedNode.role}</div>
                    <div className="text-base font-black text-slate-900 mt-0.5">{selectedNode.name}</div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono ${getRiskColor(selectedNode.riskScore)}`}>
                    위험도 {selectedNode.riskScore}%
                  </span>
                </div>
                {selectedNode.registrationNo && (
                  <div className="text-[11px] font-mono text-slate-600">
                    등록번호: {selectedNode.registrationNo}
                  </div>
                )}
              </div>

              {/* Transactions List linked to this node */}
              <div className="space-y-2">
                <div className="font-bold text-slate-800 border-b border-slate-200 pb-1">
                  관련 거래 및 지분 연결 내역
                </div>
                {links
                  .filter((l) => l.sourceId === selectedNode.id || l.targetId === selectedNode.id)
                  .map((l) => (
                    <div
                      key={l.id}
                      onClick={() => setSelectedLink(l)}
                      className={`p-3 rounded border text-xs cursor-pointer transition-all ${
                        l.isSuspicious
                          ? 'bg-[#FFF1F2] border-rose-300 text-rose-950 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span>{l.relationType}</span>
                        {l.isSuspicious && (
                          <span className="bg-[#C53030] text-white text-[9px] px-1 rounded">경고</span>
                        )}
                      </div>
                      <div>{l.label}</div>
                      {l.amountKRW && (
                        <div className="text-xs font-mono font-extrabold text-[#C53030] mt-1">
                          금액: {l.amountKRW.toLocaleString()} 원
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              그래프 노드를 선택하세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
