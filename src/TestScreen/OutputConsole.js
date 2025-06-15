import React from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Divider,
  Chip,
} from "@mui/material";

export default function OutputConsole({
  output,
  activeTab,
  setActiveTab,
  testResults = [],
  testCases = [],
}) {
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        sx={{
          backgroundColor: "#1e1e1e",
          color: "#ccc",
          "& .Mui-selected": {
            color: "#fff",
          },
        }}
        TabIndicatorProps={{
          style: { backgroundColor: "#7B1FA2", height: "3px" },
        }}
      >
        <Tab label="Output" value="output" />
        <Tab label={`Test Cases (${testResults.length})`} value="testcases" />
      </Tabs>

      <Box
        sx={{
          backgroundColor: "#121212",
          flex: 1,
          p: 2,
          color: "#e0e0e0",
          fontFamily: "'Fira Code', monospace",
          fontSize: 14,
          overflowY: "auto",
        }}
      >
        {activeTab === "output" ? (
          <Typography component="pre" sx={{ whiteSpace: "pre-wrap" }}>
            {output || "// 🖥️ Run your code to see output here..."}
          </Typography>
        ) : (
          <Box>
            {testResults.length === 0 ? (
              <Typography sx={{ color: "#9c27b0" }}>
                Run your code to see test case results here...
              </Typography>
            ) : (
              testResults.map((result, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 3,
                    p: 2,
                    backgroundColor: "#1a1a1a",
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#9c27b0", fontWeight: 500 }}
                    >
                      Test Case {index + 1}
                    </Typography>
                    <Chip
                      label={result.passed ? "PASSED" : "FAILED"}
                      color={result.passed ? "success" : "error"}
                      size="small"
                      sx={{ ml: 2 }}
                    />
                  </Box>
                  <Divider sx={{ my: 1, borderColor: "#333" }} />

                  <Typography variant="body2" sx={{ mb: 1, color: "#ccc" }}>
                    <strong>Input:</strong>
                  </Typography>
                  <Typography
                    component="pre"
                    sx={{
                      mb: 2,
                      p: 1,
                      backgroundColor: "#0d1117",
                      borderRadius: 1,
                      fontSize: 12,
                    }}
                  >
                    {result.input || "(no input)"}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1, color: "#ccc" }}>
                    <strong>Expected Output:</strong>
                  </Typography>
                  <Typography
                    component="pre"
                    sx={{
                      mb: 2,
                      p: 1,
                      backgroundColor: "#0d1117",
                      borderRadius: 1,
                      fontSize: 12,
                    }}
                  >
                    {result.expected}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1, color: "#ccc" }}>
                    <strong>Your Output:</strong>
                  </Typography>
                  <Typography
                    component="pre"
                    sx={{
                      mb: 1,
                      p: 1,
                      backgroundColor: "#0d1117",
                      borderRadius: 1,
                      fontSize: 12,
                      color: result.passed ? "#4caf50" : "#f44336",
                    }}
                  >
                    {result.actual || "(no output)"}
                  </Typography>

                  {result.status && (
                    <Typography
                      variant="body2"
                      sx={{ color: "#888", fontSize: 12 }}
                    >
                      Status: {result.status}
                    </Typography>
                  )}
                </Box>
              ))
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
}
