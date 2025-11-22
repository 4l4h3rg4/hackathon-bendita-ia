import React from 'react';
import { NavItem } from '../types';
import { NAV_ITEMS } from '../constants';
import { LogOut, Heart } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

// Custom Teletón Logo SVG
// Represents the red/white cross shape with the heart accent on the text
const TeletonLogoSVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Gradients or masks could go here, but flat style is requested */}
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Base Red Cross Shape (Thick Lines) */}
    {/* Horizontal Bar */}
    <line x1="15" y1="50" x2="85" y2="50" stroke="#D50032" strokeWidth="28" strokeLinecap="round" />
    {/* Vertical Bar (Full Red for now) */}
    <line x1="50" y1="15" x2="50" y2="85" stroke="#D50032" strokeWidth="28" strokeLinecap="round" />

    {/* Top Arm White Overlay */}
    {/* We redraw the top vertical segment in white */}
    <line x1="50" y1="15" x2="50" y2="50" stroke="white" strokeWidth="20" strokeLinecap="round" />

    {/* Red Border Effect correction: 
        The previous lines just overlap. To make it look like the logo, 
        we need the white top to be surrounded by red if it's a single shape, 
        but the Teletón logo is usually a split shape. 
        Let's refine the top part. 
    */}

    {/* Alternative: Draw specific paths for cleaner edges */}
    <path d="M 15 50 L 85 50" stroke="#D50032" strokeWidth="28" strokeLinecap="round" />
    <path d="M 50 50 L 50 85" stroke="#D50032" strokeWidth="28" strokeLinecap="round" />
    {/* Top White Arm */}
    <path d="M 50 50 L 50 15" stroke="white" strokeWidth="22" strokeLinecap="round" />

    {/* To ensure the Red background is behind the white top, we draw a slightly larger red line behind the white one first (done above by the vertical bar).
        However, the white needs to not overlap the center red part awkwardly.
        
        Let's use the 'Pie Slice' approach for maximum geometric purity.
    */}
    <rect x="0" y="0" width="100" height="100" fill="transparent" />
  </svg>
);

// Optimized Geometric Teletón Cross
const TeletonCross = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* 1. The Red Foundation (Everything except top inner) */}
    <path
      d="M50 12 C65 12 78 20 85 35 L85 65 C78 80 65 88 50 88 C35 88 22 80 15 65 L15 35 C22 20 35 12 50 12 Z"
      fill="#D50032"
    />
    {/* 2. The White Top Sector */}
    <path
      d="M50 50 L28 28 C35 18 42 16 50 16 C58 16 65 18 72 28 L50 50Z"
      fill="white"
    />
    {/* 3. Refined White Top (Rounded) */}
    <path
      d="M50 50 L25 25 Q50 5 75 25 L50 50 Z"
      fill="white"
    />
  </svg>
);

// Final Polish Logo
const FinalTeletonLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Red Body */}
    <path d="M50 5 C75 5 95 25 95 50 C95 75 75 95 50 95 C25 95 5 75 5 50 C5 25 25 5 50 5 Z" fill="white" opacity="0" /> {/* Bounding Box */}

    <path
      d="M20 50 
             C20 35 35 20 50 20 
             C65 20 80 35 80 50 
             C80 65 65 80 50 80 
             C35 80 20 65 20 50 Z"
      fill="none"
    /> {/* Inner circle Ref */}

    {/* Cross Shape */}
    {/* Horizontal */}
    <rect x="10" y="38" width="80" height="24" rx="12" fill="#D50032" />
    {/* Vertical Bottom */}
    <rect x="38" y="50" width="24" height="40" rx="12" fill="#D50032" />
    {/* Vertical Top (White with Red Border simulated by drawing larger red behind) */}
    <rect x="36" y="8" width="28" height="44" rx="14" fill="#D50032" />
    <rect x="41" y="13" width="18" height="34" rx="9" fill="white" />

    {/* Center Patch to join red areas */}
    <rect x="38" y="38" width="24" height="24" fill="#D50032" />
  </svg>
)

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen = false, onClose }) => {
  return (
    <>
      {/* Mobile Close Button (inside sidebar for easy access) */}
      {/* We rely on the overlay in App.tsx to close, but having an X inside is good UX too */}

      <aside className={`
            fixed inset-y-0 left-0 z-30 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out
            w-64 md:w-20 lg:w-64
            ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
        `}>
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-4 lg:px-6 border-b border-gray-100">
          <div className="flex items-center justify-center lg:justify-start w-full">
            <div className="w-10 h-10 flex items-center justify-center shrink-0 transform hover:scale-105 transition-transform duration-300">
              <FinalTeletonLogo />
            </div>
            <div className="block md:hidden lg:block ml-3">
              <h1 className="font-bold text-[#333333] text-2xl tracking-tighter flex items-center relative">
                Telet
                <span className="relative">
                  o
                  <Heart className="w-2.5 h-2.5 text-teleton-red absolute -top-0.5 left-1/2 -translate-x-1/2 fill-current" />
                </span>
                n
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold -mt-1">SADI AI System</p>
            </div>
          </div>
          {/* Mobile Close X */}
          <button onClick={onClose} className="md:hidden p-1 text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item: NavItem) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                    w-full flex items-center justify-start md:justify-center lg:justify-start px-3 lg:px-4 py-3 rounded-xl transition-all duration-200 group relative
                    ${isActive
                    ? 'bg-red-50 text-teleton-red font-medium'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teleton-red rounded-r-full" />
                )}
                <Icon className={`w-6 h-6 lg:w-5 lg:h-5 ${isActive ? 'text-teleton-red' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className="block md:hidden lg:block ml-3">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Section (Bottom) */}
        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center justify-start md:justify-center lg:justify-start p-2 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="block md:hidden lg:block ml-3 text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};