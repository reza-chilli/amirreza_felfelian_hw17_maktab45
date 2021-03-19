const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name : {
    type : String,
    required : true,
    unique : true    
  },
  city : {
    type : String,
    required: true
  },
  state : {
    type : String,
    required: true
  },
  phoneNumber : {
    type : Number,
    required: true,
    unique : true
  },
  createdAt : {
    type : Date,
    required : true
  },
  registrationNumber : {
    type : Number,
    required: true,
    unique : true
  }
})



module.exports = mongoose.model('company', companySchema);