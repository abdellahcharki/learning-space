

exports.getAllTutorials = (req,res)=>{

    res.render("tutorials/index",{ mail: req.session.mail })

}