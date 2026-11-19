const express = require('express');
const router = express.Router();

const {
    getAllLaporan,
    getLaporanById,
    addLaporan,
    updateLaporan,
    deleteLaporan,
    cariLaporan,
    getStatistik
} = require('../controllers/laporanControllers');

router.get('/', getAllLaporan);
router.get('/cari', cariLaporan);
router.get('/statistik', getStatistik);
router.get('/:id', getLaporanById);
router.post('/', addLaporan);
router.put('/:id', updateLaporan);
router.delete('/:id', deleteLaporan);

module.exports = router;