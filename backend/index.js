const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');
const upload = require('express-fileupload')



connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use(upload())

//routes
app.use('/api/users',require('./routes/users'))
app.use('/api/categories',require('./routes/category'))
app.use('/api/products',require('./routes/product'))
app.use('/api/customers',require('./routes/customer'))
app.use('/api/cart',require('./routes/cart'))
app.use('/api/purchases',require('./routes/purchase'))
app.use('/api/sales',require('./routes/sales'))



app.listen(port, ()=>{
    console.log(`ecommerce backend listeneing at http://localhost:${port}`)
})