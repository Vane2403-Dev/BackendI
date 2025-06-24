import { Router } from 'express';
import CartsManager from '../services/cart.manager.js';

const router = Router();
const manager = new CartsManager();
// Ruta POST /: Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
       
        // Llamamos a la función para crear el carrito
        const newCart = await manager.createCart();

        // Respondemos con el carrito creado
        res.status(201).send({ message: 'Carrito creado exitosamente', cart: newCart });
    } catch (error) {
        // Si ocurre un error, respondemos con un mensaje de error
        res.status(500).send({ error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        
        // Convertir el cartId a número
        const cartIdNumber = Number(cartId);

        // Verificar si cartIdNumber es un número válido
        if (isNaN(cartIdNumber)) {
            return res.status(400).send({ error: 'El cartId debe ser un número válido' });
        }

        const cart = await manager.getCartById(cartIdNumber);

        if (!cart) {
            return res.status(404).send({ error: `Carrito con ID ${cartIdNumber} no encontrado` });
        }

        res.json(cart);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Ruta POST /:cid/product/:pid: Agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        // Verificar si cartId y productId son números válidos
    
        const productIdNumber = Number(productId);
        const cartIdNumber = Number(cartId);

        if (isNaN(cartIdNumber) || isNaN(productIdNumber)) {
            return res.status(400).send({ error: 'El cartId y productId deben ser números válidos' });
        }

        // Llamar a la función para agregar el producto al carrito
        const updatedCart = await manager.addProductToCart(cartIdNumber, productIdNumber);
        res.send({ message: 'Producto agregado al carrito', cart: updatedCart });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;