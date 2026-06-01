import React, { useState } from 'react';
import { Card, Badge, Button } from '../components/ui';
import { 
  ArrowLeft,
  Bot,
  FileCheck,
  AlertTriangle,
  FileText,
  Save,
  Send,
  Trash2,
  ChevronDown,
  Paperclip,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Check,
  Sparkles,
  Search,
  ChevronRight,
  X,
  Loader2,
  Building2
} from 'lucide-react';
import { ViewMode } from '../types';

export function EDPDetail({ id, onNavigate, onOpenAI, mode }: { id: string, onNavigate: (path: string) => void, onOpenAI: (context: string) => void, mode: ViewMode }) {
  const [showAIPanel, setShowAIPanel] = useState(true);
  const [actionState, setActionState] = useState<{type: 'loading' | 'success' | 'error', message: string} | null>(null);
  const isMandante = mode === 'mandante';

  const simulateAction = (actionName: string, successMessage: string) => {
    setActionState({ type: 'loading', message: `Procesando: ${actionName}...` });
    setTimeout(() => {
      setActionState({ type: 'success', message: successMessage });
      setTimeout(() => {
        setActionState(null);
        if (actionName.includes('Descartar') || actionName.includes('Borrar')) {
           onNavigate('edp');
        }
      }, 2000);
    }, 1500);
  };

  const [activeTab, setActiveTab] = useState('workflow'); // By default put it on workflow or lineas

  const tabs = [
    { id: 'datos', label: 'Datos generales' },
    { id: 'lineas', label: 'Líneas de servicio' },
    { id: 'adjuntos', label: 'Adjuntos' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'hes', label: 'HES / Visación / Liberación' },
    { id: 'historial', label: 'Historial' },
    { id: 'agente', label: 'Agente IA' }
  ];

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

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header Fijo */}
        <div className="flex items-start justify-between gap-4 flex-shrink-0 bg-white p-5 rounded-lg border border-slate-200 shadow-sm m-6 mb-0">
          <div className="flex gap-4">
            <button onClick={() => onNavigate('edp')} className="p-2 h-fit mt-1 hover:bg-slate-100 bg-slate-50 border border-slate-200 rounded transition-colors text-slate-500 shadow-sm">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-slate-100 text-slate-500 font-mono tracking-widest text-[10px]">{id}</Badge>
                <h1 className="text-lg font-bold text-slate-800 tracking-tight">Estado de Pago Digital</h1>
                <Badge variant="warning" className="uppercase tracking-widest text-[10px]">Observado</Badge>
              </div>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-slate-400" /> Proveedor: Constructora Norte</div>
                <div className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-slate-400" /> Contrato: CT-2021-098</div>
                <div className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-slate-400" /> ODS: 450021998</div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="bg-slate-50 border border-slate-100 rounded px-3 py-1.5 flex flex-col">
                   <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Monto Total</span>
                   <span className="text-xs font-mono font-bold text-slate-700">125,000 USD</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded px-3 py-1.5 flex flex-col">
                   <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Periodo</span>
                   <span className="text-xs font-mono font-medium text-slate-700">Septiembre 2023</span>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded px-3 py-1.5 flex flex-col">
                   <span className="text-[10px] text-amber-600 font-bold uppercase tracking-widest leading-tight">Resp. Actual</span>
                   <span className="text-xs font-mono font-bold text-amber-700">Back Office</span>
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
            <div className="text-right">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado Integración</span>
               <div className="mt-1 flex items-center justify-end gap-1.5">
                  <Badge variant="outline" className="bg-slate-50 text-slate-500">Pendiente HES</Badge>
               </div>
            </div>
          </div>
        </div>

        {/* Tabs and Workspace */}
        <Card className="flex-1 flex flex-col min-h-0 bg-white border-slate-200 rounded-lg shadow-sm m-6 mt-4">
          <div className="border-b border-slate-100 flex-shrink-0 bg-slate-50 px-2 pt-2">
            <nav className="flex gap-1 overflow-x-auto scroller-none">
              {tabs.map(tab => (
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
                  {tab.id === 'workflow' && <span className="ml-2 w-4 h-4 inline-flex items-center justify-center rounded bg-red-100 text-red-600 text-[9px] font-black">!</span>}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-white space-y-6">
            
            {activeTab === 'datos' && (
              <div className="max-w-4xl border border-slate-200 rounded-lg shadow-sm">
                <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                      Información de la Orden de Compra por Servicio / Cabecera
                  </div>
                </div>
                <div className="p-5 grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1">Datos Básicos</h4>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700">Descripción <span className="text-red-500">*</span></label>
                        <input type="text" readOnly={isMandante} className={`w-full mt-1 border border-slate-200 rounded p-2 text-xs focus:outline-none focus:border-copper-500 ${isMandante ? 'bg-slate-50' : ''}`} placeholder="Ej. Estado de Pago Junio 2024" defaultValue="Estado de Pago Servicios Generales - Septiembre" />
                      </div>
                      <div>
                        <label className="flex items-start gap-2 cursor-pointer mt-3">
                          <input type="checkbox" disabled={isMandante} className="mt-0.5 rounded text-copper-600 focus:ring-copper-500" />
                          <span className="text-[11px] text-slate-600">Autorizo a Minera Los Andes a realizar una retención en % para este EDP.</span>
                        </label>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700">Antecedentes</label>
                        <textarea readOnly={isMandante} className={`w-full mt-1 border border-slate-200 rounded p-2 text-xs h-16 focus:outline-none focus:border-copper-500 ${isMandante ? 'bg-slate-50' : ''}`} placeholder="Mencione antecedentes relevantes...">{isMandante ? "Se adjuntan respaldos correspondientes al mes de Septiembre 2023." : ""}</textarea>
                      </div>
                  </div>
                  
                  <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1">Información del Servicio</h4>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700">Nombre del proveedor del servicio <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full mt-1 border border-slate-200 rounded p-2 text-xs bg-slate-50 text-slate-600" value="CONSTRUCTORA NORTE" readOnly />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700">Ubicación del servicio <span className="text-red-500">*</span></label>
                        <input type="text" readOnly={isMandante} className={`w-full mt-1 border border-slate-200 rounded p-2 text-xs ${isMandante ? 'bg-slate-50' : ''}`} defaultValue="Faena Norte, Sector B" />
                      </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lineas' && (
              <div className="border border-slate-200 rounded-lg flex flex-col">
                <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50 flex-shrink-0">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                      Ítems del EDP (Líneas de servicio)
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap text-xs">
                    <thead className="bg-[#0F172A] text-white text-[10px] uppercase font-bold tracking-wide">
                      <tr>
                          <th className="px-4 py-3">Línea</th>
                          <th className="px-4 py-3">Código Servicio</th>
                          <th className="px-4 py-3">Descripción</th>
                          <th className="px-4 py-3">Cant. Contratada</th>
                          <th className="px-4 py-3">Acumulado Ant.</th>
                          <th className="px-4 py-3 border-l-2 border-[#B45309]/50 bg-white/5">Cant. Periodo</th>
                          <th className="px-4 py-3">Acumulado Act.</th>
                          <th className="px-4 py-3">P. Unitario</th>
                          <th className="px-4 py-3">Monto Línea</th>
                          <th className="px-4 py-3">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700 divide-y divide-slate-100">
                        <tr>
                          <td className="px-4 py-3 text-slate-500">001</td>
                          <td className="px-4 py-3 font-mono">SER-001</td>
                          <td className="px-4 py-3 font-bold">Instalación de Faena</td>
                          <td className="px-4 py-3 text-slate-500">1 GL</td>
                          <td className="px-4 py-3 text-slate-500">0 GL</td>
                          <td className="px-4 py-3 border-l-2 border-[#B45309]/50 bg-[#B45309]/5 font-bold text-copper-700">1 GL</td>
                          <td className="px-4 py-3 font-medium">1 GL</td>
                          <td className="px-4 py-3 font-mono text-slate-500">50,000 USD</td>
                          <td className="px-4 py-3 font-mono text-slate-500">50,000 USD</td>
                          <td className="px-4 py-3"><Badge variant="success">OK</Badge></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-slate-500">002</td>
                          <td className="px-4 py-3 font-mono">SER-002</td>
                          <td className="px-4 py-3 font-bold">Movimiento de Tierras</td>
                          <td className="px-4 py-3 text-slate-500">10,000 M3</td>
                          <td className="px-4 py-3 text-slate-500">5,000 M3</td>
                          <td className="px-4 py-3 border-l-2 border-[#B45309]/50 bg-[#B45309]/5 font-bold text-copper-700">2,500 M3</td>
                          <td className="px-4 py-3 font-medium">7,500 M3</td>
                          <td className="px-4 py-3 font-mono text-slate-500">30 USD</td>
                          <td className="px-4 py-3 font-mono text-slate-500">75,000 USD</td>
                          <td className="px-4 py-3"><Badge variant="success">OK</Badge></td>
                        </tr>
                        <tr className="bg-red-50/50">
                          <td className="px-4 py-3 text-slate-500">003</td>
                          <td className="px-4 py-3 font-mono">SER-003</td>
                          <td className="px-4 py-3 font-bold text-red-700">Obras Civiles Menores</td>
                          <td className="px-4 py-3 text-slate-500">1 GL</td>
                          <td className="px-4 py-3 text-slate-500">0.8 GL</td>
                          <td className="px-4 py-3 border-l-2 border-[#B45309]/50 bg-red-100 text-red-700 font-bold">0.3 GL</td>
                          <td className="px-4 py-3 font-bold text-red-700">1.1 GL</td>
                          <td className="px-4 py-3 font-mono text-slate-500">124,000 USD</td>
                          <td className="px-4 py-3 font-mono text-slate-500 text-red-700 font-bold">37,200 USD</td>
                          <td className="px-4 py-3"><Badge variant="error" className="animate-pulse">Observado</Badge></td>
                        </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-3 bg-red-50 border-t border-red-200 text-sm flex items-center gap-2 text-red-800">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <div>
                    <span className="font-bold">Error en Línea 003:</span> Supera saldo disponible de ODS y la cantidad contratada acumulada (1.1 GL de 1.0 GL contratado). Se requiere modificación de contrato o corrección del cobro.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'workflow' && (
              <div className="space-y-6 max-w-4xl">
                 <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Flujo de Aprobación del EDP</h3>
                 <div className="relative flex justify-between items-center w-full px-2 mt-8">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full"></div>
                    <div className="absolute top-1/2 left-0 w-[42%] h-1 bg-green-500 -translate-y-1/2 z-0 rounded-full"></div>
                    
                    {[
                      { label: 'Proveedor crea EDP', status: 'completed' },
                      { label: 'Enviado a AdC', status: 'completed' },
                      { label: 'Revisión ITO/OTC', status: 'completed' },
                      { label: 'Revisión Back Office', status: 'error' },
                      { label: 'Aprobación AdC', status: 'pending' },
                      { label: 'Liberación', status: 'pending' },
                      { label: 'Visación HES', status: 'pending' },
                      { label: 'Enviado a pago', status: 'pending' }
                    ].map((step, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center">
                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white shadow-sm
                              ${step.status === 'completed' ? 'border-green-500 bg-green-500 text-white' : ''}
                              ${step.status === 'error' ? 'border-red-500 bg-red-100 text-red-600 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : ''}
                              ${step.status === 'pending' ? 'border-slate-300' : ''}
                           `}>
                              {step.status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                              {step.status === 'error' && <AlertTriangle className="w-3.5 h-3.5" />}
                              {step.status === 'pending' && <span className="w-2 h-2 rounded-full bg-slate-200"></span>}
                           </div>
                           <span className={`text-[10px] font-bold tracking-tight text-center absolute top-8 w-24
                              ${step.status === 'completed' ? 'text-slate-600' : ''}
                              ${step.status === 'error' ? 'text-red-600' : ''}
                              ${step.status === 'pending' ? 'text-slate-400' : ''}
                           `}>
                              {step.label}
                           </span>
                        </div>
                    ))}
                 </div>
                 
                 <div className="h-10 mt-10"></div>
                 
                 <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                    <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center border border-red-200 shadow-sm">
                          <span className="font-bold text-red-600 text-xs">BO</span>
                       </div>
                       <div className="space-y-2">
                          <div className="flex items-center gap-2">
                             <h4 className="font-bold text-slate-800">Back Office de Contratos</h4>
                             <Badge variant="error">Observado</Badge>
                             <span className="text-xs text-slate-500 ml-auto">Hace 2 horas</span>
                          </div>
                          <p className="text-sm text-slate-600 bg-white p-3 rounded border border-red-100 shadow-sm">
                             "Se observa el EDP debido a que la Línea 003 supera el saldo disponible actual de la Orden de Servicio. 
                             Además, se revisó el Certificado Laboral F30-1 adjunto y corresponde al mes anterior, no a Septiembre 2023."
                          </p>
                          <div className="flex gap-2 pt-2 text-xs">
                             <Button variant="outline" className="border-slate-300 text-slate-600 h-7" onClick={() => setActiveTab('lineas')}>Revisar Líneas</Button>
                             <Button variant="outline" className="border-slate-300 text-slate-600 h-7" onClick={() => setActiveTab('adjuntos')}>Revisar Adjuntos</Button>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'hes' && (
              <div className="space-y-6 max-w-4xl">
                 <div className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
                    <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                       <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <CheckCircle2 className="w-5 h-5 text-slate-500" />
                          Generación y Visación de HES (Integración SAP S/4HANA)
                       </div>
                    </div>
                    
                    <div className="p-6 space-y-6">
                       {/* Timeline de HES */}
                       <div className="relative flex justify-between items-center w-full px-2 mb-8">
                          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full"></div>
                          
                          {[
                            { label: 'EDP Aprobado', status: 'completed' },
                            { label: 'Solicitud HES', status: 'current' },
                            { label: 'HES Generada', status: 'pending' },
                            { label: 'HES Visada', status: 'pending' },
                            { label: 'HES Liberada', status: 'pending' }
                          ].map((step, idx) => (
                              <div key={idx} className="relative z-10 flex flex-col items-center">
                                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center bg-white
                                    ${step.status === 'completed' ? 'border-green-500 bg-green-500 text-white' : ''}
                                    ${step.status === 'current' ? 'border-copper-500 shadow-[0_0_0_3px_rgba(180,83,9,0.1)]' : ''}
                                    ${step.status === 'pending' ? 'border-slate-300' : ''}
                                 `}>
                                    {step.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                                    {step.status === 'current' && <div className="w-2 h-2 bg-copper-600 rounded-full"></div>}
                                 </div>
                                 <span className={`text-[10px] font-bold tracking-tight text-center absolute top-7 w-20
                                    ${step.status === 'completed' ? 'text-slate-600' : ''}
                                    ${step.status === 'current' ? 'text-copper-700' : ''}
                                    ${step.status === 'pending' ? 'text-slate-400' : ''}
                                 `}>
                                    {step.label}
                                 </span>
                              </div>
                          ))}
                       </div>
                       
                       <div className="grid grid-cols-2 gap-6 bg-slate-50 border border-slate-200 p-5 rounded-lg">
                          <div>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Estado de la Integración</p>
                             <div className="flex items-center gap-2">
                                <Badge variant="warning">Pendiente de generación</Badge>
                             </div>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 mt-4">Sistema Destino</p>
                             <p className="text-sm font-bold text-slate-800">SAP S/4HANA (PRD)</p>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 mt-4">Método</p>
                             <p className="text-sm font-medium text-slate-600 font-mono">API / SAP Cloud Integration</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Último Mensaje de SAP</p>
                             <div className="bg-red-50 border border-red-200 p-3 rounded text-xs text-red-800 flex items-start gap-2 shadow-sm">
                                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                                <div>
                                   <strong className="block mb-1">Error Funcional SAP S/4HANA</strong>
                                   Centro de costo (CECO) no informado o inactivo para la Línea 002.
                                </div>
                             </div>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 mt-4">Acción sugerida</p>
                             <p className="text-xs text-slate-700 bg-white border border-slate-200 p-2 rounded">Completar la imputación de la línea 002 en los Datos Generales antes de reintentar la integración.</p>
                          </div>
                       </div>
                       
                       <div className="flex flex-wrap gap-3 pt-2">
                          <Button onClick={() => simulateAction('Reintentar SAP', 'Solicitud reenviada a SAP. Procesando en background.')} className="bg-copper-600 hover:bg-copper-700 text-white font-bold gap-2 shadow-md">
                             <Send className="w-4 h-4" /> Reintentar Integración
                          </Button>
                          <Button variant="outline" onClick={() => simulateAction('Registrar HES', 'HES manual vinculada exitosamente al EDP.')} className="bg-white border-slate-300 font-bold gap-2">
                             <FileText className="w-4 h-4 text-slate-500" /> Registrar HES Manual
                          </Button>
                          <Button variant="outline" className="bg-white border-slate-300 font-bold gap-2">
                             <Search className="w-4 h-4 text-slate-500" /> Ver Log Técnico
                          </Button>
                       </div>
                    </div>
                 </div>
              </div>
            )}
            
            {activeTab === 'historial' && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded flex flex-col items-center">
                 Historial de Cambios (Mock)
              </div>
            )}
            
            {activeTab === 'adjuntos' && (
              <div className="h-full flex flex-col space-y-4">
                 
                 <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                       <h4 className="text-sm font-bold text-amber-800">Acción Requerida</h4>
                       <p className="text-xs text-amber-700 mt-1">Existe 1 adjunto observado que impide avanzar a aprobación AdC.</p>
                    </div>
                 </div>

                 <div className="flex justify-between items-center px-1">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Documentación Complementaria</h3>
                 </div>
                 
                 <div className="flex-1 overflow-x-auto border border-slate-200 rounded-lg bg-white shadow-sm">
                    <table className="w-full text-left whitespace-nowrap min-w-max">
                       <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wide sticky top-0 z-10 border-b border-slate-200">
                          <tr>
                             <th className="px-4 py-3">Documento</th>
                             <th className="px-4 py-3">Tipo</th>
                             <th className="px-4 py-3 text-center">Versión</th>
                             <th className="px-4 py-3">Estado</th>
                             <th className="px-4 py-3">Fecha Carga</th>
                             <th className="px-4 py-3">Responsable</th>
                             <th className="px-4 py-3 text-center">Obligatorio</th>
                             <th className="px-4 py-3 text-center">Lectura IA</th>
                             <th className="px-4 py-3">Observación</th>
                             <th className="px-4 py-3 text-right sticky right-0 bg-slate-50 border-l border-slate-200">Acción</th>
                          </tr>
                       </thead>
                       <tbody className="text-xs text-slate-700 divide-y divide-slate-100 font-medium whitespace-normal">
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap">Respaldo avance físico septiembre</td>
                             <td className="px-4 py-3 whitespace-nowrap">Técnico</td>
                             <td className="px-4 py-3 text-center whitespace-nowrap">v1</td>
                             <td className="px-4 py-3 whitespace-nowrap"><Badge variant="success">Aprobado</Badge></td>
                             <td className="px-4 py-3 whitespace-nowrap">20/09/2023</td>
                             <td className="px-4 py-3 whitespace-nowrap">Proveedor</td>
                             <td className="px-4 py-3 text-center whitespace-nowrap"><CheckCircle2 className="w-4 h-4 text-slate-400 mx-auto" /></td>
                             <td className="px-4 py-3 text-center whitespace-nowrap"><CheckCircle2 className="w-4 h-4 text-copper-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-slate-500 min-w-[200px]">—</td>
                             <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50">
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Ver</button>
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Descargar</button>
                                <button className="text-copper-500 hover:text-copper-700 font-bold"><Sparkles className="w-3 h-3 inline mr-1" /> IA</button>
                             </td>
                          </tr>
                          <tr className="bg-red-50/30 hover:bg-red-50/50">
                             <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap">Certificado Laboral F30-1</td>
                             <td className="px-4 py-3 whitespace-nowrap">Laboral</td>
                             <td className="px-4 py-3 text-center whitespace-nowrap">v1</td>
                             <td className="px-4 py-3 whitespace-nowrap"><Badge variant="error">Observado</Badge></td>
                             <td className="px-4 py-3 whitespace-nowrap">21/09/2023</td>
                             <td className="px-4 py-3 whitespace-nowrap">Proveedor</td>
                             <td className="px-4 py-3 text-center whitespace-nowrap"><CheckCircle2 className="w-4 h-4 text-slate-400 mx-auto" /></td>
                             <td className="px-4 py-3 text-center whitespace-nowrap"><CheckCircle2 className="w-4 h-4 text-copper-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-red-600 font-bold min-w-[200px]">Documento corresponde a agosto, no septiembre</td>
                             <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap sticky right-0 bg-red-50/30 group-hover:bg-red-50/50 border-l border-slate-100">
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Ver</button>
                                <button className="text-copper-600 hover:text-copper-700 font-bold">Nueva versión</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap">Informe de servicios ejecutados</td>
                             <td className="px-4 py-3 whitespace-nowrap">Técnico</td>
                             <td className="px-4 py-3 text-center whitespace-nowrap">v2</td>
                             <td className="px-4 py-3 whitespace-nowrap"><Badge variant="warning">En revisión</Badge></td>
                             <td className="px-4 py-3 whitespace-nowrap">22/09/2023</td>
                             <td className="px-4 py-3 whitespace-nowrap">Proveedor</td>
                             <td className="px-4 py-3 text-center whitespace-nowrap"><CheckCircle2 className="w-4 h-4 text-slate-400 mx-auto" /></td>
                             <td className="px-4 py-3 text-center whitespace-nowrap"><XCircle className="w-4 h-4 text-slate-200 mx-auto" /></td>
                             <td className="px-4 py-3 text-slate-500 min-w-[200px]">—</td>
                             <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50 border-l border-slate-100">
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Ver</button>
                                <button className="text-green-600 hover:text-green-700 font-bold">Aprobar</button>
                                <button className="text-red-500 hover:text-red-700 font-bold">Observar</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap">Acta de conformidad ITO</td>
                             <td className="px-4 py-3 whitespace-nowrap">Aprobación</td>
                             <td className="px-4 py-3 text-center whitespace-nowrap">v1</td>
                             <td className="px-4 py-3 whitespace-nowrap"><Badge variant="outline">Pendiente</Badge></td>
                             <td className="px-4 py-3 whitespace-nowrap">—</td>
                             <td className="px-4 py-3 whitespace-nowrap">ITO/OTC</td>
                             <td className="px-4 py-3 text-center whitespace-nowrap"><CheckCircle2 className="w-4 h-4 text-slate-400 mx-auto" /></td>
                             <td className="px-4 py-3 text-center whitespace-nowrap"><XCircle className="w-4 h-4 text-slate-200 mx-auto" /></td>
                             <td className="px-4 py-3 text-slate-500 min-w-[200px]">A la espera de revisión técnica</td>
                             <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50 border-l border-slate-100">
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Recordatorio</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50 text-slate-400">
                             <td className="px-4 py-3 font-bold whitespace-nowrap">Fotografía de avance</td>
                             <td className="px-4 py-3 whitespace-nowrap">Evidencia</td>
                             <td className="px-4 py-3 text-center whitespace-nowrap">v1</td>
                             <td className="px-4 py-3 whitespace-nowrap"><Badge variant="default" className="bg-slate-100 text-slate-500">Cargado</Badge></td>
                             <td className="px-4 py-3 whitespace-nowrap">20/09/2023</td>
                             <td className="px-4 py-3 whitespace-nowrap">Proveedor</td>
                             <td className="px-4 py-3 text-center whitespace-nowrap"><XCircle className="w-4 h-4 text-slate-200 mx-auto" /></td>
                             <td className="px-4 py-3 text-center whitespace-nowrap"><CheckCircle2 className="w-4 h-4 text-copper-500 mx-auto" /></td>
                             <td className="px-4 py-3 min-w-[200px]">—</td>
                             <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50 border-l border-slate-100">
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Ver</button>
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Descargar</button>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>
            )}

          </div>
        </Card>

        {/* Floating Action Bar */}
        <div className="bg-white border-t border-slate-200 p-4 shrink-0 flex items-center justify-between shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-20">
           {isMandante ? (
              <>
                 <div className="flex gap-3">
                    <Button onClick={() => simulateAction('Reasignar Revisión', 'EDP reasignado.')} variant="outline" className="border-slate-300 font-bold hover:bg-slate-50">
                       Reasignar
                    </Button>
                    <Button onClick={() => simulateAction('Devolver', 'EDP devuelto.')} variant="outline" className="border-slate-300 font-bold hover:bg-slate-50">
                       Devolver a Proveedor
                    </Button>
                    <Button onClick={() => setShowAIPanel(true)} variant="outline" className="border-copper-200 text-copper-700 font-bold hover:bg-copper-50 gap-2">
                       <Sparkles className="w-4 h-4" /> Consultar IA
                    </Button>
                 </div>
                 <div className="flex gap-3">
                    <Button onClick={() => simulateAction('Solicitar Corrección', 'Corrección solicitada al administrador.')} variant="danger" className="gap-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 font-bold shadow-none">
                      <AlertTriangle className="w-4 h-4" /> Solicitar Corrección
                    </Button>
                    <Button onClick={() => simulateAction('Aprobar EDP', 'Estado de Pago aprobado exitosamente. Avanzará a Liberación.')} className="gap-2 bg-green-600 hover:bg-green-700 font-bold px-6 border-none shadow-md text-white">
                       <Check className="w-4 h-4" /> Aprobar EDP
                    </Button>
                 </div>
              </>
           ) : (
              <>
                 <Button onClick={() => simulateAction('Descartar Borrador', 'Borrador descartado exitosamente.')} variant="danger" className="gap-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 font-bold shadow-none">
                   <Trash2 className="w-4 h-4" /> Borrar ODS / Descartar
                 </Button>
                 <div className="flex gap-3">
                    <Button onClick={() => simulateAction('Guardar', 'Borrador guardado exitosamente.')} variant="outline" className="gap-2 border-slate-300 font-bold hover:bg-slate-50">
                       <Save className="w-4 h-4 text-slate-500" /> Guardar Borrador
                    </Button>
                    <Button onClick={() => simulateAction('Enviar a Mandante', 'EDP emitido y enviado a revisión del Mandante.')} className="gap-2 bg-[#1E293B] hover:bg-[#0F172A] font-bold px-6 border-none shadow-md">
                       <Send className="w-4 h-4" /> Enviar a Procesar
                    </Button>
                 </div>
              </>
           )}
        </div>
      </div>

      {/* Faros AI Agent Contextual Panel */}
      {showAIPanel && (
         <div className="w-80 flex-shrink-0 border-l border-slate-200 bg-white flex flex-col shadow-[-5px_0_15px_rgba(0,0,0,0.03)] z-20">
            <div className="p-4 bg-[#0F172A] text-white flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-copper-400" />
                  <span className="font-bold text-sm">Faros AI Agent</span>
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
                  <div className="bg-white p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-sm text-xs text-slate-700 leading-relaxed">
                     <p>¡Hola! Estoy analizando este Estado de Pago.</p>
                     <p className="mt-2 text-slate-700 font-bold bg-amber-50 p-2 rounded border border-amber-100">
                        {isMandante 
                          ? "El respaldo de avance físico concuerda con las cantidades cobradas (95% de confianza)." 
                          : "Parece que falta adjuntar el Respaldo de Avance Físico necesario para las líneas cobradas."
                        }
                     </p>
                     <p className="mt-2 font-medium">¿Deseas que audite el documento contra las líneas?</p>
                  </div>
               </div>

               {/* Acciones sugeridas */}
               <div className="pl-11 space-y-2">
                  <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                     <FileCheck className="w-3 h-3 text-copper-500" /> Auditar montos vs. adjuntos
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                     <AlertTriangle className="w-3 h-3 text-copper-500" /> Detectar inconsistencias
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                     <Sparkles className="w-3 h-3 text-copper-500" /> Extraer cantidades desde PDF
                  </button>
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
