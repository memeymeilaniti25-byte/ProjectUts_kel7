const hitungStatistik = (laporan) => {

    console.log("DATA MASUK:", laporan);

    for (let i = 0; i < laporan.length; i++) {
        console.log("Jenis laporan ke-" + i + ":", laporan[i].jenisLaporan);
    }

    let totalHilang = 0;
    let totalDitemukan = 0;

    for (let i = 0; i < laporan.length; i++) {
        if (laporan[i].jenisLaporan === "Hilang") {
            totalHilang++;
        } else if (laporan[i].jenisLaporan === "Ditemukan") {
            totalDitemukan++;
        }
    }

    return {
        totalLaporan: totalHilang + totalDitemukan,
        totalHilang,
        totalDitemukan
    };
};

module.exports = hitungStatistik;