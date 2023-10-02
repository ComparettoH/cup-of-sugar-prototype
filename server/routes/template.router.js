const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//GET to view allergy options
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "allergies";`
  pool.query(queryText)
  .then( (result) => {
    res.send(result.rows);
  })
  .catch((err) => {
    console.log('Error with GET for allergies', err);
    res.sendStatus(500);
  })
});

//GET to view dietary options
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "dietary_restrictions";`
  pool.query(queryText)
  .then( (result) => {
    res.send(result.rows);
  })
  .catch((err) => {
    console.log('Error with GET for dietary_restrictions', err);
    res.sendStatus(500);
  })
});

//POST to add user profile information
router.post('/user', rejectUnauthenticated,(req, res) => {
  const userId = req.user.id
  const userInfo = req.body;
  console.log('in newUserInfo post', req.body.homemade_pref, req.body.about, req.body.imgpath, req.body.role, req.body.allergies, req.body.dietary_restrictions)
  console.log([req.user.id])
  const queryText = `INSERT INTO "user_profile"(
    "user_id", "homemade_pref", "about", "imgpath", "role", "allergies", dietary_restrictions)
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    const queryValues = [
      userId,
      userInfo.homemade_pref,
      userInfo.about,
      userInfo.imgpath,
      userInfo.role,
      userInfo.allergies,
      userInfo.dietary_restrictions
    ];
    pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201) })
    .catch((err) => {
      console.log('Error completing POST userInfo query', err);
      res.sendStatus(500)
    })
})

module.exports = router;
