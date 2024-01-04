const express = require("express");
const cors = require('cors')
require("./db/config");
const db = require('./db/users');
const addprd = require('./db/addproducts');
const multer = require('multer')

const app = express();
app.use(cors());

app.use(express.json());
app.use('/uploads', express.static('./uploads'))

app.post('/register', async (req, res) => {
    const data = new db(req.body);
    let result = await data.save();
    res.send(result);

})

app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        const data = await db.findOne(req.body).select("-password");
        if (data) {
            res.send(data);
        }
        else {
            res.send("result not found");
        }
    }
    else {
        res.send("result not found");
    }
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })


app.post('/uploadfile', upload.single("file"), async (req, res) => {

    const imagename = req.file.filename;
    const pproduct = req.body.product;
    const ccompany = req.body.company;
    const pproductdesc=req.body.desc;
    const pprice = req.body.price;

    await addprd.create({
        file: imagename,
        product: pproduct,
        company: ccompany,
        price: pprice,
        desc:pproductdesc




    })
    // const data = new product(req.body);
    //  await data.save();

    res.send("Uploaded")
})


app.get('/listprod', async (req, res) => {
    if (addprd.length > 0) {
        let data = await addprd.find();
        res.send(data);
    }
    else {
        res.send({ result: "NO DATA FOUND" })
    }

})

app.get('/product/:id', async (req, res) => {
    const result = await addprd.findOne({ _id: req.params.id })
    res.send(result)
})

// app.put('/update/:id', async (req, res) => {
//     const result = await addprd.updateOne(
//         { _id: req.params.id },
//         { $set: req.body }
//     )

//     console.log(req.body)
// })


app.put('/update/:id', upload.single("file"), async (req, res) => {

    // const imagename = req.file.filename;
    // const pproduct = req.body.product;
    // const ccompany = req.body.company;
    // const pprice = req.body.price;

    // const result = await addprd.updateOne(
    //     { _id: req.params.id },
    //     {
    //         $set: {
    //             file: imagename,
    //             product: pproduct,
    //             company: ccompany,
    //             price: pprice
    //         }
    //     }
    // )
    // const result = await addprd.findByIdAndUpdate(req.body.id, {
    //     file: req.file.filename,
    //     product: req.body.product,
    //     company: req.body.company,
    //     price: req.body.price


    // })

    const result = await addprd.findOneAndUpdate({ _id: req.params.id },
        {
            $set: {
                file: req.file.filename,
                product: req.body.product,
                company: req.body.company,
                price: req.body.price,
                productdesc:req.body.productdesc
            }
        }
    ).then(restt=>{
        res.status(200).json({
            updated:restt
        })

    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })

})

app.delete('/deleteitem/:id',async(req,res)=>{
    const result= await addprd.findOneAndDelete({_id:req.params.id})
    res.send("Deleted")
})


app.listen(5000);