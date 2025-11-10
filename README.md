# 🗳️ Sistem E-Voting UKMR 2025

Sistem E-Voting berbasis web untuk **Pemilihan Nakhoda Unit Kebudayaan Melayu Riau (UKMR) ITB 2025**, dirancang agar pemungutan suara berlangsung **aman, transparan, dan mudah digunakan** oleh mahasiswa.

---

### 📁 Struktur Proyek

```
pemilu_ukmr/
├── README.md
├── .gitignore
├── vercel.json
├── backend/
│   ├── server.js                 # Backend Express API
│   ├── package.json
└── frontend/
    ├── index.html            # Halaman utama e-voting
    ├── login.html            # Login untuk pemilih
    ├── admin-login.html      # Login untuk admin
    ├── admin.html            # Dashboard admin (grafik hasil)
    ├── vote.html             # Halaman pemilihan kandidat
    ├── thankyou.html         # Halaman ucapan terima kasih
    ├── login.js
    ├── vote.js
    ├── admin-login.js
    ├── admin.js
    └── images/               # Foto logo
```

---

### ⚙️ Fitur Utama

#### 🧑‍💻 Untuk Pemilih

* Login menggunakan **NIM dan password unik**
* Melihat daftar kandidat (nama, foto, visi)
* Memilih satu kandidat (atau kotak kosong)
* Tidak bisa memilih lebih dari sekali
* Countdown waktu pemilihan otomatis (hingga 9 November 2025, 23:59)
* Halaman **terima kasih** setelah voting berhasil

#### 🛠️ Untuk Admin

* Login dengan akun admin terdaftar
* Melihat **jumlah total pemilih dan yang sudah memilih**
* Melihat **jumlah suara tiap kandidat**
* Menampilkan hasil dalam bentuk **diagram pie (Chart.js)**

---

### 🧩 Teknologi yang Digunakan

| Bagian          | Teknologi                             |
| :-------------- | :------------------------------------ |
| **Frontend**    | HTML, CSS, JavaScript, TailwindCSS    |
| **Backend**     | Node.js + Express                     |
| **Database**    | PostgreSQL (Supabase)                 |
| **Autentikasi** | JSON Web Token (JWT) + bcrypt hashing |
| **Hosting**     | Vercel (Serverless Deployment)        |

---

### ⚡ Setup Lokal

1. **Clone Repository**

   ```bash
   git clone https://github.com/username/pemilu-ukmr.git
   cd pemilu-ukmr
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Konfigurasi Environment (.env)**
   Buat file `.env` di root folder:

   ```bash
   DB_HOST=your-supabase-host
   DB_USER=postgres
   DB_PASS=your-password
   DB_DATABASE=postgres
   DB_PORT=5432
   JWT_SECRET=your-secret-key
   ```

4. **Jalankan Server Lokal**

   ```bash
   node server.js
   ```

   Server akan berjalan di `http://localhost:3000`.

---

### 🗄️ Struktur Database (PostgreSQL)

#### Tabel `users`

| Kolom         | Tipe                  | Keterangan                  |
| :------------ | :-------------------- | :-------------------------- |
| id            | SERIAL PRIMARY KEY    | ID unik pengguna            |
| nim           | VARCHAR(20)           | Nomor Induk Mahasiswa       |
| password_hash | TEXT                  | Hash password dengan bcrypt |
| has_voted     | BOOLEAN DEFAULT FALSE | Status sudah memilih        |

#### Tabel `admins`

| Kolom     | Tipe | Keterangan |
|:--|:--:|--:|
| id | SERIAL PRIMARY KEY | ID unik admin |
| username | VARCHAR(50) | Nama pengguna admin |
| password_hash | TEXT | Hash password admin |


#### Tabel `candidates`

| Kolom | Tipe | Keterangan |
|:--|:--:|--:|
| id | SERIAL PRIMARY KEY | ID kandidat |
| nama | VARCHAR(100) | Nama kandidat |
| foto_url | TEXT | Link foto kandidat |
| visi | TEXT | Visi dan misi kandidat |

#### Tabel `votes`

| Kolom | Tipe | Keterangan |
|:--|:--:|--:|
| id | SERIAL PRIMARY KEY | ID suara |
| user_id | INT REFERENCES users(id) | Pemilih |
| candidate_id | INT REFERENCES candidates(id) | Kandidat yang dipilih |

---

### 🔒 Keamanan

* Password disimpan dalam bentuk **bcrypt hash**, bukan plaintext.
* Token login menggunakan **JWT** dengan masa berlaku 2 jam.
* Server-side validasi memastikan satu akun hanya bisa memilih **sekali**.
* Semua endpoint admin dilindungi middleware `adminOnly`.

---

### 🚀 Deploy ke Vercel

1. Hubungkan repositori GitHub ke Vercel.
2. Pastikan file `server.js` berada di root project.
3. Di tab **Environment Variables**, masukkan variabel dari `.env`.
4. Deploy — Vercel akan otomatis membuat API Serverless dari `server.js`.

---

### 🧮 API Endpoint Utama

| Endpoint             | Method | Akses | Deskripsi                |
| :------------------- | :----- | :---- | :----------------------- |
| `/api/login`         | POST   | User  | Login pemilih            |
| `/api/admin-login`   | POST   | Admin | Login admin              |
| `/api/candidates`    | GET    | User  | Ambil daftar kandidat    |
| `/api/vote`          | POST   | User  | Kirim suara              |
| `/api/admin` | GET    | Admin | Hasil suara per kandidat |

---

### 🖼️ Preview

| Tampilan               | Deskripsi                                      |
| :--------------------- | :--------------------------------------------- |
| 🏠 **Index Page**      | Halaman utama dengan countdown waktu pemilihan |
| 🔐 **Login Page**      | Pemilih masuk menggunakan NIM                  |
| 🗳️ **Vote Page**      | Menampilkan kandidat & tombol “Pilih”          |
| ✅ **Thank You Page**   | Pesan sukses setelah voting                    |
| 📊 **Admin Dashboard** | Pie chart hasil dan statistik pemilih          |

---

### 👨‍💼 Kontributor

| Nama                    | Peran                            |
| :---------------------- | :------------------------------- |
| **Tengku Naufal Saqib** | Pengembang Utama (Full Stack)    |
| Tim UKMR ITB            | Penguji & Pengelola Data Pemilih |

---

### 📜 Lisensi

Proyek ini dilisensikan di bawah **MIT License**.
Bebas digunakan untuk kegiatan organisasi non-komersial dengan mencantumkan atribusi.

---
