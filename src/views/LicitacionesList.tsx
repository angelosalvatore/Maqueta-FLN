import React from 'react';
import { Card, Badge, Button } from '../components/ui';
import { 
  Search,
  Filter,
  Download,
  Plus,
  Bot
} from 'lucide-react';
import { ViewMode } from '../types';

const mockLicitacionesMandante = [
  { id: 'SR-2024-001', name: 'Mantenimiento Planta Chancado', mandante: 'Minera Los Andes', fuente: 'Ariba Sourcing', estado: 'Recepción de ofertas', cierre: '2024-06-15', resp: 'M. Soto', riesgo: 'Bajo' },
  { id: 'SR-2024-002', name: 'Renovación Flota Camiones', mandante: 'Minera Los Andes', fuente: 'Manual', estado: 'En evaluación técnica', cierre: '2024-05-30', resp: 'J. Pérez', riesgo: 'Alto' },
  { id: 'SR-2024-003', name: 'Servicios de Casino', mandante: 'Minera Norte', fuente: 'Ariba Sourcing', estado: 'Adjudicada', cierre: '2024-05-01', resp: 'C. Díaz', riesgo: 'Bajo' },
  { id: 'SR-2024-004', name: 'Repuestos Molinos', mandante: 'Minera Los Andes', fuente: 'Carga Excel', estado: 'Borrador', cierre: '2024-07-20', resp: 'M. Soto', riesgo: '- ' },
];

const mockLicitacionesProveedor = [
  { id: 'SR-2024-001', name: 'Mantenimiento Planta Chancado', mandante: 'Minera Los Andes', estado: 'Recepción de ofertas', cierre: '15/06/2024', estadoOferta: 'En preparación', accion: 'Continuar oferta' },
  { id: 'SR-2024-002', name: 'Renovación Flota Camiones', mandante: 'Minera Los Andes', estado: 'En evaluación técnica', cierre: '30/05/2024', estadoOferta: 'Enviada', accion: 'Ver estado' },
  { id: 'SR-2024-003', name: 'Servicios de Casino', mandante: 'Minera Norte', estado: 'Adjudicada', cierre: '01/05/2024', estadoOferta: 'Cerrada', accion: 'Ver bases' },
  { id: 'SR-2024-005', name: 'Servicio de Aseo Industrial', mandante: 'Minera Norte', estado: 'Recepción de ofertas', cierre: '20/07/2024', estadoOferta: 'No iniciada', accion: 'Ingresar oferta' },
];

export function LicitacionesList({ onNavigate, mode }: { onNavigate: (path: string) => void, mode: ViewMode }) {
  const isProveedor = mode === 'proveedor';
  const data = isProveedor ? mockLicitacionesProveedor : mockLicitacionesMandante;

  return (
    <div className="p-6 space-y-6 flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Licitaciones</h1>
          <p className="text-xs text-slate-500 mt-1">Gestión y seguimiento de procesos de abastecimiento.</p>
        </div>
        <div className="flex items-center gap-3">
          {isProveedor ? (
            <>
              <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded text-sm font-bold shadow-sm border border-slate-200 hover:bg-slate-200">
                Ver invitaciones
              </button>
              <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded text-sm font-bold shadow-sm border border-slate-200 hover:bg-slate-200">
                Mis ofertas
              </button>
              <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded text-sm font-bold shadow-sm border border-slate-200 hover:bg-slate-200">
                Consultas enviadas
              </button>
            </>
          ) : (
            <>
              <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded text-sm font-bold shadow-sm border border-slate-200 hover:bg-slate-200">
                 Importar de Ariba
              </button>
              <button className="px-4 py-2 bg-[#B45309] text-white hover:bg-copper-600 rounded text-sm font-bold shadow-sm">
                 + Nueva Licitación
              </button>
            </>
          )}
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex gap-4">
            <button className="text-sm font-bold border-b-2 border-copper-500 pb-4 px-2 -mb-4">Todas las Licitaciones</button>
            <button className="text-sm font-medium text-slate-400 pb-4 px-2 -mb-4">En curso</button>
            <button className="text-sm font-medium text-slate-400 pb-4 px-2 -mb-4">Adjudicadas</button>
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Buscar..." className="text-xs border border-slate-200 rounded-md px-3 py-1.5 w-64 focus:outline-none focus:border-copper-500" />
            <button className="bg-slate-100 p-1.5 rounded border border-slate-200 hover:bg-slate-200">⚙</button>
          </div>
        </div>
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200 z-10">
              <tr>
                <th className="px-4 py-3">CÓDIGO</th>
                <th className="px-4 py-3">NOMBRE LICITACIÓN</th>
                {isProveedor ? (
                  <>
                    <th className="px-4 py-3">MANDANTE</th>
                    <th className="px-4 py-3">ESTADO</th>
                    <th className="px-4 py-3">FECHA CIERRE</th>
                    <th className="px-4 py-3">ESTADO OFERTA</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3">FUENTE</th>
                    <th className="px-4 py-3">ESTADO</th>
                    <th className="px-4 py-3">RIESGO</th>
                  </>
                )}
                <th className="px-4 py-3 text-right">ACCIÓN</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-700 divide-y divide-slate-100">
              {data.map((row: any, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-3 font-mono font-bold text-slate-500">{row.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-800">{row.name}</p>
                    {!isProveedor && <p className="text-[10px] text-slate-400 mt-0.5">{row.mandante}</p>}
                  </td>
                  {isProveedor ? (
                    <>
                      <td className="px-4 py-3">{row.mandante}</td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1.5 font-bold ${
                          row.estado.includes('Adjudicada') ? 'text-green-600' :
                          row.estado.includes('recepción') ? 'text-blue-600' :
                          row.estado.includes('evaluación') ? 'text-orange-600' : 'text-slate-600'
                        }`}>
                          ● {row.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-500">{row.cierre}</td>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${
                          row.estadoOferta === 'Enviada' ? 'text-green-600' :
                          row.estadoOferta === 'En preparación' ? 'text-amber-600' :
                          row.estadoOferta === 'No iniciada' ? 'text-slate-500' : 'text-slate-700'
                        }`}>
                          {row.estadoOferta}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-copper-600 font-bold hover:underline" onClick={() => onNavigate(`licitaciones/detalle/${row.id}`)}>{row.accion}</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200 font-medium tracking-wide">{row.fuente}</span></td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1.5 font-bold ${
                          row.estado.includes('Adjudicada') ? 'text-green-600' :
                          row.estado.includes('recepción') ? 'text-blue-600' :
                          row.estado.includes('evaluación') ? 'text-orange-600' : 'text-slate-600'
                        }`}>
                          ● {row.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${
                          row.riesgo === 'Alto' ? 'text-red-700' : 
                          row.riesgo === 'Bajo' ? 'text-emerald-700' : 'text-slate-500'
                        }`}>
                          {row.riesgo}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-copper-600 font-bold hover:underline" onClick={() => onNavigate(`licitaciones/detalle/${row.id}`)}>Ver Detalle</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
