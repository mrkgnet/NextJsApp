import { model, models, Schema } from "mongoose";

const otpSchema = new Schema({
    phone :{
        type : String,
        required : true
    },
    otp : {
        type : String,
        required : true
    },
    // createdAt : {
    //     type : Date,
    //     default : Date.now,
    //     expires : 300 // 5 minutes
    // }
    expTime :{
        type : Date,
        required : true
    }
    
})

const Otp = models.Otp || model('tbl_otp',otpSchema)
