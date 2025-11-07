import React from 'react';
import { useMaxBridgeContext } from '../providers/MaxBridgeProvider';
import { PageLayout } from '../components/layout/PageLayout';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const botName = import.meta.env.VITE_MAX_BOT_NAME;

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
  const navigate = useNavigate();

  const startParam = getStartParam();
  const parsedParams = parseStartParam();

  return (
    <PageLayout
      title={'Debug Information'}
      onBack={() => navigate(-1)}
    >
      <div className="page">
        <div className="debug-info">
          <div className="info-section">
            <h3>Environment</h3>
            <p>
              <strong>In MAX Bridge:</strong> {isMaxApp ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Ready:</strong> {isReady ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Validated:</strong> {isValidated ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>INIT:</strong> {JSON.stringify(window.WebApp?.initData)}
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
        </div>
      </div>
    </PageLayout>
  );
};
