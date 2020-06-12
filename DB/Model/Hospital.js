const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hospital = new Schema({
    name:{type:String},
    location:{lon:{type:String},lat:{type:String}},
    
},{timestamps:true})

const model =  mongoose.model('Hospital',hospital)
module.exports = model