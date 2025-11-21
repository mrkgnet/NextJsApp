import mongoose, { Schema, model, models } from "mongoose";

const contactSchema = new Schema(
  {
    firstname:
    {
      type: String,
      required: true,
      trim: true,
      minLength: [4, 'نام کوتاه نباید کمتر از 2 کاراکتر باشد']
    },
    lastname:
    {
      type: String,
      required: true,
      trim: true
    },
    age:
    {
      type: String,
      trim: true
    },
    gender:
    {
      type: String,
      trim: true
    },
    userId_Creator:
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    favorite:{
      type: Boolean,
      default: false
    },
    phone:
    {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(?:\+98|0098|0)?9\d{9}$/.test(v);
        },
        message: props => `${props.value} یک شماره موبایل معتبر ایرانی نیست!`
      },
      required: [true, 'شماره موبایل الزامی است']
    },
  },


  {
    timestamps: true,
  },

);

const Contact =
  models.Contact || model("Contact", contactSchema, "tbl_contact");

export default Contact;
