import Layout from "./Layout";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

export default function Companies() {

  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const incompleteProfile =
    !user?.roll_no || !user?.course || !user?.batch;


  useEffect(() => {
    API.get("/company").then(res => setCompanies(res.data));
  }, []);

  useEffect(() => {
    API.get("/application/my").then(res => {
      setAppliedIds(res.data.map(a => a.company._id));
    });
  }, []);

 
  const isEligible = (company) => {
    if (!user || !company?.eligibility) return false;

    const userBranch = user.branch?.toLowerCase().trim();
    const allowedBranches = company.eligibility?.branches?.map(
      b => b.toLowerCase().trim()
    ) || [];

    const cgpa = Number(user.cgpa);
    const minCGPA = Number(company.eligibility?.minCGPA);

    return (
      cgpa >= minCGPA &&
      (
        allowedBranches.length === 0 ||
        allowedBranches.includes(userBranch)
      )
    );
  };

 
  const handleOpen = (companyId) => {
    setSelectedCompany(companyId);
    setOpen(true);
  };


  const handleApply = async () => {
    try {

      await API.post(`/application/apply/${selectedCompany}`);

      alert("Applied Successfully 🚀");

      setAppliedIds([...appliedIds, selectedCompany]);
      setOpen(false);

    } catch (error) {
      alert(error.response?.data?.message || "Error applying");
    }
  };

  return (
    <Layout role="student">

      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Companies
        </Typography>
        <Typography color="#6b7280">
          Explore placement opportunities
        </Typography>
      </Box>

     
      {incompleteProfile && (
        <Box mb={3}>
          <Typography color="red">
            ⚠ Complete your profile before applying
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>

        {companies.map((c) => {

          const eligible = isEligible(c);
          const alreadyApplied = appliedIds.includes(c._id);

          return (
            <Grid item xs={12} md={3} key={c._id}>

              <Card
                sx={{
                  ...cardStyle,
                  opacity: eligible ? 1 : 0.6,
                  filter: eligible ? "none" : "grayscale(40%)"
                }}
              >
                <CardContent>

                  <Typography fontWeight="bold">
                    {c.name}
                  </Typography>

                  <Typography color="#6b7280" mt={1}>
                    {c.role}
                  </Typography>

                  <Typography mt={2}>
                    💰 {c.package} LPA
                  </Typography>

                  <Typography color="#6b7280">
                    📍 {c.location}
                  </Typography>

                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Typography fontSize={13} color="#2563eb">
                      📊 Applied: {c.appliedCount || 0}
                    </Typography>

                    <Typography fontSize={13} color="#16a34a">
                      🎉 Placed: {c.placedCount || 0}
                    </Typography>
                  </Box>

                
                  <Button
                    fullWidth
                    disabled={
                      alreadyApplied ||
                      !eligible ||
                      incompleteProfile
                    }
                    sx={{
                      ...btnStyle,
                      background:
                        alreadyApplied
                          ? "#16a34a"
                          : !eligible || incompleteProfile
                            ? "#9ca3af"
                            : "#0D3B66"
                    }}
                    onClick={() => handleOpen(c._id)}
                  >
                    {alreadyApplied
                      ? "Applied"
                      : incompleteProfile
                        ? "Complete Profile"
                        : !eligible
                          ? "Not Eligible"
                          : "Apply"}
                  </Button>

                 
                  <Button
                    fullWidth
                    sx={detailBtn}
                    onClick={() => {
                      if (!eligible) {
                        alert("You are not eligible for this company ❗");
                        return;
                      }
                      navigate(`/student/drive/${c._id}`);
                    }}
                  >
                    View Details
                  </Button>

                </CardContent>
              </Card>

            </Grid>
          );
        })}

      </Grid>

    
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Application</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to apply for this company?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleApply} variant="contained">
            Yes, Apply
          </Button>
        </DialogActions>
      </Dialog>

    </Layout>
  );
}

const cardStyle = {
  background: "#ffffff",
  borderRadius: 3,
  border: "1px solid #e5e7eb",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  }
};

const btnStyle = {
  mt: 2,
  color: "white",
  fontWeight: "bold",
  textTransform: "none"
};

const detailBtn = {
  mt: 1,
  border: "1px solid #0D3B66",
  color: "#0D3B66",
  textTransform: "none"
};