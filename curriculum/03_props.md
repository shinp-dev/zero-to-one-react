# 03. Props — 親から子へデータを渡す

## 今日のゴール

- Propsの向きを説明できる
- 同じComponentを異なるデータで使える

## Props

```tsx
type UserCardProps = {
  name: string;
  role: string;
};

function UserCard({ name, role }: UserCardProps) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  );
}
```

親から値を渡します。

```tsx
<UserCard name="Aki" role="Designer" />
<UserCard name="Mika" role="Engineer" />
```

## 大事な向き

```text
Parent
  ↓ Props
Child
```

ChildがPropsそのものを書き換える設計にはしません。

## 演習

`ProductCard`を作ってください。

Props:

```ts
type ProductCardProps = {
  name: string;
  price: number;
  inStock: boolean;
};
```

3商品を`App`から渡して表示します。

## よくある誤解

Propsは「Componentの引数」です。特別な共有変数ではありません。

## 完成チェック

- 同じ`ProductCard`を3回使っている
- 商品ごとに表示内容が変わる
- `ProductCard`内に商品データを固定で埋め込んでいない

## 今日の一言説明

> Propsは、親Componentが子Componentへ渡す読み取り用の入力。
