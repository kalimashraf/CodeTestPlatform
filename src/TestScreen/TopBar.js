import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function TopBar({ durationMinutes = 30, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onTimeUp]);

  const formatTime = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
      seconds % 60
    ).padStart(2, "0")}`;

  return (
    <Box
      sx={{
        width: "100%",
        height: 60,
        px: 2,
        backgroundColor: "#212121",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #444",
        boxSizing: "border-box", // ensure no overflow
        overflow: "hidden", // clip if content overflows
        flexShrink: 0, // don't shrink in flex layout
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        noWrap
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        🧠 Coding Challenge
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          minWidth: "70px",
          textAlign: "right",
        }}
      >
        ⏰ {formatTime(timeLeft)}
      </Typography>
    </Box>
  );
}
