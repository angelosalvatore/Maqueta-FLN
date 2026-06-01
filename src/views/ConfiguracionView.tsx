import React, { useState } from 'react';
import { Card, Button, Badge } from '../components/ui';
import { 
  Settings, Users, Shield, FileText, Share2, Bell, Bot, Layers, Save, CheckCircle2,
  Palette, Monitor, Type, Layout, Sidebar, Eye, RotateCcw, PaintRoller
} from 'lucide-react';

export function ConfiguracionView() {
  const [activeTab, setActiveTab] = useState('ia');
  const [successMsg, setSuccessMsg] = useState('');

  // States for Apariencia
  const [themePref, setThemePref] = useState('light');
  const [colorPref, setColorPref] = useState('faros');
  const [densityPref, setDensityPref] = useState('normal');
  const [fontPref, setFontPref] = useState('normal');
  const [sidebarPref, setSidebarPref] = useState('expanded');
  const [applyTo, setApplyTo] = useState('mandante');

  const [showIA, setShowIA] = useState(true);
  const [showTooltips, setShowTooltips] = useState(true);
  const [keepFilters, setKeepFilters] = useState(true);
  const [rememberView, setRememberView] = useState(true);

  const handleSave = () => {
    setSuccessMsg('Configuración guardada exitosamente');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'workflows', label: 'Flujos Aprobación', icon: Share2 },
    { id: 'roles', label: 'Usuarios y Roles', icon: Users },
    { id: 'docs', label: 'Documentos Obligatorios', icon: FileText },
    { id: 'monedas', label: 'Monedas / Unidad de medida', icon: Layers },
    { id: 'hes', label: 'Parámetros HES', icon: CheckCircle2 },
    { id: 'ia', label: 'Agentes IA', icon: Bot },
    { id: 'apariencia', label: 'Apariencia', icon: Palette },
  ];

  return (
    <div className="p-6 space-y-6 flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Configuración del Sistema</h1>
          <p className="text-xs text-slate-500 mt-1">Parametrización global de la plataforma Faros.</p>
        </div>
        {successMsg && (
          <div className="bg-green-50 text-green-700 px-4 py-2 flex gap-2 items-center rounded border border-green-200 text-sm font-bold">
             <CheckCircle2 className="w-4 h-4"/> {successMsg}
          </div>
        )}
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Sidebar Nav */}
        <div className="w-64 flex-shrink-0 bg-white border border-slate-200 rounded-lg p-2 h-full overflow-y-auto shadow-sm">
          {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors font-bold ${
                  activeTab === tab.id
                    ? 'bg-slate-100 text-slate-800 shadow-[inset_2px_0_0_#B45309]'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
               }`}
             >
               <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-copper-600' : 'text-slate-400'}`} />
               {tab.label}
             </button>
          ))}
        </div>

        {/* Content */}
        <Card className="flex-1 bg-white border-slate-200 overflow-y-auto p-6 shadow-sm">
          
          {activeTab === 'workflows' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                 <div>
                    <h2 className="text-base font-bold text-slate-800 flex items-center gap-2"><Share2 className="w-5 h-5 text-copper-600"/> Flujos Aprobación</h2>
                    <p className="text-xs text-slate-500 mt-1">Configure las rutas de aprobación y visación según condiciones dinámicas.</p>
                 </div>
                 <Button className="bg-[#B45309] hover:bg-copper-700 text-white font-bold px-6 border-none shadow-md">
                    + Nuevo Flujo
                 </Button>
              </div>

              <div>
                 <table className="w-full text-left border-collapse">
                    <thead className="bg-[#0F172A] text-white text-[10px] uppercase font-bold tracking-wide">
                       <tr>
                          <th className="px-4 py-3 rounded-tl-lg">Proceso</th>
                          <th className="px-4 py-3">Módulo</th>
                          <th className="px-4 py-3">Condición</th>
                          <th className="px-4 py-3">Aprobadores</th>
                          <th className="px-4 py-3 text-center">Estado</th>
                          <th className="px-4 py-3 text-right">Acción</th>
                       </tr>
                    </thead>
                    <tbody className="text-xs text-slate-700 divide-y divide-slate-100 font-medium">
                       <tr>
                          <td className="px-4 py-3 font-bold text-slate-800">Creación EDP</td>
                          <td className="px-4 py-3 text-slate-500">EDP Digital</td>
                          <td className="px-4 py-3 font-mono text-[10px]">Monto {'>'} 1,000 USD</td>
                          <td className="px-4 py-3">
                             <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 flex-wrap">
                                <span className="bg-slate-100 px-1 py-0.5 rounded border border-slate-200">Administrador de Contrato</span> <span>→</span>
                                <span className="bg-slate-100 px-1 py-0.5 rounded border border-slate-200">Jefe Turno</span> <span>→</span>
                                <span className="bg-slate-100 px-1 py-0.5 rounded border border-slate-200">OTC</span> <span>→</span>
                                <span className="bg-slate-100 px-1 py-0.5 rounded border border-slate-200">BO</span>
                             </div>
                          </td>
                          <td className="px-4 py-3 text-center"><Badge variant="success">Activo</Badge></td>
                          <td className="px-4 py-3 text-right">
                             <button className="text-copper-600 hover:underline font-bold text-[10px] mr-2">Editar</button>
                             <button className="text-slate-500 hover:text-red-600 hover:underline font-bold text-[10px]">Desactivar</button>
                          </td>
                       </tr>
                    </tbody>
                 </table>
              </div>
            </div>
          )}
          {activeTab === 'ia' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                 <div>
                    <h2 className="text-base font-bold text-slate-800 flex items-center gap-2"><Bot className="w-5 h-5 text-copper-600"/> Configuración de Faros AI Agent</h2>
                    <p className="text-xs text-slate-500 mt-1">Parametrice el comportamiento, tono y límites del agente por módulo.</p>
                 </div>
                 <Button onClick={handleSave} className="bg-[#B45309] hover:bg-copper-700 text-white font-bold px-6 border-none shadow-md gap-2">
                    <Save className="w-4 h-4"/> Guardar
                 </Button>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <div>
                       <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Tono del Agente</label>
                       <select className="w-full mt-2 border border-slate-300 rounded p-2 text-sm bg-white focus:outline-none focus:border-copper-500">
                          <option>Formal/Corporativo (Default)</option>
                          <option>Directo/Conciso</option>
                          <option>Asistencial/Amigable</option>
                       </select>
                    </div>
                    <div>
                       <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest mt-4">Restricciones de Acción</label>
                       <div className="space-y-3 mt-2">
                          <label className="flex items-center gap-2">
                             <input type="checkbox" defaultChecked className="rounded text-copper-600 focus:ring-copper-500" />
                             <span className="text-sm text-slate-600 font-medium">Requerir confirmación humana para aprobaciones (Regla SEG-05)</span>
                          </label>
                          <label className="flex items-center gap-2">
                             <input type="checkbox" defaultChecked className="rounded text-copper-600 focus:ring-copper-500" />
                             <span className="text-sm text-slate-600 font-medium">Sugerir texto pero no autocompletar cajas (Seguridad)</span>
                          </label>
                          <label className="flex items-center gap-2">
                             <input type="checkbox" className="rounded text-copper-600 focus:ring-copper-500" />
                             <span className="text-sm text-slate-600 font-medium">Permitir enviar correos a proveedores en nombre de Mandante</span>
                          </label>
                       </div>
                    </div>
                 </div>
                 
                 <div className="space-y-4">
                    <div>
                       <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Base de Conocimiento</label>
                       <div className="mt-2 border border-slate-200 rounded p-3 text-sm text-slate-600 space-y-2">
                          <div className="flex items-center justify-between bg-slate-50 p-2 rounded">
                             <span className="font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-emerald-500"/> Políticas de Compras 2024</span>
                             <Badge variant="success">Indexado</Badge>
                          </div>
                          <div className="flex items-center justify-between bg-slate-50 p-2 rounded">
                             <span className="font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-emerald-500"/> Base Contratos Genéricos v3</span>
                             <Badge variant="success">Indexado</Badge>
                          </div>
                          <button className="text-copper-600 text-xs font-bold hover:underline mt-2 w-full text-left">+ Cargar nuevo manual corporativo</button>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'docs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                 <div>
                    <h2 className="text-base font-bold text-slate-800 flex items-center gap-2"><FileText className="w-5 h-5 text-slate-600"/> Matriz de Documentos Obligatorios</h2>
                    <p className="text-xs text-slate-500 mt-1">Configure qué documentos son exigibles por tipo de servicio.</p>
                 </div>
                 <Button onClick={handleSave} className="bg-[#B45309] hover:bg-copper-700 text-white font-bold px-6 border-none shadow-md gap-2">
                    <Save className="w-4 h-4"/> Guardar
                 </Button>
              </div>

              <div>
                 <table className="w-full text-left border-collapse">
                    <thead className="bg-[#0F172A] text-white text-[10px] uppercase font-bold tracking-wide">
                       <tr>
                          <th className="px-4 py-3 rounded-tl-lg">Tipo Documento</th>
                          <th className="px-4 py-3 text-center">Contrato Obras</th>
                          <th className="px-4 py-3 text-center">Servicios Profesionales</th>
                          <th className="px-4 py-3 text-center">Suministro</th>
                          <th className="px-4 py-3 text-center">Acción</th>
                       </tr>
                    </thead>
                    <tbody className="text-xs text-slate-700 divide-y divide-slate-100 font-medium">
                       <tr>
                          <td className="px-4 py-3 font-bold text-slate-800">Boleta de Garantía Fiel Cumplimiento</td>
                          <td className="px-4 py-3 text-center"><input type="checkbox" defaultChecked className="rounded"/></td>
                          <td className="px-4 py-3 text-center"><input type="checkbox" defaultChecked className="rounded"/></td>
                          <td className="px-4 py-3 text-center"><input type="checkbox" defaultChecked className="rounded"/></td>
                          <td className="px-4 py-3 text-center"><button className="text-copper-600 hover:underline font-bold text-[10px]">Editar Regla</button></td>
                       </tr>
                       <tr>
                          <td className="px-4 py-3 font-bold text-slate-800">Seguro de Responsabilidad Civil</td>
                          <td className="px-4 py-3 text-center"><input type="checkbox" defaultChecked className="rounded"/></td>
                          <td className="px-4 py-3 text-center"><input type="checkbox" className="rounded"/></td>
                          <td className="px-4 py-3 text-center"><input type="checkbox" className="rounded"/></td>
                          <td className="px-4 py-3 text-center"><button className="text-copper-600 hover:underline font-bold text-[10px]">Editar Regla</button></td>
                       </tr>
                       <tr>
                          <td className="px-4 py-3 font-bold text-slate-800">Certificado Laboral F30-1</td>
                          <td className="px-4 py-3 text-center"><input type="checkbox" defaultChecked className="rounded"/></td>
                          <td className="px-4 py-3 text-center"><input type="checkbox" defaultChecked className="rounded"/></td>
                          <td className="px-4 py-3 text-center"><input type="checkbox" className="rounded"/></td>
                          <td className="px-4 py-3 text-center"><button className="text-copper-600 hover:underline font-bold text-[10px]">Editar Regla</button></td>
                       </tr>
                    </tbody>
                 </table>
                 <button className="mt-4 text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-4 py-2 rounded hover:bg-slate-100">+ Añadir nuevo documento</button>
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                 <div>
                    <h2 className="text-base font-bold text-slate-800 flex items-center gap-2"><Users className="w-5 h-5 text-copper-600"/> Usuarios, Roles y Permisos</h2>
                    <p className="text-xs text-slate-500 mt-1">Gestión de matrices de acceso, capacidades operativas y permisos para interactuar con Inteligencia Artificial.</p>
                 </div>
                 <Button onClick={handleSave} className="bg-[#B45309] hover:bg-copper-700 text-white font-bold px-6 border-none shadow-md gap-2">
                    <Save className="w-4 h-4"/> Guardar
                 </Button>
              </div>

              <div>
                 <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
                    <thead className="bg-[#0F172A] text-white text-[10px] uppercase font-bold tracking-wide">
                       <tr>
                          <th className="px-4 py-3 rounded-tl-lg">Rol</th>
                          <th className="px-4 py-3">Tipo Usuario</th>
                          <th className="px-4 py-3">Módulos</th>
                          <th className="px-4 py-3 text-center">Puede Aprobar</th>
                          <th className="px-4 py-3 text-center">Puede Observar</th>
                          <th className="px-4 py-3 text-center">Puede Reasignar</th>
                          <th className="px-4 py-3 text-center">Ver Otros Prov.</th>
                          <th className="px-4 py-3 text-center">Usar Faros AI</th>
                          <th className="px-4 py-3">Permisos IA</th>
                          <th className="px-4 py-3 text-center">Estado</th>
                          <th className="px-4 py-3 text-right rounded-tr-lg">Acción</th>
                       </tr>
                    </thead>
                    <tbody className="text-xs text-slate-700 divide-y divide-slate-100 font-medium">
                       <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-bold text-slate-800">Administrador Plataforma</td>
                          <td className="px-4 py-3"><Badge variant="default">Interno / Root</Badge></td>
                          <td className="px-4 py-3 text-slate-500 text-[10px]">Todos</td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-copper-500 mx-auto" /></td>
                          <td className="px-4 py-3 flex flex-wrap gap-1 w-48">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] text-slate-600 border border-slate-200">Full Access</span>
                          </td>
                          <td className="px-4 py-3 text-center"><Badge variant="success">Activo</Badge></td>
                          <td className="px-4 py-3 text-right text-copper-600 font-bold hover:underline cursor-pointer">Editar</td>
                       </tr>
                       <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-bold text-slate-800">Mandante Senior</td>
                          <td className="px-4 py-3"><Badge variant="outline">Interno</Badge></td>
                          <td className="px-4 py-3 text-slate-500 text-[10px]">Dash., Lic., Cont., EDP, Rep.</td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-copper-500 mx-auto" /></td>
                          <td className="px-4 py-3 flex flex-wrap gap-1 w-48">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] text-slate-600 border border-slate-200">Resumir docs</span>
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] text-slate-600 border border-slate-200">Detectar riesgos</span>
                          </td>
                          <td className="px-4 py-3 text-center"><Badge variant="success">Activo</Badge></td>
                          <td className="px-4 py-3 text-right text-copper-600 font-bold hover:underline cursor-pointer">Editar</td>
                       </tr>
                       <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-bold text-slate-800">Administrador de Contrato</td>
                          <td className="px-4 py-3"><Badge variant="outline">Interno</Badge></td>
                          <td className="px-4 py-3 text-slate-500 text-[10px]">Cont., EDP, Tar.</td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-copper-500 mx-auto" /></td>
                          <td className="px-4 py-3 flex flex-wrap gap-1 w-48">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] text-slate-600 border border-slate-200">Comparar versiones</span>
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] text-slate-600 border border-slate-200">Consultar docs</span>
                          </td>
                          <td className="px-4 py-3 text-center"><Badge variant="success">Activo</Badge></td>
                          <td className="px-4 py-3 text-right text-copper-600 font-bold hover:underline cursor-pointer">Editar</td>
                       </tr>
                       <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-bold text-slate-800">Evaluador Técnico</td>
                          <td className="px-4 py-3"><Badge variant="outline">Interno</Badge></td>
                          <td className="px-4 py-3 text-slate-500 text-[10px]">Licitaciones</td>
                          <td className="px-4 py-3 text-center"></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-copper-500 mx-auto" /></td>
                          <td className="px-4 py-3 flex flex-wrap gap-1 w-48">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] text-slate-600 border border-slate-200">Gen. matriz</span>
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] text-slate-600 border border-slate-200">Detectar riesgos</span>
                          </td>
                          <td className="px-4 py-3 text-center"><Badge variant="success">Activo</Badge></td>
                          <td className="px-4 py-3 text-right text-copper-600 font-bold hover:underline cursor-pointer">Editar</td>
                       </tr>
                       <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-bold text-slate-800">Back Office</td>
                          <td className="px-4 py-3"><Badge variant="outline">Interno</Badge></td>
                          <td className="px-4 py-3 text-slate-500 text-[10px]">EDP, Proveedores</td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-copper-500 mx-auto" /></td>
                          <td className="px-4 py-3 flex flex-wrap gap-1 w-48">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] text-slate-600 border border-slate-200">Consultar docs</span>
                          </td>
                          <td className="px-4 py-3 text-center"><Badge variant="success">Activo</Badge></td>
                          <td className="px-4 py-3 text-right text-copper-600 font-bold hover:underline cursor-pointer">Editar</td>
                       </tr>
                       <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-bold text-slate-800">ITO / OTC</td>
                          <td className="px-4 py-3"><Badge variant="outline">Interno/Terreno</Badge></td>
                          <td className="px-4 py-3 text-slate-500 text-[10px]">EDP, Tareas</td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"></td>
                          <td className="px-4 py-3 flex flex-wrap gap-1 w-48">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] text-slate-400 border border-slate-200">Sin acceso IA</span>
                          </td>
                          <td className="px-4 py-3 text-center"><Badge variant="success">Activo</Badge></td>
                          <td className="px-4 py-3 text-right text-copper-600 font-bold hover:underline cursor-pointer">Editar</td>
                       </tr>
                       <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-bold text-slate-800">Proveedor Administrador</td>
                          <td className="px-4 py-3"><Badge variant="warning" className="bg-amber-100 text-amber-800">Externo</Badge></td>
                          <td className="px-4 py-3 text-slate-500 text-[10px]">Licitaciones, Contratos, EDP</td>
                          <td className="px-4 py-3 text-center"></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"></td>
                          <td className="px-4 py-3 text-center"></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-copper-500 mx-auto" /></td>
                          <td className="px-4 py-3 flex flex-wrap gap-1 w-48">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] text-slate-600 border border-slate-200">Consultar docs propios</span>
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] text-slate-600 border border-slate-200">Requiere confirm.</span>
                            <span className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-[9px] border border-red-200">Prohibido otros prov.</span>
                          </td>
                          <td className="px-4 py-3 text-center"><Badge variant="success">Activo</Badge></td>
                          <td className="px-4 py-3 text-right text-copper-600 font-bold hover:underline cursor-pointer">Editar</td>
                       </tr>
                       <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-bold text-slate-800">Proveedor Usuario</td>
                          <td className="px-4 py-3"><Badge variant="warning" className="bg-amber-100 text-amber-800">Externo</Badge></td>
                          <td className="px-4 py-3 text-slate-500 text-[10px]">EDP, Tareas</td>
                          <td className="px-4 py-3 text-center"></td>
                          <td className="px-4 py-3 text-center"><CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /></td>
                          <td className="px-4 py-3 text-center"></td>
                          <td className="px-4 py-3 text-center"></td>
                          <td className="px-4 py-3 text-center"></td>
                          <td className="px-4 py-3 flex flex-wrap gap-1 w-48">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] text-slate-400 border border-slate-200">Sin acceso IA</span>
                          </td>
                          <td className="px-4 py-3 text-center"><Badge variant="success">Activo</Badge></td>
                          <td className="px-4 py-3 text-right text-copper-600 font-bold hover:underline cursor-pointer">Editar</td>
                       </tr>
                    </tbody>
                 </table>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6">
                 <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-slate-500"/> Restricciones de IA por rol</h3>
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                       <p className="text-xs font-bold text-slate-800 mb-2">Proveedor</p>
                       <p className="text-[11px] text-slate-600 leading-relaxed">El proveedor solo puede consultar con el agente Faros AI referenciando sus propios documentos, ofertas, contratos y EDP asociados. Prohibición estricta de ver datos de competencia.</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                       <p className="text-xs font-bold text-slate-800 mb-2">Evaluador Técnico</p>
                       <p className="text-[11px] text-slate-600 leading-relaxed">Puede usar la Inteligencia Artificial para autogenerar matrices técnicas y comparar ofertas, pero <span className="font-bold text-amber-600">no puede automatizar</span> adjudicaciones sin validación humana explícita.</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                       <p className="text-xs font-bold text-slate-800 mb-2">Back Office</p>
                       <p className="text-[11px] text-slate-600 leading-relaxed">Capacidad de auditar consistencia de EDP y anexos usando IA para detectar discrepancias, pero no puede liberar las HES (Hojas de Entrada) al flujo de pago sin autorización de nivel superior.</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                       <p className="text-xs font-bold text-slate-800 mb-2">Administrador Plataforma</p>
                       <p className="text-[11px] text-slate-600 leading-relaxed">Posee acceso irrestricto para parametrizar agentes de IA corporativos, auditar logs de completitud y gestionar las bases de conocimiento centralizadas de la compañía.</p>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'apariencia' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                 <div>
                    <h2 className="text-base font-bold text-slate-800 flex items-center gap-2"><Palette className="w-5 h-5 text-copper-600"/> Apariencia</h2>
                    <p className="text-xs text-slate-500 mt-1">Personalización visual de la plataforma por mandante y usuario.</p>
                 </div>
                 <div className="flex items-center gap-2">
                    <Button variant="outline" className="text-slate-600 font-bold px-4 border-slate-200 shadow-sm gap-2 text-xs">
                       <RotateCcw className="w-3.5 h-3.5"/> Restaurar valores por defecto
                    </Button>
                    <Button onClick={handleSave} className="bg-[#B45309] hover:bg-copper-700 text-white font-bold px-6 border-none shadow-md gap-2">
                       <Save className="w-4 h-4"/> Guardar cambios
                    </Button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="md:col-span-2 space-y-8">
                    
                    {/* Secciones de Config */}
                    <div className="space-y-4">
                       <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                          <PaintRoller className="w-4 h-4 text-slate-500"/> Tema y Color
                       </h3>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <label className="block text-xs font-bold text-slate-700 mb-1">Tema visual</label>
                             <select value={themePref} onChange={e => setThemePref(e.target.value)} className="w-full text-xs border border-slate-200 rounded-md px-3 py-2 bg-white text-slate-600 focus:outline-none focus:border-copper-500 font-medium">
                                <option value="light">Claro</option>
                                <option value="dark">Oscuro</option>
                                <option value="system">Sistema / automático</option>
                             </select>
                          </div>
                          <div>
                             <label className="block text-xs font-bold text-slate-700 mb-1">Color principal</label>
                             <select value={colorPref} onChange={e => setColorPref(e.target.value)} className="w-full text-xs border border-slate-200 rounded-md px-3 py-2 bg-white text-slate-600 focus:outline-none focus:border-copper-500 font-medium">
                                <option value="faros">Color corporativo Faros</option>
                                <option value="blue">Azul corporativo</option>
                                <option value="green">Verde operativo</option>
                                <option value="orange">Naranjo Faros</option>
                                <option value="custom">Personalizado</option>
                             </select>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                          <Layout className="w-4 h-4 text-slate-500"/> Layout y Densidad
                       </h3>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <label className="block text-xs font-bold text-slate-700 mb-1">Densidad de interfaz</label>
                             <select value={densityPref} onChange={e => setDensityPref(e.target.value)} className="w-full text-xs border border-slate-200 rounded-md px-3 py-2 bg-white text-slate-600 focus:outline-none focus:border-copper-500 font-medium">
                                <option value="compact">Compacta</option>
                                <option value="normal">Normal</option>
                                <option value="spacious">Amplia</option>
                             </select>
                          </div>
                          <div>
                             <label className="block text-xs font-bold text-slate-700 mb-1">Tamaño de fuente</label>
                             <select value={fontPref} onChange={e => setFontPref(e.target.value)} className="w-full text-xs border border-slate-200 rounded-md px-3 py-2 bg-white text-slate-600 focus:outline-none focus:border-copper-500 font-medium">
                                <option value="xs">Muy pequeña</option>
                                <option value="sm">Pequeña</option>
                                <option value="normal">Normal</option>
                                <option value="lg">Grande</option>
                             </select>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                          <Sidebar className="w-4 h-4 text-slate-500"/> Menú lateral e Interacción
                       </h3>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <label className="block text-xs font-bold text-slate-700 mb-1">Estilo de menú lateral</label>
                             <select value={sidebarPref} onChange={e => setSidebarPref(e.target.value)} className="w-full text-xs border border-slate-200 rounded-md px-3 py-2 bg-white text-slate-600 focus:outline-none focus:border-copper-500 font-medium">
                                <option value="expanded">Expandido</option>
                                <option value="compact">Compacto</option>
                                <option value="icons">Solo íconos</option>
                             </select>
                          </div>
                          <div className="flex flex-col justify-center gap-2 pt-4">
                             <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                                <input type="checkbox" checked={showIA} onChange={e => setShowIA(e.target.checked)} className="rounded text-copper-600 focus:ring-copper-500"/>
                                Mostrar panel de IA lateral por defecto
                             </label>
                             <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                                <input type="checkbox" checked={showTooltips} onChange={e => setShowTooltips(e.target.checked)} className="rounded text-copper-600 focus:ring-copper-500"/>
                                Mostrar tooltips de ayuda
                             </label>
                             <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                                <input type="checkbox" checked={keepFilters} onChange={e => setKeepFilters(e.target.checked)} className="rounded text-copper-600 focus:ring-copper-500"/>
                                Mantener filtros al cambiar de módulo
                             </label>
                             <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                                <input type="checkbox" checked={rememberView} onChange={e => setRememberView(e.target.checked)} className="rounded text-copper-600 focus:ring-copper-500"/>
                                Recordar última vista utilizada
                             </label>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                          <Users className="w-4 h-4 text-slate-500"/> Alcance de la configuración
                       </h3>
                       <div className="flex gap-4">
                             <label className={`flex items-center gap-2 text-xs font-bold p-3 border rounded-md cursor-pointer flex-1 transition-all ${applyTo === 'mandante' ? 'border-copper-500 bg-copper-50 text-copper-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                                <input type="radio" name="applyTo" value="mandante" checked={applyTo === 'mandante'} onChange={() => setApplyTo('mandante')} className="text-copper-600 focus:ring-copper-500 h-4 w-4"/>
                                Aplicar como configuración del mandante
                             </label>
                             <label className={`flex items-center gap-2 text-xs font-bold p-3 border rounded-md cursor-pointer flex-1 transition-all ${applyTo === 'user' ? 'border-copper-500 bg-copper-50 text-copper-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                                <input type="radio" name="applyTo" value="user" checked={applyTo === 'user'} onChange={() => setApplyTo('user')} className="text-copper-600 focus:ring-copper-500 h-4 w-4"/>
                                Aplicar solo a mi usuario
                             </label>
                       </div>
                    </div>

                 </div>

                 <div className="md:col-span-1">
                    <div className="sticky top-6 rounded-xl border border-slate-200 overflow-hidden shadow-sm bg-white">
                       <div className="bg-slate-100 px-3 py-2 border-b border-slate-200 flex items-center gap-2">
                          <Eye className="w-4 h-4 text-slate-500" />
                          <span className="text-xs font-bold text-slate-700">Vista Previa</span>
                       </div>
                       
                       {/* Mini Maqueta - Se adapta a la config */}
                       <div className={`flex w-full aspect-[4/3] bg-slate-50 overflow-hidden relative ${themePref === 'dark' ? 'bg-slate-900 filter invert hue-rotate-180' : ''}`}>
                          {/* Mini Sidebar */}
                          <div className={`${sidebarPref === 'compact' ? 'w-4' : sidebarPref === 'icons' ? 'w-2' : 'w-10'} bg-slate-900 h-full flex flex-col items-center py-2 gap-2 transition-all`}>
                             <div className="w-2 h-2 rounded-full bg-copper-500 mb-2"></div>
                             <div className="w-2 h-0.5 rounded-sm bg-slate-700"></div>
                             <div className="w-2 h-0.5 rounded-sm bg-slate-700"></div>
                             <div className="w-2 h-0.5 rounded-sm bg-slate-700"></div>
                          </div>
                          
                          {/* Mini Content */}
                          <div className={`flex-1 p-3 flex flex-col gap-2 ${densityPref === 'compact' ? 'p-1.5 gap-1' : densityPref === 'spacious' ? 'p-4 gap-3' : ''}`}>
                             <div className="flex justify-between items-center">
                                <div className="w-16 h-2 rounded bg-slate-200"></div>
                                <div className="w-8 h-3 rounded bg-copper-600 border-none"></div>
                             </div>
                             
                             <div className="flex gap-2">
                                <div className="flex-1 bg-white border border-slate-200 rounded p-2 shadow-sm">
                                   <div className="w-8 h-1.5 rounded bg-slate-200 mb-2"></div>
                                   <div className="w-12 h-3 rounded bg-slate-800"></div>
                                </div>
                                <div className="flex-1 bg-white border border-slate-200 rounded p-2 shadow-sm relative">
                                    <div className="w-8 h-1.5 rounded bg-slate-200 mb-2"></div>
                                    <div className="w-10 h-3 rounded bg-slate-800"></div>
                                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></div>
                                </div>
                             </div>

                             <div className="bg-white border border-slate-200 rounded p-2 shadow-sm flex-1">
                                <div className="flex justify-between border-b border-slate-100 pb-1 mb-1">
                                   <div className="w-8 h-1 rounded bg-slate-300"></div>
                                   <div className="w-6 h-1 rounded bg-slate-300"></div>
                                   <div className="w-10 h-1 rounded bg-slate-300"></div>
                                </div>
                                <div className="flex justify-between py-1 border-b border-slate-50">
                                   <div className="w-10 h-1.5 rounded bg-slate-600"></div>
                                   <div className="w-12 h-2.5 rounded-full bg-green-100 text-green-700 border border-green-200"></div>
                                   <div className="w-4 h-1.5 rounded bg-copper-500"></div>
                                </div>
                                <div className="flex justify-between py-1">
                                   <div className="w-10 h-1.5 rounded bg-slate-600"></div>
                                   <div className="w-12 h-2.5 rounded-full bg-red-100 text-red-700 border border-red-200 opacity-80"></div>
                                   <div className="w-4 h-1.5 rounded bg-copper-500"></div>
                                </div>
                             </div>
                          </div>

                          {/* Mini IA Panel */}
                          {showIA && (
                             <div className="w-12 border-l border-slate-200 bg-white h-full p-2 flex flex-col gap-2">
                                <div className="w-4 h-4 rounded-full bg-copper-100 mx-auto flex items-center justify-center">
                                   <div className="w-2 h-2 rounded-full bg-copper-500"></div>
                                </div>
                                <div className="w-full h-1 rounded bg-slate-100"></div>
                                <div className="w-full h-1 rounded bg-slate-100"></div>
                                <div className="w-full h-4 rounded-md bg-slate-50 border border-slate-100 mt-auto"></div>
                             </div>
                          )}
                       </div>
                       
                       <div className="p-3 bg-white text-[10px] text-slate-500 border-t border-slate-100">
                          La vista previa es referencial y refleja un esquema simplificado de la plataforma.
                       </div>
                    </div>
                 </div>
              </div>

            </div>
          )}

          {activeTab !== 'ia' && activeTab !== 'docs' && activeTab !== 'workflows' && activeTab !== 'roles' && activeTab !== 'apariencia' && (
             <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/50 min-h-[400px]">
               <Settings className="w-12 h-12 text-slate-300 mb-4 animate-[spin_10s_linear_infinite]" />
               <h2 className="text-base font-bold text-slate-700 uppercase tracking-widest">Módulo {activeTab}</h2>
               <p className="text-sm text-slate-500 mt-2 text-center max-w-md">
                 Esta sección se encuentra en construcción para efectos de esta maqueta.
               </p>
            </div>
          )}

        </Card>
      </div>
    </div>
  );
}
