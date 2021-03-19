const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const employeeSchema = new Schema({
  f_name : {
    type : String,
    required : true
  },
  l_name : {
    type : String,
    required : true
  },
  company : {
    type : Schema.Types.ObjectId,
    ref : "company",
    required : true
  },
  nationalCode : {
    type : Number,
    required : true
  },
  gender : {
    type : String,
    required : true
  },
  ceo : {
    type : Boolean,
    required : true
  },
  birthDate : {
    type : Date,
    required : true
  }
})


module.exports = mongoose.model("employee", employeeSchema);