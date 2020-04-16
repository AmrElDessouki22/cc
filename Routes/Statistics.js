const express = require('express')
const app = new express.Router()
const auth = require('../Middleware/authadmin')
const statistics = require('../DB/Model/Statistics')

app.post('/addcountry',auth,async(req,res)=>
{
    try
    {
        await statistics(req.body).save()
        res.status(200).send('country add succsesfuly')
    }catch(e)
    {
        res.status(400).send('faild to add country')
    }
})
app.patch('/updatecountry/:id',auth,async(req,res)=>
{
    
    try
    {
        const find = await statistics.findById(req.params.id)
        const keys = Object.keys(req.body)
        console.log(keys);
        
        const real_key = ['name','total','death','recovered']
        const check = keys.every((key)=> real_key.includes(key))
        
        if(!check)
        {
            return new Error('key update not include in database model ')
        }
        keys.forEach((key)=>
        {
            find[key] = req.body[key]
        })
        await find.save()
        res.status(200).send('country update succsesfuly')
    }catch(e)
    {
        res.status(400).send('faild to update country')
    }
})
app.delete('/deletecountry/:id',auth,async(req,res)=>
{
    try
    {
        const delete_country = await statistics.findById(req.params.id)
        await delete_country.remove()
        res.status(200).send('delete country succesfuly')

    }catch(e)
    {   
        res.status(400).send('cant delete this country')

    }
})
app.get('/statistics',async(req,res)=>
{
    try{
        const all_country = await statistics.find({})
        res.status(200).send(all_country)
    }catch(e)
    {
        res.status(400).send('some thing going wrong')

    }
})
module.exports = app
