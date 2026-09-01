/**
 * HSK 1 - Micro-Dosing Mode
 * Core Logic: Fetching, Micro-dosing Engine, Day Streak, Canvas Drawing, Dark Mode, Speech Audio & Evaluation
 */

// URL data kosakata HSK 1 resmi GitHub
const HSK1_WORDS_URL = "https://raw.githubusercontent.com/krmanik/HSK-3.0/refs/heads/main/New%20HSK%20(2025)/HSK%20Words/HSK_Level_1_words.txt";

// Kamus Kosakata HSK Level 1 Lengkap Bahasa Indonesia
const HSK_DICTIONARY = {
  "爱": { pinyin: "ài", meaning: "Suka / Mencintai", hint: "Bisa digunakan untuk menyukai makanan, hobi, atau seseorang." },
  "吧": { pinyin: "ba", meaning: "Kan / Yuk / Deh", hint: "Kata penegas santai di akhir kalimat (misal: 我们走吧 = Kita pergi yuk)." },
  "八": { pinyin: "bā", meaning: "Angka 8 (Delapan)", hint: "Angka keberuntungan paling populer di Tiongkok!" },
  "爸爸": { pinyin: "bàba", meaning: "Ayah / Papa", hint: "Panggilan akrab untuk ayah." },
  "百": { pinyin: "bǎi", meaning: "Ratus / Seratus", hint: "Satu ratus = 一百 (yì bǎi)." },
  "白天": { pinyin: "báitiān", meaning: "Siang Hari", hint: "Waktu terangnya matahari di siang hari." },
  "半": { pinyin: "bàn", meaning: "Setengah / Separuh", hint: "Misal: 半小时 = setengah jam." },
  "包子": { pinyin: "bāozi", meaning: "Bakpao / Roti Kukus", hint: "Makanan lezat kukus isi daging atau sayur." },
  "杯子": { pinyin: "bēizi", meaning: "Gelas / Cangkir", hint: "Wadah untuk minum teh atau kopi." },
  "本": { pinyin: "běn", meaning: "Jilid / Kata Penggolong Buku", hint: "Digunakan saat menghitung buku (misal: 一本书 = 1 buku)." },
  "边": { pinyin: "biān", meaning: "Sisi / Samping", hint: "Petunjuk arah sebelah/samping." },
  "病": { pinyin: "bìng", meaning: "Sakit / Penyakit", hint: "Misal: 生病 (jatuh sakit)." },
  "不": { pinyin: "bù", meaning: "Tidak / Bukan", hint: "Kata penolakan paling dasar." },
  "不客气": { pinyin: "bú kèqi", meaning: "Sama-sama", hint: "Jawaban ramah saat seseorang bilang 'Xièxie'." },
  "不要": { pinyin: "bú yào", meaning: "Jangan / Tidak Mau", hint: "Gunakan ini untuk menolak dengan santai." },
  "菜": { pinyin: "cài", meaning: "Sayur / Masakan / Hidangan", hint: "Bisa berarti sayuran segar atau menu masakan." },
  "茶": { pinyin: "chá", meaning: "Teh 🍵", hint: "Minuman menenangkan favorit saat santai." },
  "唱": { pinyin: "chàng", meaning: "Menyanyi", hint: "Misal: 唱歌 (menyanyikan lagu)." },
  "超市": { pinyin: "chāoshì", meaning: "Supermarket", hint: "Tempat belanja kebutuhan harian." },
  "车": { pinyin: "chē", meaning: "Kendaraan / Mobil", hint: "Misal: 开车 (menyetir mobil)." },
  "吃": { pinyin: "chī", meaning: "Makan", hint: "Kata penting saat lapar! (吃饭 = makan nasi)." },
  "穿": { pinyin: "chuān", meaning: "Memakai (Baju/Sepatu)", hint: "Mengenakan pakaian ke tubuh." },
  "出租车": { pinyin: "chūzūchē", meaning: "Taksi 🚕", hint: "Mobil angkutan umum sewaan." },
  "大": { pinyin: "dà", meaning: "Besar", hint: "Lawan kata dari kecil (小)." },
  "打电话": { pinyin: "dǎ diànhuà", meaning: "Menelepon", hint: "Menghubungi seseorang lewat telepon." },
  "大家": { pinyin: "dàjiā", meaning: "Semua Orang / Kalian Semua", hint: "Panggilan akrab untuk rombongan kawan." },
  "到": { pinyin: "dào", meaning: "Tiba / Sampai", hint: "Misal: 我到了 (Saya sudah sampai)." },
  "大学": { pinyin: "dàxué", meaning: "Universitas / Perguruan Tinggi", hint: "Tempat kuliah para mahasiswa." },
  "大学生": { pinyin: "dàxuéshēng", meaning: "Mahasiswa", hint: "Pelajar tingkat perguruan tinggi." },
  "的": { pinyin: "de", meaning: "Kepunyaan / (Yang)", hint: "Partikel penanda milik (misal: 我的 = milik saya)." },
  "第": { pinyin: "dì", meaning: "Ke- (Urutan)", hint: "Contoh: 第一 (yang pertama)." },
  "店": { pinyin: "diàn", meaning: "Toko", hint: "Misal: 书店 (toko buku)." },
  "点": { pinyin: "diǎn", meaning: "Jam / Titik / Sedikit", hint: "Digunakan untuk sebut jam (misal: 8点 = jam 8)." },
  "电话": { pinyin: "diànhuà", meaning: "Telepon", hint: "Alat komunikasi telepon." },
  "电脑": { pinyin: "diànnǎo", meaning: "Komputer / Laptop", hint: "Secara harfiah artinya 'Otak Listrik'!" },
  "电视": { pinyin: "diànshì", meaning: "Televisi / TV", hint: "Secara harfiah artinya 'Penglihatan Listrik'." },
  "电影": { pinyin: "diànyǐng", meaning: "Film", hint: "Nonton film di bioskop." },
  "电影院": { pinyin: "diànyǐngyuàn", meaning: "Bioskop", hint: "Gedung tempat menonton film." },
  "弟弟": { pinyin: "dìdi", meaning: "Adik Laki-laki", hint: "Saudara pria yang lebih muda." },
  "东西": { pinyin: "dōngxi", meaning: "Barang / Benda", hint: "Uniknya dibentuk dari kata Timur (东) dan Barat (西)!" },
  "都": { pinyin: "dōu", meaning: "Semua / Seluruhnya", hint: "Misal: 我们都喜欢 (Kita semua suka)." },
  "读": { pinyin: "dú", meaning: "Membaca / Belajar", hint: "Membaca buku atau belajar di kelas." },
  "对": { pinyin: "duì", meaning: "Benar / Tepat", hint: "Gunakan untuk mengiyakan sesuatu." },
  "对不起": { pinyin: "duìbuqǐ", meaning: "Maaf / Mohon Maaf", hint: "Ungkapan penyesalan yang sopan." },
  "多": { pinyin: "duō", meaning: "Banyak", hint: "Lawan kata dari sedikit (少)." },
  "多少": { pinyin: "duōshao", meaning: "Berapa Banyak?", hint: "Gunakan saat menanyakan harga atau jumlah." },
  "读书": { pinyin: "dú shū", meaning: "Belajar / Membaca Buku", hint: "Aktivitas membaca buku." },
  "二": { pinyin: "èr", meaning: "Angka 2 (Dua)", hint: "Angka dua dasar." },
  "儿子": { pinyin: "érzi", meaning: "Anak Laki-laki", hint: "Anak kandung pria." },
  "饭": { pinyin: "fàn", meaning: "Nasi / Makanan", hint: "Makanan pokok sehari-hari." },
  "饭店": { pinyin: "fàndiàn", meaning: "Restoran / Rumah Makan", hint: "Tempat makan yang lezat." },
  "房间": { pinyin: "fángjiān", meaning: "Kamar / Ruangan", hint: "Kamar tidur atau ruangan di rumah." },
  "非常": { pinyin: "fēicháng", meaning: "Sangat / Amat", hint: "Lebih kuat dari kata 很 (hěn)." },
  "飞机": { pinyin: "fēijī", meaning: "Pesawat Terbang ✈️", hint: "Secara harfiah artinya 'Mesin Terbang'." },
  "分": { pinyin: "fēn", meaning: "Menit / Membagi", hint: "Satuan menit waktu." },
  "分钟": { pinyin: "fēnzhōng", meaning: "Durasi Menit", hint: "Misal: 5分钟 = 5 menit." },
  "高兴": { pinyin: "gāoxìng", meaning: "Senang / Gembira 😊", hint: "Perasaan bahagia dan riang." },
  "个": { pinyin: "gè", meaning: "Sebuah / Seorang (Penggolong)", hint: "Kata bilang paling fleksibel dalam Mandarin!" },
  "歌": { pinyin: "gē", meaning: "Lagu 🎵", hint: "Misal: 听歌 (mendengarkan lagu)." },
  "哥哥": { pinyin: "gēge", meaning: "Kakak Laki-laki", hint: "Saudara pria yang lebih tua." },
  "给": { pinyin: "gěi", meaning: "Memberi / Untuk", hint: "Misal: 给你 (memberi kamu)." },
  "公司": { pinyin: "gōngsī", meaning: "Perusahaan / Kantor", hint: "Tempat bekerja profesional." },
  "工作": { pinyin: "gōngzuò", meaning: "Bekerja / Pekerjaan", hint: "Aktivitas kerja sehari-hari." },
  "狗": { pinyin: "gǒu", meaning: "Anjing 🐶", hint: "Hewan peliharaan yang setia." },
  "贵": { pinyin: "guì", meaning: "Mahal", hint: "Lawan kata dari murah (便宜)." },
  "国": { pinyin: "guó", meaning: "Negara", hint: "Misal: 中国 (Tiongkok)." },
  "还": { pinyin: "hái", meaning: "Masih / Juga", hint: "Menyatakan kondisi yang masih berlanjut." },
  "孩子": { pinyin: "háizi", meaning: "Anak-anak 🧒", hint: "Anak kecil atau buah hati." },
  "汉语": { pinyin: "hànyǔ", meaning: "Bahasa Mandarin", hint: "Bahasa yang sedang kamu pelajari!" },
  "汉字": { pinyin: "hànzì", meaning: "Karakter Hanzi ✍️", hint: "Huruf mandarin (tak usah takut, pelan-pelan saja!)." },
  "号": { pinyin: "hào", meaning: "Tanggal / Nomor", hint: "Digunakan untuk sebut tanggal kalender atau nomor." },
  "好": { pinyin: "hǎo", meaning: "Baik / Bagus / OK 👍", hint: "Kata paling positif dan sering dipakai!" },
  "好吃": { pinyin: "hǎochī", meaning: "Enak (Makanan) 😋", hint: "Pujian wajib saat makan makanan lezat." },
  "好看": { pinyin: "hǎokàn", meaning: "Bagus Dilihat / Cantik / Tampan", hint: "Pujian untuk pemandangan atau penampilan." },
  "好听": { pinyin: "hǎotīng", meaning: "Merdu / Enak Didengar 🎧", hint: "Pujian untuk suara atau lagu yang indah." },
  "好玩儿": { pinyin: "hǎowánr", meaning: "Seru / Menyenangkan", hint: "Suasana yang asyik dan bikin riang." },
  "和": { pinyin: "hé", meaning: "Dan / Bersama", hint: "Kata hubung (misal: 你和我 = Kamu dan aku)." },
  "喝": { pinyin: "hē", meaning: "Minum 🍵", hint: "Misal: 喝茶 (minum teh)." },
  "很": { pinyin: "hěn", meaning: "Sangat", hint: "Misal: 很好 (sangat baik)." },
  "后": { pinyin: "hòu", meaning: "Belakang / Setelah", hint: "Petunjuk waktu atau posisi." },
  "回": { pinyin: "huí", meaning: "Kembali / Pulang", hint: "Misal: 回家 (pulang ke rumah)." },
  "会": { pinyin: "huì", meaning: "Bisa / Mampu / Akan", hint: "Menyatakan keahlian yang dipelajari." },
  "火车": { pinyin: "huǒchē", meaning: "Kereta Api 🚂", hint: "Secara harfiah artinya 'Mobil Api'." },
  "几": { pinyin: "jǐ", meaning: "Berapa? (Beberapa)", hint: "Menanyakan jumlah kecil." },
  "家": { pinyin: "jiā", meaning: "Rumah / Keluarga 🏠", hint: "Tempat pulang paling nyaman." },
  "见": { pinyin: "jiàn", meaning: "Bertemu / Melihat", hint: "Misal: 再见 (sampai jumpa lagi)." },
  "件": { pinyin: "jiàn", meaning: "Kata Penggolong Baju / Urusan", hint: "Contoh: 一件衣服 (sepotong baju)." },
  "叫": { pinyin: "jiào", meaning: "Dipanggil / Bernama", hint: "Gunakan untuk perkenalan nama (我叫...)." },
  "饺子": { pinyin: "jiǎozi", meaning: "Dimsum / Dumpling 🥟", hint: "Makanan favorit khas Tiongkok." },
  "家人": { pinyin: "jiārén", meaning: "Anggota Keluarga", hint: "Orang-orang tercinta di rumah." },
  "鸡蛋": { pinyin: "jīdàn", meaning: "Telur Ayam 🥚", hint: "Bahan makanan sehat sehari-hari." },
  "姐姐": { pinyin: "jiějie", meaning: "Kakak Perempuan", hint: "Saudara wanita yang lebih tua." },
  "今年": { pinyin: "jīnnián", meaning: "Tahun Ini", hint: "Tahun yang sedang berjalan." },
  "今天": { pinyin: "jīntiān", meaning: "Hari Ini ☀️", hint: "Hari saat ini." },
  "九": { pinyin: "jiǔ", meaning: "Angka 9 (Sembilan)", hint: "Angka sembilan." },
  "觉得": { pinyin: "juéde", meaning: "Merasa / Menurut Saya", hint: "Mengungkapkan pendapat." },
  "开": { pinyin: "kāi", meaning: "Buka / Menyala / Menyetir", hint: "Misal: 开门 (buka pintu)." },
  "开车": { pinyin: "kāi chē", meaning: "Menyetir Mobil 🚗", hint: "Mengendarai kendaraan roda empat." },
  "看": { pinyin: "kàn", meaning: "Melihat / Membaca / Nonton", hint: "Mata fokus memperhatikan sesuatu." },
  "看病": { pinyin: "kàn bìng", meaning: "Berobat / Periksa ke Dokter", hint: "Memeriksakan kesehatan ke dokter." },
  "看见": { pinyin: "kànjiàn", meaning: "Kelihatan / Melihat", hint: "Hasil dari penglihatan mata." },
  "课": { pinyin: "kè", meaning: "Pelajaran / Kelas", hint: "Sesi belajar kosakata." },
  "可以": { pinyin: "kěyǐ", meaning: "Boleh / Bisa", hint: "Memberi izin atau menyatakan kemampuan." },
  "口": { pinyin: "kǒu", meaning: "Mulut / Anggota Keluarga", hint: "Kata penggolong jumlah anggota keluarga." },
  "块": { pinyin: "kuài", meaning: "Potong / Satuan Uang Yuan", hint: "Penyebutan santai untuk uang RMB." },
  "来": { pinyin: "lái", meaning: "Datang", hint: "Lawan kata dari pergi (去)." },
  "老师": { pinyin: "lǎoshī", meaning: "Guru / Pengajar 🧑‍🏫", hint: "Panggilan hormat untuk pengajar." },
  "了": { pinyin: "le", meaning: "Sudah (Partikel)", hint: "Penanda tindakan yang telah selesai." },
  "冷": { pinyin: "lěng", meaning: "Dingin ❄️", hint: "Suhu udara dingin menyejukkan." },
  "里": { pinyin: "lǐ", meaning: "Dalam / Di Dalam", hint: "Menunjukkan lokasi bagian dalam." },
  "两": { pinyin: "liǎng", meaning: "Dua (Untuk Jumlah Benda)", hint: "Digunakan saat menghitung (misal: 两个 = 2 buah)." },
  "零": { pinyin: "líng", meaning: "Angka 0 (Nol)", hint: "Angka nol." },
  "六": { pinyin: "liù", meaning: "Angka 6 (Enam)", hint: "Angka enam." },
  "吗": { pinyin: "ma", meaning: "Apakah? (Partikel Tanya)", hint: "Tambahkan 'ma' di akhir kalimat untuk bertanya!" },
  "卖": { pinyin: "mài", meaning: "Menjual", hint: "Lawan kata dari membeli (买)." },
  "买": { pinyin: "mǎi", meaning: "Membeli 🛒", hint: "Aktivitas belanja barang." },
  "妈妈": { pinyin: "māma", meaning: "Ibu / Mama 👩", hint: "Sosok tersayang di keluarga." },
  "忙": { pinyin: "máng", meaning: "Sibuk", hint: "Banyak kegiatan." },
  "猫": { pinyin: "māo", meaning: "Kucing 🐱", hint: "Hewan peliharaan yang lucu." },
  "没关系": { pinyin: "méi guānxi", meaning: "Tidak Apa-apa / Santai Saja", hint: "Motto utama saat belajar santai!" },
  "妹妹": { pinyin: "mèimei", meaning: "Adik Perempuan", hint: "Saudara perempuan yang lebih muda." },
  "没事": { pinyin: "méishì", meaning: "Gak Masalah / Santai Aja", hint: "Jawaban santai saat tidak ada kendala." },
  "没": { pinyin: "méi", meaning: "Tidak / Belum", hint: "Singkatan dari 没有." },
  "没有": { pinyin: "méiyǒu", meaning: "Tidak Punya / Belum", hint: "Menyatakan ketiadaan sesuatu." },
  "们": { pinyin: "men", meaning: "Partikel Jamak (Kalian/Mereka)", hint: "Ditambahkan setelah kata ganti orang." },
  "面包": { pinyin: "miànbāo", meaning: "Roti 🍞", hint: "Makanan sarapan empuk lezat." },
  "面条儿": { pinyin: "miàntiáor", meaning: "Mie 🍜", hint: "Makanan mie kenyal khas Asia." },
  "米饭": { pinyin: "mǐfàn", meaning: "Nasi Putih 🍚", hint: "Nasi matang hangat." },
  "明年": { pinyin: "míngnián", meaning: "Tahun Depan", hint: "Tahun yang akan datang." },
  "明天": { pinyin: "míngtiān", meaning: "Besok 🌅", hint: "Hari esok yang penuh semangat." },
  "名字": { pinyin: "míngzi", meaning: "Nama", hint: "Identitas sebutan seseorang." },
  "那": { pinyin: "nà", meaning: "Itu", hint: "Menunjuk benda di kejauhan." },
  "哪": { pinyin: "nǎ", meaning: "Yang Mana?", hint: "Kata tanya pilihan." },
  "那边": { pinyin: "nàbiān", meaning: "Sebelah Sana", hint: "Arah tempat di sana." },
  "那个": { pinyin: "nàge", meaning: "Yang Itu", hint: "Menunjuk benda spesifik." },
  "哪个": { pinyin: "nǎge", meaning: "Yang Mana?", hint: "Menanyakan benda pilihan." },
  "那里": { pinyin: "nàlǐ", meaning: "Di Sana", hint: "Lokasi tempat di sana." },
  "哪里": { pinyin: "nǎlǐ", meaning: "Di Mana? / Ah Tidak Juga", hint: "Ungkapan rendah hati saat dipuji." },
  "男": { pinyin: "nán", meaning: "Laki-laki / Pria", hint: "Pria." },
  "男朋友": { pinyin: "nánpéngyou", meaning: "Pacar Laki-laki", hint: "Pasangan pria." },
  "那儿": { pinyin: "nàr", meaning: "Di Sana", hint: "Gaya bicara santai untuk 'di sana'." },
  "哪儿": { pinyin: "nǎr", meaning: "Di Mana?", hint: "Gaya bicara santai untuk 'di mana'." },
  "那些": { pinyin: "nàxiē", meaning: "Itu Semua", hint: "Benda-benda di sana." },
  "哪些": { pinyin: "nǎxiē", meaning: "Yang Mana Saja?", hint: "Pertanyaan jamak." },
  "呢": { pinyin: "ne", meaning: "Bagaimana Dengan...? / Lagi Apa?", hint: "Partikel tanya santai (misal: 你呢 = Kalau kamu?)." },
  "能": { pinyin: "néng", meaning: "Bisa / Mampu", hint: "Kemampuan melakukan sesuatu." },
  "你": { pinyin: "nǐ", meaning: "Kamu", hint: "Kata sapaan untuk lawan bicara." },
  "你好": { pinyin: "nǐ hǎo", meaning: "Halo / Apa Kabar 😊", hint: "Salam sapaan paling populer!" },
  "年": { pinyin: "nián", meaning: "Tahun", hint: "Satuan kurun waktu tahun." },
  "你们": { pinyin: "nǐmen", meaning: "Kalian", hint: "Sapaan jamak untuk rombongan teman." },
  "您": { pinyin: "nín", meaning: "Anda (Sopan)", hint: "Panggilan hormat untuk orang tua atau tamu." },
  "牛奶": { pinyin: "niúnǎi", meaning: "Susu Sapi 🥛", hint: "Minuman susu segar bernutrisi." },
  "女": { pinyin: "nǚ", meaning: "Perempuan / Wanita", hint: "Wanita." },
  "女儿": { pinyin: "nǚ'ér", meaning: "Anak Perempuan 👧", hint: "Anak wanita tercinta." },
  "女朋友": { pinyin: "nǚpéngyou", meaning: "Pacar Perempuan", hint: "Pasangan wanita." },
  "女士": { pinyin: "nǚshì", meaning: "Ibu / Nona (Sopan)", hint: "Sebutan sopan untuk wanita." },
  "朋友": { pinyin: "péngyou", meaning: "Teman / Sahabat 🤝", hint: "Orang dekat yang seru." },
  "便宜": { pinyin: "piányi", meaning: "Murah", hint: "Harga bersahabat." },
  "漂亮": { pinyin: "piàoliang", meaning: "Cantik / Indah 🌸", hint: "Pujian untuk pemandangan atau seseorang." },
  "苹果": { pinyin: "píngguǒ", meaning: "Buah Apel 🍎", hint: "Buah apel segar." },
  "七": { pinyin: "qī", meaning: "Angka 7 (Tujuh)", hint: "Angka tujuh." },
  "前": { pinyin: "qián", meaning: "Depan / Sebelum", hint: "Arah bagian depan." },
  "钱": { pinyin: "qián", meaning: "Uang 💰", hint: "Alat pembayaran." },
  "千": { pinyin: "qiān", meaning: "Ribu / Seribu", hint: "Secara angka 1.000." },
  "起床": { pinyin: "qǐ chuáng", meaning: "Bangun Tidur ☀️", hint: "Mulai menyambut hari baru." },
  "请": { pinyin: "qǐng", meaning: "Silakan / Tolong", hint: "Kata sopan sebelum meminta sesuatu." },
  "请问": { pinyin: "qǐngwèn", meaning: "Permisi Numpang Tanya", hint: "Kalimat ramah saat mau bertanya." },
  "去": { pinyin: "qù", meaning: "Pergi", hint: "Misal: 去学校 (pergi ke sekolah)." },
  "去年": { pinyin: "qùnián", meaning: "Tahun Lalu", hint: "Tahun yang sudah lewat." },
  "热": { pinyin: "rè", meaning: "Panas ☀️", hint: "Suhu udara hangat/panas." },
  "人": { pinyin: "rén", meaning: "Orang 🚶", hint: "Manusia." },
  "认识": { pinyin: "rènshi", meaning: "Kenal / Mengenali", hint: "Misal: 很高兴认识你 (Senang kenal denganmu)." },
  "日": { pinyin: "rì", meaning: "Hari / Matahari / Tanggal", hint: "Unsur dasar kalender." },
  "三": { pinyin: "sān", meaning: "Angka 3 (Tiga)", hint: "Angka tiga." },
  "上": { pinyin: "shàng", meaning: "Atas / Naik / Mulai", hint: "Arah ke atas." },
  "上班": { pinyin: "shàng bān", meaning: "Berangkat Kerja 💼", hint: "Aktivitas mulai bekerja." },
  "商店": { pinyin: "shāngdiàn", meaning: "Toko / Warung 🏬", hint: "Tempat jual beli barang." },
  "上课": { pinyin: "shàng kè", meaning: "Masuk Kelas / Belajar", hint: "Mulai jam pelajaran." },
  "上午": { pinyin: "shàngwǔ", meaning: "Pagi Menjelang Siang", hint: "Waktu jam 9-11 pagi." },
  "上学": { pinyin: "shàng xué", meaning: "Pergi Sekolah 🎒", hint: "Berangkat belajar." },
  "少": { pinyin: "shǎo", meaning: "Sedikit", hint: "Lawan kata dari banyak (多)." },
  "谁": { pinyin: "shéi", meaning: "Siapa?", hint: "Pertanyaan identitas orang." },
  "生病": { pinyin: "shēng bìng", meaning: "Jatuh Sakit 🤒", hint: "Kondisi badan kurang sehat." },
  "什么": { pinyin: "shénme", meaning: "Apa?", hint: "Kata tanya benda paling populer!" },
  "十": { pinyin: "shí", meaning: "Angka 10 (Sepuluh)", hint: "Angka sepuluh." },
  "事": { pinyin: "shì", meaning: "Urusan / Hal / Masalah", hint: "Kejadian atau urusan." },
  "是": { pinyin: "shì", meaning: "Adalah / Iya / Benar", hint: "Kata penghubung identitas." },
  "时候": { pinyin: "shíhou", meaning: "Waktu / Saat", hint: "Misal: 什么时候 (Kapan?)." },
  "时间": { pinyin: "shíjiān", meaning: "Waktu / Durasi ⏰", hint: "Waktu yang berjalan." },
  "手机": { pinyin: "shǒujī", meaning: "HP / Smartphone 📱", hint: "Secara harfiah artinya 'Mesin Tangan'." },
  "书": { pinyin: "shū", meaning: "Buku 📚", hint: "Jendela ilmu pengetahuan." },
  "书店": { pinyin: "shūdiàn", meaning: "Toko Buku 📖", hint: "Tempat membeli buku seru." },
  "睡": { pinyin: "shuì", meaning: "Tidur 😴", hint: "Istirahat lelap." },
  "水": { pinyin: "shuǐ", meaning: "Air 💧", hint: "Air putih segar." },
  "水果": { pinyin: "shuǐguǒ", meaning: "Buah-buahan 🧺", hint: "Secara harfiah artinya 'Hasil Air'." },
  "睡觉": { pinyin: "shuì jiào", meaning: "Tidur 🛌", hint: "Pergi tidur di kasur." },
  "说": { pinyin: "shuō", meaning: "Bicara / Berkata", hint: "Mengeluarkan suara bicara." },
  "说话": { pinyin: "shuō huà", meaning: "Ngobrol / Berbicara", hint: "Percakapan ramah." },
  "四": { pinyin: "sì", meaning: "Angka 4 (Empat)", hint: "Angka empat." },
  "岁": { pinyin: "suì", meaning: "Tahun Umur", hint: "Penyebutan usia (misal: 20岁 = 20 tahun)." },
  "他": { pinyin: "tā", meaning: "Dia (Laki-laki)", hint: "Kata ganti orang ketiga pria." },
  "它": { pinyin: "tā", meaning: "Dia (Hewan / Benda)", hint: "Kata ganti benda atau hewan." },
  "她": { pinyin: "tā", meaning: "Dia (Perempuan)", hint: "Kata ganti orang ketiga wanita." },
  "太": { pinyin: "tài", meaning: "Terlalu / Sangat", hint: "Ungkapan kekaguman (misal: 太好了 = Bagus banget!)." },
  "他们": { pinyin: "tāmen", meaning: "Mereka (Pria / Campuran)", hint: "Kelompok orang." },
  "它们": { pinyin: "tāmen", meaning: "Mereka (Hewan / Benda)", hint: "Kelompok hewan/benda." },
  "她们": { pinyin: "tāmen", meaning: "Mereka (Semua Wanita)", hint: "Kelompok wanita." },
  "天": { pinyin: "tiān", meaning: "Langit / Hari 🌤️", hint: "Hari atau cuaca." },
  "天气": { pinyin: "tiānqì", meaning: "Cuaca 🌈", hint: "Keadaan udara hari ini." },
  "听": { pinyin: "tīng", meaning: "Mendengar 🎧", hint: "Mendengarkan suara atau musik." },
  "听见": { pinyin: "tīngjiàn", meaning: "Terdengar / Mendengar", hint: "Hasil pendengaran telinga." },
  "同学": { pinyin: "tóngxué", meaning: "Teman Sekelas 🏫", hint: "Kawan belajar bersama." },
  "外": { pinyin: "wài", meaning: "Luar", hint: "Bagian luar." },
  "外边": { pinyin: "wàibian", meaning: "Sebelah Luar", hint: "Area di bagian luar." },
  "玩": { pinyin: "wán", meaning: "Bermain / Santai 🎮", hint: "Main game atau liburan santai." },
  "晚": { pinyin: "wǎn", meaning: "Malam / Terlambat", hint: "Waktu malam hari." },
  "晚饭": { pinyin: "wǎnfàn", meaning: "Makan Malam 🍲", hint: "Santap malam bersama." },
  "晚上": { pinyin: "wǎnshang", meaning: "Malam Hari 🌙", hint: "Waktu santai di malam hari." },
  "喂": { pinyin: "wèi", meaning: "Halo (Di Telepon)", hint: "Sapaan khas saat mengangkat telepon." },
  "问": { pinyin: "wèn", meaning: "Bertanya ❓", hint: "Mengajukan pertanyaan." },
  "问题": { pinyin: "wèntí", meaning: "Pertanyaan / Masalah", hint: "Gak ada masalah = 没问题!" },
  "我": { pinyin: "wǒ", meaning: "Saya / Aku 🙋‍♂️", hint: "Kata ganti diri sendiri paling penting." },
  "我们": { pinyin: "wǒmen", meaning: "Kami / Kita", hint: "Kita bersama-sama belajar." },
  "五": { pinyin: "wǔ", meaning: "Angka 5 (Lima)", hint: "Angka lima." },
  "午饭": { pinyin: "wǔfàn", meaning: "Makan Siang 🍱", hint: "Istirahat santap siang." },
  "下": { pinyin: "xià", meaning: "Bawah / Turun / Selesai", hint: "Arah ke bawah." },
  "下雨": { pinyin: "xià yǔ", meaning: "Hujan Turun 🌧️", hint: "Suasana hujan." },
  "下班": { pinyin: "xià bān", meaning: "Pulang Kerja 🥳", hint: "Waktu bebas setelah bekerja." },
  "下课": { pinyin: "xià kè", meaning: "Selesai Kelas", hint: "Jam istirahat pelajaran." },
  "想": { pinyin: "xiǎng", meaning: "Ingin / Kangen / Berpikir 💭", hint: "Keinginan atau perasaan rindu." },
  "先生": { pinyin: "xiānsheng", meaning: "Tuan / Pak / Suami", hint: "Sebutan sopan untuk pria." },
  "现在": { pinyin: "xiànzài", meaning: "Sekarang ⏳", hint: "Momen saat ini juga." },
  "小": { pinyin: "xiǎo", meaning: "Kecil 🐥", hint: "Lawan kata dari besar (大)." },
  "小朋友": { pinyin: "xiǎopéngyou", meaning: "Anak Kecil / Adik Manis", hint: "Sapaan ramah untuk anak-anak." },
  "小时": { pinyin: "xiǎoshí", meaning: "Jam (Durasi)", hint: "Misal: 1 jam = 一个小时." },
  "小学": { pinyin: "xiǎoxué", meaning: "Sekolah Dasar (SD)", hint: "Tingkat sekolah awal." },
  "小学生": { pinyin: "xiǎoxuéshēng", meaning: "Murid SD", hint: "Siswa sekolah dasar." },
  "下午": { pinyin: "xiàwǔ", meaning: "Sore Hari ☕", hint: "Waktu jam 1-5 sore." },
  "写": { pinyin: "xiě", meaning: "Menulis ✍️", hint: "Mencoret catatan." },
  "些": { pinyin: "xiē", meaning: "Beberapa", hint: "Jumlah lebih dari satu." },
  "谢谢": { pinyin: "xièxie", meaning: "Terima Kasih 🙏", hint: "Ungkapan terima kasih." },
  "喜欢": { pinyin: "xǐhuan", meaning: "Suka / Menyukai 💖", hint: "Perasaan senang pada sesuatu." },
  "新": { pinyin: "xīn", meaning: "Baru ✨", hint: "Hal baru yang segar." },
  "星期": { pinyin: "xīngqī", meaning: "Minggu (Hari)", hint: "Urutan hari dalam seminggu." },
  "星期日": { pinyin: "xīngqīrì", meaning: "Hari Minggu ☀️", hint: "Hari libur santai." },
  "星期天": { pinyin: "xīngqītiān", meaning: "Hari Minggu 🌿", hint: "Hari akhir pekan." },
  "休息": { pinyin: "xiūxi", meaning: "Istirahat 🛋️", hint: "Istirahat sejenak melepaskan lelah." },
  "学": { pinyin: "xué", meaning: "Belajar 📖", hint: "Proses menambah ilmu." },
  "雪": { pinyin: "xuě", meaning: "Salju ❄️", hint: "Butiran es lembut dari langit." },
  "学生": { pinyin: "xuésheng", meaning: "Murid / Siswa 🎒", hint: "Orang yang sedang belajar." },
  "学习": { pinyin: "xuéxí", meaning: "Mempelajari / Belajar", hint: "Aktivitas belajar." },
  "学校": { pinyin: "xuéxiào", meaning: "Sekolah 🏫", hint: "Tempat menuntut ilmu." },
  "要": { pinyin: "yào", meaning: "Mau / Harus / Butuh", hint: "Menyatakan niat atau kebutuhan." },
  "也": { pinyin: "yě", meaning: "Juga", hint: "Saya juga = 我也是." },
  "一": { pinyin: "yī", meaning: "Angka 1 (Satu)", hint: "Angka pertama." },
  "一半": { pinyin: "yíbàn", meaning: "Separuh / Setengah", hint: "Pembagian dua sama rata." },
  "一点儿": { pinyin: "yìdiǎnr", meaning: "Sedikit 🤏", hint: "Jumlah yang tidak banyak." },
  "衣服": { pinyin: "yīfu", meaning: "Pakaian / Baju 👕", hint: "Busana sehari-hari." },
  "医生": { pinyin: "yīshēng", meaning: "Dokter 🩺", hint: "Penyembuh orang sakit." },
  "一下": { pinyin: "yíxià", meaning: "Sebentar / Sejenak", hint: "Waktu yang sangat singkat." },
  "一些": { pinyin: "yìxiē", meaning: "Beberapa", hint: "Sejumlah benda." },
  "医院": { pinyin: "yīyuàn", meaning: "Rumah Sakit 🏥", hint: "Tempat pengobatan." },
  "椅子": { pinyin: "yǐzi", meaning: "Kursi 🪑", hint: "Tempat duduk." },
  "有": { pinyin: "yǒu", meaning: "Punya / Ada", hint: "Menyatakan kepemilikan." },
  "有的": { pinyin: "yǒude", meaning: "Ada Yang / Beberapa", hint: "Sebagian dari kelompok." },
  "有些": { pinyin: "yǒuxiē", meaning: "Beberapa", hint: "Sejumlah tertentu." },
  "雨": { pinyin: "yǔ", meaning: "Hujan 🌧️", hint: "Tetesan air dari langit." },
  "元": { pinyin: "yuán", meaning: "Mata Uang Yuan (RMB)", hint: "Satuan mata uang Tiongkok." },
  "月": { pinyin: "yuè", meaning: "Bulan (Kalender / Langit) 🌙", hint: "Bulan di langit atau penanggalan." },
  "再": { pinyin: "zài", meaning: "Lagi / Nanti", hint: "Melakukan kembali di masa depan." },
  "在": { pinyin: "zài", meaning: "Di / Sedang (Melakukan)", hint: "Lokasi atau tindakan yang sedang berlangsung." },
  "再见": { pinyin: "zàijiàn", meaning: "Sampai Jumpa Lagi 👋", hint: "Secara harfiah artinya 'Bertemu Lagi'." },
  "早": { pinyin: "zǎo", meaning: "Pagi / Selamat Pagi 🌅", hint: "Sapaan ramah di pagi hari." },
  "早饭": { pinyin: "zǎofàn", meaning: "Sarapan 🥐", hint: "Santap makanan di pagi hari." },
  "早上": { pinyin: "zǎoshang", meaning: "Pagi Hari ☀️", hint: "Waktu pagi menyegarkan." },
  "怎么": { pinyin: "zěnme", meaning: "Bagaimana? / Kenapa?", hint: "Menanyakan cara atau alasan." },
  "怎么样": { pinyin: "zěnmeyàng", meaning: "Bagaimana Menurutmu?", hint: "Menanyakan pendapat." },
  "找": { pinyin: "zhǎo", meaning: "Mencari 🔍", hint: "Misal: 找钱 (mencari uang kembalian)." },
  "这": { pinyin: "zhè", meaning: "Ini", hint: "Menunjuk benda di dekat kita." },
  "这边": { pinyin: "zhèbiān", meaning: "Sebelah Sini", hint: "Arah dekat kita." },
  "这个": { pinyin: "zhège", meaning: "Yang Ini", hint: "Benda dekat ini." },
  "这里": { pinyin: "zhèlǐ", meaning: "Di Sini", hint: "Lokasi kita berada saat ini." },
  "真": { pinyin: "zhēn", meaning: "Sungguh / Benar-benar", hint: "Misal: 真好 (Sungguh bagus!)." },
  "正在": { pinyin: "zhèngzài", meaning: "Sedang (Berlangsung)", hint: "Proses yang sedang terjadi." },
  "这儿": { pinyin: "zhèr", meaning: "Di Sini", hint: "Gaya bicara untuk 'di sini'." },
  "这些": { pinyin: "zhèxiē", meaning: "Ini Semua", hint: "Kumpulan benda di sini." },
  "只": { pinyin: "zhī", meaning: "Hanya / Kata Penggolong Hewan", hint: "Misal: 一只猫 (seekor kucing)." },
  "知道": { pinyin: "zhīdào", meaning: "Tahu / Paham 💡", hint: "Tahu atau mengerti informasi." },
  "中国": { pinyin: "zhōngguó", meaning: "Tiongkok / Cina 🇨🇳", hint: "Negara asal bahasa Mandarin." },
  "中文": { pinyin: "zhōngwén", meaning: "Bahasa Mandarin 🈴", hint: "Bahasa dan tulisan Tionghoa." },
  "中午": { pinyin: "zhōngwǔ", meaning: "Siang Hari (12.00) ☀️", hint: "Waktu tepat tengah hari." },
  "中学": { pinyin: "zhōngxué", meaning: "Sekolah Menengah (SMP/SMA)", hint: "Tingkat sekolah menengah." },
  "中学生": { pinyin: "zhōngxuéshēng", meaning: "Siswa SMP / SMA", hint: "Pelajar sekolah menengah." },
  "住": { pinyin: "zhù", meaning: "Tinggal / Bermalam 🛋️", hint: "Menetap di suatu tempat." },
  "桌子": { pinyin: "zhuōzi", meaning: "Meja 🪑", hint: "Mebel meja." },
  "字": { pinyin: "zì", meaning: "Karakter / Tulisan ✍️", hint: "Huruf tulisan." },
  "坐": { pinyin: "zuò", meaning: "Duduk / Naik Kendaraan 🪑", hint: "Misal: 坐车 (naik mobil)." },
  "做": { pinyin: "zuò", meaning: "Membuat / Melakukan", hint: "Bekerja atau membuat karya." },
  "做饭": { pinyin: "zuò fàn", meaning: "Memasak 🍳", hint: "Menyiapkan masakan lezat." },
  "昨天": { pinyin: "zuótiān", meaning: "Kemarin 🕒", hint: "Hari sebelum hari ini." }
};

