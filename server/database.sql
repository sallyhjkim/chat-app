CREATE DATABASE chatapp;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(32) NOT NULL,
    password VARCHAR(32) NOT NULL,
);
