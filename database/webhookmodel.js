const mongoose=require("mongoose")
const WebHook=mongoose.Schema({
    name:String,
    payload:Object,
    addedBy:String,
    detail:String,
},{
    timestamps:true
});
module.exports=mongoose.model('WebHook',WebHook);