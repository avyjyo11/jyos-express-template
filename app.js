const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const API_ROUTE = require("./routes/api.routes");

// load routing level middleware
// whereever express router is used inside app.use block it is routing level middleware

// third party middleware here --------------------------------------------------------------------------
//save logs
app.use(morgan("dev"));
// allow everything (origin)
app.use(cors());

// inbuilt middleware here -------------------------------------------------------------------------------
// parse incoming data
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());

// app.use(express.static('files')); // internally request serve
app.use("/file", express.static(path.join(__dirname, "files")));
console.log("Path of this file >>", __dirname);
console.log("Path of project >>", process.cwd());

// routing party middleware here -------------------------------------------------------------------------
app.use("/api", API_ROUTE);

// application level middleware as 404 error handler ----------------------------------------------------
app.use(function(req, res, next) {
  next({
    status: 404,
    msg: "Not Found"
  });
});
// error handling middleware ---------------------------------------------------------------------
app.use(function(err, req, res, next) {
  console.log("i am error handling middleware");
  res.status(err.status || 400).json({
    msg: "from error handling middleware",
    err: err
  });
});

//listen called
app.listen(9090, (err, done) => {
  if (err) {
    console.log("listen err >> ", err);
  } else {
    console.log("server connection established");
  }
});

// middleware
// middleware is a function  which has access to http request object http response object and next middleware function
// middleware will came into action between request response cycle
// middleware functions order is very important

// syntax
// function(req,res,next){
// req http request object
// res http response object
// next next middeleware function
// }

// app.use() app.use is configuration block for middlewares
// types of middleware
// 1 application level middleware
// 2 routing level middleware
// 3 thirdparty middleware
// 4 inbuilt nmiddleware
// 5 error handling middelware
