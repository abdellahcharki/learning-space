const { DataTypes,Sequelize } = require('sequelize');

module.exports = (db,tp)=>{
    return db.define("courses",{
        id:{
            type:tp.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:tp.STRING,
        imgUrl:tp.STRING
    })
}