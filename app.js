const express = require('express');
const app = express();
const PORT = 3000;
const laporanRoutes = require('./routes/laporanRoutes');

app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).json({
        pesan: "Selamat Datang di FindIt Campus",
        deskripsi: "Sistem Informasi Barang Hilang dan Temuan di Kampus"
    });
});

app.use('/laporan', laporanRoutes);
app.listen(PORT, () => {
    console.log(`Server FindIt Campus berjalan di port ${PORT}`);
});