# 07. Stateはsnapshot

## 今日のゴール

- `setState`直後に変数の値が変わらない理由を説明できる
- 前の値を使う更新でfunctional updaterを使える

## 実験

```tsx
function handleClick() {
  console.log(count);
  setCount(count + 1);
  console.log(count);
}
```

2つ目の`console.log`でも、そのhandlerが動いているrender時点の`count`が見えます。

Stateは普通のmutable変数ではなく、**各renderに渡されるsnapshot**として考えます。

## 3回増やすと？

```tsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

「+3になる」と思い込まず、実際に確認してください。

前の更新結果を使うなら:

```tsx
setCount((current) => current + 1);
setCount((current) => current + 1);
setCount((current) => current + 1);
```

## 演習

「+3」ボタンを作り、functional updaterを3回使って確実に3増やしてください。

## デバッグ観点

AIが`setX(x + 1)`を連続で生成した場合、snapshotとupdate queueを思い出してください。

## 今日の一言説明

> State変数は、そのrender時点のsnapshot。前回の更新結果へ依存するならupdater関数を使う。
