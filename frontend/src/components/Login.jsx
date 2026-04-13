import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { theme } from "../theme";
import {
  Box,
  TextField,
  Button,
  Typography
} from "@mui/material";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";  

import logo from "../assets/logo.png";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {

    
      if (!email || !password) {
        alert("Enter email and password ❗");
        return;
      }

      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      const profileRes = await API.get("/auth/profile");

      localStorage.setItem("user", JSON.stringify(profileRes.data));

      if (profileRes.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
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
    
      const profileRes = await API.get("/auth/profile");
      localStorage.setItem("user", JSON.stringify(profileRes.data));

      navigate("/student/dashboard");

    } catch (error) {
  console.log(error);

  if (error.response?.data?.message) {
    alert(error.response.data.message);
  } else {
    alert("Google login failed");
  }
}
  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: theme.background
      }}
    >

   
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
          borderBottom: "1px solid #e5e7eb",
          background: "#ffffff"
        }}
      >

        <Box display="flex" alignItems="center" gap={1}>
          <img src={logo} alt="logo" style={{ width: 35 }} />
          <Typography fontWeight="bold">
            Placement Portal
          </Typography>
        </Box>

        <Button
          onClick={() => navigate("/")}
          sx={{
            color: theme.primary,
            fontWeight: "bold",
            textTransform: "none"
          }}
        >
          Home
        </Button>

      </Box>

    
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 6
        }}
      >

        <Box
          sx={{
            width: "90%",
            maxWidth: "900px",
            display: "flex",
            borderRadius: "16px",
            overflow: "hidden",
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
              Login
            </Typography>

            <Typography color="#6b7280" mb={4}>
              Enter your account details
            </Typography>

            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={inputStyle}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={inputStyle}
            />

            <Button
              fullWidth
              sx={btnStyle}
              onClick={handleLogin}
            >
              Log in
            </Button>

           
            <Button
              fullWidth
              sx={{
                mt: 2,
                background: "#db4437",
                color: "white",
                textTransform: "none",
                "&:hover": { opacity: 0.9 }
              }}
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>

            <Box mt={4} display="flex" justifyContent="space-between">
              <Typography fontSize={12} color="#6b7280">
                Don’t have an account?
              </Typography>

              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button size="small">Register</Button>
              </Link>
            </Box>

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
              p: 4,
              textAlign: "center"
            }}
          >

            <Typography variant="h4" fontWeight="bold">
              Welcome Back 👋
            </Typography>

            <Typography mt={2} mb={4}>
              Login to continue your journey
            </Typography>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="student"
              style={{ width: 200 }}
            />

          </Box>

        </Box>

      </Box>

    </Box>
  );
}


const inputStyle = {
  mb: 3,
  "& .MuiOutlinedInput-root": {
    background: "#f9fafb",
    "& fieldset": { borderColor: "#e5e7eb" },
    "&:hover fieldset": { borderColor: "#0D3B66" },
    "&.Mui-focused fieldset": { borderColor: "#0D3B66" }
  }
};

const btnStyle = {
  background: "#0D3B66",
  color: "white",
  fontWeight: "bold",
  py: 1.2,
  borderRadius: "8px",
  textTransform: "none",
  "&:hover": {
    opacity: 0.9
  }
};
