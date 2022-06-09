exports.getHomepage =  (req, res)=>{
    console.log("Get /api, hellooo")
    res.status(200);
    res.send({ msg: "Welcome to the API"})

}