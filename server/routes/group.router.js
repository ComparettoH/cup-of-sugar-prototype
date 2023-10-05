const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const pool = require('../modules/pool');


const router = express.Router();

// GET for Group information
router.get('/', async (req, res) => {
    const userGroupID = req.user.group_id
    const connection = await pool.connect()

    try {
        await connection.query('BEGIN');
        //gets group name and drop off location
        const groupQueryText = `SELECT * FROM "group"
      WHERE id = $1`

        const reply1 = await connection.query(groupQueryText, [userGroupID]);
        console.log('group information GET', reply1.rows)

        //gets group members that are part of group
        const groupMemberQuery = `SELECT * FROM "user"
      WHERE group_id = $1`

        const reply2 = await connection.query(groupMemberQuery, [userGroupID])
        console.log('group member GET', reply2.rows)

        await connection.query('COMMIT');

        res.send({ groupInfo: reply1.rows, groupMembers: reply2.rows })
    }
    catch (err) {
        await connection.query('ROLLBACK');
        console.log('Error with GET for group information', err);
        res.sendStatus(500);
    } finally {
        connection.release()
    }
})

module.exports = router;