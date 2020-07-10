const express = require('express')
const app = new express.Router()
const hospital = require('../DB/Model/Hospital')
const nearbyone = require('../Utiles/nearbyhospital')
const auth = require('../Middleware/authadmin')

app.post('/addhospital',auth,async (req,res)=>
{
    //todo hide the key 
    try
    {
    const add_hospital = await hospital(req.body)

    
    await add_hospital.save()
    res.status(200).send('new hospital add succesfuly')
    }catch(e)
    {
        res.status(401).send('failed to add new hospital')
    }

})
app.patch('/updatehospital/:id',auth,async(req,res)=>
{
    try
    {
        const find = await hospital.findById(req.params.id)
        const keys = Object.keys(req.body)
        const real_key = ['name','location']
        const check = keys.every((key)=> real_key.includes(key))
        if(!check)
        {
            return new Error('error in the key')
        }
        keys.forEach((key)=>
        {
            find[key] = req.body[key]

        })
        await find.save()
        res.status(200).send('item updated succssfuly')
    }catch(e)
    {
        res.status(400).send('something going wrong')
    }
})
app.delete('/deletehospital/:id',auth,async(req,res)=>
{
    try{
        await hospital.findById(req.params.id).remove()
        res.status(200).send('delete done successfuly')
    }catch(e)
    {
        res.status(400).send('failed to delete item ')
    }
})
app.post('/getnearbyhospital',async (req,res)=>
{
    //todo hide the key 
    try
    {
        const mylocation = {lon:req.body.lon,lat:req.body.lat}
        const all_hospital = await hospital.find({})
        
        const all_hospital_with_distance = nearbyone(mylocation,all_hospital)

        res.status(200).send(all_hospital_with_distance)
    }catch(e)
    {
        res.status(401).send('failed to get nearby Hospital')
    }

})
app.get('/gethospitals/:id',async (req,res)=>
{
    try
    {
        const all_hospital = await hospital.findById(req.params.id)
        

        res.status(200).send(all_hospital)
    }catch(e)
    {
        res.status(401).send('failed to get  Hospital')
    }

})
module.exports = app