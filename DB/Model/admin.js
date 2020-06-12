const mongooose = require('mongoose')
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongooose.Schema

const adminschema = new Schema({
    email:{type:String ,unique:true ,required:true},
    password:{type:String,required:true},
    name:{type:String},
    keyactivate:{type:Boolean , default:true},
    tokens:[{token:{type:String}}]
},{timestamps:true})
adminschema.methods.addtoken =  function()
{
  
    try{
        const user = this
        const token =  jwt.sign({id:user._id}, process.env.TOKENKEY)
        return token
    }catch(e)
    {
        return new Error('cant add token '+e)
    }
    
}
adminschema.methods.toJSON = function()
{
    const user = this
    const OBJ_user = user.toObject()
    delete OBJ_user.password
    return OBJ_user

}
adminschema.statics.checkuser = async (email,password)=>
{
    
    
    try
    {
        const email_search = await admin.findOne({email:email})
        if(!email_search)
        {
           
            return new Error('cant login')
        }
        const decode_password = await bycript.compare(password,email_search.password)
        if(!decode_password)
        {
            
            return new Error('cant login')
        }        
        return email_search
    }catch(e)
    {
        console.log(e);
        
    }


}
adminschema.pre('save',async function(next){
    const user = this
    const user_password = user.password
    if(user.isModified('password'))
    {
        user.password = await bycript.hash(user_password,8)
    }
    next()
})

const admin = mongooose.model('admin',adminschema)
module.exports = admin

