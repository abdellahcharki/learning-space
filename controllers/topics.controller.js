
const { Topic } = require("../models")
const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.getAllTopics = (req,res,next)=>{
    Topic.findAll({order: [['updatedAt', 'DESC']] }).then(topics => {
        res.render("topics/topics",{topics,mail: req.session.mail })
    })
}


exports.getNewTopic = (req,res,next)=>{
    res.render("topics/new_topic",{mail: req.session.mail })
}

exports.getOneTopic = (req,res)=>{
    let id = req.params.id;
    Topic.findAll({where:{id:id}}).then(data => {
        res.render("topics/topic",{t:data[0],mail: req.session.mail })
    })
}






























exports.downloadTopic = (req,res)=>{
    let id = req.params.id;
    Topic.findAll({where:{id:id}}).then(async data => {
       
    })
}



exports.getEditTopic = (req,res)=>{
    let id = req.params.id;
    Topic.findAll({where:{id:id}}).then(data => {
        res.render("topics/topic_edit",{t:data[0],mail: req.session.mail })
    })
}



exports.postEditTopic = async (req,res)=>{
    let d = req.body;
    let  t = await  Topic.findAll({where:{id:d.id}}) ;
    t = t[0] ;

    t.set({
        title:d.title,
        body: d.body
    })

    await t.save()
   
    res.redirect("/topics/"+req.body.id)
}


exports.postCreateOneTopic = (req,res)=>{
    Topic.create({ ...req.body })
        .then(data=>{
        res.redirect("/topics/"+data.id);
        })
    
}