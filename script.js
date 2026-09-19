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

// App State — Decoupled Vocabulary Library & Daily Writing Practice
let vocabularyList = [];
let vocabIndex = 0; // Independent browsing index for 📚 Kosakata (0 to vocabularyList.length - 1)
let currentWord = null; // Currently displayed flashcard in 📚 Kosakata
let sessionCount = 1;
let favorites = JSON.parse(localStorage.getItem('hsk_favs') || localStorage.getItem('mandarin_chill_favs') || '[]');

// Daily Writing Practice State (Strictly 5 vocabulary sets per day)
const DAILY_WRITING_SETS = 5;
const DAILY_WRITING_STORAGE_KEY = 'hsk_daily_writing_v2';
let dailyWriting = null;

// Hanzi Writer State
let hanziWriters = []; // Array of writer instances for multi-character support
let writerQuizActive = false;

// Feature 1: TTS Utterance global reference (prevents Android GC from killing the utterance)
window.currentUtterance = null;

// Feature 2: Silence Timer for Auto-Stop Mic
let silenceTimer = null;
const SILENCE_TIMEOUT_MS = 5500; // 5.5 seconds of silence before auto-stop

// Tab Navigation & Writing Mode State (One Hanzi at a Time, Responsive Mi Zi Ge Grid)
let writingSession = {
  hanziList: [],           // Array of { char, pinyin, meaning }
  currentIndex: 0,         // Current Hanzi index within the set
  cellsPerHanzi: 10,       // 10 cells per Hanzi
  cellCompletedStatus: {}, // key: `${hanziIdx}_${cellIdx}` -> validated HanziWriter quiz completion
  completionRecorded: false,
};
let writingCellWriters = {};
let writingGridResizeObserver = null;
let writingResizeFrame = null;
let activeWritingLayout = null; // { cols, rows, cellSize, gap, id }

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
const writingSetProgress = document.getElementById('writing-set-progress');
const writingHanziProgress = document.getElementById('writing-hanzi-progress');
const writingOverallProgress = document.getElementById('writing-overall-progress');
const writingRepetitionProgress = document.getElementById('writing-repetition-progress');
const writingProgressFill = document.getElementById('writing-progress-fill');
const writingGridViewport = document.getElementById('writing-grid-viewport');
const clearActiveGridBtn = document.getElementById('clear-active-grid-btn');
const prevGridCharBtn = document.getElementById('prev-grid-char-btn');
const nextGridCharBtn = document.getElementById('next-grid-char-btn');
const nextGridCharLabel = document.getElementById('next-grid-char-label');

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
const prevWordBtn = document.getElementById('prev-word-btn');
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
    vocabularyList = parsedWords;
    initializeDailyWriting();
    showState('card');
    vocabIndex = 0;
    displayCurrentVocabWord();
    loadWritingForCurrentSet();
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
  
  vocabularyList = list;
  initializeDailyWriting();
  showState('card');
  vocabIndex = 0;
  displayCurrentVocabWord();
  loadWritingForCurrentSet();
}

function getTodayKey() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Deterministic pseudo-random integer generator based on date seed string.
 * Ensures the 5 daily writing sets are consistent for a given calendar date.
 */
