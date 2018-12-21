const { db } = require('./index.js');

const getAll = (req, res, next) => {
  db.any('SELECT * FROM habitats')
  .then(data => {
    res.status(200)
    .json({
      status: "success",
      data: data,
      message: "Got All habitats!"
    });
  })
  .catch(err => next(err))
};

const getOne = (req, res, next) => {
  let userId = parseInt(req.params.id)
  db.one('SELECT * FROM habitats WHERE id=$1', userId)
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Got ONE habitat!'
    })
  })
  .catch(err => next(err))
};

const addOne = (req, res, next) => {
  db.none('INSERT INTO habitats (category) VALUES (${category})', req.body)
  .then(data => {
    res.status(200)
    .json({
      status: "success",
      data: data,
      message: "Created New Habitat!"
    });
  })
  .catch(err => next(err))
};

module.exports = { getAll, getOne, addOne };