// App State
let vocabularyList = [];
let currentIndex = 0;
let currentWord = null;
let sessionCount = 1;
let favorites = JSON.parse(localStorage.getItem('hsk_favs') || localStorage.getItem('mandarin_chill_favs') || '[]');

// Hanzi Writer State
let hanziWriters = []; // Array of writer instances for multi-character support
let writerQuizActive = false;

// Feature 1: TTS Utterance global reference (prevents Android GC from killing the utterance)
window.currentUtterance = null;

// Feature 2: Silence Timer for Auto-Stop Mic
let silenceTimer = null;
const SILENCE_TIMEOUT_MS = 5500; // 5.5 seconds of silence before auto-stop

// Tab Navigation & Writing Mode State
let currentGridWord = null;
let currentGridChar = '';
let mizigeCanvas = null;
let mizigeCtx = null;
let isDrawingGrid = false;
let lastGridX = 0;
let lastGridY = 0;

// DOM Element References
const loaderEl = document.getElementById('loading-state');
const errorEl = document.getElementById('error-state');
const cardEl = document.getElementById('flashcard');

const tabVocabBtn = document.getElementById('tab-vocab-btn');
const tabWritingBtn = document.getElementById('tab-writing-btn');
const vocabView = document.getElementById('vocab-view');
const writingView = document.getElementById('writing-view');