function getDeterministicDailyWords(sourceList, count) {
  if (!sourceList || sourceList.length === 0) return [];
  const today = getTodayKey();
  
  let seed = 0;
  for (let i = 0; i < today.length; i++) {
    seed = ((seed << 5) - seed + today.charCodeAt(i)) | 0;
  }
  
  // Mulberry32 PRNG
  function mulberry32() {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  const pool = [...sourceList];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(mulberry32() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const selected = [];
  const used = new Set();
  for (const word of pool) {
    if (selected.length >= count) break;
    if (!used.has(word.hanzi)) {
      used.add(word.hanzi);
      selected.push(word);
    }
  }
  return selected;
}

/**
 * Initialize 5 Daily Writing sets strictly for Writing Practice.
 */
function initializeDailyWriting() {
  const today = getTodayKey();
  const saved = JSON.parse(localStorage.getItem(DAILY_WRITING_STORAGE_KEY) || 'null');
  
  if (saved && saved.date === today && Array.isArray(saved.words) && saved.words.length === DAILY_WRITING_SETS) {
    dailyWriting = saved;
  } else {
    const pool = (vocabularyList.length > 0)
      ? vocabularyList
      : Object.keys(HSK_DICTIONARY).map(k => ({ hanzi: k, ...HSK_DICTIONARY[k] }));
    const selected = getDeterministicDailyWords(pool, DAILY_WRITING_SETS);
    dailyWriting = {
      date: today,
      words: selected,
      currentSetIndex: 0,
      completedSets: {},
      writingStates: {},
      streakRecorded: false
    };
    saveDailyWriting();
  }

  if (typeof dailyWriting.currentSetIndex !== 'number' || dailyWriting.currentSetIndex < 0 || dailyWriting.currentSetIndex >= DAILY_WRITING_SETS) {
    dailyWriting.currentSetIndex = 0;
  }
}

function saveDailyWriting() {
  if (!dailyWriting) return;
  localStorage.setItem(DAILY_WRITING_STORAGE_KEY, JSON.stringify(dailyWriting));
}

function getCompletedWritingSetCount() {
  return dailyWriting ? Object.keys(dailyWriting.completedSets || {}).length : 0;
}

function saveActiveWritingState() {
  if (!dailyWriting || writingSession.hanziList.length === 0) return;
  dailyWriting.writingStates[dailyWriting.currentSetIndex] = {
    currentIndex: writingSession.currentIndex,
    cellCompletedStatus: { ...writingSession.cellCompletedStatus },
    completionRecorded: writingSession.completionRecorded
  };
  saveDailyWriting();
}

function loadWritingForCurrentSet() {
  if (!dailyWriting || !dailyWriting.words || dailyWriting.words.length === 0) return;
  const currentSetWord = dailyWriting.words[dailyWriting.currentSetIndex];
  if (!currentSetWord) return;
  
  const savedState = dailyWriting.writingStates[dailyWriting.currentSetIndex];
  initWritingSession([currentSetWord], savedState);
  
  // FIX B: Synchronize watermark immediately after session initialization
  const watermark = document.getElementById('mizige-watermark');
  if (watermark) {
    watermark.textContent = `${writingSession.currentIndex + 1} / ${writingSession.hanziList.length}`;
  }

  // FIX SET TRANSITION: Mount board when Writing tab is visible
  if (writingView && !writingView.hidden) {
    requestAnimationFrame(() => {
      mountLargeWritingBoard(writingSession.currentIndex, true);
    });
  }
}

function markCurrentWritingSetComplete() {
  if (!dailyWriting) return;
  const currentSetIdx = dailyWriting.currentSetIndex;
  dailyWriting.completedSets[currentSetIdx] = true;
  saveActiveWritingState();
  updateWritingUI();

  const completedCount = getCompletedWritingSetCount();

  if (completedCount === DAILY_WRITING_SETS && !dailyWriting.streakRecorded) {
    dailyWriting.streakRecorded = true;
    saveDailyWriting();
    recordWritingCompletion(); // Only updates streak after 5 / 5 sets are validated
    showToast('🎉 Latihan Menulis 5 / 5 selesai! Streak diperbarui.');
  } else {
    showToast(`✓ Kata ${currentSetIdx + 1} selesai (${completedCount} / ${DAILY_WRITING_SETS})`);
  }
}

// ─── Menu 📚 Kosakata: Unrestricted Vocabulary Library Browsing ──────────────

function displayCurrentVocabWord() {
  if (!vocabularyList || vocabularyList.length === 0) return;

  currentWord = vocabularyList[vocabIndex];

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

  // Always reset answers to blurred by default for new card
  obscureAll();

  // Update Hanzi Writer interactive tracing board with new character
  updateHanziWriter(currentWord.hanzi);

  // Hide Speech Feedback Box for new word
  hideSpeechFeedback();

  // Check Favorite State
  updateFavHeartState();
  updateVocabUI();
}

function updateVocabUI() {
  if (!vocabularyList || vocabularyList.length === 0) return;

  // Zen bar word counter for Vocabulary Library
  if (sessionCountEl) {
    sessionCountEl.textContent = `Kosakata · Kata ke-${vocabIndex + 1} / ${vocabularyList.length}`;
  }

  // Previous button: disabled only on very first word
  if (prevWordBtn) {
    prevWordBtn.disabled = (vocabIndex === 0);
  }

  // Next button: always standard vocabulary browsing forward
  if (nextBtn) {
    const mainLabel = nextBtn.querySelector('.btn-main-text');
    const subLabel = nextBtn.querySelector('.btn-subtext');
    if (mainLabel) mainLabel.textContent = 'Kata Berikutnya →';
    if (subLabel) subLabel.textContent = `Kosakata ${vocabIndex + 1} / ${vocabularyList.length}`;
  }
}

function handleNextWord() {
  if (!vocabularyList || vocabularyList.length === 0) return;
  vocabIndex = (vocabIndex + 1) % vocabularyList.length;
  displayCurrentVocabWord();
  recordDailyWord();
}

function handlePreviousWord() {
  if (!vocabularyList || vocabIndex === 0) return;
  vocabIndex -= 1;
  displayCurrentVocabWord();
}

// Day Streak Tracker Logic (localStorage based)
function updateDayStreak() {
  // Viewing the app must never create or extend a streak. A streak is only
  // updated after a fully validated writing lesson (see recordWritingCompletion).
  const completedDate = localStorage.getItem('hsk_last_lesson_completion_date');
  const streak = completedDate ? parseInt(localStorage.getItem('hsk_day_streak') || '0', 10) : 0;
  if (streakCountEl) streakCountEl.textContent = streak;
}

function recordWritingCompletion() {
  const today = new Date().toISOString().slice(0, 10);
  const lastDate = localStorage.getItem('hsk_last_lesson_completion_date');
  let streak = parseInt(localStorage.getItem('hsk_day_streak') || '0', 10);

  if (lastDate !== today) {
    const previous = lastDate ? new Date(`${lastDate}T00:00:00`) : null;
    const now = new Date(`${today}T00:00:00`);
    const daysSinceLastCompletion = previous
      ? Math.round((now - previous) / (1000 * 60 * 60 * 24))
      : 0;
    streak = daysSinceLastCompletion === 1 ? streak + 1 : 1;
    localStorage.setItem('hsk_day_streak', String(streak));
    localStorage.setItem('hsk_last_lesson_completion_date', today);
  }
  if (streakCountEl) streakCountEl.textContent = streak;
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
  if (typeof hanziWord !== 'string') return [];
  // Script=Han excludes pinyin, punctuation, numbers, and separators while
  // covering the full Han script instead of imposing a two-character limit.
  return Array.from(hanziWord).filter(char => /\p{Script=Han}/u.test(char));
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

// ─── Mode Menulis Hanzi (One Hanzi at a Time, 5×2 Mi Zi Ge Grid) ─────────────

/**
 * Tab switcher between Vocabulary mode and 5x2 Writing Practice mode.
 */
/**
 * Tab switcher between Vocabulary mode and Daily Writing Practice mode.
 */
function switchTab(tabName) {
  const appContainer = document.querySelector('.app-container');

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
    if (appContainer) appContainer.classList.remove('writing-tab-active');

    // Restore Vocabulary Library counter in zen-bar
    updateVocabUI();
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
    if (appContainer) appContainer.classList.add('writing-tab-active');

    // Ensure Daily Writing session is loaded
    if (!dailyWriting) {
      initializeDailyWriting();
    }
    if (writingSession.hanziList.length === 0) {
      loadWritingForCurrentSet();
    } else {
      updateWritingUI();
    }

    requestAnimationFrame(() => {
      mountWritingGrid(writingSession.currentIndex, true);
      mountLargeWritingBoard(writingSession.currentIndex, true);
    });
  }
}

/**
 * Helper to pick random unique Hanzi from HSK 1 vocabulary.
 */
function getRandomHanziList(count) {
  const result = [];
  const usedChars = new Set();

  if (currentWord && currentWord.hanzi) {
    const chars = extractAllHanzi(currentWord.hanzi);
    chars.forEach(char => {
      usedChars.add(char);
      result.push({
        char,
        pinyin: currentWord.pinyin,
        meaning: currentWord.meaning
      });
    });
  }

  const pool = (vocabularyList.length > 0)
    ? vocabularyList
    : Object.keys(HSK_DICTIONARY).map(k => ({ hanzi: k, ...HSK_DICTIONARY[k] }));
  const shuffled = shuffleArray(pool);

  for (let word of shuffled) {
    if (result.length >= count) break;
    const chars = extractAllHanzi(word.hanzi);
    chars.forEach(char => {
      if (result.length < count && !usedChars.has(char)) {
        usedChars.add(char);
        result.push({ char, pinyin: word.pinyin, meaning: word.meaning });
      }
    });
  }

  return result;
}

/**
 * Initialize a writing session for the given items (multi-Hanzi supported).
 */
function initWritingSession(items, savedState = null) {
  let list = [];

  if (Array.isArray(items) && items.length > 0) {
    items.forEach(item => {
      if (typeof item === 'string') {
        const chars = extractAllHanzi(item);
        chars.forEach(char => {
          const dictInfo = HSK_DICTIONARY[item] || HSK_DICTIONARY[char];
          list.push({
            char,
            pinyin: dictInfo?.pinyin || char,
            meaning: dictInfo?.meaning || 'Kosakata HSK 1'
          });
        });
      } else if (typeof item === 'object' && item) {
        const raw = item.char || item.hanzi || '';
        const chars = extractAllHanzi(raw);
        chars.forEach(char => list.push({
          char,
          pinyin: item.pinyin || HSK_DICTIONARY[char]?.pinyin || char,
          meaning: item.meaning || HSK_DICTIONARY[char]?.meaning || 'Kosakata HSK 1'
        }));
      }
    });
  } else if (typeof items === 'number' && items > 0) {
    list = getRandomHanziList(items);
  } else {
    list = getRandomHanziList(currentWord ? extractAllHanzi(currentWord.hanzi).length : 3);
  }

  if (list.length === 0) {
    list = [
      { char: '你', pinyin: 'nǐ', meaning: 'Kamu / Anda' },
      { char: '我', pinyin: 'wǒ', meaning: 'Saya / Aku' },
      { char: '他', pinyin: 'tā', meaning: 'Dia (Laki-laki)' }
    ];
  }

  writingSession.hanziList = list;
  writingSession.currentIndex = Math.min(
    Math.max(savedState?.currentIndex || 0, 0),
    Math.max(list.length - 1, 0)
  );
  writingSession.cellCompletedStatus = { ...(savedState?.cellCompletedStatus || {}) };
  writingSession.currentRepetition = (savedState?.currentRepetition || 0) < writingSession.cellsPerHanzi ? (savedState?.currentRepetition || 0) : 0;
  writingSession.repetitionsPerHanzi = writingSession.cellsPerHanzi; // Default to 10 repetitions
  writingSession.completionRecorded = Boolean(savedState?.completionRecorded);
  writingCellWriters = {};
  updateWritingUI();
}

window.setWritingSession = initWritingSession;
window.writingSession = writingSession;

/**
 * Dynamic layout algorithm: determines whether 5x2, 3x4, or 2x5 produces
 * the largest square writing cell that fits 100% within the container
 * without scrolling. Especially critical for Apple Pencil on iPad mini 6 portrait.
 */
function computeOptimalWritingLayout(containerWidth, containerHeight) {
  const gap = 10;
  const w = Math.max(120, containerWidth - 8);
  const h = Math.max(120, containerHeight - 8);

  const candidates = [
    { cols: 5, rows: 2, id: 'grid-5x2' },
    { cols: 3, rows: 4, id: 'grid-3x4' },
    { cols: 2, rows: 5, id: 'grid-2x5' }
  ];

  let bestLayout = candidates[0];
  let maxCellSize = 0;

  candidates.forEach(layout => {
    const availableW = w - (layout.cols - 1) * gap;
    const availableH = h - (layout.rows - 1) * gap;
    const sizeByW = availableW / layout.cols;
    const sizeByH = availableH / layout.rows;
    const cellSize = Math.floor(Math.min(sizeByW, sizeByH));

    if (cellSize > maxCellSize) {
      maxCellSize = cellSize;
      bestLayout = layout;
    }
  });

  const finalCellSize = Math.max(48, Math.min(260, maxCellSize));

  return {
    ...bestLayout,
    cellSize: finalCellSize,
    gap
  };
}

function applyWritingGridLayout(layout) {
  if (!writingGridViewport) return;
  activeWritingLayout = layout;
  const grids = writingGridViewport.querySelectorAll('.mizige-grid');
  grids.forEach(grid => {
    grid.style.setProperty('--grid-cols', layout.cols);
    grid.style.setProperty('--grid-rows', layout.rows);
    grid.style.setProperty('--cell-size', `${layout.cellSize}px`);
    grid.style.setProperty('--grid-gap', `${layout.gap}px`);
    grid.classList.remove('grid-5x2', 'grid-3x4', 'grid-2x5');
    grid.classList.add(layout.id);
  });
}

/**
 * Initialize single large writing board for Focus Writing mode.
 */
function initLargeWritingBoard() {
  if (typeof HanziWriter === 'undefined') {
    showToast('Latihan goresan belum siap. Periksa koneksi lalu coba lagi.');
    return;
  }

  const container = document.getElementById('large-writing-field-container');
  const writerHost = document.getElementById('writing-large-writer');
  const watermark = document.getElementById('mizige-watermark');
  
  if (!container || !writerHost) return;

  // Set initial watermark for first Hanzi
  watermark.textContent = `${writingSession.currentIndex + 1} / ${writingSession.hanziList.length}`;
  
  // Initialize single large writing board
  initLargeWritingBoard();
}

/**
 * Initialize single large writing board.
 */
function initLargeWritingBoard() {
  const container = document.getElementById('large-writing-field-container');
  const writerHost = document.getElementById('writing-large-writer');
  if (!container || !writerHost) return;

  // Show container
  container.style.display = 'flex';

  // Mount the HanziWriter for current Hanzi
  mountLargeWritingBoard(writingSession.currentIndex, true);
}

/**
 * Mount the single large writing board with HanziWriter.
 */
function mountLargeWritingBoard(hIdx) {
  // [TRACE] Diagnostics for Hanzi transition
  console.log('[WRITING TRACE] MOUNT', {
    hIdx,
    currentIndex: writingSession.currentIndex,
    currentRepetition: writingSession.currentRepetition,
    activeChar: writingSession.hanziList[hIdx]?.char
  });
  const container = document.getElementById('large-writing-field-container');
  const writerHost = document.getElementById('writing-large-writer');
  if (!container || !writerHost) return;

  const hanziObj = writingSession.hanziList[hIdx];
  hanziObj.index = hIdx;
  if (!hanziObj) return;

  // Clean up any existing HanziWriter instance
  for (let cIdx = 0; cIdx < writingSession.cellsPerHanzi; cIdx++) {
    const key = `large_${cIdx}`;
    const existing = writingCellWriters[key];
    if (existing?.writer) {
      try { existing.writer.cancelQuiz(); } catch (error) { /* already inactive */ }
    }
  }

  // Clear the writer host before mounting new instance
  writerHost.replaceChildren();

  const colors = getWriterColors();
  
  // Get board dimensions directly for proper square sizing
const board = document.getElementById('mizige-large-box');
if (!board) return; // Safety check
const boardRect = board.getBoundingClientRect();
const size = Math.floor(Math.min(boardRect.width, boardRect.height));
const width = size;
const height = size;

  // Set explicit dimensions on host element before HanziWriter creates its SVG
  writerHost.style.width = `${width}px`;
  writerHost.style.height = `${height}px`;

  try {
    const writer = HanziWriter.create(writerHost, hanziObj.char, {
      width, height,
      padding: 10,
      showOutline: true,
      strokeColor: colors.strokeColor,
      outlineColor: colors.outlineColor,
      highlightColor: colors.highlightColor,
      drawingWidth: 24,
      radicalColor: colors.radicalColor,
      showHintAfterMisses: 2,
      onLoadCharDataSuccess: () => {
        // Every fresh attempt for currentRepetition < 10 is a new quiz
        if (writingSession.currentRepetition < writingSession.repetitionsPerHanzi) {
          startLargeWritingQuiz(writer, hIdx);
        } else {
          writer.showCharacter({ duration: 0 });
        }
      },
      onLoadCharDataError: () => writerHost?.parentElement?.classList.add('writer-unavailable')
    });
    writingCellWriters[`large_0`] = { writer, width, height };

    // [TRACE] Diagnostics for Hanzi transition - after creating the second-Hanzi writer
    console.log('[WRITING TRACE] WRITER CREATED', {
      hIdx,
      currentIndex: writingSession.currentIndex,
      repetition: writingSession.currentRepetition,
      char: hanziObj.char
    });

  } catch (error) {
    console.warn('[HanziWriter] Large writing board unavailable:', hanziObj.char, error);
  }
}

function mountWritingGrid(hIdx, forceRemount = false) {
  const grid = document.getElementById(`mizige-grid-${hIdx}`);
  if (!grid || grid.classList.contains('hidden')) return;

  const hanziObj = writingSession.hanziList[hIdx];
  hanziObj.index = hIdx;
  if (!hanziObj) return;

  // Measure viewport and apply optimal layout
  if (writingGridViewport) {
    const vpRect = writingGridViewport.getBoundingClientRect();
    if (vpRect.width > 0 && vpRect.height > 0) {
      const layout = computeOptimalWritingLayout(vpRect.width, vpRect.height);
      applyWritingGridLayout(layout);
    }
  }

  for (let cIdx = 0; cIdx < writingSession.cellsPerHanzi; cIdx++) {
    const key = `${hIdx}_${cIdx}`;
    const host = document.getElementById(`writing-cell-${hIdx}-${cIdx}`);
    if (!host) continue;

    const rect = host.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    if (width < 1 || height < 1) continue;

    const existing = writingCellWriters[key];
    if (!forceRemount && existing && existing.width === width && existing.height === height) continue;
    if (existing?.writer) {
      try { existing.writer.cancelQuiz(); } catch (error) { /* already inactive */ }
    }

    host.replaceChildren();
    const colors = getWriterColors();
    const padding = Math.max(4, Math.round(Math.min(width, height) * 0.08));
    try {
      const writer = HanziWriter.create(host, hanziObj.char, {
        width, height, padding, showOutline: true, showCharacter: false,
        strokeColor: colors.strokeColor, outlineColor: colors.outlineColor,
        highlightColor: colors.highlightColor, radicalColor: colors.radicalColor,
        drawingWidth: Math.max(12, Math.round(Math.min(width, height) * 0.14)),
        showHintAfterMisses: 2,
        onLoadCharDataSuccess: () => {
          if (writingSession.cellCompletedStatus[key]) {
            writer.showCharacter({ duration: 0 });
          } else {
            startWritingCellQuiz(writer, hIdx, cIdx);
          }
        },
        onLoadCharDataError: () => host.parentElement?.classList.add('writer-unavailable')
      });
      writingCellWriters[key] = { writer, width, height };
    } catch (error) {
      console.warn('[HanziWriter] writing cell unavailable:', hanziObj.char, error);
    }
  }
}

/**
 * Start writing quiz for single large writing board.
 */
function startLargeWritingQuiz(writer, hIdx) {
  // [TRACE] Diagnostics for Hanzi transition
  console.log('[WRITING TRACE] QUIZ START', {
    hIdx,
    repetition: writingSession.currentRepetition,
    char: writingSession.hanziList[hIdx]?.char
  });
  try {
    writer.quiz({
      onCorrectStroke: () => {},
      onMistake: () => {
        setTimeout(() => {
          document.getElementById('writing-large-writer')?.classList.remove('is-mistake');
        }, 3000);
      },
      onComplete: () => {
        // [TRACE] Diagnostics for Hanzi transition
        console.log('[WRITING TRACE] COMPLETE', {
          hIdx,
          currentIndex: writingSession.currentIndex,
          repetitionBefore: writingSession.currentRepetition,
          char: writingSession.hanziList[hIdx]?.char
        });
        
        const currentRep = writingSession.currentRepetition || 0;
        const nextRep = currentRep + 1;
        
        // Mark this attempt as complete with Hanzi index scoping
        const completionKey = `${writingSession.currentIndex}_${nextRep}`;
        writingSession.cellCompletedStatus[completionKey] = true;
        writingSession.currentRepetition = nextRep;
        updateWritingUI();
        updateWritingProgress();
        if (nextRep < writingSession.repetitionsPerHanzi) {
          // [TRACE] Diagnostics for Hanzi transition
          console.log('[WRITING TRACE] MOUNT', {
            hIdx,
            currentIndex: writingSession.currentIndex,
            currentRepetition: writingSession.currentRepetition,
            activeChar: writingSession.hanziList[hIdx]?.char
          });
          mountLargeWritingBoard(writingSession.currentIndex);
        } else {
          // At #10: show completed character
          try { writer.showCharacter({ duration: 0 }); } catch(e) {}
          updateWritingProgress();
        }
      }
    });
  } catch (error) {
    console.warn('[HanziWriter] Large writing quiz failed:', error);
  }
}

function observeWritingGridResize() {
  if (!writingGridViewport || typeof ResizeObserver === 'undefined' || writingGridResizeObserver) return;
  writingGridResizeObserver = new ResizeObserver(() => {
    cancelAnimationFrame(writingResizeFrame);
    writingResizeFrame = requestAnimationFrame(() => mountWritingGrid(writingSession.currentIndex, true));
  });
  writingGridResizeObserver.observe(writingGridViewport);
}

function startWritingCellQuiz(writer, hIdx, cIdx) {
  const key = `${hIdx}_${cIdx}`;
  try {
    writer.quiz({
      onCorrectStroke: () => document.getElementById(`writing-cell-${hIdx}-${cIdx}`)?.parentElement?.classList.remove('is-mistake'),
      onMistake: () => {
        document.getElementById(`writing-cell-${hIdx}-${cIdx}`)?.parentElement?.classList.add('is-mistake');
        showToast('❌ Goresan belum tepat — coba ulangi goresan ini.');
      },
      onComplete: () => {
        if (writingSession.cellCompletedStatus[key]) return;
        writingSession.cellCompletedStatus[key] = true;
        const cell = document.getElementById(`writing-cell-${hIdx}-${cIdx}`)?.parentElement;
        cell?.classList.remove('is-mistake');
        cell?.classList.add('is-complete');
        updateWritingProgress();
        saveActiveWritingState();
        updateWritingUI();
      }
    });
  } catch (error) {
    console.warn('[HanziWriter] writing quiz failed:', error);
  }
}

/**
 * Update UI for the currently active Hanzi in Daily Writing session.
 */
function updateWritingUI() {
  if (writingSession.hanziList.length === 0) return;

  const active = writingSession.hanziList[writingSession.currentIndex];
  const totalHanziInSet = writingSession.hanziList.length;
  const currentSetIdx = dailyWriting ? dailyWriting.currentSetIndex : 0;

  // Update Hero Card details
  if (writingTargetChar) writingTargetChar.textContent = active.char;
  if (writingTargetPinyin) writingTargetPinyin.textContent = active.pinyin;
  if (writingTargetMeaning) writingTargetMeaning.textContent = active.meaning;

  // Update Set Progress (e.g. "Kata 1 / 5")
  if (writingSetProgress) {
    writingSetProgress.textContent = `Kata ${currentSetIdx + 1} / ${DAILY_WRITING_SETS}`;
  }

  // Update Hanzi Progress (e.g. "Hanzi 1 / 3" or "Hanzi 1 / 1")
  if (writingHanziProgress) {
    writingHanziProgress.textContent = `Hanzi ${writingSession.currentIndex + 1} / ${totalHanziInSet}`;
  }

  // Update Navigation Buttons
  if (prevGridCharBtn) {
    // Disabled only if at very first Hanzi of very first set
    prevGridCharBtn.disabled = (writingSession.currentIndex === 0 && currentSetIdx === 0);
  }

  if (nextGridCharLabel) {
    // Requirements:
    // Jika current set selesai tetapi masih ada set berikutnya: button harus: Next →
    // HANYA pada Set 5 / 5 setelah seluruh writing selesai: button menjadi: ✓ Selesai
    // Jangan menampilkan "Selesai" pada Set 1–4.
    const isCurrentSetDone = Boolean(dailyWriting?.completedSets?.[currentSetIdx]) || isWritingSessionComplete();
    const isLastSet = (currentSetIdx === DAILY_WRITING_SETS - 1);
    const allSetsDone = (getCompletedWritingSetCount() === DAILY_WRITING_SETS) || (isLastSet && isCurrentSetDone && getCompletedWritingSetCount() >= DAILY_WRITING_SETS - 1);

    if (isLastSet && allSetsDone) {
      nextGridCharLabel.textContent = '✓ Selesai';
    } else {
      nextGridCharLabel.textContent = 'Next →';
    }
  }

  updateWritingProgress();
  
  // Update repetition counter display (e.g., "2 / 10")
  if (writingRepetitionProgress) {
    writingRepetitionProgress.textContent = `${writingSession.currentRepetition} / ${writingSession.repetitionsPerHanzi}`;
  }

  // If in Writing mode, also update zen bar stats
  if (writingView && !writingView.classList.contains('hidden') && sessionCountEl) {
    const completed = getCompletedWritingSetCount();
    sessionCountEl.textContent = `Daily Writing · Kata ${currentSetIdx + 1} / ${DAILY_WRITING_SETS} · ${completed} / ${DAILY_WRITING_SETS} selesai`;
  }
}

/**
 * Update Overall Writing Progress across all Hanzi in current set.
 */
function updateWritingProgress() {
  const totalCells = writingSession.hanziList.length * writingSession.cellsPerHanzi;
  let completedCells = 0;
  for (let key in writingSession.cellCompletedStatus) {
    if (writingSession.cellCompletedStatus[key]) completedCells++;
  }

  if (writingOverallProgress) {
    writingOverallProgress.textContent = `${completedCells} / ${totalCells} completed`;
  }

  if (writingProgressFill) {
    const pct = totalCells > 0 ? Math.min(100, Math.round((completedCells / totalCells) * 100)) : 0;
    writingProgressFill.style.width = `${pct}%`;
  }
}

function isWritingSessionComplete() {
  const totalCells = writingSession.hanziList.length * writingSession.cellsPerHanzi;
  return totalCells > 0 && Object.values(writingSession.cellCompletedStatus).filter(Boolean).length === totalCells;
}

/**
 * Switch to a specific Hanzi index within the current word set.
 */
function goToWritingHanzi(newIndex) {
  // [TRACE] Diagnostics for Hanzi transition
  console.log('[WRITING TRACE] HANZI TRANSITION BEFORE', {
    currentIndex: writingSession.currentIndex,
    currentRepetition: writingSession.currentRepetition,
    hanziList: writingSession.hanziList.map(x => x.char)
  });
  if (newIndex < 0 || newIndex >= writingSession.hanziList.length) return;

  const currentGrid = document.getElementById(`mizige-grid-${writingSession.currentIndex}`);
  if (currentGrid) currentGrid.classList.add('hidden');

  writingSession.currentIndex = newIndex;

  // Reset repetition counter for new Hanzi
  writingSession.currentRepetition = 0;

  // [TRACE] Diagnostics for Hanzi transition
  console.log('[WRITING TRACE] HANZI TRANSITION AFTER', {
    currentIndex: writingSession.currentIndex,
    currentRepetition: writingSession.currentRepetition,
    activeChar: writingSession.hanziList[writingSession.currentIndex]?.char
  });

  const targetGrid = document.getElementById(`mizige-grid-${newIndex}`);
  if (targetGrid) targetGrid.classList.remove('hidden');

  // Update Hanzi index watermark
  const watermark = document.getElementById('mizige-watermark');
  if (watermark) {
    watermark.textContent = `${newIndex + 1} / ${writingSession.hanziList.length}`;
  }

  requestAnimationFrame(() => {
  mountWritingGrid(newIndex, true);
  mountLargeWritingBoard(newIndex);
});
  
  updateWritingUI();
}

/**
 * Navigate to Previous Hanzi (or Previous Set if on first Hanzi).
 */
function prevWritingHanzi() {
  if (writingSession.currentIndex > 0) {
    goToWritingHanzi(writingSession.currentIndex - 1);
    return;
  }
  if (dailyWriting && dailyWriting.currentSetIndex > 0) {
    saveActiveWritingState();
    dailyWriting.currentSetIndex -= 1;
    saveDailyWriting();
    loadWritingForCurrentSet();
  }
}

/**
 * Navigate to Next Hanzi or Next Set or Finish.
 */
function nextWritingHanzi() {
  const currentSetIdx = dailyWriting ? dailyWriting.currentSetIndex : 0;
  const isCurrentSetDone = Boolean(dailyWriting?.completedSets?.[currentSetIdx]) || isWritingSessionComplete();

  if (isCurrentSetDone) {
    if (!writingSession.completionRecorded && isWritingSessionComplete()) {
      finishWritingSession();
    }

    if (currentSetIdx < DAILY_WRITING_SETS - 1) {
      saveActiveWritingState();
      dailyWriting.currentSetIndex += 1;
      saveDailyWriting();
      loadWritingForCurrentSet();
      return;
    }

    // On Set 5 / 5
    if (currentSetIdx === DAILY_WRITING_SETS - 1) {
      if (getCompletedWritingSetCount() === DAILY_WRITING_SETS) {
        showToast('🎉 Selamat! Seluruh 5 set Latihan Menulis hari ini telah selesai!');
      } else {
        showToast(`Kata 5 selesai. Selesaikan set lainnya (${getCompletedWritingSetCount()} / ${DAILY_WRITING_SETS})`);
      }
      return;
    }
  }

  // Set not yet complete: advance to next Hanzi ONLY when all repetitions for current Hanzi are done
  const currentHanziIdx = writingSession.currentIndex;
  if (currentHanziIdx < writingSession.hanziList.length - 1) {
    const currentRep = writingSession.currentRepetition || 0;
    const maxReps = writingSession.repetitionsPerHanzi;
    
    // Only advance to next Hanzi after completing all repetitions for this Hanzi
    if (currentRep >= maxReps) {
      goToWritingHanzi(writingSession.currentIndex + 1);
      return;
    }
  }

  // On the last Hanzi of incomplete set: prompt user
  finishWritingSession();
}

/**
 * Clear writing cells of the active Hanzi.
 */
function clearActiveHanziGrid() {
  const activeGrid = document.getElementById(`mizige-grid-${writingSession.currentIndex}`);
  if (!activeGrid) return;

  const cells = activeGrid.querySelectorAll('.mizige-cell:not(.cell-placeholder)');
  cells.forEach((cell, cIdx) => {
    const key = `${writingSession.currentIndex}_${cIdx}`;
    writingSession.cellCompletedStatus[key] = false;
    cell.classList.remove('is-complete', 'is-mistake');
    const writer = writingCellWriters[key]?.writer;
    if (writer) {
      try {
        writer.cancelQuiz();
        writer.hideCharacter();
        startWritingCellQuiz(writer, writingSession.currentIndex, cIdx);
      } catch (error) {
        console.warn('[HanziWriter] reset writing cell failed:', error);
      }
    }
  });

  writingSession.completionRecorded = false;
  if (dailyWriting && dailyWriting.completedSets) {
    delete dailyWriting.completedSets[dailyWriting.currentSetIndex];
  }
  updateWritingProgress();
  saveActiveWritingState();
  updateWritingUI();
  const activeChar = writingSession.hanziList[writingSession.currentIndex]?.char || '';
  showToast(`🗑️ Latihan "${activeChar}" dibersihkan`);
}

/**
 * Complete the writing session for the current word set.
 */
function finishWritingSession() {
  const totalCells = writingSession.hanziList.length * writingSession.cellsPerHanzi;
  const completedCells = Object.values(writingSession.cellCompletedStatus).filter(Boolean).length;
  if (completedCells < totalCells) {
    showToast(`Selesaikan semua goresan yang benar dulu (${completedCells} / ${totalCells})`);
    return;
  }
  if (writingSession.completionRecorded) {
    return;
  }
  writingSession.completionRecorded = true;
  saveActiveWritingState();
  markCurrentWritingSetComplete();
  updateWritingUI();
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

  if (prevWordBtn) {
    prevWordBtn.addEventListener('click', handlePreviousWord);
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

  // Writing Practice 5x2 Actions
  if (clearActiveGridBtn) {
    clearActiveGridBtn.addEventListener('click', clearActiveHanziGrid);
  }

  if (prevGridCharBtn) {
    prevGridCharBtn.addEventListener('click', prevWritingHanzi);
  }

  if (nextGridCharBtn) {
    nextGridCharBtn.addEventListener('click', nextWritingHanzi);
  }

  if (writingAudioBtn) {
    writingAudioBtn.addEventListener('click', () => {
      const active = writingSession.hanziList[writingSession.currentIndex];
      if (active && active.char) {
        playSpeechPronunciation(active.char);
      }
    });
  }

  // Retry Button on error
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      loadVocabularyData();
    });
  }

  // Keyboard Shortcuts (Space / ArrowRight = Next, ArrowLeft = Prev)
  document.addEventListener('keydown', (e) => {
  // ENTER key: no-op during writing session
  if (e.code === 'Enter') {
    e.preventDefault();
    e.stopPropagation();
    return;
  }
    const isFavOpen = favModal && !favModal.classList.contains('hidden');
    const isHistoryOpen = historyModal && !historyModal.classList.contains('hidden');
    if (isFavOpen || isHistoryOpen) return;

    const isWritingActive = writingView && !writingView.classList.contains('hidden');

    if (e.code === 'Space' || e.code === 'ArrowRight') {
      e.preventDefault();
      if (isWritingActive) {
        nextWritingHanzi();
      } else {
        handleNextWord();
      }
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      if (isWritingActive) {
        prevWritingHanzi();
      } else {
        handlePreviousWord();
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
