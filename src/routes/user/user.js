const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const auth = require('../../middleware/auth');

// GET /user — current user info
router.get('/user', auth, async (req, res) => {
    try {
        const [users] = await db.promise().query('SELECT * FROM user WHERE id = ?', [req.user.id]);
        if (users.length === 0) {
            return res.status(404).json({ msg: "Not found" });
        }
        res.status(200).json(users[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// GET /user/todos — todos of the logged-in user
router.get('/user/todos', auth, async (req, res) => {
    try {
        const [todos] = await db.promise().query('SELECT * FROM todo WHERE user_id = ?', [req.user.id]);
        res.status(200).json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;
