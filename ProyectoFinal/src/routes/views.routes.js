
import { Router } from "express";
import { productDao } from "../persistencia/dao/product.dao.js";



const router = Router();

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productDao.getAll();
        res.render('realTimeProducts', { products });
    } catch (error) {
        console.error('Error al cargar la vista de productos en tiempo real:', error);
        res.status(500).send('Error al cargar la vista de productos en tiempo real.');
    }
  
});



   router.get('/home', async (req, res) => {
    try {

    const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;

        console.log('Params:', req.query);
        console.log('Paginación:', page, limit);

        const result = await productDao.getAllPage({page, limit});
       
        // Navegabilidad de paginas
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/home?page=${result.prevPage}` : ''
    result.nextLink = result.hasNextPage ? `http://localhost:8080/api/home?page=${result.nextPage}` : ''


    // validacion de extremos en la plantilla de hbs
    result.isValid = !(page <= 0 || page > result.totalPages)
   ///console.log(result);

    res.render( "home", {  result});
    } catch (error) {
        res.status(500).send('Error al cargar la vista de productos.');
    }
});   
export default router;
