const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const cloudinaryUpload = require('../modules/cloudinary-config');

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

  // POST to add a new offer
  router.post('/', rejectUnauthenticated, cloudinaryUpload.single("image"), async (req, res) => {
    console.log('sent to cloudinary: ', req.file)
    console.log('post body', req.body)

    const userId = req.user.id;
    const groupId = req.user.group_id;
    const imgPath = req.file.path;
    const categoryType = req.body.category_type;
    const itemName = req.body.item_name;
    const itemDescription = req.body.description;
    const perishableItem = req.body.perishable;
    const homemadeItem = req.body.homemade;
    const offerDate = req.body.offered_on;
    const bestByDate = req.body.best_by;
    const expiryDate = req.body.expires_on;

    const connection = await pool.connect()
    try {
      await connection.query('BEGIN');
      // insert category type into categories table and return category id
      const addCategory = `INSERT INTO categories (category_type) VALUES ($1) RETURNING id;`
      const result = await connection.query(addCategory, [categoryType]);
    
      const categoryId = result.rows[0].id;
      // use the newly returned category id to add the new offer
      const addNewOffer = `
      INSERT INTO offers
        (user_id, group_id, category_id, item_name, description, perishable, homemade, imgpath, offered_on, best_by, expires_on)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
        `
      await connection.query(addNewOffer, [userId, groupId, categoryId, itemName, itemDescription, perishableItem, homemadeItem, imgPath, offerDate, bestByDate, expiryDate])
      await connection.query('COMMIT');
      res.sendStatus(200);
    } catch (error) {
      await connection.query('ROLLBACK');
      console.log('Error adding new offer - rolling back offer', error)
      res.sendStatus(500);
    } finally {
      connection.release()
    }
  });

module.exports = router;