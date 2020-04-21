const jwt = require('jsonwebtoken')
const admin = require('../DB/Model/admin')
const auth = async (req,res,next)=>
{
    try
    {

    const token = await req.header('Authorization').replace('Bearer ','')
    const decode = jwt.verify(token,'securitywebtokencovid19')
    
    const admin_search = await admin.findById({_id:decode.id})
    if(!admin_search)
    {
       return req.admin = undefined
    }
    req.admin = admin_search
    req.token = token
 
    }catch(e)
    {
        return new Error('this request Unauthorize ')
    }
    next()

}
module.exports=auth