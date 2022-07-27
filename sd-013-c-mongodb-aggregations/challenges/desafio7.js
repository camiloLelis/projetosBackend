db.movies.aggregate([
  { $match: {
    languages: { $all: ["English"] },
  },
  },
  { $unwind: "$cast" },
  { $group: {
    _id: "$cast",
    numeroFilmes: { $sum: 1 },
    m: { $avg: "$imdb.rating" },
  } },
  { $project: { _id: 1, numeroFilmes: 1, mediaIMDB: { $round: ["$m", 1] } } },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
