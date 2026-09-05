# 09. Sharing State — Single Source of Truth

## 今日のゴール

- 2つのComponentで同じStateを共有したいときの置き場所を判断できる
- Lifting State Upを実装できる

## 問題

2つの`TemperatureInput`がそれぞれ独立したStateを持つと、片方を変えてももう片方は同期しません。

共有したい値は、**両方に共通する最も近い親**へ移します。

```text
Calculator  ← state owner
├─ CelsiusInput
└─ FahrenheitInput
```

親は値とcallbackをPropsで渡します。

```tsx
<TemperatureInput
  value={celsius}
  onChange={setCelsius}
/>
```

## Controlled / Uncontrolledの考え方

子Component自身が重要な値を持つのではなく、親から`value`と`onChange`を受ける設計にすると、親が状態を統一できます。

## 演習

2つの選択ボタンを作ります。

- `ProductList`
- `SelectedProduct`

選択中IDは`App`だけが持ち、両方へPropsで渡してください。

## 今日の一言説明

> 同じ状態を複数Componentで共有するときは、共通の親をsingle source of truthにする。
