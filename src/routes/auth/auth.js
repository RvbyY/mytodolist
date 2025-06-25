const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');

router.post('/register', async (req, res) => {
    const { email, password, name, firstname } = req.body;

    if (!email || !password || !name || !firstname) {
        return res.status(400).json({ msg: "Bad parameter" });
    }

    const [existing] = await db.promise().query('SELECT id FROM user WHERE email = ?', [email]);
    if (existing.length > 0) {
        return res.status(409).json({ msg: "Account already exists" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.promise().query(
            'INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, name, firstname]
        );
        const [newUser] = await db.promise().query('SELECT id FROM user WHERE email = ?', [email]);
        const token = jwt.sign({ id: newUser[0].id }, process.env.SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Bad parameter" });
    }

    try {
        const [users] = await db.promise().query('SELECT * FROM user WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1h'});
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;
