import React, { useState } from 'react';
import { Card, Badge, Button } from '../components/ui';
import { 
  Server,
  RefreshCcw,
  TerminalSquare,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  Bot
} from 'lucide-react';

const mockLogs = [
  { id: 'INT-9912', origen: 'Faros', destino: 'SAP S/4HANA', operacion: 'Crear HES', proceso: 'EDP-98122', estado: 'Error Funcional', fecha: 'Hoy 10:45', msj: 'No se pudo generar HES porque falta centro de costo en línea 003.', reintentos: 0, payload: '{\n  "EDP_ID": "98122",\n  "amount": 25000,\n  "currency": "USD"\n}' },
  { id: 'INT-9911', origen: 'Ariba Sourcing', destino: 'Faros', operacion: 'Importar Licitación', proceso: 'LIC-2305', estado: 'Procesado', fecha: 'Ayer 18:00', msj: 'Licitación registrada exitosamente.', reintentos: 1, payload: '...' },
  { id: 'INT-9910', origen: 'Faros', destino: 'SAP S/4HANA', operacion: 'Consultar ODS', proceso: 'CTR-4520-X', estado: 'Error Técnico', fecha: '25 Mayo 09:15', msj: 'Timeout connection to RFC Gateway.', reintentos: 3, payload: 'RFC_CALL_ERROR' },
  { id: 'INT-9909', origen: 'Faros', destino: 'API Externa', operacion: 'Sincronizar contrato', proceso: 'CT-2024-001', estado: 'Procesado', fecha: '25 Mayo 08:00', msj: 'Contrato sincronizado.', reintentos: 0, payload: '...' },
  { id: 'INT-9908', origen: 'SAP S/4HANA', destino: 'Faros', operacion: 'Actualizar estado HES', proceso: 'EDP-98100', estado: 'Procesado', fecha: '24 Mayo 15:30', msj: 'Estado actualizado', reintentos: 0, payload: '...' },
];

