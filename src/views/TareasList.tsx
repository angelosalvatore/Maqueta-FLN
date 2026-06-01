import React, { useState } from 'react';
import { Card, Badge, Button } from '../components/ui';
import { 
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRightLeft,
  X
} from 'lucide-react';
import { ViewMode } from '../types';

const mockTareas = [
  { id: 'TR-001', tarea: 'Revisar oferta técnica', modulo: 'Licitaciones', refPath: 'licitaciones/detalle/SR-2024-001', proceso: 'SR-2024-001', proveedor: 'Múltiples', resp: 'Juan Delgado', estado: 'Pendiente', sla: 'Vence en 8 horas', color: 'warning' },
  { id: 'TR-002', tarea: 'Aprobar documento seguro', modulo: 'Contratos', refPath: 'contratos/detalle/CT-2024-001', proceso: 'CT-2024-001', proveedor: 'Servicios Mineros Alpha', resp: 'Juan Delgado', estado: 'Vencida', sla: 'Atraso 15 días', color: 'error' },
  { id: 'TR-003', tarea: 'Observar EDP', modulo: 'EDP Digital', refPath: 'edp/detalle/EDP-98122', proceso: 'EDP-98122', proveedor: 'Constructora Norte', resp: 'Back Office', estado: 'En curso', sla: 'Vence hoy', color: 'warning' },
  { id: 'TR-004', tarea: 'Liberar HES', modulo: 'EDP Digital', refPath: 'edp/detalle/EDP-98121', proceso: 'EDP-98121', proveedor: 'Logística Sur', resp: 'Roberto Torres', estado: 'Pendiente', sla: 'Quedan 48 hrs', color: 'info' },
  { id: 'TR-005', tarea: 'Revisar error integración SAP', modulo: 'Integraciones', refPath: 'integraciones', proceso: 'EDP-98121', proveedor: 'N/A', resp: 'Admin Sistema', estado: 'Técnica', sla: 'Crítica', color: 'error' },
  { id: 'TR-006', tarea: 'Subir Póliza de Seguro de RS', modulo: 'Contratos', refPath: 'contratos/detalle/CT-2024-001', proceso: 'CT-2024-001', proveedor: 'Logística Sur', resp: 'Proveedor', estado: 'Pendiente', sla: 'Vence hoy', color: 'warning' },
];

