/**
 * Mandarin Chill 🍃 - Anti-Stress HSK 1 SPA
 * Core Logic: Fetching, Micro-dosing Engine, TTS, Audio Synthesizer, Favorites
 */

// URL data sesuai permintaan prompt
const HSK1_WORDS_URL = "https://raw.githubusercontent.com/krmanik/HSK-3.0/refs/heads/main/New%20HSK%20(2025)/HSK%20Words/HSK_Level_1_words.txt";

// Enriched Indonesian Dictionary for HSK Level 1
const HSK_DICTIONARY = {
  "爱": { pinyin: "ài", meaning: "Suka / Mencintai", hint: "Bisa digunakan untuk menyukai makanan, hobi, atau seseorang." },
  "吧": { pinyin: "ba", meaning: "Kan / Yuk / Deh", hint: "Kata penegas santai di akhir kalimat (misal: Kita pergi yuk = 我们走吧)." },
  "八": { pinyin: "bā", meaning: "Angka 8 (Delapan)", hint: "Angka keberuntungan paling populer di Tiongkok!" },
  "爸爸": { pinyin: "bàba", meaning: "Ayah / Papa", hint: "Panggilan akrab untuk ayah." },
  "百": { pinyin: "bǎi", meaning: "Ratus / Seratus", hint: "Satu ratus = 一百 (yì bǎi)." },
  "白天": { pinyin: "báitiān", meaning: "Siang Hari", hint: "Waktu terangnya matahari di siang hari." },
  "半": { pinyin: "bàn", meaning: "Setengah / Separuh", hint: "Misal: setengah jam = 半小时." },
  "包子": { pinyin: "bāozi", meaning: "Bakpao / Roti Kukus", hint: "Makanan lezat kukus isi daging atau sayur." },
  "杯子": { pinyin: "bēizi", meaning: "Gelas / Cangkir", hint: "Wadah untuk minum teh atau kopi." },
  "本": { pinyin: "běn", meaning: "Jilid / Kata Penggolong Buku", hint: "Digunakan saat menghitung buku (misal: 一本书 = 1 buah buku)." },
  "边": { pinyin: "biān", meaning: "Sisi / Samping", hint: "Arah atau sebelah." },
  "病": { pinyin: "bìng", meaning: "Sakit / Penyakit", hint: "Misal: 生病 (jatuh sakit)." },
  "不": { pinyin: "bù", meaning: "Tidak / Bukan", hint: "Kata penolakan paling dasar." },
  "不客气": { pinyin: "bú kèqi", Meaning: "Sama-sama", hint: "Jawaban ramah saat seseorang bilang 'Xièxie'." },
  "不要": { pinyin: "bú yào", meaning: "Jangan / Tidak Mau", hint: "Gunakan ini kalau mau menolak dengan santai." },
  "菜": { pinyin: "cài", meaning: "Sayur / Masakan / Hidangan", hint: "Bisa berarti sayuran segar atau menu masakan." },
  "茶": { pinyin: "chá", meaning: "Teh", hint: "Minuman menenangkan favorit saat santai." },
  "唱": { pinyin: "chàng", meaning: "Menyanyi", hint: "Misal: 唱歌 (menyanyikan lagu)." },
  "超市": { pinyin: "chāoshì", meaning: "Supermarket", hint: "Tempat belanja kebutuhan sehari-hari." },
  "车": { pinyin: "chē", meaning: "Kendaraan / Mobil", hint: "Misal: 开车 (menyetir mobil)." },
  "吃": { pinyin: "chī", meaning: "Makan", hint: "Kata paling penting saat lapar! (吃 饭 = makan nasi)." },
  "穿": { pinyin: "chuān", meaning: "Memakai (Baju/Sepatu)", hint: "Memakai pakaian ke tubuh." },
  "出租车": { pinyin: "chūzūchē", meaning: "Taksi", hint: "Mobil angkutan umum sewaan." },
  "大": { pinyin: "dà", meaning: "Besar", hint: "Lawan kata dari kecil (小)." },
  "打电话": { pinyin: "dǎ diànhuà", meaning: "Menelepon", hint: "Menghubungi seseorang lewat HP." },
  "大家": { pinyin: "dàjiā", meaning: "Semua Orang / Kalian Semua", hint: "Panggilan akrab untuk rombongan teman." },
  "到": { pinyin: "dào", meaning: "Tiba / Sampai", hint: "Misal: Saya sudah sampai = 我 arrived 了." },
  "大学": { pinyin: "dàxué", meaning: "Universitas / Perguruan Tinggi", hint: "Tempat kuliah para mahasiswa." },
  "大学生": { pinyin: "dàxuéshēng", meaning: "Mahasiswa", hint: "Pelajar tingkat universitas." },
  "的": { pinyin: "de", meaning: "Kepunyaan / (Yang)", hint: "Partikel penanda milik (misal: 我 的 = milik saya)." },
  "第": { pinyin: "dì", meaning: "Ke- (Urutan)", hint: "Contoh: 第一 (yang pertama)." },
  "店": { pinyin: "diàn", meaning: "Toko", hint: "Misal: 书店 (toko buku)." },
  "点": { pinyin: "diǎn", meaning: "Jam / Titik / Sedikit", hint: "Digunakan untuk sebut jam (misal: 8点 = jam 8)." },
  "电话": { pinyin: "diànhuà", meaning: "Telepon", hint: "Alat komunikasi telepon." },
  "电脑": { pinyin: "diànnǎo", meaning: "Komputer / Laptop", hint: "Secara harfiah artinya 'Otak Listrik'!" },
  "电视": { pinyin: "diànshì", meaning: "Televisi / TV", hint: "Secara harfiah artinya 'Penglihatan Listrik'." },
  "电影": { pinyin: "diànyǐng", meaning: "Film", hint: "Nonton film di waktu luang." },
  "电影院": { pinyin: "diànyǐngyuàn", meaning: "Bioskop", hint: "Gedung tempat menonton film." },
  "弟弟": { pinyin: "dìdi", meaning: "Adik Laki-laki", hint: "Saudara kandung laki-laki yang lebih muda." },
  "东西": { pinyin: "dōngxi", meaning: "Barang / Benda", hint: "Secara unik dibentuk dari kata Timur (东) dan Barat (西)!" },
  "都": { pinyin: "dōu", meaning: "Semua / Seluruhnya", hint: "Misal: Kita semua suka = 我们都喜欢." },
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
  "飞机": { pinyin: "fēijī", meaning: "Pesawat Terbang", hint: "Secara harfiah artinya 'Mesin Terbang'." },
  "分": { pinyin: "fēn", meaning: "Menit / Membagi", hint: "Satuan menit waktu." },
  "分钟": { pinyin: "fēnzhōng", meaning: "Durasi Menit", hint: "Misal: 5分钟 (5 menit)." },
  "高兴": { pinyin: "gāoxìng", meaning: "Senang / Gembira", hint: "Perasaan bahagia dan riang." },
  "个": { pinyin: "gè", meaning: "Sebuah / Seorang (Penggolong)", hint: "Kata bilang paling fleksibel dalam Mandarin!" },
  "歌": { pinyin: "gē", meaning: "Lagu", hint: "Misal: 听歌 (mendengarkan lagu)." },
  "哥哥": { pinyin: "gēge", meaning: "Kakak Laki-laki", hint: "Saudara pria yang lebih tua." },
  "给": { pinyin: "gěi", meaning: "Memberi / Untuk", hint: "Misal: Memberi kamu = 给你." },
  "公司": { pinyin: "gōngsī", meaning: "Perusahaan / Kantor", hint: "Tempat bekerja profesional." },
  "工作": { pinyin: "gōngzuò", meaning: "Bekerja / Pekerjaan", hint: "Aktivitas kerja sehari-hari." },
  "狗": { pinyin: "gǒu", meaning: "Anjing 🐶", hint: "Hewan peliharaan yang setia." },
  "贵": { pinyin: "guì", meaning: "Mahal", hint: "Lawan kata dari murah (便宜)." },
  "国": { pinyin: "guó", meaning: "Negara", hint: "Misal: 中国 (Tiongkok)." },
  "还": { pinyin: "hái", meaning: "Masih / Juga", hint: "Menyatakan kondisi yang masih berlanjut." },
  "孩子": { pinyin: "háizi", meaning: "Anak-anak", hint: "Anak kecil atau buah hati." },
  "汉语": { pinyin: "hànyǔ", meaning: "Bahasa Mandarin", hint: "Bahasa yang sedang kamu pelajari dengan santai ini!" },
  "汉字": { pinyin: "hànzì", meaning: "Karakter Hanzi", hint: "Huruf mandarin (tak usah takut, pelan-pelan aja!)." },
  "号": { pinyin: "hào", meaning: "Tanggal / Nomor", hint: "Digunakan untuk sebut tanggal kalender atau nomor rumah." },
  "好": { pinyin: "hǎo", meaning: "Baik / Bagus / OK", hint: "Kata paling positif dan sering dipakai!" },
  "好吃": { pinyin: "hǎochī", meaning: "Enak (Makanan)", hint: "Pujian wajib saat makan makanan lezat." },
  "好看": { pinyin: "hǎokàn", meaning: "Bagus Dilihat / Cantik / Tampan", hint: "Pujian untuk penampilan atau film bagus." },
  "好听": { pinyin: "hǎotīng", meaning: "Merdu / Enak Didengar", hint: "Pujian untuk suara atau lagu yang indah." },
  "好玩儿": { pinyin: "hǎowánr", meaning: "Seru / Menyenangkan", hint: "Suasana yang asyik dan bikin gembira." },
  "和": { pinyin: "hé", meaning: "Dan / Bersama", hint: "Kata hubung (misal: Kamu dan saya = 你和你)." },
  "喝": { pinyin: "hē", meaning: "Minum", hint: "Misal: 喝茶 (minum teh)." },
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
  "饺子": { pinyin: "jiǎozi", meaning: "Dimsum / Kuotie / Dumpling 🥟", hint: "Makanan favorit khas Imlek." },
  "家人": { pinyin: "jiārén", meaning: "Anggota Keluarga", hint: "Orang-orang tercinta di rumah." },
  "鸡蛋": { pinyin: "jīdàn", meaning: "Telur Ayam 🥚", hint: "Bahan makanan sehat sehari-hari." },
  "姐姐": { pinyin: "jiějie", meaning: "Kakak Perempuan", hint: "Saudara wanita yang lebih tua." },
  "今年": { pinyin: "jīnnián", meaning: "Tahun Ini", hint: "Tahun yang sedang berjalan." },
  "今天": { pinyin: "jīntiān", meaning: "Hari Ini", hint: "Hari yang menyenangkan saat ini." },
  "九": { pinyin: "jiǔ", meaning: "Angka 9 (Sembilan)", hint: "Angka sembilan." },
  "觉得": { pinyin: "juéde", meaning: "Merasa / Menurut Saya", hint: "Mengungkapkan pendapat santai." },
  "开": { pinyin: "kāi", meaning: "Buka / Menyala / Menyetir", hint: "Misal: 开门 (buka pintu)." },
  "开车": { pinyin: "kāi chē", meaning: "Menyetir Mobil 🚗", hint: "Mengendarai kendaraan roda empat." },
  "看": { pinyin: "kàn", meaning: "Melihat / Membaca / Nonton", hint: "Mata fokus memperhatikan sesuatu." },
  "看病": { pinyin: "kàn bìng", meaning: "Berobat / Periksa ke Dokter", hint: "Memeriksakan kesehatan." },
  "看见": { pinyin: "kànjiàn", meaning: "Kelihatan / Melihat", hint: "Hasil dari penglihatan mata." },
  "课": { pinyin: "kè", meaning: "Pelajaran / Kelas", hint: "Sesi belajar santai." },
  "可以": { pinyin: "kěyǐ", meaning: "Boleh / Bisa", hint: "Memberi izin atau menyatakan kemampuan." },
  "口": { pinyin: "kǒu", meaning: "Mulut / Anggota Keluarga", hint: "Kata penggolong jumlah anggota keluarga." },
  "块": { pinyin: "kuài", meaning: "Potong / Satuan Uang Yuan", hint: "Penyebutan santai untuk uang RMB." },
  "来": { pinyin: "lái", meaning: "Datang", hint: "Lawan kata dari pergi (去)." },
  "老师": { pinyin: "lǎoshī", meaning: "Guru / Pengajar 🧑‍🏫", hint: "Panggilan hormat dan ramah untuk pengajar." },
  "了": { pinyin: "le", meaning: "Sudah (Partikel)", hint: "Penanda bahwa suatu tindakan sudah selesai." },
  "冷": { pinyin: "lěng", meaning: "Dingin ❄️", hint: "Suhu udara dingin menyejukkan." },
  "里": { pinyin: "lǐ", meaning: "Dalam / Di Dalam", hint: "Menunjukkan lokasi bagian dalam." },
  "两": { pinyin: "liǎng", meaning: "Dua (Untuk Jumlah Benda)", hint: "Digunakan saat menghitung (misal: 2 gelas = 两个)." },
  "零": { pinyin: "líng", meaning: "Angka 0 (Nol)", hint: "Angka nol." },
  "六": { pinyin: "liù", meaning: "Angka 6 (Enam)", hint: "Angka enam." },
  "吗": { pinyin: "ma", meaning: "Apakah? (Partikel Tanya)", hint: "Cukup tambahkan 'ma' di akhir kalimat untuk bertanya!" },
  "卖": { pinyin: "mài", meaning: "Menjual", hint: "Lawan kata dari membeli (买)." },
  "买": { pinyin: "mǎi", meaning: "Membeli 🛒", hint: "Aktivitas belanja barang favorit." },
  "妈妈": { pinyin: "māma", meaning: "Ibu / Mama 👩", hint: "Sosok tersayang di keluarga." },
  "忙": { pinyin: "máng", meaning: "Sibuk", hint: "Banyak kegiatan." },
  "猫": { pinyin: "māo", meaning: "Kucing 🐱", hint: "Hewan peliharaan lucu berniat menguasai dunia." },
  "没关系": { pinyin: "méi guānxi", meaning: "Tidak Apa-apa / Santai Saja", hint: "Motto utama aplikasi kita! 🍃" },
  "妹妹": { pinyin: "mèimei", meaning: "Adik Perempuan", hint: "Saudara perempuan yang lebih muda." },
  "没事": { pinyin: "méishì", meaning: "Gak Masalah / Santai Aja", hint: "Jawaban santai saat tidak ada kendala." },
  "没": { pinyin: "méi", meaning: "Tidak / Belum", hint: "Singkatan dari 没有." },
  "没有": { pinyin: "méiyǒu", meaning: "Tidak Punya / Belum", hint: "Menyatakan ketiadaan barang/peristiwa." },
  "们": { pinyin: "men", meaning: "Partikel Jamak (Mereka/Kalian)", hint: "Ditambahkan setelah kata ganti orang." },
  "面包": { pinyin: "miànbāo", meaning: "Roti 🍞", hint: "Makanan sarapan empuk lezat." },
  "面条儿": { pinyin: "miàntiáor", meaning: "Mie 🍜", hint: "Makanan mie kenyal khas Asia." },
  "米饭": { pinyin: "mǐfàn", meaning: "Nasi Putih 🍚", hint: "Nasi matang hangat." },
  "明年": { pinyin: "míngnián", meaning: "Tahun Depan", hint: "Tahun yang akan datang." },
  "明天": { pinyin: "míngtiān", meaning: "Besok 🌅", hint: "Hari esok yang penuh harapan." },
  "名字": { pinyin: "míngzi", meaning: "Nama", hint: "Identitas sebutan seseorang." },
  "那": { pinyin: "nà", meaning: "Itu", hint: "Menunjuk benda di kejauhan." },
  "哪": { pinyin: "nǎ", meaning: "Yang Mana?", hint: "Kata tanya pilihan." },
  "那边": { pinyin: "nàbiān", meaning: "Sebelah Sana", hint: "Arah tempat di sana." },
  "那个": { pinyin: "nàge", meaning: "Yang Itu", hint: "Menunjuk benda spesifik." },
  "哪个": { pinyin: "nǎge", meaning: "Yang Mana?", hint: "Menanyakan benda yang dipilih." },
  "argument": { pinyin: "nàlǐ", meaning: "Di Sana", hint: "Lokasi tempat di sana." },
  "哪里": { pinyin: "nǎlǐ", meaning: "Di Mana? / Ah Tidak Juga", hint: "Ungkapan rendah hati khas saat dipuji." },
  "男": { pinyin: "nán", meaning: "Laki-laki / Pria", hint: "Pria." },
  "男朋友": { pinyin: "nánpéngyou", meaning: "Pacar Laki-laki", hint: "Pasangan pria." },
  "那儿": { pinyin: "nàr", meaning: "Di Sana", hint: "Gaya bicara santai Beijing untuk 'di sana'." },
  "哪儿": { pinyin: "nǎr", meaning: "Di Mana?", hint: "Gaya bicara santai Beijing untuk 'di mana'." },
  "那些": { pinyin: "nàxiē", meaning: "Itu Semua", hint: "Benda-benda di sana." },
  "哪些": { pinyin: "nǎxiē", meaning: "Yang Mana Saja?", hint: "Pertanyaan jamak." },
  "呢": { pinyin: "ne", meaning: "Bagaimana Dengan...? / Lagi Apa?", hint: "Partikel tanya santai (misal: 你呢 = Kalau kamu?)." },
  "能": { pinyin: "néng", meaning: "Bisa / Mampu", hint: "Kemampuan melakukan sesuatu." },
  "你": { pinyin: "nǐ", meaning: "Kamu", hint: "Kata sapaan untuk lawan bicara." },
  "你好": { pinyin: "nǐ hǎo", meaning: "Halo / Apa Kabar 😊", hint: "Kata Mandarin paling terkenal di bumi!" },
  "年": { pinyin: "nián", meaning: "Tahun", hint: "Satuan kurun waktu tahun." },
  "你们": { pinyin: "nǐmen", meaning: "Kalian", hint: "Sapaan jamak untuk kamu dan teman-teman." },
  "您": { pinyin: "nín", meaning: "Anda (Sopan)", hint: "Panggilan hormat untuk orang tua atau atasan." },
  "牛奶": { pinyin: "niúnǎi", meaning: "Susu Sapi 🥛", hint: "Minuman susu bernutrisi." },
  "女": { pinyin: "nǚ", meaning: "Perempuan / Wanita", hint: "Wanita." },
  "女儿": { pinyin: "nǚ'ér", meaning: "Anak Perempuan 👧", hint: "Anak wanita tercinta." },
  "女朋友": { pinyin: "nǚpéngyou", meaning: "Pacar Perempuan", hint: "Pasangan wanita." },
  "女士": { pinyin: "nǚshì", meaning: "Ibu / Nona (Sopan)", hint: "Sebutan sopan untuk wanita." },
  "朋友": { pinyin: "péngyou", meaning: "Teman / Sahabat 🤝", hint: "Orang dekat yang seru." },
  "便宜": { pinyin: "piányi", meaning: "Murah", hint: "Harga bersahabat." },
  "漂亮": { pinyin: "piàoliang", meaning: "Cantik / Indah 🌸", hint: "Pujian untuk pemandangan atau wajah cantik." },
  "苹果": { pinyin: "píngguǒ", meaning: "Buah Apel 🍎", hint: "Buah apel segar." },
  "七": { pinyin: "qī", meaning: "Angka 7 (Tujuh)", hint: "Angka tujuh." },
  "前": { pinyin: "qián", meaning: "Depan / Sebelum", hint: "Arah bagian depan." },
  "钱": { pinyin: "qián", meaning: "Uang 💰", hint: "Alat pembayaran." },
  "千": { pinyin: "qiān", meaning: "Ribu / Seribu", hint: "Secara angka 1.000." },
  "起床": { pinyin: "qǐ chuáng", meaning: "Bangun Tidur ☀️", hint: "Mulai menyambut hari baru." },
  "请": { pinyin: "qǐng", meaning: "Silakan / Tolong", hint: "Kata sopan sebelum meminta sesuatu." },
  "请问": { pinyin: "qǐngwèn", meaning: "Permisi Numpang Tanya", hint: "Kalimat ramah saat mau bertanya jalan/hal." },
  "去": { pinyin: "qù", meaning: "Pergi", hint: "Misal: 去学校 (pergi ke sekolah)." },
  "去年": { pinyin: "qùnián", meaning: "Tahun Lalu", hint: "Tahun yang sudah lewat." },
  "热": { pinyin: "rè", meaning: "Panas ☀️", hint: "Suhu udara hangat/panas." },
  "人": { pinyin: "rén", meaning: "Orang 🚶", hint: "Manusia." },
  "认识": { pinyin: "rènshi", meaning: "Kenal / Mengenali", hint: "Misal: 很高兴认识你 (Senang berkenalan denganmu)." },
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
  "是": { pinyin: "shì", meaning: "Adalah / Iya / Benar", hint: "Kata penghubung identitas (misal: 我是... = Saya adalah...)." },
  "时候": { pinyin: "shíhou", meaning: "Waktu / Saat", hint: "Misal: 什么时候 (Kapan?)." },
  "时间": { pinyin: "shíjiān", meaning: "Waktu / Durasi ⏰", hint: "Waktu yang berjalan." },
  "手机": { pinyin: "shǒujī", meaning: "HP / Smartphone 📱", hint: "Secara harfiah artinya 'Mesin Tangan'." },
  "书": { pinyin: "shū", meaning: "Buku 📚", hint: "Jendela ilmu pengetahuan." },
  "书店": { pinyin: "shūdiàn", meaning: "Toko Buku 📖", hint: "Tempat membeli buku-buku seru." },
  "睡": { pinyin: "shuì", meaning: "Tidur 😴", hint: "Istirahat lelap." },
  "水": { pinyin: "shuǐ", meaning: "Air 💧", hint: "Air putih yang menyegarkan." },
  "水果": { pinyin: "shuǐguǒ", meaning: "Buah-buahan 🧺", hint: "Secara harfiah artinya 'Hasil Air'." },
  "睡觉": { pinyin: "shuì jiào", meaning: "Tidur 🛌", hint: "Pergi tidur di kasur." },
  "说": { pinyin: "shuō", meaning: "Bicara / Berkata", hint: "Mengeluarkan suara bicara." },
  "说话": { pinyin: "shuō huà", meaning: "Ngobrol / Berbicara", hint: "Percakapan ramah." },
  "四": { pinyin: "sì", meaning: "Angka 4 (Empat)", hint: "Angka empat." },
  "岁": { pinyin: "suì", meaning: "Tahun Umur", hint: "Penyebutan usia (misal: 20岁 = umur 20 tahun)." },
  "他": { pinyin: "tā", meaning: "Dia (Laki-laki)", hint: "Kata ganti orang ketiga pria." },
  "它": { pinyin: "tā", meaning: "Dia (Hewan / Benda)", hint: "Kata ganti benda atau hewan peliharaan." },
  "她": { pinyin: "tā", meaning: "Dia (Perempuan)", hint: "Kata ganti orang ketiga wanita." },
  "太": { pinyin: "tài", meaning: "Terlalu / Sangat", hint: "Ungkapan kekaguman (misal: 太好了 = Bagus banget!)." },
  "他们": { pinyin: "tāmen", meaning: "Mereka (Pria / Campuran)", hint: "Kata ganti orang kelompok." },
  "它们": { pinyin: "tāmen", meaning: "Mereka (Hewan / Benda)", hint: "Kelompok hewan/benda." },
  "她们": { pinyin: "tāmen", meaning: "Mereka (Semua Wanita)", hint: "Kelompok wanita." },
  "天": { pinyin: "tiān", meaning: "Langit / Hari 🌤️", hint: "Hari atau cuaca." },
  "天气": { pinyin: "tiānqì", meaning: "Cuaca 🌈", hint: "Keadaan udara hari ini." },
  "听": { pinyin: "tīng", meaning: "Mendengar 🎧", hint: "Mendengarkan musik atau cerita." },
  "听见": { pinyin: "tīngjiàn", meaning: "Terdengar / Mendengar", hint: "Hasil pendengaran." },
  "同学": { pinyin: "tóngxué", meaning: "Teman Sekelas 🏫", hint: "Kawan belajar bersama." },
  "外": { pinyin: "wài", meaning: "Luar", hint: "Bagian luar." },
  "外边": { pinyin: "wàibian", meaning: "Sebelah Luar", hint: "Area di luar." },
  "玩": { pinyin: "wán", meaning: "Bermain / Santai 🎮", hint: "Main game atau jalan-jalan santai." },
  "晚": { pinyin: "wǎn", meaning: "Malam / Terlambat", hint: "Waktu malam hari." },
  "晚饭": { pinyin: "wǎnfàn", meaning: "Makan Malam 🍲", hint: "Santap malam bersama." },
  "晚上": { pinyin: "wǎnshang", meaning: "Malam Hari 🌙", hint: "Waktu santai di malam hari." },
  "喂": { pinyin: "wèi", meaning: "Halo (Di Telepon)", hint: "Sapaan khas saat mengangkat telepon." },
  "问": { pinyin: "wèn", meaning: "Bertanya ❓", hint: "Mengajukan pertanyaan." },
  "问题": { pinyin: "wèntí", meaning: "Pertanyaan / Masalah", hint: "Gak ada masalah = 没问题!" },
  "我": { pinyin: "wǒ", meaning: "Saya / Aku 🙋‍♂️", hint: "Kata ganti diri sendiri paling penting." },
  "我们": { pinyin: "wǒmen", meaning: "Kami / Kita", hint: "Kita bersama-sama belajar santai." },
  "五": { pinyin: "wǔ", meaning: "Angka 5 (Lima)", hint: "Angka lima." },
  "午饭": { pinyin: "wǔfàn", meaning: "Makan Siang 🍱", hint: "Istirahat santap siang." },
  "下": { pinyin: "xià", meaning: "Bawah / Turun / Selesai", hint: "Arah ke bawah." },
  "下雨": { pinyin: "xià yǔ", meaning: "Hujan Turun 🌧️", hint: "Suasana hujan menenangkan." },
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
  "写": { pinyin: "xiě", meaning: "Menulis ✍️", hint: "Mencoret catatan manis." },
  "些": { pinyin: "xiē", meaning: "Beberapa", hint: "Jumlah lebih dari satu." },
  "谢谢": { pinyin: "xièxie", meaning: "Terima Kasih 🙏", hint: "Ungkapan syukur dan terima kasih." },
  "喜欢": { pinyin: "xǐhuan", meaning: "Suka / Menyukai 💖", hint: "Perasaan senang pada sesuatu." },
  "新": { pinyin: "xīn", meaning: "Baru ✨", hint: "Hal baru yang segar." },
  "星期": { pinyin: "xīngqī", meaning: "Minggu (Hari)", hint: "Urutan hari dalam seminggu." },
  "星期日": { pinyin: "xīngqīrì", meaning: "Hari Minggu ☀️", hint: "Hari libur santai." },
  "星期天": { pinyin: "xīngqītiān", meaning: "Hari Minggu 🌿", hint: "Hari akhir pekan." },
  "休息": { pinyin: "xiūxi", meaning: "Istirahat 🛋️", hint: "Istirahat sejenak melepaskan lelah." },
  "学": { pinyin: "xué", meaning: "Belajar 📖", hint: "Proses menambah ilmu secara santai." },
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
  "一下": { pinyin: "yíxià", meaning: "Sebentar / Sejenak", hint: "Waktu yang sangat singkat (misal: Tunggu sebentar = 等一下)." },
  "一些": { pinyin: "yìxiē", meaning: "Beberapa", hint: "Sejumlah benda." },
  "医院": { pinyin: "yīyuàn", meaning: "Rumah Sakit 🏥", hint: "Tempat pengobatan." },
  "椅子": { pinyin: "yǐzi", meaning: "Kursi 🪑", hint: "Tempat duduk santai." },
  "有": { pinyin: "yǒu", meaning: "Punya / Ada", hint: "Menyatakan kepemilikan." },
  "有的": { pinyin: "yǒude", meaning: "Ada Yang / Beberapa", hint: "Sebagian dari kelompok." },
  "有些": { pinyin: "yǒuxiē", meaning: "Beberapa", hint: "Sejumlah tertentu." },
  "雨": { pinyin: "yǔ", meaning: "Hujan 🌧️", hint: "Tetesan air dari langit." },
  "元": { pinyin: "yuán", meaning: "Mata Uang Yuan (RMB)", hint: "Satuan mata uang Tiongkok." },
  "月": { pinyin: "yuè", meaning: "Bulan (Kalender / Langit) 🌙", hint: "Bulan di langit atau sebutan bulan ke-." },
  "再": { pinyin: "zài", meaning: "Lagi / Nanti", hint: "Melakukan kembali di masa depan." },
  "在": { pinyin: "zài", meaning: "Di / Sedang (Melakukan)", hint: "Lokasi atau tindakan yang sedang berlangsung." },
  "再见": { pinyin: "zàijiàn", meaning: "Sampai Jumpa Lagi 👋", hint: "Secara harfiah artinya 'Bertemu Lagi'." },
  "早": { pinyin: "zǎo", meaning: "Pagi / Selamat Pagi 🌅", hint: "Sapaan ramah di pagi hari." },
  "早饭": { pinyin: "zǎofàn", meaning: "Sarapan 🥐", hint: "Santap makanan di pagi hari." },
  "早上": { pinyin: "zǎoshang", meaning: "Pagi Hari ☀️", hint: "Waktu pagi menyegarkan." },
  "怎么": { pinyin: "zěnme", meaning: "Bagaimana? / Kenapa?", hint: "Menanyakan cara atau alasan." },
  "怎么样": { pinyin: "zěnmeyàng", meaning: "Bagaimana Menurutmu?", hint: "Menanyakan pendapat kawan." },
  "找": { pinyin: "zhǎo", meaning: "Mencari 🔍", hint: "Misal: 找钱 (mencari uang kembalian)." },
  "这": { pinyin: "zhè", meaning: "Ini", hint: "Menunjuk benda di dekat kita." },
  "这边": { pinyin: "zhèbiān", meaning: "Sebelah Sini", hint: "Arah dekat kita." },
  " este": { pinyin: "zhège", meaning: "Yang Ini", hint: "Benda dekat ini." },
  "这里": { pinyin: "zhèlǐ", meaning: "Di Sini", hint: "Lokasi kita berada saat ini." },
  "真": { pinyin: "zhēn", meaning: "Sungguh / Benar-benar", hint: "Penegas kejujuran (misal: 真好 = Sungguh bagus!)." },
  "正在": { pinyin: "zhèngzài", meaning: "Sedang (Berlangsung)", hint: "Proses yang sedang terjadi." },
  "这儿": { pinyin: "zhèr", meaning: "Di Sini", hint: "Gaya bicara santai Beijing untuk 'di sini'." },
  "these": { pinyin: "zhèxiē", meaning: "Ini Semua", hint: "Kumpulan benda di sini." },
  "只": { pinyin: "zhī", meaning: "Hanya / Kata Penggolong Hewan", hint: "Misal: 一只猫 (seekor kucing)." },
  "知道": { pinyin: "zhīdào", meaning: "Tahu / Paham 💡", hint: "Tahu atau mengerti informasi." },
  "中国": { pinyin: "zhōngguó", meaning: "Tiongkok / Cina 🇨🇳", hint: "Negara asal bahasa Mandarin." },
  "中文": { pinyin: "zhōngwén", meaning: "Bahasa Mandarin 🈴", hint: "Bahasa dan tulisan Tionghoa." },
  "中午": { pinyin: "zhōngwǔ", meaning: "Siang Hari (12.00) ☀️", hint: "Waktu tepat tengah hari." },
  "中学": { pinyin: "zhōngxué", meaning: "Sekolah Menengah (SMP/SMA)", hint: "Tingkat sekolah remaja." },
  "中学生": { pinyin: "zhōngxuéshēng", meaning: "Siswa SMP / SMA", hint: "Pelajar sekolah menengah." },
  "住": { pinyin: "zhù", meaning: "Tinggal / Bermalam 🛋️", hint: "Menetap di suatu tempat." },
  "桌子": { pinyin: "zhuōzi", meaning: "Meja 🪑", hint: "Mebel meja." },
  "字": { pinyin: "zì", meaning: "Karakter / Tulisan ✍️", hint: "Huruf tulisan." },
  "坐": { pinyin: "zuò", meaning: "Duduk / Naik Kendaraan 🪑", hint: "Misal: 坐车 (naik mobil)." },
  "做": { pinyin: "zuò", meaning: "Membuat / Melakukan", hint: "Bekerja atau membuat karya." },
  "做饭": { pinyin: "zuò fàn", meaning: "Memasak 🍳", hint: "Menyiapkan masakan lezat." },
  "昨天": { pinyin: "zuótiān", meaning: "Kemarin 🕒", hint: "Hari sebelum hari ini." }
};

