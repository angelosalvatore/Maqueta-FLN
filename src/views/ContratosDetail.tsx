import React, { useState } from 'react';
import { Card, Badge, Button } from '../components/ui';
import { 
  ArrowLeft,
  Bot,
  ShieldAlert,
  Building2,
  Users,
  FileCheck,
  Sparkles,
  FileText,
  AlertTriangle,
  Search,
  ChevronRight,
  X,
  History,
  GitCommit,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Lock,
  Upload,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { ViewMode } from '../types';

export function ContratosDetail({ id, onNavigate, onOpenAI, mode }: { id: string, onNavigate: (path: string) => void, onOpenAI: (context: string) => void, mode: ViewMode }) {
  const [activeTab, setActiveTab] = useState('resumen');
  const [showAIPanel, setShowAIPanel] = useState(true);
  const [showObservationPanel, setShowObservationPanel] = useState(false);

  const tabs = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'documentos', label: 'Documentos Obligatorios' },
    { id: 'versiones', label: 'Versiones' },
    { id: 'liberadores', label: 'Liberadores' },
    { id: 'modificaciones', label: 'Modificaciones' },
    { id: 'edp', label: 'EDP Asociados' },
    { id: 'historial', label: 'Historial' },
    { id: 'agente', label: 'Agente IA' }
  ];

  return (
    <div className="flex-1 flex overflow-hidden bg-[#F1F5F9]">
      <div className="flex-1 flex flex-col p-6 space-y-4 overflow-hidden">
        
        {/* Header Fijo */}
        <div className="flex items-start justify-between gap-4 flex-shrink-0 bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex gap-4">
            <button onClick={() => onNavigate('contratos')} className="p-2 h-fit mt-1 hover:bg-slate-100 bg-slate-50 border border-slate-200 rounded transition-colors text-slate-500 shadow-sm">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-slate-100 text-slate-500 font-mono tracking-widest text-[10px]">CT-2024-001</Badge>
                <h1 className="text-lg font-bold text-slate-800 tracking-tight">Servicios de Mantención Planta Chancado</h1>
                <Badge variant="success" className="uppercase tracking-widest text-[10px]">Vigente</Badge>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-slate-400" /> Proveedor: Servicios Mineros Alpha</div>
                <div className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-slate-400" /> Mandante: Minera Los Andes</div>
                <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-400" /> AdC: Roberto Torres</div>
                <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-400" /> ITO/OTC: Ana Sepúlveda</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            {!showAIPanel && (
               <Button onClick={() => setShowAIPanel(true)} className="gap-2 bg-[#0F172A] text-white hover:bg-slate-800 shadow-md">
                 <Bot className="w-4 h-4 text-copper-400" /> <span className="font-bold">Faros AI Agent</span>
               </Button>
            )}
            <div className="flex gap-2">
               <Badge variant="error" className="flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Riesgo IA: Alto</Badge>
               <Badge variant="warning" className="flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Doc. Vencidos</Badge>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex-shrink-0 relative">
           <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
           <div className="absolute top-1/2 left-8 right-1/2 h-0.5 bg-green-500 -translate-y-1/2 z-0"></div>
           
           {[
             { label: 'Creado', status: 'completed' },
             { label: 'En revisión', status: 'completed' },
             { label: 'Pendiente firma', status: 'completed' },
             { label: 'Vigente', status: 'current' },
             { label: 'Próximo a vencer', status: 'pending' },
             { label: 'Cerrado', status: 'pending' }
           ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                 <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    step.status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                    step.status === 'current' ? 'bg-white border-green-500 text-green-500' :
                    'bg-white border-slate-200 text-slate-300'
                 }`}>
                    {step.status === 'completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : 
                     step.status === 'current' ? <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div> : 
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>}
                 </div>
                 <span className={`text-[10px] font-bold uppercase tracking-wide ${
                    step.status === 'completed' ? 'text-slate-600' :
                    step.status === 'current' ? 'text-green-700' :
                    'text-slate-400'
                 }`}>{step.label}</span>
              </div>
           ))}
        </div>

        <Card className="flex-1 flex flex-col min-h-0 bg-white border-slate-200 rounded-lg shadow-sm">
          {/* Navigation Tabs */}
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
                  {tab.id === 'documentos' && <span className="ml-2 w-4 h-4 inline-flex items-center justify-center rounded bg-red-100 text-red-600 text-[9px] font-black">1</span>}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            
            {activeTab === 'resumen' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                <div className="lg:col-span-3 space-y-6">
                  <div>
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Resumen Financiero y Operativo</h3>
                      
                      <div className="grid grid-cols-4 gap-4 mb-4">
                         <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monto Contratado</p>
                            <p className="text-xl font-black text-slate-700 mt-1">2,500,000 <span className="text-xs text-slate-400 font-bold">USD</span></p>
                         </div>
                         <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monto Ejecutado</p>
                            <p className="text-xl font-black text-slate-700 mt-1">1,200,000 <span className="text-xs text-slate-400 font-bold">USD</span></p>
                         </div>
                         <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saldo Disponible</p>
                            <p className="text-xl font-black text-slate-700 mt-1">1,300,000 <span className="text-xs text-slate-400 font-bold">USD</span></p>
                         </div>
                         <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Próximo Vencimiento</p>
                            <p className="text-xl font-black text-slate-700 mt-1">30/12/2025</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                         <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                            <div>
                               <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Doc. Vigentes</p>
                               <p className="text-2xl font-black text-green-700 mt-1">8</p>
                            </div>
                            <FileCheck className="w-8 h-8 text-green-200" />
                         </div>
                         <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
                            <div>
                               <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Doc. Vencidos</p>
                               <p className="text-2xl font-black text-red-700 mt-1">1</p>
                            </div>
                            <ShieldAlert className="w-8 h-8 text-red-200" />
                         </div>
                         <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                            <div>
                               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">EDP Asociados</p>
                               <p className="text-2xl font-black text-slate-700 mt-1">14</p>
                            </div>
                            <FileText className="w-8 h-8 text-slate-200" />
                         </div>
                      </div>

                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 text-red-800 text-sm shadow-sm">
                     <ShieldAlert className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                     <div>
                        <p className="font-bold text-red-700 mb-1">Bloqueo de Estado de Pago Activo</p>
                        <p className="text-xs text-red-600">Este contrato presenta bloqueos de pago debido a que posee documentos obligatorios vencidos (Seguro de Responsabilidad Civil). El proveedor no podrá enviar nuevos EDP a revisión.</p>
                     </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border hover:border-slate-300 transition-colors border-slate-200 rounded-lg p-4 bg-white shadow-sm flex items-center justify-between cursor-pointer" onClick={() => setActiveTab('documentos')}>
                      <div>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Documentos Obl.</span>
                         <div className="text-lg font-black text-slate-700 mt-1 flex items-center gap-2">
                           8 / 9 <Badge variant="error" className="h-5">1 Vencido</Badge>
                         </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                   </div>
                   <div className="border hover:border-slate-300 transition-colors border-slate-200 rounded-lg p-4 bg-white shadow-sm flex items-center justify-between cursor-pointer" onClick={() => setActiveTab('edp')}>
                      <div>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">EDP Asociados</span>
                         <div className="text-lg font-black text-slate-700 mt-1">14 Emitidos</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                   </div>
                   <div className="border hover:border-slate-300 transition-colors border-slate-200 rounded-lg p-4 bg-white shadow-sm flex items-center justify-between cursor-pointer" onClick={() => setActiveTab('modificaciones')}>
                      <div>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modificaciones</span>
                         <div className="text-lg font-black text-slate-700 mt-1">2 Adendas</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'documentos' && (
              <div className="flex gap-6 h-full">
                 <div className="flex-1 flex flex-col border border-slate-200 rounded-lg bg-white overflow-hidden">
                    <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center flex-shrink-0">
                       <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <FileCheck className="w-4 h-4 text-slate-500" />
                          Documentos Obligatorios del Contrato
                       </div>
                       <Button variant="outline" size="sm" className="h-8 text-xs font-bold gap-2">
                          <Upload className="w-3.5 h-3.5" /> Subir Documento
                       </Button>
                    </div>
                    <div className="flex-1 overflow-auto">
                       <table className="w-full text-left whitespace-nowrap min-w-max">
                          <thead className="bg-[#0F172A] text-white text-[10px] uppercase font-bold tracking-wide sticky top-0 z-10">
                             <tr>
                                <th className="px-4 py-3 sticky left-0 bg-[#0F172A] z-20">Documento</th>
                                <th className="px-4 py-3">Tipo Documental</th>
                                <th className="px-4 py-3 text-center">Oblig.</th>
                                <th className="px-4 py-3">Periodicidad</th>
                                <th className="px-4 py-3">Estado</th>
                                <th className="px-4 py-3">Vencimiento</th>
                                <th className="px-4 py-3">Resp. Carga</th>
                                <th className="px-4 py-3">Resp. Revisión</th>
                                <th className="px-4 py-3 text-center">Bloq. Contrato</th>
                                <th className="px-4 py-3 text-center">Bloq. EDP</th>
                                <th className="px-4 py-3 text-center">IA</th>
                                <th className="px-4 py-3">Versión</th>
                                <th className="px-4 py-3 text-center">Acción</th>
                             </tr>
                          </thead>
                          <tbody className="text-[11px] text-slate-700 divide-y divide-slate-100 font-medium">
                             {[
                                { name: "Contrato Firmado", type: "Legal", req: true, freq: "Única vez", est: "Aprobado", estC: "success", venc: "No vence", rc: "Mandante", rr: "Mandante", bc: true, be: true, ia: true, ver: "v1.0" },
                                { name: "Boleta de Garantía", type: "Financiero", req: true, freq: "Anual", est: "Vigente", estC: "success", venc: "En 45 días", rc: "Proveedor", rr: "Admin. Contrato", bc: false, be: true, ia: true, ver: "v2.0" },
                                { name: "Seguro de Responsabilidad Civil", type: "Financiero", req: true, freq: "Anual", est: "Vencido", estC: "error", venc: "Hace 15 días", rc: "Proveedor", rr: "Prevención Riesgos", bc: false, be: true, ia: true, ver: "v1.2", rowHighlight: true },
                                { name: "Certificado Laboral F30-1", type: "Laboral", req: true, freq: "Mensual", est: "Observado", estC: "warning", venc: "30/06/2024", rc: "Proveedor", rr: "RRHH", bc: false, be: true, ia: true, ver: "v8.0" },
                                { name: "Anexo Técnico", type: "Técnico", req: true, freq: "Única vez", est: "Aprobado", estC: "success", venc: "No vence", rc: "Mandante", rr: "Mandante", bc: false, be: false, ia: true, ver: "v1.1" },
                                { name: "Adenda N°1", type: "Legal", req: false, freq: "A demanda", est: "En revisión", estC: "info", venc: "No aplica", rc: "Admin. Contrato", rr: "Legal", bc: false, be: false, ia: true, ver: "v0.9" }
                             ].map((doc, i) => (
                                <tr key={i} className={`transition-colors ${doc.rowHighlight ? 'bg-red-50/30 hover:bg-red-50/50' : 'hover:bg-slate-50'}`}>
                                   <td className={`px-4 py-3 sticky left-0 font-bold flex items-center gap-2 z-10 ${doc.rowHighlight ? 'bg-white/50 text-red-800 border-l-[3px] border-l-red-500' : 'bg-white text-slate-800'}`}>
                                      <FileText className={`w-3.5 h-3.5 ${doc.rowHighlight ? 'text-red-400' : 'text-slate-400'}`}/> {doc.name}
                                   </td>
                                   <td className="px-4 py-3 text-slate-500">{doc.type}</td>
                                   <td className="px-4 py-3 text-center">{doc.req ? <CheckCircle2 className="w-4 h-4 mx-auto text-green-500" /> : '-'}</td>
                                   <td className="px-4 py-3">{doc.freq}</td>
                                   <td className="px-4 py-3"><Badge variant={doc.estC as any} className={doc.est === 'Vencido' ? 'animate-pulse' : ''}>{doc.est}</Badge></td>
                                   <td className={`px-4 py-3 ${doc.est === 'Vencido' ? 'font-mono text-red-600 font-bold' : doc.est === 'Vigente' && doc.venc.includes('días') ? 'font-mono text-amber-600 font-bold' : 'text-slate-400'}`}>{doc.venc}</td>
                                   <td className="px-4 py-3">{doc.rc}</td>
                                   <td className="px-4 py-3">{doc.rr}</td>
                                   <td className="px-4 py-3 text-center">{doc.bc ? <Lock className="w-3.5 h-3.5 mx-auto text-slate-400" /> : '-'}</td>
                                   <td className="px-4 py-3 text-center">{doc.be ? <Lock className={`w-3.5 h-3.5 mx-auto ${doc.est === 'Vencido' ? 'text-red-500' : doc.est === 'Observado' ? 'text-amber-500' : 'text-slate-400'}`} /> : '-'}</td>
                                   <td className="px-4 py-3 text-center">{doc.ia ? <Bot className="w-4 h-4 mx-auto text-copper-500" /> : '-'}</td>
                                   <td className="px-4 py-3 text-slate-500 font-mono">{doc.ver}</td>
                                   <td className="px-4 py-3 text-center">
                                      <div className="flex justify-center gap-2">
                                         <button onClick={() => setShowObservationPanel(true)} className="text-amber-600 hover:text-amber-700 font-bold text-[10px] hover:underline" title="Observar">Obs.</button>
                                         <button className="text-copper-600 hover:text-copper-700 font-bold text-[10px] hover:underline" title="Opciones">Acción</button>
                                      </div>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>

                 {/* Panel de observación documental */}
                 {showObservationPanel && (
                 <div className="w-80 flex-shrink-0 bg-white border border-slate-200 rounded-lg shadow-xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right-8 duration-200">
                    <div className="p-4 bg-red-50 border-b border-red-100 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <ShieldAlert className="w-5 h-5 text-red-600" />
                          <span className="font-bold text-sm text-red-800">Causal de Bloqueo</span>
                       </div>
                       <button onClick={() => setShowObservationPanel(false)} className="text-red-400 hover:text-red-600"><X className="w-4 h-4"/></button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-5 space-y-5">
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Documento Observado</p>
                          <p className="text-sm font-bold text-slate-800">Seguro de Responsabilidad Civil</p>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Motivo</p>
                             <Badge variant="error">Documento Vencido</Badge>
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Severidad</p>
                             <div className="flex items-center gap-1 text-red-600 text-xs font-bold"><AlertTriangle className="w-3.5 h-3.5" /> Crítica</div>
                          </div>
                       </div>
                       
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Comentario de Revisión</p>
                          <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-700 italic">
                             "Debe cargar póliza vigente antes de enviar nuevo EDP. El seguro actual venció el mes pasado."
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Responsable</p>
                             <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700"><Building2 className="w-3.5 h-3.5 text-slate-400" /> Proveedor</div>
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fecha Límite</p>
                             <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600"><Clock className="w-3.5 h-3.5" /> 3 días</div>
                          </div>
                       </div>
                       
                       <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                          <Button className="w-full justify-center bg-slate-800 hover:bg-slate-900 text-white gap-2 font-bold text-xs"><Upload className="w-3.5 h-3.5" /> Cargar nueva versión</Button>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                             <Button variant="outline" className="w-full justify-center gap-2 font-bold text-[10px] border-slate-200 text-slate-600 hover:bg-slate-50 h-8"><Eye className="w-3 h-3" /> Observar</Button>
                             <Button variant="outline" className="w-full justify-center gap-2 font-bold text-[10px] border-green-200 text-green-700 hover:bg-green-50 h-8"><CheckCircle2 className="w-3 h-3" /> Aprobar</Button>
                          </div>
                          <Button variant="outline" className="w-full justify-center gap-2 font-bold text-[10px] border-red-200 text-red-600 hover:bg-red-50 h-8 mt-1"><X className="w-3 h-3" /> Rechazar</Button>
                          <Button variant="outline" className="w-full justify-center gap-2 font-bold text-[10px] border-copper-200 text-copper-700 hover:bg-copper-50 h-8 mt-2 shadow-sm"><Sparkles className="w-3 h-3" /> Comparar versiones con IA</Button>
                       </div>
                    </div>
                 </div>
                 )}
              </div>
            )}

            {activeTab === 'versiones' && (
               <div className="h-full flex flex-col">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Versiones Contractuales y Documentales</h3>
                    <Button className="bg-copper-600 hover:bg-copper-700 text-white font-bold text-xs gap-2">Comparar versiones</Button>
                 </div>
                 <div className="flex-1 overflow-auto border border-slate-200 rounded-lg bg-white">
                    <table className="w-full text-left whitespace-nowrap min-w-max">
                       <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wide sticky top-0 z-10 border-b border-slate-200">
                          <tr>
                             <th className="px-4 py-3">ID Versión</th>
                             <th className="px-4 py-3">Tipo</th>
                             <th className="px-4 py-3">Documento / Cambio</th>
                             <th className="px-4 py-3 text-center">Versión</th>
                             <th className="px-4 py-3">Estado</th>
                             <th className="px-4 py-3">Fecha Carga</th>
                             <th className="px-4 py-3">Responsable</th>
                             <th className="px-4 py-3">Motivo del Cambio</th>
                             <th className="px-4 py-3">Vigente</th>
                             <th className="px-4 py-3 text-right">Acción</th>
                          </tr>
                       </thead>
                       <tbody className="text-xs text-slate-700 divide-y divide-slate-100 font-medium">
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-mono font-bold text-slate-500">V-1004</td>
                             <td className="px-4 py-3">Contrato</td>
                             <td className="px-4 py-3"><span className="font-bold text-slate-800">Contrato firmado</span></td>
                             <td className="px-4 py-3 text-center">v1</td>
                             <td className="px-4 py-3"><Badge variant="success">Vigente</Badge></td>
                             <td className="px-4 py-3">15/05/2024</td>
                             <td className="px-4 py-3">Minera Los Andes (Mandante)</td>
                             <td className="px-4 py-3 text-slate-500">Original firmado</td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Ver</button>
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Descargar</button>
                                <button className="text-copper-500 hover:text-copper-700 font-bold">Comparar con IA</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-mono font-bold text-slate-500">V-1005</td>
                             <td className="px-4 py-3">Adenda</td>
                             <td className="px-4 py-3"><span className="font-bold text-slate-800">Adenda N°1</span></td>
                             <td className="px-4 py-3 text-center">v1</td>
                             <td className="px-4 py-3"><Badge variant="warning">En revisión</Badge></td>
                             <td className="px-4 py-3">28/05/2024</td>
                             <td className="px-4 py-3">Legal</td>
                             <td className="px-4 py-3 text-slate-500">Extensión de plazo 30 días</td>
                             <td className="px-4 py-3 text-center"><XCircle className="w-4 h-4 text-slate-300 mx-auto" /></td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Ver</button>
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Descargar</button>
                                <button className="text-copper-500 hover:text-copper-700 font-bold">Comparar con IA</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-mono font-bold text-slate-500">V-1006</td>
                             <td className="px-4 py-3">Anexo</td>
                             <td className="px-4 py-3"><span className="font-bold text-slate-800">Anexo técnico</span></td>
                             <td className="px-4 py-3 text-center">v2</td>
                             <td className="px-4 py-3"><Badge variant="success">Vigente</Badge></td>
                             <td className="px-4 py-3">01/06/2024</td>
                             <td className="px-4 py-3">Admin. Contrato</td>
                             <td className="px-4 py-3 text-slate-500">Actualización especificaciones</td>
                             <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Ver</button>
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Descargar</button>
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Historial</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-mono font-bold text-slate-500">V-1002</td>
                             <td className="px-4 py-3">Documento</td>
                             <td className="px-4 py-3"><span className="font-bold text-slate-800">Seguro responsabilidad civil</span></td>
                             <td className="px-4 py-3 text-center">v3</td>
                             <td className="px-4 py-3"><Badge variant="error">Vencido/Reemplazado</Badge></td>
                             <td className="px-4 py-3">10/01/2024</td>
                             <td className="px-4 py-3">Proveedor</td>
                             <td className="px-4 py-3 text-slate-500">Carga anual</td>
                             <td className="px-4 py-3 text-center"><XCircle className="w-4 h-4 text-slate-300 mx-auto" /></td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Ver</button>
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Descargar</button>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
               </div>
            )}

            {activeTab === 'liberadores' && (
               <div className="h-full flex flex-col">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Liberadores y Aprobadores</h3>
                 </div>
                 <div className="flex-1 overflow-auto border border-slate-200 rounded-lg bg-white">
                    <table className="w-full text-left whitespace-nowrap min-w-max">
                       <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wide sticky top-0 z-10 border-b border-slate-200">
                          <tr>
                             <th className="px-4 py-3">Rol</th>
                             <th className="px-4 py-3">Nombre</th>
                             <th className="px-4 py-3">Área</th>
                             <th className="px-4 py-3">Nivel de Autorización</th>
                             <th className="px-4 py-3">Condición de Activación</th>
                             <th className="px-4 py-3 text-center">Estado</th>
                             <th className="px-4 py-3 text-center">SLA</th>
                             <th className="px-4 py-3 text-right">Acción</th>
                          </tr>
                       </thead>
                       <tbody className="text-xs text-slate-700 divide-y divide-slate-100 font-medium">
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800">Administrador de Contrato</td>
                             <td className="px-4 py-3">Roberto Torres</td>
                             <td className="px-4 py-3">Operaciones</td>
                             <td className="px-4 py-3"><Badge variant="default">Nivel 1</Badge></td>
                             <td className="px-4 py-3 text-slate-500">Siempre aplica</td>
                             <td className="px-4 py-3"><Badge variant="success">Activo</Badge></td>
                             <td className="px-4 py-3 text-center">48 hrs</td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-copper-600 font-bold hover:underline">Ver detalle</button>
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Delegar</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800">ITO/OTC</td>
                             <td className="px-4 py-3">Ana Sepúlveda</td>
                             <td className="px-4 py-3">Terreno</td>
                             <td className="px-4 py-3"><Badge variant="outline">Revisión técnica</Badge></td>
                             <td className="px-4 py-3 text-slate-500">Aplica para EDP</td>
                             <td className="px-4 py-3"><Badge variant="success">Activo</Badge></td>
                             <td className="px-4 py-3 text-center">72 hrs</td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-copper-600 font-bold hover:underline">Ver detalle</button>
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Reasignar</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800">Legal</td>
                             <td className="px-4 py-3">Carolina Méndez</td>
                             <td className="px-4 py-3">Legal</td>
                             <td className="px-4 py-3"><Badge variant="outline">Contratos/adendas</Badge></td>
                             <td className="px-4 py-3 text-slate-500">Aplica en modificaciones</td>
                             <td className="px-4 py-3"><Badge variant="warning">Pendiente</Badge></td>
                             <td className="px-4 py-3 text-center">5 días</td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-copper-600 font-bold hover:underline">Ver detalle</button>
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Escalar</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-bold text-slate-800">Finanzas</td>
                             <td className="px-4 py-3">Luis Paredes</td>
                             <td className="px-4 py-3">Finanzas</td>
                             <td className="px-4 py-3"><Badge variant="default">Aprobación Final</Badge></td>
                             <td className="px-4 py-3 text-slate-500">Montos &gt; $100.000 USD</td>
                             <td className="px-4 py-3"><Badge variant="outline">Condicional</Badge></td>
                             <td className="px-4 py-3 text-center">48 hrs</td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-copper-600 font-bold hover:underline">Ver detalle</button>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
               </div>
            )}

            {activeTab === 'edp' && (
               <div className="h-full flex flex-col">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Estados de Pago Asociados</h3>
                 </div>
                 <div className="flex-1 overflow-auto border border-slate-200 rounded-lg bg-white">
                    <table className="w-full text-left whitespace-nowrap min-w-max">
                       <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wide sticky top-0 z-10 border-b border-slate-200">
                          <tr>
                             <th className="px-4 py-3">ID EDP</th>
                             <th className="px-4 py-3">Periodo</th>
                             <th className="px-4 py-3">ODS / OC</th>
                             <th className="px-4 py-3">Monto</th>
                             <th className="px-4 py-3">Estado</th>
                             <th className="px-4 py-3">Responsable Actual</th>
                             <th className="px-4 py-3">HES</th>
                             <th className="px-4 py-3">Observación</th>
                             <th className="px-4 py-3 text-right">Acción</th>
                          </tr>
                       </thead>
                       <tbody className="text-xs text-slate-700 divide-y divide-slate-100 font-medium">
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-mono font-bold text-slate-800">EDP-98122</td>
                             <td className="px-4 py-3">Septiembre 2023</td>
                             <td className="px-4 py-3 font-mono text-[10px]">ODS-2023-A4</td>
                             <td className="px-4 py-3 font-bold">$12,450.00</td>
                             <td className="px-4 py-3"><Badge variant="error" className="bg-red-50 text-red-600">Observado</Badge></td>
                             <td className="px-4 py-3">Proveedor</td>
                             <td className="px-4 py-3 text-slate-400 text-[10px]">Sin HES</td>
                             <td className="px-4 py-3 text-red-600 max-w-[200px] truncate" title="Seguro de resp. civil vencido">Seguro de resp. civil vencido</td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-copper-600 font-bold hover:underline" onClick={() => onNavigate('edp/detalle/EDP-98122')}>Ver EDP</button>
                                <button className="text-slate-400 hover:text-copper-600 font-bold"><Sparkles className="w-3 h-3 inline"/> IA</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-mono font-bold text-slate-800">EDP-98121</td>
                             <td className="px-4 py-3">Agosto 2023</td>
                             <td className="px-4 py-3 font-mono text-[10px]">ODS-2023-A4</td>
                             <td className="px-4 py-3 font-bold">$11,200.00</td>
                             <td className="px-4 py-3"><Badge variant="warning">Pendiente HES</Badge></td>
                             <td className="px-4 py-3">Back Office</td>
                             <td className="px-4 py-3 text-amber-600 text-[10px] font-bold">HES no generada</td>
                             <td className="px-4 py-3 text-slate-400">—</td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-copper-600 font-bold hover:underline" onClick={() => onNavigate('edp/detalle/EDP-98121')}>Ver EDP</button>
                                <button className="text-slate-400 hover:text-copper-600 font-bold">Historial</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-mono font-bold text-slate-800">EDP-98100</td>
                             <td className="px-4 py-3">Julio 2023</td>
                             <td className="px-4 py-3 font-mono text-[10px]">ODS-2023-A4</td>
                             <td className="px-4 py-3 font-bold">$12,000.00</td>
                             <td className="px-4 py-3"><Badge variant="success">Pagado</Badge></td>
                             <td className="px-4 py-3">Finanzas</td>
                             <td className="px-4 py-3 text-green-600 text-[10px] font-bold">HES liberada</td>
                             <td className="px-4 py-3 text-slate-400">—</td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-copper-600 font-bold hover:underline" onClick={() => onNavigate('edp/detalle/EDP-98100')}>Ver EDP</button>
                             </td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-4 py-3 font-mono font-bold text-slate-800">EDP-98088</td>
                             <td className="px-4 py-3">Junio 2023</td>
                             <td className="px-4 py-3 font-mono text-[10px]">ODS-2023-A3</td>
                             <td className="px-4 py-3 font-bold">$15,500.00</td>
                             <td className="px-4 py-3"><Badge variant="success">Aprobado</Badge></td>
                             <td className="px-4 py-3">Tesorería</td>
                             <td className="px-4 py-3 text-green-600 text-[10px] font-bold">HES liberada</td>
                             <td className="px-4 py-3 text-slate-500 text-xs">Enviado a pago</td>
                             <td className="px-4 py-3 text-right space-x-2">
                                <button className="text-copper-600 font-bold hover:underline" onClick={() => onNavigate('edp/detalle/EDP-98088')}>Ver EDP</button>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
               </div>
            )}

            {/* Placeholders */}
            {((activeTab !== 'resumen' && activeTab !== 'documentos' && activeTab !== 'versiones' && activeTab !== 'liberadores' && activeTab !== 'edp')) && (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
                 <div className="text-center">
                    <FileCheck className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">Módulo {tabs.find(t => t.id === activeTab)?.label}</p>
                    <p className="text-xs text-slate-400 mt-1">Funcionalidad simulada para alcance MVP.</p>
                 </div>
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
                     <p>¡Hola! Analizando este contrato detecté lo siguiente:</p>
                     <p className="mt-2 text-red-700 font-bold bg-red-50 p-2 rounded border border-red-100">
                        El contrato tiene 1 documento vencido que bloquea la creación de nuevos EDP: Seguro de responsabilidad civil.
                     </p>
                     <p className="mt-2 font-medium">¿En qué te puedo ayudar hoy?</p>
                  </div>
               </div>

               {/* Acciones sugeridas */}
               <div className="pl-11 space-y-2">
                  <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                     <FileText className="w-3 h-3 text-copper-500" /> Resumir contrato
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                     <Sparkles className="w-3 h-3 text-copper-500" /> Extraer obligaciones
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                     <GitPullRequest className="w-3 h-3 text-copper-500" /> Comparar versiones
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                     <Clock className="w-3 h-3 text-copper-500" /> Detectar vencimientos
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                     <ShieldAlert className="w-3 h-3 text-copper-500" /> Explicar bloqueo
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 hover:border-copper-400 hover:text-copper-700 rounded text-[11px] font-bold text-slate-600 shadow-sm transition-colors flex items-center gap-2">
                     <Sparkles className="w-3 h-3 text-copper-500" /> Preparar minuta
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
