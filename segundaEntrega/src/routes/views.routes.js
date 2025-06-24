import { Router } from 'express';
import ProductsManager from '../services/product.manager.js';

const manager = new ProductsManager();
const router = Router();


router.get('/home', async (req, res) => {
    try {
        const products = await manager.consultarProductos();
        res.render('home', { products });
    } catch (error) {
        res.status(500).send('Error al cargar la vista de productos.');
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await manager.consultarProductos();
        res.render('realTimeProducts', { products });
    } catch (error) {
        res.status(500).send('Error al cargar la vista de productos en tiempo real.');
    }
});
export default router;