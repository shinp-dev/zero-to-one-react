import React from 'react';
import Editor from '@monaco-editor/react';
import * as Babel from '@babel/standalone';
import type { Lesson } from '../data/lessons';
import { Console } from './Console';
import type { LogItem } from './Console';
import { Play, RotateCcw, CheckCircle, AlertTriangle, Eye, ArrowRight } from 'lucide-react';

// 動的コードから React を参照できるようにグローバルに引き渡す
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

interface PlaygroundProps {
  currentLesson: Lesson;
  onLessonCompleted: (lessonId: string) => void;
  onNextLesson: () => void;
  isLastLesson: boolean;
}

export const Playground: React.FC<PlaygroundProps> = ({
  currentLesson,
  onLessonCompleted,
  onNextLesson,
  isLastLesson,
}) => {
  const [code, setCode] = React.useState(currentLesson.initialCode);
  const [logs, setLogs] = React.useState<LogItem[]>([]);
  const [runTrigger, setRunTrigger] = React.useState(0);
  
  // 検証結果のステータス
  const [validationResult, setValidationResult] = React.useState<{
    success: boolean;
    message?: string;
  } | null>(null);

  // プレビューとコンパイルのエラー
  const [compileError, setCompileError] = React.useState<string | null>(null);
  const [AppComponent, setAppComponent] = React.useState<React.ComponentType | null>(null);

  // プレビューDOMの参照
  const previewRef = React.useRef<HTMLDivElement>(null);

  // コンソールオーバーライドの復元用
  const originalConsoleRef = React.useRef<{
    log: typeof console.log;
    error: typeof console.error;
    warn: typeof console.warn;
  } | null>(null);

  const restoreConsole = () => {
    if (originalConsoleRef.current) {
      console.log = originalConsoleRef.current.log;
      console.error = originalConsoleRef.current.error;
      console.warn = originalConsoleRef.current.warn;
      originalConsoleRef.current = null;
    }
  };

  // コンポーネントのアンマウント時にコンソールを復元する安全弁
  React.useEffect(() => {
    return () => restoreConsole();
  }, []);

  // レッスンが切り替わったらコードを初期化
  React.useEffect(() => {
    setCode(currentLesson.initialCode);
    setLogs([]);
    setValidationResult(null);
    setCompileError(null);
    setAppComponent(null);
  }, [currentLesson]);

  // コンソールにログを追加するヘルパー
  const addLog = (text: string, type: 'log' | 'error' | 'warn' | 'info' = 'log') => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [...prev, { text, type, timestamp }]);
  };

  // コードの実行と評価
  const runCode = () => {
    // 前回のオーバーライドが残っていたら復元
    restoreConsole();

    setLogs([]); // ログをクリア
    setCompileError(null);
    setAppComponent(null);
    setValidationResult(null);

    const logHistory: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    // refに保存（Reactレンダリング後の復元で使用）
    originalConsoleRef.current = { log: originalLog, error: originalError, warn: originalWarn };

    // console.log 等をオーバーライドして、コンソール表示用にログを格納する
    console.log = (...args) => {
      const formatted = args
        .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg)))
        .join(' ');
      logHistory.push(formatted);
      
      // ログ行の追加
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLogs((prev) => [...prev, { text: formatted, type: 'log', timestamp }]);
      
      originalLog.apply(console, args);
    };

    console.error = (...args) => {
      const formatted = args
        .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg)))
        .join(' ');
      
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLogs((prev) => [...prev, { text: formatted, type: 'error', timestamp }]);
      
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      const formatted = args
        .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg)))
        .join(' ');
      
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLogs((prev) => [...prev, { text: formatted, type: 'warn', timestamp }]);
      
      originalWarn.apply(console, args);
    };

    try {
      // 1. @babel/standalone でトランスパイル
      // ES6+ や JSX をブラウザで動くJavaScriptに変換します。
      const transformed = Babel.transform(code, {
        presets: ['react', 'env'],
        filename: 'playground.tsx',
      }).code;

      if (!transformed) {
        throw new Error('トランスパイルに失敗しました。');
      }

      // 2. Reactコンポーネントがある場合はグローバルに退避させるための細工
      let finalCode = transformed;
      if (code.includes('function App') || code.includes('const App')) {
        // Babelトランスパイル後のコードの末尾に、App をグローバルに退避するコードを追加
        // new Function() 内のスコープからアクセスできるように同じコードブロック内に書く
        finalCode += '\nwindow.__CurrentApp__ = typeof App !== "undefined" ? App : null;';
      } else {
        (window as any).__CurrentApp__ = null;
      }

      // 3. 安全に eval 実行
      // (グローバル変数の汚染を極力抑えるため、windowスコープにReactを再定義)
      (window as any).React = React;
      
      // evalを実行（Babelの'env'プリセットが"use strict"を挿入するので、
      // 関数宣言もvarベースに変換されnew Function内のスコープに収まる）
      const fn = new Function(finalCode);
      fn();

      // 4. マウントするReactコンポーネントを特定
      const ExtractedApp = (window as any).__CurrentApp__;
      if (ExtractedApp) {
        setAppComponent(() => ExtractedApp);
        // トリガーを回して、Reactがレンダリングされる時間を待ってから検証
        setRunTrigger((prev) => prev + 1);
      } else {
        // Reactコンポーネントがない場合（モダンJSの場合）は即座に検証
        setAppComponent(null);
        evaluateMission(code, logHistory, null);
        // 非Reactレッスンでは即座にコンソールを復元
        restoreConsole();
      }

      addLog('実行成功。検証中...', 'info');

    } catch (err: any) {
      const errMsg = err.message || String(err);
      setCompileError(errMsg);
      addLog(errMsg, 'error');
      setValidationResult({
        success: false,
        message: `コードにエラーがあります。修正して再度実行してください：${errMsg}`,
      });
      // エラー時はすぐにコンソールを復元（Reactレンダリングの必要がないため）
      restoreConsole();
    }
    // 注意: Reactコンポーネントがある場合、コンソールの復元は
    // Reactレンダリング＋検証完了後にuseEffect内で行う
  };

  // Reactコンポーネントマウント後に実行する検証処理
  React.useEffect(() => {
    if (runTrigger === 0) return;

    // Reactがレンダリングを終えるために微小な遅延を挟む
    const timer = setTimeout(() => {
      // logsからプレーンな文字列配列を作る
      const plainLogs = logs.filter(l => l.type === 'log').map((l) => l.text);
      evaluateMission(code, plainLogs, previewRef.current);

      // 検証完了後にコンソールを復元
      restoreConsole();
    }, 300);

    return () => clearTimeout(timer);
  }, [runTrigger]);

  // レッスンクリア判定を実行
  const evaluateMission = (
    currentCode: string,
    plainLogs: string[],
    previewEl: HTMLElement | null
  ) => {
    try {
      const result = currentLesson.validate(currentCode, plainLogs, previewEl);
      setValidationResult(result);

      if (result.success) {
        addLog('★ ミッションクリア！素晴らしい！ ★', 'info');
        onLessonCompleted(currentLesson.id);
      } else {
        addLog(`判定不合格: ${result.message || 'もう一度確認してください。'}`, 'error');
      }
    } catch (err: any) {
      setValidationResult({
        success: false,
        message: `検証コード実行時にエラーが発生しました: ${err.message || String(err)}`,
      });
    }
  };

  // 初期コードへのリセット
  const resetCode = () => {
    if (window.confirm('エディタのコードを初期状態にリセットしますか？')) {
      setCode(currentLesson.initialCode);
      setValidationResult(null);
      setCompileError(null);
      setAppComponent(null);
      setLogs([]);
    }
  };

  return (
    <div className="workspace">
      {/* 1. 左パネルはSidebar（App.tsxで配置するためここでは中央と右のみ） */}
      
      {/* 2. 中央パネル：コードエディタ */}
      <div className="panel" style={{ borderRight: '1px solid var(--border-color)' }}>
        <div className="editor-container">
          <div className="editor-toolbar">
            <div className="file-tab">
              <span className="file-tab-icon">⚡</span>
              <span>{currentLesson.category === 'react-basic' ? 'App.jsx' : 'script.js'}</span>
            </div>
            <div className="editor-actions">
              <button className="editor-btn" onClick={resetCode} title="コードを最初に戻す">
                <RotateCcw size={13} />
                <span>リセット</span>
              </button>
              <button className="editor-btn run" onClick={runCode} title="コードをコンパイルして実行">
                <Play size={13} style={{ fill: 'currentColor' }} />
                <span>実行 ＆ テスト</span>
              </button>
            </div>
          </div>
          <div className="editor-wrapper">
            <Editor
              height="100%"
              language={currentLesson.category === 'react-basic' ? 'javascript' : 'javascript'}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                fontSize: 14,
                fontFamily: "var(--mono)",
                minimap: { enabled: false },
                automaticLayout: true,
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
                lineHeight: 22,
                tabSize: 2,
                wordWrap: 'on',
                padding: { top: 12 },
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. 右パネル：プレビュー ＆ コンソール */}
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">
            <Eye size={16} className="text-primary" />
            <span>プレビュー ＆ コンソール</span>
          </div>
        </div>
        
        <div className="panel-content preview-panel" style={{ padding: '16px' }}>
          <div className="preview-split">
            {/* 上部：ライブプレビュー */}
            <div className="preview-box">
              <div 
                style={{ 
                  height: '32px', 
                  backgroundColor: 'rgba(0,0,0,0.2)', 
                  borderBottom: '1px solid var(--border-color)',
                  padding: '0 12px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                🖥️ Live Preview
              </div>
              
              <div className="preview-content" ref={previewRef}>
                {compileError ? (
                  <div className="compile-error-box">
                    <div className="compile-error-title">
                      <AlertTriangle size={15} />
                      <span>エラーが発生しました</span>
                    </div>
                    <pre className="compile-error-stack">{compileError}</pre>
                  </div>
                ) : AppComponent ? (
                  // 動的に作成したReactコンポーネントをマウント
                  <div id="dynamic-mount-root">
                    <AppComponent key={runTrigger} />
                  </div>
                ) : (
                  <div className="preview-placeholder">
                    <span style={{ fontSize: '32px' }}>💡</span>
                    <p style={{ margin: 0, fontSize: '13px' }}>
                      このレッスンはコンソール出力のみです。<br />
                      コードを書いて「実行」を押し、<br />
                      下部のコンソールの結果を確認してください。
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 下部：仮想コンソール */}
            <Console logs={logs} onClear={() => setLogs([])} />

            {/* 自動テストの検証結果バナー */}
            {validationResult && (
              <div className={`validation-banner ${validationResult.success ? 'success' : 'error'}`}>
                <div className="validation-title">
                  {validationResult.success ? (
                    <>
                      <CheckCircle size={18} />
                      <span>ミッションクリア！</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={18} />
                      <span>ミッション未達成</span>
                    </>
                  )}
                </div>
                <div className="validation-msg">
                  {validationResult.success 
                    ? '素晴らしい！お見事です。自動テストがすべての条件をパスしました。' 
                    : validationResult.message}
                </div>
                {validationResult.success && (
                  <button className="next-lesson-btn" onClick={onNextLesson}>
                    <span>{isLastLesson ? '全カリキュラム修了！' : '次のレッスンへ進む'}</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
