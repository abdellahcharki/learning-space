const router = require("express").Router()  
const uploader = require("../config/upload.config")
const {Content,Todo,Topic,Cours} = require('../models')
const url = require('url');    



router.get("/",(req, res, next)=> { 
    res.render("index",{mail: req.session.mail})
} )




function getEntity(entity,id) {
    let obj = null;
    switch (entity) {
        case 'Content':{ obj=Content }break;
        case 'Todo':{obj=Todo }break;
        case 'Topic':{obj = Topic}break;
        case 'Cours':{ obj = Cours }break;   
    }
    if(!obj) return null;
    return obj.findAll({where:{id}})
}


function getModel(entity) {
    let obj = null;
    switch (entity) {
        case 'Content':{ obj=Content }break;
        case 'Todo':{obj=Todo }break;
        case 'Topic':{obj = Topic}break;
        case 'Cours':{ obj = Cours }break;   
    }
    if(!obj) return null;
    return obj;
}



// router.post("/", async (req,res,next)=>{
//     let method = req.body._method;
     
//     if(method && method == 'delete'){
//         let {id,entity} = req.body;

//         getEntity(entity,id).then(data=>{ 
//             let {title,id }   = data[0]
          
//             res.redirect(url.format({
//                 pathname:"delete_confirm",
//                 query:  {title,id,entity}
//               })) 
//         })

//         //res.redirect("delete_confirm")
//     } else if(method && method == 'confirm'){
//         let {password,id,entity,email} = req.body;
//         // check the password 
//         if( email = "abdellah.charki@yahoo.com" && password == '1234'){
//         // delete the entity 
//         // check entity for content cours
//             let Model = getModel(entity) 
//             Model.destroy({where:{id}}).then(()=>{
//                 res.redirect("/")
//             })
//         } 
//     }
//     else{
//         next()
//     } 
// })


router.get("/delete_confirm",(req,res,next)=>{
    let {title,id,entity} = req.query;  
    res.render("delete_confirm",{title,id,entity})
})


router.post("/upload/img", uploader().single("img"),(req, res, next)=> {
    res.json({
        "success" : 1,
        "file": {
            "url" :"/"+ req.file.filename,
        }
    })
} )


router.post("/upload/attaches", uploader({dir:"stor"}).single("file"),(req, res, next)=> {
    res.json({
        "success" : 1,
        "file": {
            "url" :"/"+ req.file.filename,
        }
    })
   
} )

module.exports = router;