'use client';

import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { useToastStore, Toast as ToastType } from '@/lib/store/toast';

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function Toast({ toast, onClose }: { toast: ToastType; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.duration, onClose]);

  const variants = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: faCheckCircle,
      iconColor: 'text-green-500',
      text: 'text-green-800',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: faExclamationCircle,
      iconColor: 'text-red-500',
      text: 'text-red-800',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: faInfoCircle,
      iconColor: 'text-blue-500',
      text: 'text-blue-800',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: faExclamationCircle,
      iconColor: 'text-yellow-500',
      text: 'text-yellow-800',
    },
  };

  const variant = variants[toast.type];

  return (
    <div
      className={`${variant.bg} ${variant.border} border rounded-lg shadow-lg p-4 min-w-[320px] animate-slide-in-right`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <FontAwesomeIcon
          icon={variant.icon}
          className={`${variant.iconColor} w-5 h-5 mt-0.5 flex-shrink-0`}
        />
        <div className="flex-1">
          {toast.title && (
            <h4 className={`font-semibold ${variant.text} mb-1`}>{toast.title}</h4>
          )}
          <p className={`text-sm ${variant.text}`}>{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className={`${variant.text} hover:opacity-70 transition-opacity flex-shrink-0`}
          aria-label="Close notification"
        >
          <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
