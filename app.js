const express = require('express')
const app = express()
require('./DB/init/Init')
const News = require('./Routes/News')
const path = require('path')
const adminroute = require('./Routes/Admin')
const Nearbyhospital = require('./Routes/NearbyHospital')
const statistics = require('./Routes/Statistics')
const static = path.join(__dirname,'/Public')
const template = path.join(__dirname,'/Template/views')
app.use(express.static(static))
app.use(express.json())

app.set('view engine','hbs')
app.set('views',template)

app.use(adminroute)
app.use(statistics)
app.use(Nearbyhospital)
app.use(News)
app.listen(3000 || process.env.PORT)