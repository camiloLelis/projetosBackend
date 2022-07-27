db.voos.find({ ano: { $lt: 2017 } }).count();
db.voos.find({ ano: { $in: [2017, 2018] } }).count();