// Reassuring Quotes Array
const ZEN_QUOTES = [
  "Satu kata per waktu. Nggak usah buru-buru~ 🍵",
  "Pelan tapi konsisten jauh lebih keren! ✨",
  "Nggak hafal Hanzi? Gak masalah sama sekali! 🍃",
  "Fokus ke bunyinya dulu, lama-lama terbiasa 😊",
  "Belajar bahasa Mandarin itu bisa santai kok! 🌸",
  "Kamu sudah melangkah 1 step lebih maju hari ini 👏"
];

// App State
let vocabularyList = [];
let currentIndex = 0;
let currentWord = null;
let sessionCount = 1;
let favorites = JSON.parse(localStorage.getItem('mandarin_chill_favs') || '[]');
let isAmbiancePlaying = false;
let audioSynthCtx = null;
let audioSynthOsc = null;
let audioSynthGain = null;

// DOM Element References
const loaderEl = document.getElementById('loading-state');
const errorEl = document.getElementById('error-state');
const cardEl = document.getElementById('flashcard');

const pinyinEl = document.getElementById('card-pinyin');
const meaningEl = document.getElementById('card-meaning');
const hintEl = document.getElementById('card-hint');
const hanziEl = document.getElementById('card-hanzi');

const hanziBoxEl = document.getElementById('hanzi-box');

