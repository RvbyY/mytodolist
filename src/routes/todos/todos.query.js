router.get('/todos:id', auth, async (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM todo WHERE id = ?';
    try {
        const [todos] = await db.promise().query(query, [id]);
        if (todos.length == 0) {
            return res.status(404).json({msg: "Not found"});
        }
        res.status(200).json(todos[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "Internal server error"});
    }
});

router.post('/todos', auth, async (req, res) => {
    const {title, description, due_time, user_id, status} = req.body;

    if (!title || !description || due_time || user_id || !status)
        return res.status(400).json({msg: "Bad parameter"});
    try {
        const [todos] = await db.promise().query('SELECT * FROM todo WHERE title = ?', [title]);
        if (user.length === 0)
            return res.status(401).json({msg: "Invalid Credentials"});
        const todo = todos[0];
        const token = jwt.sign({id: todo.id}, process.env.SECRET, {expiresIn: '1h'});
        res.status(200).json({token});
    } catch(err) {
        console.error(err);
        res.status(500).json({msg: "Internal server error"});
    }
});

router.put('/todos/:id', auth, async (req, res) => {
    const id = req.params.id;
    const {title, description, due_time, user_id, status} = req.body;

    if (!title || !description || !due_time || !user_id || !status) {
        return res.status(400).json({msg: "bad parameter"});
    }
    try {
        const [user] = await db.promise().query('SELECT * FROM user WHERE id = ?', [user_id]);
        if (user.length == 0) {
            return res.status(404).json({msg: "User not found"});
        }
        const [updateResult] = await db.promise().query(
            'UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?',
            [title, description, due_time, user_id, status, id]
        );
        const [updateTodo] = await db.promise().query('SELECT * FROM todo WHERE id = ?', [id]);
        res.status(200).json(updateTodo[0]);
    } catch(err) {
        console.error(err);
        res.status(500).json({msg: "Internal server error"});
    }
});

router.delete('/todos/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        const [result] = await db.promise().query('DELETE FROM todo WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "Not found" });
        }
        res.status(200).json({ msg: `Successfully deleted record number: ${id}` });
    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: "Internal server error" });
    }
});
