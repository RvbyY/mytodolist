const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const auth = require('../../middleware/auth');

router.get('/todos', auth, async (req, res) => {
    try {
        const [todos] = await db.promise().query('SELECT * FROM todo WHERE id = ?', [req.todo.id]);
        if (todos.length === 0) {
            return res.status(404).json({mes: "Not found"});
        }
        res.status(200).json(todos[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "Internal server error"});
    }
});

module.exports = router;