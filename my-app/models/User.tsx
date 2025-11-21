import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    firstname:{
        type: String,
        required: true,
        trim: true
    },
    lastname:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
},{timestamps: true});

const User = models.User || model("User", userSchema , "tbl_user");

export default User;
    