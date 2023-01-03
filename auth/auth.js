const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); 



exports.comparePasswords = (password, hash) =>{
   return bcrypt.compare(password, hash)
}
exports.hashPassword= (password) =>{
   return bcrypt.hash(password,5)
}

 exports.createJWT =(auth) =>{
 const token = jwt.sign({
    id: auth.id
 },
 process.env.JWT_SECRET
 )
 return token
 }



 exports.protect =( req, res) => {
        const bearer = req.headers.authorization

        if (!bearer){
         res.status(401)
         res.json({message: 'not authorisesd'})
         return
        }

   const [ ,token] = bearer.split('')
        if (!token){
            res.status(401)
            res.json({message:'not valid token'})
            return
        }
        try {
         const auth =jwt.verify(token, process.env.JWT_SECRET)
         console.log(auth)
            req.auth = auth
            next()
        } catch (e) {
         console.error(e)
         res.status(401)
         res.json({message:'not valid token'})
         return
         
        }
 }