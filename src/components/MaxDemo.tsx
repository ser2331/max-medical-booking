import React, { useEffect } from 'react';
import { useMaxBridgeContext } from '../providers/MaxBridgeProvider';

export const MaxDemo: React.FC = () => {
  const {
    isMaxApp,
    isReady,
    user,
    showBackButton,
    onBackButtonClick,
    hapticFeedback,
    shareContent,
    requestPhone,
  } = useMaxBridgeContext();

  useEffect(() => {
    if (isMaxApp) {
      // Показываем кнопку назад
      showBackButton(true);

      // Обработчик кнопки назад
      onBackButtonClick(() => {
        hapticFeedback('impact', { style: 'light' });
        console.log('Back button pressed');
      });
    }

    return () => {
      if (isMaxApp) {
        showBackButton(false);
      }
    };
  }, [isMaxApp, showBackButton, onBackButtonClick, hapticFeedback]);

  if (!isMaxApp) {
    return (
      <div className="container">
        <h1>Приложение запущено вне MAX</h1>
        <p>Для полного функционала запустите в MAX мессенджере</p>
      </div>
    );
  }

  if (!isReady) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container">
      <h1>MAX Bridge Demo</h1>

      {user && (
        <div className="user-info">
          <h2>Привет, {user.first_name}!</h2>
          <p>Username: @{user.username}</p>
          <p>Language: {user.language_code}</p>
        </div>
      )}

      <div className="actions">
        <button onClick={() => hapticFeedback('impact', { style: 'medium' })}
                className="btn">
          Вибрация
        </button>

        <button
          onClick={() => shareContent('Поделиться контентом', 'https://example.com')}
          className="btn"
        >
          Поделиться
        </button>

        <button
          onClick={async () => {
            try {
              const phone = await requestPhone();
              console.log('Phone:', phone);
            } catch (error) {
              console.error('Error requesting phone:', error);
            }
          }}
          className="btn"
        >
          Запросить телефон
        </button>
      </div>
    </div>
  );
};
