const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
   name:String,
   age:Number,
   class1:String,
   add:String
},{versionKey:false}) // remove 'v' from the backend
module.exports = new mongoose.model("student",studentSchema,"studentDetails");
