var SharpService = require('../services/SharpService');
module.exports = {
    transformImage: async function (req, res) {
        let file;
        let uploadPath;
        let options = JSON.parse(req.body.options);
        let transformationOption = req.body.transformationOption;
        console.log('req.body.options', JSON.parse(req.body.options))
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        file = req.files.file;
        uploadPath = './input-files/' + file.name;

        file.mv(uploadPath, function (err) {
            if (err)
                return res.status(500).send(err);
            if (transformationOption == 'resize') {
                SharpService.resize(options, file.name);
                res.json({ resultantName: 'resized-' + file.name });
            } else if (transformationOption == 'crop') {
                SharpService.crop(options, file.name);
                res.json({ resultantName: 'cropped-' + file.name });
            } else if (transformationOption == 'pad') {
                SharpService.pad(options, file.name);
                res.json({ resultantName: 'padding-' + file.name });

            }
        });
    }
}