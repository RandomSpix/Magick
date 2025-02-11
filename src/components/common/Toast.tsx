import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { useToast } from '@/lib/hooks/useToast';

const TOAST_DURATION = 5000;

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

interface ToastProps {
  id: string;
  message: string;
  type: keyof typeof icons;
}

export function Toast({ id, message, type }: ToastProps) {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, TOAST_DURATION);

    return () => clearTimeout(timer);
  }, [id, removeToast]);

  const Icon = icons[type];

  return (
    <div className={`
      flex items-center p-4 rounded-lg shadow-lg
      ${type === 'success' ? 'bg-green-100 text-green-800' :
        type === 'error' ? 'bg-red-100 text-red-800' :
        'bg-blue-100 text-blue-800'}
    `}>
      <Icon className="w-5 h-5 mr-3" />
      <p className="mr-3">{message}</p>
      <button
        onClick={() => removeToast(id)}
        className="ml-auto"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}