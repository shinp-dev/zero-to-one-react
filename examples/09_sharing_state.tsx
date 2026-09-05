import { useState } from 'react';

const products = [
  { id: 1, name: 'Keyboard' },
  { id: 2, name: 'Mouse' },
];

type ProductListProps = {
  selectedId: number | null;
  onSelect: (id: number) => void;
};

function ProductList({ selectedId, onSelect }: ProductListProps) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <button onClick={() => onSelect(product.id)}>
            {product.name} {product.id === selectedId ? '✓' : ''}
          </button>
        </li>
      ))}
    </ul>
  );
}

type SelectedProductProps = {
  selectedId: number | null;
};

function SelectedProduct({ selectedId }: SelectedProductProps) {
  const selected = products.find((product) => product.id === selectedId);
  return <p>Selected: {selected?.name ?? 'none'}</p>;
}

export default function App() {
  // 2つの子が共有するため、共通の親AppがStateを所有する。
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <main>
      <ProductList selectedId={selectedId} onSelect={setSelectedId} />
      <SelectedProduct selectedId={selectedId} />
    </main>
  );
}
