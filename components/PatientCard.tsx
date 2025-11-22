import React from 'react';
import { Patient } from '../types';
import { AlertTriangle, User, Clock, Activity } from 'lucide-react';

interface PatientCardProps {
  data: Patient;
}

export const PatientCard: React.FC<PatientCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              {data.name}
              <span className="text-xs font-normal text-gray-400 px-2 py-0.5 bg-gray-100 rounded-md">
                ID: {data.id}
              </span>
            </h3>
            <p className="text-sm text-gray-500">{data.diagnosis}</p>
          </div>
        </div>
        
        {/* Adherence Gauge (Visual approximation) */}
        <div className="text-right">
          <div className="text-xs text-gray-400 mb-1">Adherencia</div>
          <div className={`text-lg font-bold ${data.adherenceRate < 50 ? 'text-teleton-red' : 'text-green-600'}`}>
            {data.adherenceRate}%
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {data.alerts.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-teleton-red shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Atención Requerida</p>
            <p className="text-xs text-gray-600 mt-0.5">{data.alerts[0]}</p>
          </div>
        </div>
      )}

      {/* Simple Vertical Timeline */}
      <div className="relative pl-4 border-l-2 border-gray-100 space-y-4">
        <div className="relative">
          <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-tech-blue border-2 border-white ring-1 ring-gray-100"></div>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Última atención
          </p>
          <p className="text-sm font-medium text-gray-700">{data.lastVisit}</p>
        </div>
        <div className="relative">
          <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white ring-1 ring-gray-100"></div>
          <p className="text-xs text-gray-400">Próxima sesión</p>
          <p className="text-sm text-gray-500">Pendiente de agendar</p>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-50 flex justify-end">
        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          Ver Historia Clínica
        </button>
        <button className="ml-2 px-4 py-2 text-sm font-medium text-white bg-teleton-red hover:bg-teleton-redHover rounded-lg transition-colors shadow-sm shadow-red-200">
          Contactar Familia
        </button>
      </div>
    </div>
  );
};