import React, { useState } from 'react';
import { Card, Button, Badge } from '../components/ui';

export function MandanteDashboard({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [activeView, setActiveView] = useState('resumen');

  return (
    <div className="p-6 space-y-6 overflow-hidden flex-1 flex flex-col h-full bg-[#F1F5F9]">
      <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex-shrink-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Vista del panel:</span>
        <select 
          value={activeView}
          onChange={(e) => setActiveView(e.target.value)}
          className="border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-700 bg-slate-50 focus:outline-none focus:border-copper-500 font-medium min-w-[200px]"
        >
          <option value="resumen">Resumen Ecosistema</option>
          <option value="licitaciones">Licitaciones</option>
          <option value="contratos">Adm. de Contratos</option>
          <option value="edp">EDP Digital</option>
          <option value="smart-shipping">Faros Smart Shipping</option>
          <option value="cloud-rfid">Faros Cloud RFID</option>
          <option value="erp">Faros ERP</option>
        </select>
      </div>

      {activeView === 'resumen' && (
        <div className="flex-1 flex flex-col space-y-6 overflow-y-auto pr-2 pb-4">
          <div className="grid grid-cols-3 gap-4 flex-shrink-0">
            {/* Licitaciones */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">Licitaciones</h3>
                <Badge variant="success">Operativo</Badge>
              </div>
              <div className="p-4 flex-1 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Licitaciones activas</span>
                  <span className="font-bold text-slate-800">14</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Ofertas recibidas</span>
                  <span className="font-bold text-slate-800">42</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Procesos en evaluación</span>
                  <span className="font-bold text-slate-800">5</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Riesgo IA promedio</span>
                  <span className="font-bold text-amber-600">Medio (3.2)</span>
                </div>
              </div>
            </div>

            {/* Adm. de Contratos */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">Adm. de Contratos</h3>
                <Badge variant="success">Operativo</Badge>
              </div>
              <div className="p-4 flex-1 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Contratos vigentes</span>
                  <span className="font-bold text-slate-800">128</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Próximos a vencer</span>
                  <span className="font-bold text-amber-600">12</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Documentos vencidos</span>
                  <span className="font-bold text-red-600">8</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Contratos bloqueados</span>
                  <span className="font-bold text-red-600">3</span>
                </div>
              </div>
            </div>

            {/* EDP Digital */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">EDP Digital</h3>
                <Badge variant="success">Operativo</Badge>
              </div>
              <div className="p-4 flex-1 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">EDP por aprobar</span>
                  <span className="font-bold text-slate-800">24</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">EDP observados</span>
                  <span className="font-bold text-amber-600">7</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Pendientes de HES</span>
                  <span className="font-bold text-slate-800">15</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Monto en revisión</span>
                  <span className="font-bold text-blue-600">$1.2M</span>
                </div>
              </div>
            </div>

            {/* Faros Smart Shipping */}
            <div className="bg-slate-50 rounded-lg border border-slate-200 shadow-sm flex flex-col opacity-75">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-slate-500">Faros Smart Shipping</h3>
                <Badge variant="info">En desarrollo</Badge>
              </div>
              <div className="p-4 flex-1 text-xs text-slate-500 italic flex items-center">
                Seguimiento logístico, ASN, recepción, despacho y trazabilidad de entregas.
              </div>
            </div>

            {/* Faros Cloud RFID */}
            <div className="bg-slate-50 rounded-lg border border-slate-200 shadow-sm flex flex-col opacity-75">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-slate-500">Faros Cloud RFID</h3>
                <Badge variant="info">En desarrollo</Badge>
              </div>
              <div className="p-4 flex-1 text-xs text-slate-500 italic flex items-center">
                Identificación, trazabilidad y control operacional mediante tecnología RFID.
              </div>
            </div>

            {/* Faros ERP */}
            <div className="bg-slate-50 rounded-lg border border-slate-200 shadow-sm flex flex-col opacity-75">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-slate-500">Faros ERP</h3>
                <Badge variant="info">En desarrollo</Badge>
              </div>
              <div className="p-4 flex-1 text-xs text-slate-500 italic flex items-center">
                Gestión ERP modular desarrollada por Faros.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Trazabilidad reciente del ecosistema</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 border-l-2 border-slate-200 pl-4 relative">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-blue-500"></div>
                <p className="text-xs text-slate-600">Licitación <span className="font-bold">SR-2024-001</span> pasó a evaluación técnica.</p>
              </div>
              <div className="flex items-start gap-3 border-l-2 border-slate-200 pl-4 relative">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-red-500"></div>
                <p className="text-xs text-slate-600">Contrato <span className="font-bold">CT-2024-001</span> presenta documento vencido.</p>
              </div>
              <div className="flex items-start gap-3 border-l-2 border-slate-200 pl-4 relative">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-orange-400"></div>
                <p className="text-xs text-slate-600">EDP <span className="font-bold">EDP-98122</span> fue observado por Back Office.</p>
              </div>
              <div className="flex items-start gap-3 border-l-2 border-slate-200 pl-4 relative">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-slate-400"></div>
                <p className="text-xs text-slate-600">Integración <span className="font-bold text-slate-800">SAP</span> generó alerta funcional.</p>
              </div>
              <div className="flex items-start gap-3 border-l-2 border-slate-200 pl-4 relative">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-copper-500"></div>
                <p className="text-xs text-slate-600"><span className="font-bold text-copper-700">Faros IA</span> generó matriz preliminar de cumplimiento.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'licitaciones' && (
        <div className="flex-1 flex flex-col space-y-6 overflow-hidden">
          <div className="grid grid-cols-6 gap-3 flex-shrink-0">
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Activas</p><p className="text-xl font-black mt-1">14</p></div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Críticas</p><p className="text-xl font-black mt-1 text-red-600">3</p></div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Ofertas</p><p className="text-xl font-black mt-1">42</p></div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Consultas</p><p className="text-xl font-black mt-1 text-amber-600">8</p></div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Evaluación</p><p className="text-xl font-black mt-1 text-blue-600">5</p></div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Adjudicados</p><p className="text-xl font-black mt-1 text-green-600">12</p></div>
          </div>
          <div className="bg-white border border-slate-200 shadow-sm rounded-lg flex-1 flex flex-col min-h-0 overflow-hidden">
             <div className="p-4 border-b border-slate-100"><h3 className="font-bold text-sm text-slate-800">Licitaciones Críticas</h3></div>
             <div className="flex-1 overflow-auto">
               <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200 z-10">
                    <tr>
                      <th className="px-4 py-3">LICITACIÓN</th>
                      <th className="px-4 py-3">ESTADO</th>
                      <th className="px-4 py-3">FUENTE</th>
                      <th className="px-4 py-3">RIESGO IA</th>
                      <th className="px-4 py-3 text-right">ACCIÓN</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-slate-700 divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-3"><p className="font-bold">LIC-2301-A - Mantenimiento</p></td>
                      <td className="px-4 py-3 text-orange-600 font-bold">Ofertas</td>
                      <td className="px-4 py-3"><Badge>SAP Ariba</Badge></td>
                      <td className="px-4 py-3 text-amber-600 font-bold">MEDIO (4.2)</td>
                      <td className="px-4 py-3 text-right"><button onClick={() => onNavigate('licitaciones/detalle/LIC-2301-A')} className="text-copper-600 font-bold hover:underline">Ir a Licitación</button></td>
                    </tr>
                  </tbody>
               </table>
             </div>
          </div>
        </div>
      )}

      {activeView === 'contratos' && (
        <div className="flex-1 flex flex-col space-y-6 overflow-hidden">
          <div className="grid grid-cols-6 gap-3 flex-shrink-0">
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Vigentes</p><p className="text-xl font-black mt-1">128</p></div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Próximos</p><p className="text-xl font-black mt-1 text-amber-600">12</p></div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Doc. Vencidos</p><p className="text-xl font-black mt-1 text-red-600">8</p></div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Bloqueados</p><p className="text-xl font-black mt-1 text-red-700">3</p></div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Modificaciones</p><p className="text-xl font-black mt-1">4</p></div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Liberadores</p><p className="text-xl font-black mt-1">2</p></div>
          </div>
          <div className="bg-white border border-slate-200 shadow-sm rounded-lg flex-1 flex flex-col min-h-0 overflow-hidden">
             <div className="p-4 border-b border-slate-100"><h3 className="font-bold text-sm text-slate-800">Contratos próximos a vencer</h3></div>
             <div className="flex-1 overflow-auto">
               <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200 z-10">
                    <tr>
                      <th className="px-4 py-3">CONTRATO</th>
                      <th className="px-4 py-3">PROVEEDOR</th>
                      <th className="px-4 py-3">ESTADO DOC.</th>
                      <th className="px-4 py-3">RESPONSABLE</th>
                      <th className="px-4 py-3 text-right">ACCIÓN</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-slate-700 divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-3"><p className="font-bold">CT-2023-089</p></td>
                      <td className="px-4 py-3">Constructora Norte SPA</td>
                      <td className="px-4 py-3"><Badge variant="error">Alerta</Badge></td>
                      <td className="px-4 py-3">Juan Pérez</td>
                      <td className="px-4 py-3 text-right"><button onClick={() => onNavigate('contratos/detalle/CT-2023-089')} className="text-copper-600 font-bold hover:underline">Ir a Contrato</button></td>
                    </tr>
                  </tbody>
               </table>
             </div>
          </div>
        </div>
      )}

      {activeView === 'edp' && (
        <div className="flex-1 flex flex-col space-y-6 overflow-hidden">
          <div className="grid grid-cols-6 gap-3 flex-shrink-0">
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Por Aprobar</p><p className="text-xl font-black mt-1">24</p></div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Observados</p><p className="text-xl font-black mt-1 text-amber-600">7</p></div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Pendientes HES</p><p className="text-xl font-black mt-1">15</p></div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">HES Liberadas</p><p className="text-xl font-black mt-1 text-green-600">8</p></div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">Monto Revisión</p><p className="text-xl font-black mt-1 text-blue-600">$1.2M</p></div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase">SLA Vencidos</p><p className="text-xl font-black mt-1 text-red-600">2</p></div>
          </div>
          <div className="bg-white border border-slate-200 shadow-sm rounded-lg flex-1 flex flex-col min-h-0 overflow-hidden">
             <div className="p-4 border-b border-slate-100"><h3 className="font-bold text-sm text-slate-800">Estados de Pago Críticos</h3></div>
             <div className="flex-1 overflow-auto">
               <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200 z-10">
                    <tr>
                      <th className="px-4 py-3">EDP</th>
                      <th className="px-4 py-3">PROVEEDOR</th>
                      <th className="px-4 py-3">CONTRATO / ODS</th>
                      <th className="px-4 py-3">ESTADO</th>
                      <th className="px-4 py-3">RESPONSABLE</th>
                      <th className="px-4 py-3 text-right">ACCIÓN</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-slate-700 divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-3"><p className="font-bold">EDP-98122</p></td>
                      <td className="px-4 py-3">Servicios Mineros Alpha</td>
                      <td className="px-4 py-3 font-mono text-[10px]">CT-2024-001</td>
                      <td className="px-4 py-3"><Badge variant="warning">Observado</Badge></td>
                      <td className="px-4 py-3">Back Office</td>
                      <td className="px-4 py-3 text-right"><button onClick={() => onNavigate('edp/detalle/EDP-98122')} className="text-copper-600 font-bold hover:underline">Resolver</button></td>
                    </tr>
                  </tbody>
               </table>
             </div>
          </div>
        </div>
      )}

      {(activeView === 'smart-shipping' || activeView === 'cloud-rfid' || activeView === 'erp') && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
           <div className="text-center space-y-3 max-w-sm">
             <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                <span className="text-xl font-black text-slate-400">F</span>
             </div>
             <h2 className="text-xl font-bold text-slate-800">Módulo en desarrollo</h2>
             <p className="text-sm text-slate-500 leading-relaxed">
               {activeView === 'smart-shipping' && "Este acceso permitirá integrar capacidades de seguimiento logístico, ASN, recepción, despacho y trazabilidad de entregas."}
               {activeView === 'cloud-rfid' && "Este acceso permitirá integrar funcionalidades de identificación, trazabilidad y control operacional mediante tecnología RFID."}
               {activeView === 'erp' && "Este acceso permitirá conectar la plataforma con funcionalidades ERP desarrolladas por Faros."}
             </p>
           </div>
           
           {/* Mock Data Layout to show it is a module */}
           <div className="grid grid-cols-4 gap-4 w-full max-w-4xl opacity-50 pointer-events-none mt-8">
             <div className="bg-white/50 p-4 border border-slate-200 rounded-lg shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{activeView === 'smart-shipping' ? 'ASN Pendientes' : activeView === 'cloud-rfid' ? 'Lecturas RFID' : 'Módulos ERP'}</p>
                <div className="h-6 bg-slate-200 rounded w-1/3 mt-2 animate-pulse"></div>
             </div>
             <div className="bg-white/50 p-4 border border-slate-200 rounded-lg shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{activeView === 'smart-shipping' ? 'Entregas Programadas' : activeView === 'cloud-rfid' ? 'Activos Trazados' : 'Usuarios Activos'}</p>
                <div className="h-6 bg-slate-200 rounded w-1/2 mt-2 animate-pulse"></div>
             </div>
             <div className="bg-white/50 p-4 border border-slate-200 rounded-lg shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{activeView === 'smart-shipping' ? 'Recepciones en curso' : activeView === 'cloud-rfid' ? 'Eventos de control' : 'Doc. Operacionales'}</p>
                <div className="h-6 bg-slate-200 rounded w-1/4 mt-2 animate-pulse"></div>
             </div>
             <div className="bg-white/50 p-4 border border-slate-200 rounded-lg shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{activeView === 'smart-shipping' ? 'Trazabilidad Logística' : activeView === 'cloud-rfid' ? 'Alertas Operacionales' : 'Integraciones internas'}</p>
                <div className="h-6 bg-slate-200 rounded w-1/3 mt-2 animate-pulse"></div>
             </div>
           </div>
        </div>
      )}

    </div>
  );
}

