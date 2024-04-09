const express = require('express');
const app = express();
const cors = require('cors'); 
// CORS is enabled for all origins 
app.use(cors());
app.use(express.json());
app.use('/',require('./endpoint.js'));
app.listen(8080, ()=>console.log("server is listening at: 8080"));
