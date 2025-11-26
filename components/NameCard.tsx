import React from 'react';
import { NameSuggestion } from '../types';
import { Star, Sparkles, Info } from 'lucide-react';

interface NameCardProps {
  data: NameSuggestion;
  index: number;
}

export const NameCard: React.FC<NameCardProps> = ({ data, index }) => {
  return (
    <div 
      className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white transform hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Sparkles size={64} className="text-primary" />
      </div>

      <div className="flex justify-between items-start mb-4">
        <div className="bg-gradient-to-br from-primary to-secondary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">
          {index + 1}
        </div>
        <div className="flex items-center space-x-1 text-yellow-500 font-medium bg-yellow-50 px-2 py-1 rounded-lg">
          <Star size={16} fill="currentColor" />
          <span>{data.score}%</span>
        </div>
      </div>

      <h3 className="text-4xl font-bold text-slate-800 mb-2 tracking-tight group-hover:text-primary transition-colors">
        {data.name}
      </h3>
      
      <p className="text-lg text-slate-600 mb-4 italic border-l-4 border-secondary pl-3">
        "{data.meaning}"
      </p>

      <div className="space-y-3 text-sm">
        <div className="flex items-start space-x-2 text-slate-600">
          <Info size={16} className="mt-0.5 text-primary shrink-0" />
          <span><span className="font-semibold text-slate-700">ที่มา:</span> {data.origin}</span>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
          <div className="flex items-start space-x-2 text-green-800">
            <Sparkles size={16} className="mt-0.5 shrink-0" />
            <span><span className="font-semibold">สิริมงคล:</span> {data.auspiciousness}</span>
          </div>
        </div>
      </div>
    </div>
  );
};