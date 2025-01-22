const express = require('express');
const { Op } = require('sequelize'); // Required for filtering with LIKE
const router = express.Router();
const { Blog } = require('../models');
const { ensureAuthenticated } = require('../middleware/auth');

// Get all blog posts or search results
router.get('/', async (req, res) => {
  try {
    const { search, sort } = req.query;
    
    let whereClause = {};  // To store our search filtering

    // If search query exists, add filter to whereClause
    if (search) {
      whereClause = {
        title: {
          [Op.iLike]: `%${search}%` // Search for posts where title matches the search term
        }
      };
    }

    // Sort logic based on query
    let orderClause = [];
    if (sort) {
      const [sortField, sortOrder] = sort.split(',');
      orderClause = [[sortField, sortOrder]];
    } else {
      orderClause = [['createdAt', 'DESC']]; // Default to sorting by creation date
    }

    // Query the database for posts with the search and sort conditions
    const posts = await Blog.findAll({
      where: whereClause,
      order: orderClause
    });

    res.render('index', {
      title: 'Home',
      posts,
      search,  // Pass the search term back to the view
      sort     // Pass the sort option back to the view
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading posts');
    res.render('index', {
      title: 'Home',
      posts: [],
      search: req.query.search || '',
      sort: req.query.sort || ''
    });
  }
});

module.exports = router;

