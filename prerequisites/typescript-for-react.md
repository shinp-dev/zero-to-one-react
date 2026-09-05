# Reactで使う最小限のTypeScript

本教材はViteの`react-ts`テンプレートを使います。TypeScript自体を深く学ぶことが目的ではありません。

## Propsの型

```tsx
type GreetingProps = {
  name: string;
  age?: number;
};

function Greeting({ name, age }: GreetingProps) {
  return <p>{name} {age}</p>;
}
```

`?`は省略可能なpropertyです。

## useStateは多くの場合推論できる

```tsx
const [count, setCount] = useState(0);
const [text, setText] = useState('');
```

わざわざ`useState<number>(0)`と書かなくても推論されます。

初期値が`null`を含む場合は型を明示することがあります。

```tsx
const [selectedId, setSelectedId] = useState<number | null>(null);
```

## Eventの型

JSXに直接書く場合、多くは型推論できます。

```tsx
<input onChange={(event) => setText(event.target.value)} />
```

関数へ切り出す場合だけ型を書く場面が増えます。

```tsx
import type { ChangeEvent } from 'react';

function handleChange(event: ChangeEvent<HTMLInputElement>) {
  setText(event.target.value);
}
```

## ReactNode

`children`の型には`ReactNode`が便利です。

```tsx
import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
};
```

## anyで逃げすぎない

学習中に型エラーが出たとき、すぐ`any`を付けるとTypeScriptの意味が消えます。

まず確認する順番:

1. 実際に入る値は何か
2. `null`や未定義を含むか
3. Propsの型と渡している値が一致しているか
4. Eventなら要素型が合っているか

TypeScriptで迷ってReactの学習が止まる場合は、教師やAIに「この値に必要な最小の型だけ教えて」と聞いて構いません。
