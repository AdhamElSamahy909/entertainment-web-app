const catchAsync = require("../utils/catchAsync");
const MovieTVSeries = require("./../models/movieTVSeriesModel");

exports.getAllMoviesTVSeries = async (req, res) => {
  try {
    const data = await MovieTVSeries.find();

    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error });
  }
};

exports.getMovies = catchAsync(async (req, res) => {
  const data = await MovieTVSeries.findOne({ category: { $eq: "Movie" } });
  res.status(200).json({ status: "success", data: { data } });
});

exports.getTVSeries = catchAsync(async (req, res) => {
  const data = await MovieTVSeries.findOne({ category: { $eq: "TV Series" } });
  res.status(200).json({ status: "success", data: { data } });
});

exports.getBookmarked = catchAsync(async (req, res) => {
  const data = await MovieTVSeries.findOne({ isBookmarked: { $eq: true } });
  res.status(200).json({ status: "success", data: { data } });
});

exports.getTrending = catchAsync(async (req, res) => {
  const data = await MovieTVSeries.findOne({ isTrending: { $eq: true } });
  res.status(200).json({ status: "success", data: { data } });
});

exports.search = catchAsync(async (req, res) => {
  console.log("Search: ", req.query);
  let data;
  if (req.query.type != "isBookmarked")
    data = await MovieTVSeries.find({
      title: { $regex: req.query.search, $options: "i" },
      category: {
        $regex: `^${req.query.type}`,
        $options: "i",
      },
    });
  else
    data = await MovieTVSeries.find({
      title: { $regex: req.query.search, $options: "i" },
      isBookmarked: { $eq: true },
    });

  res.status(200).json({ data: { data } });

  // res.status(200).json({ status: "success" });
});

exports.updateMovieTVSeries = catchAsync(async (req, res) => {
  const data = await MovieTVSeries.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!data) return next(new Error("That show does not exist"));

  res.status(200).json({ status: "success", data: { data } });
});

exports.getMovieTVSeries = async (req, res) => {
  try {
    const data = await MovieTVSeries.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error });
  }
};

exports.createMovieTVSeries = async (req, res) => {
  try {
    const data = await MovieTVSeries.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteMovieTVSeries = async (req, res) => {
  try {
    await MovieTVSeries.deleteOne(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
