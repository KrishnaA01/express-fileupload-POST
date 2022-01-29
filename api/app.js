const express = require("express")
const app = express ()
const ImagesCollection = require("./ImageSchema")
const UsersCollection = require("./UserSchema")
const fileUpload = require("express-fileupload")
const stream = require("stream")
const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/fullstack-post", ()=>console.log("connected to mongoDB"));



const PORT = process.env.PORT || 4000;

//middleware
// app.use(express.json())
app.use(fileUpload());



app.get("/", (req,res)=>{
    
    res.send({message: "server is ready mate"})
})

app.post("/register", async (req,res)=>{
    let image;
    if(req.files){
        image = new ImagesCollection({
            filename: `${Date.now()}_${req.files.image.name}`,
            file:{
                data:req.files.image.data,
                mimetype:req.files.image.mimetype,
            }
        })
        await image.save()
    }
    const user = new UsersCollection({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        image:`http://localhost:4000/images/${image.filename}`
    })
  
    await user.save()
    res.send({success:true,data:user})
});

app.get("/images/:filename",async (req,res)=>{
    const image = await ImagesCollection.findOne({filename:req.params.filename})
    const readStream= stream.Readable.from(image.file.data)
    // readstream.pipe(writestream)
   readStream.pipe(res) 
     /*   let writeStream=  fs.createWriteStream(`./${req.params.filename}`)
       readStream.pipe(writeStream) */
})


app.listen(PORT, ()=> console.log(`server is running on port:${PORT}`));