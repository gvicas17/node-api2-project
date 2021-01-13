const express = require('express')
const router = express.Router()
const Posts = require('./db-helpers')


router.get('/', (req, res) => {
    Posts.find()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({
            message: "The posts information could not be retrieved."
        })
    })
})

module.exports = router