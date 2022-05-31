const jwt = require('jsonwebtoken')

const isValidObjectId = function (ObjectId) {
   return mongoose.Types.ObjectId.isValid(ObjectId)
}
const authentication =async function(req,res,next){

let token = req.headers["authorization"]

let decodedToken=jwt.verify(token.split(" ")[1],"functionUp")
if(decodedToken) next()
else return res.status(401).send({ status: false, msg : "authentication failed,invalid token " })

}

const authorization =async function(req,res,next){

let token = req.headers["authorization"]
let decodedToken=jwt.verify(token.split(" ")[1],"functionUp")// BearerToken token 

if(!isValidObjectId(userId))return  res.status(400).send({status:false,message:"invalid userId"})
if(decodedToken){ 
   if(decodedToken.userId== req.params.userId)  next()
    else return res.status(403).send({ status: false, msg : "unauthorized" })
   }
else return res.status(401).send({ status: false, msg : "authentication failed,invalid token" })

}




module.exports = {authentication,authorization}