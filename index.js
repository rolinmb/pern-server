const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;
        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1 AND password = $2",
            [username, password]
        );
        if (result.rows.length > 0) {
            res.json({ success: true, message: 'Login Successful for '+username });
            console.log('Login Successful for '+username);
        } else {
            res.status(401).json({ success: false, message: 'Invalid login credentials.' });
            console.log('Invalid login credentials.');
        }
    } catch (err) {
        res.status(500).json({ sucess: false, message: 'Error occurred.'});
        console.error(err.message);
    }
});

app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]);
        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]);
        res.json("Todo was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/users", async(req, res) => {
    try {
        const { username, password, first_name, middle_name, last_name } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO users (username, password, first_name, middle_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [username, password, first_name, middle_name, last_name]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/users", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM users");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/users/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM users WHERE user_id = $1",
            [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/users/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { username, password, first_name, middle_name, last_name } = req.body;
        const updateTodo = await pool.query(
            "UPDATE users SET username = $1, password = $2, first_name = $3, middle_name = $4, last_name = $5 WHERE user_id = $6",
            [username, password, first_name, middle_name, last_name, id]);
        res.json("User was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/users/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM users WHERE user_id = $1",
            [id]);
        res.json("User was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});