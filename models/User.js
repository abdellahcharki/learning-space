
module.exports = (db,tp)=>{
    return db.define("user",{
        id:{
            type:tp.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        mail:{
            type:tp.STRING,
            unique: true,
            allowNull: false,
            validate:{
                isEmail: true,
            }
        },
        password:{
            type:tp.STRING,
            allowNull: false,
        }
    })
}