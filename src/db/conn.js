const mongoose = require("mongoose");
const Student = require("./models/students");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/students-api")
  .then(() => {
    console.log("Connected with Database Successfully!");
  })
  .catch((e) => {
    console.log(`Error: ${e}`);
  });
