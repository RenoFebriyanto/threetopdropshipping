# THREETOP — Perbaikan Tampilan (Update)

Setelah lihat screenshot kamu, ketemu masalah UTAMA yang bikin seluruh
halaman tampil sebagai tumpukan teks polos tanpa layout sama sekali.

## BUG #1 — Custom theme (warna/font) tidak aktif
`tailwind.config.ts` berisi semua warna (`void`, `signal`, `ivory`, dst)
dan font custom kamu, tapi `app/styles/global.css` tidak pernah
menyambungkannya. Di Tailwind v4, `@tailwindcss/vite` **tidak lagi**
otomatis membaca `tailwind.config.ts` seperti versi lama — harus
disambung manual pakai `@config`.
→ Fix: tambah `@config '../../tailwind.config.ts';` setelah
`@import 'tailwindcss';`

## BUG #2 — INI PENYEBAB UTAMA layout berantakan di screenshot kamu
`global.css` kamu punya CSS biasa (bukan Tailwind) yang ditulis
langsung tanpa `@layer`, contoh:
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
button { background: none; border: none; padding: 0; font: inherit; }
```
Di Tailwind v4, semua utility class (`px-4`, `py-24`, `mx-auto`,
`gap-8`, `bg-signal`, dst) otomatis ditaruh di dalam **CSS Cascade
Layer**. Menurut spesifikasi CSS, style yang **tidak** ditaruh di
layer manapun SELALU menang melawan style yang ada di layer, apa pun
urutannya. Jadi reset `* { margin:0; padding:0 }` kamu itu
**menimpa paksa semua class spacing Tailwind di seluruh situs**:
- `mx-auto` gagal nge-center apa pun
- `px-4`, `py-24`, `p-8`, `mb-6`, dst — semua jadi 0
- Tombol kehilangan padding & background dari `button { padding:0 }`
- Section, card, form — semuanya kolaps jadi teks mepet tanpa jarak

Ini persis yang terlihat di screenshot kamu: teks menumpuk rapat,
tidak ada card/box, tidak ada spacing antar section.

→ **Fix:** saya bungkus semua CSS custom itu ke dalam `@layer base`
dan `@layer components`, supaya Tailwind memperlakukannya sebagai
bagian dari sistem layer-nya sendiri — sehingga utility class kamu
(`px-4`, `bg-signal`, dst) kembali bisa menimpa/berfungsi seperti
seharusnya.

## BUG #3 — Logo hilang (`/icon-512.png`)
`Navbar.tsx` & `Footer.tsx` memanggil `/icon-512.png` yang tidak ada
di project → broken image icon.
→ Fix: saya buatkan `public/icon-512.png` (placeholder logo lingkaran
saling-kait, warna hitam + signal-yellow senada palet situsmu).
Ganti nanti dengan logo asli kapan pun siap.

## BUG #4 — Placeholder produk mati
`FeaturedProducts.tsx` masih simpan field `image` yang mengarah ke
`via.placeholder.com` (layanan ini sudah tidak aktif). Field itu
sebenarnya tidak dipakai untuk render (kartu produk sudah pakai SVG
`ProductPlaceholder`), jadi saya bersihkan.

---

## Cara pakai
1. Extract isi zip ini ke root project kamu, TIMPA file yang sama.
2. `npm run dev` lalu refresh browser (hard refresh / Ctrl+Shift+R,
   supaya CSS lama di cache browser tidak kepakai lagi).

## File yang diubah/ditambahkan
- `app/styles/global.css` — fix utama (2 bug di atas)
- `public/icon-512.png` — baru, placeholder logo
- `app/components/sections/FeaturedProducts.tsx` — bersih-bersih
