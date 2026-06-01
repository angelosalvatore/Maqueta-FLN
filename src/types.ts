export type ViewMode = 'mandante' | 'proveedor';

export type Status = 'borrador' | 'publicada' | 'en_revision' | 'vigente' | 'vencido' | 'aprobado' | 'observado' | 'cerrado' | 'procesado' | 'error';

export interface NavegacionItem {
  id: string;
  label: string;
  icon: string;
  roles: ViewMode[];
}
