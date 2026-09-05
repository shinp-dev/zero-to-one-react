# 05. Events — ユーザー操作に応答する

## 今日のゴール

- event handlerを「呼び出す」のではなく「渡す」意味を理解する
- 子から親への通知をcallback Propsで実現する

## Event handler

```tsx
function Button() {
  function handleClick() {
    console.log('clicked');
  }

  return <button onClick={handleClick}>Click</button>;
}
```

違い:

```tsx
onClick={handleClick}   // 関数を渡す
onClick={handleClick()} // render中に実行してしまう
```

引数が必要なら:

```tsx
onClick={() => handleSelect(product.id)}
```

## 子から親へ通知

```tsx
type SelectButtonProps = {
  onSelect: () => void;
};

function SelectButton({ onSelect }: SelectButtonProps) {
  return <button onClick={onSelect}>選択</button>;
}
```

callback自体を親からPropsとして渡します。

## 演習

`ProductCard`の「選択」ボタンを押すと、親の`App`で選択された商品名を`console.log`してください。

まだStateは使いません。

## 今日の一言説明

> Event handlerはユーザー操作が起きたときに実行する関数。子から親への通知もPropsで関数を渡して行える。
