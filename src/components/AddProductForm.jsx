import { CATEGORIES } from '../constants';

export default function AddProductForm({ onAdd }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.productName.value.trim();
    const category = form.category.value;
    if (!name) return;
    onAdd({ name, category });
    form.reset();
    form.productName.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm ring-1 ring-slate-900/5"
    >
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Yeni ürün</h2>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label htmlFor="productName" className="mb-1 block text-xs font-medium text-slate-600">
            Ürün adı
          </label>
          <input
            id="productName"
            name="productName"
            type="text"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            placeholder="Örn. Muz"
          />
        </div>
        <div className="sm:w-44">
          <label htmlFor="category" className="mb-1 block text-xs font-medium text-slate-600">
            Kategori
          </label>
          <select
            id="category"
            name="category"
            defaultValue={CATEGORIES[0]}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          Ekle
        </button>
      </div>
    </form>
  );
}
