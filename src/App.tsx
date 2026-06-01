import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AIAgentSidebar } from './components/AIAgentSidebar';
import { ViewMode } from './types';

// Views
import { MandanteDashboard } from './views/MandanteDashboard';
import { ProveedorDashboard } from './views/ProveedorDashboard';
import { LicitacionesList } from './views/LicitacionesList';
import { LicitacionesDetail } from './views/LicitacionesDetail';
import { ContratosList } from './views/ContratosList';
import { ContratosDetail } from './views/ContratosDetail';
import { EDPList } from './views/EDPList';
import { EDPDetail } from './views/EDPDetail';
import { TareasList } from './views/TareasList';
import { IntegracionesList } from './views/IntegracionesList';
import { ConfiguracionView } from './views/ConfiguracionView';
import { GestorIAView } from './views/GestorIAView';
import { ReportesBIView } from './views/ReportesBIView';
import { Briefcase } from 'lucide-react';

import { DocumentosList } from './views/DocumentosList';
import { ProveedoresList } from './views/ProveedoresList';

export default function App() {
  const [mode, setMode] = useState<ViewMode>('mandante');
  const [currentPath, setCurrentPath] = useState('dashboard');
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiContext, setAiContext] = useState<'licitaciones' | 'contratos' | 'edp' | 'documental' | 'general'>('general');

  const handleModeToggle = () => {
    setMode(prev => prev === 'mandante' ? 'proveedor' : 'mandante');
    setCurrentPath('dashboard');
  };

  const openAI = (context: 'licitaciones' | 'contratos' | 'edp' | 'documental' | 'general' = 'general') => {
    setAiContext(context);
    setIsAIOpen(true);
  };

  const renderView = () => {
    if (currentPath === 'dashboard') {
      return mode === 'mandante' ? <MandanteDashboard onNavigate={setCurrentPath} /> : <ProveedorDashboard onNavigate={setCurrentPath} />;
    }
    
    // Pass mode for Data Segregation
    if (currentPath === 'licitaciones') return <LicitacionesList onNavigate={setCurrentPath} mode={mode} />;
    if (currentPath.startsWith('licitaciones/detalle/')) {
      const id = currentPath.split('/').pop() || '';
      return <LicitacionesDetail id={id} onNavigate={setCurrentPath} onOpenAI={openAI} mode={mode} />;
    }
    
    if (currentPath === 'contratos') return <ContratosList onNavigate={setCurrentPath} mode={mode} />;
    if (currentPath.startsWith('contratos/detalle/')) {
      const id = currentPath.split('/').pop() || '';
      return <ContratosDetail id={id} onNavigate={setCurrentPath} onOpenAI={openAI} mode={mode} />;
    }
    
    if (currentPath === 'edp') return <EDPList onNavigate={setCurrentPath} mode={mode} />;
    if (currentPath.startsWith('edp/detalle/')) {
      const id = currentPath.split('/').pop() || '';
      return <EDPDetail id={id} onNavigate={setCurrentPath} onOpenAI={openAI} mode={mode} />;
    }

    if (currentPath === 'tareas') return <TareasList onNavigate={setCurrentPath} mode={mode} />;
    if (currentPath === 'proveedores') return <ProveedoresList onNavigate={setCurrentPath} mode={mode} />;
    if (currentPath === 'integraciones') return <IntegracionesList />;
    if (currentPath === 'reportes') return <ReportesBIView />;
    if (currentPath === 'documentos') return <DocumentosList mode={mode} />;
    if (currentPath === 'configuracion') return <ConfiguracionView />;
    if (currentPath === 'gestor-ia') return <GestorIAView />;

    // Generic placeholder for other views (Documentos, Config)
    return (
      <div className="p-6 max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center min-h-[600px] h-full">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-slate-50 rounded flex items-center justify-center mx-auto mb-6 border border-slate-100">
            <Briefcase className="w-8 h-8 text-copper-500" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 capitalize tracking-tight">{currentPath.replace('-', ' ')}</h2>
          <p className="text-xs text-slate-500">Módulo en proceso de maquetación para la plataforma «Faros Supply & Contract Intelligence». </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#F1F5F9] font-sans text-slate-800 overflow-hidden w-full select-none">
      <Sidebar 
        currentView={currentPath} 
        onNavigate={(path) => {
          if (path === 'agentes-ia') {
            setIsAIOpen(true);
          } else {
            setCurrentPath(path);
          }
        }} 
        mode={mode} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          mode={mode} 
          onModeToggle={handleModeToggle}
          onToggleAIAgent={() => setIsAIOpen(!isAIOpen)}
        />
        
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {renderView()}
        </main>
      </div>

      <AIAgentSidebar 
        isOpen={isAIOpen} 
        onClose={() => setIsAIOpen(false)} 
        context={aiContext}
        mode={mode}
      />
    </div>
  );
}
