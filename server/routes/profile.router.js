const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const pool = require('../modules/pool');


const router = express.Router();

// gets user profile information to display on user profile page
router.get("/", async (req, res) => {
    // sets userCurrent with id
    const userCurrent = req.user.id;

    const connection = await pool.connect()

    try {
        await connection.query('BEGIN');
        //gets all information for the profile page
        const sqlProfileInfo = `
        SELECT name, homemade_pref, about, imgpath, allergy_type, restriction_type   
        FROM "user_profile" 
        JOIN allergies 
        ON "user_profile".id = allergies."user_id"
        JOIN dietary_restrictions 
        ON "user_profile".id = dietary_restrictions."user_id"
        WHERE "user_profile".id = $1
        ;`
        const reply = await connection.query(sqlProfileInfo, [4]);
        console.log('reply', reply.rows[0])

        await connection.query('COMMIT');
        //   sends object with: {name, homemade_pref, about, imgpath, allergy_type, and diet_type} 
        res.send(reply.rows)
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log(`Transaction Error - Rolling back new account`, error);
        res.sendStatus(500);
    } finally {
        connection.release()
    }
});

//POST to add user profile information and preferences to user_profile table in DB
router.post('/', async (req, res) => {
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
    console.log(userId)
  
    const connection = await pool.connect()
    try {
      await connection.query('BEGIN');
  
      // posts user info on user_profile table
      const sqlUserInfo = `INSERT INTO "user_profile"
      ("user_id", "name","homemade_pref", "about", "imgpath")
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


// PUT route to make changes to title, descripotion and tags of clip
router.put("/", async (req, res) => {
    // destructures out all the information that will be updated
    const
        [
            id,
            name,
            homemade_pref,
            about,
            imgpath,
            allergy_type,
            restriction_type
        ]
            =
            [
                req.body.id,
                req.body.name,
                req.body.homemade_pref,
                req.body.about,
                req.body.imgpath,
                req.body.allergy_type,
                req.body.restriction_type
            ]
    console.log('name, homemade_pref, about, imgpath, allergy_type, restriction_type',
        name,
        homemade_pref,
        about,
        imgpath,
        allergy_type,
        restriction_type)

    const connection = await pool.connect()
    try {
        await connection.query('BEGIN');

        // updates info on the user table
        const sqlUpdateUser = `
        UPDATE "user_profile"
        SET name = $2, homemade_pref = $3, about = $4, imgpath = $5
        WHERE id = $1
        ;`
        await connection.query(sqlUpdateUser, [id, name, homemade_pref, about, imgpath])
        // updates info on the allergies table
        const sqlUpdateAllergies = `
        UPDATE allergies
        SET allergy_type = $2
        WHERE id = $1
        ;`
        await connection.query(sqlUpdateAllergies, [id, allergy_type])
        // updates info on the dietary_restrictions table
        const sqlUpdateDietary = `
        UPDATE dietary_restrictions
        SET restriction_type = $2
        WHERE id = $1
        ;`
        await connection.query(sqlUpdateDietary, [id, restriction_type])

        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log(`Transaction Error - Rolling back new account`, error);
        res.sendStatus(500);
    } finally {
        connection.release()
    }
});

module.exports = router;