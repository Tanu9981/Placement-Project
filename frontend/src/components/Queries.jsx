import { useState, useEffect } from "react";
import API from "../api";
import { theme } from "../theme";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent
} from "@mui/material";

export default function Queries() {

  const [message, setMessage] = useState("");
  const [queries, setQueries] = useState([]);

  const fetchQueries = async () => {
    try {
      const res = await API.get("/query/my");
      setQueries(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!message) {
        alert("Enter your query ❗");
        return;
      }

      await API.post("/query/add", { message });

      setMessage("");
      fetchQueries();

    } catch (error) {
      alert("Error submitting query");
    }
  };

  return (

    <Box>

    
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Queries
      </Typography>

     
      <Card sx={cardStyle}>
        <CardContent>

          <Typography mb={2}>
            Ask your query
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your query..."
            sx={inputStyle}
          />

          <Button sx={btnStyle} onClick={handleSubmit}>
            Submit
          </Button>

        </CardContent>
      </Card>

     
      <Box mt={3}>

        {queries.length === 0 && (
          <Typography color="#6b7280">
            No queries yet
          </Typography>
        )}

        {queries.map((q) => (

          <Card key={q._id} sx={cardStyle2}>

            <CardContent>

              <Typography fontWeight="bold">
                {q.message}
              </Typography>

              <Typography
                mt={1}
                color={
                  q.status === "answered"
                    ? "#16a34a"
                    : "#ca8a04"
                }
              >
                Status: {q.status}
              </Typography>

            
              {q.reply && (
                <Typography mt={1} color={theme.primary}>
                  Reply: {q.reply}
                </Typography>
              )}

            </CardContent>

          </Card>

        ))}

      </Box>

    </Box>
  );
}


const cardStyle = {
  background: "#ffffff",
  color: "#1f2937",
  borderRadius: 3,
  border: "1px solid #e5e7eb"
};

const cardStyle2 = {
  background: "#f9fafb",
  color: "#1f2937",
  borderRadius: 3,
  border: "1px solid #e5e7eb",
  mb: 2
};

const inputStyle = {
  mb: 2,
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
  mt: 1,
  textTransform: "none",
  "&:hover": {
    opacity: 0.9
  }
};