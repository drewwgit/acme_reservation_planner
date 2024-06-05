const express = require("express");
const app = express(); 
const { client } = require("../server/db")


app.use(express.json());
client.connect();


  app.use("/api/customers", require ("./customers"));
  app.use("/api/reservations", require ("./reservations"));
  app.use("/api/restaurants", require ("./restaurants"));

  app.listen(8080, () => {
    console.log("App is running at port 8080");
  });