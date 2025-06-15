import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReactAce from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

/** Master QuestionBuilder with Code Stubs focus **/
export default function QuestionBuilder() {
  const [selectedLanguages] = useState(["C", "C++", "Java", "Python"]); // demo
  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f7f7f7" }}
    >
      {/* Sidebar omitted for brevity */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Create Coding Question
        </Typography>
        <StepCodeStubs selectedLanguages={selectedLanguages} />
      </Box>
    </Box>
  );
}

/**
 * StepCodeStubs: Enhanced Code Stubs UI
 */
function StepCodeStubs({ selectedLanguages = [] }) {
  // Form state
  const [funcName, setFuncName] = useState("");
  const [returnType, setReturnType] = useState("");
  const [params, setParams] = useState([]);
  const [stubs, setStubs] = useState({});
  // UI state
  const [currentLang, setCurrentLang] = useState("");
  const [tab, setTab] = useState(0);

  // Initialize default stubs and language
  useEffect(() => {
    const initial = {};
    selectedLanguages.forEach((lang) => {
      initial[lang] = {
        head: `// ${lang} stub head`,
        body: `// Enter your code here. Read input from STDIN. Print output to STDOUT`,
        tail: `// ${lang} stub tail`,
      };
    });
    setStubs(initial);
    const defaultLang =
      selectedLanguages.find((l) => /python/i.test(l)) ||
      selectedLanguages[0] ||
      "";
    setCurrentLang(defaultLang);
  }, [selectedLanguages]);

  // Handlers
  const handleGenerate = () => {
    // auto-generate stub templates based on funcName, returnType, params
    const updated = {};
    selectedLanguages.forEach((lang) => {
      const pList = params.map((p) => `${p.type} ${p.name}`).join(", ");
      updated[lang] = {
        head: `// ${lang} ${returnType} ${funcName}(${pList})`,
        body: stubs[lang].body,
        tail: `// End of ${funcName}`,
      };
    });
    setStubs(updated);
  };

  const addParam = () => setParams((ps) => [...ps, { type: "", name: "" }]);
  const updateParam = (i, field, value) => {
    setParams((ps) =>
      ps.map((p, idx) => (idx === i ? { ...p, [field]: value } : p))
    );
  };
  const removeParam = (i) =>
    setParams((ps) => ps.filter((_, idx) => idx !== i));

  const handleStubChange = (section, value) => {
    setStubs((prev) => ({
      ...prev,
      [currentLang]: { ...prev[currentLang], [section]: value },
    }));
  };

  return (
    <Paper sx={{ p: 4, backgroundColor: "#fff", borderRadius: 2 }}>
      {/* Header */}
      <Typography variant="h6" gutterBottom>
        Code stubs
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={3}>
        Candidates will see code stubs and write their answers on top of it.
      </Typography>

      {/* Selected Languages Banner */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 3,
          bgcolor: "#fafafa",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          <strong>Selected languages:</strong> {selectedLanguages.join(", ")}
        </Typography>
        <IconButton size="small">
          <EditIcon fontSize="small" />
        </IconButton>
      </Paper>

      {/* Function Declaration */}
      <Box mb={2}>
        <Typography variant="subtitle2" gutterBottom>
          Function declaration
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Function name"
              value={funcName}
              onChange={(e) => setFuncName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Return type</InputLabel>
              <Select
                value={returnType}
                label="Return type"
                onChange={(e) => setReturnType(e.target.value)}
              >
                {["int", "void", "String", "float"].map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button size="small" sx={{ mt: 1 }} onClick={addParam}>
          Add function parameters
        </Button>
      </Box>

      {/* Parameters List */}
      {params.map((p, i) => (
        <Grid container spacing={2} alignItems="center" key={i} sx={{ mb: 1 }}>
          <Grid item xs={5} sm={3}>
            <TextField
              fullWidth
              label="Type"
              value={p.type}
              onChange={(e) => updateParam(i, "type", e.target.value)}
            />
          </Grid>
          <Grid item xs={5} sm={7}>
            <TextField
              fullWidth
              label="Name"
              value={p.name}
              onChange={(e) => updateParam(i, "name", e.target.value)}
            />
          </Grid>
          <Grid item xs={2} sm={2}>
            <IconButton color="error" onClick={() => removeParam(i)}>
              <SettingsIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Generate Code */}
      <Button
        variant="contained"
        disabled={!funcName || !returnType}
        onClick={handleGenerate}
        sx={{ mb: 3 }}
      >
        Generate code
      </Button>
      <Divider />

      {/* Language Selector & Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        <FormControl size="small">
          <InputLabel>Language</InputLabel>
          <Select
            value={currentLang}
            label="Language"
            onChange={(e) => {
              setCurrentLang(e.target.value);
              setTab(0);
            }}
            IconComponent={ArrowDropDownIcon}
          >
            {selectedLanguages.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          <Button size="small" startIcon={<InfoOutlinedIcon />} sx={{ mr: 1 }}>
            View in IDE
          </Button>
          <IconButton size="small">
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Head/Body/Tail Tabs with Code Editor */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mt: 3 }}>
        {["Head", "Body", "Tail"].map((label, idx) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
      <Box sx={{ mt: 2 }}>
        <ReactAce
          mode="javascript"
          theme="github"
          name="code-stub"
          value={
            currentLang &&
            stubs[currentLang] &&
            stubs[currentLang][["head", "body", "tail"][tab]]
          }
          readOnly={false}
          fontSize={14}
          width="100%"
          showPrintMargin={false}
          showGutter
          minLines={6}
          setOptions={{ useWorker: false }}
          onChange={(val) =>
            handleStubChange(["head", "body", "tail"][tab], val)
          }
        />
      </Box>
    </Paper>
  );
}
