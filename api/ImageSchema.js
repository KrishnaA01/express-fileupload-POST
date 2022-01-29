const mongoose = require("mongoose")
const {Schema}= mongoose;


const ImageSchema = new Schema ({
    filename:{type:String},
    file:{
        data:{type:Buffer},
        mimetype:{type:String}
    }
})


const ImagesCollection = mongoose.model("images", ImageSchema)
module.exports = ImagesCollection;