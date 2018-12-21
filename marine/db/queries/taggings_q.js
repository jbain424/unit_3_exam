const { db } = require('./index.js');

const getAll = (req, res, next) => {
  db.any('SELECT * FROM taggings')
  .then(data => {
    res.status(200)
    .json({
      status: "success",
      data: data,
      message: "Got All Tags!"
    });
  })
  .catch(err => next(err))
};

const getOne = (req, res, next) => {
  let userId = parseInt(req.params.id)
  db.one('SELECT * FROM taggings WHERE id=$1', userId)
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Got ONE Tag!'
    })
  })
  .catch(err => next(err))
};
//
const getTagsByResearcher = (req, res, next) => {
  let tagId = parseInt(req.params.id);
  db.any('SELECT * FROM taggings WHERE researchers_id=$1', [tagId])
    .then(data => {
      res.status(200)
      .json({
        status: "success",
        data: data,
        message: "ALL taggings performed by a specific researcher!",
      });
    })
    .catch(err => next(err));
};

const getTagsByAnimal = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.any('SELECT * FROM taggings WHERE animal_id=$1', [userId])
    .then(data => {
      res.status(200)
      .json({
        status: "success",
        data: data,
        message: "ALL taggings performed on a specific animal!",
      });
    })
    .catch(err => next(err));
};

const addOne = (req, res, next) => {
  db.none('INSERT INTO taggings (animal_id, researchers_id) VALUES (${animal_id}, ${researchers_id})', req.body)
  .then(data => {
    res.status(200)
    .json({
      status: "success",
      data: data,
      message: "Created A New Tag!"
    });
  })
  .catch(err => next(err))
}


module.exports = { getAll, getOne, getTagsByResearcher, getTagsByAnimal, addOne }
