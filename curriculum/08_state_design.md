# 08. State設計 — 覚える値を最小にする

## 今日のゴール

- 派生値をむやみにStateへ入れない
- 重複Stateが同期ずれを起こす理由を理解する

## 悪い例

```tsx
const [products] = useState(initialProducts);
const [searchText, setSearchText] = useState('');
const [filteredProducts, setFilteredProducts] = useState(initialProducts);
```

`filteredProducts`は`products`と`searchText`から計算できます。

## 良い例

```tsx
const [searchText, setSearchText] = useState('');

const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchText.toLowerCase())
);
```

render時に計算すれば、同期用のStateもEffectも不要です。

## State候補を判定する3問

1. 時間とともに変わる？
2. Propsから渡されていない？
3. 既存Props / Stateから計算できない？

3つとも「はい」に近いならState候補です。

## Object / Array State

Mutationではなく新しい値を作ります。

```tsx
setProducts(
  products.map((product) =>
    product.id === id ? { ...product, favorite: true } : product
  )
);
```

## 演習

検索アプリを作ります。

Stateは`searchText`だけにして、検索結果件数とfiltered listはrender中に計算してください。

## 今日の一言説明

> 計算できる値はStateに保存せず、必要最小限のStateからrender時に導く。
