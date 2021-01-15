const sharp = require('sharp');
const got = require("got");
const fs = require("fs");


module.exports = {
    resize: async function (options, fileName) {

        await sharp('input-files/' + fileName)
            .resize({
                width: Number(options.width), height: Number(options.height),
                fit: sharp.fit.fill
            })
            .toFile(`public/resized-${fileName}`);
        fs.unlinkSync('input-files/' + fileName);

        console.log("resized")
    },
    crop: async function (options, fileName) {
        await sharp('input-files/' + fileName)
            .extract({ left: Number(options.left), top: Number(options.top), width: Number(options.width), height: Number(options.height) })
            .toFile(`public/cropped-${fileName}`);
        fs.unlinkSync('input-files/' + fileName);

    },
    pad: async function (options, fileName) {
        await sharp('input-files/' + fileName)
            .extend({
                left: Number(options.left),
                top: Number(options.top),
                bottom: Number(options.bottom),
                right: Number(options.right)
            })
            .toFile(`public/padding-${fileName}`);
        fs.unlinkSync('input-files/' + fileName);

    }
}