const writingTargetChar = document.getElementById('writing-target-char');
const writingTargetPinyin = document.getElementById('writing-target-pinyin');
const writingTargetMeaning = document.getElementById('writing-target-meaning');
const writingAudioBtn = document.getElementById('writing-audio-btn');
const clearGridCanvasBtn = document.getElementById('clear-grid-canvas-btn');
const nextGridCharBtn = document.getElementById('next-grid-char-btn');
const mizigeScrollContainer = document.getElementById('grid-canvas-scroll-container');

const pinyinEl = document.getElementById('card-pinyin');
const meaningEl = document.getElementById('card-meaning');
const hintEl = document.getElementById('card-hint');
const hanziEl = document.getElementById('card-hanzi');
const hanziBoxEl = document.getElementById('hanzi-box');
const meaningDisplayContainer = document.getElementById('meaning-display-container');

const nextBtn = document.getElementById('next-word-btn');
const audioSpeechBtn = document.getElementById('audio-speech-btn');
const favToggleBtn = document.getElementById('fav-toggle-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const animateHanziBtn = document.getElementById('animate-hanzi-btn');
const resetTracingBtn = document.getElementById('reset-tracing-btn');

const favTriggerBtn = document.getElementById('favorites-trigger');
const favCountBadge = document.getElementById('fav-count-badge');
const favModal = document.getElementById('fav-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const favListEl = document.getElementById('fav-list');
const emptyFavMsg = document.getElementById('empty-fav-msg');

const historyTriggerBtn = document.getElementById('history-trigger');
const historyModal = document.getElementById('history-modal');
const closeHistoryModalBtn = document.getElementById('close-history-modal-btn');

const sessionCountEl = document.getElementById('session-count');
const streakCountEl = document.getElementById('streak-count');
const retryBtn = document.getElementById('retry-btn');

const voiceRecBtn = document.getElementById('voice-rec-btn');
const voiceBtnIcon = document.getElementById('voice-btn-icon');
const voiceBtnLabel = document.getElementById('voice-btn-label');
const speechFeedbackBox = document.getElementById('speech-feedback-box');
const speechFeedbackIcon = document.getElementById('speech-feedback-icon');
const speechFeedbackText = document.getElementById('speech-feedback-text');

const toggleMeaningBtn = document.getElementById('toggle-meaning-btn');
const toggleHanziBtn = document.getElementById('toggle-hanzi-btn');

// Obscure / Blur all answers on current card
function obscureAll() {
  if (meaningEl) meaningEl.classList.add('obscured');
  if (hintEl) hintEl.classList.add('obscured');
  if (hanziEl) hanziEl.classList.add('obscured');
}

// Pure Individual Toggle Functions
function toggleMeaningObscured() {
  if (meaningEl) meaningEl.classList.toggle('obscured');
  if (hintEl) hintEl.classList.toggle('obscured');
}

function toggleHanziObscured() {
  if (hanziEl) hanziEl.classList.toggle('obscured');
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateDayStreak();
  updateFavBadge();
  loadVocabularyData();
  setupEventListeners();
});

// Load Vocabulary Data using Javascript fetch()
async function loadVocabularyData() {
  showState('loading');
  
  try {
    const response = await fetch(HSK1_WORDS_URL);
    if (!response.ok) throw new Error("Gagal mengambil data dari server");
    
    const textData = await response.text();
    parseAndBuildVocabulary(textData);
  } catch (err) {
    console.warn("Fetch failed, falling back to embedded dictionary:", err);
    buildVocabularyFromDictionary();
  }
}

// Parse Raw Text from Fetch
function parseAndBuildVocabulary(rawText) {
  const lines = rawText.split('\n');
  const parsedWords = [];

  lines.forEach(line => {
    let cleanLine = line.trim();
    if (!cleanLine || cleanLine.startsWith('Source') || cleanLine.startsWith('---')) return;
    
    // Clean numbers at the end of Hanzi (e.g. 本1 -> 本)
    let cleanedHanzi = cleanLine.replace(/[0-9]/g, '').trim();
    
    if (HSK_DICTIONARY[cleanedHanzi]) {
      parsedWords.push({
        hanzi: cleanedHanzi,
        pinyin: HSK_DICTIONARY[cleanedHanzi].pinyin,
        meaning: HSK_DICTIONARY[cleanedHanzi].meaning,
        hint: HSK_DICTIONARY[cleanedHanzi].hint
      });
    } else if (cleanedHanzi.length > 0) {
      parsedWords.push({
        hanzi: cleanedHanzi,
        pinyin: cleanedHanzi,
        meaning: "Kosakata HSK 1",
        hint: "Kosakata dasar Mandarin sehari-hari."
      });
    }
  });

  if (parsedWords.length > 0) {
    vocabularyList = shuffleArray(parsedWords);
    showState('card');
    displayCurrentWord();
    if (!currentGridChar) pickRandomGridChar();
  } else {
    buildVocabularyFromDictionary();
  }
}

// Build Vocabulary directly from Dictionary Map
function buildVocabularyFromDictionary() {
  const list = Object.keys(HSK_DICTIONARY).map(hanzi => ({
    hanzi: hanzi,
    pinyin: HSK_DICTIONARY[hanzi].pinyin,
    meaning: HSK_DICTIONARY[hanzi].meaning,
    hint: HSK_DICTIONARY[hanzi].hint
  }));
  
  vocabularyList = shuffleArray(list);
  showState('card');
  displayCurrentWord();
  if (!currentGridChar) pickRandomGridChar();
}

// Display Current Micro-Dosing Flashcard
function displayCurrentWord() {
  if (vocabularyList.length === 0) return;

  currentWord = vocabularyList[currentIndex];

  // Update DOM with smooth transitions
  if (cardEl) {
    cardEl.classList.remove('slide-next');
    void cardEl.offsetWidth; // Trigger reflow
    cardEl.classList.add('slide-next');
  }

  if (pinyinEl) pinyinEl.textContent = currentWord.pinyin;
  if (meaningEl) meaningEl.textContent = currentWord.meaning;
  if (hintEl) hintEl.textContent = currentWord.hint || "Satu kata per waktu ☕";
  if (hanziEl) hanziEl.textContent = currentWord.hanzi;

  // Always reset answers to blurred by default for the new card
  obscureAll();

  // Update Hanzi Writer tracing board with new character
  updateHanziWriter(currentWord.hanzi);

  // Hide Speech Feedback Box for new word
  hideSpeechFeedback();

  // Check Favorite State
  updateFavHeartState();
}

// Next Word Action
function handleNextWord() {
  currentIndex = (currentIndex + 1) % vocabularyList.length;
  sessionCount++;
  if (sessionCountEl) {
    sessionCountEl.textContent = `Kata ke-${sessionCount} hari ini`;
  }
  // Feature 3: Tambah +1 kata ke riwayat harian saat klik Next
  recordDailyWord();
  displayCurrentWord();
}

// Day Streak Tracker Logic (localStorage based)
function updateDayStreak() {
  const today = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD
  const lastDate = localStorage.getItem('hsk_last_visit_date');
  let streak = parseInt(localStorage.getItem('hsk_day_streak') || '0', 10);

  if (!lastDate) {
    // First time visitor
    streak = 1;
    localStorage.setItem('hsk_day_streak', '1');
    localStorage.setItem('hsk_last_visit_date', today);
  } else if (lastDate === today) {
    // Already opened today -> keep current streak
    if (streak === 0) streak = 1;
  } else {
    // Check difference in days
    const last = new Date(lastDate);
    const now = new Date(today);
    const diffTime = Math.abs(now - last);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Opened consecutive day!
      streak += 1;
    } else {
      // Missed one or more days -> reset streak to 1
      streak = 1;
    }
    localStorage.setItem('hsk_day_streak', streak.toString());
    localStorage.setItem('hsk_last_visit_date', today);
  }

  if (streakCountEl) {
    streakCountEl.textContent = streak;
  }
}

