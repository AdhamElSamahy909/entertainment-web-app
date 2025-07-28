const mongoose = require("mongoose");

const movieTVSeriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "a movie or a TV Series must have a title"],
    unique: true,
  },
  thumbnail: {
    trending: {
      type: new mongoose.Schema({
        small: {
          type: String,
          required: [true, "please provide a trending image for small screens"],
        },
        large: {
          type: String,
          required: [true, "please provide a trending image for large screens"],
        },
      }),
    },
    regular: {
      type: new mongoose.Schema({
        small: {
          type: String,
          required: [true, "please provide a regular image for small screens"],
        },
        large: {
          type: String,
          required: [true, "please provide a regular image for large screens"],
        },
      }),
    },
  },
  year: {
    type: Number,
    required: [true, "please provide the year of the movie / TV Series"],
  },
  category: {
    type: String,
    required: [true, "please provide the category of the movie / TV Series"],
  },
  rating: {
    type: String,
    required: [true, "please provide the rating of the movie / TV Series"],
  },
  isBookmarked: {
    type: Boolean,
    required: [
      true,
      "please specify whether the movie / TV Series is bookmarked",
    ],
  },
  isTrending: {
    type: Boolean,
    required: [
      true,
      "please specify whether the movie / TV Series is trending",
    ],
  },
});

const MovieTVSeries = mongoose.model("MovieTVSeries", movieTVSeriesSchema);

module.exports = MovieTVSeries;
