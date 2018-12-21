const { db } = require('./index.js');

const getAll = (req, res, next) => {
  db.any('SELECT * FROM sightings')
  .then(data => {
    res.status(200)
    .json({
      status: "success",
      data: data,
      message: "Got All Sightings!"
    });
  })
  .catch(err => next(err))
};


const getSightingsBySpecies = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.any('SELECT * FROM sightings WHERE species_id=$1', [userId])
    .then(data => {
      res.status(200)
      .json({
        status: "success",
        data: data,
        message: "ALL sightings of a specific species!",
      });
    })
    .catch(err => next(err));
};

const getSightingsByReseachers = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.any('SELECT * FROM sightings WHERE researchers_id=$1', [userId])
    .then(data => {
      res.status(200)
      .json({
        status: "success",
        data: data,
        message: "ALL sightings for a specific researcher!",
      });
    })
    .catch(err => next(err));
};

const getSightingsByHabitat = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.any('SELECT * FROM sightings WHERE habitat_id=$1', [userId])
    .then(data => {
      res.status(200)
      .json({
        status: "success",
        data: data,
        message: "ALL sightings for a specific habitat!",
      });
    })
    .catch(err => next(err));
};

const addOne = (req, res, next) => {
  db.none('INSERT INTO sightings (researchers_id, species_id, habitat_id) VALUES (${researchers_id}, ${species_id}, ${habitat_id})', req.body)
  .then(data => {
    res.status(200)
    .json({
      status: "success",
      data: data,
      message: "Created A New Sighting!"
    });
  })
  .catch(err => next(err))
}

const deleteOne = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.result('DELETE FROM sightings WHERE id=$1', userId)
  .then((result) => {
    res.status(200)
  .json({
    status: 'success',
    message: 'This Sighting Has Been Deleted',
    result: result
  })
})
  .catch(err => next(err));
}


module.exports = { getAll, getSightingsBySpecies, getSightingsByReseachers, getSightingsByHabitat, addOne, deleteOne }
