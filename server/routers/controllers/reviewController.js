const { Review } = require("../../models");
const { Item } = require("../../models");
const { User } = require("../../models");


// get all Reviews
const getReviews = async (req, res) => {
  try {
      const id = req.params.id;
    //   console.log(+id)
    const reviews = await Review.findAll({
        where: { itemId: +id },
        include:[{
            model:User,
            attributes:['updatedAt','name']
          },
          {
            model:Item,
            attributes:['updatedAt','title']
          }
        ]
        //   include: [{
        //     model: Item,
        //   }]
        // User: ['name', 'updatedAt']
        // attributes: ['review_body' ,'updatedAt','name', 'updatedAt']
    });
    res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
  }
};


// create Review
const addReview = async (req, res) => {

    console.log(req.body)
  let info = {
    review_body: req.body.review_body,
    itemId: req.body.itemId,
    userId: req.body.userId,
  };
 

  try {
    const review = await Review.create(info);
    const addreview = await Review.findOne({
        where: { itemId: review.itemId },
        include:[{
            model:User,
            attributes:['updatedAt','name']
          },
          {
            model:Item,
            attributes:['updatedAt','title']
          }
        ]})
    res.status(200).send({review:addreview, status:200});
  } catch (error) {
    console.log(error);
  }
};



module.exports = {
    getReviews,
    addReview,
};