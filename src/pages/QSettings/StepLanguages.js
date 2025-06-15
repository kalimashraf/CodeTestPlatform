import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const popularLanguages = [
  "C",
  "C++",
  "C#",
  "Java",
  "Python",
  "JavaScript",
  "Go",
  "Ruby",
  "Swift",
  "Kotlin",
];

export function StepLanguages({
  languages,
  toggleLanguage,
  selectAllLangs,
  clearAllLangs,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const allSelected = languages.length === popularLanguages.length;
  const filtered = popularLanguages.filter((lang) =>
    lang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ p: 4, mb: 3, border: "1px solid #e0e0e0", borderRadius: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Languages</Typography>
        <Box>
          <Button size="small" onClick={clearAllLangs} sx={{ mr: 1 }}>
            Clear all
          </Button>
          <Button size="small" variant="outlined" onClick={selectAllLangs}>
            Select all
          </Button>
        </Box>
      </Box>

      {/* Description */}
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Candidates will have an option to solve this question in the selected
        languages.
      </Typography>

      {/* Search Field */}
      <TextField
        fullWidth
        label="Search language"
        placeholder="Start typing a language name..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* “Popular languages” master toggle */}
      <FormControlLabel
        control={
          <Checkbox
            checked={allSelected}
            onChange={() => (allSelected ? clearAllLangs() : selectAllLangs())}
          />
        }
        label="Popular languages"
        sx={{ mb: 1 }}
      />
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Code stubs generated automatically
      </Typography>

      {/* Language checkboxes */}
      <Grid container spacing={2}>
        {filtered.map((lang) => (
          <Grid item xs={6} sm={4} md={3} key={lang}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={languages.includes(lang)}
                  onChange={() => toggleLanguage(lang)}
                />
              }
              label={lang}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
