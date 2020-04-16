const mongoose = require('mongoose')
const Schema = mongoose.Schema


const NewsSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image_link:{type:String},
    resource:{type:String,required:true}
},{timestamps:true})


const model = mongoose.model('News',NewsSchema)
module.exports=model