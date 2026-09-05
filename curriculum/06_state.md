# 06. State — UIが覚える値

## 今日のゴール

- PropsとStateの違いを説明できる
- `useState`でユーザー操作に応じてUIを更新できる

## Stateとは

Componentがrenderをまたいで覚える必要がある値です。

```tsx
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

## 普通の変数ではだめ？

```tsx
let count = 0;
```

をComponent内で変更しても、Reactに「もう一度renderして」と伝わりません。また次のrenderではComponent関数が再実行されます。

Stateには、

- render間で値を保持する
- 更新時にrenderを要求する

という役割があります。

## Stateは直接変更しない

object / array stateも新しい値を作ります。

```tsx
setUser({ ...user, name: 'Mika' });
setItems([...items, newItem]);
```

## 演習

選択中の商品IDをStateにしてください。

```tsx
const [selectedId, setSelectedId] = useState<number | null>(null);
```

商品を押すと選択中の商品名が画面に表示されるようにします。

## 今日の一言説明

> StateはComponentが覚える値で、setterによる更新が次のrenderにつながる。
