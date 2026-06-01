import React, { useState } from 'react';
import { Card, Button, Badge } from '../components/ui';
import { Bot, Save, CheckCircle2, Sliders } from 'lucide-react';

const AGENTES = [
  { id: 'copilot', name: 'Agente Copilot', desc: 'Navegación general y asistente principal.' },
  { id: 'legal', name: 'Agente Validador Legal', desc: 'Revisión y observación de Documentos.' },
  { id: 'licitaciones', name: 'Agente Licitaciones', desc: 'Análisis de Bases Técnicas y Administrativas.' },
  { id: 'cobros', name: 'Agente Cobros', desc: 'Revisión de EDP y pre-visación de HES.' }
];

export function GestorIAView() {
  const [activeAgente, setActiveAgente] = useState(AGENTES[0].id);
  const [successMsg, setSuccessMsg] = useState('');

  const agenteActual = AGENTES.find(a => a.id === activeAgente);

  const handleSave = () => {
    setSuccessMsg('Configuración del agente guardada.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="p-6 space-y-6 flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between gap-4 flex-shrink-0">
        <div>
           <h1 className="text-lg font-bold text-slate-800 tracking-tight">Gestor Paramétrico de Agentes IA</h1>
           <p className="text-xs text-slate-500 mt-1">Configuración técnica de prompts, modelos y parámetros cognitivos.</p>
        </div>
        {successMsg && (
           <div className="bg-green-50 text-green-700 px-4 py-2 flex gap-2 items-center rounded border border-green-200 text-sm font-bold">
              <CheckCircle2 className="w-4 h-4"/> {successMsg}
           </div>
        )}
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
         {/* Sidebar Navigation */}
         <div className="w-72 flex-shrink-0 overflow-y-auto space-y-2">
            {AGENTES.map((ag) => (
                <button
                  key={ag.id}
                  onClick={() => setActiveAgente(ag.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                     activeAgente === ag.id
                        ? 'border-copper-500 bg-white shadow-md'
                        : 'border-slate-200 bg-slate-50 hover:bg-white'
                  }`}
                >
                   <div className="flex items-center gap-2 mb-1">
                      <Bot className={`w-4 h-4 ${activeAgente === ag.id ? 'text-copper-600' : 'text-slate-500'}`} />
                      <span className="font-bold text-slate-800 text-sm">{ag.name}</span>
                   </div>
                   <p className="text-xs text-slate-500 pl-6">{ag.desc}</p>
                </button>
            ))}
         </div>

         {/* Formulario a la derecha */}
         <Card className="flex-1 bg-white border-slate-200 overflow-y-auto shadow-sm flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 flex-shrink-0">
               <div>
                  <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">Configuración: {agenteActual?.name}</h2>
               </div>
               <div className="flex items-center gap-3">
                  <Badge variant="success">Online</Badge>
                  <Button onClick={handleSave} className="bg-[#B45309] hover:bg-copper-700 text-white font-bold gap-2">
                     <Save className="w-4 h-4"/> Guardar
                  </Button>
               </div>
            </div>

            <div className="p-6 space-y-6 max-w-4xl">
               <div className="grid grid-cols-2 gap-6">
                  <div>
                     <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2 mb-2">
                        <Sliders className="w-3.5 h-3.5" /> Modelo LLM
                     </label>
                     <select className="w-full border border-slate-300 rounded p-2 text-sm bg-white focus:outline-none focus:border-copper-500 font-medium">
                        <option>Gemini 1.5 Pro</option>
                        <option>GPT-4o</option>
                        <option>Claude 3.5 Sonnet</option>
                     </select>
                  </div>
                  <div>
                     <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2 block">Tokens Max (Output)</label>
                     <input type="number" defaultValue="2048" className="w-full border border-slate-300 rounded p-2 text-sm bg-white focus:outline-none focus:border-copper-500 font-mono" />
                  </div>
               </div>

               <div>
                 <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Temperature</label>
                    <span className="text-xs font-mono font-bold text-copper-600 bg-copper-50 px-2 rounded">0.2</span>
                 </div>
                 <input type="range" min="0" max="1" step="0.1" defaultValue="0.2" className="w-full accent-copper-600" />
                 <div className="flex justify-between text-[10px] text-slate-400 mt-1 uppercase font-bold">
                    <span>Preciso / Analítico (0)</span>
                    <span>Creativo (1)</span>
                 </div>
               </div>

               <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2 block">Prompt System General</label>
                  <textarea 
                     className="w-full border border-slate-300 rounded p-4 text-xs font-mono bg-slate-50 focus:bg-white focus:outline-none focus:border-copper-500 h-64 resize-none leading-relaxed" 
                     defaultValue={`Eres el asistente experto de Faros Supply & Contracts, plataforma líder de Supply Chain de la gran minería. 
Tu objetivo es analizar contratos, EDPs y documentos técnicos para evitar fugas de valor. 
Debes ser extremadamente riguroso y basarte estrictamente en la documentación y los datos ingresados en pantalla.
No debes alucinar cobros ni inventar entidades.`}
                  ></textarea>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
}
