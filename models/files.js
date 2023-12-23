const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const FILE_PATH = path.join('/uploads');

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
		cb(null, file.fieldname + "-" + Date.now());
	},
});

fileSchema.statics.uploadFile = multer({
	storage: storage,
}).single("fileLocation");

fileSchema.statics.filePath = FILE_PATH;


const CSV = mongoose.model('CSV', fileSchema);
module.exports = CSV;