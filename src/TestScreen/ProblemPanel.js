import React from "react";
import { Typography, Box, Button, Chip, Divider } from "@mui/material";

export default function ProblemPanel({
  question,
  questionNumber,
  totalQuestions,
  onQuestionChange,
}) {
  if (!question) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>No question available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Question Navigation */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Problem {questionNumber} of {totalQuestions}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            disabled={questionNumber === 1}
            onClick={() => onQuestionChange(questionNumber - 2)}
          >
            Previous
          </Button>
          <Button
            size="small"
            disabled={questionNumber === totalQuestions}
            onClick={() => onQuestionChange(questionNumber)}
          >
            Next
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Question Title */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        🧾 {question.title}
      </Typography>

      {/* Difficulty */}
      {question.difficulty && (
        <Chip
          label={question.difficulty}
          color={
            question.difficulty === "Easy"
              ? "success"
              : question.difficulty === "Medium"
              ? "warning"
              : "error"
          }
          size="small"
          sx={{ mb: 2 }}
        />
      )}

      {/* Description */}
      <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
        {question.description}
      </Typography>

      {/* Examples */}
      {question.examples && question.examples.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Examples:
          </Typography>
          {question.examples.map((example, index) => (
            <Box
              key={index}
              sx={{ mb: 2, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}
            >
              <Typography variant="body2" fontWeight="bold">
                Example {index + 1}:
              </Typography>
              <Typography variant="body2" component="pre" sx={{ mt: 1 }}>
                Input: {example.input}
              </Typography>
              <Typography variant="body2" component="pre">
                Output: {example.output}
              </Typography>
              {example.explanation && (
                <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                  Explanation: {example.explanation}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Constraints */}
      {question.constraints && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Constraints:
          </Typography>
          <Typography
            variant="body2"
            component="pre"
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {question.constraints}
          </Typography>
        </Box>
      )}

      {/* Test Cases Info */}
      <Box sx={{ p: 2, backgroundColor: "#e3f2fd", borderRadius: 1 }}>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          📋 Test Cases
        </Typography>
        <Typography variant="body2">
          This problem has {question.test_cases?.length || 0} test cases. Run
          your code to see the results!
        </Typography>
      </Box>
    </Box>
  );
}
