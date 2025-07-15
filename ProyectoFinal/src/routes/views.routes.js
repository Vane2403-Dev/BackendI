import { Router } from 'express';
import { productDao } from "../persistence/dao/product.dao.js";

const router = Router();


router.get('/home', async (req, res) => {
    try {
        const products = await productDao.getall();
        res.render('home', { products });
    } catch (error) {
        res.status(500).send('Error al cargar la vista de productos.');
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productDao.getall();
        res.render('realTimeProducts', { products });
    } catch (error) {
        res.status(500).send('Error al cargar la vista de productos en tiempo real.');
    }
});
export default router;