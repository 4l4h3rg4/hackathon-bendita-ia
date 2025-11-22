import React, { useState, useEffect, useRef } from 'react';
import { Send, FileText, Bot, User, Sparkles, X, Check, BrainCircuit, Download, AlertCircle } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    hasAction?: boolean;
}

interface AIChatInterfaceProps {
    initialMessage?: string;
}

export const AIChatInterface: React.FC<AIChatInterfaceProps> = ({ initialMessage }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showPdfPreview, setShowPdfPreview] = useState(false);
    const [showConsentModal, setShowConsentModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hasInitialized, setHasInitialized] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        // Prevent double execution in React StrictMode
        if (initialMessage && !hasInitialized) {
            setHasInitialized(true);
            addMessage(initialMessage, 'user');
            getAIResponse(initialMessage);
        }
    }, []);

    const addMessage = (text: string, sender: 'user' | 'ai', hasAction = false) => {
        const newMessage: Message = {
            id: Date.now().toString() + Math.random(),
            text,
            sender,
            timestamp: new Date(),
            hasAction,
        };
        setMessages((prev) => [...prev, newMessage]);
    };

    const getAIResponse = async (userMessage: string) => {
        setIsTyping(true);
        try {
            const response = await fetch('http://localhost:8000/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    context: 'Contexto médico de Teletón Chile'
                }),
            });

            const data = await response.json();
            setIsTyping(false);

            // Check if response mentions generating a report
            const hasReportAction = data.response.toLowerCase().includes('pdf') ||
                data.response.toLowerCase().includes('reporte');

            addMessage(data.response, 'ai', hasReportAction);
        } catch (error) {
            setIsTyping(false);
            addMessage(
                'Lo siento, estoy experimentando problemas de conexión. Por favor, intente nuevamente.',
                'ai'
            );
        }
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isTyping) return;

        const message = inputValue;
        addMessage(message, 'user');
        setInputValue('');
        getAIResponse(message);
    };

    const handleGeneratePDF = () => {
        setShowPdfPreview(true);
    };

    const handleInitiateDownload = () => {
        setShowConsentModal(true);
    };

    const handleConfirmDownload = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setShowConsentModal(false);
            setShowPdfPreview(false);
            addMessage('¡Descarga iniciada! He guardado este reporte y he aprendido de sus correcciones para futuras referencias.', 'ai');
        }, 2000);
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in relative">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3 shadow-sm z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teleton-red to-red-600 flex items-center justify-center text-white shadow-md">
                    <Sparkles className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="font-bold text-gray-900">Asistente IA SADI</h2>
                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        En línea
                    </p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-gray-200' : 'bg-teleton-red/10'
                                }`}>
                                {msg.sender === 'user' ? (
                                    <User className="w-5 h-5 text-gray-500" />
                                ) : (
                                    <Bot className="w-5 h-5 text-teleton-red" />
                                )}
                            </div>

                            {/* Message Bubble */}
                            <div className="flex flex-col gap-2">
                                <div
                                    className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-gray-900 text-white rounded-tr-none'
                                        : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                                        }`}
                                >
                                    {msg.text}
                                </div>

                                {/* Action Button (PDF) */}
                                {msg.hasAction && (
                                    <button
                                        onClick={handleGeneratePDF}
                                        className="self-start flex items-center gap-2 px-4 py-2 bg-white border border-red-100 text-teleton-red rounded-xl hover:bg-red-50 transition-all shadow-sm text-sm font-medium group"
                                    >
                                        <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        Generar Reporte PDF
                                    </button>
                                )}

                                <span className={`text-xs text-gray-400 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                            <div className="w-8 h-8 rounded-full bg-teleton-red/10 flex items-center justify-center shrink-0">
                                <Bot className="w-5 h-5 text-teleton-red" />
                            </div>
                            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-4xl mx-auto">
                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl flex items-center p-1 focus-within:ring-2 focus-within:ring-teleton-red/20 focus-within:border-teleton-red transition-all">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                            className="w-full bg-transparent border-none focus:ring-0 px-3 py-2 text-gray-700 placeholder-gray-400"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className="p-3 bg-teleton-red text-white rounded-xl hover:bg-red-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>

            {/* PDF Preview Modal */}
            {showPdfPreview && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in">
                    <div className="bg-white w-full h-full flex flex-col overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 shrink-0">
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-teleton-red" />
                                <h3 className="font-bold text-gray-900">Vista Previa del Reporte</h3>
                            </div>
                            <button
                                onClick={() => setShowPdfPreview(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* PDF Content (Mock) */}
                        <div className="flex-1 overflow-y-auto p-8 bg-gray-100 flex justify-center">
                            <div className="bg-white shadow-2xl min-h-[1100px] w-full max-w-4xl p-16 text-gray-800 text-base">
                                <div className="flex justify-between items-start mb-8 border-b border-gray-200 pb-6">
                                    <div>
                                        <h1 className="text-2xl font-bold text-teleton-red mb-1">Reporte Clínico</h1>
                                        <p className="text-gray-500">Generado por SADI AI</p>
                                    </div>
                                    <div className="text-right text-gray-500">
                                        <p>Fecha: {new Date().toLocaleDateString()}</p>
                                        <p>ID Paciente: 12345</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <section>
                                        <h4 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-wider">Resumen del Caso</h4>
                                        <p className="leading-relaxed text-gray-600">
                                            El paciente presenta una evolución favorable en su terapia de rehabilitación motora.
                                            Se observa un incremento del 15% en el rango de movimiento de la extremidad inferior derecha
                                            en comparación con la última evaluación.
                                        </p>
                                    </section>

                                    <section>
                                        <h4 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-wider">Análisis de Datos</h4>
                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                            <ul className="list-disc list-inside space-y-1 text-blue-800">
                                                <li>Sesiones completadas: 12/15</li>
                                                <li>Adherencia: 92%</li>
                                                <li>Índice de fatiga: Bajo</li>
                                            </ul>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-wider">Recomendaciones IA</h4>
                                        <p className="leading-relaxed text-gray-600">
                                            Se sugiere mantener la intensidad actual de los ejercicios y considerar la incorporación
                                            de terapia asistida por videojuegos para mejorar la motivación.
                                        </p>
                                    </section>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer / Actions */}
                        <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-end gap-4 shrink-0">
                            <button
                                onClick={handleInitiateDownload}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teleton-red to-red-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all font-bold"
                            >
                                <Download className="w-5 h-5" />
                                Descargar PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Consent Modal */}
            {showConsentModal && (
                <div className="absolute inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teleton-red to-red-600"></div>

                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-2">
                                <BrainCircuit className="w-8 h-8 text-teleton-red" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900">Autorización de Aprendizaje</h3>

                            <p className="text-gray-600 leading-relaxed">
                                Al descargar este reporte, usted autoriza a <span className="font-bold text-gray-900">SADI</span> a procesar y aprender de estos datos anonimizados para mejorar la precisión de futuras recomendaciones clínicas.
                            </p>

                            <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg text-left text-sm text-blue-800 w-full">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <p>Los datos personales del paciente han sido eliminados automáticamente para proteger su privacidad.</p>
                            </div>

                            <div className="flex gap-3 w-full mt-4">
                                <button
                                    onClick={() => setShowConsentModal(false)}
                                    className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleConfirmDownload}
                                    disabled={isSaving}
                                    className="flex-1 py-3 px-4 bg-teleton-red hover:bg-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    {isSaving ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            Procesando...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Aceptar y Descargar
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
