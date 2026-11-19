const laporan = require('../data/laporan');
console.log("Array:", Array.isArray(laporan));
console.log("Lenght:", laporan.length);
console.log("Isi:", JSON.stringify(laporan, null, 2));

const hitungStatistik = require('../utils/statistik');

const getAllLaporan = (req, res) => {

    let dataLaporan = [];

    for (let i = 0; i < laporan.length; i++) {
        dataLaporan.push(laporan[i]);
    }

    if (dataLaporan.length > 0) {
        res.status(200).json({
            pesan: "Berhasil menampilkan laporan",
            total: dataLaporan.length,
            data: dataLaporan
        });
    } else {
        res.status(404).json({
            pesan: "Belum ada laporan barang"
        });
    }
};


const getLaporanById = (req, res) => {

    const id = Number(req.params.id);
    let data = null;

    for (let i = 0; i < laporan.length; i++) {
        if (laporan[i].id === id) {
            data = laporan[i];
            break;
        }
    }

    if (data !== null) {
        res.status(200).json({
            pesan: "Detail laporan ditemukan",
            data: data
        });
    } else {
        res.status(404).json({
            pesan: "Laporan tidak ditemukan"
        });
    }
};

const addLaporan = (req, res) => {

    const {
        namaBarang,
        kategori,
        jenisLaporan,
        deskripsi,
        lokasi,
        tanggal
    } = req.body;

    if (!namaBarang || !kategori || !jenisLaporan ||
        !deskripsi || !lokasi || !tanggal) {

        return res.status(400).json({
            pesan: "Semua data harus diisi"
        });
    }

    if (jenisLaporan !== "Hilang" &&
        jenisLaporan !== "Ditemukan") {

        return res.status(400).json({
            pesan: "Jenis laporan harus Hilang atau Ditemukan"
        });
    }

    let idTerakhir = 0;

    for (let i = 0; i < laporan.length; i++) {
        if (laporan[i].id > idTerakhir) {
            idTerakhir = laporan[i].id;
        }
    }

    const idBaru = idTerakhir + 1;

    let status;

    if (jenisLaporan === "Hilang") {
        status = "Belum Ditemukan";
    } else {
        status = "Ditemukan";
    }

    const laporanBaru = {
        id: idBaru,
        namaBarang,
        kategori,
        jenisLaporan,
        deskripsi,
        lokasi,
        tanggal,
        status
    };

    laporan.push(laporanBaru);

    res.status(201).json({
        pesan: "Laporan berhasil ditambahkan",
        data: laporanBaru
    });
};


const updateLaporan = (req, res) => {

    const id = Number(req.params.id);

    const {
        namaBarang,
        kategori,
        jenisLaporan,
        deskripsi,
        lokasi,
        tanggal
    } = req.body;

    let index = -1;

    for (let i = 0; i < laporan.length; i++) {
        if (laporan[i].id === id) {
            index = i;
            break;
        }
    }

    if (index === -1) {
        return res.status(404).json({
            pesan: "Laporan tidak ditemukan"
        });
    }

    if (jenisLaporan &&
        jenisLaporan !== "Hilang" &&
        jenisLaporan !== "Ditemukan") {

        return res.status(400).json({
            pesan: "Jenis laporan tidak valid"
        });
    }

    if (namaBarang) laporan[index].namaBarang = namaBarang;
    if (kategori) laporan[index].kategori = kategori;
    if (deskripsi) laporan[index].deskripsi = deskripsi;
    if (lokasi) laporan[index].lokasi = lokasi;
    if (tanggal) laporan[index].tanggal = tanggal;

    if (jenisLaporan) {
        laporan[index].jenisLaporan = jenisLaporan;

        if (jenisLaporan === "Hilang") {
            laporan[index].status = "Belum Ditemukan";
        } else {
            laporan[index].status = "Ditemukan";
        }
    }

    res.status(200).json({
        pesan: "Laporan berhasil diperbarui",
        data: laporan[index]
    });
};


const deleteLaporan = (req, res) => {

    const id = Number(req.params.id);
    let index = -1;

    for (let i = 0; i < laporan.length; i++) {
        if (laporan[i].id === id) {
            index = i;
            break;
        }
    }

    if (index !== -1) {

        const dataTerhapus = laporan.splice(index, 1);

        res.status(200).json({
            pesan: "Laporan berhasil dihapus",
            data: dataTerhapus[0]
        });

    } else {

        res.status(404).json({
            pesan: "Laporan tidak ditemukan"
        });

    }
};


const cariLaporan = (req, res) => {

    const keyword = req.query.keyword;
    let hasilPencarian = [];

    if (!keyword) {
        return res.status(400).json({
            pesan: "Masukkan kata kunci pencarian"
        });
    }

    for (let i = 0; i < laporan.length; i++) {

        if (
            laporan[i].namaBarang.toLowerCase().includes(keyword.toLowerCase()) ||
            laporan[i].kategori.toLowerCase().includes(keyword.toLowerCase())
        ) {
            hasilPencarian.push(laporan[i]);
        }

    }

    if (hasilPencarian.length > 0) {
        res.status(200).json({
            pesan: "Barang berhasil ditemukan",
            total: hasilPencarian.length,
            data: hasilPencarian
        });
    } else {
        res.status(404).json({
            pesan: "Barang tidak ditemukan"
        });
    }
};

const getStatistik = (req, res) => {

    const hasil = hitungStatistik(laporan);
    console.log("Hasil perhitungan:", hasil);

    res.status(200).json({
        pesan: "Statistik laporan FindIt Campus",
        data: hasil
    });
};


module.exports = {
    getAllLaporan,
    getLaporanById,
    addLaporan,
    updateLaporan,
    deleteLaporan,
    cariLaporan,
    getStatistik
};
