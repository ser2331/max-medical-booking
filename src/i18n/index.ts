import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ru: {
    translation: {
      // Общие
      continue: 'Продолжить',
      back: 'Назад',
      select: 'Выбрать',
      search: 'Поиск',
      cancel: 'Отмена',

      // Заголовки страниц
      booking: {
        title: 'Запись к врачу',
        selectPatient: 'Кого записываем?',
        selectInstitution: 'Выберите медучреждение',
        selectSpecialization: 'Выберите специальность',
        selectDoctor: 'Выберите врача',
        selectTime: 'Выберите время',
        confirm: 'Подтверждение записи',
        success: 'Запись успешна',
      },

      // Пациенты
      patient: {
        selected: 'Выбран пациент',
        notSelected: 'Пациент не выбран',
        add: 'Добавить пациента',
        familyMember: 'Вы можете добавить члена семьи для записи',
        age: '{{age}} лет',
        phone: '📞 {{phone}}',
        snils: 'СНИЛС: {{snils}}',
        personalInfo: 'Основная информация',
        lastName: 'Фамилия',
        firstName: 'Имя',
        middleName: 'Отчество',
        birthDate: 'Дата рождения',
        gender: 'Пол',
        male: 'Мужской',
        female: 'Женский',
        documents: 'Документы',
        snils_1: 'СНИЛС',
        policyNumber: 'Номер полиса ОМС',
        contacts: 'Контакты',
        phone_1: 'Телефон',
        email: 'Электронная почта',
        consent: 'Согласие на обработку персональных данных',
        consentDescription: 'Я даю согласие на обработку моих персональных данных',
        important: 'Важно',
        verificationInfo: 'Данные будут проверены через ЕСИА. Убедитесь, что информация корректна.',
      },

      // Валидация
      validation: {
        required: 'Обязательное поле',
        consentRequired: 'Необходимо согласие на обработку данных',
        invalidEmail: 'Неверный формат email',
        invalidPhone: 'Неверный формат телефона',
        invalidSnils: 'Неверный формат СНИЛС',
      },

      // Учреждения
      institution: {
        selected: 'Выбранное учреждение',
        notSelected: 'Учреждение не выбрано',
        available: 'Доступные учреждения',
        searchPlaceholder: 'Поиск по названию или адресу...',
        attached: 'Прикреплен',
        selectHint: 'Нажмите \'Выбрать\' напротив нужного учреждения',
        notFound: 'Учреждения не найдены',
        notFoundHint: 'Попробуйте изменить поисковый запрос',
      },

      // Специальности
      specialization: {
        selected: 'Выбрана специальность',
        notSelected: 'Специальность не выбрана',
        available: 'Доступные специальности',
        availableSlots: 'Доступно {{count}} записей',
        slots: '{{count}} записей',
      },

      // Врачи
      doctor: {
        select: 'Выбрать талон',
        experience: 'Опыт {{years}} лет',
        rating: 'Рейтинг {{rating}}',
        available: 'Есть талоны',
        unavailable: 'Нет талонов',
      },

      // Время
      time: {
        selectSlot: 'Выберите время приема',
        morning: 'Утро',
        afternoon: 'День',
        evening: 'Вечер',
      },
    },
  },
  en: {
    translation: {
      // Common
      continue: 'Continue',
      back: 'Back',
      select: 'Select',
      search: 'Search',
      cancel: 'Cancel',

      // Page titles
      booking: {
        title: 'Doctor Appointment',
        selectPatient: 'Who are we booking for?',
        selectInstitution: 'Select medical institution',
        selectSpecialization: 'Select specialization',
        selectDoctor: 'Select doctor',
        selectTime: 'Select time',
        confirm: 'Appointment confirmation',
        success: 'Appointment successful',
      },

      // Patients
      patient: {
        selected: 'Selected patient',
        notSelected: 'Patient not selected',
        add: 'Add patient',
        familyMember: 'You can add a family member for booking',
        age: '{{age}} years',
        phone: '📞 {{phone}}',
        snils: 'SNILS: {{snils}}',
        personalInfo: 'Personal Information',
        lastName: 'Last Name',
        firstName: 'First Name',
        middleName: 'Middle Name',
        birthDate: 'Date of Birth',
        gender: 'Gender',
        male: 'Male',
        female: 'Female',
        documents: 'Documents',
        snils_1: 'SNILS',
        policyNumber: 'OMS Policy Number',
        contacts: 'Contacts',
        phone_1: 'Phone',
        email: 'Email',
        consent: 'Consent to personal data processing',
        consentDescription: 'I consent to the processing of my personal data',
        important: 'Important',
        verificationInfo:
          'Data will be verified through ESIA. Please ensure the information is correct.',
      },

      // Validation
      validation: {
        required: 'Required field',
        consentRequired: 'Consent to data processing is required',
        invalidEmail: 'Invalid email format',
        invalidPhone: 'Invalid phone format',
        invalidSnils: 'Invalid SNILS format',
      },

      // Institutions
      institution: {
        selected: 'Selected institution',
        notSelected: 'Institution not selected',
        available: 'Available institutions',
        searchPlaceholder: 'Search by name or address...',
        attached: 'Attached',
        selectHint: 'Click \'Select\' next to the desired institution',
        notFound: 'Institutions not found',
        notFoundHint: 'Try changing your search query',
      },

      // Specializations
      specialization: {
        selected: 'Selected specialization',
        notSelected: 'Specialization not selected',
        available: 'Available specializations',
        availableSlots: '{{count}} slots available',
        slots: '{{count}} slots',
      },

      // Doctors
      doctor: {
        select: 'Select appointment',
        experience: '{{years}} years experience',
        rating: 'Rating {{rating}}',
        available: 'Slots available',
        unavailable: 'No slots',
      },

      // Time
      time: {
        selectSlot: 'Select appointment time',
        morning: 'Morning',
        afternoon: 'Afternoon',
        evening: 'Evening',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
