import React from 'react';
import { ViewMode } from '../types';
import { Button } from './ui';

interface HeaderProps {
  mode: ViewMode;
  onModeToggle: () => void;
  onToggleAIAgent: () => void;
}

export function Header({ mode, onModeToggle, onToggleAIAgent }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-slate-800">Panel General Ecosistema Faros</h1>
        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded border border-blue-100 uppercase tracking-wide">
          VISTA {mode}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 border-r border-slate-200 pr-4 mr-2">
          <button onClick={onModeToggle} className="hover:text-slate-800 underline decoration-slate-300 underline-offset-2">
            Cambiar a {mode === 'mandante' ? 'Proveedor' : 'Mandante'}
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 border-r border-slate-200 pr-4 mr-2">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span> Integraciones activas: SAP S/4HANA
        </div>
        <button onClick={onToggleAIAgent} className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded text-xs font-bold mr-2">
          ✨ Faros AI
        </button>
      </div>
    </header>
  );
}
