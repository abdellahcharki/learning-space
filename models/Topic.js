const { DataTypes,Sequelize } = require('sequelize');

module.exports = (db,tp)=>{
    return db.define("topic",{
        id:{
            type:tp.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        title:tp.STRING,
        body:tp.TEXT
    })
}