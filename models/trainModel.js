import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const schema = mongoose.Schema

const trainSchema = new schema({
    trainName:{
        type:String,
        unique:true,
        required:true
    },
    origin:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    travelDistance:{
        type:Number,
        required:true
    },
    arrival:{
        type:String,
        required:true
    },
    departure:{
        type:String,
        required:true
    },
    availableDays:{
        type:[String]
    },
    trainNumber:{
        type:Number,
        required:true,
        unique:true
    },
    class:{
        type:String,
        required:true

    },
    price:{
        type:Number,
        required:true
    }
})

trainSchema.plugin(uniqueValidator)

module.exports=mongoose.model('train',trainSchema)