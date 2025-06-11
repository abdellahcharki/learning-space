const router = require("express").Router()

router.get("/",(req,res)=>{
    res.render("todos")
})
 

module.exports = router;