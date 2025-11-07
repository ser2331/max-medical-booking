import React from 'react';
import { useMaxBridgeContext } from '../providers/MaxBridgeProvider';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const botName = import.meta.env.VITE_MAX_BOT_NAME;
const testLink = `https://max.ru/${botName}?startapp=ref=test123`;

console.log('botName', botName);
export const DebugPage: React.FC = () => {
  const {
    isMaxApp,
    isReady,
    isValidated,
    initData,
    user,
    getStartParam,
    parseStartParam,
  } =
    useMaxBridgeContext();

  const startParam = getStartParam();
  const parsedParams = parseStartParam();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Debug Information</h1>
      </div>

      <div className="debug-info">
        <div className="info-section">
          <h3>Environment</h3>
          <p>
            <strong>In MAX:</strong> {isMaxApp ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Ready:</strong> {isReady ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Validated:</strong> {isValidated ? 'Yes' : 'No'}
          </p>
        </div>

        {user && (
          <div className="info-section">
            <h3>User Data</h3>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}

        {initData && (
          <div className="info-section">
            <h3>Init Data</h3>
            <pre>{JSON.stringify(initData, null, 2)}</pre>
          </div>
        )}

        <div className="info-section">
          <h3>Start Parameters</h3>
          <p>
            <strong>Raw:</strong> {startParam || 'None'}
          </p>
          {parsedParams && (
            <>
              <p>
                <strong>Parsed:</strong>
              </p>
              <pre>{JSON.stringify(parsedParams, null, 2)}</pre>
            </>
          )}
        </div>

        <div className="info-section">
          <h3>Test Links</h3>
          <p>Для тестирования используй ссылки:</p>
          <code>{testLink}</code>
        </div>
      </div>
    </div>
  );
};
