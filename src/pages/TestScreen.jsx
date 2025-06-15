import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Paper,
} from "@mui/material";
import CodeEditorPanel from "../TestScreen/CodeEditorPanel";

export default function TestScreen() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [languageId, setLanguageId] = useState(null);
  const [code, setCode] = useState("// Write your solution here...");

  useEffect(() => {
    fetch(`http://localhost:5000/problems/${id}`)
      .then((res) => res.json())
      .then((data) => setProblem(data));
  }, [id]);

  const runAllTests = async () => {
    if (!problem || !problem.test_cases) return;

    const results = await Promise.all(
      problem.test_cases.map(async (test) => {
        const res = await fetch("http://localhost:5000/run-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            language_id: languageId,
            input: test.input,
          }),
        });

        const data = await res.json();
        const actual = data.stdout?.trim();
        const expected = test.expected_output?.trim();
        return {
          input: test.input,
          expected,
          actual,
          pass: actual === expected,
        };
      })
    );

    setTestResults(results);
  };

  if (!problem) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading problem...</Typography>
        <CircularProgress sx={{ mt: 2 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Left: Problem Description */}
      <Box
        sx={{
          width: "35%",
          p: 3,
          backgroundColor: "#fff",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {problem.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {problem.description}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2">Input Format:</Typography>
        <Typography variant="body2" gutterBottom>
          {problem.input_format}
        </Typography>
        <Typography variant="subtitle2">Output Format:</Typography>
        <Typography variant="body2">{problem.output_format}</Typography>
      </Box>

      {/* Right: Editor, Buttons, Results */}
      <Box
        sx={{
          width: "65%",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#f9fafb",
          overflowY: "auto",
        }}
      >
        <CodeEditorPanel
          setOutput={() => {}}
          languageId={languageId}
          setLanguageId={setLanguageId}
          externalCode={code}
          setExternalCode={setCode}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#7B1FA2" }}
            onClick={() => alert("Optional: Run Single Code")}
          >
            Run Code
          </Button>
          <Button variant="contained" onClick={runAllTests}>
            Run Test Cases
          </Button>
        </Box>

        {/* Test Results */}
        {testResults.length > 0 && (
          <Box>
            <Typography variant="h6" mb={1}>
              Test Case Results
            </Typography>
            {testResults.map((res, i) => (
              <Paper
                key={i}
                sx={{
                  p: 2,
                  mb: 2,
                  backgroundColor: res.pass ? "#e8f5e9" : "#ffebee",
                }}
              >
                <Typography><strong>Input:</strong> {res.input}</Typography>
                <Typography><strong>Expected:</strong> {res.expected}</Typography>
                <Typography><strong>Output:</strong> {res.actual}</Typography>
                <Chip
                  label={res.pass ? "✅ Passed" : "❌ Failed"}
                  color={res.pass ? "success" : "error"}
                  sx={{ mt: 1 }}
                />
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
