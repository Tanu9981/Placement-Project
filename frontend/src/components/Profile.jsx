import { useState, useEffect } from "react";
import Layout from "./Layout";
import API from "../api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider
} from "@mui/material";

export default function Profile() {

  const [form, setForm] = useState({});
  const [resumeFile, setResumeFile] = useState(null);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");

        setForm(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));

      } catch (error) {
        console.log("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });

      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      const res = await API.put("/auth/profile", formData);

      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Profile updated ✅");
      setResumeFile(null);

    } catch (error) {
      alert("Error updating profile");
    }
  };

  return (
    <Layout role="student">


      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">
          {form.name || "My Profile"}
        </Typography>
      </Box>

      <Card sx={cardStyle}>
        <CardContent>

          <Typography variant="h6" fontWeight="bold" mb={2}>
            Basic Details
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Name" value={form.name || ""} disabled />
            <TextField label="Email" value={form.email || ""} disabled />
            <TextField label="Branch" value={form.branch || ""} disabled />
            <TextField label="CGPA" value={form.cgpa || ""} disabled />
          </Box>

          <Divider sx={{ my: 4 }} />


          <Typography variant="h6" fontWeight="bold" mb={2}>
            Academic Details
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Roll No"
              name="roll_no"
              value={form.roll_no || ""}
              onChange={handleChange}
            />
            <TextField
              label="Course"
              name="course"
              value={form.course || ""}
              onChange={handleChange}
            />
            <TextField
              label="Batch"
              name="batch"
              value={form.batch || ""}
              onChange={handleChange}
            />
          </Box>

          <Divider sx={{ my: 4 }} />


          <Typography variant="h6" fontWeight="bold" mb={2}>
            Professional Links
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="LinkedIn URL"
              name="linkedin_url"
              value={form.linkedin_url || ""}
              onChange={handleChange}
            />
            <TextField
              label="GitHub URL"
              name="github_url"
              value={form.github_url || ""}
              onChange={handleChange}
            />
          </Box>

          <Divider sx={{ my: 4 }} />


          <Typography variant="h6" fontWeight="bold" mb={2}>
            Resume
          </Typography>


          {form.resume_url && (
            <Typography mb={2}>
              📄 Current Resume:{" "}
              <a
                href={`https://placement-project-g1kt.onrender.com${form.resume_url}`}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
            </Typography>
          )}


          <Typography mb={1}>
            Upload / Update Resume
          </Typography>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              const file = e.target.files[0];

              if (file && file.type !== "application/pdf") {
                alert("Only PDF allowed ❗");
                return;
              }

              setResumeFile(file);
            }}
          />
          <Box mt={3}>
            <Button sx={btnStyle} onClick={handleSave}>
              Save Profile
            </Button>
          </Box>

        </CardContent>
      </Card>

    </Layout>
  );
}


const cardStyle = {
  background: "#ffffff",
  borderRadius: 3,
  padding: 2
};

const btnStyle = {
  background: "#0D3B66",
  color: "white",
  fontWeight: "bold",
  px: 4,
  py: 1,
  borderRadius: "8px",
  textTransform: "none"
};