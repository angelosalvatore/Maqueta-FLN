import React from 'react';
import { Card, Badge, Button } from '../components/ui';
import { 
  Search,
  Filter,
  Download,
  Plus,
  Briefcase
} from 'lucide-react';
import { ViewMode } from '../types';

const mockContratos = [
  { id: 'CT-2022-045', proveedor: 'Servicios Mineros Alpha', tipo: 'Obras Civil', estado: 'Próximo a vencer', inicio: '2022-01-15', fin: '2024-06-30', monto: '1,500,000 USD', docs: 1 },
  { id: 'CT-2023-112', proveedor: 'Logística TransNorte', tipo: 'Servicio Continuo', estado: 'Vigente', inicio: '2023-03-01', fin: '2026-03-01', monto: '850,000 CLP', docs: 0 },
  { id: 'CT-2024-001', proveedor: 'Tech Solutions EIRL', tipo: 'Tecnología', estado: 'Pendiente de firma', inicio: '2024-05-01', fin: '2025-05-01', monto: '120,000 USD', docs: 0 },
  { id: 'CT-2021-098', proveedor: 'Constructora S.A.', tipo: 'Montaje', estado: 'Suspendido', inicio: '2021-10-01', fin: '2024-10-01', monto: '3,200,000 USD', docs: 2 },
];

export function ContratosList({ onNavigate, mode }: { onNavigate: (path: string) => void, mode: ViewMode }) {
  return (
    <div className="p-6 space-y-6 flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Administración de Contratos</h1>
          <p className="text-xs text-slate-500 mt-1">Directorio y seguimiento del ciclo de vida contractual.</p>
        </div>
        <div className="flex items-center gap-3">
          {mode === 'mandante' && (
             <>
               <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded text-sm font-bold shadow-sm border border-slate-200 hover:bg-slate-200">
                  Importar de Ariba
               </button>
               <button className="px-4 py-2 bg-[#B45309] text-white hover:bg-copper-600 rounded text-sm font-bold shadow-sm">
                  + Nuevo Contrato
               </button>
             </>
          )}
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex gap-4">
            <button className="text-sm font-bold border-b-2 border-copper-500 pb-4 px-2 -mb-4">Todos los Contratos</button>
            <button className="text-sm font-medium text-slate-400 pb-4 px-2 -mb-4">Próximos a Vencer</button>
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Buscar por código..." className="text-xs border border-slate-200 rounded-md px-3 py-1.5 w-64 focus:outline-none focus:border-copper-500" />
            <button className="bg-slate-100 p-1.5 rounded border border-slate-200 hover:bg-slate-200">⚙</button>
          </div>
        </div>
        
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200 z-10">
              <tr>
                <th className="px-4 py-3">CONTRATO</th>
                {mode === 'mandante' && <th className="px-4 py-3">PROVEEDOR</th>}
                <th className="px-4 py-3">ESTADO</th>
                <th className="px-4 py-3">VIGENCIA</th>
                <th className="px-4 py-3">MONTO</th>
                <th className="px-4 py-3 text-right">ACCIÓN</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-700 divide-y divide-slate-100">
              {mockContratos.filter(c => mode === 'mandante' || c.proveedor === 'Servicios Mineros Alpha').map((row, i) => (
                <tr key={i} className={`hover:bg-slate-50 transition-colors group ${row.docs > 0 ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-3 font-mono font-bold text-slate-500">
                    {row.id}
                    <div className="text-[10px] font-medium text-slate-400 mt-0.5 font-sans">{row.tipo}</div>
                  </td>
                  {mode === 'mandante' && (
                     <td className="px-4 py-3">
                       <p className="font-bold text-slate-800">{row.proveedor}</p>
                       {row.docs > 0 && <p className="text-[10px] text-red-500 mt-0.5">⚠️ {row.docs} documentos vencidos</p>}
                     </td>
                  )}
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1.5 font-bold ${
                      row.estado === 'Vigente' ? 'text-green-600' :
                      row.estado.includes('vencer') ? 'text-orange-600' :
                      row.estado === 'Suspendido' ? 'text-red-600' : 'text-slate-600'
                    }`}>
                      ● {row.estado}
                    </span>
                    {mode === 'proveedor' && row.docs > 0 && <p className="text-[10px] text-red-500 mt-0.5 font-bold">Documentos pendientes</p>}
                  </td>
                  <td className="px-4 py-3 text-slate-500 font-medium">
                    {row.inicio} <br/> <span className="text-slate-800">{row.fin}</span>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-700">{row.monto}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-copper-600 font-bold hover:underline" onClick={() => onNavigate(`contratos/detalle/${row.id}`)}>Ver Ficha</button>
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
