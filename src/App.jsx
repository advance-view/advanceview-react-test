import { useEffect, useMemo, useState } from 'react';
import AddProductForm from './components/AddProductForm.jsx';
import ProductList from './components/ProductList.jsx';
import SearchBar from './components/SearchBar.jsx';
import { INITIAL_ITEMS } from './constants';

let nextId = 100;

export default function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log('[Analytics] Liste öğe sayısı:', items.length);
  }, []);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => p.name.toLowerCase().includes(q));asdas
  }, [items, searchQuery]);

  const addProduct = ({ name, category }) => {
    const id = String(nextId++);
    setItems((prev) => [...prev, { id, name, quantity: 1, category }]);
  };

  const incrementQuantity = (id) => {
    setItems((prev) => {
      const copy = [...prev];
      const target = copy.find((p) => p.id === id);
      if (target) {
        target.quantity += 1;
      }
      return copy;
    });
  };

  const decrementQuantity = (id) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: Math.max(0, p.quantity - 1) } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  const removeProduct = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const totalPieces = items.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl flex-col gap-1 px-4 py-8 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Alışveriş</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Smart Shopping List</h1>
          <p className="max-w-xl text-sm text-slate-600">
            Ürünlerinizi ekleyin, miktarları yönetin ve listeyi arama ile daraltın.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{items.length}</span> kalem ·{' '}
            <span className="font-semibold text-slate-900">{totalPieces}</span> adet
          </div>
        </section>

        <AddProductForm onAdd={addProduct} />

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Arama</label>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Liste</h2>
          <ProductList
            items={filteredItems}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
            onRemove={removeProduct}
          />
        </div>
      </main>

      <footer className="border-t border-slate-200/80 py-6 text-center text-xs text-slate-400">
        Smart Shopping List · React mülakat projesi
      </footer>
    </div>
  );
}
