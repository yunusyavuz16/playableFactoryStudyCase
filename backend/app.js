const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth/auth");
const protectedRoutes = require("./routes/protected");
const toDo = require("./routes/todo/todo");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const express = require("express");
const db = require("./config/db");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/todo", toDo);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3333);

module.exports = app;
