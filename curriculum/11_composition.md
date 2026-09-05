# 11. Composition / children

## 今日のゴール

- 見た目の枠と中身を分離できる
- Propsを増やすよりchildrenが自然な場面を判断できる

## children

```tsx
import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
};

function Card({ children }: CardProps) {
  return <section className="card">{children}</section>;
}
```

使用側:

```tsx
<Card>
  <h2>Title</h2>
  <p>Body</p>
</Card>
```

React 19でも`children`は重要なcomposition手段です。

## Propsを増やしすぎる例

```tsx
<Card title="..." subtitle="..." icon="..." body="..." footer="..." />
```

すべて固定slotとしてProps化するより、childrenや複数のReactNode Propsの方が自然な場合があります。

## 演習

`Panel` Componentを作り、中身としてFormでもListでも置けるようにしてください。

## 今日の一言説明

> Compositionは、Componentを細かい設定値で制御しすぎず、他のUIを組み合わせて柔軟に作る考え方。
