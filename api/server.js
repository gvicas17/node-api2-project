const express = require('express');
const server = express();
const postRouter = require('./router')

server.use(express.json())
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
    res.send('Hello World')
})

//

module.exports = server