# 12. Context — 深い階層へデータを渡す

## 今日のゴール

- ContextをPropsの完全な代替と誤解しない
- React 19のProvider記法を使える

## まずPropsを考える

Contextは「Props Drillingが1回でも出たら使う」ものではありません。

まず確認:

- Componentをcompositionできないか
- Stateの置き場所は適切か
- 数段のPropsで十分ではないか

アプリ全体や大きなsubtreeで共有する値にContextが向きます。

## React 19のProvider

```tsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext<'light' | 'dark'>('light');

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <ThemeContext value={theme}>
      <Page />
    </ThemeContext>
  );
}
```

読み取り:

```tsx
const theme = useContext(ThemeContext);
```

`<ThemeContext.Provider>`も古いReactでは使われてきましたが、React 19以降の新規教材では`<ThemeContext value={...}>`を基本にします。

## 演習

Theme Contextを作り、深い位置の`Toolbar`からthemeを読み取って表示してください。

## 今日の一言説明

> Contextは、あるsubtreeで広く必要な値を深いComponentへ明示的なProps連鎖なしで提供する仕組み。
