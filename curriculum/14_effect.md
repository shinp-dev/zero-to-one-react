# 14. Effect — 外部システムとの同期

## 今日のゴール

- Effectが必要な場面を説明できる
- cleanupを実装できる
- dependencyを「実行タイミング指定表」とだけ理解しない

## Timerとの同期

```tsx
import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  return <p>{seconds}</p>;
}
```

TimerはReact外部で動き続けるため、Effectで接続しcleanupします。

## Effectの考え方

```text
render
  ↓
DOMへ反映
  ↓
Effectで外部システムを現在のProps/Stateへ同期
```

cleanupは次の同期前やunmount時に、前の接続を片付けるために使います。

## Dependency

dependencyは「自分の好きなタイミングを指定するoption」ではありません。Effect内で使うreactive valueとの関係を正しく表します。

Lint警告を消すためだけにdependencyを削除しないでください。

## Strict Mode

開発中にEffectが想定より多く実行されたように見える場合、cleanupが正しく機能するか確認してください。回数を無理に1回へ固定するより、setup/cleanupを対称にすることが重要です。

## 演習

`isRunning`がtrueの間だけ動くTimerを作ってください。

- `setInterval`
- cleanupで`clearInterval`
- state更新はfunctional updater

## 今日の一言説明

> Effectはrender後にReact外部と同期し、cleanupで前の同期を片付ける。
