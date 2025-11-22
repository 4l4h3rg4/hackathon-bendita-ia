import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Auth } from './components/Auth';
import { EvidenceCard } from './components/EvidenceCard';
import { PatientCard } from './components/PatientCard';
import { AnonymizationPanel } from './components/AnonymizationPanel';
import { ChatSection } from './components/ChatSection';
import { MOCK_PATIENT } from './constants';
import { Sparkles, ArrowRight } from 'lucide-react';

import { api } from './services/api';
import { Evidence, DataRow } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('chat');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [evidenceData, setEvidenceData] = useState<Evidence | null>(null);
  const [anonymizationData, setAnonymizationData] = useState<DataRow[]>([]);

  React.useEffect(() => {
    if (isAuthenticated) {
      api.getEvidence().then(setEvidenceData).catch(console.error);
      api.getAnonymizationData().then(setAnonymizationData).catch(console.error);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  // Main Content Renderer based on View State
  const renderContent = () => {
    switch (currentView) {
      case 'export':
        return (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Exportar Datos para Investigación</h1>
              <p className="text-gray-500">Gestión de datasets anonimizados para comités de ética y estudios externos.</p>
            </div>
            <AnonymizationPanel data={anonymizationData} />
          </div>
        );

      case 'evidence':
        return (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Explorador de Evidencia Clínica</h1>
              <p className="text-gray-500">Base de conocimiento indexada por IA.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {evidenceData && <EvidenceCard data={evidenceData} />}
              {/* Placeholder for second card if needed, or fetch list */}
            </div>
          </div>
        );

      case 'doctor-chat':
        return (
          <div className="max-w-6xl mx-auto h-full">
            <ChatSection />
          </div>
        );

      default: // 'chat' / Home
        return (
          <div className="max-w-4xl mx-auto flex flex-col h-full">

            {/* Spacer for visual balance */}
            <div className="flex-none h-12 md:h-24"></div>

            {/* Hero Section */}
            <div className="text-center mb-10 space-y-4 animate-fade-in-up">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                ¿En qué puedo ayudarte hoy, <span className="text-teleton-red">Dr. Castillo</span>?
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                SADI puede analizar historias clínicas, buscar evidencia reciente o preparar datasets anonimizados.
              </p>
            </div>

            {/* Omnibox */}
            <div className="relative group max-w-3xl mx-auto w-full mb-16 z-10">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-red-50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex items-center p-2">
                <div className="pl-4 text-gray-400">
                  <Sparkles className="w-6 h-6 text-tech-blue" />
                </div>
                <input
                  type="text"
                  className="w-full p-4 text-lg text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
                  placeholder="Pregunta sobre un paciente o busca evidencia clínica..."
                />
                <button className="p-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors shadow-md">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              {/* Quick Prompts */}
              <div className="flex flex-wrap justify-center gap-3 mt-4 text-sm text-gray-500">
                <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-tech-blue hover:text-tech-blue transition-colors">
                  "Resumen paciente ID: 1234"
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-tech-blue hover:text-tech-blue transition-colors">
                  "Evidencia sobre Lokomat en PC"
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-tech-blue hover:text-tech-blue transition-colors">
                  "Exportar data kinesiología 2023"
                </button>
              </div>
            </div>


          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setIsMobileMenuOpen(false);
        }}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLogout={() => setIsAuthenticated(false)}
      />

      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Area */}
      <main className="flex-1 flex flex-col ml-0 md:ml-20 lg:ml-64 relative transition-all duration-300">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-6 ml-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-700">SADI Online</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
              <img src="https://picsum.photos/200" alt="Avatar" className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
        </header>

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 pb-20">
          {renderContent()}
        </div>
      </main>

      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-fade-in {
            animation: fade-in-up 0.4s ease-out forwards;
        }
        .animate-fade-in-delayed {
            animation: fade-in-up 0.6s ease-out 0.3s forwards; /* Delay added */
            opacity: 0; /* Start hidden */
        }
      `}</style>
    </div>
  );
};

export default App;