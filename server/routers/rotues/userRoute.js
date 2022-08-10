const users = require("express").Router()
const userController = require('../controllers/userController');

users.post('/users/register' , userController.register);
users.post('/users/login' , userController.login);
users.post('/users/signout' , userController.signout);
// users.get('/users/:id' , getUser);

module.exports = users;