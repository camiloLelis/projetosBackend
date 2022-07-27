const saleService = require('../services/sale.service');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('new connection');

    socket.on('getSaleById', async (id) => {
      const sale = await saleService.getById(id);
      io.emit('takeSaleId', sale);
    });
    // socket.on('fetchMovies', () => fetchMovies(socket));
    
    // socket.on('addMovie', (data) => addMovie(socket, data));

 /*    socket
      .on('editSaleStatus', ({ id, status }) => saleService.editStatusById(socket, id, status));

    // socket.on('deleteMovie', (id) => deleteMovie(socket, id));

    socket.on('disconnect', () => console.log('disconnected')); 
  }); */
 });
}
