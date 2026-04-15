# Smart Shopping List — React Mülakat Projesi

**Stack:** React 18 (fonksiyonel bileşenler), Vite 5, Tailwind CSS 3.

Bu depo, “bug fix + özellik” tipi frontend mülakatları için hazırlanmış bir **Smart Shopping List** uygulamasıdır. Başlangıçta `npm run dev` ile sorunsuz çalışır; içeride bilinçli olarak bırakılmış davranış sorunları vardır.

---

## Adaydan genel olarak ne bekleniyor?

1. **Hata ayıklama:** Konsolu ve listeyi kullanarak tutarsızlıkları bulmak, kısaca **neden** sorun olduğunu söylemek ve düzeltmek (immutability, `useEffect` bağımlılıkları, liste `key` kullanımı).
2. **Özellik:** **Kategoriye göre filtreleme** (ör. Meyve, Elektronik, Gıda, Temizlik, Diğer + **Tümü**) eklemek; filtrelemenin mevcut **arama çubuğu** ile **birlikte** çalışması (hem kategori hem metin kriterine uyan ürünler).
3. **Kalite:** Gereksiz karmaşıklıktan kaçınmak, state’i tek kaynaktan türetmek, mümkünse `useMemo` / türetilmiş liste ile okunabilir bir veri akışı kurmak.

---

## Uygulamayı ayağa kaldırma

```bash
npm install
npm run dev
```

Tarayıcıda genelde: [http://localhost:5173](http://localhost:5173)

Üretim derlemesi:

```bash
npm run build
npm run preview   # isteğe bağlı: build önizlemesi
```

---

## Gizli bug’lar — kısa tanım ve çözüm yolu

| # | Sorun (kısa) | Çözüm yolu (kısa) |
|---|----------------|-------------------|
| 1 | **State mutation:** Miktar artırılırken dizi kopyalanıyor olsa da ürün nesnesi mutate ediliyor; React immutability ile uyumsuz. | `setItems` içinde `map` ile eşleşen öğe için `{ ...p, quantity: p.quantity + 1 }` gibi **yeni nesne** döndürmek. |
| 2 | **Stale closure / `useEffect`:** Liste uzunluğu log’lanıyor ama bağımlılık dizisi boş; güncel `items`/`length` yakalanmıyor. | Log’un güncel kalması gerekiyorsa `items` veya `items.length`’i **dependency array**’e eklemek; ya da efektin amacını “yalnızca mount” olacak şekilde netleştirmek. |
| 3 | **`key` olarak `index`:** Özellikle silme / filtre sonrası satırlar yanlış eşleşebilir. | `key={item.id}` (veya kalıcı benzersiz id). |

İlgili dosyalar: `src/App.jsx` (1 ve 2), `src/components/ProductList.jsx` (3).

---

## Özellik — kategori + arama (kısa çözüm yolu)

- **State:** `selectedCategory` (ör. `'Tümü' | 'Meyve' | ...`).
- **Türetilmiş liste:** `items` üzerinde önce kategori (`Tümü` değilse eşleşen `category`), sonra `searchQuery` ile isim eşlemesi — tek `useMemo` veya tek yardımcı fonksiyon içinde birleştirmek.
- **UI:** `<select>`, segmented control veya chip’ler; “Tümü” tüm kategorileri geçer.

---

## Ek dosya

- **`MULAKAT_REHBERI.md`** — Mülakatçı için daha ayrıntılı iç notlar (adayla paylaşılmaması önerilir).

---

## Lisans / kullanım

İç kullanım ve mülakat amaçlıdır; ihtiyaca göre özelleştirilebilir.
