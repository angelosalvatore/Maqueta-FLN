import React, { useState } from 'react';
import { ViewMode } from '../types';
import { X } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  mode: ViewMode;
}

const MENU_GROUPS = [
  {
    title: 'Módulos Principales',
    items: [
      { id: 'dashboard', label: 'Panel General', roles: ['mandante', 'proveedor'] },
      { id: 'licitaciones', label: 'Licitaciones', roles: ['mandante', 'proveedor'] },
      { id: 'contratos', label: 'Adm. de Contratos', roles: ['mandante', 'proveedor'] },
      { id: 'edp', label: 'EDP Digital', roles: ['mandante', 'proveedor'] },
      { id: 'smart-shipping', label: 'Faros Smart Shipping', roles: ['mandante', 'proveedor'] },
      { id: 'cloud-rfid', label: 'Faros Cloud RFID', roles: ['mandante'] },
      { id: 'erp', label: 'Faros ERP', roles: ['mandante'] },
    ]
  },
  {
    title: 'Gestión Transversal',
    items: [
      { id: 'proveedores', label: 'Proveedores', roles: ['mandante'] },
      { id: 'documentos', label: 'Documentos', roles: ['mandante', 'proveedor'] },
      { id: 'tareas', label: 'Tareas y Aprobaciones', roles: ['mandante', 'proveedor'] },
      { id: 'reportes', label: 'Reportes BI', roles: ['mandante'] },
      { id: 'integraciones', label: 'Integraciones', roles: ['mandante'] },
      { id: 'agentes-ia', label: 'Faros AI Agent', roles: ['mandante'] },
    ]
  },
  {
    title: 'Administración',
    items: [
      { id: 'configuracion', label: 'Configuración', roles: ['mandante'] },
    ]
  }
];

export function Sidebar({ currentView, onNavigate, mode }: SidebarProps) {
  const [devModule, setDevModule] = useState<{name: string, desc: string} | null>(null);

  const handleNavigate = (id: string, label: string) => {
    if (id === 'smart-shipping') {
      setDevModule({ name: label, desc: 'Este acceso permitirá integrar capacidades de seguimiento logístico, ASN, recepción, despacho y trazabilidad de entregas.' });
      return;
    }
    if (id === 'cloud-rfid') {
      setDevModule({ name: label, desc: 'Este acceso permitirá integrar funcionalidades de identificación, trazabilidad y control operacional mediante tecnología RFID.' });
      return;
    }
    if (id === 'erp') {
      setDevModule({ name: label, desc: 'Este acceso permitirá conectar la plataforma con funcionalidades ERP desarrolladas por Faros.' });
      return;
    }
    onNavigate(id);
  };

  return (
    <>
      <aside className="w-64 bg-navy-900 text-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#B45309] rounded flex items-center justify-center font-bold text-white tracking-tighter">F</div>
          <span className="text-xl font-black tracking-[0.2em] text-white">FAROS</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto pb-4">
          {MENU_GROUPS.map((group, gIdx) => {
            const visibleItems = group.items.filter(item => item.roles.includes(mode));
            if (visibleItems.length === 0) return null;

            return (
              <div key={gIdx} className={gIdx > 0 ? 'mt-3' : 'mt-2'}>
                <div className="px-6 py-1 text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">
                  {group.title}
                </div>
                {visibleItems.map(item => {
                  const isActive = currentView.startsWith(item.id);
                  const isAI = item.id === 'agentes-ia';
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id, item.label)}
                      className={`w-full flex items-center gap-3 px-6 py-2 text-[13px] transition-colors ${
                        isActive 
                          ? 'bg-slate-800 text-white border-l-4 border-[#B45309] font-medium' 
                          : isAI 
                            ? 'text-[#B45309] font-bold hover:bg-slate-800 border-l-4 border-transparent'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                      }`}
                    >
                      <span className="flex-1 text-left">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
              {mode === 'mandante' ? 'JD' : 'M'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-white truncate">
                {mode === 'mandante' ? 'Juan Delgado' : 'Maria Silva'}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {mode === 'mandante' ? 'Mandante Senior' : 'Admin Proveedor'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Dev Module Modal */}
      {devModule && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Módulo en desarrollo</h3>
              <button 
                onClick={() => setDevModule(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                title="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 text-center space-y-4">
               <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2">
                 <span className="font-black text-slate-400 text-xl tracking-tighter">F</span>
               </div>
               <h4 className="font-bold text-slate-800 text-lg">{devModule.name}</h4>
               <p className="text-sm text-slate-600 leading-relaxed">
                  {devModule.desc}
               </p>
               <button 
                  onClick={() => setDevModule(null)}
                  className="w-full mt-4 bg-copper-600 hover:bg-copper-700 text-white font-bold py-2 rounded transition-colors"
               >
                  Entendido
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
