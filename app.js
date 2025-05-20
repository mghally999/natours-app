const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware!");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello from Natours API!");
});

module.exports = app;
