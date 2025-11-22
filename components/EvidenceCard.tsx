import React from 'react';
import { Evidence } from '../types';
import { BookOpen, Calendar, Star } from 'lucide-react';

interface EvidenceCardProps {
  data: Evidence;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
      {/* Top Decorative Line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-tech-blue" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
          <div className="flex gap-2 flex-wrap">
            {/* Badge 1: Evidence Level */}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-tech-blue border border-blue-100">
              <BookOpen className="w-3 h-3 mr-1" />
              {data.type}
            </span>
            {/* Badge 2: Relevance */}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${data.relevance === 'Alta'
                ? 'bg-green-50 text-emerald-700 border-emerald-100'
                : 'bg-gray-50 text-gray-600 border-gray-200'
              }`}>
              <Star className="w-3 h-3 mr-1" />
              Relevancia: {data.relevance}
            </span>
          </div>
          <span className="text-gray-400 text-xs flex items-center shrink-0">
            <Calendar className="w-3 h-3 mr-1" />
            {data.year}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-tech-blue transition-colors">
            {data.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {data.authors.join(", ")} • <span className="italic">{data.journal}</span>
          </p>
        </div>

        <div className="relative">
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {data.abstract}
          </p>
          {/* Fade out effect for text */}
          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="pt-2">
          <button className="text-sm font-medium text-tech-blue hover:text-blue-700 transition-colors flex items-center">
            Leer análisis completo
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};