// ref: https://docs.mongodb.com/manual/reference/operator/aggregation/dateDiff/#examples
db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"),
        $lte: ISODate("2016-03-10T23:59:59Z"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"] },
      },
    },
  },
  {
    $project: {
      _id: false,
      duracaoMediaEmMinutos: {
        $ceil: { $divide: ["$duracaoMedia", 1000 * 60],
        },
      },
    } },
]);
