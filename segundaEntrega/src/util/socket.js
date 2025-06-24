
import { Server } from 'socket.io';
import ProductsManager from '../services/product.manager.js';

const manager = new ProductsManager();

export const setupSocket = (server) => {
    const io = new Server(server)

    io.on('connection', async (socket) => {
        console.log('Cliente conectado');

        socket.emit('productosActualizados', await manager.consultarProductos());

        socket.on('nuevoProducto', async (productData) => {
            await manager.createProduct(productData);
            io.emit('productosActualizados', await manager.consultarProductos());
        });

        socket.on('eliminarProducto', async (productId) => {
            await manager.eliminarProducto(productId);
            io.emit('productosActualizados', await manager.consultarProductos());
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    });
};
