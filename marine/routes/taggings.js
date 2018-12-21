const express = require('express');
const router = express.Router();
const { getAll, getOne, getTagsByResearcher, getTagsByAnimal, addOne } = require('../db/queries/taggings_q.js');

router.get('/', getAll);
router.get('/:id', getOne);
router.get('/researchers/:id', getTagsByResearcher);
router.get('/animals/:id', getTagsByAnimal)
router.post('/', addOne);


module.exports = router;