export function TareasList({ onNavigate, mode }: { onNavigate: (path: string) => void, mode: ViewMode }) {
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  
  const tareasVisibles = mode === 'proveedor' 
    ? mockTareas.filter(t => t.resp === 'Proveedor')
    : mockTareas;

  const handleReassignClick = (task: any) => {
     setSelectedTask(task);
     setReassignModalOpen(true);
  };

  const handleReassignSubmit = () => {
     setReassignModalOpen(false);
     setSelectedTask(null);
  };

  return (
    <div className="p-6 space-y-6 flex-1 flex flex-col h-full overflow-hidden relative">
      {reassignModalOpen && (
         <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
               <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <h3 className="font-bold text-slate-800">Reasignar Tarea</h3>
                  <button onClick={() => setReassignModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                     <X className="w-5 h-5" />
                  </button>
               </div>
               <div className="p-5 space-y-4">
                  <div className="bg-orange-50 border border-orange-100 p-3 rounded">
                     <p className="text-[10px] font-bold text-orange-600 tracking-widest uppercase mb-1">Tarea Seleccionada</p>
                     <p className="text-sm font-bold text-slate-800">{selectedTask?.tarea}</p>
                     <p className="text-xs text-slate-500">{selectedTask?.proceso}</p>
                  </div>
                  <div>
                     <label className="text-[11px] font-bold text-slate-700">Responsable Anterior</label>
                     <input type="text" disabled className="w-full mt-1 border border-slate-200 bg-slate-50 rounded p-2 text-xs text-slate-500" value={selectedTask?.resp} />
                  </div>
                  <div>
                     <label className="text-[11px] font-bold text-slate-700">Nuevo Responsable <span className="text-red-500">*</span></label>
                     <select className="w-full mt-1 border border-slate-300 rounded p-2 text-xs focus:border-copper-500 focus:outline-none bg-white font-medium text-slate-700">
                        <option>Seleccione usuario...</option>
                        <option>Roberto Torres (AdC)</option>
                        <option>Ana Sepúlveda (ITO)</option>
                     </select>
                  </div>
                  <div>
                     <label className="text-[11px] font-bold text-slate-700">Motivo <span className="text-red-500">*</span></label>
                     <select className="w-full mt-1 border border-slate-300 rounded p-2 text-xs focus:border-copper-500 focus:outline-none bg-white font-medium text-slate-700">
                        <option>Vacaciones / Licencia</option>
                        <option>Reasignación administrativa</option>
                        <option>Sobrecarga laboral</option>
                     </select>
                  </div>
                  <div>
                     <label className="text-[11px] font-bold text-slate-700">Comentario Obligatorio <span className="text-red-500">*</span></label>
                     <textarea className="w-full mt-1 border border-slate-300 rounded p-2 text-xs h-20 focus:border-copper-500 focus:outline-none bg-white resize-none" placeholder="Escriba la justificación..."></textarea>
                  </div>
               </div>
               <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                  <Button variant="outline" onClick={() => setReassignModalOpen(false)}>Cancelar</Button>
                  <Button onClick={handleReassignSubmit} className="bg-copper-600 hover:bg-copper-700 text-white font-bold">Confirmar Reasignación</Button>
               </div>
            </div>
         </div>
      )}

      <div className="flex items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Tareas y Aprobaciones</h1>
          <p className="text-xs text-slate-500 mt-1">Bandeja transversal de workflow y pendientes operativos.</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 border-[#B45309]/20">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex gap-4">
            <button className="text-sm font-bold border-b-2 border-copper-500 pb-4 px-2 -mb-4">Mis Tareas Pendientes</button>
            {mode === 'mandante' && <button className="text-sm font-medium text-slate-400 pb-4 px-2 -mb-4">Tareas de mi Equipo</button>}
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Filtrar tareas..." className="text-xs border border-slate-200 rounded-md px-3 py-1.5 w-64 focus:outline-none focus:border-copper-500" />
            <button className="bg-slate-100 p-1.5 rounded border border-slate-200 hover:bg-slate-200">⚙</button>
          </div>
        </div>
        
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200 z-10">
              <tr>
                <th className="px-4 py-3">TAREA / ACCIÓN REQUERIDA</th>
                <th className="px-4 py-3">MÓDULO</th>
                <th className="px-4 py-3">REFERENCIA</th>
                <th className="px-4 py-3">ESTADO / SLA</th>
                <th className="px-4 py-3 text-right">ACCIÓN</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-700 divide-y divide-slate-100">
              {tareasVisibles.map((row, i) => (
                <tr key={i} className={`hover:bg-slate-50 transition-colors group ${row.color === 'error' ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-800">{row.tarea}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Asignado a: {row.resp}</p>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-600">
                    {row.modulo}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200 font-mono font-bold tracking-wide">{row.proceso}</span>
                    <div className="mt-1 text-[10px] text-slate-400">{row.proveedor}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={row.color as any}>{row.estado}</Badge>
                    <p className={`text-[10px] mt-1 font-bold ${row.color === 'error' ? 'text-red-500' : 'text-orange-500'}`}>
                      {row.sla}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-right flex flex-col items-end gap-1">
                    <button className="text-copper-600 font-bold text-xs hover:underline" onClick={() => onNavigate(row.refPath)}>Ver detalle</button>
                    <div className="flex gap-2">
                      <button className="text-green-600 font-medium text-[10px] hover:underline">Aprobar</button>
                      <button className="text-amber-600 font-medium text-[10px] hover:underline">Observar</button>
                      <button className="text-slate-500 font-medium text-[10px] hover:underline" onClick={() => handleReassignClick(row)}>Reasignar</button>
                    </div>
                  </td>
                </tr>
              ))}
              {tareasVisibles.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-500">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <p>No tienes tareas pendientes en tu bandeja.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
