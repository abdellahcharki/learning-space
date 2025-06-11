 
const { Cours, Content } = require("../models");

exports.getCourses = async (req, res, next) => {
  const courses = await Cours.findAll({ raw: true }); 

  res.render("courses/courses", {
    courses,
    mail: req.session.mail 
  });
};

exports.getOneCours = (req, res, next) => {
    let cours_id = req.params.id;
    Cours.findAll({ 
        where: { id: cours_id } ,
        include:[Content]
    }).then(data=>{
        
       res.render("courses/cours",{cours:data[0], mail: req.session.mail });
//  res.json(data[0])
    })

};

exports.getNewCours = (req, res, next) => {
  res.render("courses/new_cours",{ mail: req.session.mail });
};

exports.getNewContent = (req, res, next) => {
  let cours_id = req.params.id;
   
  res.render("courses/new_content",{cours_id, mail: req.session.mail });
};

exports.postCours = (req, res, next) => {
  var u =  Cours.create({
    imgUrl: req.file.filename,
    name:req.body.corsname
  }).then(data=>{
    res.redirect("/courses/"+data.id)
   

  })
};

exports.getContent = (req, res, next) => {
  let cid = req.params.cid;
  Content.findAll({
    where:{id:cid},
    include:[Cours]
  }).then(data=>{
     res.render("courses/content",{
      c:data[0],
       mail: req.session.mail 
    });
  })
};



exports.postContent = (req,res,next)=>{

  var {cours_id,title,body} = req.body; 

  Content.create({
    title: title,
    body: body,
    courseId:cours_id
  }).then(data=>{
    res.redirect("/courses/"+cours_id+"/"+data.id)
  })
  
  
}


exports.getEditContent = (req,res,next) =>{
  let cid = req.params.cid;
  Content.findAll({
    where:{id:cid},
    include:[Cours]
  }).then(data=>{
     res.render("courses/content_edit",{
      c:data[0],
      mail: req.session.mail 
    });
  })
}


exports.postEditContent = async (req,res,next)=>{
  let body = req.body; 
  let  t = await Content.findAll({ where:{id:body.id} })
    t = t[0]
  t.body =  body.body;
  t.title =  body.title
   

  t.save()

  res.redirect("/courses/"+body.cid+"/"+body.id)
}