const nextBtn = document.getElementById('next-word-btn');
const audioSpeechBtn = document.getElementById('audio-speech-btn');
const favToggleBtn = document.getElementById('fav-toggle-btn');

const ambianceBtn = document.getElementById('ambiance-btn');
const favTriggerBtn = document.getElementById('favorites-trigger');
const favCountBadge = document.getElementById('fav-count-badge');

const favModal = document.getElementById('fav-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const favListEl = document.getElementById('fav-list');
const emptyFavMsg = document.getElementById('empty-fav-msg');

const sessionCountEl = document.getElementById('session-count');
const zenQuoteEl = document.getElementById('zen-quote');
const retryBtn = document.getElementById('retry-btn');

const voiceRecBtn = document.getElementById('voice-rec-btn');
const voiceBtnIcon = document.getElementById('voice-btn-icon');
const voiceBtnLabel = document.getElementById('voice-btn-label');
const speechFeedbackBox = document.getElementById('speech-feedback-box');
const speechFeedbackIcon = document.getElementById('speech-feedback-icon');
const speechFeedbackText = document.getElementById('speech-feedback-text');

const toggleMeaningBtn = document.getElementById('toggle-meaning-btn');
const toggleHanziBtn = document.getElementById('toggle-hanzi-btn');
const repeatCardBtn = document.getElementById('repeat-card-btn');
const meaningDisplayContainer = document.getElementById('meaning-display-container');

// Obscure / Blur all answers on current card
function obscureAll() {
  if (meaningEl) meaningEl.classList.add('obscured');
  if (hintEl) hintEl.classList.add('obscured');
  if (hanziEl) hanziEl.classList.add('obscured');
}

// Individual Toggle Functions
function toggleMeaningObscured() {
  if (meaningEl) meaningEl.classList.toggle('obscured');
  if (hintEl) hintEl.classList.toggle('obscured');
}

function toggleHanziObscured() {
  if (hanziEl) hanziEl.classList.toggle('obscured');
}

// Repeat Card Action (Hide All Answers)
function repeatCurrentCard() {
  obscureAll();
  showToast("🔑 Kartu diulang~ Semua jawaban disembunyikan!");
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
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
    console.warn("Fetch failed or blocked, falling back to rich embedded dictionary:", err);
    // Fallback using dictionary directly so app is 100% reliable
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
    
    // Look up in dictionary or construct fallback
    if (HSK_DICTIONARY[cleanedHanzi]) {
      parsedWords.push({
        hanzi: cleanedHanzi,
        pinyin: HSK_DICTIONARY[cleanedHanzi].pinyin,
        meaning: HSK_DICTIONARY[cleanedHanzi].meaning,
        hint: HSK_DICTIONARY[cleanedHanzi].hint
      });
    } else if (cleanedHanzi.length > 0) {
      // Smart Fallback
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
  } else {
    buildVocabularyFromDictionary();
  }
}

// Build Vocabulary directly from Dictionary Map if offline/failed fetch
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
}

