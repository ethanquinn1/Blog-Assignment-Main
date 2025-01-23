const express = require('express');
const router = express.Router();
const { Blog } = require('../models');
const { Op } = require('sequelize');
const { ensureAuthenticated } = require('../middleware/auth');


router.get('/', async (req, res) => {
  try {
    const { search, sort } = req.query;  

    let searchCondition = {};
    if (search) {
      searchCondition = {
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },  
            { content: { [Op.like]: `%${search}%` } }  
          ]
        }
      };
    }

    let sortCondition = [];
    if (sort) {
      const sortParams = sort.split(',');  
      const field = sortParams[0];
      const order = sortParams[1] ? sortParams[1].toUpperCase() : 'ASC';  
      sortCondition = [[field, order]];
    }

    
    const posts = await Blog.findAll({
      ...searchCondition,
      order: sortCondition
    });

    res.render('index', {
      title: 'Home',
      posts: posts,
      search: search || '',  
      sort: sort || ''
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading posts');
    res.redirect('/');
  }
});


router.get('/create', ensureAuthenticated, (req, res) => {
  res.render('create', { title: 'Create Post' });
});


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


router.get('/stats', ensureAuthenticated, async (req, res) => {
  try {
    const totalPosts = await Blog.count();
    const stats = {
      totalPosts,
      
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

