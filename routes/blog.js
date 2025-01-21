const express = require('express');
const router = express.Router();
const { Blog } = require('../models');
const { ensureAuthenticated } = require('../middleware/auth');

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await Blog.findAll({ order: [['createdAt', 'DESC']] });
    res.render('index', { 
      title: 'Home',
      posts: posts
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading posts');
    res.redirect('/');
  }
});

// Create post form
router.get('/create', ensureAuthenticated, (req, res) => {
  res.render('create', { title: 'Create Post' });
});

// Create post handler
router.post('/create', ensureAuthenticated, async (req, res) => {
  try {
    const { title, content } = req.body;
    const errors = [];

    if (!title || !content) {
      errors.push({ msg: 'Please fill in all fields' });
    }

    if (errors.length > 0) {
      return res.render('create', {
        errors,
        title: 'Create Post',
        postTitle: title,
        content
      });
    }

    await Blog.create({
      title,
      content
    });

    req.flash('success_msg', 'Post created successfully');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error creating post');
    res.redirect('/create');
  }
});

// Stats page
router.get('/stats', ensureAuthenticated, async (req, res) => {
  try {
    const totalPosts = await Blog.count();
    const stats = {
      totalPosts,
      // Add more stats as needed
    };
    res.render('stats', { 
      title: 'Blog Statistics',
      stats 
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading statistics');
    res.redirect('/');
  }
});

module.exports = router;
