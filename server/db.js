const Pool = require("pg").Pool;

const pool = new Pool({
    user: "hyunjeongkim",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "chatapp",
});

module.exports = pool;
