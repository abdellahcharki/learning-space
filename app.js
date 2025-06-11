const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const app = express();
const util = require("./config/util")
const moment = require('moment');
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require("./config/db.config");
const { isLogin,notLogin } = require("./guards");


app.locals.moment = moment;
app.locals.parser = util.ejsParser;
moment.locale('en');

app.use( bodyParser.json());       
app.use(bodyParser.urlencoded({ 
  extended: true
}));  

app.use(session({
  secret: '&g#baH?Gq(64mZ#_C[R44(76[K071/',
  store: new SequelizeStore({db}),
  saveUninitialized: false,
  resave: false, 
}));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "stor")));
app.use(express.static(path.join(__dirname, "books")));
app.set("views", "views");
app.set("view engine", "ejs");

const _index = require("./routers/index.routes")
const _courses = require("./routers/courses.routes")
const _topics = require("./routers/topics.routes") 
const _auth = require("./routers/auth.routes")  
const _books = require("./routers/books.routes")  
const _notes = require("./routers/notes.routes")  

app.use("/auth",notLogin,_auth);
app.use(""   , _index )
app.use("/courses" , _courses);
app.use("/topics" ,_topics);  
app.use("/books" ,_books);  
app.use("/notes" ,_notes);  




db.authenticate().then(()=>{
  console.log("database is connected ...");
})



app.listen(8040, () => console.log("server run on port ", 8040));