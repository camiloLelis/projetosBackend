db.voos.find({
  $or: [
    { "empresa.nome": { $eq: "DELTA AIRLINES" } },
    { "empresa.nome": { $eq: "AMERICAN AIRLINES" } },
  ],
    $and: [
     { "aeroportoOrigem.sigla": { $eq: "SBGR" } }, 
     { "aeroportoDestino.sigla": { $eq: "KJFK" } },
    ],
  },
    { vooId: 1, _id: 0 }).limit(1);
