# 04. 条件付きUI・List・key

## 今日のゴール

- 配列からUIを生成できる
- `key`の目的を説明できる

## 条件付きUI

通常のJavaScript式で決めます。

```tsx
<p>{inStock ? '在庫あり' : '売り切れ'}</p>
```

何も表示しないなら、状況によって`null`を返す方法もあります。

## List

```tsx
const products = [
  { id: 1, name: 'Keyboard' },
  { id: 2, name: 'Mouse' },
];

<ul>
  {products.map((product) => (
    <li key={product.id}>{product.name}</li>
  ))}
</ul>
```

## keyは表示用IDではない

`key`はReactが兄弟要素を識別するために使います。

良いkey:

- DBのID
- データ作成時に付与された安定したID

安易に避けたいもの:

- `Math.random()`
- 順序が変わるlistでのarray index

## 演習

商品配列から`ProductCard`を`map`で表示してください。在庫なしの商品には「売り切れ」を表示します。

## 確認

商品の順序を入れ替えた場合でも同じ商品が同じkeyを持つ状態にしてください。

## 今日の一言説明

> keyは、list内の同じデータをReactが継続して識別するための安定した名前。
