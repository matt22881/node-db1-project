const express = require("express");

const router = require('./../accounts/accounts-router')

const server = express();

server.use(express.json());

server.use('/api/accounts', router)

server.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to the API</h1>')
})

module.exports = server;
