const express = require ('express')
const apiRouter = require('./routers/api.routers');
const app = express();
const cors = require("cors")



const {
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors,
    handle404s 
  } = require('./errors/index');


app.use(express.json())
app.use(cors());

app.use('/api', apiRouter)



 // Error Handlers 
app.all("*", handle404s);
 app.use(handleCustomErrors);
 app.use(handlePsqlErrors);
 app.use(handleServerErrors);

module.exports =  app;
