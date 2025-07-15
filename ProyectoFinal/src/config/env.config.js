import dotenv from 'dotenv';

// Esto carga las variables desde el archivo .env
dotenv.config();

export default {
PORT: process.env.PORT || 4000,
  MONGO_ATLAS: process.env.MONGO_ATLAS,
}

