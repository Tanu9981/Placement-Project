import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: String,
  role: String,
  package: Number,
  location: String,
  eligibility: {
    minCGPA: Number,
    branches: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Company", companySchema);