import React, { useState } from 'react';
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Mic, MessageSquare, QrCode, X, ArrowLeft } from 'lucide-react';

interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    isMe: boolean;
}

interface Contact {
    id: string;
    name: string;
    specialty: string;
    avatar: string;
    status: 'online' | 'offline' | 'busy';
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

const MOCK_CONTACTS: Contact[] = [
    {
        id: '1',
        name: 'Dra. Ana María Polo',
        specialty: 'Neurología Infantil',
        avatar: 'https://i.pravatar.cc/150?u=1',
        status: 'online',
        lastMessage: '¿Pudiste revisar el caso de Martín?',
        lastMessageTime: '10:30 AM',
        unreadCount: 2,
    },
    {
        id: '2',
        name: 'Dr. Sebastián Silva',
        specialty: 'Kinesiología',
        avatar: 'https://i.pravatar.cc/150?u=2',
        status: 'busy',
        lastMessage: 'El paciente respondió bien a la terapia.',
        lastMessageTime: 'Ayer',
        unreadCount: 0,
    },
    {
        id: '3',
        name: 'Dra. Valentina Rojas',
        specialty: 'Fisiatría',
        avatar: 'https://i.pravatar.cc/150?u=3',
        status: 'offline',
        lastMessage: 'Te envío los informes en un momento.',
        lastMessageTime: 'Lun',
        unreadCount: 0,
    },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
    '1': [
        { id: 'm1', senderId: '1', text: 'Hola Dr. Castillo, ¿cómo estás?', timestamp: '10:00 AM', isMe: false },
        { id: 'm2', senderId: 'me', text: 'Hola Dra. Polo, todo bien por acá. ¿Qué tal?', timestamp: '10:05 AM', isMe: true },
        { id: 'm3', senderId: '1', text: 'Quería consultarte sobre el paciente Martín Pérez. He notado una leve mejoría en su marcha.', timestamp: '10:15 AM', isMe: false },
        { id: 'm4', senderId: '1', text: '¿Pudiste revisar el caso de Martín?', timestamp: '10:30 AM', isMe: false },
    ],
    '2': [
        { id: 'm1', senderId: '2', text: 'Hola, te cuento que la sesión de hoy fue excelente.', timestamp: 'Ayer', isMe: false },
        { id: 'm2', senderId: '2', text: 'El paciente respondió bien a la terapia.', timestamp: 'Ayer', isMe: false },
    ],
    '3': [
        { id: 'm1', senderId: 'me', text: 'Hola Valentina, necesito los informes de kine.', timestamp: 'Lun', isMe: true },
        { id: 'm2', senderId: '3', text: 'Te envío los informes en un momento.', timestamp: 'Lun', isMe: false },
    ]
};

export const ChatSection: React.FC = () => {
    const [selectedContactId, setSelectedContactId] = useState<string | null>(MOCK_CONTACTS[0].id);
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);
    const [showQr, setShowQr] = useState(false);

    const selectedContact = MOCK_CONTACTS.find(c => c.id === selectedContactId);
    const currentMessages = selectedContactId ? (messages[selectedContactId] || []) : [];

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!messageInput.trim() || !selectedContactId) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            senderId: 'me',
            text: messageInput,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
        };

        setMessages(prev => ({
            ...prev,
            [selectedContactId]: [...(prev[selectedContactId] || []), newMessage]
        }));
        setMessageInput('');
    };

    return (
        <div className="flex h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
            {/* Sidebar de Contactos */}
            <div className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${selectedContactId ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Mensajes</h2>
                        <button
                            onClick={() => setShowQr(true)}
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Mi Código QR"
                        >
                            <QrCode className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar doctor o especialista..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teleton-red/20 focus:border-teleton-red transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {MOCK_CONTACTS.map(contact => (
                        <button
                            key={contact.id}
                            onClick={() => setSelectedContactId(contact.id)}
                            className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50 ${selectedContactId === contact.id ? 'bg-red-50/50 hover:bg-red-50/80' : ''}`}
                        >
                            <div className="relative">
                                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${contact.status === 'online' ? 'bg-green-500' :
                                    contact.status === 'busy' ? 'bg-red-500' : 'bg-gray-400'
                                    }`} />
                            </div>
                            <div className="flex-1 text-left min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{contact.lastMessageTime}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                            </div>
                            {contact.unreadCount > 0 && (
                                <div className="flex flex-col justify-center h-12">
                                    <span className="bg-teleton-red text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                        {contact.unreadCount}
                                    </span>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Ventana de Chat */}
            {selectedContact ? (
                <div className="flex-1 flex flex-col bg-gray-50/50">
                    {/* Chat Header */}
                    <div className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSelectedContactId(null)}
                                className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <h3 className="font-bold text-gray-900">{selectedContact.name}</h3>
                                <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                    {selectedContact.specialty}
                                </span>
                            </div>
                        </div>
                        {/* Botones de llamada eliminados */}
                    </div>

                    {/* Mensajes */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {currentMessages.map((msg, index) => {
                            const isLast = index === currentMessages.length - 1;
                            return (
                                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] ${msg.isMe ? 'order-2' : 'order-1'}`}>
                                        <div className={`
                      p-4 rounded-2xl shadow-sm text-sm leading-relaxed
                      ${msg.isMe
                                                ? 'bg-teleton-red text-white rounded-tr-none'
                                                : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'}
                    `}>
                                            {msg.text}
                                        </div>
                                        <div className={`text-xs text-gray-400 mt-1 ${msg.isMe ? 'text-right' : 'text-left'}`}>
                                            {msg.timestamp}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-200 shrink-0">
                        <form onSubmit={handleSendMessage} className="flex items-end gap-2 max-w-4xl mx-auto">
                            <button type="button" className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl flex items-center p-1 focus-within:ring-2 focus-within:ring-teleton-red/20 focus-within:border-teleton-red transition-all">
                                <input
                                    type="text"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    placeholder="Escribe un mensaje..."
                                    className="w-full bg-transparent border-none focus:ring-0 px-3 py-2 text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <button type="submit" className="p-3 bg-teleton-red text-white rounded-xl hover:bg-red-700 transition-colors shadow-md">
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div >
            ) : (
                <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gray-50 text-gray-400">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <MessageSquare className="w-10 h-10 text-gray-300" />
                    </div>
                    <p className="text-lg font-medium text-gray-500">Selecciona un chat para comenzar</p>
                </div>
            )}

            {/* Modal QR */}
            {showQr && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
                        <button
                            onClick={() => setShowQr(false)}
                            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="text-center space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-gray-900">Mi Código QR</h3>
                                <p className="text-sm text-gray-500">Comparte este código con otros doctores para iniciar una conversación.</p>
                            </div>

                            <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-200 inline-block">
                                <img
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SADI-DOCTOR-ID-12345"
                                    alt="Código QR"
                                    className="w-48 h-48"
                                />
                            </div>

                            <div className="flex items-center justify-center gap-2 text-sm text-teleton-red font-medium bg-red-50 py-2 px-4 rounded-lg">
                                <QrCode className="w-4 h-4" />
                                <span>Dr. Castillo</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};
