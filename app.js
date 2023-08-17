const express = require('express');
const app = express();
const PORT = process.env.port || 5000;
const mongoose = require('mongoose');
const {MONGO_URL} = require("./keys")
const path = require('path')
require('./models/model')

const cors = require('cors');
require('./models/post')
app.use(cors())
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require('./routes/createPost'))
app.use(require('./routes/user'))

mongoose.connect(MONGO_URL)

mongoose.connection.on("connected",()=>{
    console.log("connected");
})
mongoose.connection.on("error",()=>{
    console.log("not connected");
})

// serving the fronted
app.use(express.static(path.join(__dirname,"./instagram-clone/build")))

app.get("*",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"./instagram-clone/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})



app.listen(PORT,()=>{
    console.log("server is ruunning on ",PORT)
})