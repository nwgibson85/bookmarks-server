const express = require('express');
const xss = require('xss')
const uuid = require('uuid/v4');
const { isWebUri } = require('valid-url')
const logger = require('../logger');
const BookmarkService = require('./bookmark-service');

const bookmarkRouter = express.Router();
const jsonParser = express.json();

const serializeBookmark = bookmark => ({
    id: bookmark.id,
    title: xss(bookmark.title),
    url: bookmark.url,
    description: xss(bookmark.description),
    rating: Number(bookmark.rating),
})

bookmarkRouter
    .route('/api/bookmarks')
    .get((req, res, next) => {
        BookmarkService.getAllBookmarks(req.app.get('db'))
        .then(bookmarks => {
            res.json(bookmarks.map(serializeBookmark))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
      for (const field of ['title', 'url', 'rating']) {
        if (!req.body[field]) {
          logger.error(`${field} is required`)
          return res.status(400).send({
            error: { message: `'${field}' is required` }
          })
        }
      }

      const { title, url, description, rating } = req.body
      const ratingNum = Number(rating)
        
      if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
        logger.error(`Invalid rating '${rating}' supplied`)
        return res.status(400).send({
          error: {message: `'rating' must be a number between 0 and 5`}
        })
      }
  
      if (!isWebUri(url)) {
        logger.error(`Invalid url '${url}' supplied`)
        return res.status(400).send({
          error: {message: `'url' must be a valid URL`}
        })
      }

      const newBookmark = { title, url, description, rating }
    
      BookmarkService.insertBookmark(
        req.app.get('db'),
        newBookmark
      )
        .then(bookmark => {
          logger.info(`Bookmark with id ${bookmark.id} created.`)
          res
            .status(201)
            .location(`/bookmark/${bookmark.id}`)
            .json(serializeBookmark(bookmark))
        })
        .catch(next)
    })

bookmarkRouter
  .route('/api/bookmarks/:bookmark_id')
  .all((req, res, next) => {
    BookmarkService.getById(
    req.app.get('db'),
    req.params.bookmark_id
    )
    .then(bookmark => {
        if (!bookmark) {
          return res.status(404).json({
              error: { message: `Bookmark doesn't exist` }
          })
        }
        res.bookmark = bookmark // save the bookmark for the next middleware
        next() // don't forget to call next so the next middleware happens!
    })
    .catch(next)
  })
  .get((req, res) => {
    res.json(serializeBookmark(res.bookmark))
  })
  .delete((req, res, next) => {
    BookmarkService.deleteBookmark(
        req.app.get('db'),
        req.params.bookmark_id
    )
        .then(numRowsAffected => {
          logger.info(`Bookmark with id ${bookmark_id} deleted.`)
          res.status(204).end()
        })
        .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { title, url, description, rating } = req.body
    const bookmarkToUpdate = { title, url, description, rating }
    
    const numberOfValues = Object.values(articleToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
        return res.status(400).json({
            error: {
                message: `Request body must contain either title, url, description, of rating`
            }
        })
    }
    
    BookmarkService.updateBookmark(
        req.app.get('db'),
        req.params.bookmark_id,
        bookmarkToUpdate
    )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
})

module.exports = bookmarkRouter