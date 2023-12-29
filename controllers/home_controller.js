const path = require('path');
const CSV = require('../models/files');
const csvParser = require('csv-parser');
const fs = require('fs');

module.exports.home = async function (req, res) {

    try {

        const CSVs = await CSV.find({});

        return res.render('home', {
            title: 'CSV Viewer',
            files: CSVs
        })
    } catch (error) {
        console.log('Error : ', error);
        return;
    }
}




module.exports.csvUpload = async function (req, res) {
    try {
        const newFile = new CSV({
            filename: req.file.filename,
            fileLocation: path.join(CSV.filePath, req.file.filename)
        });

        await newFile.save();

        return res.status(200).json({
            filename: newFile.filename,
            fileLocation: newFile.fileLocation,
            _id: newFile._id
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};




module.exports.csvDelete = async function (req, res) {
    let csvId = req.params.id;
    try {
        let deletedFile = await CSV.findByIdAndDelete(csvId);
        if (!deletedFile) {
            return res.status(404).json({ error: 'File not found' });
        }

        await fs.promises.unlink(path.join(__dirname, '..', `${CSV.filePath}/${deletedFile.filename}`));

        return res.status(200).json({ message: 'Deleted Successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: `Could not delete the file ${csvId}.` });
    }
}




module.exports.csvView = async function (req, res) {

    try {
        const csvFile = await CSV.findById({ _id: req.params.id });

        const csvData = [];
        const csvHeaders = [];

        fs.createReadStream(__dirname + '/..' + csvFile.fileLocation)
            .pipe(
                csvParser({
                    delimiter: ','
                })
            )
            .on('headers', (heads) => {
                heads.map((head) => {
                    csvHeaders.push(head);
                });
            })
            .on('data', (data) => {
                csvData.push(data);
            })
            .on('end', () => {
                console.log(`Your csv file has been processed.`);
                return res.render('viewer', {
                    title: 'CSV File',
                    id: req.params.id,
                    filename: `${csvFile.filename.substring(csvFile.filename.lastIndexOf('-'), csvFile.filename.lastIndexOf('.'))}`,
                    csv: csvFile,
                    csvHeaders: csvHeaders,
                    csvData: csvData,
                    currentIndex: 10
                });
            })
    } catch (error) {
        console.log('Error : ', error);
        return;
    }
}