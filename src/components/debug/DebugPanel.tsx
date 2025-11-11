import React from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  position: fixed;
  top: 100px;
  right: 10px;
  background: rgba(0, 0, 0, 0.95);
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 12px;
  z-index: 10000;
  max-width: min(400px, calc(100vw - 40px));
  max-height: min(400px, calc(100vh - 40px));
  overflow: auto;
  border: 1px solid #333;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  box-sizing: border-box;
  word-wrap: break-word;
`;

const DebugItem = styled.div`
  margin: 6px 0;
  padding: 4px 0;
  border-bottom: 1px solid #444;
  line-height: 1.4;

  &:last-child {
    border-bottom: none;
  }
`;

const DebugKey = styled.span`
  color: #61dafb;
  font-weight: bold;
  display: block;
  margin-bottom: 2px;
`;

const DebugValue = styled.span`
  color: #fff;
  display: block;
  word-break: break-all;
  white-space: pre-wrap;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 6px;
  border-radius: 3px;
  margin-top: 2px;
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 95px;
  right: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  z-index: 10001;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #0056b3;
  }
`;

const ExpandButton = styled.button`
  background: transparent;
  color: #61dafb;
  border: 1px solid #61dafb;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 11px;
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    background: #61dafb;
    color: black;
  }
`;

const ClearButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 11px;
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    background: #ff5252;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 11px;
  cursor: pointer;

  &:hover {
    background: #ff6b6b;
    color: white;
  }
`;

const ExpandedView = styled.pre`
  background: #1a1a1a;
  color: #00ff00;
  padding: 12px;
  border-radius: 4px;
  margin-top: 12px;
  max-height: 200px;
  overflow: auto;
  font-size: 10px;
  border: 1px solid #333;
  word-break: break-all;
  white-space: pre-wrap;
  line-height: 1.3;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #444;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const Footer = styled.div`
  font-size: 10px;
  color: #888;
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px solid #333;
  text-align: center;
`;

interface DebugPanelProps {
  debugInfo: Record<string, string>;
  clearDebugInfo: () => void;
  title?: string;
  showToggle?: boolean;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
  debugInfo,
  clearDebugInfo,
  title = 'Debug Info',
  showToggle = true,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (!isVisible && showToggle) {
    return <ToggleButton onClick={() => setIsVisible(true)}>🔍 Debug</ToggleButton>;
  }

  // Фильтруем и ограничиваем отображение до 50 записей
  const filteredDebugInfo = { ...debugInfo };
  delete filteredDebugInfo.timestamp;

  const displayEntries = Object.entries(filteredDebugInfo)
    .slice(-50) // Показываем только последние 50 записей
    .reverse(); // Новые записи сверху

  return (
    <Panel>
      <Header>
        <strong>{title}</strong>
        <ButtonGroup>
          <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? '📕 Свернуть' : '📖 Развернуть'}
          </ExpandButton>
          <ClearButton onClick={clearDebugInfo}>🗑️ Очистить</ClearButton>
          {showToggle && <CloseButton onClick={() => setIsVisible(false)}>✕ Закрыть</CloseButton>}
        </ButtonGroup>
      </Header>

      {displayEntries.map(([key, value]) => (
        <DebugItem key={key}>
          <DebugKey>{key}</DebugKey>
          <DebugValue>
            {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
          </DebugValue>
        </DebugItem>
      ))}

      {displayEntries.length === 0 && (
        <div
          style={{
            color: '#888',
            fontStyle: 'italic',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          Нет данных для отображения
        </div>
      )}

      {isExpanded && <ExpandedView>{JSON.stringify(debugInfo, null, 2)}</ExpandedView>}

      <Footer>
        Записей: {displayEntries.length} | Последнее обновление:{' '}
        {new Date(Number(debugInfo.timestamp) || Date.now()).toLocaleTimeString()}
      </Footer>
    </Panel>
  );
};
