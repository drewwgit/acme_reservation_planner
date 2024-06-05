const express = require("express"); 
const router = express.Router(); 

const { fetchAllRestaurants, getSingleRestaurant } = require("./db");

router.get("/", async (req, res, next) => {
    try {
      res.send(await fetchAllRestaurants());
    } catch (err) {
      next(err);
    }
  });


  router.get("/:id", async (req, res, next) => {
    try {
      res.send(await getSingleRestaurant(req.params.id));
    } catch (err) {
      next(err);
    }
  });


  module.exports = router; 