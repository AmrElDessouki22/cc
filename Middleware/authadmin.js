const jwt = require('jsonwebtoken')
const admin = require('../DB/Model/admin')
const auth = async (req,res,next)=>
{
    try
    {
 
    const token = await req.header('Authorization').replace('Bearer ','')
    
    const decode = jwt.verify(token,process.env.TOKENKEY)
    
    const admin_search = await admin.findById({_id:decode.id})

    if(!admin_search)
    {
        
       return req.admin = undefined
    }
    for (let index = 0; index < admin_search.tokens.length; index++) {
        if(admin_search.tokens[index].token == token){
            req.admin = admin_search
            req.token = token
            next()
        }else if(index == admin_search.tokens.length-1 )
        {
            req.admin = undefined
            req.token = undefined
            next()
           
        }
        
    }
    req.admin = undefined
    req.token = undefined
    next()
    
 
    }catch(e)
    {
        return res.status(401).send()
    }


}
module.exports=auth