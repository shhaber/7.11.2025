const express = require('express');
require('dotenv').config();
const db = require('./config/db-config.js');
const cookies = require('cookie-parser');
const port = process.env.PORT;
const api = process.env.HOST;
const app = express();
app.use(express.static(__dirname));
app.use(express.json());
app.use(cookies());

app.get('/',(req,res)=>{res.sendFile(__dirname+'/public/index.html')})
app.use('/users',require('./routes/users_R.js'));
app.use('/auth',require('./routes/auth_R.js'));
app.use('/catagories',require('./routes/Catagories_R.js'));

app.listen(port,()=>{console.log(`http://${api}:${port}`)})