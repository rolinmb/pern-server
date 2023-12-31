const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post('/login', async(req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    if (result.rows.length > 0) {
      res.json({
      success: true,
      username: username,
      first_name: result.rows[0].first_name,
      last_name: result.rows[0].last_name,
      is_admin: result.rows[0].is_admin,
      message: 'Login Successful for '+username
    });
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

app.post('/todos', async(req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/todos', async(req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/todos/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      'SELECT * FROM todo WHERE todo_id = $1',
      [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/todos/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id]);
    res.json('Todo was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

app.delete('/todos/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      'DELETE FROM todo WHERE todo_id = $1',
      [id]);
    res.json('Todo was deleted!');
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/users', async(req, res) => {
  try {
    const { username, password, first_name, middle_name, last_name, is_admin } = req.body;
    const newTodo = await pool.query(
       'INSERT INTO users (username, password, first_name, middle_name, last_name, is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [username, password, first_name, middle_name, last_name, is_admin]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/users', async(req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM users');
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/users/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      'SELECT * FROM users WHERE user_id = $1',
      [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/users/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { username, password, first_name, middle_name, last_name, is_admin } = req.body;
    const updateTodo = await pool.query(
      'UPDATE users SET username = $1, password = $2, first_name = $3, middle_name = $4, last_name = $5, is_admin = $6 WHERE user_id = $7',
      [username, password, first_name, middle_name, last_name, is_admin, id]);
    res.json('User was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

app.delete('/users/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      'DELETE FROM users WHERE user_id = $1',
      [id]);
    res.json('User was deleted!');
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/orders', async(req, res) => {
  try {
    const { username, shipping_address, order_notes, payment_status, order_status, tracking_number } = req.body;
    const newOrder = await pool.query(
      'INSERT INTO orders (placed_by, shipping_address, order_notes, payment_status, order_status, tracking_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [username, shipping_address, order_notes, payment_status, order_status, tracking_number]
    );
    res.json(newOrder.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/orderlist', async(req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM orders');
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/orderlist', async(req, res) => {
  try {
    const { username } = req.body;
    const allTodos = await pool.query(
      'SELECT * FROM orders WHERE placed_by = $1',
      [username]);
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/orders/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const order = await pool.query(
      'SELECT * FROM orders WHERE order_number = $1',
      [id]);
    res.json(order.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/orders/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { shipping_address, order_notes, payment_status, order_status, tracking_number } = req.body;
    const updateOrder = await pool.query(
      'UPDATE orders SET shipping_address = $1, order_notes = $2, payment_status = $3, order_status = $4, tracking_number = $5 WHERE order_number = $6',
      [shipping_address, order_notes, payment_status, order_status, tracking_number, id]);
    res.json('Order was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

app.delete('/orders/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const deleteOrder = await pool.query(
      'DELETE FROM orders WHERE order_number = $1',
      [id]);
    res.json('Order was deleted!');
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/items', async(req, res) => {
  try {
    const { item_name, item_desc, manufacturer, model_number, stock_qty, unit_price } = req.body;
    const newItem = await pool.query(
      'INSERT INTO items (item_name, item_desc, manufacturer, model_number, stock_qty, unit_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [item_name, item_desc, manufacturer, model_number, stock_qty, unit_price]
    );
    res.json(newItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/items', async(req, res) => {
  try {
    const allItems = await pool.query('SELECT * FROM items');
    res.json(allItems.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/items/:num', async(req, res) => {
  try {
    const { num } = req.params;
    const order = await pool.query(
      'SELECT * FROM items WHERE item_number = $1',
      [num]);
    res.json(order.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/items/:num', async(req, res) => {
  try {
    const { num } = req.params;
    const { item_name, item_desc, manufacturer, model_number, stock_qty, unit_price } = req.body;
    const updateOrder = await pool.query(
      'UPDATE items SET item_name = $1, item_desc = $2, manufacturer = $3, model_number = $4, stock_qty = $5, unit_price = $6 WHERE item_number = $7',
      [item_name, item_desc, manufacturer, model_number, stock_qty, unit_price, num]);
    res.json('Item was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

app.delete('/items/:num', async(req, res) => {
  try {
    const { num } = req.params;
    const deleteOrder = await pool.query(
      'DELETE FROM orders WHERE order_number = $1',
      [num]);
    res.json('Order was deleted!');
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log('server has started on port 5000');
});