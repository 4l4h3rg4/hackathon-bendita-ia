import React, { useState } from 'react';
import { DataRow } from '../types';
import { Download, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

interface AnonymizationPanelProps {
  data: DataRow[];
}

export const AnonymizationPanel: React.FC<AnonymizationPanelProps> = ({ data }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDownloaded(true);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-tech-blue" />
            Exportación Segura de Datos
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Visualiza cómo se aplicará la anonimización antes de exportar (Normativa Ley 19.628).
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-8">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium text-red-800 bg-red-50/50 w-1/2 border-r border-gray-200">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Datos Originales (Sensible)
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 font-medium text-green-800 bg-green-50/50 w-1/2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Vista Previa Anonimizada
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.id} className="border-b border-gray-100 last:border-none hover:bg-gray-50/50 transition-colors">
                  {/* Original Data Column */}
                  <td className="px-6 py-4 border-r border-gray-100 font-mono text-xs text-gray-600">
                    <div className="space-y-1">
                      <p><span className="font-bold">Nombre:</span> {row.original.nombre}</p>
                      <p><span className="font-bold">RUT:</span> {row.original.rut}</p>
                      <p><span className="font-bold">Dx:</span> {row.original.diagnostico}</p>
                      <p className="text-gray-400"><span className="font-bold">Dir:</span> {row.original.direccion}</p>
                    </div>
                  </td>
                  
                  {/* Anonymized Data Column */}
                  <td className="px-6 py-4 font-mono text-xs text-gray-600 bg-green-50/10">
                    <div className="space-y-1">
                      <p><span className="font-bold text-green-700">Nombre:</span> {row.anonymized.nombre}</p>
                      <p><span className="font-bold text-green-700">RUT:</span> {row.anonymized.rut}</p>
                      <p><span className="font-bold text-green-700">CIE-10:</span> {row.anonymized.diagnostico}</p>
                      <p className="text-gray-400"><span className="font-bold text-green-700">Geo:</span> {row.anonymized.direccion}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <div className="max-w-md text-center space-y-4">
                <h3 className="font-semibold text-gray-900">Listo para exportar</h3>
                <p className="text-sm text-gray-500">
                    El dataset resultante contiene 150 registros anonimizados listos para análisis estadístico o entrenamiento de modelos.
                </p>
                <button 
                    onClick={handleDownload}
                    disabled={isProcessing || isDownloaded}
                    className={`
                        group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white 
                        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teleton-red
                        ${isDownloaded ? 'bg-green-600 hover:bg-green-700' : 'bg-teleton-red hover:bg-teleton-redHover shadow-lg shadow-red-200'}
                        ${isProcessing ? 'opacity-75 cursor-wait' : ''}
                    `}
                >
                    {isProcessing ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Encriptando y Comprimiendo...
                        </span>
                    ) : isDownloaded ? (
                         <span className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5" />
                            Descarga Completada
                         </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            Descargar Dataset Seguro
                        </span>
                    )}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};