// Display Current Micro-Dosing Flashcard
function displayCurrentWord() {
  if (vocabularyList.length === 0) return;

  currentWord = vocabularyList[currentIndex];

  // Update DOM with smooth transitions
  cardEl.classList.remove('slide-next');
  void cardEl.offsetWidth; // Trigger reflow for restart animation
  cardEl.classList.add('slide-next');

  pinyinEl.textContent = currentWord.pinyin;
  meaningEl.textContent = currentWord.meaning;
  hintEl.textContent = currentWord.hint || "Satu kata per waktu ☕";
  hanziEl.textContent = currentWord.hanzi;

  // Obscure / Blur all answers by default for the new card
  obscureAll();

  // Hide Speech Feedback Box for new word
  hideSpeechFeedback();

  // Check Favorite State
  updateFavHeartState();

  // Randomize Zen Quote periodically
  if (sessionCount % 3 === 0) {
    const randomQuote = ZEN_QUOTES[Math.floor(Math.random() * ZEN_QUOTES.length)];
    zenQuoteEl.textContent = randomQuote;
  }
}

// Next Word Action
function handleNextWord() {
  currentIndex = (currentIndex + 1) % vocabularyList.length;
  sessionCount++;
  sessionCountEl.textContent = `Kata ke-${sessionCount} hari ini`;
  displayCurrentWord();
}

