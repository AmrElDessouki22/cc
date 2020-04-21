const express = require('express')
const app = new express.Router()
const admin = require('../DB/Model/admin')
const auth = require('../Middleware/authadmin')

app.post('/addnewadmin',async (req,res)=>
{
    try{
        const addadmin = await admin(req.body)
        await addadmin.save()
        res.status(201).send(addadmin)
    }catch(e)
    {
        res.status(400).send(e)
    }
})
app.post('/adminlogin',async (req,res)=>
{
    try{
        const addadmin = await admin.checkuser(req.body.email,req.body.password)
        const token = await addadmin.addtoken()
        addadmin.tokens = await addadmin.tokens.concat({token})
        await addadmin.save()
        res.cookie('token',token)
        res.status(201).send(addadmin)
    }catch(e)
    {
        res.status(400).send(e)
    }
})
app.get('/checkadmin',auth,async (req,res)=>
{
    try{
        if(req.admin==undefined)
        {
           return res.status(200).send(e)
        }
           return res.status(400).send(e)
    }catch(e)
    {
        res.status(400).send(e)
    }
},(error,res,next)=>
{
    res.status(400).send(error.message)

})

app.get('/alladmin',auth,async (req,res)=>
{
    try{
        const addadmin = await admin.find({})
        res.status(200).send(addadmin)
    }catch(e)
    {
        res.status(400).send(e)
    }
})

app.delete('/deleteadmin/:id',auth,async (req,res)=>
{
    try{
        const addadmin = await admin.findById(req.params.id)
        await addadmin.remove()
        res.status(200).send('delete done !')
    }catch(e)
    {
        res.status(400).send(e)
    }
})

app.post('/keyactivate/:id',auth,async (req,res)=>
{
    try{
        const addadmin = await admin.findById(req.params.id)
        addadmin.keyactivate = true
        await addadmin.save()
        res.status(200).send('activate account key !')
    }catch(e)
    {
        res.status(400).send(e)
    }
})

app.post('/keydeactivate/:id',auth,async (req,res)=>
{
    try{
        const addadmin = await admin.findById(req.params.id)
        addadmin.keyactivate = false
        await addadmin.save()
        res.status(200).send('deactivate account key !')
    }catch(e)
    {
        res.status(400).send(e)
    }
})
app.patch('/updateadmin',auth,async (req,res)=>
{
    try{
        const find = await admin.findById(req.admin._id)
        const keys = Object.keys(req.body)
        const real_keys = ['email','password','name']
        const check = keys.every((key)=> real_keys.includes(key))
        if(!check)
        {
            return new Error('error key ')
        }
    keys.forEach((key)=>
    {
        find[key]= req.body[key]
    })

        await find.save()
        res.status(200).send('update successfuly')
    }catch(e)
    {
        res.status(400).send('something going wrong')
    }
})
app.delete('/deleteme',auth,async(req,res)=>
{
    try
    {
        await admin.findById(req.admin._id).remove()
        res.status(200).send('delete succssefuly')
    }catch(e)
    {
        res.status(400).send('something going wrong')
    }
})

app.get('',(req,res)=>
{
    res.render('index')
})
module.exports = app