// ─── Feature 3: Daily History (Riwayat Belajar Harian) ───────────────────────

/**
 * Tambahkan +1 kata ke riwayat harian di localStorage.
 * Dipanggil setiap kali user maju ke kata berikutnya atau berhasil menebak.
 */
function recordDailyWord() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  let history = JSON.parse(localStorage.getItem('dailyHistory') || '{}');
  history[today] = (history[today] || 0) + 1;
  localStorage.setItem('dailyHistory', JSON.stringify(history));
}

/**
 * Ambil riwayat 7 hari terakhir, diurutkan dari hari terbaru.
 * Mengembalikan array of { date, count } objects.
 */
function getDailyHistory() {
  const history = JSON.parse(localStorage.getItem('dailyHistory') || '{}');
  const result = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateKey = d.toISOString().slice(0, 10);
    result.push({ date: dateKey, count: history[dateKey] || 0 });
  }
  return result;
}

/**
 * Format tanggal YYYY-MM-DD ke format "1 Sept" / "31 Ags" (Bahasa Indonesia).
 */
function formatDateID(dateStr) {
  const monthNames = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sept','Okt','Nov','Des'];
  const d = new Date(dateStr + 'T00:00:00');
  return `${d.getDate()} ${monthNames[d.getMonth()]}`;
}

