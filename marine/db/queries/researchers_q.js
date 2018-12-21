const { db } = require('./index.js');

const getAll = (req, res, next) => {
  db.any('SELECT * FROM researchers')
  .then(data => {
    res.status(200)
    .json({
      status: "success",
      data: data,
      message: "Got All Researchers!"
    });
  })
  .catch(err => next(err))
};

const getOne = (req, res, next) => {
  let userId = parseInt(req.params.id)
  db.one('SELECT * FROM researchers WHERE id=$1', userId)
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Got ONE user!'
    })
  })
  .catch(err => next(err))
};

const addOne = (req, res, next) => {
  db.none('INSERT INTO researchers (name, job_title) VALUES (${name}, ${job_title})', req.body)
  .then(data => {
    res.status(200)
    .json({
      status: "success",
      data: data,
      message: "Created New Researcher!"
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
      "UPDATE researchers SET " + queryString + " WHERE id=" + req.params.id, req.body
    )
    .then(() => {
      res.status(200)
      .json({
        status: "success",
        message: "Updated a Researcher!!"
      });
    })
    .catch(err => next(err));
};

const deleteOne = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.result('DELETE FROM researchers WHERE id=$1', userId)
  .then((result) => {
    res.status(200)
  .json({
    status: 'success',
    message: 'This Researcher Has Been Deleted',
    result: result
  })
})
  .catch(err => next(err));
}

module.exports = { getAll, getOne, addOne, updateOne, deleteOne };
