const app =require("./app")
var server = app.listen (3009, (err) => { 
    if (err) console.log(err)
    else console.log('server is listening on port', server.address().port)
})