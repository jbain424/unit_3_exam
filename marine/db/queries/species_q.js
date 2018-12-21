const { db } = require('./index.js');

const getAll = (req, res, next) => {
  db.any('SELECT * FROM species')
  .then(data => {
    res.status(200)
    .json({
      status: "success",
      data: data,
      message: "Got All Species!"
    });
  })
  .catch(err => next(err))
};

const getOne = (req, res, next) => {
  let userId = parseInt(req.params.id)
  db.one('SELECT * FROM species WHERE id=$1', userId)
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Got ONE species!'
    })
  })
  .catch(err => next(err))
};

const addOne = (req, res, next) => {
  db.none('INSERT INTO species (name, is_mammal) VALUES (${name}, ${is_mammal})', req.body)
  .then(data => {
    res.status(200)
    .json({
      status: "success",
      data: data,
      message: "Created New Species"
    });
  })
  .catch(err => next(err))
};

module.exports = { getAll, getOne, addOne };
