# Express-Pug-SQLite Blog

A simple blog application built using Express.js, Pug, and SQLite.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

### 1. Initialize the Project

First, create a new directory for your project and initialize it with npm:

```sh
mkdir express-pug-sqlite-blog
cd express-pug-sqlite-blog
npm init -y
```

2. Install Dependencies
Install the necessary dependencies:


```sh
npm install express pug
npm install --save-dev nodemon
```

3. Set Up the Basic Express Server
Create the `app.js` file to set up the Express server with Pug as the view engine:

```javascript
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Blog Posts', posts: [] });
});

app.get('/create', (req, res) => {
  res.render('create', { title: 'Create Post' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

4. Create Initial Routes and Views
Create the `blog.js` file to define the initial routes for the index and create pages:

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Blog Posts', posts: [] });
});

router.get('/create', (req, res) => {
  res.render('create', { title: 'Create Post' });
});

module.exports = router;
```

Update `app.js` to use the new routes:

```javascript
const express = require('express');
const path = require('path');
const blogRoutes = require('./routes/blog');

const app = express();
const port = process.env.PORT || 3000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', blogRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

Create the following Pug templates in the views directory:

`layout.pug`

```jade
doctype html
html(lang="en")
  head
    title= title
    link(rel="stylesheet", href="/css/styles.css")
  body
    header
      h1 Blog with Express
      nav.navbar
        ul
          li
            a(href="/") Home
          li
            a(href="/create") Create Post
    main
      h1= title
      block content
```

`index.pug`

```jade
extends layout

block content
  ul
    each post in posts
      li
        a(href=`/post/${post.id}`) #{post.title} by #{post.author} (#{post.created_at.toLocaleDateString()})
```

`create.pug`

```jade
extends layout

block content
  form(action="/create", method="POST")
    input(type="text", name="title", placeholder="Title", required)
    input(type="text", name="author", placeholder="Author", required)
    textarea(name="content", placeholder="Content", required)
    button(type="submit") Create
```

5. Add Sequelize for Database Handling
Install Sequelize and SQLite dependencies:

```sh
npm install sqlite3 sequelize
```

Create the `database.js` file to configure the SQLite database connection using Sequelize:

```javascript
const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite')
});

module.exports = sequelize;
```

Create the `index.js` file to define the `BlogPost` model using Sequelize:

```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BlogPost = sequelize.define('BlogPost', {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = { sequelize, BlogPost };
```

Update `app.js` to include Sequelize:

```javascript
const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const blogRoutes = require('./routes/blog');

const app = express();
const port = process.env.PORT || 3000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', blogRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
```

6. Update Routes to Handle Form Submissions and Creation
Update `blog.js` to handle form submissions and create blog posts:

```javascript
const express = require('express');
const router = express.Router();
const { BlogPost } = require('../models');

router.get('/', async (req, res) => {
  const posts = await BlogPost.findAll();
  res.render('index', { title: 'Blog Posts', posts });
});

router.get('/create', (req, res) => {
  res.render('create', { title: 'Create Post' });
});

router.post('/create', async (req, res) => {
  await BlogPost.create(req.body);
  res.redirect('/');
});

module.exports = router;
```

7. Add Remaining Routes and Views
Update `blog.js` to include routes for viewing individual posts, editing, and statistics:

```javascript
const express = require('express');
const router = express.Router();
const { BlogPost } = require('../models');

router.get('/', async (req, res) => {
  const posts = await BlogPost.findAll();
  res.render('index', { title: 'Blog Posts', posts });
});

router.get('/create', (req, res) => {
  res.render('create', { title: 'Create Post' });
});

router.post('/create', async (req, res) => {
  await BlogPost.create(req.body);
  res.redirect('/');
});

router.get('/post/:id', async (req, res) => {
  const post = await BlogPost.findByPk(req.params.id);
  if (post) {
    res.render('post', { title: post.title, post });
  } else {
    res.status(404).send('Post not found');
  }
});

router.get('/edit/:id', async (req, res) => {
  const post = await BlogPost.findByPk(req.params.id);
  if (post) {
    res.render('edit', { title: 'Edit Post', post });
  } else {
    res.status(404).send('Post not found');
  }
});

router.post('/edit/:id', async (req, res) => {
  const post = await BlogPost.findByPk(req.params.id);
  if (post) {
    await post.update(req.body);
    res.redirect(`/post/${post.id}`);
  } else {
    res.status(404).send('Post not found');
  }
});

router.post('/delete/:id', async (req, res) => {
  const post = await BlogPost.findByPk(req.params.id);
  if (post) {
    await post.destroy();
    res.redirect('/');
  } else {
    res.status(404).send('Post not found');
  }
});

router.get('/stats', async (req, res) => {
  const posts = await BlogPost.findAll();
  const lengths = posts.map(post => post.title.length + post.content.length);
  const stats = {
    average_length: lengths.reduce((a, b) => a + b, 0) / lengths.length,
    median_length: lengths.sort((a, b) => a - b)[Math.floor(lengths.length / 2)],
    max_length: Math.max(...lengths),
    min_length: Math.min(...lengths),
    total_length: lengths.reduce((a, b) => a + b, 0)
  };
  res.render('stats', { title: 'Post Statistics', ...stats });
});

module.exports = router;
```

Create the following additional Pug templates in the views directory:

`post.pug`
```jade
extends layout

block content
  p.post-meta By #{post.author} (Posted on #{post.created_at.toLocaleString()})
  p.post-content= post.content
  a(href=`/edit/${post.id}`) Edit Post
  ```
`edit.pug`

```jade
extends layout

block content
  form(action=`/edit/${post.id}`, method="POST")
    input(type="text", name="title", value=post.title, required)
    textarea(name="content", required)= post.content
    button(type="submit") Save Changes

  form(action=`/delete/${post.id}`, method="POST")
    button(type="submit", class="danger") Delete Post
```

`stats.pug`
```jade
extends layout

block content
  p Average: #{average_length.toFixed(2)} characters
  p Median: #{median_length.toFixed(2)} characters
  p Maximum: #{max_length.toFixed(2)} characters
  p Minimum: #{min_length.toFixed(2)} characters
  br
  p Total length of all posts: #{total_length.toFixed(2)} characters
```

8. Add Styles
Create the styles.css file to add some basic styles:

```css
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 20px;
}

header {
  background: #f4f4f4;
  padding: 1rem;
  margin-bottom: 1rem;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 10px;
}

a {
  color: #333;
  text-decoration: none;
}

form {
  margin-bottom: 1rem;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

button {
  background: #333;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}

button.danger {
  background: #ff0000;
}
```

9. Run the Application
Start the application using the following command:

```sh
npm start
```
The application will be accessible at http://localhost:3000.