var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const mongoose = require("mongoose");

// var indexRouter = require("./routes/index");
const todoRouter = require("./routes/todoRoutes");

var app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const uri =
  "mongodb+srv://new_user200:GqCR37Mh48sRM1sZ@cluster0.joovq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const { connection } = mongoose;
connection.on("open", () => {
  console.log("MongoDB database connection established successfully!");
});
connection.on("error", (err) => {
  console.log(`Error connecting to MongoDB: ${err}`);
});

app.use("/api/todos", todoRouter);
// app.use("/", indexRouter);

app.use((err, req, res, next) => {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = Object.values(err.keyValue)[0];
    const message = `The ${field} must be unique, ${value} already exists in the Database. Please use another value.`;
    return res.status(400).json({ message, errorCode: err.code });
  }
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
