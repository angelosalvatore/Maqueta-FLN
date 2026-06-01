import React from 'react';
import { Card, Badge, Button } from '../components/ui';
import { 
  FileText, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  FileCheck
} from 'lucide-react';

export function ProveedorDashboard({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Portal Proveedor</h1>
          <p className="text-slate-500 mt-1">Servicios Industriales S.A.</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Licitaciones Invitadas', value: '3', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Contratos Vigentes', value: '4', icon: Briefcase, color: 'text-navy-600', bg: 'bg-navy-50' },
          { label: 'Docs Pendientes', value: '2', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'EDP Observados', value: '1', icon: FileCheck, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'EDP Aprobados (Mes)', value: '3', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((kpi, i) => (
          <Card key={i} className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">{kpi.label}</p>
              <h3 className="text-xl font-bold text-navy-900 mt-1">{kpi.value}</h3>
            </div>
            <div className={`p-2.5 rounded-lg ${kpi.bg} ${kpi.color}`}>
              <kpi.icon className="w-5 h-5" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Licitaciones Activas */}
        <Card>
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-navy-900">Licitaciones Activas</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { id: 'LIC-2024-001', name: 'Mantenimiento Planta Chancado', status: 'Recepción de ofertas', date: 'Cierra en 3 días' },
              { id: 'LIC-2024-015', name: 'Servicios de Aseo Industrial', status: 'En preparación', date: 'Cierra en 7 días' },
            ].map((lic, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-navy-900">{lic.id}</p>
                  <p className="text-sm text-slate-600">{lic.name}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={lic.status === 'En preparación' ? 'warning' : 'info'}>{lic.status}</Badge>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {lic.date}
                    </span>
                  </div>
                </div>
                <Button onClick={() => onNavigate('licitaciones/detalle/' + lic.id)} variant="outline" size="sm">Ingresar Oferta</Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Tareas Pendientes */}
        <Card>
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-navy-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Documentos y Tareas Pendientes
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {[
               { title: 'Subir Certificado Laboral (F30-1)', doc: 'Contrato CT-099', status: 'Vencido', urgent: true },
               { title: 'Corregir EDP #1045', doc: 'Monto línea 2 no coincide con ODS', status: 'Observado', urgent: true },
               { title: 'Renovar Boleta de Garantía', doc: 'Contrato CT-102', status: 'Próximo a vencer', urgent: false },
            ].map((task, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm text-slate-800">{task.title}</p>
                    {task.urgent && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{task.doc}</p>
                  <div className="mt-2">
                     <Badge variant={task.urgent ? 'error' : 'warning'}>{task.status}</Badge>
                  </div>
                </div>
                <Button onClick={() => onNavigate('tareas')} variant="outline" size="sm">{task.title.includes('Subir') ? 'Cargar' : 'Revisar'}</Button>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}
