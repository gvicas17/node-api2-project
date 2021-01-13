const express = require('express')
const { restart } = require('nodemon')
const Posts = require('./db-helpers')
const { render } = require('./server')
const router = express.Router()


router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: "The posts information could not be retrieved."
        })
    })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if(post)
        {
            res.status(200).json(post)
        }else{
            res.status(400).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({message: "The post information could not be retrieved."})
    })
} )

router.get('/:id/comments', (req, res) => {
    Posts.findCommentById(req.params.id)
    .then(comment => {
        if(comment){
            res.status(200).json(comment)
        }else{
            res.status(404).json({message: "The post with the specified ID does not exist."} )
        }
    })
    .catch(err => {
        res.status(500).json({message: "The comments information could not be retrieved." })
    })
})


router.post('/', (req, res) => {
    Posts.insert (req.body)
    .then(post => {
        if (!post.title || !post.contents) {
      res.status(400).json({ message: "Please provide title and contents for the post." })
    } else {
          res.status(200).json(post)
        } 
    })  
    .catch (error => {
        res.status(500).json({ message: "There was an error while saving the post to the database" })
            })
        })


router.post('/:id', (req, res) => {
    Posts.insertComment (req.body)
    .then(comment => {
        if(!comment){
            res.status(404).json({message:  "The post with the specified ID does not exist."})
        } else if (!comment.text){
            res.status(400).json({message:  "The post with the specified ID does not exist." })
        } else{
            res.status(201).json(comment)
        }
    })
    .catch(err => {
        res.status(500).json({message: "There was an error while saving the comment to the database"})
    })
    })
module.exports = router