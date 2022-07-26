/* db.fruits.updateOne(
  { name: "Banana" },
  { $rename: {
      "name": "productName"
    }
  }
); */
db.produtos.updateMany(
  {},
  { $rename: { descricao: "descricaoSite" },
  },
);

db.produtos.find(
  {},
  { _id: 0, nome: 1, descricao: 1, descricaoSite: 1 },
);
