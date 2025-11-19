import { toast } from 'react-toastify';

type toastType = 'success' | 'error' | 'info' | 'warn';
export const useMessageToast = () => {
  return (message: string = 'Успех', type: toastType = 'success') => {
    return toast[type]?.(message, {
      position: 'top-right',
    });
  };
};
