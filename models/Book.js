const { DataTypes,Sequelize } = require('sequelize');

module.exports = (db,tp)=>{
    return db.define("books",{
        id:{
            type:tp.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:tp.STRING,
        url:tp.STRING,
        cover:tp.STRING,
        author:tp.STRING,
        countPages:tp.STRING,
    })
}