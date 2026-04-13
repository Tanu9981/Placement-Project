import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null  
  },

  text: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["drive", "process", "result", "query"],
    default: "drive"
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: null
  }

}, { timestamps: true }); 
export default mongoose.model("Notification", notificationSchema);