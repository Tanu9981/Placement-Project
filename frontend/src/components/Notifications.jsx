import {
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";

import { useEffect, useState } from "react";
import API from "../api";
import { theme } from "../theme";

export default function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get("/notification");
        setNotifications(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Card sx={cardStyle}>
      <CardContent>

        <Typography fontWeight="bold" mb={3}>
          🔔 Placement Updates
        </Typography>

      
        {notifications.length === 0 && (
          <Typography color="#6b7280">
            No updates yet 🚀
          </Typography>
        )}

   
        {notifications.map((n) => (

          <Box
            key={n._id}
            sx={{
              ...itemStyle,
              borderLeft: `4px solid ${
                n.type === "drive"
                  ? "#ca8a04"
                  : n.type === "process"
                  ? "#0284c7"
                  : "#16a34a"
              }`,
              background:
                n.type === "drive"
                  ? "#fef9c3"
                  : n.type === "process"
                  ? "#e0f2fe"
                  : "#dcfce7"
            }}
          >

          
            <Typography fontWeight="bold">
              {n.text}
            </Typography>

         
            {n.company?.name && (
              <Typography fontSize={13} color="#374151">
                Company: {n.company.name}
              </Typography>
            )}

         
            <Typography fontSize={12} color="#6b7280">
              {new Date(n.createdAt).toLocaleString()}
            </Typography>

          </Box>

        ))}

      </CardContent>
    </Card>
  );
}


const cardStyle = {
  background: "#ffffff",
  color: "#1f2937",
  borderRadius: 3,
  border: "1px solid #e5e7eb",
  width: "100%",
  minHeight: "400px"
};

const itemStyle = {
  mb: 2,
  p: 2,
  borderRadius: 2,
  border: "1px solid #e5e7eb",
  transition: "0.3s",
  cursor: "pointer",
  "&:hover": {
    transform: "translateX(5px)",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  }
};