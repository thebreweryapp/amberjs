#!/bin/sh

cat <<EOM >../config/database.js
module.exports = {
    development: {
        username: 'userBAL',
        password: 'GssAEyjNKHPTST5x',
        database: 'sampledb',
        uri: 'postgres://172.30.216.55:5432'
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