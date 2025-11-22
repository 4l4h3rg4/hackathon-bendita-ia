import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface AuthProps {
    onLogin: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock authentication - accept anything as long as fields are filled
        if (email && password) {
            onLogin();
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                            <Heart className="w-8 h-8 text-teleton-red fill-current" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {isLogin ? 'Bienvenido a SADI' : 'Crear Cuenta'}
                        </h2>
                        <p className="text-gray-500 text-center mt-2">
                            {isLogin
                                ? 'Ingresa tus credenciales para acceder al sistema.'
                                : 'Únete a la plataforma de asistencia clínica.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teleton-red focus:border-transparent outline-none transition-all"
                                    placeholder="Dr. Juan Pérez"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teleton-red focus:border-transparent outline-none transition-all"
                                placeholder="nombre@teleton.cl"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teleton-red focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teleton-red text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                        >
                            {isLogin ? 'Ingresar' : 'Registrarse'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm text-gray-600 hover:text-teleton-red font-medium transition-colors"
                        >
                            {isLogin
                                ? '¿No tienes cuenta? Regístrate aquí'
                                : '¿Ya tienes cuenta? Inicia sesión'}
                        </button>
                    </div>
                </div>

                {/* Footer decoration */}
                <div className="h-2 bg-gradient-to-r from-teleton-red to-purple-600"></div>
            </div>

            <p className="mt-8 text-center text-gray-400 text-sm">
                © 2025 Teletón - Sistema de Asistencia de Datos Inteligente
            </p>
        </div>
    );
};
