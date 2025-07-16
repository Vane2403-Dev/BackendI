import { Server } from 'socket.io';
import { productDao } from "../persistencia/dao/product.dao.js";

export const setupSocket = (server) => {
    const io = new Server(server)

    io.on('connection', async (socket) => {
        console.log('Cliente conectado');

        socket.emit('productosActualizados', await productDao.getAll());

        socket.on('nuevoProducto', async (productData) => {
            await productDao.create(productData);
            io.emit('productosActualizados', await productDao.getAll());
        });

        socket.on('eliminarProducto', async (productId) => {
            await productDao.delete(productId);
            io.emit('productosActualizados', await productDao.getAll());
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    });
};