import Notifications from "./Notifications";
import Queries from "./Queries";
import Layout from "./Layout";
import { theme } from "../theme";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Tabs,
  Tab,
  Chip,
  Button,
  Grid
} from "@mui/material";

import { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {

  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [applications, setApplications] = useState([]);
  const [deadlines, setDeadlines] = useState([]);

  const handleChange = (e, newValue) => setTab(newValue);


  const user = JSON.parse(localStorage.getItem("user"));

  const incompleteProfile =
    !user?.roll_no || !user?.course || !user?.batch;

 
  useEffect(() => {
    API.get("/application/my").then(res => setApplications(res.data));
    API.get("/company").then(res => setDeadlines(res.data));
  }, []);

  const appliedIds = applications.map(a => a.company?._id);

  const availableDrives = deadlines.filter(
    d => !appliedIds.includes(d._id)
  );

  return (
    <Layout role="student">

   
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>
        <Typography color="#6b7280">
          Manage your placement journey
        </Typography>
      </Box>

     
      {incompleteProfile && (
        <Box mb={3} p={2} sx={warningBox}>
          <Typography fontWeight="bold">
            ⚠ Complete your profile to unlock applications
          </Typography>

          <Button
            size="small"
            sx={{ mt: 1, textTransform: "none" }}
            onClick={() => navigate("/student/profile")}
          >
            Go to Profile →
          </Button>
        </Box>
      )}

    
      <Grid container spacing={3} mb={3}>

        <Grid item xs={12} md={4}>
          <Card sx={statCard}>
            <CardContent>
              <Typography>Total Applications</Typography>
              <Typography variant="h5">
                {applications.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={statCard}>
            <CardContent>
              <Typography>Available Drives</Typography>
              <Typography variant="h5">
                {availableDrives.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={statCard}>
            <CardContent>
              <Typography>CGPA</Typography>
              <Typography variant="h5">
                {user?.cgpa || "N/A"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

     
      <Tabs
        value={tab}
        onChange={handleChange}
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            color: "#6b7280",
            fontWeight: "bold"
          },
          "& .Mui-selected": {
            color: `${theme.primary} !important`
          },
          "& .MuiTabs-indicator": {
            backgroundColor: theme.primary
          }
        }}
      >
        <Tab label="Overview" />
        <Tab label="Applications" />
        <Tab label="Available Drives" />
        <Tab label="Queries" />
      </Tabs>

     
      {tab === 0 && <Notifications />}

    
      {tab === 1 && (
        <Card sx={cardStyle}>
          <CardContent>

            <Typography fontWeight="bold" mb={2}>
              My Applications
            </Typography>

            {applications.length === 0 && (
              <Typography color="#6b7280">
                You haven't applied anywhere yet 🚀
              </Typography>
            )}

            {applications.map((a) => (
              <Box key={a._id} mb={2} p={2} sx={boxStyle}>

                <Typography fontWeight="bold">
                  {a.company?.name} ({a.company?.role})
                </Typography>

                <Typography fontSize={13} color="#6b7280">
                  Applied on: {new Date(a.appliedAt).toDateString()}
                </Typography>

                <Chip
                  label={a.status}
                  size="small"
                  sx={{
                    mt: 1,
                    background:
                      a.status === "selected"
                        ? "#dcfce7"
                        : a.status === "rejected"
                        ? "#fee2e2"
                        : "#e0e7ff",
                    color:
                      a.status === "selected"
                        ? "#16a34a"
                        : a.status === "rejected"
                        ? "#dc2626"
                        : "#1d4ed8"
                  }}
                />

              </Box>
            ))}

          </CardContent>
        </Card>
      )}

    
      {tab === 2 && (
        <Card sx={cardStyle}>
          <CardContent>

            <Typography fontWeight="bold" mb={2}>
              Available Drives
            </Typography>

            {availableDrives.length === 0 && (
              <Box textAlign="center" py={4}>
                <Typography color="#6b7280" mb={2}>
                  🎯 You’ve already applied to all companies
                </Typography>

                <Button
                  variant="contained"
                  sx={{ background: theme.primary }}
                  onClick={() => navigate("/student/companies")}
                >
                  Explore Companies
                </Button>
              </Box>
            )}

            {availableDrives.map((d) => (
              <Box key={d._id} mb={2} p={2} sx={boxStyle}>

                <Typography fontWeight="bold">
                  {d.name}
                </Typography>

                <Typography color={theme.primary}>
                  {d.role}
                </Typography>

                <Typography color="#6b7280">
                  📍 {d.location}
                </Typography>

                <Button
                  size="small"
                  sx={{ mt: 1, color: theme.primary }}
                  onClick={() => navigate("/student/companies")}
                >
                  Apply Now →
                </Button>

              </Box>
            ))}

          </CardContent>
        </Card>
      )}
      {tab === 3 && <Queries />}

    </Layout>
  );
}


const cardStyle = {
  background: "#ffffff",
  borderRadius: 3,
  border: "1px solid #e5e7eb"
};

const boxStyle = {
  background: "#f9fafb",
  borderRadius: 2,
  border: "1px solid #e5e7eb",
  transition: "0.2s",
  "&:hover": {
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
  }
};

const statCard = {
  background: "rgba(255,255,255,0.7)",
  backdropFilter: "blur(10px)",
  borderRadius: 3,
  border: "1px solid #e5e7eb"
};

const warningBox = {
  background: "#fef3c7",
  border: "1px solid #facc15",
  borderRadius: 2
};