const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const pool = require('../modules/pool');


const router = express.Router();

// GET for ALL of group's offer posts for activity feed
router.get('/', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()){
      const queryText = `
      SELECT *
      FROM "offers"
      JOIN "user_profile"
      ON offers."user_id" = user_profile."user_id"
      WHERE group_id = $1;
      `
  
      pool.query(queryText, [req.user.group_id])
      .then( (result) => {
      res.send(result.rows);
      })
      .catch((err) => {
        console.log('Error with GET for group offer activity', err);
        res.sendStatus(500);
      })}
    else {
      res.sendStatus(403);
    }
  });

module.exports = router;