const Files = require('../models/files');

module.exports.home = async function (req, res) {

    try {

        // const files = await Files.find({});
        // await new Promise((resolve, reject) => {
        //     Files.uploadFile(req, res, (err) => {
        //         if (err) {
        //             console.log("Multer error", err);
        //             reject(err);
        //         } else {
        //             resolve();
        //         }
        //     });
        // });

        return res.render('home', {
            title: 'CSV Viewer',
        })
    } catch (error) {
        console.log('Error : ', error);
        return;
    }
}

module.exports.csvView = async function (req, res) {

    try {

        // const files = await Files.find({});
        // await new Promise((resolve, reject) => {
        //     Files.uploadFile(req, res, (err) => {
        //         if (err) {
        //             console.log("Multer error", err);
        //             reject(err);
        //         } else {
        //             resolve();
        //         }
        //     });
        // });

        return res.render('viewer', {
            title: 'CSV File',
        })
    } catch (error) {
        console.log('Error : ', error);
        return;
    }

}

module.exports.csvUpload = async function (req, res) {

}

module.exports.csvDelete = async function (req, res) {

}