import React, { useState } from 'react';
import { Card, Badge, Button } from '../components/ui';
import { 
  ArrowRightLeft,
  FileCheck,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { ViewMode } from '../types';

const mockEDP = [
  { id: 'EDP-98122', ods: '4500021998', proveedor: 'Constructora Norte', periodo: 'Septiembre 2023', monto: '45,200 USD', estado: 'Observado', riesgo: 'Alto', color: 'error' },
  { id: 'EDP-98121', ods: '4500019920', proveedor: 'Servicios Integrales Alpha', periodo: 'Agosto 2023', monto: '12,500 USD', estado: 'Pendiente a HES', riesgo: 'Bajo', color: 'info' },
  { id: 'EDP-98118', ods: '4500019900', proveedor: 'Obras Civiles S.A', periodo: 'Julio 2023', monto: '32,100 CLP', estado: 'Error Integración', riesgo: 'Alto', color: 'error' },
  { id: 'EDP-98100', ods: '4500018880', proveedor: 'Logística Sur', periodo: 'Agosto 2023', monto: '8,900 USD', estado: 'Pagado', riesgo: 'Bajo', color: 'success' },
];

const mockODS = [
  { id: '4502309830', fecha: '29 Jun 2024', tipo: 'Servicios', estado: 'Nuevo', monto: '123,123 USD' },
  { id: '4600025764', fecha: '04 Ene 2024', tipo: 'Mixto', estado: 'Confirmado', monto: '120,000 ZUF' },
];

export function EDPList({ onNavigate, mode }: { onNavigate: (path: string) => void, mode: ViewMode }) {
  const [activeTab, setActiveTab] = useState<'edp' | 'ods'>(mode === 'proveedor' ? 'ods' : 'edp');

  return (
    <div className="p-6 space-y-6 flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Estados de Pago (EDP Digital)</h1>
          <p className="text-xs text-slate-500 mt-1">Gestión de cobros, líneas de servicio y visación documental.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {mode === 'proveedor' && (
            <button className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded text-sm font-bold shadow-sm border border-slate-200">
               Enviar propuesta de pago
            </button>
          )}
          <button className="px-4 py-2 bg-[#B45309] text-white hover:bg-copper-600 rounded text-sm font-bold shadow-sm" onClick={() => onNavigate('edp/detalle/nuevo')}>
             Crear EDP Manual
          </button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex gap-4">
             {mode === 'proveedor' && (
                <button 
                  className={`text-sm font-bold border-b-2 pb-4 px-2 -mb-4 ${activeTab === 'ods' ? 'border-[#B45309] text-copper-700' : 'border-transparent text-slate-400'}`}
                  onClick={() => setActiveTab('ods')}
                >
                  ODS Recibidas
                </button>
             )}
            <button 
              className={`text-sm font-bold border-b-2 pb-4 px-2 -mb-4 ${activeTab === 'edp' ? 'border-[#B45309] text-copper-700' : 'border-transparent text-slate-400'}`}
              onClick={() => setActiveTab('edp')}
            >
              Mis Estados de Pago
            </button>
          </div>
          <div className="flex gap-2">
            {activeTab === 'ods' ? (
              <>
                 <select className="text-xs border border-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:border-copper-500 text-slate-600 bg-white">
                    <option>Todo Estado</option>
                    <option>Nuevo</option>
                    <option>Confirmado</option>
                 </select>
                 <select className="text-xs border border-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:border-copper-500 text-slate-600 bg-white">
                    <option>Todo Tipo ítem</option>
                    <option>Materiales</option>
                    <option>Servicios</option>
                 </select>
              </>
            ) : (
                <input type="text" placeholder="Buscar por ID, ODS..." className="text-xs border border-slate-200 rounded-md px-3 py-1.5 w-64 focus:outline-none focus:border-copper-500" />
            )}
            <button className="bg-slate-100 p-1.5 rounded border border-slate-200 hover:bg-slate-200 text-slate-600 px-3 text-xs font-bold">Buscar</button>
          </div>
        </div>
        
        {activeTab === 'edp' && (
          <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200 z-10">
                <tr>
                  <th className="px-4 py-3">ID EDP</th>
                  <th className="px-4 py-3">N° ODS / CONTRATO</th>
                  <th className="px-4 py-3">PROVEEDOR</th>
                  <th className="px-4 py-3">PERIODO</th>
                  <th className="px-4 py-3">ESTADO / MONTO</th>
                  <th className="px-4 py-3 text-right">ACCIÓN</th>
                </tr>
              </thead>
              <tbody className="text-xs text-slate-700 divide-y divide-slate-100">
                {mockEDP.map((row, i) => (
                  <tr key={i} className={`hover:bg-slate-50 transition-colors group ${row.color === 'error' ? 'bg-red-50/20' : ''}`}>
                    <td className="px-4 py-3 font-mono font-bold text-slate-500">{row.id}</td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-700">{row.ods}</td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-800">{row.proveedor}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-medium">{row.periodo}</td>
                    <td className="px-4 py-3">
                      <Badge variant={row.color as any}>{row.estado}</Badge>
                      <p className="text-[10px] mt-1 font-bold text-slate-700">{row.monto}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-copper-600 font-bold hover:underline" onClick={() => onNavigate(`edp/detalle/${row.id}`)}>Revisar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'ods' && (
          <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200 z-10">
                <tr>
                  <th className="px-4 py-3">DOCUMENTO COMPRA</th>
                  <th className="px-4 py-3">CENTRO / MANDANTE</th>
                  <th className="px-4 py-3">FECHA CREACIÓN</th>
                  <th className="px-4 py-3">TIPO</th>
                  <th className="px-4 py-3">ESTADO</th>
                  <th className="px-4 py-3 text-right">ACCIÓN</th>
                </tr>
              </thead>
              <tbody className="text-xs text-slate-700 divide-y divide-slate-100">
                {mockODS.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-4 py-3">
                       <span className="font-mono font-bold text-slate-700">{row.id}</span>
                       <p className="text-[10px] text-slate-400 mt-1">{row.monto}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-800">MA01 - Casa Matriz</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-medium">{row.fecha}</td>
                    <td className="px-4 py-3 text-slate-600 flex items-center gap-1.5"><FileCheck className="w-3.5 h-3.5 text-slate-400"/> {row.tipo}</td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1.5 font-bold ${row.estado === 'Confirmado' ? 'text-green-600' : 'text-blue-600'}`}>
                         ● {row.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-[#B45309] border border-[#B45309] bg-orange-50 px-3 py-1 rounded font-bold hover:bg-orange-100" onClick={() => onNavigate(`edp/detalle/${row.id}`)}>Nuevo EDP</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </Card>
    </div>
  );
}
