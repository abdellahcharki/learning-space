const { DataTypes,Sequelize } = require('sequelize');

module.exports = (db,tp)=>{
    return db.define("book_catigory",{
        id:{
            type:tp.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        category:tp.STRING,

    })
}