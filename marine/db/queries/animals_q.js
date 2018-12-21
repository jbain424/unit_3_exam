const { db } = require('./index.js');

const getAll = (req, res, next) => {
  db.any('SELECT * FROM animals')
  .then(data => {
    res.status(200)
    .json({
      status: "success",
      data: data,
      message: "Got All Animals!"
    });
  })
  .catch(err => next(err))
};

const getOne = (req, res, next) => {
  let userId = parseInt(req.params.id)
  db.one('SELECT * FROM animals WHERE id=$1', userId)
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Got ONE Animal!'
    })
  })
  .catch(err => next(err))
};

const addOne = (req, res, next) => {
  db.none('INSERT INTO animals (species_id, nickname) VALUES (${species_id}, ${nickname})', req.body)
  .then(data => {
    res.status(200)
    .json({
      status: "success",
      data: data,
      message: "Created A New Animal!"
    });
  })
  .catch(err => next(err))
}

const updateOne = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ")
  db.none(
      "UPDATE animals SET " + queryString + " WHERE id=" + req.params.id, req.body
    )
    .then(() => {
      res.status(200)
      .json({
        status: "success",
        message: "Updated an Animal!!"
      });
    })
    .catch(err => next(err));
};

const deleteOne = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.result('DELETE FROM animals WHERE id=$1', userId)
  .then((result) => {
    res.status(200)
  .json({
    status: 'success',
    message: 'This Animal Has Been Deleted',
    result: result
  })
})
  .catch(err => next(err));
}

module.exports = { getAll, getOne, addOne, updateOne, deleteOne };
