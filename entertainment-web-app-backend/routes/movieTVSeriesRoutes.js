const express = require("express");

const MovieTVSeriesController = require("../controllers/movieTVSeriesController");
const authController = require("../controllers/authController");
const verifyJwt = require("../middleware/verifyJwt");

const router = express.Router();

router.use(verifyJwt);

router
  .route("/")
  .get(MovieTVSeriesController.getAllMoviesTVSeries)
  .post(MovieTVSeriesController.createMovieTVSeries);

router.route("/search").get(MovieTVSeriesController.search);

router
  .route("/:id")
  .get(MovieTVSeriesController.getMovieTVSeries)
  .post(MovieTVSeriesController.updateMovieTVSeries)
  .delete(MovieTVSeriesController.deleteMovieTVSeries);

module.exports = router;

// router.route("/movies").get(MovieTVSeriesController.getMovies);
// router.route("/TVSeries").get(MovieTVSeriesController.getTVSeries);
// router.route("/bookmarked").get(MovieTVSeriesController.getBookmarked);
// router.route("/trending").get(MovieTVSeriesController.getTrending);
