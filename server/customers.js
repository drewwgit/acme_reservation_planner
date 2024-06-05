const express = require("express"); 
const router = express.Router(); 

const { fetchAllCustomers, getSingleCustomer, getReservationByCustomerId } = require("./db");

router.get("/", async (req, res, next) => {
    try {
      res.send(await fetchAllCustomers());
    } catch (err) {
      next(err);
    }
  });

router.get("/:id", async (req, res, next) => {
    try {
      res.send(await getSingleCustomer(req.params.id));
    } catch (err) {
      next(err);
    }
  });

  router.get("/:id/reservations", async (req, res, next) => {
    try {
      res.send(await getReservationByCustomerId(req.params.id));
    } catch (err) {
      next(err);
    }
  });

  module.exports = router; 