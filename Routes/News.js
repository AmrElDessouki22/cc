const express = require('express')
const app = new express.Router()
const news = require('../DB/Model/News')
const auth = require('../Middleware/authadmin')

app.post('/addnewnews',auth,async(req,res)=>
{
    try{
        await news(req.body).save()
        res.status(200).send('add succusfuly')
    }catch(e)
    {
        res.status(404).send(' faild to add')

    }



})
app.patch('/updatenews/:id',auth,async(req,res)=>
{
    try
    {
        const find = await news.findById(req.params.id)
        const keys = Object.keys(req.body)
        const real_key = ['title','description','image_link','resource']
        const check = keys.every((key)=> real_key.includes(key))
        if(!check)
        {
            return new Error('cant update your item')
        }
        keys.forEach((key)=>
        {
            find[key] = req.body[key]
        })
        await find.save()
        res.status(200).send('item updeted succssfuly')
       

    }catch(e)
    {
        res.status(400).send('some thing going wrong')

    }
})
app.delete('/deletenews/:id',auth,async(req,res)=>
{
    try
    {
        const find = await news.findById(req.params.id)
        await find.remove()
        res.status(200).send('item deleted succssfuly')
    }catch(e)
    {
        res.status(400).send('cant delete item , something going wrong')
    }
    
})
app.get('/news',async(req,res)=>
{
    try
{
    const all_news = await news.find({})
    res.status(200).send(all_news)
}catch(e)
{
    res.status(400).send(e)
}

})
module.exports = app