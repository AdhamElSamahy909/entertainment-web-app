const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const MovieTVSeries = require("../models/movieTVSeriesModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<username>",
  process.env.DATABASE_USERNAME
).replace("<password>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connected"));

const moviesTVSeries = JSON.parse(
  fs.readFileSync(`${__dirname}/data.json`, "utf-8")
);

const importData = async () => {
  try {
    await MovieTVSeries.create(moviesTVSeries);
    console.log("Data loaded");
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

importData();
