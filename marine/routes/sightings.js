const express = require('express');
const router = express.Router();
const { getAll, getSightingsBySpecies, getSightingsByReseachers, getSightingsByHabitat, addOne, deleteOne} = require('../db/queries/sightings_q.js');

router.get('/', getAll);
router.get('/species/:id', getSightingsBySpecies);
router.get('/researchers/:id', getSightingsByReseachers);
router.get('/habitats/:id', getSightingsByHabitat)
router.post('/', addOne);
router.delete('/:id', deleteOne)


module.exports = router;
