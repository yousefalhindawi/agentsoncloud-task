require("dotenv").config();
const { sequelize } = require("./models");
const express = require("express");
const cors = require("cors");
const app = express();
const usersRouter = require('./routers/rotues/userRoute');
const itemsRouter = require('./routers/rotues/itemRoute');
const reviewsRouter = require('./routers/rotues/reviewRoute');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// port
const port = 30155;

// test API
app.get("/", (req, res) => res.send("Dat App"));

// routers
app.use('/api/', usersRouter);
app.use('/api/', itemsRouter);
app.use('/api/', reviewsRouter);
// app.get("/test", async (req, res) => {
//  try {
//   const users = await sequelize.models.User.findAll({});
//   res.send(users);
//  } catch (error) {
  
//  }
// });




app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Content-Type, Authorization, X-Requested-With"
  );
  next();
});

app.listen(port, async () => {
  try {
    console.log(`app listening on http://localhost:${port}`);
    await sequelize.sync({
      // force: true,
      alter: true,
    }).then(() => {
        console.log("Database connected successfully")
    })
    // await sequelize.sync();
    // await init();
  } catch (error) {
    console.log(error);
  }
});


