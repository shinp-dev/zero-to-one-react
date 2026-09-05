# 00. Reactは何を解決する？

## 今日のゴール

- DOMを直接変更する方法とReactの違いを説明できる
- Reactを「HTMLを楽に書くライブラリ」とだけ捉えない

## 既知の世界

JavaScriptだけでも画面は変更できます。

```js
const button = document.querySelector('#count-button');
const label = document.querySelector('#count-label');
let count = 0;

button.addEventListener('click', () => {
  count += 1;
  label.textContent = String(count);
});
```

小さい画面なら十分です。しかし状態が増えると、**どの値が変わったらどのDOMを直すか**を人間が管理する必要があります。

## Reactの考え方

Reactでは先に「現在のデータならUIはこうなる」と書きます。

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  );
}
```

重要なのは`useState`の綴りではなく、次の向きです。

```text
State / Props
    ↓
ComponentがUIを計算
    ↓
ReactがDOMへ反映
```

## Step 1: Viteプロジェクトを作る

```bash
npm create vite@latest react-practice -- --template react-ts
cd react-practice
npm install
npm run dev
```

`src/App.tsx`を開き、初期コードを全部消して構いません。

## Step 2: 最初のComponent

```tsx
export default function App() {
  return <h1>React Practice</h1>;
}
```

保存してブラウザが更新されることを確認します。

## DevTools確認

- Browser DevToolsのElementsで最終DOMを見る
- Consoleにエラーがないか確認する
- React DevToolsが使える環境ならComponent treeも見る

## 今日の一言説明

> Reactは、現在のデータからUIを宣言し、DOMへの反映をReactに任せるための仕組み。

## 確認問題

「Reactを使うとDOMが存在しなくなる」は正しいでしょうか？

→ いいえ。最終的にはDOMへ反映されます。Reactが更新手順を管理します。
