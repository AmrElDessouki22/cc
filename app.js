const express = require('express')
const app = express()
require('./DB/init/Init')
const News = require('./Routes/News')
const path = require('path')
var cookieParser = require('cookie-parser')
const adminroute = require('./Routes/Admin')
const Nearbyhospital = require('./Routes/NearbyHospital')
const statistics = require('./Routes/Statistics')
const static = path.join(__dirname,'/Public')
const template = path.join(__dirname,'/Template/views')

app.use(express.json())

app.set('view engine','hbs')
app.set('views',template)
app.use(express.static(static))
app.use(cookieParser())

app.use(adminroute)
app.use(statistics)
app.use(Nearbyhospital)
app.use(News)
app.get('/',(req,res)=>
{
    res.render('publicnews.hbs')
})
app.get('/dashboard/login',(req,res)=>
{
    res.render('dashboard.hbs')
})
app.get('/dashboard/news',(req,res)=>
{
    res.render('news.hbs')
})
app.get('/dashboard/hospital',(req,res)=>
{
    res.render('nearhospital.hbs')
})
app.get('/dashboard/statistics',(req,res)=>
{
    res.render('statistics.hbs')
})

app.listen(process.env.PORT || 3000)