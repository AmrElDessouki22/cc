const mongoose = require('mongoose')
const Schema = mongoose.Schema


const NewsSchema = new Schema({
    title:{type:String},
    description:{type:String},
    image_link:{type:String},
    resource:{type:String}
},{timestamps:true})


const model = mongoose.model('News',NewsSchema)
module.exports=model