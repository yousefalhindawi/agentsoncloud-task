const reviews = require("express").Router()
const reviewController = require('../controllers/reviewController');

reviews.get('/reviews/:id' , reviewController.getReviews);
reviews.post('/reviews' , reviewController.addReview);


module.exports = reviews;