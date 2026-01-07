import React, { useRef } from 'react';
import { ResumeData, TemplateType } from '../types';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { ATSTemplate } from './templates/ATSTemplate';
import { AcademicTemplate } from './templates/AcademicTemplate';
import { Printer } from 'lucide-react';

interface PreviewProps {
  data: ResumeData;
  templateType: TemplateType;
}

export const Preview: React.FC<PreviewProps> = ({ data, templateType }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    switch (templateType) {
      case TemplateType.MODERN:
        return <ModernTemplate data={data} />;
      case TemplateType.CLASSIC:
        return <ClassicTemplate data={data} />;
      case TemplateType.MINIMAL:
        return <MinimalTemplate data={data} />;
      case TemplateType.EXECUTIVE:
        return <ExecutiveTemplate data={data} />;
      case TemplateType.CREATIVE:
        return <CreativeTemplate data={data} />;
      case TemplateType.ATS_STANDARD:
        return <ATSTemplate data={data} />;
      case TemplateType.ACADEMIC:
        return <AcademicTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-100">
      {/* Toolbar */}
      <div className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 no-print z-10 sticky top-0">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <h2 className="font-semibold text-slate-700 text-sm">Live Preview</h2>
        </div>
        <div className="flex gap-3">
          <button 
             onClick={handlePrint}
             className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 text-sm font-medium transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Printer className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-8 flex justify-center bg-slate-200/50 custom-scrollbar relative">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div 
          className="print-only bg-white shadow-2xl transition-all duration-300 ease-in-out relative z-10"
          style={{ 
            width: '210mm', 
            minHeight: '297mm', 
            height: 'max-content',
            transformOrigin: 'top center'
          }}
          ref={printRef}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};