/**
 * Render isi modal riwayat belajar harian.
 */
function renderHistoryModal() {
  const historyListEl = document.getElementById('history-list');
  if (!historyListEl) return;

  const historyData = getDailyHistory();
  historyListEl.innerHTML = '';

  historyData.forEach(item => {
    const li = document.createElement('li');
    li.className = 'history-item';
    const isToday = item.date === new Date().toISOString().slice(0, 10);
    li.innerHTML = `
      <span class="history-date">${formatDateID(item.date)}${isToday ? ' <span class="today-badge">Hari ini</span>' : ''}</span>
      <span class="history-count">${item.count > 0 ? `<strong>${item.count}</strong> kata` : '<span class="zero-count">—</span>'}</span>
    `;
    historyListEl.appendChild(li);
  });
}

// Theme (Dark Mode) Management
function initTheme() {
  const savedTheme = localStorage.getItem('hsk_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    updateThemeIcon(true);
  } else {
    document.body.classList.remove('dark-mode');
    updateThemeIcon(false);
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('hsk_theme', isDark ? 'dark' : 'light');
  updateThemeIcon(isDark);
  // Re-render Hanzi Writer SVG colors to match the new theme
  if (hanziWriters.length > 0 && currentWord) {
    updateHanziWriter(currentWord.hanzi);
  }
}

function updateThemeIcon(isDark) {
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = isDark ? '☀️' : '🌙';
  }
}

