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

module.exports = router;

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
            diet_type
        ]
            =
            [
                req.body.id, 
                req.body.name, 
                req.body.homemade_pref, 
                req.body.about, 
                req.body.imgpath, 
                req.body.allergy_type, 
                req.body.diet_type
            ]
            console.log('name, homemade_pref, about, imgpath, allergy_type, diet_type',    
            name, 
            homemade_pref, 
            about, 
            imgpath, 
            allergy_type, 
            diet_type)

    const connection = await pool.connect()
    try {
        await connection.query('BEGIN');

        // updates info on the user table
        const sqlUpdateUser = `
        UPDATE "user"
        SET name = $2, homemade_pref = $3, about = $4, imgpath = $5
        WHERE id = $1
        ;`
        await connection.query(sqlUpdateUser, [4, name, homemade_pref, about, imgpath])
        // updates info on the allergies table
        const sqlUpdateAllergies = `
        UPDATE allergies
        SET type = $2
        WHERE id = $1
        ;`
        await connection.query(sqlUpdateAllergies, [4, allergy_type])
// updates info on the dietary_restrictions table
        const sqlUpdateDietary = `
        UPDATE dietary_restrictions
        SET type = $2
        WHERE id = $1
        ;`
        await connection.query(sqlUpdateDietary, [4, diet_type])

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