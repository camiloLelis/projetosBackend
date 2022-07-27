// colocar query do MongoDB
/* db.collection().insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
db.collection('users').insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
 */
/* const adm = { name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }; */
/* await db.collection('users').insertMany(users); */

db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });