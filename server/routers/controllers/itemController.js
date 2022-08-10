const { Item } = require("../../models");

// const getItems = async (req, res) => {
//     const {id} = req.params;
//     try {
//      const items = await Item.findAll({
//         where:{id:id}
//      });
//      res.send(items);
//     } catch (error) {
//     }
// }

// get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.findAll({});
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
  }
};
// get all single item
const getItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findOne({
      where: { id: id },
    });
    res.status(200).send(item);
  } catch (error) {
    console.log(error);
  }
};

// create item
const addItem = async (req, res) => {

  let info = {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    userId: req.body.userId,
  };
 

  try {
    const item = await Item.create(info);
    res.status(200).send({item:item, status:200});
  } catch (error) {
    console.log(error);
  }
};

// update item
const updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.update(req.body, { where: { id: id } });
    const upateItem = await Item.findOne({
      where: { id: id },
    });
    res.status(200).send(upateItem);
  } catch (error) {
    console.log(error);
  }
};

// delete item

const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.destroy({ where: { id: id },});
    res.status(200).send(id);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getItems,
  getItem,
  addItem,
  updateItem,
  deleteItem
};
