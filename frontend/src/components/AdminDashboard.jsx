import Layout from "./Layout";
import AdminQueries from "./AdminQueries";
import { theme } from "../theme";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Divider
} from "@mui/material";

import { useEffect, useState } from "react";
import API from "../api";

export default function AdminDashboard() {

  const [stats, setStats] = useState({});
  const [applications, setApplications] = useState([]);
  const [showQueries, setShowQueries] = useState(false);

  useEffect(() => {
    API.get("/admin/stats").then(res => setStats(res.data));
    API.get("/application/all").then(res => setApplications(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/application/status/${id}`, { status });

      setApplications(prev =>
        prev.filter(app => app._id !== id)
      );

    } catch (error) {
      alert("Error updating status");
    }
  };

  return (
    <Layout role="admin">

    
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          Admin Dashboard
        </Typography>

        <Box>
          <Button
            sx={btnStyle}
            onClick={() => setShowQueries(false)}
          >
            Applications
          </Button>

          <Button
            sx={{ ...btnStyle, ml: 2 }}
            onClick={() => setShowQueries(true)}
          >
            Queries
          </Button>
        </Box>
      </Box>


      {!showQueries && (
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={4}>
            <Card sx={cardStyle}>
              <CardContent>
                <Typography>Total Companies</Typography>
                <Typography variant="h5">
                  {stats.totalCompanies || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={cardStyle}>
              <CardContent>
                <Typography>Total Students</Typography>
                <Typography variant="h5">
                  {stats.totalStudents || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={cardStyle}>
              <CardContent>
                <Typography>Placed</Typography>
                <Typography variant="h5" color="#16a34a">
                  {stats.totalPlaced || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* MAIN */}
      {showQueries ? (
        <AdminQueries />
      ) : (
        <Card sx={cardStyle}>
          <CardContent>

            <Typography fontWeight="bold" mb={2}>
              Applications
            </Typography>

            {applications.length === 0 && (
              <Typography color="#6b7280">
                No pending applications 🚀
              </Typography>
            )}

            {applications
            .filter(a => a.status === "applied").map((a) => (
              <Box key={a._id} mb={2} p={2} sx={boxStyle}>

                <Typography fontWeight="bold">
                  {a.student?.name} → {a.company?.name || "N/A"}
                </Typography>

                <Typography
                  color={
                    a.status === "selected"
                      ? "#16a34a"
                      : a.status === "rejected"
                      ? "#dc2626"
                      : "#ca8a04"
                  }
                >
                  Status: {a.status}
                </Typography>

            
                {a.resume ? (
                  <a
                    href={`http://localhost:5000${a.resume}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button size="small" sx={{ mr: 1 }}>
                      View Resume
                    </Button>
                  </a>
                ) : (
                  <Typography fontSize={12} color="#6b7280">
                    No Resume
                  </Typography>
                )}

              
                <Box mt={1}>
                  <Button
                    size="small"
                    sx={actionBtn}
                    onClick={() => updateStatus(a._id, "selected")}
                  >
                    Select
                  </Button>

                  <Button
                    size="small"
                    sx={{ ...actionBtn, ml: 1 }}
                    onClick={() => updateStatus(a._id, "rejected")}
                  >
                    Reject
                  </Button>
                </Box>

                <Divider sx={{ my: 1 }} />

              </Box>
            ))}

          </CardContent>
        </Card>
      )}

    </Layout>
  );
}

const cardStyle = {
  background: "#ffffff",
  color: "#1f2937",
  borderRadius: 3,
  border: "1px solid #e5e7eb"
};

const boxStyle = {
  background: "#f9fafb",
  borderRadius: 2,
  border: "1px solid #e5e7eb"
};

const btnStyle = {
  background: "#0D3B66",
  color: "white",
  fontWeight: "bold",
  textTransform: "none",
  "&:hover": { opacity: 0.9 }
};

const actionBtn = {
  border: "1px solid #0D3B66",
  color: "#0D3B66",
  textTransform: "none",
  "&:hover": {
    background: "#f1f5f9"
  }
};