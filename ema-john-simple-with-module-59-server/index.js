const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;

require('dotenv').config();


//middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fgswukf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const productCollection = client.db('emaJohn').collection('products');

        app.get('/products', async(req,res)=>{
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);

            console.log(page,size);

            const que ={};
            const cursor = productCollection.find(que);
            const products = await cursor.skip(page*size).limit(size).toArray();
            const count = await productCollection.estimatedDocumentCount();
            res.send({count,products});
        })
  
    }
    finally{

    }
}
run().catch(error=>console.log(error));


app.get('/', (req, res) => {
    res.send('Ema john Server running');
})

app.listen(port, () => {
    console.log(`Ema john server is running on: ${port}`)
})