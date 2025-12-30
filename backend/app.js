const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes')
const todoRouter = require('./routes/todo.routes');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173' 

}));
app.use('/api/auth', authRouter);
app.use('/api/todos', todoRouter);



module.exports = app;