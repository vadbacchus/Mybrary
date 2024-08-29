const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All Authors route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name !== null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i') 
  }

  try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', { 
      authors,
      searchOptions: req.query
    })
  } catch(error) {
    res.redirect('/')
  }
})

// New Author route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() })
})

// New Author route
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name
  })

  try {
    const newAuthor = await author.save()
    //res.redirect(`authors/${newAuthor.id}`)
    res.redirect('authors')
  } catch(error) {
    res.render('authors/new', {
      author,
      errorMessage: 'Error creating author'
    })
  }

  /* author.save((err, newAuthor) => {
    if (err) {
      res.render('authors/new'), {
        author: author,
        errorMessave: 'Error creating author'
      }
    } else {
      //res.redirect(`authors/${newAuthor.id}`)
      res.redirect('authors')
    }
  }) */
})

module.exports = router