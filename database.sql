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
    last_name VARCHAR(50)
);