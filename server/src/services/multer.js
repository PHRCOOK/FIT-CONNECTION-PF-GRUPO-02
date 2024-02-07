const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary'); // Importamos la configuración de Cloudinary

// Creamos un objeto de almacenamiento de Cloudinary que especifica el nombre de la carpeta donde se guardarán las imágenes
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'productos'
  }
});

// Creamos una instancia de Multer con el objeto de almacenamiento
const upload = multer({ storage: storage });

module.exports = upload;