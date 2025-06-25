const dotenv = require('dotenv');
const express = require('express');
const db = require('./config/db');
const authRoutes = require('./routes/auth/auth');
const userRoutes = require('./routes/user/user');
const tokenRoutes = require('./routes/todos/todos')
const notFound = require('./middleware/notFound')

dotenv.config();
const app = express();
app.use(express.json());

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', tokenRoutes);
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port: ${process.env.PORT || 3000}`);
});
