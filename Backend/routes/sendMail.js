const express=require('express')
const router=express.Router()

const {
    poster,
    getter,
    postback
}=require('../controller/sendMail')


router.post('/forgot-password',poster)
router.get('/reset-password/:id/:token',getter)
router.post('/change-password/:id/:token',postback)
module.exports=router
