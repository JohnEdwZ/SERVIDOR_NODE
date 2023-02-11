const express = require("express");
const multer = require("multer");

const upload = multer({dest: 'uploads/'})
const app = express();

app.use(express.json())

app.get('/', function(req, res){
    res.send('Hola Mundo')
})

app.post('/imagen', upload.single('imagen'), function(req, res){

    const body = req.body
    const imagen = req.file
    

    console.log(imagen)

    res.send("Hola mundo POST")
})

app.listen(4000)