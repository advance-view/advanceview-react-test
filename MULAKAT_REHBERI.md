# Smart Shopping List — Mülakat Rehberi (Yalnızca Mülakatçı)

Bu dosya adaya verilmemelidir. Adaya yalnızca görev tanımını iletin; aşağıdaki bug çözümleri ve değerlendirme notları sizin iç referansınızdır.

## Adaya iletilecek görev özeti

1. **Bug düzeltmeleri:** Uygulamada davranış veya React ile ilgili sorunlar olduğunu varsayın. Konsolu ve listeyi kullanarak sorunları tespit edin, gerekçenizi kısaca açıklayın ve düzeltin.
2. **Yeni özellik:** **Kategoriye göre filtreleme** ekleyin (ör. Meyve, Elektronik, Gıda, Temizlik, Diğer ve “Tümü”). Bu filtre, mevcut **arama çubuğu** ile birlikte çalışmalıdır: hem seçilen kategoriye hem de arama metnine uyan ürünler listelenmelidir.
3. **Beklenti:** Temiz state yönetimi, doğru bağımlılık dizileri, liste öğeleri için **stabil ve benzersiz `key`** kullanımı ve gereksiz yeniden render’ların farkında olunması.

---

## Gizli bug’lar ve beklenen düzeltmeler (iç kullanım)

### 1. State mutation (miktar artırma)

- **Konum:** `App.jsx` içinde miktar artırma güncellemesi.
- **Sorun:** Yeni dizi oluşturulsa bile ilgili ürün nesnesi önceki state ile aynı referans; `quantity` doğrudan bu nesne üzerinde artırılıyor. Bu, React’ın immutability beklentisini ihlal eder; güncelleme atlanabilir veya öngörülemeyen render davranışına yol açabilir.
- **Beklenen düzeltme:** `map` ile ilgili öğe için yeni bir nesne döndürmek veya `structuredClone` / spread ile kopyalamak: `setItems(prev => prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p))`.

### 2. Stale closure / `useEffect`

- **Konum:** `App.jsx` üst kısmındaki `useEffect`.
- **Sorun:** Bağımlılık dizisi boş (`[]`); efekt yalnızca mount’ta çalışır ve `items.length` o anki closure değerini kullanır. Liste uzunluğu değişince konsoldaki log güncellenmez (veya yanlış/eskimiş sayıyı yansıtır).
- **Beklenen düzeltme:** `items` veya `items.length`’i bağımlılığa eklemek; ya da log’un amacı “sadece mount” ise metni/değişkeni buna göre değiştirmek. Analytics senaryosu için `[items]` veya `[items.length]` uygun olur.

### 3. `key` olarak `index`

- **Konum:** `ProductList.jsx` içinde liste render’ı.
- **Sorun:** `key={index}` silme veya sıralama değişince DOM ile state’in yanlış eşleşmesine yol açabilir; özellikle filtrelenmiş listede satırlar “zıplayabilir” veya yanlış satır güncellenmiş gibi görünebilir.
- **Beklenen düzeltme:** `key={item.id}` (veya kalıcı benzersiz bir id).

---

## Özellik: Kategori filtresi + arama

- **Beklenen davranış:** Örnek mantık: `items` → önce kategori filtresi (`Tümü` ise atla) → sonra `searchQuery` ile isim eşlemesi. İkisini `useMemo` içinde birleştirmek okunabilir bir çözümdür.
- **UI:** Select veya buton grubu ile kategori seçimi; “Tümü” seçeneği.

---

## Değerlendirme ipuçları

- Aday bug’ları **neden** sorun olduğunu söyleyebiliyor mu (immutability, effect deps, reconciliation/key)?
- Filtre + arama birlikte tek kaynak doğrultusunda mı hesaplanıyor?
- Düzeltmeler minimal ve okunabilir mi; gereksiz `useEffect` veya global mutable state eklenmemiş mi?

---

## Çalıştırma

```bash
npm install
npm run dev
```

Üretim derlemesi: `npm run build`.
