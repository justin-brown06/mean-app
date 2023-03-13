const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

mongoose
    .connect(
        'mongodb+srv://brownee06:brownee06@meanappdb.tal6js8.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = req.body;

    const newPost = new Post({
        title: post.title,
        content: post.content
    });

    try {
        newPost.save();
    } catch {
        console.log('Error saving post');
        res.status(500).json({
            message: 'Error saving post'
        });
    }

    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get('/api/posts', (req, res, next) => {
    Post.find()
        .then(results => {
            res.status(200).json({
                message: 'Posts fetched successfully!',
                posts: results
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error fetching posts'
            });
        });
});

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Post deleted!'
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error deleting post'
            });
        });
});

module.exports = app;
