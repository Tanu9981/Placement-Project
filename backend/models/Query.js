import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  message: {
    type: String,
    required: true
  },
  reply: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: "pending" 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Query", querySchema);