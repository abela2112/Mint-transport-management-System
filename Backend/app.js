const express =require('express')
const app=express()
require('dotenv').config()
const dbconnect=require('./connect/db')




app.listen(process.env.PORT || 5000 ,async()=>{
    await dbconnect(process.env.MONGO_URL)
    console.log('Server is listening')
})