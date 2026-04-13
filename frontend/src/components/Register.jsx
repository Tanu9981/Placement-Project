import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import API from "../api";
import { theme } from "../theme";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem
} from "@mui/material";

import { signInWithPopup } from "firebase/auth"; 
import { auth, provider } from "../firebase";  

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    cgpa: ""
  });

  const branchOptions = ["CSE", "IT", "AI", "AI&DS", "ECE"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      if (!form.name || !form.email || !form.password || !form.branch || !form.cgpa) {
        alert("Please fill all fields ❗");
        return;
      }
      const nameRegex = /^[A-Za-z ]{3,}$/;
      if (!nameRegex.test(form.name)) {
        alert("Enter valid full name ❗");
        return;
      }

      if (!form.name.trim().includes(" ")) {
        alert("Enter full name (First + Last) ❗");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        alert("Enter valid email ❗");
        return;
      }
      if (form.password.length < 4) {
        alert("Password must be at least 4 characters ❗");
        return;
      }
      const cgpa = parseFloat(form.cgpa);
      if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
        alert("CGPA must be between 0 and 10 ❗");
        return;
      }

      const payload = {
        name: form.name,
        email: form.email.toLowerCase(),
        password: form.password,
        branch: form.branch,
        cgpa: cgpa
      };

      await API.post("/auth/register", payload);

      alert("Registered successfully ✅");
      navigate("/login");

    } catch (error) {
      console.log("ERROR:", error.response?.data);
      alert(error.response?.data?.message || "Register failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await API.post("/auth/google-login", {
        name: user.displayName,
        email: user.email
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/student/dashboard");

    } catch (error) {
      console.log(error);
      alert("Google login failed");
    }
  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: theme.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >

      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 3,
          overflow: "hidden",
          display: "flex",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}
      >

        <Box
          sx={{
            flex: 1,
            background: "#ffffff",
            color: theme.textDark,
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >

          <Typography variant="h4" fontWeight="bold" mb={1}>
            Register
          </Typography>

          <Typography color="#6b7280" mb={3}>
            Create your student account
          </Typography>

          <TextField
            name="name"
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            sx={inputStyle}
          />

          <TextField
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            sx={inputStyle}
          />

          <TextField
            name="password"
            type="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            sx={inputStyle}
          />

          <TextField
            select
            name="branch"
            label="Branch"
            value={form.branch}
            onChange={handleChange}
            fullWidth
            sx={inputStyle}
          >
            {branchOptions.map((b) => (
              <MenuItem key={b} value={b}>
                {b}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="cgpa"
            label="CGPA"
            value={form.cgpa}
            onChange={handleChange}
            fullWidth
            sx={inputStyle}
          />

          <Button fullWidth sx={btnStyle} onClick={handleRegister}>
            Register
          </Button>

         

          <Typography mt={3} color="#6b7280">
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </Typography>

        </Box>

    
        <Box
          sx={{
            flex: 1,
            background: theme.primary,
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            p: 4
          }}
        >

          <Typography variant="h4" fontWeight="bold">
            Join Placement Portal 🚀
          </Typography>

          <Typography mt={2} mb={4}>
            Build your career with us
          </Typography>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="student"
            style={{ width: 180 }}
          />

        </Box>

      </Box>

    </Box>
  );
}

const inputStyle = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    background: "#f9fafb",
    "& fieldset": { borderColor: "#e5e7eb" },
    "&:hover fieldset": { borderColor: "#0D3B66" },
    "&.Mui-focused fieldset": { borderColor: "#0D3B66" }
  }
};

const btnStyle = {
  mt: 2,
  py: 1.2,
  borderRadius: 2,
  background: "#0D3B66",
  color: "white",
  fontWeight: "bold",
  textTransform: "none"
};