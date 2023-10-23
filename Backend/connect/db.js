const mongoose =require('mongoose')


const dbconnect=(URL)=> {
   mongoose.connect(URL,()=>{
    console.log('mongoose is connected')
   })
}

module.exports=dbconnect
