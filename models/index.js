const { Sequelize } = require('sequelize');
const db = require("../config/db.config")
const bcrypt = require("bcrypt")


// import models


const User = require("./User")(db,Sequelize);
const Cours = require("./Cours")(db,Sequelize);
const Content = require("./Content")(db,Sequelize);
const Topic = require("./Topic")(db,Sequelize);
const Note = require("./Note")(db,Sequelize);


const Book = require("./Book")(db,Sequelize);
const BookLang = require("./BookLang")(db,Sequelize);
const BookCategory = require("./BookCategory")(db,Sequelize);





User.beforeCreate(async (user,options)=>{
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
})
 

User.prototype.checkPassword = function(password) {
    return  bcrypt.compare(password,this.password); 

}

// OneToMany
Cours.hasMany(Content);
// ManyToOne
Content.belongsTo(Cours);



/////////////////////////////////// Books //////////////////////////////////
BookCategory.hasMany(Book, { foreignKey: 'category_id' });
Book.belongsTo(BookCategory, { foreignKey: 'category_id' });

// One-to-Many relationship: A language can have many books
BookLang.hasMany(Book, { foreignKey: 'language_id' });
Book.belongsTo(BookLang, { foreignKey: 'language_id' });
///////////////////////////////////// end books //////////////////////////////////


db.sync({force:false}).then(()=>{
    console.info("Tables are created with 200 OK")
})


module.exports =  {
    User,Cours,Content,Topic,Book,BookLang,BookCategory,Note
}