// Speech Synthesis (Chinese Pronunciation Audio)
function playSpeechPronunciation(textToSpeak) {
  if (!('speechSynthesis' in window)) {
    showToast("Fitur audio tidak didukung di browser ini.");
    return;
  }

  // Cancel previous speech
  window.speechSynthesis.cancel();

  const text = textToSpeak || currentWord.hanzi || currentWord.pinyin;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN'; // Chinese Mandarin
  utterance.rate = 0.75; // Slower/relaxed rate
  utterance.pitch = 0.85; // Lower, soft, non-piercing pitch

  audioSpeechBtn.classList.add('playing');
  utterance.onend = () => audioSpeechBtn.classList.remove('playing');
  utterance.onerror = () => audioSpeechBtn.classList.remove('playing');

  window.speechSynthesis.speak(utterance);
}

// Fitur Input Suara & Evaluasi Pelafalan (Speech Recognition)
let recognition = null;
let isListening = false;

function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const rec = new SpeechRecognition();
  rec.lang = 'zh-CN'; // Pengaturan Bahasa Mandarin
  rec.continuous = false;
  rec.interimResults = false;
  rec.maxAlternatives = 3;

  rec.onstart = () => {
    isListening = true;
    voiceRecBtn.classList.add('listening');
    voiceBtnIcon.textContent = '🎙️';
    voiceBtnLabel.textContent = 'Mendengarkan...';
    hideSpeechFeedback();
  };

  rec.onresult = (event) => {
    isListening = false;
    voiceRecBtn.classList.remove('listening');
    voiceBtnIcon.textContent = '🎙️';
    voiceBtnLabel.textContent = 'Coba Ucapkan';

    if (event.results && event.results.length > 0) {
      const recognizedText = event.results[0][0].transcript;
      evaluatePronunciation(recognizedText);
    }
  };

  rec.onerror = (event) => {
    isListening = false;
    voiceRecBtn.classList.remove('listening');
    voiceBtnIcon.textContent = '🎙️';
    voiceBtnLabel.textContent = 'Coba Ucapkan';

    if (event.error === 'no-speech') {
      showSpeechFeedback(false, "Suara tidak terdengar. Coba dekatkan mikrofon dan ulangi lagi ya 🎧");
    } else if (event.error === 'not-allowed') {
      showToast("Izin mikrofon diperlukan untuk mencoba pelafalan 🎤");
    } else {
      showSpeechFeedback(false, "Hampir tepat! Coba dengarkan lagi suaranya dan ulangi perlahan 🎧");
    }
  };

  rec.onend = () => {
    isListening = false;
    voiceRecBtn.classList.remove('listening');
    voiceBtnIcon.textContent = '🎙️';
    voiceBtnLabel.textContent = 'Coba Ucapkan';
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
    recognition.stop();
    return;
  }

  if (!recognition) {
    recognition = initSpeechRecognition();
  }

  try {
    recognition.start();
  } catch (err) {
    console.warn("Speech recognition error:", err);
  }
}

