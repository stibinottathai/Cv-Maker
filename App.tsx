import React, { useState } from 'react';
import { ResumeData, TemplateType } from './types';
import { INITIAL_RESUME_DATA, TEMPLATE_OPTIONS } from './constants';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { LayoutTemplate, PenTool, Crown, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [template, setTemplate] = useState<TemplateType>(TemplateType.MODERN);
  const [activeSection, setActiveSection] = useState<string>('personal');

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row bg-[#0f1115]">
      
      {/* Sidebar / Editor - Hidden on Print */}
      <div className="w-full md:w-[450px] h-full border-r border-slate-800 bg-[#1a1f2c] no-print z-20 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <PenTool size={16} />
                </div>
                ResumeAI
            </div>
            <div className="text-xs font-medium px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full flex items-center gap-1 shadow-lg shadow-orange-500/20">
                <Crown size={10} fill="currentColor" /> Premium
            </div>
        </div>
        
        {/* Template Selector */}
        <div className="p-5 border-b border-slate-800">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <LayoutTemplate className="w-3 h-3" /> Choose Template
          </label>
          <div className="grid grid-cols-2 gap-3 max-h-[160px] overflow-y-auto custom-scrollbar pr-1">
            {TEMPLATE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setTemplate(opt.id)}
                className={`
                  relative p-3 rounded-xl border text-sm font-medium transition-all text-left flex flex-col justify-between group overflow-hidden min-h-[60px]
                  ${template === opt.id 
                    ? 'border-blue-500 bg-blue-500/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                    : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500 hover:bg-slate-800 hover:text-white'}
                `}
              >
                <div className="flex justify-between w-full relative z-10">
                  <span>{opt.name}</span>
                  {opt.premium && <Crown size={12} className={template === opt.id ? 'text-amber-400' : 'text-slate-600 group-hover:text-amber-500'} />}
                </div>
                
                {/* ATS Badge */}
                {opt.ats && (
                   <div className="flex items-center gap-1 mt-1 relative z-10">
                      <CheckCircle2 size={10} className="text-green-500" />
                      <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">ATS Friendly</span>
                   </div>
                )}

                {/* Visual indicator for active state */}
                {template === opt.id && <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Editor Form */}
        <div className="flex-1 overflow-hidden relative">
          <Editor 
            data={data} 
            onChange={setData} 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
      </div>

      {/* Preview Area - Takes full width on print */}
      <div className="flex-1 h-full relative overflow-hidden bg-slate-950">
        <Preview data={data} templateType={template} />
      </div>

      {/* Small Screen Overlay Warning */}
      <div className="md:hidden fixed inset-0 bg-[#0f1115] z-50 flex items-center justify-center p-8 text-center text-white no-print">
        <div>
          <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
             <PenTool className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold mb-3 tracking-tight">Desktop Experience</h2>
          <p className="text-slate-400 leading-relaxed mb-6">For the best professional resume building experience, please utilize a desktop or laptop device.</p>
          <button 
            onClick={(e) => e.currentTarget.parentElement?.parentElement?.remove()}
            className="px-6 py-2.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            I understand, continue
          </button>
        </div>
      </div>

    </div>
  );
};

export default App;