import React from 'react';
import { Card, Badge, Button } from '../components/ui';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Filter, 
  Download, 
  Share2, 
  Clock, 
  AlertTriangle,
  Bot
} from 'lucide-react';

export function ReportesBIView() {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#F1F5F9] overflow-hidden p-6 space-y-6">
      
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
           <h1 className="text-lg font-bold text-slate-800 tracking-tight">Dashboard Analítico y Reportes BI</h1>
           <p className="text-xs text-slate-500 mt-1">Inteligencia operativa y detección de anomalías asistida por IA.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="border-slate-300 text-slate-600 bg-white shadow-sm font-bold gap-2 hover:bg-slate-50">
              <Filter className="w-4 h-4"/> Filtros
           </Button>
           <Button variant="outline" className="border-slate-300 text-slate-600 bg-white shadow-sm font-bold gap-2 hover:bg-slate-50">
              <Share2 className="w-4 h-4"/> Compartir
           </Button>
           <Button className="bg-[#B45309] hover:bg-copper-700 text-white font-bold gap-2 shadow-md">
              <Download className="w-4 h-4"/> Exportar PDF
           </Button>
        </div>
      </div>

      <div className="flex gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex-shrink-0 items-center">
         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Filtros Activos:</span>
         <select className="border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-700 bg-slate-50 focus:outline-none focus:border-copper-500 font-medium min-w-[120px]">
            <option>Mes: Octubre 2023</option>
            <option>Mes: Septiembre 2023</option>
            <option>Mes: Agosto 2023</option>
         </select>
         <select className="border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-700 bg-slate-50 focus:outline-none focus:border-copper-500 font-medium min-w-[150px]">
            <option>Proveedor: Todos</option>
            <option>Servicios Mineros Alpha</option>
            <option>Constructora Norte</option>
         </select>
         <select className="border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-700 bg-slate-50 focus:outline-none focus:border-copper-500 font-medium min-w-[150px]">
            <option>Contrato: Todos</option>
            <option>CT-2024-001</option>
            <option>CT-2023-089</option>
         </select>
      </div>

      <div className="grid grid-cols-4 gap-4 flex-shrink-0">
         <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Bot className="w-16 h-16 text-copper-600" /></div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10 flex items-center gap-1.5"><Bot className="w-3.5 h-3.5 text-copper-600"/> Ahorro IA mes</p>
            <p className="text-2xl font-black text-slate-800 mt-2 relative z-10">$120,000 <span className="text-xs text-slate-400 font-bold">USD</span></p>
            <div className="flex items-center gap-1 mt-2 text-xs font-bold text-emerald-600 relative z-10">
               <TrendingUp className="w-3.5 h-3.5" /> +15% vs mes anterior
            </div>
         </div>
         <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-amber-500"/> EDP Observados</p>
            <p className="text-2xl font-black text-slate-800 mt-2">12%</p>
            <div className="flex items-center gap-1 mt-2 text-xs font-bold text-red-500">
               <TrendingUp className="w-3.5 h-3.5" /> +2% vs mes anterior
            </div>
         </div>
         <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-red-500"/> SLAs Vencidos</p>
            <p className="text-2xl font-black text-slate-800 mt-2">4</p>
            <div className="flex items-center gap-1 mt-2 text-xs font-bold text-emerald-600">
               <TrendingUp className="w-3.5 h-3.5 rotate-180" /> -2 vs mes anterior
            </div>
         </div>
         <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contratos Vigentes</p>
            <p className="text-2xl font-black text-slate-800 mt-2">42</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-slate-500 font-medium">
               3 próximos a vencer
            </div>
         </div>
      </div>

      <Card className="flex-1 min-h-0 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col p-1 overflow-hidden relative">
         <div className="absolute inset-0 z-0 bg-slate-50 flex items-center justify-center p-8">
            <div className="max-w-2xl w-full">
               <h3 className="text-center font-bold text-slate-400 text-lg mb-8 uppercase tracking-widest">PowerBI Embedded</h3>
               <div className="grid grid-cols-2 gap-8">
                  {/* Gráfico 1 Simulado */}
                  <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-lg flex flex-col items-center justify-center h-48">
                     <p className="text-xs font-bold text-slate-600 mb-6">Estado de Contratos Vigilados vs Vencidos</p>
                     <div className="relative w-32 h-32 rounded-full border-[16px] border-emerald-400 border-r-slate-200 flex items-center justify-center">
                        <span className="font-black text-xl text-slate-700">85%</span>
                     </div>
                  </div>
                  {/* Gráfico 2 Simulado */}
                  <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-lg flex flex-col items-end justify-end h-48 pb-0 pt-8 gap-4 px-8 overflow-hidden">
                     <p className="text-xs font-bold text-slate-600 self-center absolute top-6">Tiempos de Ciclo de Aprobación HES</p>
                     <div className="w-full flex items-end gap-2 h-full">
                        <div className="w-1/4 bg-slate-200 h-[40%] rounded-t-sm"></div>
                        <div className="w-1/4 bg-slate-200 h-[60%] rounded-t-sm"></div>
                        <div className="w-1/4 bg-[#B45309] h-[90%] rounded-t-sm shadow-[0_0_15px_rgba(180,83,9,0.3)] border-t border-copper-400 relative group"><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-copper-700 opacity-0 group-hover:opacity-100 transition-opacity">14d</span></div>
                        <div className="w-1/4 bg-slate-200 h-[30%] rounded-t-sm"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Card>
    </div>
  );
}
