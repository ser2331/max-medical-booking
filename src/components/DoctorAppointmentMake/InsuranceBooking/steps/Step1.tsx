import React from 'react';
import { useFormContext } from 'react-hook-form';

export const Step1: React.FC = () => {
  const { register, watch } = useFormContext();
  const selectedService = watch('service');

  const services = [
    { id: 'therapy', name: 'Терапия', description: 'Консультация терапевта' },
    { id: 'surgery', name: 'Хирургия', description: 'Консультация хирурга' },
    { id: 'pediatrics', name: 'Педиатрия', description: 'Детский врач' },
    { id: 'dentistry', name: 'Стоматология', description: 'Лечение зубов' },
  ];

  return (
    <div>
      <h3 style={{ marginBottom: '16px' }}>Выберите услугу</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {services.map(service => (
          <label
            key={service.id}
            style={{
              padding: '16px',
              border: `2px solid ${selectedService === service.id ? '#2d5bff' : '#e9ecef'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: selectedService === service.id ? '#f0f4ff' : 'white',
            }}
          >
            <input
              type="radio"
              value={service.id}
              {...register('service', { required: 'Выберите услугу' })}
              style={{ marginRight: '12px' }}
            />
            <div>
              <div style={{ fontWeight: 'bold' }}>{service.name}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>{service.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
