import { useState } from 'react';

const products = [
  { id: 1, name: 'Keyboard' },
  { id: 2, name: 'Mouse' },
  { id: 3, name: 'Monitor' },
];

export default function App() {
  const [searchText, setSearchText] = useState('');

  // filteredProductsは既存データから計算できるのでStateにしない。
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <main>
      <input
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Search"
      />

      <p>{filteredProducts.length} items</p>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </main>
  );
}
