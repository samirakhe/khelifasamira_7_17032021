const multer = require('multer');
const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpeg',
    'image/png' : 'png'
};

//Enregistrement des images dans le dossier 'images'
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback( null, 'backend/images');
    },
    filename: (req, file, callback) => {
        //const name = file.originalname.split(' ').join('_');
        const name = 'image';
        const extension = MIME_TYPES [file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');