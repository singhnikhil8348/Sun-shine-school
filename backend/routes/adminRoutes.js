const express = require("express")
const router = express.Router()

router.post("/admin-login",(req,res)=>{

const {username,password} = req.body

if(username === "admin" && password === "12345"){

res.json({success:true})

}else{

res.json({success:false})

}

})

module.exports = router