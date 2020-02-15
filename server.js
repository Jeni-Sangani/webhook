const express=require("express");
const bodyParser=require("body-parser");
const MongoClient=require("./database/connection")
const WebHookModel =require("./database/webhookmodel")
MongoClient().then(()=>{
    console.log("connected");
}).catch(()=>{
    console.log(" not connected");
})
const app=express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.get("/",(req,res)=>{
    res.send("welcome");
});
app.get("/api/WebHook",(req,res)=>{

    WebHookModel.find().then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"successfully fetched"
        });
    }).catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
})

app.post("/api/WebHook",(req,res)=>{
let body=req.body;
    WebHookModel.create(body).then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"successfully created"
        });
    }).catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
})
app.put("/api/WebHook/:id",(req,res)=>{
    let body=req.body;
        WebHookModel.findByIdAndUpdate(req.params.id,body).then((wh)=>{
            res.json({
                flag:true,
                data:wh,
                message:"successfully updated"
            });
        }).catch(e=>{
            res.json({
                flag:false,
                data:null,
                message:e.message
            });
        })
    })
    app.delete("/api/WebHook/:id",(req,res)=>{
        let body=req.body;
            WebHookModel.findByIdAndRemove(req.params.id,function(err,wh){
                if(wh)
                {
                    res.json({
                        flag:true,
                        data:wh,
                        message:"successfully deleted"
                    });
                }else{
                    res.json({
                        flag:false,
                        data:null,
                        message:"successfully not deleted"
                    });
                }
               
           
        })
    })
app.listen(3000)