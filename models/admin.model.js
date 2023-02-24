const mongoose =require('mongoose')
const adminSchema =new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }

},{
    timestamps:true,
    versionKey:false,
}
)

module.exports=new mongoose.model('Admin',adminSchema)