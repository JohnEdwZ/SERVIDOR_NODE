const express = require("express");
const multer = require("multer");
const sharp = require("sharp")
const fs = require("fs")

const upload = multer({storage: multer.memoryStorage()})
const app = express();

app.use(express.json())

app.get('/', function(req, res){
    res.send('Hola Mundo')
})

app.post('/imagen', upload.single('imagen'), async function(req, res){

    const body = req.body
    const imagen = req.file

    const processedImage = sharp(imagen.buffer)
    const resizedImage = processedImage.resize(50, 100, {
        fit: "contain", 
        background: "#FFF"
    })
    const resizedImageBuffer = await  resizedImage.toBuffer()    

    fs.writeFileSync("uploads/cocina.png", resizedImageBuffer)
    console.log(resizedImageBuffer)

    res.send({resizedImage: resizedImageBuffer})
})

const PORT = Process.env.PORT || undefined || 3000 
console.log({PORT})
app.listen(PORT, function() {
    console.log("servidor conectado al puerto ",PORT)
})