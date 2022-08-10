const items = require("express").Router()
const itemController = require('../controllers/itemController');

items.get('/items' , itemController.getItems);
items.post('/items' , itemController.addItem);

items.get('/items/:id' , itemController.getItem);
items.put('/items/:id' , itemController.updateItem);
items.delete('/items/:id' , itemController.deleteItem);

module.exports = items;