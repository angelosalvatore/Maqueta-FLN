import React, { useState } from 'react';
import { Card, Badge, Button } from '../components/ui';
import { 
  ArrowLeft,
  Bot,
  FileCheck,
  Building2,
  Users,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Search,
  Calendar,
  Clock,
  ExternalLink,
  ShieldAlert,
  ChevronRight,
  FileText,
  X,
  Trophy,
  Loader2,
  XCircle,
  AlertCircle,
  HelpCircle,
  MoreHorizontal,
  Check
} from 'lucide-react';
import { ViewMode } from '../types';

export function LicitacionesDetail({ id, onNavigate, onOpenAI, mode }: { id: string, onNavigate: (path: string) => void, onOpenAI: (context: string) => void, mode: ViewMode }) {
  const [activeTab, setActiveTab] = useState('resumen');
  const [showAIPanel, setShowAIPanel] = useState(true);
  const [actionState, setActionState] = useState<{type: 'loading' | 'success' | 'error', message: string} | null>(null);
  
  const isMandante = mode === 'mandante';

  const simulateAction = (actionName: string, successMessage: string) => {
    setActionState({ type: 'loading', message: `Procesando: ${actionName}...` });
    setTimeout(() => {
      setActionState({ type: 'success', message: successMessage });
      setTimeout(() => {
        setActionState(null);
      }, 2000);
    }, 1500);
  };

  const tabs = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'bases', label: 'Bases y documentos' },
    { id: 'proveedores', label: 'Proveedores invitados' },
    { id: 'consultas', label: 'Consultas y respuestas' },
    { id: 'ofertas', label: 'Ofertas recibidas' },
    { id: 'evaluacion_tecnica', label: 'Evaluación técnica' },
    { id: 'evaluacion_economica', label: 'Evaluación económica' },
    { id: 'adjudicacion', label: 'Adjudicación' },
    { id: 'historial', label: 'Historial' },
    { id: 'agente_ia', label: 'Agente IA' }
  ];

  const visibleTabs = isMandante ? tabs : tabs.filter(t => !['proveedores', 'evaluacion_tecnica', 'evaluacion_economica', 'adjudicacion'].includes(t.id));

  const timelineSteps = [
    'Borrador', 
    'Publicada', 
    'En consultas', 
    'Recepción de ofertas', 
    'Evaluación técnica', 
    'Evaluación económica', 
    'Adjudicación', 
    'Cerrada'
  ];
  const currentStep = 'Recepción de ofertas';

  return (
    <div className="flex-1 flex overflow-hidden bg-[#F1F5F9] relative">
      {actionState && (
         <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl max-w-sm w-full animate-in fade-in zoom-in duration-200">
               {actionState.type === 'loading' && <Loader2 className="w-10 h-10 text-copper-600 animate-spin" />}
               {actionState.type === 'success' && <CheckCircle2 className="w-12 h-12 text-green-500" />}
               <p className="text-center font-bold text-slate-800">{actionState.message}</p>
            </div>
         </div>
      )}

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col p-6 space-y-4 overflow-hidden">
        
        {/* Header Fijo */}
        <div className="flex items-start justify-between gap-4 flex-shrink-0 bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex gap-4">
            <button onClick={() => onNavigate('licitaciones')} className="p-2 h-fit mt-1 hover:bg-slate-100 bg-slate-50 border border-slate-200 rounded transition-colors text-slate-500 shadow-sm">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-slate-100 text-slate-500 font-mono tracking-widest text-[10px]">SR-2024-001</Badge>
                <h1 className="text-lg font-bold text-slate-800 tracking-tight">Mantenimiento Planta Chancado</h1>
                <Badge variant="warning" className="uppercase tracking-widest text-[10px]">Recepción de ofertas</Badge>
                {isMandante && <Badge variant="error" className="uppercase tracking-widest text-[10px] gap-1 flex items-center"><Sparkles className="w-3 h-3"/> Riesgo IA: Alto</Badge>}
              </div>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-slate-400" /> Mandante: Minera Norte</div>
                <div className="flex items-center gap-1.5"><ExternalLink className="w-3.5 h-3.5 text-slate-400" /> Fuente: Ariba Sourcing</div>
                <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-400" /> Resp: Juan Delgado</div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="bg-slate-50 border border-slate-100 rounded px-3 py-1.5 flex flex-col">
                   <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Publicación</span>
                   <span className="text-xs font-mono font-medium text-slate-700">12/05/2024</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded px-3 py-1.5 flex flex-col">
                   <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Cierre Consultas</span>
                   <span className="text-xs font-mono font-medium text-slate-700">20/05/2024</span>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded px-3 py-1.5 flex flex-col">
                   <span className="text-[10px] text-amber-600 font-bold uppercase tracking-widest leading-tight">Cierre Ofertas</span>
                   <span className="text-xs font-mono font-bold text-amber-700">30/05/2024 15:00</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 items-end">
            {!showAIPanel && (
               <Button onClick={() => setShowAIPanel(true)} className="gap-2 bg-[#0F172A] text-white hover:bg-slate-800 shadow-md">
                 <Bot className="w-4 h-4 text-copper-400" /> <span className="font-bold">Faros AI Agent</span>
               </Button>
            )}
            {isMandante && <Button variant="outline" className="font-bold w-full bg-slate-50">Comparar Versiones</Button>}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border flex-shrink-0 border-slate-200 rounded-lg p-5 shadow-sm">
           <div className="relative flex justify-between items-center w-full">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
              {timelineSteps.map((step, idx) => {
                 const isActive = step === currentStep;
                 const isPast = timelineSteps.indexOf(step) < timelineSteps.indexOf(currentStep);
                 return (
                    <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                       <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white
                          ${isActive ? 'border-[#B45309] w-5 h-5 shadow-[0_0_0_3px_rgba(180,83,9,0.1)]' : ''}
                          ${isPast ? 'border-green-500 bg-green-500' : ''}
                          ${!isActive && !isPast ? 'border-slate-300' : ''}
                       `}>
                          {isPast && <CheckCircle2 className="w-3 h-3 text-white" />}
                          {isActive && <div className="w-2 h-2 rounded-full bg-[#B45309]"></div>}
                       </div>
                       <span className={`text-[10px] font-bold uppercase tracking-wider text-center absolute top-7 w-24 -ml-10
                          ${isActive ? 'text-[#B45309]' : ''}
                          ${isPast ? 'text-slate-600' : ''}
                          ${!isActive && !isPast ? 'text-slate-400' : ''}
                       `}>
                          {step}
                       </span>
                    </div>
                 )
              })}
           </div>
           <div className="h-6"></div>
        </div>

        {/* Workspace */}
        <Card className="flex-1 flex flex-col min-h-0 bg-white border-slate-200 rounded-lg shadow-sm">
          {/* Navigation Tabs */}
          <div className="border-b border-slate-100 flex-shrink-0 bg-slate-50 px-2 pt-2">
            <nav className="flex gap-1 overflow-x-auto scroller-none">
              {visibleTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-4 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'border-[#B45309] text-copper-700 bg-white rounded-t-lg shadow-[0_-2px_4px_rgba(0,0,0,0.02)]' 
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-t-lg'
                  }`}
                >
                  {tab.label}
                  {tab.id === 'consultas' && <span className="ml-2 w-4 h-4 inline-flex items-center justify-center rounded bg-amber-100 text-amber-700 text-[9px] font-black">3</span>}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {activeTab === 'resumen' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Info general */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Información del Proceso</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                       <div className="bg-slate-50 rounded p-4 border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tipo de Licitación</p>
                          <p className="text-sm font-bold text-slate-700 mt-1">Privada Cerrada</p>
                       </div>
                       <div className="bg-slate-50 rounded p-4 border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rubro</p>
                          <p className="text-sm font-bold text-slate-700 mt-1">Mantenimiento Industrial</p>
                       </div>
                       <div className="bg-slate-50 rounded p-4 border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Días Restantes</p>
                          <p className="text-xl font-black text-amber-600 mt-1">5 días</p>
                       </div>
                    </div>
                  </div>

                  <div>
                     <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Descripción del Servicio</h3>
                     <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded border border-slate-100">
                        Servicio integral de mantenimiento preventivo y correctivo para la Planta de Chancado Primario y Secundario.
                        Incluye recambio de corazas, mantenimiento de cintas transportadoras, lubricación de componentes principales
                        y reportabilidad diaria a través de sistema corporativo.
                     </p>
                  </div>
                </div>

                <div className="space-y-4">
                   <div className="border hover:border-slate-300 transition-colors border-slate-200 rounded-lg p-4 bg-white shadow-sm flex items-center justify-between cursor-pointer" onClick={() => setActiveTab('proveedores')}>
                      <div>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Proveedores Invitados</span>
                         <div className="text-xl font-black text-slate-700 mt-1">12</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                   </div>
                   <div className="border hover:border-slate-300 transition-colors border-slate-200 rounded-lg p-4 bg-white shadow-sm flex items-center justify-between cursor-pointer" onClick={() => setActiveTab('ofertas')}>
                      <div>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ofertas Recibidas</span>
                         <div className="text-xl font-black text-slate-700 mt-1">4</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                   </div>
                   <div className="border hover:border-slate-300 transition-colors border-slate-200 rounded-lg p-4 bg-white shadow-sm flex items-center justify-between cursor-pointer" onClick={() => setActiveTab('bases')}>
                      <div>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Documentos Base</span>
                         <div className="text-xl font-black text-slate-700 mt-1">8 arch.</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                   </div>
                   <div className="border-l-4 border-red-500 rounded-r-lg p-4 bg-red-50 shadow-sm flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                         <h4 className="text-xs font-bold text-red-800 uppercase tracking-widest">Alertas</h4>
                         <p className="text-sm font-medium text-red-700 mt-1">Existen 3 consultas pendientes de respuesta oficial con alta prioridad.</p>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'adjudicacion' && (
              <div className="h-full flex flex-col gap-6">
                 <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Recomendación de Adjudicación</h3>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-5 flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Trophy className="w-5 h-5 text-green-600" />
                       </div>
                       <div className="flex-1">
                          <h4 className="text-sm font-bold text-green-900">Proveedor Destacado: Ingeniería y Servicios Andes SpA</h4>
                          <p className="text-xs text-green-800 mt-1">Este proveedor obtuvo el mejor puntaje ponderado final de acuerdo a la matriz de evaluación técnica y económica.</p>
                          <div className="grid grid-cols-3 gap-4 mt-4">
                             <div className="bg-white/60 p-3 rounded">
                                <span className="block text-[10px] font-bold text-green-700 uppercase tracking-wider mb-1">Nota Técnica</span>
                                <span className="text-lg font-black text-green-900">6.8 / 7.0</span>
                             </div>
                             <div className="bg-white/60 p-3 rounded">
                                <span className="block text-[10px] font-bold text-green-700 uppercase tracking-wider mb-1">Nota Económica</span>
                                <span className="text-lg font-black text-green-900">6.5 / 7.0</span>
                             </div>
                             <div className="bg-white/60 p-3 rounded">
                                <span className="block text-[10px] font-bold text-green-700 uppercase tracking-wider mb-1">Puntaje Final</span>
                                <span className="text-lg font-black text-green-900">92.4%</span>
                             </div>
                          </div>
                          
                          <div className="mt-5 flex gap-3">
                             <Button onClick={() => simulateAction('Generando Adjudicación', 'Licitación adjudicada exitosamente. Se ha notificado al proveedor.')} className="bg-green-700 hover:bg-green-800 text-white font-bold px-6 shadow-md border-none gap-2">
                                <Trophy className="w-4 h-4" /> Aprobar y Adjudicar
                             </Button>
                             <Button onClick={() => simulateAction('Rechazando Propuesta', 'Se ha solicitado revisión de la propuesta.')} variant="outline" className="border-green-300 text-green-800 hover:bg-green-100 font-bold gap-2">
                                <ShieldAlert className="w-4 h-4" /> Solicitar Revisión
                             </Button>
                          </div>
                       </div>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Otros Proveedores (Ranking)</h3>
                       <div className="space-y-3">
                          <div className="p-3 border border-slate-200 rounded-lg flex items-center justify-between">
                             <div>
                                <span className="text-xs font-bold text-slate-700">2. Mantenciones Globales LTDA.</span>
                                <div className="text-[10px] text-slate-500 mt-0.5">Nota Final: 88.5%</div>
                             </div>
                             <Button variant="outline" size="sm" className="text-[10px] h-7 font-bold">Ver Resumen</Button>
                          </div>
                          <div className="p-3 border border-slate-200 rounded-lg flex items-center justify-between">
                             <div>
                                <span className="text-xs font-bold text-slate-700">3. Industrial Norte SpA</span>
                                <div className="text-[10px] text-slate-500 mt-0.5">Nota Final: 82.1%</div>
                             </div>
                             <Button variant="outline" size="sm" className="text-[10px] h-7 font-bold">Ver Resumen</Button>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'evaluacion_tecnica' && (
               <div className="h-full flex flex-col gap-6">
                 {/* Indicadores */}
                 <div className="grid grid-cols-4 gap-4 flex-shrink-0">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Requisitos Evaluados</p>
                       <p className="text-xl font-black text-slate-700 mt-1">5 <span className="text-sm font-medium text-slate-400">/ 5</span></p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Requisitos Críticos</p>
                       <p className="text-xl font-black text-slate-700 mt-1">3</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                       <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Ofertas con Brechas</p>
                       <div className="flex items-center gap-2 mt-1">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <p className="text-xl font-black text-red-700">1</p>
                       </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                       <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Avance Evaluación</p>
                       <p className="text-xl font-black text-green-700 mt-1">100%</p>
                    </div>
                 </div>

                 {/* Matriz */}
                 <div className="flex-1 border border-slate-200 rounded-lg overflow-hidden flex flex-col bg-white">
                    <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center flex-shrink-0">
                       <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <FileCheck className="w-4 h-4 text-slate-500" />
                          Matriz de Cumplimiento
                       </div>
                       <Button variant="outline" size="sm" className="h-8 text-xs font-bold gap-2">
                          <ExternalLink className="w-3.5 h-3.5" /> Exportar a Excel
                       </Button>
                    </div>
                    <div className="flex-1 overflow-auto">
                       <table className="w-full text-left whitespace-nowrap min-w-max">
                          <thead className="bg-[#0F172A] text-white text-[10px] uppercase font-bold tracking-wide sticky top-0 z-10">
                             <tr>
                                <th className="px-4 py-3 sticky left-0 bg-[#0F172A] z-20 w-64 shadow-[1px_0_0_#334155]">Requisito</th>
                                <th className="px-4 py-3">Tipo</th>
                                <th className="px-4 py-3 text-center">Oblig.</th>
                                <th className="px-4 py-3">Doc Fuente</th>
                                <th className="px-4 py-3 border-l border-[#334155]">Prov. Alpha</th>
                                <th className="px-4 py-3 bg-white/5">Const. Norte</th>
                                <th className="px-4 py-3">Tech Sol.</th>
                                <th className="px-4 py-3 border-l border-[#334155] text-copper-400">Sugerencia IA</th>
                                <th className="px-4 py-3">Comentario Evaluador</th>
                                <th className="px-4 py-3 text-center">Acción</th>
                             </tr>
                          </thead>
                          <tbody className="text-[11px] text-slate-700 divide-y divide-slate-100 font-medium">
                             {/* Fila 1 */}
                             <tr className="hover:bg-slate-50 transition-colors group">
                                <td className="px-4 py-3 sticky left-0 bg-white group-hover:bg-slate-50 z-10 w-64 whitespace-normal shadow-[1px_0_0_#F1F5F9] font-bold text-slate-800">1. Experiencia mínima 3 años en mantenimiento industrial.</td>
                                <td className="px-4 py-3 text-slate-500">Técnico</td>
                                <td className="px-4 py-3 text-center"><Check className="w-4 h-4 mx-auto text-slate-400" /></td>
                                <td className="px-4 py-3 text-copper-600 hover:underline cursor-pointer">Bases v2 (Sec 4.1)</td>
                                <td className="px-4 py-3 border-l border-slate-100">
                                   <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded w-fit"><CheckCircle2 className="w-3.5 h-3.5" /> Cumple</div>
                                </td>
                                <td className="px-4 py-3 bg-red-50/30">
                                   <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2 py-1 rounded w-fit border border-amber-200"><AlertCircle className="w-3.5 h-3.5" /> Parcial</div>
                                </td>
                                <td className="px-4 py-3">
                                   <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded w-fit"><CheckCircle2 className="w-3.5 h-3.5" /> Cumple</div>
                                </td>
                                <td className="px-4 py-3 border-l border-slate-100 whitespace-normal w-64 text-copper-800 bg-copper-50/30 font-semibold">
                                   Const. Norte acredita solo 2.5 años (Contrato anterior). Falta evidencia.
                                </td>
                                <td className="px-4 py-3">
                                   <input type="text" className="border border-slate-200 rounded px-2 py-1 w-48 text-xs focus:outline-none focus:border-copper-500 bg-white" placeholder="Escriba comentario..." defaultValue="Solicitar aclaración a Norte" />
                                </td>
                                <td className="px-4 py-3 text-center">
                                   <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4 mx-auto" /></button>
                                </td>
                             </tr>

                             {/* Fila 2 */}
                             <tr className="hover:bg-slate-50 transition-colors group">
                                <td className="px-4 py-3 sticky left-0 bg-white group-hover:bg-slate-50 z-10 w-64 whitespace-normal shadow-[1px_0_0_#F1F5F9] font-bold text-slate-800">2. Certificación de seguridad para trabajos en planta.</td>
                                <td className="px-4 py-3 text-slate-500">HSEQ</td>
                                <td className="px-4 py-3 text-center"><Check className="w-4 h-4 mx-auto text-slate-400" /></td>
                                <td className="px-4 py-3 text-copper-600 hover:underline cursor-pointer">Bases v2 (Sec 4.2)</td>
                                <td className="px-4 py-3 border-l border-slate-100">
                                   <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded w-fit"><CheckCircle2 className="w-3.5 h-3.5" /> Cumple</div>
                                </td>
                                <td className="px-4 py-3">
                                   <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded w-fit"><CheckCircle2 className="w-3.5 h-3.5" /> Cumple</div>
                                </td>
                                <td className="px-4 py-3">
                                   <div className="flex items-center gap-1.5 text-slate-600 bg-slate-100 px-2 py-1 rounded w-fit border border-slate-200"><HelpCircle className="w-3.5 h-3.5" /> Pendiente</div>
                                </td>
                                <td className="px-4 py-3 border-l border-slate-100 whitespace-normal w-64 text-copper-800 bg-copper-50/30 font-semibold">
                                   Tech Sol. subió un documento corrupto. No se pudo validar ISO 45001.
                                </td>
                                <td className="px-4 py-3">
                                   <input type="text" className="border border-slate-200 rounded px-2 py-1 w-48 text-xs focus:outline-none focus:border-copper-500 bg-white" placeholder="Escriba comentario..." />
                                </td>
                                <td className="px-4 py-3 text-center">
                                   <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4 mx-auto" /></button>
                                </td>
                             </tr>

                             {/* Fila 3 */}
                             <tr className="hover:bg-slate-50 transition-colors group">
                                <td className="px-4 py-3 sticky left-0 bg-white group-hover:bg-slate-50 z-10 w-64 whitespace-normal shadow-[1px_0_0_#F1F5F9] font-bold text-slate-800">3. Dotación técnica mínima.</td>
                                <td className="px-4 py-3 text-slate-500">Técnico</td>
                                <td className="px-4 py-3 text-center"><Check className="w-4 h-4 mx-auto text-slate-400" /></td>
                                <td className="px-4 py-3 text-copper-600 hover:underline cursor-pointer">Bases v2 (Sec 5)</td>
                                <td className="px-4 py-3 border-l border-slate-100">
                                   <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded w-fit"><CheckCircle2 className="w-3.5 h-3.5" /> Cumple</div>
                                </td>
                                <td className="px-4 py-3">
                                   <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded w-fit"><CheckCircle2 className="w-3.5 h-3.5" /> Cumple</div>
                                </td>
                                <td className="px-4 py-3">
                                   <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded w-fit"><CheckCircle2 className="w-3.5 h-3.5" /> Cumple</div>
                                </td>
                                <td className="px-4 py-3 border-l border-slate-100 whitespace-normal w-64 text-copper-800 bg-copper-50/30 font-semibold">
                                   Todos cumplen con los 15 técnicos requeridos.
                                </td>
                                <td className="px-4 py-3">
                                   <input type="text" className="border border-slate-200 rounded px-2 py-1 w-48 text-xs focus:outline-none focus:border-copper-500 bg-white" placeholder="Escriba comentario..." />
                                </td>
                                <td className="px-4 py-3 text-center">
                                   <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4 mx-auto" /></button>
                                </td>
                             </tr>

                             {/* Fila 4 */}
                             <tr className="hover:bg-slate-50 transition-colors group">
                                <td className="px-4 py-3 sticky left-0 bg-white group-hover:bg-slate-50 z-10 w-64 whitespace-normal shadow-[1px_0_0_#F1F5F9] font-bold text-slate-800">4. Plan de prevención de riesgos.</td>
                                <td className="px-4 py-3 text-slate-500">HSEQ</td>
                                <td className="px-4 py-3 text-center">-</td>
                                <td className="px-4 py-3 text-copper-600 hover:underline cursor-pointer">Bases v2 (Sec 4.3)</td>
                                <td className="px-4 py-3 border-l border-slate-100">
                                   <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded w-fit"><CheckCircle2 className="w-3.5 h-3.5" /> Cumple</div>
                                </td>
                                <td className="px-4 py-3">
                                   <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded w-fit"><CheckCircle2 className="w-3.5 h-3.5" /> Cumple</div>
                                </td>
                                <td className="px-4 py-3">
                                   <div className="flex items-center gap-1.5 text-red-700 bg-red-50 px-2 py-1 rounded w-fit border border-red-200"><XCircle className="w-3.5 h-3.5" /> No Cumple</div>
                                </td>
                                <td className="px-4 py-3 border-l border-slate-100 whitespace-normal w-64 text-copper-800 bg-copper-50/30 font-semibold">
                                   Tech Sol. no adjuntó plan. Al no ser obligatorio no descalifica, pero baja puntaje.
                                </td>
                                <td className="px-4 py-3">
                                   <input type="text" className="border border-slate-200 rounded px-2 py-1 w-48 text-xs focus:outline-none focus:border-copper-500 bg-white" placeholder="Escriba comentario..." defaultValue="Considerar en nota final" />
                                </td>
                                <td className="px-4 py-3 text-center">
                                   <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4 mx-auto" /></button>
                                </td>
                             </tr>

                             {/* Fila 5 */}
                             <tr className="hover:bg-slate-50 transition-colors group">
                                <td className="px-4 py-3 sticky left-0 bg-white group-hover:bg-slate-50 z-10 w-64 whitespace-normal shadow-[1px_0_0_#F1F5F9] font-bold text-slate-800">5. Cumplimiento de bases administrativas.</td>
                                <td className="px-4 py-3 text-slate-500">Legal</td>
                                <td className="px-4 py-3 text-center"><Check className="w-4 h-4 mx-auto text-slate-400" /></td>
                                <td className="px-4 py-3 text-copper-600 hover:underline cursor-pointer">Bases v2 (Sec 1-3)</td>
                                <td className="px-4 py-3 border-l border-slate-100">
                                   <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded w-fit"><CheckCircle2 className="w-3.5 h-3.5" /> Cumple</div>
                                </td>
                                <td className="px-4 py-3">
                                   <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded w-fit"><CheckCircle2 className="w-3.5 h-3.5" /> Cumple</div>
                                </td>
                                <td className="px-4 py-3">
                                   <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded w-fit"><CheckCircle2 className="w-3.5 h-3.5" /> Cumple</div>
                                </td>
                                <td className="px-4 py-3 border-l border-slate-100 whitespace-normal w-64 text-copper-800 bg-copper-50/30 font-semibold">
                                   Se detectó firma en anexos 1, 2 y 3 para todos los proveedores.
                                </td>
                                <td className="px-4 py-3">
                                   <input type="text" className="border border-slate-200 rounded px-2 py-1 w-48 text-xs focus:outline-none focus:border-copper-500 bg-white" placeholder="Escriba comentario..." />
                                </td>
                                <td className="px-4 py-3 text-center">
                                   <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4 mx-auto" /></button>
                                </td>
                             </tr>

                          </tbody>
                       </table>
                    </div>
                 </div>
               </div>
            )}

            {activeTab === 'bases' && (
               <div className="h-full flex flex-col">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Documentos Base</h3>
                    <Button className="bg-copper-600 hover:bg-copper-700 text-white font-bold text-xs gap-2">Nueva versión</Button>
                 </div>
                 <div className="flex-1 overflow-auto border border-slate-200 rounded-lg bg-white">
                    <table className="w-full text-left whitespace-nowrap min-w-max">
                       <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wide sticky top-0 z-10 border-b border-slate-200">
                          <tr>
                             <th className="px-4 py-3">Nombre Documento</th>
                             <th className="px-4 py-3">Tipo</th>
                             <th className="px-4 py-3 text-center">Versión</th>
                             <th className="px-4 py-3">Estado</th>
                             <th className="px-4 py-3">Fecha Carga</th>
                             <th className="px-4 py-3">Responsable</th>
                             <th className="px-4 py-3 text-center">Visible Proveedor</th>
                             <th className="px-4 py-3 text-center">Lectura IA</th>
                             <th className="px-4 py-3 text-right">Acción</th>
                          </tr>
                       </thead>
                       <tbody className="text-xs text-slate-700 divide-y divide-slate-100 font-medium">
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800">Bases Técnicas</td>
                             <td className="px-4 py-3">Técnico</td>
                             <td className="px-4 py-3 text-center">v2</td>
                             <td className="px-4 py-3"><Badge variant="default">Vigente</Badge></td>
                             <td className="px-4 py-3">12/05/2024</td>
                             <td className="px-4 py-3">Juan Delgado</td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-copper-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-slate-400 hover:text-copper-600">Ver</button>
                                <button className="text-slate-400 hover:text-copper-600">Descargar</button>
                                <button className="text-copper-500 font-bold hover:text-copper-700">Comparar con IA</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-400">Bases Técnicas</td>
                             <td className="px-4 py-3">Técnico</td>
                             <td className="px-4 py-3 text-center">v1</td>
                             <td className="px-4 py-3"><Badge variant="outline">Reemplazado</Badge></td>
                             <td className="px-4 py-3">10/05/2024</td>
                             <td className="px-4 py-3">Juan Delgado</td>
                             <td className="px-4 py-3 text-center"><XCircle className="w-4 h-4 text-slate-300 mx-auto" /></td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-copper-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-slate-400 hover:text-copper-600">Ver</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800">Bases Administrativas Especiales</td>
                             <td className="px-4 py-3">Administrativo</td>
                             <td className="px-4 py-3 text-center">v1</td>
                             <td className="px-4 py-3"><Badge variant="default">Publicado</Badge></td>
                             <td className="px-4 py-3">12/05/2024</td>
                             <td className="px-4 py-3">Juan Delgado</td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-copper-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-slate-400 hover:text-copper-600">Ver</button>
                                <button className="text-slate-400 hover:text-copper-600">Descargar</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800">Anexo Económico</td>
                             <td className="px-4 py-3">Económico</td>
                             <td className="px-4 py-3 text-center">v1</td>
                             <td className="px-4 py-3"><Badge variant="default">Publicado</Badge></td>
                             <td className="px-4 py-3">12/05/2024</td>
                             <td className="px-4 py-3">Juan Delgado</td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-copper-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-slate-400 hover:text-copper-600">Ver</button>
                                <button className="text-slate-400 hover:text-copper-600">Descargar</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800">Aclaración N°1</td>
                             <td className="px-4 py-3">Aclaratorio</td>
                             <td className="px-4 py-3 text-center">v1</td>
                             <td className="px-4 py-3"><Badge variant="warning">En revisión</Badge></td>
                             <td className="px-4 py-3">14/05/2024</td>
                             <td className="px-4 py-3">Carlos Díaz</td>
                             <td className="px-4 py-3 text-center"><XCircle className="w-4 h-4 text-slate-300 mx-auto" /></td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-copper-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-slate-400 hover:text-copper-600">Ver</button>
                                <button className="text-slate-400 hover:text-copper-600">Descargar</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800">Matriz de Requisitos</td>
                             <td className="px-4 py-3">Evaluación</td>
                             <td className="px-4 py-3 text-center">v1</td>
                             <td className="px-4 py-3"><Badge variant="success">Vigente</Badge></td>
                             <td className="px-4 py-3">12/05/2024</td>
                             <td className="px-4 py-3">Sistema IA</td>
                             <td className="px-4 py-3 text-center"><XCircle className="w-4 h-4 text-slate-300 mx-auto" /></td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-copper-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-slate-400 hover:text-copper-600">Ver</button>
                                <button className="text-slate-400 hover:text-copper-600">Descargar</button>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
               </div>
            )}

            {activeTab === 'consultas' && (
               <div className="h-full flex flex-col">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Bandeja de Consultas</h3>
                 </div>
                 <div className="flex-1 overflow-auto border border-slate-200 rounded-lg bg-white">
                    <table className="w-full text-left whitespace-nowrap min-w-max">
                       <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wide sticky top-0 z-10 border-b border-slate-200">
                          <tr>
                             <th className="px-4 py-3">ID Consulta</th>
                             <th className="px-4 py-3">Proveedor</th>
                             <th className="px-4 py-3">Categoría</th>
                             <th className="px-4 py-3 w-1/3">Pregunta</th>
                             <th className="px-4 py-3">Estado</th>
                             <th className="px-4 py-3">Responsable</th>
                             <th className="px-4 py-3">Fecha Límite</th>
                             <th className="px-4 py-3 text-right">Acción</th>
                          </tr>
                       </thead>
                       <tbody className="text-xs text-slate-700 divide-y divide-slate-100 font-medium whitespace-normal">
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-mono font-bold text-slate-500">C-001</td>
                             <td className="px-4 py-3">Constructora Norte SPA</td>
                             <td className="px-4 py-3"><Badge variant="outline">Técnica</Badge></td>
                             <td className="px-4 py-3 w-1/3">¿La certificación ISO 45001 puede estar en trámite al momento de ofertar?</td>
                             <td className="px-4 py-3"><Badge variant="warning">Recibida</Badge></td>
                             <td className="px-4 py-3">Juan Delgado</td>
                             <td className="px-4 py-3 text-amber-600 font-bold">18/05/2024</td>
                             <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Responder</button>
                                <button className="text-copper-500 hover:text-copper-700 font-bold"><Sparkles className="w-3 h-3 inline mr-1"/> IA Sugerir</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-mono font-bold text-slate-500">C-002</td>
                             <td className="px-4 py-3">Ingeniería y Servicios Andes SpA</td>
                             <td className="px-4 py-3"><Badge variant="outline">Económica</Badge></td>
                             <td className="px-4 py-3 w-1/3">¿El anexo económico debe presentarse en UF o Pesos?</td>
                             <td className="px-4 py-3"><Badge variant="default">Respondida</Badge></td>
                             <td className="px-4 py-3">Carlos Díaz</td>
                             <td className="px-4 py-3">18/05/2024</td>
                             <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                                <button className="text-green-600 hover:text-green-700 font-bold">Publicar</button>
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Anonimizar</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-mono font-bold text-slate-500">C-003</td>
                             <td className="px-4 py-3">Tech Sol.</td>
                             <td className="px-4 py-3"><Badge variant="outline">Documental</Badge></td>
                             <td className="px-4 py-3 w-1/3">El formulario Anexo 2 no está adjunto en las bases.</td>
                             <td className="px-4 py-3"><Badge variant="success">Publicada</Badge></td>
                             <td className="px-4 py-3">Juan Delgado</td>
                             <td className="px-4 py-3">—</td>
                             <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Ver respuesta</button>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
               </div>
            )}

            {activeTab === 'ofertas' && (
               <div className="h-full flex flex-col">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Proveedores y Ofertas</h3>
                 </div>
                 <div className="flex-1 overflow-auto border border-slate-200 rounded-lg bg-white">
                    <table className="w-full text-left whitespace-nowrap min-w-max">
                       <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wide sticky top-0 z-10 border-b border-slate-200">
                          <tr>
                             <th className="px-4 py-3">Proveedor</th>
                             <th className="px-4 py-3">Estado Oferta</th>
                             <th className="px-4 py-3">Fecha Envío</th>
                             <th className="px-4 py-3 text-center">Oferta Técnica</th>
                             <th className="px-4 py-3 text-center">Oferta Económica</th>
                             <th className="px-4 py-3 text-center">Doc. Completos</th>
                             <th className="px-4 py-3">Observaciones</th>
                             <th className="px-4 py-3 text-right">Acción</th>
                          </tr>
                       </thead>
                       <tbody className="text-xs text-slate-700 divide-y divide-slate-100 font-medium">
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800">Constructora Norte SPA</td>
                             <td className="px-4 py-3"><Badge variant="default">En evaluación</Badge></td>
                             <td className="px-4 py-3">29/05/2024</td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-center"><XCircle className="w-4 h-4 text-red-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-amber-600">Falta certificado exp.</td>
                             <td className="px-4 py-3 text-right"><button className="text-copper-600 hover:text-copper-700 font-bold">Ver ofertas</button></td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800">Ingeniería y Servicios Andes SpA</td>
                             <td className="px-4 py-3"><Badge variant="success">Completa</Badge></td>
                             <td className="px-4 py-3">28/05/2024</td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                             <td className="px-4 py-3">—</td>
                             <td className="px-4 py-3 text-right"><button className="text-copper-600 hover:text-copper-700 font-bold">Ver ofertas</button></td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800">Tech Sol.</td>
                             <td className="px-4 py-3"><Badge variant="warning">Observada</Badge></td>
                             <td className="px-4 py-3">29/05/2024</td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-center"><XCircle className="w-4 h-4 text-red-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-red-600">Doc. corrupto.</td>
                             <td className="px-4 py-3 text-right"><button className="text-copper-600 hover:text-copper-700 font-bold">Ver ofertas</button></td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800">Mantenciones Globales LTDA.</td>
                             <td className="px-4 py-3"><Badge variant="default">Recibida</Badge></td>
                             <td className="px-4 py-3">30/05/2024</td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                             <td className="px-4 py-3">—</td>
                             <td className="px-4 py-3 text-right"><button className="text-copper-600 hover:text-copper-700 font-bold">Ver ofertas</button></td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
               </div>
            )}

            {activeTab === 'historial' && (
               <div className="h-full flex flex-col">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Historial de Licitación</h3>
                 </div>
                 <div className="flex-1 overflow-auto border border-slate-200 rounded-lg bg-white p-6">
                    <div className="space-y-6">
                       
                       <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center mt-1">
                             <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                             <div className="w-0.5 h-16 bg-slate-200"></div>
                          </div>
                          <div className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-lg shadow-sm">
                             <div className="flex justify-between">
                                <span className="font-bold text-slate-800 text-sm">Cambio de Etapa</span>
                                <span className="text-xs text-slate-400 font-mono">01/06/2024 09:00</span>
                             </div>
                             <p className="text-xs text-slate-600 mt-1">Licitación pasó a estado <Badge variant="warning" className="ml-1 scale-90">Evaluación técnica</Badge></p>
                             <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
                                <Users className="w-3 h-3" /> Sistema Automático
                             </div>
                          </div>
                       </div>
                       
                       <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center mt-1">
                             <div className="w-3 h-3 rounded-full bg-copper-500"></div>
                             <div className="w-0.5 h-16 bg-slate-200"></div>
                          </div>
                          <div className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-lg shadow-sm">
                             <div className="flex justify-between">
                                <span className="font-bold text-slate-800 text-sm">Generación Matriz de Cumplimiento</span>
                                <span className="text-xs text-slate-400 font-mono">31/05/2024 18:30</span>
                             </div>
                             <p className="text-xs text-slate-600 mt-1">Faros AI autogeneró la matriz de evaluación técnica.</p>
                             <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
                                <Bot className="w-3 h-3" /> Faros AI Agent
                             </div>
                          </div>
                       </div>

                       <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center mt-1">
                             <div className="w-3 h-3 rounded-full bg-green-500"></div>
                             <div className="w-0.5 h-16 bg-slate-200"></div>
                          </div>
                          <div className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-lg shadow-sm">
                             <div className="flex justify-between">
                                <span className="font-bold text-slate-800 text-sm">Recepción de Ofertas Cerrada</span>
                                <span className="text-xs text-slate-400 font-mono">30/05/2024 15:00</span>
                             </div>
                             <p className="text-xs text-slate-600 mt-1">Se cerró la etapa con 4 ofertas recibidas.</p>
                             <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
                                <Clock className="w-3 h-3" /> Cierre Programado
                             </div>
                          </div>
                       </div>

                       <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center mt-1">
                             <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                          </div>
                          <div className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-lg shadow-sm">
                             <div className="flex justify-between">
                                <span className="font-bold text-slate-800 text-sm">Actualización de Bases</span>
                                <span className="text-xs text-slate-400 font-mono">14/05/2024 10:15</span>
                             </div>
                             <p className="text-xs text-slate-600 mt-1">Se reemplazó "Bases Técnicas v1" por "Bases Técnicas v2". Se cargó "Aclaración N°1".</p>
                             <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
                                <Users className="w-3 h-3" /> Juan Delgado
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               </div>
            )}

            {activeTab !== 'resumen' && activeTab !== 'adjudicacion' && activeTab !== 'evaluacion_tecnica' && activeTab !== 'bases' && activeTab !== 'consultas' && activeTab !== 'ofertas' && activeTab !== 'historial' && (
               <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/50">
                  <FileCheck className="w-12 h-12 text-slate-300 mb-4" />
                  <h2 className="text-base font-bold text-slate-700 uppercase tracking-widest">Módulo: {tabs.find(t => t.id === activeTab)?.label}</h2>
                  <p className="text-sm text-slate-500 mt-2 text-center max-w-md">
                    La vista de detalle de este módulo se encuentra en construcción para efectos de esta maqueta. 
                    <br/>El flujo funcional completo permite interactuar con esta información directamente.
                  </p>
               </div>
            )}
          </div>
        </Card>
      </div>

      {/* Faros AI Agent Contextual Panel */}
      {showAIPanel && (
         <div className="w-80 flex-shrink-0 border-l border-slate-200 bg-white flex flex-col shadow-[-5px_0_15px_rgba(0,0,0,0.03)] z-20">
            <div className="p-4 bg-[#0F172A] text-white flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-copper-400" />
                  <span className="font-bold text-sm">{activeTab === 'evaluacion_tecnica' ? 'Agente IA de Licitaciones' : 'Faros AI Agent'}</span>
               </div>
               <button onClick={() => setShowAIPanel(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
               </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
               
               {/* Mensaje AI */}
               <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded bg-copper-100 flex items-center justify-center flex-shrink-0 border border-copper-200">
                     <Bot className="w-4 h-4 text-copper-600" />
                  </div>
                  {activeTab === 'evaluacion_tecnica' ? (
                     <div className="bg-white p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-sm text-xs text-slate-700 leading-relaxed">
                        <p>Según Bases Técnicas v2, sección 4.1, el requisito de experiencia mínima es obligatorio.</p>
                        <p className="mt-2 text-amber-700 font-bold bg-amber-50 p-2 rounded border border-amber-100">
                           Constructora Norte presenta evidencia parcial y requiere aclaración.
                        </p>
                     </div>
                  ) : (
                     <div className="bg-white p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-sm text-xs text-slate-700 leading-relaxed">
                        <p>¡Hola! Estoy analizando la documentación de esta licitación.</p>
                        <p className="mt-2 text-red-700 font-bold bg-red-50 p-2 rounded border border-red-100">
                           Detecté 4 requisitos obligatorios en las Bases Administrativas Especiales sin matriz de evaluación técnica asociada.
                        </p>
                        <p className="mt-2 font-medium">¿Deseas que genere una matriz preliminar basada en estos documentos?</p>
                     </div>
                  )}
               </div>

               {/* Acciones sugeridas */}
               <div className="pl-11 space-y-2">
                  {activeTab === 'evaluacion_tecnica' ? (
                     <>
                        <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                           <Sparkles className="w-3 h-3 text-copper-500" /> Generar matriz completa
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                           <FileCheck className="w-3 h-3 text-copper-500" /> Comparar ofertas
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                           <FileText className="w-3 h-3 text-copper-500" /> Preparar acta técnica
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                           <ShieldAlert className="w-3 h-3 text-copper-500" /> Solicitar aclaración
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                           <ExternalLink className="w-3 h-3 text-copper-500" /> Exportar matriz
                        </button>
                     </>
                  ) : (
                     <>
                        <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                           <Sparkles className="w-3 h-3 text-copper-500" /> Generar matriz preliminar
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                           <FileText className="w-3 h-3 text-copper-500" /> Extraer requisitos de las bases
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                           <AlertTriangle className="w-3 h-3 text-copper-500" /> Detectar riesgos del proceso
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                           <Search className="w-3 h-3 text-copper-500" /> Preparar preguntas aclaratorias
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                           <FileCheck className="w-3 h-3 text-copper-500" /> Resumir bases completas
                        </button>
                     </>
                  )}
               </div>
            </div>
            
            <div className="p-3 bg-white border-t border-slate-200">
               <div className="relative">
                  <input type="text" placeholder="Pregunta algo al agente..." className="w-full border border-slate-300 rounded-full pl-4 pr-10 py-2 text-xs focus:outline-none focus:border-copper-500 focus:ring-1 focus:ring-copper-500" />
                  <button className="absolute right-2 top-1.5 p-1 rounded-full bg-[#0F172A] text-white hover:bg-slate-800">
                     <ChevronRight className="w-3 h-3" />
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}

