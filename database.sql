CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(50),
    middle_name VARCHAR(50),
    last_name VARCHAR(50),
    is_admin BOOL
);

CREATE TYPE payment_status AS ENUM ('unpaid', 'paid');

CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'shipped', 'received');

CREATE TABLE orders(
    order_number SERIAL PRIMARY KEY,
    placed_by VARCHAR(50),
    placed_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    shipping_address VARCHAR(300),
    order_notes VARCHAR(300),
    payment_status payment_status,
    order_status order_status,
    tracking_number VARCHAR(100)
);

CREATE TABLE items(
    item_number SERIAL PRIMARY KEY,
    item_name VARCHAR(150),
    item_desc VARCHAR(200),
    manufacturer VARCHAR(150),
    model_number VARCHAR(150),
    stock_qty INTEGER,
    unit_price NUMERIC(7, 3),
    item_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);