// ─── Hanzi Writer Integration (Multi-Character Support) ──────────────────────

/**
 * Returns theme-aware colors for HanziWriter based on current dark/light mode.
 */
function getWriterColors() {
  const isDark = document.body.classList.contains('dark-mode');
  return {
    strokeColor:    isDark ? '#edf5f4' : '#2b3a42',
    outlineColor:   isDark ? 'rgba(237,245,244,0.18)' : 'rgba(43,58,66,0.12)',
    highlightColor: isDark ? '#76dbca' : '#5b9286',
    radicalColor:   isDark ? '#76dbca' : '#5b9286',
  };
}

/**
 * Extract ALL CJK characters from a multi-character word string.
 * Returns an array (empty if none found, e.g. pinyin-only fallback).
 */
function extractAllHanzi(hanziWord) {
  const matches = hanziWord.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g);
  return matches || [];
}

/**
 * Start quiz mode on a single HanziWriter instance.
 */
function startSingleWriterQuiz(writer) {
  try {
    writer.quiz({
      onMistake: () => setTracingFeedback('mistake'),
      onCorrectStroke: () => setTracingFeedback('correct-stroke'),
      onComplete: () => {
        setTracingFeedback('complete');
        // Feature 3: Tambah +1 kata saat berhasil menyelesaikan goresan kanvas
        recordDailyWord();
      },
    });
  } catch (err) {
    console.warn('[HanziWriter] quiz() failed:', err);
  }
}

/**
 * Initialize HanziWriter for ALL CJK characters in a word.
 * Dynamically creates individual wrapper <div> for each character,
 * appended into #character-target-div (which is a flex row).
 */
function initHanziWriter(hanziWord) {
  const targetDiv = document.getElementById('character-target-div');
  if (!targetDiv) return;

  // Clear previous writers and DOM children
  hanziWriters = [];
  targetDiv.innerHTML = '';

  const chars = extractAllHanzi(hanziWord);
  if (chars.length === 0) return;

  const colors = getWriterColors();
  const size = 180;

  chars.forEach((char, idx) => {
    const wrapperId = `hanzi-char-${idx}`;
    const wrapper = document.createElement('div');
    wrapper.id = wrapperId;
    wrapper.className = 'hanzi-char-wrapper';
    targetDiv.appendChild(wrapper);

    try {
      const writer = HanziWriter.create(wrapperId, char, {
        width: size,
        height: size,
        padding: 10,
        showOutline: true,
        showCharacter: false,       // User must draw the character
        strokeColor:    colors.strokeColor,
        outlineColor:   colors.outlineColor,
        highlightColor: colors.highlightColor,
        radicalColor:   colors.radicalColor,
        drawingWidth: 24,           // Chunky stroke for touch
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 200,
        onLoadCharDataSuccess: () => {
          startSingleWriterQuiz(writer);
        },
        onLoadCharDataError: () => {
          setTracingFeedback('loading-error');
        }
      });
      hanziWriters.push(writer);
    } catch (err) {
      console.warn('[HanziWriter] Could not create writer for char:', char, err);
    }
  });
}

/**
 * Update the writer display for a new word.
 * Always fully re-initializes to support multi-character words correctly.
 */
function updateHanziWriter(hanziWord) {
  setTracingFeedback('idle');

  const chars = extractAllHanzi(hanziWord);

  if (chars.length === 0) {
    // No CJK character available (e.g. pinyin-only entry) → hide board
    const board = document.getElementById('writing-board-card');
    if (board) board.style.display = 'none';
    return;
  }

  // Ensure the board is visible
  const board = document.getElementById('writing-board-card');
  if (board) board.style.display = '';

  initHanziWriter(hanziWord);
}

/**
 * Start (or restart) quiz mode on ALL current character writers.
 */
function startWriterQuiz() {
  if (hanziWriters.length === 0) return;
  setTracingFeedback('idle');
  hanziWriters.forEach(writer => startSingleWriterQuiz(writer));
}

/**
 * Animate all character strokes as a demonstration, then restart quiz.
 */
function animateWriterCharacter() {
  if (hanziWriters.length === 0) return;
  setTracingFeedback('idle');

  let completedCount = 0;
  hanziWriters.forEach(writer => {
    writer.animateCharacter({
      onComplete: () => {
        completedCount++;
        // Only restart quiz after ALL characters finish animating
        if (completedCount === hanziWriters.length) {
          setTimeout(() => startWriterQuiz(), 800);
        }
      }
    });
  });
}

/**
 * Reset (cancel) all quizzes and restart them from stroke 0.
 */
function resetWriterQuiz() {
  if (hanziWriters.length === 0) return;
  hanziWriters.forEach(writer => {
    try {
      writer.cancelQuiz();
      writer.hideCharacter();
    } catch (err) {
      // Ignore if writer isn't in a quizzable state
    }
  });
  startWriterQuiz();
  showToast('🔄 Latihan dimulai ulang dari awal!');
}

/**
 * Update the tracing feedback text/state below the writer box.
 */
function setTracingFeedback(state) {
  const feedbackEl = document.getElementById('tracing-feedback');
  const iconEl = document.getElementById('tracing-feedback-icon');
  const textEl = document.getElementById('tracing-feedback-text');
  if (!feedbackEl || !iconEl || !textEl) return;

  feedbackEl.classList.remove('completed');

  switch (state) {
    case 'idle':
      iconEl.textContent = '🌱';
      textEl.textContent = 'Tebalkan bayangan goresan dengan jari / kursor';
      break;
    case 'correct-stroke':
      iconEl.textContent = '✅';
      textEl.textContent = 'Bagus! Lanjutkan goresan berikutnya~';
      break;
    case 'mistake':
      iconEl.textContent = '💡';
      textEl.textContent = 'Hampir tepat! Coba ikuti arah bayangannya perlahan';
      break;
    case 'complete':
      feedbackEl.classList.add('completed');
      iconEl.textContent = '✨';
      textEl.textContent = 'Goresan Sempurna! Kamu keren banget! ✨';
      break;
    case 'loading-error':
      iconEl.textContent = '🌿';
      textEl.textContent = 'Karakter ini belum tersedia. Coba kata lain!';
      break;
    default:
      iconEl.textContent = '🌱';
      textEl.textContent = 'Tebalkan bayangan goresan dengan jari / kursor';
  }
}

// ─── Mode Menulis Hanzi (10x12 Mi Zi Ge Canvas) ──────────────────────────────

/**
 * Tab switcher between Vocabulary mode and 10x12 Writing Practice mode.
 */
function switchTab(tabName) {
  if (tabName === 'vocab') {
    if (tabVocabBtn) {
      tabVocabBtn.classList.add('active');
      tabVocabBtn.setAttribute('aria-selected', 'true');
    }
    if (tabWritingBtn) {
      tabWritingBtn.classList.remove('active');
      tabWritingBtn.setAttribute('aria-selected', 'false');
    }
    if (vocabView) vocabView.classList.remove('hidden');
    if (writingView) writingView.classList.add('hidden');
  } else if (tabName === 'writing') {
    if (tabWritingBtn) {
      tabWritingBtn.classList.add('active');
      tabWritingBtn.setAttribute('aria-selected', 'true');
    }
    if (tabVocabBtn) {
      tabVocabBtn.classList.remove('active');
      tabVocabBtn.setAttribute('aria-selected', 'false');
    }
    if (writingView) writingView.classList.remove('hidden');
    if (vocabView) vocabView.classList.add('hidden');

    // Initialize grid canvas & load character if not ready
    if (!mizigeCtx) {
      initGridCanvas();
    }
    if (!currentGridChar) {
      pickRandomGridChar();
    }
  }
}

/**
 * Pick a random HSK 1 character for 10x12 practice.
 * If word contains multiple characters, takes index 0 only as requested.
 */
