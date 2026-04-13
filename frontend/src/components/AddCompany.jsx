import Layout from "./Layout";
import { theme } from "../theme";
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  FormControlLabel,
  Checkbox
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import { useState } from "react";
import API from "../api";

export default function AddCompany() {

  const [form, setForm] = useState({
    name: "",
    role: "",
    package: "",
    location: "",
    minCGPA: "",
    branches: []
  });

  const branchOptions = ["CSE", "IT", "AI", "AI&DS", "ECE"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleBranchChange = (branch) => {
    if (form.branches.includes(branch)) {
      setForm({
        ...form,
        branches: form.branches.filter(b => b !== branch)
      });
    } else {
      setForm({
        ...form,
        branches: [...form.branches, branch]
      });
    }
  };

  const handleSubmit = async () => {
    try {

      if (
        !form.name ||
        !form.role ||
        !form.package ||
        !form.location ||
        !form.minCGPA
      ) {
        alert("Please fill all fields ❗");
        return;
      }

      if (form.branches.length === 0) {
        alert("Select at least one branch ❗");
        return;
      }

      console.log("DATA:", form); 

      await API.post("/company/add", {
        name: form.name,
        role: form.role,
        package: Number(form.package),
        location: form.location,
        eligibility: {
          minCGPA: Number(form.minCGPA),
          branches: form.branches 
        }
      });

      alert("Company Added Successfully 🚀");


      setForm({
        name: "",
        role: "",
        package: "",
        location: "",
        minCGPA: "",
        branches: []
      });

    } catch (error) {
      console.log("ERROR:", error.response?.data);
      alert(error.response?.data?.error || "Error adding company");
    }
  };

  return (
    <Layout role="admin">

      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Add New Company
        </Typography>
        <Typography color="#6b7280">
          Add placement drive details
        </Typography>
      </Box>

      <Card sx={cardStyle}>
        <CardContent>

          <Box display="flex" alignItems="center" gap={1} mb={3}>
            <BusinessIcon sx={{ color: theme.primary }} />
            <Typography fontWeight="bold">
              Company Details
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>

            <TextField
              name="name"
              label="Company Name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              sx={inputStyle}
            />

            <TextField
              name="role"
              label="Job Role"
              value={form.role}
              onChange={handleChange}
              fullWidth
              sx={inputStyle}
            />

            <TextField
              name="package"
              label="Package (LPA)"
              value={form.package}
              onChange={handleChange}
              fullWidth
              sx={inputStyle}
            />

            <TextField
              name="location"
              label="Location"
              value={form.location}
              onChange={handleChange}
              fullWidth
              sx={inputStyle}
            />

            <TextField
              name="minCGPA"
              label="Minimum CGPA"
              value={form.minCGPA}
              onChange={handleChange}
              fullWidth
              sx={inputStyle}
            />

           
            <Box>
              <Typography fontWeight="bold">Select Branches</Typography>

              {branchOptions.map((b) => (
                <FormControlLabel
                  key={b}
                  control={
                    <Checkbox
                      checked={form.branches.includes(b)}
                      onChange={() => handleBranchChange(b)}
                    />
                  }
                  label={b}
                />
              ))}
            </Box>

            <Box mt={2}>
              <Button sx={btnStyle} onClick={handleSubmit}>
                Add Company
              </Button>
            </Box>

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
  border: "1px solid #e5e7eb"
};

const inputStyle = {
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
  textTransform: "none",
  px: 4,
  py: 1,
  borderRadius: "8px",
  "&:hover": {
    opacity: 0.9
  }
};