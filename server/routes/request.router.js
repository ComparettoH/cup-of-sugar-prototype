const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const pool = require('../modules/pool');

const router = express.Router();

// POST to add a new request
router.post('/', rejectUnauthenticated, async (req, res) => {
    const userId = req.user.id;
    const groupId = req.user.group_id;
    
    const itemName = req.body.item_name;
    const itemDescription = req.body.description;
    const categoryType = req.body.category_type;
    const requestDate = req.body.requested_on;
    const expiryDate = req.body.expires_on;

    const connection = await pool.connect()
    try {
        await connection.query('BEGIN');
        // insert category type into categories table and return category id
        const addCategory = `INSERT INTO categories (category_type) VALUES ($1) RETURNING id;`
        const result = await connection.query(addCategory, [categoryType]);
        console.log('result:', result);
        const categoryId = result.rows[0].id;
        // use the newly returned category id to add the new request
        const addNewRequest = `INSERT INTO requests 
                                (item_name, description, requested_on, expires_on, category_id, user_id, group_id) 
                                VALUES ($1, $2, $3, $4, $5, $6, $7);`
        await connection.query(addNewRequest, [itemName,itemDescription, requestDate, expiryDate, categoryId, userId, groupId])
        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch(error) {
        await connection.query('ROLLBACK;');
        console.log('Error adding new request - rolling back request', error)
        res.sendStatus(500);
    } finally {
        connection.release()
    }
});


// GET for ALL of group's request posts for activity feed
router.get('/', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()){
      const queryText = `SELECT * FROM "requests"
      WHERE group_id = $1`
  
      pool.query(queryText, [req.user.group_id])
      .then( (result) => {
      res.send(result.rows);
      })
      .catch((err) => {
        console.log('Error with GET for group request activity', err);
        res.sendStatus(500);
      })}
    else {
      res.sendStatus(403);
    }
  });

module.exports = router;