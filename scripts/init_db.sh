#!/bin/sh

cat <<EOM >/opt/app-root/src/config/database.js
module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        uri: process.env.DB_URI
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