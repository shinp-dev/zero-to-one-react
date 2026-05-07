import React from 'react';
import type { Lesson } from '../data/lessons';
import { BookOpen, ChevronLeft, ChevronRight, HelpCircle, Play } from 'lucide-react';

interface SidebarProps {
  currentLesson: Lesson;
  lessons: Lesson[];
  completedLessons: string[];
  onSelectLesson: (id: string) => void;
  onPrevLesson: () => void;
  onNextLesson: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentLesson,
  lessons,
  completedLessons,
  onSelectLesson,
  onPrevLesson,
  onNextLesson,
  isFirst,
  isLast,
}) => {
  const [showHints, setShowHints] = React.useState(false);

  // レッスンが変わったらヒントを閉じる
  React.useEffect(() => {
    setShowHints(false);
  }, [currentLesson]);

  // 超簡易Markdownレンダラー
  const renderInline = (text: string): React.ReactNode[] => {
    // 太字とインラインコードが混在する行を正しく処理する
    const result: React.ReactNode[] = [];
    // 正規表現でインライン要素を順に分割: **bold** と `code`
    const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      // マッチ前のプレーンテキスト
      if (match.index > lastIndex) {
        result.push(text.slice(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        result.push(<strong key={match.index} style={{ color: '#fff' }}>{token.slice(2, -2)}</strong>);
      } else if (token.startsWith('`') && token.endsWith('`')) {
        result.push(<code key={match.index}>{token.slice(1, -1)}</code>);
      }
      lastIndex = regex.lastIndex;
    }
    // 残りのプレーンテキスト
    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }
    return result;
  };

  const renderContent = (text: string) => {
    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeContent: string[] = [];

    return lines.map((line, index) => {
      // コードブロックの開始/終了
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          inCodeBlock = false;
          const code = codeContent.join('\n');
          codeContent = [];
          return (
            <pre key={index}>
              <code>{code}</code>
            </pre>
          );
        } else {
          inCodeBlock = true;
          return null;
        }
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return null;
      }

      // 見出し H1, H2, H3
      if (line.startsWith('# ')) {
        return <h1 key={index}>{renderInline(line.slice(2))}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index}>{renderInline(line.slice(3))}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index}>{renderInline(line.slice(4))}</h3>;
      }

      // リスト項目 (- で始まる行)
      if (line.match(/^- /)) {
        return (
          <p key={index} style={{ paddingLeft: '16px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>•</span>
            {renderInline(line.slice(2))}
          </p>
        );
      }

      if (line.trim() === '') {
        return <div key={index} style={{ height: '8px' }} />;
      }

      return <p key={index}>{renderInline(line)}</p>;
    });
  };

  return (
    <div className="panel" style={{ borderRight: '1px solid var(--border-color)' }}>
      <div className="panel-header">
        <div className="panel-title">
          <BookOpen size={16} className="text-primary" />
          <span>カリキュラム & 解説</span>
        </div>
      </div>

      <div className="panel-content">
        {/* レッスン選択のナビゲーション */}
        <div className="lesson-navigation">
          <button 
            className="nav-btn" 
            onClick={onPrevLesson} 
            disabled={isFirst}
            title="前のレッスン"
          >
            <ChevronLeft size={18} />
          </button>
          
          <select 
            className="lesson-selector-dropdown"
            value={currentLesson.id}
            onChange={(e) => onSelectLesson(e.target.value)}
          >
            <optgroup label="JavaScript 基礎">
              {lessons.filter(l => l.category === 'modern-js').map(l => (
                <option key={l.id} value={l.id}>
                  {completedLessons.includes(l.id) ? '✓ ' : ''}{l.title}
                </option>
              ))}
            </optgroup>
            <optgroup label="React 基礎">
              {lessons.filter(l => l.category === 'react-basic').map(l => (
                <option key={l.id} value={l.id}>
                  {completedLessons.includes(l.id) ? '✓ ' : ''}{l.title}
                </option>
              ))}
            </optgroup>
          </select>

          <button 
            className="nav-btn" 
            onClick={onNextLesson} 
            disabled={isLast}
            title="次のレッスン"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 解説コンテンツ */}
        <div className="lecture-container" style={{ marginTop: '20px' }}>
          <div className="lecture-markdown">
            {renderContent(currentLesson.description)}
          </div>

          {/* 課題ボックス */}
          <div className="task-box">
            <div className="task-header">
              <Play size={14} style={{ fill: 'currentColor' }} />
              <span>本日のミッション</span>
            </div>
            <div className="task-body">
              {renderContent(currentLesson.task)}
            </div>
          </div>

          {/* ヒントアコーディオン */}
          {currentLesson.hints && currentLesson.hints.length > 0 && (
            <div className="hints-container">
              <button 
                className="hints-trigger" 
                onClick={() => setShowHints(!showHints)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <HelpCircle size={15} />
                  <span>ヒントを見る</span>
                </div>
                <span>{showHints ? '▲' : '▼'}</span>
              </button>
              {showHints && (
                <div className="hints-content">
                  {currentLesson.hints.map((hint, i) => (
                    <div key={i} className="hint-item">
                      <span className="hint-number">{i + 1}</span>
                      <span>{hint}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
