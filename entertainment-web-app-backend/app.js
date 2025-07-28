const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const movieTVSeriesRouter = require("./routes/movieTVSeriesRoutes");
const userRouter = require("./routes/userRoutes");

const globalErrorHandler = require("./controllers/errorController");
const authController = require("./controllers/authController");

const morgan = require("morgan");
const verifyJwt = require("./middleware/verifyJwt");

const app = express();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "localhost:5173",
//   "http://127.0.0.1:5713",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     optionsSuccessStatus: true,
//   })
// );

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Your React app's URL
    credentials: true, // This is important for handling credentials
  })
);

app.use((req, res, next) => {
  console.log("Incoming request:", {
    method: req.method,
    url: req.url,
    query: req.query,
  });
  next();
});

// Make sure this comes before your routes
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use("/api/v1/moviesTVSeries", movieTVSeriesRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth/refresh", authController.refresh);

app.get("/verify-token", verifyJwt, (req, res) => {
  res.send({ valid: true, user: req.user });
});

app.use(globalErrorHandler);

module.exports = app;
