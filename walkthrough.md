# Walkthrough - HSK 1 Micro-Dosing Mode 🍃

Aplikasi telah berhasil dirombak secara menyeluruh sesuai dengan spesifikasi baru: UI yang lebih bersih, Dark Mode, Day Streak tracker, Papan Tulis Hanzi interaktif, dan sistem toggle murni.

---

## 🎨 Ringkasan Perombakan & Fitur Baru

### 1. 🧹 Pembersihan & Perubahan Teks (UI Cleanup)
- **Header Title**: Diubah menjadi **"HSK 1 - Micro-Dosing Mode"** dengan subtitle *"Belajar 1 Kata per Waktu"*.
- **Footer Text**: Diubah menjadi **"HSK 1 - Micro-Dosing Mode"**.
- **Penghapusan Lofi Rain**: Seluruh teks, tombol, audio synthesizer, dan referensi terkait *Lofi Rain* telah dihapus seutuhnya.
- **Indikator Kata Lebih Bersih**: Menampilkan teks minimalis: `☕ Kata ke-1 hari ini`.

### 2. 👁️ Sistem Toggle Murni (Arti & Hanzi)
- Tombol *"Ulangi Kartu Ini (Sembunyikan Semua)"* telah dihapus.
- Dua tombol kontrol murni:
  - **`👁️ Arti`**: Klik untuk men-toggle blur pada arti/petunjuk Bahasa Indonesia (Show $\leftrightarrow$ Hide).
  - **`👁️ Hanzi`**: Klik untuk men-toggle blur pada karakter Hanzi (Show $\leftrightarrow$ Hide).
- Pengguna juga dapat mengeklik langsung teks/kotak yang buram untuk membuka/menyembunyikannya.
- Saat menekan **"Lanjut Santai ✨"**, kata baru selalu dimulai dalam kondisi tersembunyi/ter-blur secara otomatis (`.obscured`).

### 3. 🔥 Fitur Day Streak Tracker
- Menggantikan seksi *Trik Santai*.
- Menggunakan `localStorage` (`hsk_last_visit_date` & `hsk_day_streak`):
  - Kunjungan hari berturut-turut akan menambah streak (+1).
  - Jika membuka di hari yang sama, streak tetap dipertahankan.
  - Jika bolong lebih dari 1 hari, streak di-reset kembali ke 1.
- Ditampilkan secara elegan di stats bar: `🔥 X Hari Streak`.

### 4. ✍️ Fitur Papan Latihan Tulis Hanzi (Drawing Canvas)
- Mini writing board `<canvas>` responsif terletak di bawah kartu flashcard.
- Dilengkapi garis bantu kotak putus-putus (*cross-grid guidelines*) untuk memandu goresan Hanzi.
- **Dukungan Penuh**:
  - **Mouse**: `mousedown`, `mousemove`, `mouseup`, `mouseleave`.
  - **Touch Layar Sentuh HP/Tablet**: `touchstart`, `touchmove`, `touchend` (dengan pencegahan scroll otomatis `preventDefault` & `touch-action: none`).
- Tombol **`🗑️ Bersihkan`** untuk menghapus goresan papan tulis.
- Otomatis dibersihkan setiap kali berpindah ke kata baru.

### 5. 🌙 Fitur Dark Mode (Mode Gelap)
- Tombol toggle `☀️/🌙` di pojok kanan atas header.
- Menggunakan CSS Variables (`:root` dan `body.dark-mode`) dengan palet warna abu-abu gelap / slate elegan.
- Preferensi tersimpan otomatis di `localStorage` (`hsk_theme`), sehingga tetap aktif saat halaman di-refresh.
- Warna goresan kanvas otomatis menyesuaikan tema (terang/gelap).

---

## 🌐 Akses Uji Coba

Buka link berikut di browser Anda:
👉 **[http://localhost:8080/index.html](http://localhost:8080/index.html)**
