import { productModel } from "../model/product.model.js";


class ProductDao {
  
async create(data) {
        try {
            // Validar campos requeridos
            const requiredFields = ['title', 'description', 'price', 'stock', 'category'];
            for (let field of requiredFields) {
                if (!data[field]) {
                    throw new Error(`El campo ${field} es requerido.`);
                }
            } 
            
            // Crear y guardar el producto en MongoDB   
            const newProduct = new productModel(data);
            await newProduct.save();
            console.log("Producto creado con éxito:", newProduct);
            return newProduct;
        } catch (error) {   
            console.error("Error al crear producto:", error.message);
            throw error;
        }
    }

    // consultar todos los productos 
// Consultar todos los productos
async getAll() {
    try {
        const products = await productModel.find().lean();  // Convertimos a objetos JS con .lean()
        products.forEach(product => product._id = product._id.toString());
        console.log("Productos consultados con éxito:", products);
        return products;
    } catch (error) {
        console.error("Error al consultar productos:", error.message);
        throw error;
    }
}

    // Consultar todos los productos paginados


// Consultar todos los productos paginados con filtros
async getAllPage({ page = 1, limit = 10, query = null, sort = null }) {
  const filter = query ? { category: query } : {};
  const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

  const result = await productModel.paginate(filter, {
    page,
    limit,
    sort: sortOption,
    lean: true
  });

  result.docs.forEach(p => p._id = p._id.toString());
  return result
};
   
    

    // Consultar un producto por ID
    async getById(id) {
        try {
            const product = await productModel.findById(id).lean()  ;
            if (!product) throw new Error(`Producto con ID ${id} no encontrado.`);
            console.log("Producto consultado con éxito:", product);
            return product;
        } catch (error) {
            console.error("Error al consultar producto:", error.message);
            throw error;
        }
    }       
    // Actualizar un producto
    async update(id, updatedData) {
            try {
                const product = await productModel.findByIdAndUpdate(id, updatedData, { new: true });
                if (!product) throw new Error(`Producto con ID ${id} no encontrado.`);
                console.log("Producto actualizado con éxito:", product);
                return product;
            } catch (error) {
                console.error("Error al actualizar producto:", error.message);
                throw error;
            }
        }

        async delete(productId) {
    try {
        const product = await productModel.findByIdAndDelete(productId).lean();
        if (!product) throw new Error(`Producto con ID ${productId} no encontrado.`);
        console.log("Producto eliminado con éxito:", product);
        return product;
    } catch (error) {
        console.error("Error al eliminar producto:", error.message);
        throw error;
    }
}

        
}


export const productDao = new ProductDao();
