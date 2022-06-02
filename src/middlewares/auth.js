const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}


const authentication = async function (req, res, next) {

   let token = req.headers["authorization"]
   if (!token) return res.status(401).send({ status: false, message: "please provide token " })

   let decodedToken = jwt.verify(token.split(" ")[1], "functionUp")
   console.log(decodedToken)

    
   if (decodedToken)  next()
   else return res.status(401).send({ status: false, message: "authentication failed,invalid token " })



}



const authorization = async function (req, res, next) {

   let token = req.headers["authorization"]
   if (!token) return res.status(401).send({ status: false, message: "please provide token " })

   let decodedToken = jwt.verify(token.split(" ")[1], "functionUp")      //----- BearerToken token

   let userId = req.params.userId
   if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "invalid userId" })

   if (decodedToken) {
      if (decodedToken.userId == userId) 
      next()
      else return res.status(401).send({ status: false, message: "unauthorized" })
   }
   else return res.status(401).send({ status: false, message: "authentication failed,invalid token" })

}




module.exports = { authentication, authorization }