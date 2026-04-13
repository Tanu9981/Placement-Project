import { useNavigate, useLocation } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import { theme } from "../theme";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import logo from "../assets/logo.png";

const drawerWidth = 240;

export default function Layout({ role, children }) {

  const navigate = useNavigate();
  const location = useLocation();


  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const studentMenu = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/student/dashboard" },
    { text: "Companies", icon: <BusinessIcon />, path: "/student/companies" },
    { text: "My Profile", icon: <AccountCircleIcon />, path: "/student/profile" }
  ];

  const adminMenu = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { text: "Add Company", icon: <AddCircleIcon />, path: "/admin/add-company" },
    { text: "Placements", icon: <WorkIcon />, path: "/admin/placements" }
  ];

  const menuItems = role === "admin" ? adminMenu : studentMenu;

  return (

    <Box sx={{ display: "flex" }}>

    
      <Box
        sx={{
          width: drawerWidth,
          minHeight: "100vh",
          background: "linear-gradient(180deg, #0D3B66 0%, #2563eb 100%)",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >

       
        <Box>

        
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <img src={logo} alt="logo" style={{ width: 40 }} />
            <Typography fontWeight="bold" color="#fff">
              Placement Portal
            </Typography>
          </Box>

  

         
          <List>
            {menuItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <ListItemButton
                  key={item.text}
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    color: active ? "#fff" : "#c7d2fe",
                    background: active
                      ? "rgba(255,255,255,0.2)"
                      : "transparent"
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText primary={item.text} />
                </ListItemButton>
              );
            })}
          </List>

        </Box>

      
        <Box>
          <Divider sx={{ my: 2, borderColor: "#ffffff30" }} />

          <Button
            fullWidth
            onClick={handleLogout}
            sx={{
              border: "1px solid #ffffff40",
              color: "#fff"
            }}
          >
            Logout
          </Button>
        </Box>

      </Box>

   
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          background: theme.background,
          minHeight: "100vh"
        }}
      >
        {children}
      </Box>

    </Box>
  );
}