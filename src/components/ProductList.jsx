function QuantityControl({ quantity, onIncrement, onDecrement }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5">
      <button
        type="button"
        onClick={onDecrement}
        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-600 transition hover:bg-white hover:text-slate-900"
        aria-label="Azalt"
      >
        −
      </button>
      <span className="min-w-[2rem] px-2 text-center text-sm font-semibold tabular-nums text-slate-800">{quantity}</span>
      <button
        type="button"
        onClick={onIncrement}
        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-600 transition hover:bg-white hover:text-slate-900"
        aria-label="Artır"
      >
        +
      </button>
    </div>
  );
}

export default function ProductList({ items, onIncrement, onDecrement, onRemove }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-12 text-center">
        <p className="text-sm font-medium text-slate-500">Bu kriterlere uygun ürün yok.</p>
        <p className="mt-1 text-xs text-slate-400">Arama terimini değiştirmeyi veya yeni ürün eklemeyi deneyin.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-white shadow-sm ring-1 ring-slate-900/5">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex flex-col gap-3 px-4 py-4 transition hover:bg-slate-50/80 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-slate-900">{item.name}</span>
              <span className="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-800">
                {item.category}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <QuantityControl
              quantity={item.quantity}
              onIncrement={() => onIncrement(item.id)}
              onDecrement={() => onDecrement(item.id)}
            />
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              Sil
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
