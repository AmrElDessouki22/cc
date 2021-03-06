const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StatisticSchema = new Schema({
    image_url:{type:String},
    name:{type:String},
    death:{type:String},
    recovered:{type:String},
    total:{type:String}

},{timestamps:true})
const model = mongoose.model('Statistics',StatisticSchema)
module.exports = model