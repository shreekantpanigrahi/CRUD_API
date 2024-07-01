const express=require('express');
const mongoose=require('mongoose');
const Product = require('./models/product.model.js')
const app= express();

app.use(express.json()); 
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.send("server running on Node Api4");
})

app.get('/products',async (req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch(error){
        res.status(500).json({message:error.message});
    }
})

app.post('/products',async (req,res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product)
    } catch(error){
        res.status(500).json({message:error.message});
    }
})

app.get('/product/:id',async (req,res)=>{
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch(error){
        res.status(500).json({message:error.message});
    }
})

app.put('/product/:id', async(req,res)=>{
    try {
        const {id}= req.params;
        const product= await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message:"Product not Found"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.delete('/product/:id', async(req,res)=>{
    try {
        const {id}= req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:"Product not Found"});
        }

        res.status(200).json({message: "Prtoduct deleted successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})



mongoose.connect("mongodb+srv://shreekantp0008:E6RWm4hJbAmhulzc@backendcrudapi.c2ynj49.mongodb.net/?retryWrites=true&w=majority&appName=BackendCRUDAPI").then(()=>{
    console.log("connected to mongodb");
    app.listen(3000, ()=>{
        console.log('server running on port 3000');
    });
})
.catch((err)=>{
    console.log(err);
})