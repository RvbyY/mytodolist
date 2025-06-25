// GET /users/:id — or email if it’s an email
router.get('/users/:value', auth, async (req, res) => {
    const value = req.params.value;
    const query = isNaN(value)
        ? 'SELECT * FROM user WHERE email = ?'
        : 'SELECT * FROM user WHERE id = ?';

    try {
        const [users] = await db.promise().query(query, [value]);
        if (users.length === 0) {
            return res.status(404).json({ msg: "Not found" });
        }
        res.status(200).json(users[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// PUT /users/:id — update user
router.put('/users/:id', auth, async (req, res) => {
    const id = req.params.id;
    const { email, password, firstname, name } = req.body;

    if (!email || !password || !firstname || !name) {
        return res.status(400).json({ msg: "Bad parameter" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.promise().query(
            'UPDATE user SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?',
            [email, hashedPassword, firstname, name, id]
        );

        const [updated] = await db.promise().query('SELECT * FROM user WHERE id = ?', [id]);
        res.status(200).json(updated[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// DELETE /users/:id
router.delete('/users/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        const [result] = await db.promise().query('DELETE FROM user WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "Not found" });
        }
        res.status(200).json({ msg: `Successfully deleted record number: ${id}` });
    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: "Internal server error" });
    }
});