// Compare recognized speech with current active word
function evaluatePronunciation(transcript) {
  if (!currentWord) return;

  const targetHanzi = (currentWord.hanzi || '').trim();
  const targetPinyinClean = (currentWord.pinyin || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
  const transcriptClean = transcript.trim().toLowerCase();
  const transcriptAlpha = transcriptClean.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");

  let isMatch = false;

  // Matching check (Hanzi character or Pinyin phonetic match)
  if (transcriptClean.includes(targetHanzi) || targetHanzi.includes(transcriptClean)) {
    isMatch = true;
  } else if (targetPinyinClean.length > 0 && transcriptAlpha.length > 0) {
    if (transcriptAlpha.includes(targetPinyinClean) || targetPinyinClean.includes(transcriptAlpha)) {
      isMatch = true;
    }
  }

  if (isMatch) {
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
    speechFeedbackIcon.textContent = '✨';
  } else {
    speechFeedbackBox.classList.add('try-again');
    speechFeedbackIcon.textContent = '🎧';
  }
  speechFeedbackText.textContent = message;
}

function hideSpeechFeedback() {
  if (speechFeedbackBox) {
    speechFeedbackBox.classList.add('hidden');
  }
}

// Web Audio API Ambient Sound Synthesizer (Cozy Lo-Fi Ambient Rain)
function toggleAmbientSound() {
  if (isAmbiancePlaying) {
    stopAmbientSound();
  } else {
    startAmbientSound();
  }
}

function startAmbientSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioSynthCtx = new AudioContext();

    // Create Cozy Pink/Brown Noise Generator for Rain Sound
    const bufferSize = audioSynthCtx.sampleRate * 2;
    const noiseBuffer = audioSynthCtx.createBuffer(1, bufferSize, audioSynthCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02; // Brown/Pink soothing noise filter
      lastOut = output[i];
    }

    const whiteNoise = audioSynthCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Soft Lowpass Filter for Gentle Rain Tone
    const filter = audioSynthCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600; // Warm soft rain frequency

    audioSynthGain = audioSynthCtx.createGain();
    audioSynthGain.gain.setValueAtTime(0.08, audioSynthCtx.currentTime); // Very soft volume

    whiteNoise.connect(filter);
    filter.connect(audioSynthGain);
    audioSynthGain.connect(audioSynthCtx.destination);

    whiteNoise.start();
    audioSynthOsc = whiteNoise;

    isAmbiancePlaying = true;
    ambianceBtn.classList.add('active');
    showToast("🌧️ Lofi rain sound diaktifkan~ Sampai tenang!");
  } catch (e) {
    console.warn("Ambient sound error:", e);
    showToast("Audio ambiance tidak dapat diputar.");
  }
}

