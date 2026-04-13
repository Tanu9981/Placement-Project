import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { theme } from "../theme";
import logo from "../assets/logo.png";

export default function Home() {

  const navigate = useNavigate();

  return (

    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }}
    >

   
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(rgba(13,59,102,0.75), rgba(250,240,202,0.9))"
        }}
      />

     
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          backdropFilter: "blur(10px)",
          background: "rgba(13,59,102,0.7)",
          color: "white"
        }}
      >

       
        <Box display="flex" alignItems="center" gap={2}>
          <img src={logo} alt="logo" style={{ width: 45 }} />

          <Box>
            <Typography fontWeight="bold" fontSize={14}>
              School of Data Science & Forecasting - DAVV
            </Typography>
           
          </Box>
        </Box>

        <Box>
          <Button sx={navBtn} onClick={() => navigate("/")}>Home</Button>
          <Button sx={navBtn} onClick={() => navigate("/login")}>Login</Button>
          <Button sx={navBtn} onClick={() => navigate("/register")}>Register</Button>
        </Box>

      </Box>

     
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "75vh",
          px: 2,
          animation: "fadeIn 1.5s ease"
        }}
      >

        <Typography variant="h3" fontWeight="bold" mb={2} color="white">
          Placement Portal 🎓
        </Typography>

        <Typography mb={2} color="#e5e7eb">
          School of Data Science & Forecasting  
          <br />
          Devi Ahilya Vishwavidyalaya, Indore
        </Typography>

        <Typography mb={4} maxWidth="600px" color="#e5e7eb">
          Empowering students with top placement opportunities, real-time tracking,
          and seamless application experience.
        </Typography>

        
        <Box display="flex" gap={2}>
          <Button sx={mainBtn} onClick={() => navigate("/register")}>
            Get Started
          </Button>

          <Button sx={outlineBtn} onClick={() => navigate("/login")}>
            Login
          </Button>
        </Box>

      </Box>

    
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          p: 6,
          background: "#ffffff"
        }}
      >

        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Key Features
        </Typography>

        <Grid container spacing={3}>

          {features.map((f, i) => (
            <Grid item xs={12} md={3} key={i}>
              <Card
                sx={{
                  ...featureCard,
                  animation: `slideUp 0.6s ease ${i * 0.2}s both`
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {f.title}
                  </Typography>
                  <Typography color="#6b7280" mt={1}>
                    {f.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

        </Grid>

      </Box>

     
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          p: 6,
          background: theme.primary,
          color: "white",
          textAlign: "center"
        }}
      >

        <Typography variant="h5" fontWeight="bold" mb={2}>
          About SDSF Placement Portal
        </Typography>

        <Typography maxWidth="800px" mx="auto" color="#e5e7eb">
          This portal is developed for the Department of School of Data Science
          and Forecasting, DAVV Indore. It enables students to explore job
          opportunities, apply efficiently, and track their placement journey,
          while helping administrators manage the entire process seamlessly.
        </Typography>

      </Box>

   
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>

    </Box>
  );
}


const features = [
  {
    title: "Easy Applications",
    desc: "Apply to companies quickly with a smooth process."
  },
  {
    title: "Track Progress",
    desc: "Monitor your application status in real-time."
  },
  {
    title: "Smart Eligibility",
    desc: "Only eligible students can apply."
  },
  {
    title: "Centralized Portal",
    desc: "All placement activities in one platform."
  }
];


const navBtn = {
  color: "white",
  textTransform: "none",
  fontWeight: "bold",
  "&:hover": { opacity: 0.8 }
};

const mainBtn = {
  background: "#0D3B66",
  color: "white",
  px: 3,
  py: 1.2,
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: "bold",
  "&:hover": { opacity: 0.9 }
};

const outlineBtn = {
  border: "1px solid white",
  color: "white",
  px: 3,
  py: 1.2,
  borderRadius: "8px",
  textTransform: "none",
  "&:hover": {
    background: "rgba(255,255,255,0.1)"
  }
};

const featureCard = {
  borderRadius: 3,
  border: "1px solid #e5e7eb",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 25px rgba(0,0,0,0.15)"
  }
};