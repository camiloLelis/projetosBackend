db.trips.aggregate([
  {
    $match: { $and: [
      { birthYear: { $ne: null } },
      { birthYear: { $ne: "" } },
    ],
    } },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
    },
  },
  {
    $project: {
      _id: 0,
      menorAnoNascimento: 1,
      maiorAnoNascimento: 1,
    },
  },
]);
