var express = require('express');
var app = express();
const fs = require("fs");

app.use(express.static('public'));
const fileUpload = require('express-fileupload');
app.use(fileUpload());
var TransormController = require('./controllers/TransformController')
app.post('/upload', TransormController.transformImage);
app.get('/', function (req, res) {
    res.send("Hello world!");
});
app.get('/download', function (req, res) {
    let fileName = req.query.fileName;
    const file = `${__dirname}/public/${fileName}`;
    res.download(file);


});
app.listen(3000);