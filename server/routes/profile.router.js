const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const pool = require('../modules/pool');


const router = express.Router();

// gets user profile information to display on user profile page
router.get("/", async (req, res) => {
    // const userCurrent = req.user.id;

    const connection = await pool.connect()
  
    try {
      await connection.query('BEGIN');
  //gets all information for the profile page
      const sqlProfileInfo =`
        SELECT name, homemade_pref, about, imgpath, allergies.type as allergy_type, dietary_restrictions.type as diet_type   
        FROM "user" 
        JOIN allergies 
        ON "user".id = allergies."user_id"
        JOIN dietary_restrictions 
        ON "user".id = dietary_restrictions."user_id"
        WHERE "user".id = $1
        ;`
      const reply = await connection.query(sqlProfileInfo, [4]);
      console.log('reply', reply.rows[0])
    //   const projectID = reply.rows[0].project_id;
    //   const sqlQuery = `
    //     SELECT clip.id, clip.title, clip.description, clip.public_id, tag.tag
    //     FROM clip
    //     JOIN clip_tag
    //     ON clip.id = clip_tag.clip_id
    //     JOIN tag
    //     ON clip_tag.tag_id = tag.id
    //     WHERE project_id = $1
    //     ;`
    //   // Save the result so we can get the returned value
    //   const result = await connection.query(sqlQuery, [projectID]);
  
      await connection.query('COMMIT');
      res.send(reply.rows)
    } catch (error) {
      await connection.query('ROLLBACK');
      console.log(`Transaction Error - Rolling back new account`, error);
      res.sendStatus(500);
    } finally {
      connection.release()
    }
  });

  module.exports = router;