const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const attendanceSchema = new Schema({
   user:{
    type: [Schema.Types.ObjectId],
   },
   training:{
    type: Schema.Types.ObjectId,
   }
        },
    {
    timestamps: true
    });
    

module.exports = model("Attendance", attedanceSchema);
