const mongoose =require('mongoose')


const dbconnect=(URL)=> {
mongoose.connect(URL)
           .then(()=>console.log('Database is connected'))
           .catch((err)=>console.log(err))
}

module.exports=dbconnect