function pickRandomGridChar() {
  if (!vocabularyList || vocabularyList.length === 0) {
    buildVocabularyFromDictionary();
  }

  const randomIndex = Math.floor(Math.random() * vocabularyList.length);
  currentGridWord = vocabularyList[randomIndex];

  // Extract CJK characters and pick index 0
  const chars = extractAllHanzi(currentGridWord.hanzi);
  currentGridChar = chars.length > 0 ? chars[0] : currentGridWord.hanzi.charAt(0);

  displayGridTargetChar();
}

/**
 * Display the selected character, pinyin, and meaning in the hero card.
 */
function displayGridTargetChar() {
  if (!currentGridWord) return;
  if (writingTargetChar) writingTargetChar.textContent = currentGridChar;
  if (writingTargetPinyin) writingTargetPinyin.textContent = currentGridWord.pinyin;
  if (writingTargetMeaning) writingTargetMeaning.textContent = currentGridWord.meaning;
}

/**
 * Get dynamic ink stroke color based on current dark/light mode.
 */
function getInkColor() {
  const isDark = document.body.classList.contains('dark-mode');
  return isDark ? '#edf5f4' : '#1e293b';
}

/**
 * Precise canvas coordinate calculation considering container scroll offsets.
 */
function getCanvasCoords(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  let clientX, clientY;
  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if (e.changedTouches && e.changedTouches.length > 0) {
    clientX = e.changedTouches[0].clientX;
    clientY = e.changedTouches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY
  };
}

/**
 * Initialize 10x12 Mi Zi Ge Drawing Canvas with touch & mouse support.
 */
function initGridCanvas() {
  mizigeCanvas = document.getElementById('mizige-canvas');
  if (!mizigeCanvas) return;

  mizigeCtx = mizigeCanvas.getContext('2d');

  // Mouse Events
  mizigeCanvas.addEventListener('mousedown', (e) => {
    isDrawingGrid = true;
    const coords = getCanvasCoords(e, mizigeCanvas);
    lastGridX = coords.x;
    lastGridY = coords.y;

    mizigeCtx.beginPath();
    mizigeCtx.arc(coords.x, coords.y, 1.5, 0, Math.PI * 2);
    mizigeCtx.fillStyle = getInkColor();
    mizigeCtx.fill();
  });

  mizigeCanvas.addEventListener('mousemove', (e) => {
    if (!isDrawingGrid) return;
    const coords = getCanvasCoords(e, mizigeCanvas);

    mizigeCtx.beginPath();
    mizigeCtx.moveTo(lastGridX, lastGridY);
    mizigeCtx.lineTo(coords.x, coords.y);
    mizigeCtx.strokeStyle = getInkColor();
    mizigeCtx.lineWidth = 3;
    mizigeCtx.lineCap = 'round';
    mizigeCtx.lineJoin = 'round';
    mizigeCtx.stroke();

    lastGridX = coords.x;
    lastGridY = coords.y;
  });

  mizigeCanvas.addEventListener('mouseup', () => { isDrawingGrid = false; });
  mizigeCanvas.addEventListener('mouseleave', () => { isDrawingGrid = false; });

  // Touch Events (Prevent scroll during active draw on canvas)
  mizigeCanvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawingGrid = true;
    const coords = getCanvasCoords(e, mizigeCanvas);
    lastGridX = coords.x;
    lastGridY = coords.y;

    mizigeCtx.beginPath();
    mizigeCtx.arc(coords.x, coords.y, 1.5, 0, Math.PI * 2);
    mizigeCtx.fillStyle = getInkColor();
    mizigeCtx.fill();
  }, { passive: false });

  mizigeCanvas.addEventListener('touchmove', (e) => {
    if (!isDrawingGrid) return;
    e.preventDefault();
    const coords = getCanvasCoords(e, mizigeCanvas);

    mizigeCtx.beginPath();
    mizigeCtx.moveTo(lastGridX, lastGridY);
    mizigeCtx.lineTo(coords.x, coords.y);
    mizigeCtx.strokeStyle = getInkColor();
    mizigeCtx.lineWidth = 3;
    mizigeCtx.lineCap = 'round';
    mizigeCtx.lineJoin = 'round';
    mizigeCtx.stroke();

    lastGridX = coords.x;
    lastGridY = coords.y;
  }, { passive: false });

  mizigeCanvas.addEventListener('touchend', () => { isDrawingGrid = false; });
  mizigeCanvas.addEventListener('touchcancel', () => { isDrawingGrid = false; });
}

/**
 * Clear canvas strokes without erasing the SVG CSS background grid.
 */
function clearGridCanvas() {
  if (!mizigeCanvas || !mizigeCtx) return;
  mizigeCtx.clearRect(0, 0, mizigeCanvas.width, mizigeCanvas.height);
  showToast('🗑️ Kanvas telah dibersihkan');
}

/**
 * Complete current writing practice:
 * a. Clear canvas strokes
 * b. Pick and display a new random character
 * c. Record +1 into dailyHistory
 */
function completeAndNextGridChar() {
  if (mizigeCanvas && mizigeCtx) {
    mizigeCtx.clearRect(0, 0, mizigeCanvas.width, mizigeCanvas.height);
  }
  pickRandomGridChar();
  recordDailyWord();
  sessionCount++;
  if (sessionCountEl) {
    sessionCountEl.textContent = `Kata ke-${sessionCount} hari ini`;
  }
  showToast('✨ Selesai! Karakter baru siap ditulis (+1 riwayat)');
}

// ─────────────────────────────────────────────────────────────────────────────


// Speech Synthesis (Chinese Pronunciation Audio)
function playSpeechPronunciation(textToSpeak) {
  if (!('speechSynthesis' in window)) {
    showToast("Fitur audio tidak didukung di browser ini.");
    return;
  }

  // Feature 1 Fix: WAJIB cancel() SEBELUM speak() untuk membersihkan antrean macet
  window.speechSynthesis.cancel();

  const text = textToSpeak || currentWord.hanzi || currentWord.pinyin;
  // Feature 1 Fix: Simpan ke window.currentUtterance agar tidak di-GC oleh Android
  window.currentUtterance = new SpeechSynthesisUtterance(text);
  window.currentUtterance.lang = 'zh-CN'; // Mandarin
  window.currentUtterance.rate = 0.75; // Slower/relaxed rate
  window.currentUtterance.pitch = 0.85; // Softer pitch

  if (audioSpeechBtn) audioSpeechBtn.classList.add('playing');
  window.currentUtterance.onend = () => { if (audioSpeechBtn) audioSpeechBtn.classList.remove('playing'); };
  window.currentUtterance.onerror = () => { if (audioSpeechBtn) audioSpeechBtn.classList.remove('playing'); };

  window.speechSynthesis.speak(window.currentUtterance);
}

// Speech Recognition & Evaluation
let recognition = null;
let isListening = false;

/**
 * Resets the voice button to its idle state.
 * Called from onresult, onerror, and onend to ensure button never gets stuck.
 */
function resetVoiceButton() {
  isListening = false;
  if (voiceRecBtn) {
    voiceRecBtn.classList.remove('listening', 'recording');
    if (voiceBtnIcon) voiceBtnIcon.textContent = '🎙️';
    if (voiceBtnLabel) voiceBtnLabel.textContent = 'Coba Ucapkan';
  }
}

// Feature 2: Reset silence auto-stop timer
function resetSilenceTimer() {
  clearTimeout(silenceTimer);
  silenceTimer = setTimeout(() => {
    if (recognition && isListening) {
      console.log('[Mic] Auto-stop: diam terlalu lama.');
      recognition.stop();
    }
  }, SILENCE_TIMEOUT_MS);
}

function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const rec = new SpeechRecognition();
  rec.lang = 'zh-CN';
  rec.continuous = false;      // Capture one utterance then stop
  rec.interimResults = true;   // Feature 1 Fix: true untuk responsivitas lebih baik di Android
  rec.maxAlternatives = 3;

  rec.onstart = () => {
    isListening = true;
    resetSilenceTimer(); // Feature 2: Mulai timer saat mic aktif
    if (voiceRecBtn) {
      // Prominent red + blinking indicator so user clearly knows it's recording
      voiceRecBtn.classList.add('listening', 'recording');
      if (voiceBtnIcon) voiceBtnIcon.textContent = '🔴';
      // Feature 2: Tampilkan hint auto-stop
      if (voiceBtnLabel) voiceBtnLabel.textContent = 'Mendengarkan... (auto-stop jika diam 5 detik)';
    }
    hideSpeechFeedback();
  };

  rec.onsoundstart = () => {
    resetSilenceTimer(); // Feature 2: Reset timer saat suara terdeteksi
  };

  rec.onresult = (event) => {
    resetSilenceTimer(); // Feature 2: Reset timer saat ada hasil suara

    // Cari hasil final (interimResults=true, jadi perlu cek isFinal)
    let finalTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      }
    }

    // Hanya evaluasi jika sudah ada hasil final
    if (finalTranscript.trim()) {
      // Reset button immediately so user can try again
      resetVoiceButton();
      clearTimeout(silenceTimer); // Bersihkan timer karena sudah ada hasil
      evaluatePronunciation(finalTranscript.trim());
    }
  };

  rec.onerror = (event) => {
    // Feature 2: Bersihkan timer agar tidak ada kebocoran memori
    clearTimeout(silenceTimer);
    // Always reset button first to prevent it from getting stuck
    resetVoiceButton();

    if (event.error === 'no-speech') {
      showSpeechFeedback(false, "Suara tidak terdengar. Coba dekatkan mikrofon dan ucapkan lebih jelas ya 🎧");
    } else if (event.error === 'not-allowed' || event.error === 'permission-denied') {
      showToast("⛔ Izin mikrofon diperlukan. Aktifkan di pengaturan browser!");
    } else if (event.error === 'network') {
      showToast("🌐 Koneksi bermasalah. Cek internet dan coba lagi.");
    } else {
      showSpeechFeedback(false, `Terjadi masalah (${event.error}). Coba ucapkan ulang perlahan 🎧`);
    }
  };

  rec.onend = () => {
    // Feature 2: Bersihkan timer agar tidak ada kebocoran memori
    clearTimeout(silenceTimer);
    // onend always fires last (after onresult/onerror).
    // Always reset button so user can always press again.
    resetVoiceButton();
  };

  return rec;
}

