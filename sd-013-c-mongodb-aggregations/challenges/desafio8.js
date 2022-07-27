/* referencias: https://github.com/tryber/sd-013-c-mongodb-aggregations/blob/MuriloRibeiro-ProjectAggregations/challenges/desafio8.js */
db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "allience.voo",
    },
  },
  { $unwind: "$allience.voo" },
  { $match: {
    $or: [{ "allience.voo.airplane": "747" }, { "allience.voo.airplane": "380" }],
  } },
  { $group: {
    _id: "$name", totalRotas: { $sum: 1 },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
