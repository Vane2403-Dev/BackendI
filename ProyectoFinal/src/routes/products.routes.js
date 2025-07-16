import { Router } from "express";
import { productDao } from "../persistencia/dao/product.dao.js";


const router = Router();

/*router.get("/", async (req, res) => {
 try {
  const product = await productDao.getAll();
   if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
    res.status(200).json({ status: "ok", product });
 } catch (error) {
  
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
 }
 });*/

router.get("/", async (req, res) => {
  try {
    const { limit, page, sort, category, status } = req.query;

    // Construimos el query (filtro)
    let query = null;
    if (category) query = category;
    if (status) query = status; //Esto sobreescribirá "category" si vienen ambos

    const options = {
      limit: parseInt(limit) || 10,
      page: parseInt(page) || 1,
      sort: sort || null,
      query: query || null
    };

    const products = await productDao.getAllPage(options);
    res.status(200).json({ status: "ok", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Error interno del servidor" });
  }
});



router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

    res.status(200).json({ status: "ok", product });
  } catch (error) {

    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    console.log("ID recibido para eliminar:", pid);
    const product = await productDao.delete(pid); 
    if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

    res.status(200).json({ status: "ok", msg: `El producto con el id ${pid} fue eliminado` });
  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({ status: "Error", msg: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productData = req.body;
    const product = await productDao.update(pid, productData);
    if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

    res.status(200).json({ status: "ok", product });
  } catch (error) {

    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

router.post("/",  async (req, res) => {
  try {
    const productData = req.body;
    const product = await productDao.create(productData);

    res.status(201).json({ status: "ok", product });
  } catch (error) {

    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});
export default router;
