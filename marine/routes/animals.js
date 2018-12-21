const express = require('express');
const router = express.Router();
const { getAll, getOne, addOne, updateOne, deleteOne } = require('../db/queries/animals_q.js');

router.get('/', getAll);
router.get('/:id', getOne)
router.post('/', addOne)
router.patch('/:id', updateOne)
router.delete('/:id', deleteOne)


module.exports = router;
