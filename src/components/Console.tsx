import React from 'react';
import { Terminal, Trash2 } from 'lucide-react';

export interface LogItem {
  text: string;
  type: 'log' | 'error' | 'warn' | 'info';
  timestamp: string;
}

interface ConsoleProps {
  logs: LogItem[];
  onClear: () => void;
}

export const Console: React.FC<ConsoleProps> = ({ logs, onClear }) => {
  const consoleEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // ログが追加されたら自動で一番下までスクロール
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="console-box">
      <div className="console-header">
        <div className="console-title">
          <Terminal size={14} className="text-muted" />
          <span>Console Output</span>
        </div>
        <button 
          className="console-clear" 
          onClick={onClear} 
          title="コンソールをクリア"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div className="console-logs">
        {logs.length === 0 ? (
          <div style={{ color: '#4b5563', fontStyle: 'italic', padding: '4px' }}>
            ログはありません。コードを実行してください。
          </div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className={`console-log-row ${log.type}`}>
              <span className="console-log-prefix">[{log.timestamp}]</span>
              <span className="console-log-text">{log.text}</span>
            </div>
          ))
        )}
        <div ref={consoleEndRef} />
      </div>
    </div>
  );
};