function handleVoiceRecognitionToggle() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast("Browser ini belum mendukung pengenalan suara. Coba gunakan Google Chrome/Edge! 🍵");
    return;
  }

  if (isListening && recognition) {
    // User clicked again while recording → stop it
    clearTimeout(silenceTimer); // Feature 2: Bersihkan timer saat user stop manual
    recognition.stop();
    return;
  }

  // Feature 1 Fix: Cancel TTS dulu sebelum mic aktif untuk cegah Audio Focus conflict
  window.speechSynthesis.cancel();

  // Always create a fresh recognition instance to avoid
  // "already started" InvalidStateError across multiple uses
  recognition = initSpeechRecognition();
  if (!recognition) return;

  // Feature 1 Fix: Bungkus recognition.start() dengan try/catch agar tidak crash
  try {
    recognition.start();
  } catch (err) {
    console.warn("Speech recognition start error:", err);
    // Feature 1 Fix: Reset UI tombol mic jika masuk ke catch
    resetVoiceButton();
    clearTimeout(silenceTimer);
    showToast("Gagal memulai mikrofon. Coba lagi 🎤");
  }
}

function evaluatePronunciation(transcript) {
  if (!currentWord) return;

  const targetHanzi = (currentWord.hanzi || '').trim();
  const targetPinyinClean = (currentWord.pinyin || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
  const transcriptClean = transcript.trim().toLowerCase();
  const transcriptAlpha = transcriptClean.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");

  let isMatch = false;

  if (transcriptClean.includes(targetHanzi) || targetHanzi.includes(transcriptClean)) {
    isMatch = true;
  } else if (targetPinyinClean.length > 0 && transcriptAlpha.length > 0) {
    if (transcriptAlpha.includes(targetPinyinClean) || targetPinyinClean.includes(transcriptAlpha)) {
      isMatch = true;
    }
  }

  if (isMatch) {
    // Feature 3: Tambah +1 kata saat tebakan pengucapan suara berhasil
    recordDailyWord();
    showSpeechFeedback(true, `Keren! Pelafalanmu tepat! ✨`);
  } else {
    showSpeechFeedback(false, `Hampir tepat! Coba dengarkan lagi suaranya dan ulangi perlahan 🎧`);
  }
}

function showSpeechFeedback(isSuccess, message) {
  if (!speechFeedbackBox) return;
  speechFeedbackBox.classList.remove('hidden', 'match', 'try-again');
  if (isSuccess) {
    speechFeedbackBox.classList.add('match');
    if (speechFeedbackIcon) speechFeedbackIcon.textContent = '✨';
  } else {
    speechFeedbackBox.classList.add('try-again');
    if (speechFeedbackIcon) speechFeedbackIcon.textContent = '🎧';
  }
  if (speechFeedbackText) speechFeedbackText.textContent = message;
}

function hideSpeechFeedback() {
  if (speechFeedbackBox) {
    speechFeedbackBox.classList.add('hidden');
  }
}

// Favorites Management
function toggleFavorite() {
  if (!currentWord) return;

  const index = favorites.findIndex(item => item.pinyin === currentWord.pinyin);
  if (index >= 0) {
    favorites.splice(index, 1);
    showToast("Kata dihapus dari favorit.");
  } else {
    favorites.push(currentWord);
    showToast("⭐ Kata disimpan ke favorit!");
  }

  localStorage.setItem('hsk_favs', JSON.stringify(favorites));
  updateFavHeartState();
  updateFavBadge();
}

function updateFavHeartState() {
  if (!currentWord || !favToggleBtn) return;
  const isFav = favorites.some(item => item.pinyin === currentWord.pinyin);
  if (isFav) {
    favToggleBtn.classList.add('is-fav');
  } else {
    favToggleBtn.classList.remove('is-fav');
  }
}

function updateFavBadge() {
  if (favCountBadge) {
    favCountBadge.textContent = favorites.length;
  }
}

// Render Favorites Modal List
function renderFavoritesList() {
  if (!favListEl) return;
  favListEl.innerHTML = '';

  if (favorites.length === 0) {
    if (emptyFavMsg) emptyFavMsg.classList.remove('hidden');
    return;
  }

  if (emptyFavMsg) emptyFavMsg.classList.add('hidden');

  favorites.forEach((word, idx) => {
    const li = document.createElement('li');
    li.className = 'fav-item';
    li.innerHTML = `
      <div class="fav-info">
        <span class="fav-pinyin">${escapeHtml(word.pinyin)}</span>
        <span class="fav-meaning">${escapeHtml(word.meaning)}</span>
      </div>
      <div class="fav-actions">
        <button class="icon-btn speech-fav-btn" title="Dengar Suara">🔊</button>
        <button class="remove-fav-btn" title="Hapus">&times;</button>
      </div>
    `;

    li.querySelector('.speech-fav-btn').addEventListener('click', () => {
      playSpeechPronunciation(word.hanzi || word.pinyin);
    });

    li.querySelector('.remove-fav-btn').addEventListener('click', () => {
      favorites.splice(idx, 1);
      localStorage.setItem('hsk_favs', JSON.stringify(favorites));
      updateFavBadge();
      updateFavHeartState();
      renderFavoritesList();
    });

    favListEl.appendChild(li);
  });
}

// Event Listeners Setup
function setupEventListeners() {
  // Next Word Button
  if (nextBtn) {
    nextBtn.addEventListener('click', handleNextWord);
  }

  // Pure Individual Toggles (Arti & Hanzi)
  if (toggleMeaningBtn) {
    toggleMeaningBtn.addEventListener('click', toggleMeaningObscured);
  }

  if (toggleHanziBtn) {
    toggleHanziBtn.addEventListener('click', toggleHanziObscured);
  }

  // Direct Click/Tap on Containers to Toggle Blur
  if (meaningDisplayContainer) {
    meaningDisplayContainer.addEventListener('click', toggleMeaningObscured);
  }

  if (hanziBoxEl) {
    hanziBoxEl.addEventListener('click', toggleHanziObscured);
  }

  // Theme Toggle Button
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Hanzi Writer - Animate Demo Button
  if (animateHanziBtn) {
    animateHanziBtn.addEventListener('click', animateWriterCharacter);
  }

  // Hanzi Writer - Reset / Restart Tracing Button
  if (resetTracingBtn) {
    resetTracingBtn.addEventListener('click', resetWriterQuiz);
  }

  // Audio Speech Button
  if (audioSpeechBtn) {
    audioSpeechBtn.addEventListener('click', () => {
      playSpeechPronunciation();
    });
  }

  // Voice Recognition Button
  if (voiceRecBtn) {
    voiceRecBtn.addEventListener('click', handleVoiceRecognitionToggle);
  }

  // Favorite Heart Toggle
  if (favToggleBtn) {
    favToggleBtn.addEventListener('click', toggleFavorite);
  }

  // Favorites Modal Triggers
  if (favTriggerBtn) {
    favTriggerBtn.addEventListener('click', () => {
      renderFavoritesList();
      if (favModal) {
        favModal.classList.remove('hidden');
        favModal.setAttribute('aria-hidden', 'false');
      }
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (favModal) {
        favModal.classList.add('hidden');
        favModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (favModal) {
    favModal.addEventListener('click', (e) => {
      if (e.target === favModal) {
        favModal.classList.add('hidden');
        favModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Feature 3: Daily History Modal Triggers
  if (historyTriggerBtn) {
    historyTriggerBtn.addEventListener('click', () => {
      renderHistoryModal();
      if (historyModal) {
        historyModal.classList.remove('hidden');
        historyModal.setAttribute('aria-hidden', 'false');
      }
    });
  }

  if (closeHistoryModalBtn) {
    closeHistoryModalBtn.addEventListener('click', () => {
      if (historyModal) {
        historyModal.classList.add('hidden');
        historyModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (historyModal) {
    historyModal.addEventListener('click', (e) => {
      if (e.target === historyModal) {
        historyModal.classList.add('hidden');
        historyModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Mode Tab Switchers
  if (tabVocabBtn) {
    tabVocabBtn.addEventListener('click', () => switchTab('vocab'));
  }

  if (tabWritingBtn) {
    tabWritingBtn.addEventListener('click', () => switchTab('writing'));
  }

  // Writing Mode 10x12 Actions
  if (clearGridCanvasBtn) {
    clearGridCanvasBtn.addEventListener('click', clearGridCanvas);
  }

  if (nextGridCharBtn) {
    nextGridCharBtn.addEventListener('click', completeAndNextGridChar);
  }

  if (writingAudioBtn) {
    writingAudioBtn.addEventListener('click', () => {
      if (currentGridChar) {
        playSpeechPronunciation(currentGridChar);
      }
    });
  }

  // Retry Button on error
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      loadVocabularyData();
    });
  }

  // Keyboard Shortcuts (Spacebar or Right Arrow = Next Word / Next Char)
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowRight') {
      const isFavOpen = favModal && !favModal.classList.contains('hidden');
      const isHistoryOpen = historyModal && !historyModal.classList.contains('hidden');
      if (!isFavOpen && !isHistoryOpen) {
        e.preventDefault();
        if (writingView && !writingView.classList.contains('hidden')) {
          completeAndNextGridChar();
        } else {
          handleNextWord();
        }
      }
    }
  });
}

// Helper Utilities
function showState(state) {
  if (loaderEl) loaderEl.classList.add('hidden');
  if (errorEl) errorEl.classList.add('hidden');
  if (cardEl) cardEl.classList.add('hidden');

  if (state === 'loading' && loaderEl) loaderEl.classList.remove('hidden');
  else if (state === 'error' && errorEl) errorEl.classList.remove('hidden');
  else if (state === 'card' && cardEl) cardEl.classList.remove('hidden');
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 2600);
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
