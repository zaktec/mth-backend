const express = require ('express')
const app = express();
const fs = require('fs')

//app.use(express.static(__dirname))
app.use(express.json())

app.get("/api", (req, res)=>{
    console.log("Get /api, hellooo")
    res.status(200);
    res.send({ msg: "Welcome to the API"})

})

app.post("/api/courses", (req, res) => {
    console.log("inside post")
    console.log(Object.keys(req))
    console.log(req.body)

    fs.readFile("data/testing.json", "utf-8", (err, fileContents)=>{
            if (err) console.log(err);
            else {
                const courses = JSON.parse(fileContents);
                courses.push(req.body);
                fs.writeFile(
                    "data/testing.json", 
                    JSON.stringify(courses),
                    (err) => {
                        if (err) console.log(err);
                        else{
                            res.status(201);
                            res.send({courses: req.body})
                        }
                    }
                ) 
            }
    })
})

module.exports = app;
