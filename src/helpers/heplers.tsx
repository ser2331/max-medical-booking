import React from 'react';
import { UserDataParams } from '@/api/services/booking-dictionary-controller/booking-dictionary-controller.types.ts';

export const getErrorMessage = (error: { type: string }): string => {
  if (error?.type === 'required') {
    return 'Заполните поле';
  }
  if (error?.type === 'pattern' || error?.type === 'validate') {
    return 'Не верный формат';
  }
  return '';
};

// Функция для форматирования телефона
export const formatPhoneForLink = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('8') && cleaned.length === 11) {
    return `+7${cleaned.slice(1)}`;
  }
  if (cleaned.startsWith('7') && cleaned.length === 11) {
    return `+${cleaned}`;
  }
  return `+${cleaned}`;
};
// Функция для форматирования телефона для отображения
export const formatPhoneForDisplay = (phone: string): string => {
  return phone;
};

export const handlePhoneClick = (event: React.MouseEvent, phone?: string) => {
  if (!phone) return;
  event.stopPropagation();
  const telLink = `tel:${formatPhoneForLink(phone)}`;
  window.open(telLink, '_self');
};

export const handleEmailClick = (event: React.MouseEvent, email?: string) => {
  if (!email) return;
  event.stopPropagation();
  const mailtoLink = `mailto:${email}`;
  window.open(mailtoLink, '_self');
};

export const cleanObject = <T extends Record<string, any>>(obj: T): T => {
  const cleaned = { ...obj };

  for (const key in cleaned) {
    if (cleaned[key] === '' || cleaned[key] === null || cleaned[key] === undefined) {
      delete cleaned[key];
    }
  }

  return cleaned;
};

export const getLpuParams = (getValues: () => any): UserDataParams => {
  const allValues = getValues();
  const birthDate = allValues.birthDate ? new Date(allValues.birthDate).toISOString() : '';

  return cleanObject({
    lastName: allValues.lastName || '',
    firstName: allValues.firstName || '',
    middleName: allValues.middleName || '',
    birthDate: birthDate,
    polisN: allValues.polisN ? allValues.polisN.replace(/\s/g, '') : '',

    gender: allValues.gender || '',
    snils: allValues.snils || '',
    polisS: allValues.polisS || '',
    phoneField: allValues.phoneField || '',
    mail: allValues.mail || '',
    comments: allValues.comments || '',
  });
};
