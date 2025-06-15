import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import ProblemPanel from "./ProblemPanel";
import CodeEditorPanel from "./CodeEditorPanel";
import OutputConsole from "./OutputConsole";
import TopBar from "./TopBar";

export default function CodingTestPage() {
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("output");
  const [timeUpDialogOpen, setTimeUpDialogOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [languageId, setLanguageId] = useState(71); // Default to Python
  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState([]);

  // Fetch questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/questions");
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await response.json();
      setQuestions(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load questions: " + err.message);
      setLoading(false);
    }
  };

  const handleTimeUp = () => {
    setTimeUpDialogOpen(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading questions...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!questions.length) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">No questions available</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <TopBar durationMinutes={30} onTimeUp={handleTimeUp} />

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left: Problem Panel */}
        <Box
          sx={{
            width: "35%",
            overflowY: "auto",
            backgroundColor: "#fff",
            borderRight: "1px solid #ddd",
            p: 3,
          }}
        >
          <ProblemPanel
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onQuestionChange={setCurrentQuestionIndex}
          />
        </Box>

        {/* Right: Code Editor & Output */}
        <Box
          sx={{
            width: "65%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 3,
            backgroundColor: "#f9fafb",
          }}
        >
          <CodeEditorPanel
            setOutput={setOutput}
            languageId={languageId}
            setLanguageId={setLanguageId}
            externalCode={code}
            setExternalCode={setCode}
            currentQuestion={currentQuestion}
            setTestResults={setTestResults}
          />
          <OutputConsole
            output={output}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            testResults={testResults}
            testCases={currentQuestion?.test_cases || []}
          />
        </Box>
      </Box>

      {/* Time Up Dialog */}
      <Dialog open={timeUpDialogOpen}>
        <DialogTitle>⏱️ Time is up!</DialogTitle>
        <Typography sx={{ px: 3 }}>
          Your coding time has expired. Please submit your code.
        </Typography>
        <DialogActions>
          <Button onClick={() => setTimeUpDialogOpen(false)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
