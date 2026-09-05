# 02. Components — UIを部品として考える

## 今日のゴール

- ComponentがJavaScript関数であることを理解する
- 大きなUIを意味のある単位へ分ける

## Component

```tsx
function Header() {
  return <header><h1>My App</h1></header>;
}

export default function App() {
  return (
    <main>
      <Header />
      <p>本文</p>
    </main>
  );
}
```

Component名は大文字から始めます。

## 「再利用できるもの」だけではない

Component分割の目的は再利用だけではありません。

- 役割を分ける
- 読む範囲を小さくする
- stateの責任範囲を考えやすくする
- テストしやすくする

## 演習

次の画面を3つへ分けてください。

```text
App
├─ Header
├─ Profile
└─ Footer
```

最初は同じファイル内に定義して構いません。

## 分けすぎにも注意

`<p>`1個ごとにComponentへする必要はありません。「名前を付ける意味があるまとまり」から分けます。

## 完成チェック

- `App`が画面全体を組み立てている
- `Header` / `Profile` / `Footer`がそれぞれ独立している
- 見た目は分割前と同じ

## 今日の一言説明

> Componentは、UIの一部分を計算するJavaScript関数。
