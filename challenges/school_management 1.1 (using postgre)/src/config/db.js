const { Pool } = require("pg");

module.exports = new Pool({
    user: 'postgres',
    password: 'defcon4',
    host: 'localhost',
    port: '5432',
    database: 'school_content'
});