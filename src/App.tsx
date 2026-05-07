import React from 'react';
import { lessons } from './data/lessons';
import { Sidebar } from './components/Sidebar';
import { Playground } from './components/Playground';
import { Code2, Trophy, RotateCcw, Award, CheckCircle2 } from 'lucide-react';

function App() {
  // 1. 進捗状況の初期化（ローカルストレージから復元）
  const [currentLessonIndex, setCurrentLessonIndex] = React.useState<number>(() => {
    const saved = localStorage.getItem('react_playground_current_index');
    return saved ? Math.min(parseInt(saved, 10), lessons.length - 1) : 0;
  });

  const [completedLessons, setCompletedLessons] = React.useState<string[]>(() => {
    const saved = localStorage.getItem('react_playground_completed');
    return saved ? JSON.parse(saved) : [];
  });

  const [showCompletionPage, setShowCompletionPage] = React.useState<boolean>(false);

  // 2. 状態の変更をローカルストレージに保存
  React.useEffect(() => {
    localStorage.setItem('react_playground_current_index', currentLessonIndex.toString());
  }, [currentLessonIndex]);

  React.useEffect(() => {
    localStorage.setItem('react_playground_completed', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const currentLesson = lessons[currentLessonIndex];
  const progressPercent = Math.round((completedLessons.length / lessons.length) * 100);

  // 3. 各種操作ハンドラ
  const handleSelectLesson = (lessonId: string) => {
    const idx = lessons.findIndex((l) => l.id === lessonId);
    if (idx !== -1) {
      setCurrentLessonIndex(idx);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (completedLessons.length === lessons.length) {
      // 最後のレッスンをクリアしており、すべてのレッスンが完了している場合
      setShowCompletionPage(true);
    }
  };

  const handleLessonCompleted = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => [...prev, lessonId]);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('学習の進捗をすべてリセットして、最初からやり直しますか？')) {
      setCompletedLessons([]);
      setCurrentLessonIndex(0);
      setShowCompletionPage(false);
      localStorage.removeItem('react_playground_completed');
      localStorage.removeItem('react_playground_current_index');
    }
  };

  return (
    <div className="app-container">
      {/* ヘッダー */}
      <header className="app-header">
        <div className="header-logo">
          <Code2 className="logo-icon" size={24} />
          <span className="logo-text">React Learn & Play</span>
          <span className="logo-badge">For Beginners</span>
        </div>

        {/* 進捗バー */}
        <div className="header-progress">
          <div className="progress-label">
            クリアしたクエスト: <strong style={{ color: 'var(--success)' }}>{completedLessons.length}</strong> / {lessons.length}
          </div>
          <div className="progress-bar-bg" title={`進捗率: ${progressPercent}%`}>
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          {completedLessons.length > 0 && (
            <button 
              onClick={handleResetProgress}
              style={{
                background: 'transparent',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid var(--border-color)',
                transition: 'all 0.2s'
              }}
              title="進捗をリセット"
              className="nav-btn"
            >
              <RotateCcw size={11} />
              <span>進捗リセット</span>
            </button>
          )}
        </div>
      </header>

      {/* メインのWeb IDEワークスペース */}
      <main style={{ flex: 1, position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', height: '100%' }}>
          {/* 左カラム：レクチャー ＆ 課題 */}
          <Sidebar
            currentLesson={currentLesson}
            lessons={lessons}
            completedLessons={completedLessons}
            onSelectLesson={handleSelectLesson}
            onPrevLesson={handlePrevLesson}
            onNextLesson={handleNextLesson}
            isFirst={currentLessonIndex === 0}
            isLast={currentLessonIndex === lessons.length - 1}
          />

          {/* 右カラム：コードエディタ ＋ プレビュー ＋ 仮想コンソール */}
          <Playground
            currentLesson={currentLesson}
            onLessonCompleted={handleLessonCompleted}
            onNextLesson={handleNextLesson}
            isLastLesson={currentLessonIndex === lessons.length - 1}
          />
        </div>

        {/* 全レッスン修了時の「WOW」モーダルオーバーレイ */}
        {showCompletionPage && (
          <div className="completion-overlay">
            <div className="completion-card" style={{
              background: 'var(--bg-panel)',
              border: '2px solid var(--primary-light)',
              borderRadius: '20px',
              padding: '48px',
              maxWidth: '500px',
              boxShadow: '0 20px 50px rgba(99, 102, 241, 0.3), inset 0 0 30px rgba(99, 102, 241, 0.1)',
              animation: 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <div style={{
                position: 'relative',
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Trophy size={80} style={{ color: '#fbbf24', filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.4))' }} />
                <Award size={40} style={{ 
                  color: 'var(--primary-light)', 
                  position: 'absolute', 
                  bottom: '-5px', 
                  right: '-10px',
                  filter: 'drop-shadow(0 0 6px var(--primary-light))'
                }} />
              </div>
              
              <h1 className="completion-title">Quest Completed!</h1>
              <p style={{
                color: '#fff',
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                モダンJS & React基礎コース修了！
              </p>
              
              <p className="completion-desc">
                素晴らしい集中力です！モダンJSの基本（アロー関数、分割代入、スプレッド構文、map / filter）から、Reactの基礎（JSX、Props、useState、useEffect）までをすべて自分の手でコーディングして突破しました！
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '100%',
                background: 'var(--bg-panel-light)',
                border: '1px solid var(--border-color)',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '24px',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--success)' }}>
                  <CheckCircle2 size={16} />
                  <span>モダンJSのコアを習得</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--success)' }}>
                  <CheckCircle2 size={16} />
                  <span>JSXによる宣言的UIを理解</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--success)' }}>
                  <CheckCircle2 size={16} />
                  <span>StateとEffectによる動的制御を完全攻略</span>
                </div>
              </div>

              <button className="completion-reset-btn" onClick={handleResetProgress}>
                最初からやり直す（進捗をリセット）
              </button>
              
              <button 
                onClick={() => setShowCompletionPage(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  marginTop: '16px',
                  textDecoration: 'underline'
                }}
              >
                プレイグラウンドに戻る
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
