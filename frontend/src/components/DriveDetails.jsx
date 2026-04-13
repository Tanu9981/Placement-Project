import { useParams, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import API from "../api";
import Layout from "./Layout";
import { theme } from "../theme";
import { Box, Typography, Card, CardContent, Button } from "@mui/material"; 
export default function DriveDetails() {

  const { id } = useParams();
  const navigate = useNavigate(); 

  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await API.get(`/company`);
        const selected = res.data.find(c => c._id === id);
        setCompany(selected);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCompany();
  }, [id]);

  if (!company) return <Typography>Loading...</Typography>;

  return (
    <Layout role="student">

      <Box mb={3}>

        
        <Typography
          sx={{ cursor: "pointer", mb: 1 }}
          onClick={() => navigate(-1)}
        >
          ← Back
        </Typography>

        <Typography variant="h4" fontWeight="bold">
          Drive Details
        </Typography>

        <Typography color="#6b7280">
          View company information
        </Typography>
      </Box>

      <Card sx={cardStyle}>
        <CardContent>

          <Typography variant="h5" fontWeight="bold">
            {company.name}
          </Typography>

          <Typography mt={2}>
            <strong>Role:</strong> {company.role}
          </Typography>

          <Typography>
            <strong>Package:</strong> {company.package} LPA
          </Typography>

          <Typography>
            <strong>Location:</strong> {company.location}
          </Typography>

          <Box mt={3}>
            <Typography fontWeight="bold">
              Eligibility
            </Typography>

            <Typography mt={1}>
              CGPA: {company.eligibility?.minCGPA}
            </Typography>

            <Typography>
              Branches: {company.eligibility?.branches?.join(", ")}
            </Typography>
          </Box>

        
          <Box mt={4} display="flex" gap={2}>

            <Button
              variant="contained"
              onClick={() => navigate("/student/companies")}
              sx={{
                background: "#0D3B66",
                textTransform: "none"
              }}
            >
              Back to Companies
            </Button>

          </Box>

        </CardContent>
      </Card>

    </Layout>
  );
}

const cardStyle = {
  background: "#ffffff",
  color: "#1f2937",
  borderRadius: 3,
  border: "1px solid #e5e7eb",
  p: 3
};