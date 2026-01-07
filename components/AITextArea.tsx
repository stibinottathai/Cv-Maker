import React, { useState } from 'react';
import { improveText } from '../services/gemini';
import { Wand2, Loader2 } from 'lucide-react';

interface AITextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: 'summary' | 'experience';
  placeholder?: string;
  rows?: number;
}

export const AITextArea: React.FC<AITextAreaProps> = ({ 
  label, 
  value, 
  onChange, 
  type, 
  placeholder, 
  rows = 4 
}) => {
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    if (!value.trim()) return;
    setLoading(true);
    try {
      const improved = await improveText(value, type);
      onChange(improved);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 group">
      <div className="flex justify-between items-center mb-1.5 ml-1">
        <label className="block text-xs font-medium text-slate-400 group-focus-within:text-blue-400 transition-colors">{label}</label>
        <button
          onClick={handleEnhance}
          disabled={loading || !value.trim()}
          className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300 disabled:opacity-30 disabled:hover:text-blue-400 transition-colors font-medium bg-blue-500/10 px-2 py-0.5 rounded-full"
          type="button"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
          {loading ? 'Thinking...' : 'AI Enhance'}
        </button>
      </div>
      <div className="relative">
        <textarea
          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-slate-600"
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};