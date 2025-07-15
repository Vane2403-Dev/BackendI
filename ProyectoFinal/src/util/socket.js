
import { Server } from 'socket.io';
import { productDao } from "../persistencia/dao/product.dao.js";

export const setupSocket = (server) => {
    const io = new Server(server)

    io.on('connection', async (socket) => {
        console.log('Cliente conectado');

        socket.emit('productosActualizados', await productDao.getall());

        socket.on('nuevoProducto', async (productData) => {
            await manager.createProduct(productData);
            io.emit('productosActualizados', await  productDao.getall());
        });

        socket.on('eliminarProducto', async (productId) => {
            await manager.eliminarProducto(productId);
            io.emit('productosActualizados', await  productDao.getall());
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    });
};
