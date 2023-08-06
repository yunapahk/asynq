///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 4000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("Connected to mongoose. Good job!"))
  .on("close", () => console.log("Disconnected from mongoose... Fix me!"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const EntrySchema = new mongoose.Schema({
  date: Date,
  category: String,
  description: String,
});

const Entry = mongoose.model("Entry", EntrySchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// Test route
app.get("/", (req, res) => {
  res.send("Hi server");
});

// INDEX 
app.get("/entry", async (req, res) => {
  try {
    // send all entries
    res.json(await Entry.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// CREATE 
app.post("/entry", async (req, res) => {
  try {
    // send all entries
    res.json(await Entry.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// UPDATE
app.put("/entry/:id", async (req, res) => {
    try {
      // send all entries
      res.json(
        await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // DELETE
  app.delete("/entry/:id", async (req, res) => {
    try {
      // send all entries
      res.json(await Entry.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
