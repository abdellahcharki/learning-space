const router = require("express").Router()

 
const tc = require("../controllers/topics.controller")

 
router.get("/", tc.getAllTopics )
router.get("/new",tc.getNewTopic)
router.get("/:id", tc.getOneTopic)
router.get("/:id/download", tc.downloadTopic)
router.get("/:id/edit", tc.getEditTopic)
router.post("/edit", tc.postEditTopic)
router.post("/", tc.postCreateOneTopic)


module.exports = router;