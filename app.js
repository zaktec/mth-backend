const express = require ('express')
const app = express();
const fs = require('fs')
const  { getHomepage } = require("./controllers/homepage.controllers.js")

//app.use(express.static(__dirname))
app.use(express.json())

app.get("/api/homepage", getHomepage) 

module.exports =  app  ;
