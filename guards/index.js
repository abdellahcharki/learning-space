

const isLogin  = (req, res, next)=>{
    if(req.session.mail) next();
    else res.redirect("/auth/login")
} 


const notLogin = (req, res, next)=>{
    if(!req.session.mail) next();
    else res.redirect("/")
}

module.exports =  { isLogin , notLogin}