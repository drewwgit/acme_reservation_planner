const express = require("express"); 
const router = express.Router(); 

const { fetchAllReservations, createReservation, deleteReservation } = require("./db");

router.get("/", async (req, res, next) => {
    try {
      res.send(await fetchAllReservations());
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      res.send(await createReservation(req.body));
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      res.send(await deleteReservation(req.params.id));
    } catch (err) {
      next(err);
    }
  });

module.exports = router; 
