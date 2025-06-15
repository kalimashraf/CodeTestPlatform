import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material";
import Editor from "@monaco-editor/react";
import screenfull from "screenfull";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

export default function CodeEditorPanel({
  setOutput,
  languageId,
  setLanguageId,
  externalCode,
  setExternalCode,
  currentQuestion,
  setTestResults,
}) {
  const [languages] = useState([
    { id: 71, name: "Python 3" },
    { id: 63, name: "JavaScript (Node.js)" },
    { id: 62, name: "Java" },
    { id: 54, name: "C++" },
    { id: 50, name: "C" },
    { id: 51, name: "C#" },
  ]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runType, setRunType] = useState("test"); // "test" or "submit"

  // Set default code based on language
  useEffect(() => {
    if (!externalCode) {
      const defaultCode = getDefaultCode(languageId);
      setExternalCode(defaultCode);
    }
  }, [languageId, externalCode, setExternalCode]);

  const getDefaultCode = (langId) => {
    switch (langId) {
      case 71: // Python
        return `# Write your solution here
def solution():
    # Your code here
    pass

# Test your solution
if __name__ == "__main__":
    result = solution()
    print(result)`;
      case 63: // JavaScript
        return `// Write your solution here
function solution() {
    // Your code here
}

// Test your solution
console.log(solution());`;
      case 62: // Java
        return `public class Solution {
    public static void main(String[] args) {
        // Write your solution here
        System.out.println("Hello World");
    }
}`;
      default:
        return "// Write your code here";
    }
  };

  const getEditorLanguage = (langId) => {
    switch (langId) {
      case 71:
        return "python";
      case 63:
        return "javascript";
      case 62:
        return "java";
      case 54:
      case 50:
        return "cpp";
      case 51:
        return "csharp";
      default:
        return "javascript";
    }
  };

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleTestCode = async () => {
    if (!currentQuestion) {
      setOutput("❌ No question selected");
      return;
    }

    setIsRunning(true);
    setRunType("test");
    setOutput("⏳ Testing code against sample cases...");

    try {
      const response = await fetch("http://localhost:5000/api/test-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: externalCode,
          language_id: languageId,
          test_cases: currentQuestion.test_cases || [],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTestResults(data.results);
        const passed = data.results.filter((r) => r.passed).length;
        const total = data.results.length;
        setOutput(
          `✅ Test Results: ${passed}/${total} test cases passed\n\nClick 'Test Cases' tab to see detailed results.`
        );
      } else {
        setOutput(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setOutput(`❌ Server Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!currentQuestion) {
      setOutput("❌ No question selected");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setOutput("❌ Please login to submit code");
      return;
    }

    setIsRunning(true);
    setRunType("submit");
    setOutput("⏳ Submitting code for evaluation...");

    try {
      const response = await fetch("http://localhost:5000/api/run-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: externalCode,
          language_id: languageId,
          question_id: currentQuestion.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTestResults(data.results);
        setOutput(
          `🎯 Final Score: ${data.score}%\n\nDetailed results available in 'Test Cases' tab.`
        );
      } else {
        setOutput(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setOutput(`❌ Server Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          color="text.secondary"
        >
          Language:
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Select
            value={languageId || ""}
            onChange={(e) => setLanguageId(e.target.value)}
            size="small"
            sx={{ minWidth: 200, backgroundColor: "#fff", borderRadius: 1 }}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.id} value={lang.id}>
                {lang.name}
              </MenuItem>
            ))}
          </Select>

          <Tooltip
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            <IconButton onClick={toggleFullscreen} sx={{ color: "#7B1FA2" }}>
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Editor */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ccc",
          borderRadius: 2,
        }}
      >
        <Editor
          language={getEditorLanguage(languageId)}
          value={externalCode}
          onChange={(val) => setExternalCode(val)}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            wordWrap: "on",
          }}
          height="100%"
          width="100%"
        />
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={handleTestCode}
          disabled={isRunning}
          sx={{
            borderColor: "#7B1FA2",
            color: "#7B1FA2",
            "&:hover": { borderColor: "#6a1b9a", backgroundColor: "#f3e5f5" },
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          {isRunning && runType === "test" ? (
            <CircularProgress size={20} sx={{ mr: 1 }} />
          ) : null}
          Test Code
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmitCode}
          disabled={isRunning}
          sx={{
            backgroundColor: "#7B1FA2",
            "&:hover": { backgroundColor: "#6a1b9a" },
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          {isRunning && runType === "submit" ? (
            <CircularProgress size={20} sx={{ mr: 1 }} />
          ) : null}
          Submit Code
        </Button>
      </Box>
    </Box>
  );
}
