# 🛒 E-Commerce con Vistas y Filtros

Este es un proyecto de e-commerce desarrollado con Node.js, Express y MongoDB. Incluye vistas dinámicas utilizando Handlebars, manejo de rutas y filtros de productos con paginación. También hace uso de variables de entorno para facilitar la configuración.

## 🚀 Funcionalidades principales

- Visualización de productos con filtros por categoría y estado
- Paginación y ordenamiento ascendente/descendente por precio
- Renderizado de vistas con Handlebars
- API REST para gestión de productos
- Conexión a MongoDB Atlas con Mongoose
- Uso de variables de entorno con dotenv

## 🧪 Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- Handlebars (motor de vistas)
- dotenv
- mongoose-paginate-v2

## 🔧 Configuración del entorno

Antes de ejecutar la app, crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=8080
MONGO_ATLAS=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
