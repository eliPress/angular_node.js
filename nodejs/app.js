const users = require('./router/users');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose= require('mongoose');
const Joi = require('@hapi/joi');
const cors = require('cors');

mongoose.connect('mongodb://localhost/ng_node', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
    console.log('cottected to mongo');
})
.catch('BD con problem');

app.use(cors());
app.all("/*",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin"," *");
    res.header("Access-Control-Allow-Methods, PUT, GET, POST, DELETE");
    res.header("Access-Control-Allow-Headers, X-Requested-With, Content-Type, Content-Length");
    next();
    // console.log(req.body);
    
});

app.use(express.json());
app.use('/api/users',users);


app.listen(3000,()=>{
    console.log('on 30000');
})

// http.listen(process.env.PORT || 5000,()=>{
//   console.log("runing on 5000");
// });
