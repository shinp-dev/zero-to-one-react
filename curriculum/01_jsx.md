# 01. JSX — JavaScriptからUIを表現する

## 今日のゴール

- JSXとHTMLの違いを説明できる
- `{}`の中にJavaScript式を書ける

## JSXはHTML文字列ではない

```tsx
const name = 'Aki';

export default function App() {
  return <h1>Hello, {name}</h1>;
}
```

`{name}`は文字列置換専用構文ではなく、JavaScriptの式を埋め込む場所です。

```tsx
<p>{1 + 2}</p>
<p>{user.name}</p>
<p>{items.length}件</p>
```

## HTMLとの主な違い

- `class`ではなく`className`
- JavaScript式は`{}`
- 複数要素を返すなら1つの親またはFragment`<>...</>`で囲む
- tagは正しく閉じる

## Step 1

`App.tsx`を次のようにします。

```tsx
const user = {
  name: 'Mika',
  points: 80,
};

export default function App() {
  return (
    <main>
      <h1>{user.name}さん</h1>
      <p>現在 {user.points} ポイントです。</p>
    </main>
  );
}
```

## Step 2: 式を追加

合格ライン70点として、

```tsx
<p>{user.points >= 70 ? '合格' : '再挑戦'}</p>
```

を追加してください。

## やってはいけない理解

JSXは「HTMLの中にJavaScriptを書いている」のではなく、**JavaScriptからUIの構造を記述する構文**です。

## 完成チェック

- 名前とpointが表示される
- pointを60へ変えると表示が変わる
- DOMを直接書き換えるコードを書いていない

## 今日の一言説明

> JSXは、JavaScriptの値からUIを表現するための構文。
