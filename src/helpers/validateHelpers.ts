//Паттерны
export const validationPatterns = {
  // ФИО: только кириллица, дефисы и пробелы
  name: /^[а-яА-ЯёЁ\s-]+$/,

  // Email: стандартная валидация с поддержкой кириллических доменов
  email:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

  // СНИЛС: 11 цифр с возможными пробелами и дефисами
  snils: /^\d{3}-\d{3}-\d{3}\s\d{2}$/,

  // Полис ОМС: 16 цифр (с пробелами или без)
  polisNumber: /^(\d{4}\s?\d{6}\s?\d{6}|\d{16})$/,

  // Серия полиса: 6 цифр
  polisSeries: /^\d{6}$/,

  // Телефон: российский формат
  phone: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
};

export const formatSNILS = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length > 11) return value.slice(0, -1);

  let result = '';
  for (let i = 0; i < digits.length; i++) {
    if (i === 3 || i === 6) result += '-';
    if (i === 9) result += ' ';
    result += digits[i];
  }
  return result;
};

//examples SNILS
//112-233-445 95
//087-654-302 00
//125-562-458 41
//123-456-789 01
export const validateSNILS = (value: string): boolean | string => {
  if (!value) return 'Введите СНИЛС';
  const message = 'Введите корректный СНИЛС';

  const cleanValue = value.replace(/\D/g, '');

  if (cleanValue.length !== 11) {
    return message; //'СНИЛС должен содержать 11 цифр';
  }

  // Проверка контрольной суммы СНИЛС
  const digits = cleanValue.split('').map(Number);
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (9 - i);
  }

  let checkSum = sum % 101;
  if (checkSum === 100) checkSum = 0;

  const actualCheckSum = parseInt(cleanValue.slice(-2), 10);

  return checkSum === actualCheckSum || message; //'Неверный контрольный номер СНИЛС';
};

export const formatPolisNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length > 16) return value.slice(0, -1);

  // Форматирование: XXXX XXXXXX XXXXXX
  let result = '';
  for (let i = 0; i < digits.length; i++) {
    if (i === 4 || i === 10) result += ' ';
    result += digits[i];
  }
  return result;
};
export const validatePolisNumber = (value: string): boolean | string => {
  if (!value) return 'Введите номер полиса ОМС';
  const message = 'Введите корректный номер полиса ОМС';

  const cleanValue = value.replace(/\D/g, '');

  if (cleanValue.length !== 16) {
    return message; //'Номер полиса должен содержать 16 цифр';
  }

  return true;
};
export const formatPolisSeries = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length > 6) return value.slice(0, -1);
  return digits;
};

export const validateBirthDate = (value: string): boolean | string => {
  if (!value) return 'Введите дату рождения';

  const birthDate = new Date(value);
  const today = new Date();

  // Проверка что дата не в будущем
  if (birthDate > today) {
    return 'Дата рождения не может быть в будущем';
  }

  // Проверка возраста (0-120 лет)
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 0) return 'Введите корректную дату рождения';
  if (age > 120) return 'Возраст не может превышать 120 лет';

  return true;
};

export const validateEmail = (value: string): boolean | string => {
  if (!value) return 'Введите email';
  const message = 'Введите корректный email адрес';

  if (!validationPatterns.email.test(value)) {
    return message;
  }

  // Дополнительная проверка длины
  if (value.length > 254) {
    return message; //'Email слишком длинный';
  }

  const [localPart, _domain] = value.split('@');
  if (localPart.length > 64) {
    return message; //'Локальная часть email слишком длинная';
  }

  return true;
};
