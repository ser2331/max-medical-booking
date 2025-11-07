import crypto from 'crypto-js';

export interface InitData {
  auth_date: string;
  query_id?: string;
  user?: string;
  hash: string;
  start_param?: string;
}

export class MaxDataValidator {
  private secretKey: string;

  constructor(botToken: string) {
    // Создаем secret_key из WebAppData + Bot Token
    this.secretKey = crypto.HmacSHA256('WebAppData', botToken).toString();
  }

  /**
   * Валидация данных от MAX
   */
  validateInitData(initDataString: string): boolean {
    try {
      // URL decode данных
      const decodedString = decodeURIComponent(initDataString);

      // Парсим параметры
      const params = new URLSearchParams(decodedString);
      const data: { [key: string]: string } = {};

      params.forEach((value, key) => {
        data[key] = value;
      });

      const { hash, ...dataWithoutHash } = data;

      // Создаем data_check_string
      const dataCheckString = Object.keys(dataWithoutHash)
        .sort()
        .map((key) => `${key}=${dataWithoutHash[key]}`)
        .join('\n');

      // Вычисляем хеш
      const calculatedHash = crypto.HmacSHA256(dataCheckString, this.secretKey).toString();

      // Сравниваем хеши
      return calculatedHash === hash;
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  }

  /**
   * Извлечение данных пользователя из initData
   */
  parseInitData(initDataString: string): InitData | null {
    try {
      const decodedString = decodeURIComponent(initDataString);
      const params = new URLSearchParams(decodedString);

      const initData: InitData = {
        auth_date: params.get('auth_date') || '',
        hash: params.get('hash') || '',
      };

      const query_id = params.get('query_id');
      const user = params.get('user');
      const start_param = params.get('startparam');

      if (query_id) initData.query_id = query_id;
      if (user) initData.user = user;
      if (start_param) initData.start_param = start_param;

      return initData;
    } catch (error) {
      console.error('Parse init data error:', error);
      return null;
    }
  }

  /**
   * Парсинг данных пользователя из JSON строки
   */
  parseUserData(userString: string): unknown {
    try {
      return JSON.parse(userString);
    } catch (error) {
      console.error('Parse user data error:', error);
      return null;
    }
  }
}