function stopAmbientSound() {
  if (audioSynthOsc) {
    try { audioSynthOsc.stop(); } catch(e){}
  }
  if (audioSynthCtx) {
    try { audioSynthCtx.close(); } catch(e){}
  }
  isAmbiancePlaying = false;
  ambianceBtn.classList.remove('active');
  showToast("Audio rain dimatikan.");
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
    showToast("⭐ Kata berhasil disimpan ke favorit!");
  }

  localStorage.setItem('mandarin_chill_favs', JSON.stringify(favorites));
  updateFavHeartState();
  updateFavBadge();
}

function updateFavHeartState() {
  if (!currentWord) return;
  const isFav = favorites.some(item => item.pinyin === currentWord.pinyin);
  if (isFav) {
    favToggleBtn.classList.add('is-fav');
  } else {
    favToggleBtn.classList.remove('is-fav');
  }
}

function updateFavBadge() {
  favCountBadge.textContent = favorites.length;
}

// Render Favorites Modal List
function renderFavoritesList() {
  favListEl.innerHTML = '';

  if (favorites.length === 0) {
    emptyFavMsg.classList.remove('hidden');
    return;
  }

  emptyFavMsg.classList.add('hidden');

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

    // Speech btn inside modal
    li.querySelector('.speech-fav-btn').addEventListener('click', () => {
      playSpeechPronunciation(word.hanzi || word.pinyin);
    });

    // Remove btn inside modal
    li.querySelector('.remove-fav-btn').addEventListener('click', () => {
      favorites.splice(idx, 1);
      localStorage.setItem('mandarin_chill_favs', JSON.stringify(favorites));
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

  // Repeat Card Button (Obscure All Answers Again)
  if (repeatCardBtn) {
    repeatCardBtn.addEventListener('click', repeatCurrentCard);
  }

  // Small Individual Toggles
  if (toggleMeaningBtn) {
    toggleMeaningBtn.addEventListener('click', toggleMeaningObscured);
  }

  if (toggleHanziBtn) {
    toggleHanziBtn.addEventListener('click', toggleHanziObscured);
  }

  // Direct Click/Tap on Blurred Containers to Toggle Blur
  if (meaningDisplayContainer) {
    meaningDisplayContainer.addEventListener('click', toggleMeaningObscured);
  }

  if (hanziBoxEl) {
    hanziBoxEl.addEventListener('click', toggleHanziObscured);
  }

  // Audio Speech Button
  if (audioSpeechBtn) {
    audioSpeechBtn.addEventListener('click', () => {
      playSpeechPronunciation();
    });
  }

  // Voice Recognition Button (Speech Input & Evaluation)
  if (voiceRecBtn) {
    voiceRecBtn.addEventListener('click', handleVoiceRecognitionToggle);
  }

  // Favorite Heart Toggle
  if (favToggleBtn) {
    favToggleBtn.addEventListener('click', toggleFavorite);
  }

  // Ambiance Sound Toggle
  if (ambianceBtn) {
    ambianceBtn.addEventListener('click', toggleAmbientSound);
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
      }
    });
  }

  // Retry Button on error
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      loadVocabularyData();
    });
  }

  // Keyboard Shortcuts (Spacebar or Right Arrow = Next Word)
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowRight') {
      // Avoid triggering when modal is open
      if (favModal && favModal.classList.contains('hidden')) {
        e.preventDefault();
        handleNextWord();
      }
    }
  });
}

// Helper Utilities
function showState(state) {
  loaderEl.classList.add('hidden');
  errorEl.classList.add('hidden');
  cardEl.classList.add('hidden');

  if (state === 'loading') loaderEl.classList.remove('hidden');
  else if (state === 'error') errorEl.classList.remove('hidden');
  else if (state === 'card') cardEl.classList.remove('hidden');
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
