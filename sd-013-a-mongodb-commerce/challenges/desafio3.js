db.produtos.updateMany(
  {},
  { $set: { avaliacao: NumberInt(0) } },
);
db.produtos.updateMany(
  { tags: { $in: ["bovino"] } },
  { $inc: { avaliacao: 5 } },
);
db.produtos.updateMany(
  { tags: { $in: ["aves"] } },
  { $inc: { avaliacao: 3 } },
);
db.produtos.find(
  {},
  { _id: 0, nome: 1, avaliacao: 1 },
);
/* db.increment.update(
    { sku: "abc123" },
    { $inc: { quantity: -2, "metrics.orders": 1 } }
  ); */
