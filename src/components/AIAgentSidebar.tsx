import React from 'react';
import { Bot, X, Sparkles, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

interface AIAgentProps {
  isOpen: boolean;
  onClose: () => void;
  context?: 'licitaciones' | 'contratos' | 'edp' | 'documental' | 'general';
  mode?: 'mandante' | 'proveedor';
}

export function AIAgentSidebar({ isOpen, onClose, context = 'general', mode = 'mandante' }: AIAgentProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[420px] bg-white border-l border-slate-200 shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-200 ease-out">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#0F172A] text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#B45309] flex items-center justify-center shadow-inner">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
               <h3 className="font-bold text-sm tracking-wide">Agente IA Faros</h3>
               <span className="bg-white/10 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest text-[#B45309]">Activo</span>
            </div>
            <p className="text-[10px] text-slate-400">
               {context === 'licitaciones' ? 'Asistente de Licitaciones' :
                context === 'contratos' ? 'Asistente Contractual' :
                context === 'edp' ? 'Asistente Financiero/EDP' :
                context === 'documental' ? 'Asistente Documental' : 'Asistente Inteligente Universal'}
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 bg-[#F1F5F9] flex flex-col gap-4">
        
        {/* Welcome Message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded bg-[#1E293B] shadow text-white flex-shrink-0 flex items-center justify-center">
            <Bot className="w-4 h-4 text-[#B45309]" />
          </div>
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs shadow-sm text-slate-700">
            <p className="font-bold mb-1">Hola, {mode === 'mandante' ? 'Juan' : 'María'}.</p>
            <p>Estoy conectado al módulo de {context}. Mis respuestas se basan estrictamente en la base de conocimiento autorizada para tu rol.</p>
          </div>
        </div>

        {/* User Query Simulation */}
        <div className="flex gap-3 flex-row-reverse mt-2">
          <div className="bg-[#B45309] p-3.5 rounded-lg text-xs text-white shadow-sm max-w-[85%] font-medium">
            <p>{
              context === 'contratos' ? "Générame un resumen de las obligaciones de cierre de la Adenda 1." :
              context === 'licitaciones' ? "Extrae los requisitos técnicos obligatorios y compáralos." :
              context === 'edp' ? "Revisa la consistencia documental de este EDP antes de mandarlo a SAP." :
              "Muéstrame un resumen de alertas críticas."
            }</p>
          </div>
        </div>

        {/* AI Response Simulation */}
        <div className="flex gap-3 mt-2">
          <div className="w-8 h-8 rounded bg-[#1E293B] shadow flex-shrink-0 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#B45309]" />
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200 text-xs shadow-sm space-y-3 w-full">
            
            {context === 'contratos' && (
              <>
                <p className="font-medium text-slate-800">Según la <span className="font-bold underline decoration-slate-300">Adenda 1 (Doc v1.2, Pág 4)</span>, las obligaciones al cierre son:</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 mt-2">
                  <li><span className="font-bold">Desmovilización:</span> Entrega de informe final de obras en terreno 15 días antes del cierre.</li>
                  <li><span className="font-bold">Laboral:</span> Firma de finiquitos del 100% del personal en faena.</li>
                  <li><span className="font-bold">Financiero:</span> Solicitud formal de devolución de Boleta de Garantía (Ref Sec. 8.2).</li>
                </ul>
                <div className="bg-slate-50 border border-slate-200 rounded p-2 mt-3 flex items-start gap-2">
                   <FileText className="w-3.5 h-3.5 text-copper-600 mt-0.5 shrink-0" />
                   <div>
                     <p className="font-bold text-slate-700 text-[10px]">Acción Preliminar: Minuta de seguimiento</p>
                     <p className="text-[10px] text-slate-500">He redactado un borrador de correo con estas obligaciones.</p>
                     <button className="text-copper-600 font-bold hover:underline mt-1">Ver Borrador Editable</button>
                   </div>
                </div>
              </>
            )}
            
            {context === 'edp' && (
              <>
                <p className="font-medium text-slate-800">He validado la consistencia del EDP contra el Contrato #CT-2022 y la ODS #4200001928:</p>
                <div className="space-y-2 mt-2">
                   <div className="flex items-center gap-2 text-green-700 bg-green-50 px-2 py-1.5 rounded border border-green-100">
                      <CheckCircle2 className="w-3 h-3" /> <span className="font-medium">Certificado Laboral F30-1 Vigente</span>
                   </div>
                   <div className="flex items-start gap-2 text-red-700 bg-red-50 px-2 py-1.5 rounded border border-red-100">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" /> 
                      <p>
                        <span className="font-bold">Montos superan la ODS:</span> La línea 00020 (Excavación) solicita pagar 80.5 UN, pero la ODS en SAP solo tiene capacidad restante para 50 UN.
                      </p>
                   </div>
                </div>
                <p className="text-slate-600 mt-2">El motor de integración de SAP <span className="font-bold">rechazará</span> la generación de HES automático si se aprueba este EDP tal como está.</p>
              </>
            )}

            {context === 'licitaciones' && (
              <>
                <p className="font-medium text-slate-800">He analizado las <strong>Bases Técnicas v2</strong> y las ofertas cargadas:</p>
                <p className="text-slate-600 mt-1">Requisitos Excluyentes (Ref: Sec 4.1 y 4.2):</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px] mb-2">
                  <li>Experiencia acreditable de 3 años.</li>
                  <li>Certificaciones ISO vigentes.</li>
                </ul>
                <div className="bg-slate-50 border border-slate-200 rounded p-2 mt-3 flex items-start gap-2">
                   <Sparkles className="w-3.5 h-3.5 text-copper-600 mt-0.5 shrink-0" />
                   <div>
                     <p className="font-bold text-slate-700 text-[10px]">Generación Exitosa</p>
                     <p className="text-[10px] text-slate-500">La matriz de cumplimiento ha sido autocompletada. Dos de los tres proveedores cumplen con la evidencia.</p>
                     <button className="text-copper-600 font-bold hover:underline mt-1">Revisar Matriz en Pestaña Actual</button>
                   </div>
                </div>
              </>
            )}
            
            <div className="pt-3 border-t border-slate-100">
               <p className="text-[9px] text-slate-400 font-medium">⚠️ La IA no tiene facultades de aprobación automática (Regla SEG-05). Toda sugerencia requiere validación humana y la transacción dejará traza de auditoría.</p>
            </div>
          </div>
        </div>

      </div>

      <div className="p-4 bg-white border-t border-slate-200 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Acciones Directas Sugeridas</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <button className="text-[10px] bg-slate-50 border border-slate-200 hover:border-copper-500 hover:text-copper-700 font-bold text-slate-600 px-3 py-1.5 rounded transition-colors shadow-sm">
            {context === 'licitaciones' ? 'Generar Matriz Preliminar' : context === 'edp' ? 'Explicar Bloqueos SAP' : 'Resumir Documento Oficial'}
          </button>
          <button className="text-[10px] bg-slate-50 border border-slate-200 hover:border-copper-500 hover:text-copper-700 font-bold text-slate-600 px-3 py-1.5 rounded transition-colors shadow-sm">
            {context === 'licitaciones' ? 'Comparar Ofertas (Técnico)' : context === 'edp' ? 'Sugerir Glosa Observación' : 'Detectar Vencimientos Críticos'}
          </button>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Pregunta o instruye a la IA..."
            className="w-full bg-[#F1F5F9] border border-slate-200 rounded pl-4 pr-10 py-3 text-xs font-medium focus:outline-none focus:border-copper-500 focus:bg-white transition-colors"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#1E293B] text-white rounded hover:bg-[#0F172A] transition-colors shadow focus:ring-2 ring-slate-400">
             <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
