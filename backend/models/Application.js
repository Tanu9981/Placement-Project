import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  },
  status: {
    type: String,
    default: "applied"
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  resume: {
    type: String,
  }
  
});

export default mongoose.model("Application", applicationSchema);