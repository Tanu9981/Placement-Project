import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,
  branch: String,
  cgpa: Number,


  roll_no: String,
  course: String,
  batch: String,
  linkedin_url: String,
  github_url: String,
  resume_url: String,

  role: {
  type: String,
  enum: ["student", "admin"], 
  default: "student"
}
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("User", userSchema);