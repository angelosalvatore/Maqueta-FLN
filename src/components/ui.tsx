import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Receipt, 
  Users, 
  Files, 
  CheckSquare, 
  Bot, 
  Network, 
  BarChart, 
  Settings 
} from 'lucide-react';
import React, { ComponentProps } from 'react';

// Common UI Components

export function Badge({ children, variant = 'default', className = '' }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline', className?: string }) {
  const base = "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border flex items-center gap-1.5 w-fit";
  const variants = {
    default: "bg-slate-100 text-slate-600 border-slate-200",
    success: "bg-green-50 text-green-600 border-green-100",
    warning: "bg-orange-50 text-orange-600 border-orange-100",
    error: "bg-red-50 text-red-600 border-red-100",
    info: "bg-blue-50 text-blue-600 border-blue-100",
    outline: "bg-transparent text-slate-500 border-slate-200"
  };
  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}

export function Card({ children, className = '', ...props }: { children: React.ReactNode, className?: string } & ComponentProps<"div">) {
  return (
    <div className={`bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  onClick,
  disabled
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger',
  size?: 'sm' | 'md' | 'lg',
  className?: string,
  onClick?: () => void,
  disabled?: boolean
}) {
  const base = "inline-flex items-center justify-center font-bold rounded transition-colors focus:outline-none shadow-sm active:scale-[0.98]";
  
  const variants = {
    primary: "bg-copper-500 text-white hover:bg-copper-600",
    secondary: "bg-navy-800 text-white hover:bg-navy-700",
    outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-none",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 shadow-none",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  const sizes = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      {children}
    </button>
  );
}
