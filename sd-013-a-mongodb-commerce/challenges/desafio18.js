db.produtos.createIndex({ descricao: "text" }, { default_language: "portuguese" });
db.produtos.find({ $text: { $search: "\"feito com\"" } }).count();
/* https://app.betrybe.com/course/back-end/mongodb-updates-simples-e-complexos/updates-complexos-arrays-parte-2/4fd2d65a-b343-43a7-adb2-fc06227153f7/conteudos/84adabec-3686-4f02-9a49-7690c118cc24/operador-text/cb9fd6e6-68da-4b36-8290-3caf254f4d72?use_case=side_bar
 */