export function IntegracionesList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const handleOpenAction = (log: any) => {
     setSelectedLog(log);
     setModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6 flex-1 flex flex-col h-full overflow-hidden relative">
      {modalOpen && selectedLog && (
         <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
               <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-[#0F172A] text-white">
                  <h3 className="font-bold flex items-center gap-2"><TerminalSquare className="w-5 h-5 text-copper-500" /> Detalle de Integración</h3>
                  <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                     <XCircle className="w-5 h-5" />
                  </button>
               </div>
               <div className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                     <div>
                        <p className="text-lg font-bold text-slate-800">{selectedLog.operacion} <span className="text-slate-400 font-normal">({selectedLog.proceso})</span></p>
                        <p className="text-xs text-slate-500 mt-1">ID: {selectedLog.id} • Fecha: {selectedLog.fecha}</p>
                     </div>
                     <Badge variant={selectedLog.estado.includes('Error') ? 'error' : 'success'}>{selectedLog.estado}</Badge>
                  </div>

                  <div className="bg-red-50 p-3 rounded border border-red-100 flex items-start gap-2">
                     <AlertOctagon className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                     <div>
                        <p className="text-[10px] font-bold text-red-800 uppercase tracking-widest mb-1">Mensaje de Error Devuelto por API</p>
                        <p className="text-xs font-bold text-red-700">{selectedLog.msj}</p>
                     </div>
                  </div>

                  <div>
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Payload / Request Body</p>
                     <pre className="bg-[#1E293B] text-green-400 p-4 rounded text-xs overflow-auto font-mono max-h-40 border border-slate-800">
                        {selectedLog.payload}
                     </pre>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded p-4">
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Acciones de Resolución</p>
                     <div className="flex gap-2">
                        <Button className="bg-copper-600 hover:bg-copper-700 text-white font-bold gap-2 text-xs flex-1 justify-center shadow-sm">
                           <RefreshCcw className="w-3 h-3" /> Reintentar Ejecución
                        </Button>
                        <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-bold gap-2 text-xs flex-1 justify-center shadow-sm">
                           <CheckCircle2 className="w-3 h-3" /> Marcar como Resuelto
                        </Button>
                        <Button className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold gap-2 text-xs flex-1 justify-center shadow-sm">
                           <Bot className="w-4 h-4 text-copper-400" /> Analizar con Agente IA
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}

      <div className="flex items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Monitor de Integraciones</h1>
          <p className="text-xs text-slate-500 mt-1">Supervisión de conectores ERP, envío de HES y sincronización Ariba.</p>
        </div>
        <button className="px-4 py-2 bg-[#B45309] text-white hover:bg-copper-600 rounded text-sm font-bold shadow-sm flex items-center gap-2">
            <RefreshCcw className="w-4 h-4" /> Refrescar Logs
        </button>
      </div>

      {/* Cards de Conexión */}
      <div className="grid grid-cols-4 gap-4 flex-shrink-0">
        <Card className="p-4 border-emerald-200 bg-emerald-50/30">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-bold text-slate-600">SAP S/4HANA</p>
               <p className="text-[10px] text-slate-400">Conectado</p>
             </div>
             <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1"></div>
           </div>
        </Card>
        <Card className="p-4 border-emerald-200 bg-emerald-50/30">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-bold text-slate-600">Ariba Sourcing</p>
               <p className="text-[10px] text-slate-400">Conectado</p>
             </div>
             <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1"></div>
           </div>
        </Card>
        <Card className="p-4 border-amber-200 bg-amber-50/30">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-bold text-slate-600">Ariba Contract</p>
               <p className="text-[10px] text-amber-600 font-medium">Pendiente configuración</p>
             </div>
             <div className="w-2 h-2 rounded-full bg-amber-500 mt-1"></div>
           </div>
        </Card>
        <Card className="p-4 border-emerald-200 bg-emerald-50/30">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-bold text-slate-600">Ariba Network</p>
               <p className="text-[10px] text-slate-400">Conectado</p>
             </div>
             <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1"></div>
           </div>
        </Card>
        <Card className="p-4 border-emerald-200 bg-emerald-50/30">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-bold text-slate-600">SAP BTP</p>
               <p className="text-[10px] text-slate-400">Activo</p>
             </div>
             <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1"></div>
           </div>
        </Card>
        <Card className="p-4 border-slate-200 bg-slate-50/30">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-bold text-slate-600">Otro ERP</p>
               <p className="text-[10px] text-slate-400">No configurado</p>
             </div>
             <div className="w-2 h-2 rounded-full bg-slate-300 mt-1"></div>
           </div>
        </Card>
        <Card className="p-4 border-emerald-200 bg-emerald-50/30">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-bold text-slate-600">Correo</p>
               <p className="text-[10px] text-slate-400">Activo</p>
             </div>
             <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1"></div>
           </div>
        </Card>
        <Card className="p-4 border-emerald-200 bg-emerald-50/30">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-bold text-slate-600">API externa</p>
               <p className="text-[10px] text-slate-400">Activa</p>
             </div>
             <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1"></div>
           </div>
        </Card>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">Trazabilidad de Payload</h3>
          <div className="flex gap-2">
            <input type="text" placeholder="ID Integración, Proceso..." className="text-xs border border-slate-200 rounded-md px-3 py-1.5 w-64 focus:outline-none focus:border-copper-500" />
          </div>
        </div>
        
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200 z-10">
              <tr>
                <th className="px-4 py-3">CORRELACIÓN</th>
                <th className="px-4 py-3">SISTEMAS</th>
                <th className="px-4 py-3">OPERACIÓN</th>
                <th className="px-4 py-3">ESTADO / MENSAJE</th>
                <th className="px-4 py-3 text-right">ACCIÓN</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-700 divide-y divide-slate-100">
              {mockLogs.map((log, i) => (
                <tr key={i} className={`hover:bg-slate-50 transition-colors ${log.estado.includes('Error') ? 'bg-red-50/10' : ''}`}>
                  <td className="px-4 py-3">
                    <span className="font-mono font-bold text-slate-500">{log.id}</span>
                    <p className="text-[10px] text-slate-400 mt-1">{log.fecha}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 font-medium text-slate-600">
                       <Server className="w-3 h-3 text-slate-400"/> {log.origen} <ArrowRightLeft className="w-3 h-3 mx-1 text-slate-300"/> {log.destino}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-800">{log.operacion}</span>
                    <p className="text-[10px] mt-0.5 text-slate-500">Ref: {log.proceso}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      {log.estado === 'Procesado' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <AlertOctagon className="w-3.5 h-3.5 text-red-500" />}
                      <span className={`font-bold ${log.estado === 'Procesado' ? 'text-emerald-700' : 'text-red-600'}`}>{log.estado}</span>
                      {log.reintentos > 0 && <span className="text-[10px] bg-slate-100 px-1.5 rounded text-slate-500">Intentos: {log.reintentos}</span>}
                    </div>
                    <p className="text-slate-600 text-[10px] italic">"{log.msj}"</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                       <button className="text-slate-500 hover:text-navy-800" title="Ver Payload API" onClick={() => handleOpenAction(log)}><TerminalSquare className="w-4 h-4" /></button>
                       {log.estado.includes('Error') && (
                         <button className="text-copper-600 font-bold hover:underline" onClick={() => handleOpenAction(log)}>Reintentar</button>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// Internal icon proxy for arrow
function ArrowRightLeft({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>;
}
