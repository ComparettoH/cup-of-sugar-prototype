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
    .then((result) => {
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
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error with GET for dietary_restrictions', err);
      res.sendStatus(500);
    })
});

//POST to add user profile information
router.post('/user_profile', rejectUnauthenticated, async (req, res) => {
  const userId = req.user.id
  const [
    name,
    homemade_pref,
    about,
    imgpath,
    allergy_type,
    restriction_type
  ]
    =
    [
      req.body.name,
      req.body.homemade_pref,
      req.body.about,
      req.body.imgpath,
      req.body.allergy_type,
      req.body.restriction_type
    ]

  //Testing console logs
  console.log('in newUserInfo post', name, homemade_pref, about, imgpath, allergy_type, restriction_type)
  console.log([req.user.id])

  const connection = await pool.connect()
  try {
    await connection.query('BEGIN');

    // posts user info on user_profile table
    const sqlUserInfo = `INSERT INTO "user_profile"
    ("user_id", "user_name","homemade_pref", "about", "imgpath")
      VALUES ($1, $2, $3, $4, $5);`
    
    await connection.query(sqlUserInfo, [userId, name, homemade_pref, about, imgpath])
    //posts user allergy selections to allergies table
    const sqlUserAllergies = 
    `INSERT INTO "allergies"
    ("user_id", "allergy_type")
    VALUES ($1, $2);`

    await connection.query(sqlUserAllergies, [userId, allergy_type])
    //posts user dietary_restrictions to dietary_restrictions table
    const sqlUserDietary =
    `INSERT INTO "dietary_restrictions"
    ("user_id", "restriction_type")
    VALUES ($1, $2);`

  await connection.query(sqlUserDietary, [userId, restriction_type])

    await connection.query('COMMIT');
    res.sendStatus(200);
  }
  catch (err) {
    await connection.query('ROLLBACK');
    console.log(' Transaction Error - completing POST userInfo query', err);
    res.sendStatus(500)
  }
  finally {
    connection.release()
  }
});

module.exports = router;
