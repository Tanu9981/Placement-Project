
import { useEffect, useState } from "react";
import API from "../api";
import { theme } from "../theme";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button
} from "@mui/material";

export default function AdminQueries() {

  const [queries, setQueries] = useState([]);
  const [replyText, setReplyText] = useState({});

  const fetchQueries = async () => {
    try {
      const res = await API.get("/query/all");
      setQueries(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleReply = async (id) => {
    try {
      if (!replyText[id]) {
        alert("Enter reply ❗");
        return;
      }

      await API.put(`/query/reply/${id}`, {
        reply: replyText[id]
      });

      alert("Reply sent ✅");

      setReplyText(prev => ({ ...prev, [id]: "" }));
      fetchQueries();

    } catch (error) {
      alert("Error replying");
    }
  };

  return (

    <Box>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Student Queries
      </Typography>

      {queries.length === 0 && (
        <Typography color="#6b7280">
          No queries found
        </Typography>
      )}

      {queries.map((q) => (

        <Card key={q._id} sx={cardStyle}>
          <CardContent>

          
            <Typography fontSize={13} color="#6b7280">
              {q.student?.name}
            </Typography>

           
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

       
            {q.status === "pending" && (
              <Box mt={2}>

                <TextField
                  fullWidth
                  size="small"
                  placeholder="Write reply..."
                  value={replyText[q._id] || ""}
                  onChange={(e) =>
                    setReplyText({
                      ...replyText,
                      [q._id]: e.target.value
                    })
                  }
                  sx={inputStyle}
                />

                <Button
                  sx={btnStyle}
                  onClick={() => handleReply(q._id)}
                >
                  Send Reply
                </Button>

              </Box>
            )}

          </CardContent>
        </Card>

      ))}

    </Box>
  );
}


const cardStyle = {
  background: "#ffffff",
  color: "#1f2937",
  borderRadius: 3,
  border: "1px solid #e5e7eb",
  mb: 2
};

const inputStyle = {
  mt: 1,
  "& .MuiOutlinedInput-root": {
    background: "#f9fafb",
    "& fieldset": { borderColor: "#e5e7eb" },
    "&:hover fieldset": { borderColor: "#0D3B66" },
    "&.Mui-focused fieldset": { borderColor: "#0D3B66" }
  }
};

const btnStyle = {
  mt: 1,
  background: "#0D3B66",
  color: "white",
  fontWeight: "bold",
  textTransform: "none",
  "&:hover": {
    opacity: 0.9
  }
};
