const router = require("express").Router()
const bcrypt = require("bcrypt")
const  {User }  = require("../models")

router.get("/login",(req,res )=>{
    res.render("auth")
})

router.get("/singup",(req,res )=>{
    res.render("singup")
})




router.post("/login",async  (req,res )=>{
    let {password,mail } = req.body;
     User.findOne({wehere:{mail}}).then(async user =>{
        let isMatch = await user.checkPassword(password)
        if(isMatch){
            console.log("user connect");
            req.session.uid = user.id;
            req.session.mail = user.mail;

        } else{
            console.log("is not correct");
        }
        res.redirect("/");
     })
     

})



router.post("/singup",(req,res )=>{
// check sing up
    let {password,mail } = req.body;

    User.create({mail,password}).then((record)=>{
        res.redirect("/auth/login")
    })
})

router.post("/logout",(req,res )=>{ 
        req.session.destroy((err)=>{
            res.redirect("/auth/login")
        })
})




module.exports = router;