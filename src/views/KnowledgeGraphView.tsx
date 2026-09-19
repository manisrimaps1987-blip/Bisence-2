import React, { useState } from 'react';
import { DisclaimerBanner } from '../components/TrustBadge';
import { 
  Network, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface GraphNode {
  id: string;
  type: 'PRODUCT' | 'CATEGORY' | 'CHARACTERISTIC' | 'STANDARD' | 'REQUIREMENT' | 'TEST' | 'SERVICE';
  label: string;
  details: string;
  source: string;
}

export const KnowledgeGraphView: React.FC<{ onCheckOfficial: (url: string, name: string) => void }> = ({ onCheckOfficial }) => {
  const [selectedNetwork, setSelectedNetwork] = useState<'SINK' | 'MIXER'>('SINK');
  const [activeNodeId, setActiveNodeId] = useState<string>('node-std-1');

  // Commercial Sink Network Nodes
  const sinkNodes: GraphNode[] = [
    {
      id: 'node-prod-1',
      type: 'PRODUCT',
      label: 'Commercial Kitchen Sink',
      details: 'Fabricated stainless-steel fixture for food preparation, washing, and sanitizing.',
      source: 'Input Product Prompt'
    },
    {
      id: 'node-cat-1',
      type: 'CATEGORY',
      label: 'Food Service & Kitchenware',
      details: 'Commercial catering equipment, sanitary appliances, and food-contact utensils.',
      source: 'Sectional Committee Classification'
    },
    {
      id: 'node-char-1',
      type: 'CHARACTERISTIC',
      label: 'AISI 304 Stainless Steel',
      details: 'Austenitic alloy with 18% Cr and 8% Ni ensuring food-contact hygiene and corrosion resistance.',
      source: 'IS 6911 Material Specifications'
    },
    {
      id: 'node-std-1',
      type: 'STANDARD',
      label: 'IS 13983:1994',
      details: 'Indian Standard Specification for Stainless Steel Sinks for Domestic and Commercial Purposes.',
      source: 'BIS Bureau of Indian Standards Official Catalog'
    },
    {
      id: 'node-req-1',
      type: 'REQUIREMENT',
      label: 'Continuous Self-Draining Fall (1:50)',
      details: 'Bowl base must have continuous gradient to prevent wastewater pooling.',
      source: 'IS 13983 Clause 5.3'
    },
    {
      id: 'node-test-1',
      type: 'TEST',
      label: 'Corrosion & Sound Deadening Test',
      details: '24-hour copper sulphate and salt spray evaluation with acoustic damping inspection.',
      source: 'NABL Recognized Laboratory Scope'
    },
    {
      id: 'node-srv-1',
      type: 'SERVICE',
      label: 'Scheme I - ISI Product Certification',
      details: 'Formal factory audit, surveillance testing, and grant of CM/L licence for affixing ISI mark.',
      source: 'Manak Online (e-BIS Portal)'
    }
  ];

  // Electric Mixer Network Nodes
  const mixerNodes: GraphNode[] = [
    {
      id: 'node-m-prod',
      type: 'PRODUCT',
      label: 'Electric Food Mixer Grinder',
      details: 'Household motorized appliance for chopping, blending, and liquidizing.',
      source: 'Product Prompt'
    },
    {
      id: 'node-m-cat',
      type: 'CATEGORY',
      label: 'Household Electrical Appliances',
      details: 'Single phase AC motor appliances operated by domestic consumers.',
      source: 'ETD 32 Sectional Committee'
    },
    {
      id: 'node-m-char',
      type: 'CHARACTERISTIC',
      label: 'Double Insulation & Thermal Trip',
      details: 'Protection against electric shock (Class II) and motor coil overheating.',
      source: 'Electrical Safety Specifications'
    },
    {
      id: 'node-m-std',
      type: 'STANDARD',
      label: 'IS 302-2-14:2009',
      details: 'Safety of Household and Similar Electrical Appliances: Kitchen Machines.',
      source: 'BIS Catalog & Mandatory Electrical QCO'
    },
    {
      id: 'node-m-req',
      type: 'REQUIREMENT',
      label: 'Spill Overflow & Thermal Stability',
      details: '200ml saline spill test over jar socket without insulation breakdown.',
      source: 'IS 302-2-14 Clause 15.2'
    },
    {
      id: 'node-m-test',
      type: 'TEST',
      label: 'High Voltage Dielectric & Leakage Test',
      details: '1500V dielectric withstand test between live motor windings and accessible parts.',
      source: 'High Voltage Test Bench Protocol'
    },
    {
      id: 'node-m-srv',
      type: 'SERVICE',
      label: 'Scheme I (ISI Mark) Mandatory QCO',
      details: 'Mandatory certification order strictly enforced by Ministry of Heavy Industries.',
      source: 'Manak Online e-BIS'
    }
  ];

  const currentNodes = selectedNetwork === 'SINK' ? sinkNodes : mixerNodes;
  const activeNode = currentNodes.find(n => n.id === activeNodeId) || currentNodes[3];

  const nodeTypeStyles: Record<string, { bg: string; text: string; border: string; badge: string }> = {
    PRODUCT: { bg: 'bg-indigo-50 dark:bg-indigo-950/40', text: 'text-indigo-800 dark:text-indigo-300', border: 'border-indigo-300', badge: 'Input Product' },
    CATEGORY: { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-800 dark:text-blue-300', border: 'border-blue-300', badge: 'Category' },
    CHARACTERISTIC: { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-800 dark:text-amber-300', border: 'border-amber-300', badge: 'DNA Characteristic' },
    STANDARD: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-800 dark:text-emerald-300', border: 'border-emerald-300', badge: 'Indian Standard' },
    REQUIREMENT: { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-800 dark:text-purple-300', border: 'border-purple-300', badge: 'Clause Requirement' },
    TEST: { bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-800 dark:text-rose-300', border: 'border-rose-300', badge: 'Laboratory Test' },
    SERVICE: { bg: 'bg-[#0F2C61] text-white', text: 'text-white', border: 'border-[#0F2C61]', badge: 'BIS Service Pathway' }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          <Network className="w-4 h-4" />
          <span>Inter-Connected Standards Ontologies</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Interactive Compliance Knowledge Graph
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Visualize how raw product ideas link step-by-step to technical characteristics, Indian Standards, testing schedules, and official BIS certification services.
            </p>
          </div>

          {/* Network Switcher */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500">Preset Domain:</span>
            <button
              onClick={() => { setSelectedNetwork('SINK'); setActiveNodeId('node-std-1'); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${selectedNetwork === 'SINK' ? 'bg-[#0F2C61] text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
            >
              Commercial Sink (IS 13983)
            </button>
            <button
              onClick={() => { setSelectedNetwork('MIXER'); setActiveNodeId('node-m-std'); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${selectedNetwork === 'MIXER' ? 'bg-[#0F2C61] text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
            >
              Mixer Grinder (IS 302-2-14)
            </button>
          </div>
        </div>
      </div>

      {/* Visual Sequence Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Graph Chain */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Click any node to inspect its ontology characteristics</span>
            <span>7-Hop Regulatory Pathway</span>
          </div>

          <div className="space-y-2.5">
            {currentNodes.map((node, index) => {
              const style = nodeTypeStyles[node.type];
              const isSelected = activeNodeId === node.id;

              return (
                <div key={node.id} className="relative">
                  {/* Connecting Line */}
                  {index > 0 && (
                    <div className="w-0.5 h-3 bg-slate-300 dark:bg-slate-700 mx-auto -my-1" />
                  )}

                  <div
                    onClick={() => setActiveNodeId(node.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'ring-2 ring-[#0F2C61] dark:ring-blue-400 shadow-md bg-white dark:bg-slate-800 border-transparent'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs flex items-center justify-center shrink-0">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border inline-block mb-1 ${style.bg} ${style.text} ${style.border}`}>
                          {style.badge}
                        </span>
                        <div className="font-bold text-sm text-slate-900 dark:text-white truncate">
                          {node.label}
                        </div>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition ${isSelected ? 'text-[#0F2C61] dark:text-blue-400 translate-x-1' : 'text-slate-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Active Node Detail Inspector */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs sticky top-24">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Ontology Node Inspector
              </h3>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Active Node Type
              </span>
              <span className="text-xs font-bold text-[#0F2C61] dark:text-blue-300">
                {nodeTypeStyles[activeNode.type].badge}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Entity Title:</strong>
                <span className="text-sm font-bold text-[#0F2C61] dark:text-amber-400">{activeNode.label}</span>
              </div>

              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Regulatory Description:</strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeNode.details}
                </p>
              </div>

              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Source Evidence:</strong>
                <div className="p-2 rounded bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-300 font-medium text-[11px]">
                  {activeNode.source}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              Graph traversal operates over verified BIS sectional committees and gazetted Quality Control Orders.
            </div>
          </div>
        </div>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
