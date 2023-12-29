const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const FILE_PATH = '/uploads'; 

// Check if the directory exists, if not, create it
const uploadFolderPath = path.join(__dirname, '..', FILE_PATH);
if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdirSync(uploadFolderPath);
}


const fileSchema = new mongoose.Schema(
    {
        filename : String,
        fileLocation : String
    },
    {
        timestamps: true
    }
);


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "..", FILE_PATH));
	},
	filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
	},
});

fileSchema.statics.uploadFile = multer({
    storage: storage,
}).single("filename");


fileSchema.statics.filePath = FILE_PATH;


const CSV = mongoose.model('CSV', fileSchema);
module.exports = CSV;