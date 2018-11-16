#!/bin/sh

cat <<EOM >../config/database.js
module.exports = {
    development: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE_NAME,
        uri: process.env.DATABASE_URI
    },
    test: {
        username: 'root',
        password: null,
        database: 'boilerplate_test',
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: null
    },
    production: process.env.DATABASE_URL
};
EOM