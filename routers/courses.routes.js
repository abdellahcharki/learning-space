const router = require("express").Router()

const cc = require("../controllers/corses.controlle")
const uploader = require("../config/upload.config")
 

router.get("/", cc.getCourses)
router.post("/", uploader().single('coursimg') ,cc.postCours)
router.get("/new",cc.getNewCours)
router.get("/:id", cc.getOneCours)
 

router.get("/:id/new",cc.getNewContent)

router.get("/:id/add",(req, res, next)=>{
    res.render("add_content")
})

router.get("/:id/:cid",cc.getContent)


router.get("/:id/:cid/edit",cc.getEditContent)
router.post("/content", cc.postContent)


router.post("/content/edit", cc.postEditContent)



module.exports = router;