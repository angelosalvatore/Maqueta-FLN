import React, { useState } from 'react';
import { Card, Badge, Button } from '../components/ui';
import { 
  FileText, ShieldAlert, Sparkles, AlertTriangle, Eye, CheckCircle2, XCircle, Search, Filter, Bot, MoreHorizontal, FileCheck
} from 'lucide-react';
import { ViewMode } from '../types';

const mockDocumentos = [
  { id: 'DOC-1029', nombre: 'Seguro de Responsabilidad Civil', modulo: 'Contratos (CT-2024-001)', version: 'v1.2', vencimiento: 'Hace 15 días', responsable: 'Proveedor', estado: 'Vencido', color: 'error' },
  { id: 'DOC-1033', nombre: 'Certificado Laboral F30-1', modulo: 'EDP (EDP-98122)', version: 'v8.0', vencimiento: '30/06/2024', responsable: 'Proveedor', estado: 'Observado', color: 'warning' },
  { id: 'DOC-1004', nombre: 'Poliza de Garantía de Fiel Cumplimiento', modulo: 'Contratos (CT-2023-112)', version: 'v2.0', vencimiento: 'Completado', responsable: 'Proveedor', estado: 'Vigente', color: 'success' },
  { id: 'DOC-0992', nombre: 'Anexo Técnico de Seguridad', modulo: 'Licitaciones (LIC-2305-C)', version: 'v1.1', vencimiento: 'No aplica', responsable: 'Mandante', estado: 'Aprobado', color: 'success' },
];

export function DocumentosList({ mode }: { mode: ViewMode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const handleAction = (doc: any) => {
    setSelectedDoc(doc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDoc(null);
  };

  const docsVisibles = mode === 'proveedor' 
    ? mockDocumentos.filter(d => d.responsable === 'Proveedor')
    : mockDocumentos;

  return (
    <div className="p-6 space-y-6 flex-1 flex flex-col h-full overflow-hidden relative">
      {modalOpen && selectedDoc && (
         <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
               <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2"><FileText className="w-5 h-5 text-slate-500" /> Detalle de Documento</h3>
                  <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                     <XCircle className="w-5 h-5" />
                  </button>
               </div>
               <div className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                     <div>
                        <p className="text-lg font-bold text-slate-800">{selectedDoc.nombre}</p>
                        <p className="text-xs text-slate-500 mt-1">{selectedDoc.id} • {selectedDoc.modulo}</p>
                     </div>
                     <Badge variant={selectedDoc.color as any}>{selectedDoc.estado}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                     <div className="bg-slate-50 p-3 rounded border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Versión Actual</p>
                        <p className="text-sm font-bold text-slate-700 mt-1">{selectedDoc.version}</p>
                     </div>
                     <div className="bg-slate-50 p-3 rounded border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vencimiento</p>
                        <p className={`text-sm font-bold mt-1 ${selectedDoc.color === 'error' ? 'text-red-600' : 'text-slate-700'}`}>{selectedDoc.vencimiento}</p>
                     </div>
                  </div>

                  {selectedDoc.estado === 'Observado' && (
                     <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mt-2">
                        <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Motivo de Observación</p>
                        <p className="text-xs text-amber-800">El documento subido no corresponde al periodo indicado en el EDP o la firma digital no es válida.</p>
                     </div>
                  )}

                  <div className="border border-slate-200 rounded p-4 flex flex-col gap-2 bg-slate-50 mt-4">
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Acciones Disponibles</span>
                     <div className="grid grid-cols-2 gap-2 mt-1">
                        <Button variant="outline" className="justify-center gap-2 font-bold text-xs border-slate-200 text-slate-600 bg-white h-8 hover:bg-slate-100"><Eye className="w-3 h-3" /> Ver Documento</Button>
                        <Button variant="outline" className="justify-center gap-2 font-bold text-xs border-green-200 text-green-700 bg-green-50 h-8 hover:bg-green-100"><CheckCircle2 className="w-3 h-3" /> Aprobar</Button>
                        <Button variant="outline" className="justify-center gap-2 font-bold text-xs border-amber-200 text-amber-600 bg-amber-50 h-8 hover:bg-amber-100"><AlertTriangle className="w-3 h-3" /> Observar</Button>
                        <Button variant="outline" className="justify-center gap-2 font-bold text-xs border-red-200 text-red-600 bg-red-50 h-8 hover:bg-red-100"><XCircle className="w-3 h-3" /> Rechazar</Button>
                     </div>
                     <Button className="w-full mt-2 justify-center gap-2 font-bold text-xs border-copper-200 text-copper-700 bg-copper-50 h-8 hover:bg-copper-100 border transition-colors shadow-sm"><Sparkles className="w-3 h-3" /> Comparar versiones con IA</Button>
                  </div>
               </div>
            </div>
         </div>
      )}

      <div className="flex items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Repositorio Documental</h1>
          <p className="text-xs text-slate-500 mt-1">Gestión centralizada de pólizas, anexos y respaldos técnicos.</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex gap-4">
            <button className="text-sm font-bold border-b-2 border-copper-500 pb-4 px-2 -mb-4">Todos los Documentos</button>
            <button className="text-sm font-medium text-slate-400 pb-4 px-2 -mb-4">Requieren Acción</button>
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Filtrar documentos..." className="text-xs border border-slate-200 rounded-md px-3 py-1.5 w-64 focus:outline-none focus:border-copper-500" />
            <button className="bg-slate-100 p-1.5 rounded border border-slate-200 hover:bg-slate-200">⚙</button>
          </div>
        </div>
        
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200 z-10">
              <tr>
                <th className="px-4 py-3">DOCUMENTO / VER.</th>
                <th className="px-4 py-3">MÓDULO ASOCIADO</th>
                <th className="px-4 py-3">VENCIMIENTO</th>
                <th className="px-4 py-3">RESPONSABLE</th>
                <th className="px-4 py-3">ESTADO</th>
                <th className="px-4 py-3 text-right">ACCIÓN</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-700 divide-y divide-slate-100">
              {docsVisibles.map((row, i) => (
                <tr key={i} className={`hover:bg-slate-50 transition-colors group ${row.color === 'error' ? 'bg-red-50/20' : ''}`}>
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-800 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-slate-400"/> {row.nombre}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 ml-5 font-mono">{row.version}</p>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-600">
                    <Badge variant="outline" className="bg-slate-100">{row.modulo}</Badge>
                  </td>
                  <td className={`px-4 py-3 font-mono font-bold ${row.color === 'error' ? 'text-red-600' : 'text-slate-500'}`}>
                    {row.vencimiento}
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-medium">
                    {row.responsable}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={row.color as any}>{row.estado}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-copper-600 font-bold hover:underline" onClick={() => handleAction(row)}>Gestionar</button>
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
