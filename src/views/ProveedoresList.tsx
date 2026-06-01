import React from 'react';
import { Card, Badge, Button } from '../components/ui';
import { ViewMode } from '../types';
import { Search, Filter, ShieldAlert, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';

const mockProveedores = [
  { id: '76.123.456-7', nombre: 'Servicios Mineros Alpha', rubro: 'Minería / Mantención', mandante: 'Minera Los Andes', estado: 'Activo', estDoc: 'Observado', estDocMsg: '1 documento vencido', contratos: 4, licitaciones: 2, edp: 14 },
  { id: '77.987.654-3', nombre: 'Constructora Norte SpA', rubro: 'Obras civiles', mandante: 'Minera Norte', estado: 'Activo', estDoc: 'Observado', estDocMsg: 'Observado', contratos: 2, licitaciones: 1, edp: 3 },
  { id: '78.222.333-k', nombre: 'Tech Solutions EIRL', rubro: 'Tecnología', mandante: 'Minera Los Andes', estado: 'Pendiente validación', estDoc: 'Incompleto', estDocMsg: 'Documentos incompletos', contratos: 1, licitaciones: 1, edp: 0 },
  { id: '79.555.444-1', nombre: 'Logística TransNorte', rubro: 'Transporte', mandante: 'Minera Los Andes', estado: 'Bloqueado', estDoc: 'Vencido', estDocMsg: 'Seguro vencido', contratos: 3, licitaciones: 0, edp: 5 },
];

export function ProveedoresList({ onNavigate, mode }: { onNavigate: (path: string) => void, mode: ViewMode }) {
  if (mode !== 'mandante') {
     return <div className="p-6 text-slate-500">Acceso denegado. Vista exclusiva para mandantes.</div>;
  }

  return (
    <div className="p-6 space-y-6 flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Proveedores</h1>
          <p className="text-xs text-slate-500 mt-1">Directorio y central de gestión de proveedores.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded text-sm font-bold shadow-sm border border-slate-200 hover:bg-slate-200">
             Importar 
          </button>
          <button className="px-4 py-2 bg-[#B45309] text-white hover:bg-copper-600 rounded text-sm font-bold shadow-sm">
             + Nuevo Proveedor
          </button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 bg-white">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex gap-4">
            <button className="text-sm font-bold border-b-2 border-copper-500 pb-4 px-2 -mb-4">Directorio Principal</button>
            <button className="text-sm font-medium text-slate-400 pb-4 px-2 -mb-4">Pendientes de Validación</button>
            <button className="text-sm font-medium text-slate-400 pb-4 px-2 -mb-4">Bloqueados</button>
          </div>
        </div>

        <div className="p-4 border-b border-slate-100 flex gap-4 bg-slate-50/50">
           <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Buscar por RUT, Nombre..." className="text-xs border border-slate-200 rounded-md pl-9 pr-3 py-2 w-64 focus:outline-none focus:border-copper-500" />
           </div>
           
           <select className="text-xs border border-slate-200 rounded-md px-3 py-2 bg-white text-slate-600 focus:outline-none focus:border-copper-500 font-medium">
              <option>Mandante: Todos</option>
              <option>Minera Los Andes</option>
              <option>Minera Norte</option>
           </select>

           <select className="text-xs border border-slate-200 rounded-md px-3 py-2 bg-white text-slate-600 focus:outline-none focus:border-copper-500 font-medium">
              <option>Estado: Todos</option>
              <option>Activo</option>
              <option>Pendiente</option>
              <option>Bloqueado</option>
           </select>

           <select className="text-xs border border-slate-200 rounded-md px-3 py-2 bg-white text-slate-600 focus:outline-none focus:border-copper-500 font-medium">
              <option>Estado Doc: Todos</option>
              <option>Vigente</option>
              <option>Observado</option>
              <option>Incompleto</option>
           </select>

           <select className="text-xs border border-slate-200 rounded-md px-3 py-2 bg-white text-slate-600 focus:outline-none focus:border-copper-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              <option>Rubro: Todos</option>
           </select>
           
           <button className="ml-auto text-xs font-bold text-copper-600 hover:text-copper-800 flex items-center gap-1">
             <Filter className="w-3 h-3" /> Más Filtros
           </button>
        </div>
        
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
            <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200 z-10">
              <tr>
                <th className="px-4 py-3">RUT / ID Proveedor</th>
                <th className="px-4 py-3">Razón Social</th>
                <th className="px-4 py-3">Rubro</th>
                <th className="px-4 py-3">Mandante Asociado</th>
                <th className="px-4 py-3">Estado Proveedor</th>
                <th className="px-4 py-3">Estado Documental</th>
                <th className="px-4 py-3 text-center">Contratos</th>
                <th className="px-4 py-3 text-center">Licitaciones</th>
                <th className="px-4 py-3 text-center">EDP Assoc.</th>
                <th className="px-4 py-3 text-right sticky right-0 bg-slate-50 border-l border-slate-200 shadow-sm">Acción</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-700 divide-y divide-slate-100">
              {mockProveedores.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-3 font-mono font-bold text-slate-500">{row.id}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">{row.nombre}</td>
                  <td className="px-4 py-3 text-slate-500">{row.rubro}</td>
                  <td className="px-4 py-3 text-slate-600 font-medium">{row.mandante}</td>
                  <td className="px-4 py-3">
                     <Badge variant={
                        row.estado === 'Activo' ? 'success' : 
                        row.estado === 'Bloqueado' ? 'error' : 
                        'warning'
                     }>
                        {row.estado}
                     </Badge>
                  </td>
                  <td className="px-4 py-3">
                     <span className={`inline-flex items-center gap-1.5 font-bold ${
                        row.estDoc === 'Observado' ? 'text-amber-600' :
                        row.estDoc === 'Incompleto' ? 'text-slate-500' :
                        row.estDoc === 'Vencido' ? 'text-red-600' : 'text-green-600'
                     }`}>
                        {row.estDoc === 'Observado' && <AlertTriangle className="w-3.5 h-3.5" />}
                        {row.estDoc === 'Vencido' && <ShieldAlert className="w-3.5 h-3.5" />}
                        {row.estDoc === 'Incompleto' && <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />}
                        {row.estDocMsg}
                     </span>
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-slate-600">{row.contratos}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-600">{row.licitaciones}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-600">{row.edp}</td>
                  <td className="px-4 py-3 text-right space-x-2 sticky right-0 bg-white group-hover:bg-slate-50 border-l border-slate-100 shadow-sm">
                     <button className="text-copper-600 font-bold hover:underline" onClick={() => onNavigate('proveedores/detalle/' + row.id)}>Ver ficha</button>
                     <button className="text-slate-400 hover:text-copper-600 font-bold">Solicitar docs.</button>
                     <button className="text-slate-400 hover:text-copper-600 font-bold">Ver historial</button>
                     {row.estado !== 'Bloqueado' && <button className="text-red-500 hover:text-red-700 font-bold ml-2">Bloquear</button>}
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
