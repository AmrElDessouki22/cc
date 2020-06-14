const mongoose = require('mongoose')
//mongoose.connect(process.env.MONGOOSEDB
//mongodb://localhost:27017/COVID-19'
mongoose.connect(mongoose.connect(process.env.MONGOOSEDB,
{
    useNewUrlParser:true,
    useCreateIndex:true,
})