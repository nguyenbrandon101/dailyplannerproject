const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const app = express();
require('dotenv').config()
mongoose.connect(process.env.DATABASE_ACCESS)


const userSchema = new mongoose.Schema({
    username: 'string',
    password: 'string',
});

const User = mongoose.model('User', userSchema);
User.createCollection()

const todosSchema = new mongoose.Schema({
    userId: 'string',
    todos: [],
    done: 0,
});

const Todos = mongoose.model('Todos', todosSchema);
Todos.createCollection()

app.use(cors());
app.use(express.json())

app.post('/register', async (req,res) => {
    const {username,password} = req.body
    const user = await User.findOne({username}).exec()
    if (username === "" || password === "") {
        return
    }
    if (user) {
        res.status(500);
        res.json({message:'User already Exists'});
        return;
    }
    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password
        })
    } catch (err) {}
    res.json({
        username,
        password,
    })
})

app.post('/login', async (req,res) => {
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    }).exec()
    if (user) {
        return res.json({status: "ok"})
    } else {
        res.status(500);
        res.json({status: "invalid log-in"})
        return
    }
})

app.post('/todo', async (req,res) => {
    const todosItems = req.body
    const userTodo = await Todos.findOne({userId:req.headers.authorization})
    if (!userTodo) {
        const userTodo = await Todos.create({
            userId: req.headers.authorization,
            todos: todosItems
        })
    } else {
        userTodo.todos = todosItems
        userTodo.save()
    }
    res.json(todosItems)
})

app.get('/todo', async (req,res) => {
    const user = req.headers.authorization
    const userTodo = await Todos.findOne({userId:user})
    if (userTodo != null) {
        res.json(userTodo.todos)
    }
})

app.get('/hello', (req,res) => {
    res.send("hello world")
})

app.listen(4000, () => {
    console.log("Server Started on 4000")
})
