import { useEffect, useState } from "react";
import API from "../api";
import Layout from "./Layout";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid
} from "@mui/material";

export default function AdminPlacements() {

  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const res = await API.get("/application/placed");
        setPlacements(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlacements();
  }, []);

  return (
    <Layout role="admin">

      <Typography variant="h4" fontWeight="bold" mb={3}>
        Placement Records 🎓
      </Typography>

      {placements.length === 0 && (
        <Typography>No placements yet</Typography>
      )}

      <Grid container spacing={3}>

        {placements.map((p) => (

          <Grid item xs={12} md={4} key={p._id}>

            <Card sx={cardStyle}>
              <CardContent>

                <Typography fontWeight="bold">
                  {p.student.name}
                </Typography>

                <Typography color="#6b7280">
                  {p.student.branch}
                </Typography>

                <Box mt={2}>
                  <Typography>
                    🏢 {p.company.name}
                  </Typography>

                  <Typography>
                    💼 {p.company.role}
                  </Typography>

                  <Typography>
                    💰 {p.company.package} LPA
                  </Typography>
                </Box>

              </CardContent>
            </Card>

          </Grid>

        ))}

      </Grid>

    </Layout>
  );
}

const cardStyle = {
  background: "#ffffff",
  borderRadius: 3,
  border: "1px solid #e5e7eb"
};