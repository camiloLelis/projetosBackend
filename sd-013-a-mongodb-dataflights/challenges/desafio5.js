db.voos.find({}, { vooId: true, _id: 0 }).skip(9).limit(3);
