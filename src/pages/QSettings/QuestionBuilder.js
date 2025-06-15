
// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Grid,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   Chip,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material";
// import { EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// // Step titles
// const steps = ["Question Details", "Languages", "Code Stubs", "Testcases"];

// // Popular languages list
// const popularLanguages = [
//   "C",
//   "C++",
//   "C#",
//   "Java",
//   "Python",
//   "JavaScript",
//   "Go",
//   "Ruby",
//   "Swift",
//   "Kotlin",
// ];

// // Step 1: Question Details
// function StepQuestionDetails({
//   formData,
//   handleChange,
//   descState,
//   setDescState,
// }) {
//   return (
//     <Paper
//       sx={{
//         p: 4,
//         mb: 3,
//         border: "1px solid #e0e0e0",
//         borderRadius: 2,
//         bgcolor: "#fff",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//         }}
//       >
//         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//           Problem details
//         </Typography>
//         <Button variant="outlined" size="small">
//           See candidate preview
//         </Button>
//       </Box>

//       <TextField
//         fullWidth
//         label="Question name"
//         variant="outlined"
//         value={formData.title}
//         onChange={(e) => handleChange("title", e.target.value)}
//         sx={{ mb: 3 }}
//       />

//       <Typography variant="subtitle2" gutterBottom>
//         Problem description *
//       </Typography>
//       <Editor
//         editorState={descState}
//         wrapperClassName="wrapperClass"
//         editorClassName="editorClass"
//         toolbarClassName="toolbarClass"
//         onEditorStateChange={setDescState}
//         toolbar={{
//           options: [
//             "inline",
//             "blockType",
//             "fontFamily",
//             "fontSize",
//             "list",
//             "textAlign",
//             "link",
//             "image",
//             "remove",
//             "history",
//           ],
//         }}
//         editorStyle={{
//           minHeight: 180,
//           padding: "8px",
//           border: "1px solid #ccc",
//           borderRadius: 4,
//         }}
//       />
//     </Paper>
//   );
// }

// // Step 2: Languages
// function StepLanguages({
//   languages,
//   toggleLanguage,
//   selectAllLangs,
//   clearAllLangs,
// }) {
//   return (
//     <Paper
//       sx={{
//         p: 4,
//         mb: 3,
//         border: "1px solid #e0e0e0",
//         borderRadius: 2,
//         bgcolor: "#fff",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 2,
//         }}
//       >
//         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//           Languages
//         </Typography>
//         <Box>
//           <Button size="small" onClick={clearAllLangs} sx={{ mr: 1 }}>
//             Clear all
//           </Button>
//           <Button size="small" variant="outlined" onClick={selectAllLangs}>
//             Select all
//           </Button>
//         </Box>
//       </Box>

//       <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
//         Candidates will have an option to solve this question in the selected
//         languages.
//       </Typography>

//       <TextField
//         fullWidth
//         placeholder="Start typing a language name..."
//         variant="outlined"
//         sx={{ mb: 3 }}
//       />

//       <Typography variant="subtitle2" sx={{ mb: 1 }}>
//         Popular languages
//       </Typography>
//       <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
//         Code stubs generated automatically
//       </Typography>

//       <Grid container spacing={2}>
//         {popularLanguages.map((lang) => (
//           <Grid item xs={6} sm={4} md={3} key={lang}>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={languages.includes(lang)}
//                   onChange={() => toggleLanguage(lang)}
//                 />
//               }
//               label={lang}
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </Paper>
//   );
// }

// // Step 3: Code Stubs (placeholder)
// function StepCodeStubs() {
//   return (
//     <Paper
//       sx={{
//         p: 4,
//         mb: 3,
//         border: "1px solid #e0e0e0",
//         borderRadius: 2,
//         bgcolor: "#fff",
//       }}
//     >
//       <Typography variant="h6" sx={{ fontWeight: 600 }}>
//         Code Stubs
//       </Typography>
//       <Typography variant="body2" color="textSecondary">
//         Configure code stubs for each selected language here.
//       </Typography>
//     </Paper>
//   );
// }

// // Step 4: Testcases (placeholder)
// function StepTestcases() {
//   return (
//     <Paper
//       sx={{
//         p: 4,
//         mb: 3,
//         border: "1px solid #e0e0e0",
//         borderRadius: 2,
//         bgcolor: "#fff",
//       }}
//     >
//       <Typography variant="h6" sx={{ fontWeight: 600 }}>
//         Testcases
//       </Typography>
//       <Typography variant="body2" color="textSecondary">
//         Define sample and hidden test cases for evaluation.
//       </Typography>
//     </Paper>
//   );
// }

// // Master component that stitches all steps together
// export default function QuestionBuilder() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [formData, setFormData] = useState({
//     title: "",
//     recommendedTime: "",
//     tags: [],
//     languages: [],
//   });
//   const [descState, setDescState] = useState(() => EditorState.createEmpty());

//   const handleNext = () => setActiveStep((prev) => prev + 1);
//   const handleBack = () => setActiveStep((prev) => prev - 1);
//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const toggleLanguage = (lang) => {
//     setFormData((prev) => {
//       const exists = prev.languages.includes(lang);
//       return {
//         ...prev,
//         languages: exists
//           ? prev.languages.filter((l) => l !== lang)
//           : [...prev.languages, lang],
//       };
//     });
//   };

//   const selectAllLangs = () =>
//     setFormData((prev) => ({ ...prev, languages: [...popularLanguages] }));

//   const clearAllLangs = () =>
//     setFormData((prev) => ({ ...prev, languages: [] }));

//   const stepComponents = [
//     <StepQuestionDetails
//       key={0}
//       formData={formData}
//       handleChange={handleChange}
//       descState={descState}
//       setDescState={setDescState}
//     />,
//     <StepLanguages
//       key={1}
//       languages={formData.languages}
//       toggleLanguage={toggleLanguage}
//       selectAllLangs={selectAllLangs}
//       clearAllLangs={clearAllLangs}
//     />,
//     <StepCodeStubs key={2} />,
//     <StepTestcases key={3} />,
//   ];

//   return (
//     <Box
//       sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f2f5" }}
//     >
//       {/* Sidebar */}
//       <Box
//         sx={{
//           width: 300,
//           backgroundColor: "#fff",
//           p: 3,
//           borderRight: "1px solid #e0e0e0",
//           position: "sticky",
//           top: 0,
//         }}
//       >
//         <Typography variant="subtitle1" mb={2} sx={{ fontWeight: 600 }}>
//           Setup Steps
//         </Typography>
//         {steps.map((label, index) => (
//           <Box
//             key={label}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               mb: 2,
//               opacity: activeStep === index ? 1 : 0.5,
//             }}
//           >
//             <Box
//               sx={{
//                 width: 24,
//                 height: 24,
//                 borderRadius: "50%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 bgcolor: activeStep === index ? "primary.main" : "transparent",
//                 border: `2px solid ${
//                   activeStep === index ? "primary.main" : "#bdbdbd"
//                 }`,
//                 color: activeStep === index ? "#fff" : "#616161",
//                 mr: 2,
//                 fontSize: "0.875rem",
//               }}
//             >
//               {index + 1}
//             </Box>
//             <Box>
//               <Typography variant="caption" color="textSecondary">
//                 Step {index + 1}
//               </Typography>
//               <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                 {label}
//               </Typography>
//             </Box>
//           </Box>
//         ))}
//       </Box>

//       {/* Main Content */}
//       <Box sx={{ flexGrow: 1, p: 4 }}>
//         <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
//           Create Coding Question
//         </Typography>

//         <Box sx={{ maxWidth: 900, mx: "auto" }}>
//           {stepComponents[activeStep]}

//           {/* Navigation Buttons */}
//           <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
//             <Button
//               variant="outlined"
//               disabled={activeStep === 0}
//               onClick={handleBack}
//             >
//               Back
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleNext}
//               disabled={activeStep === steps.length - 1}
//             >
//               Next
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import React, { useState, useEffect } from "react";

// Mock rich text editor component
const RichTextEditor = ({ value, onChange, placeholder }) => (
  <textarea
    className="rich-text-editor"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    rows={8}
    style={{
      width: "100%",
      padding: "12px",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      fontFamily: "inherit",
      fontSize: "14px",
      resize: "vertical",
      outline: "none",
      transition: "border-color 0.2s ease",
    }}
    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
  />
);

// Mock code editor component
const CodeEditor = ({ value, onChange, language, readOnly = false }) => (
  <textarea
    className="code-editor"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={readOnly}
    rows={12}
    style={{
      width: "100%",
      padding: "16px",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
      fontSize: "13px",
      backgroundColor: readOnly ? "#f8f9fa" : "#ffffff",
      color: "#1a202c",
      resize: "vertical",
      outline: "none",
      transition: "border-color 0.2s ease",
    }}
    onFocus={(e) => !readOnly && (e.target.style.borderColor = "#667eea")}
    onBlur={(e) => !readOnly && (e.target.style.borderColor = "#e2e8f0")}
  />
);

const steps = ["Question Details", "Languages", "Code Stubs", "Test Cases"];

const popularLanguages = [
  { name: "Python", icon: "🐍", color: "#3776ab" },
  { name: "Java", icon: "☕", color: "#f89820" },
  { name: "JavaScript", icon: "📜", color: "#f7df1e" },
  { name: "C++", icon: "⚡", color: "#00599c" },
  { name: "C", icon: "🔧", color: "#a8b9cc" },
  { name: "C#", icon: "🔷", color: "#239120" },
  { name: "Go", icon: "🐹", color: "#00add8" },
  { name: "Ruby", icon: "💎", color: "#cc342d" },
  { name: "Swift", icon: "🍎", color: "#fa7343" },
  { name: "Kotlin", icon: "🎯", color: "#0095d5" },
];

// Enhanced Step 1: Question Details
function StepQuestionDetails({
  formData,
  handleChange,
  descState,
  setDescState,
}) {
  const [difficulty, setDifficulty] = useState("Medium");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div
      className="step-card"
      style={{
        opacity: 0,
        animation: "fadeIn 0.6s ease forwards",
        marginBottom: "24px",
      }}
    >
      <div className="card-header">
        <div
          className="header-icon"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          📝
        </div>
        <div className="header-content">
          <h3>Problem Details</h3>
          <p>Define the core problem statement and metadata</p>
        </div>
        <button className="preview-btn">👁️ Preview</button>
      </div>

      <div className="form-grid">
        <div className="form-row">
          <div className="form-group" style={{ flex: 2 }}>
            <label>Question Title</label>
            <input
              type="text"
              placeholder="e.g., Two Sum, Binary Tree Traversal"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Difficulty Level</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="form-select"
            >
              <option value="Easy">🟢 Easy</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Hard">🔴 Hard</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Problem Description *</label>
          <RichTextEditor
            value={descState}
            onChange={setDescState}
            placeholder="Describe the problem clearly with examples, constraints, and expected output format..."
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <div className="tags-container">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
                <button onClick={() => removeTag(tag)} className="tag-remove">
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="tag-input-row">
            <input
              type="text"
              placeholder="Add tag (e.g., arrays, dynamic-programming)"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTag()}
              className="form-input"
            />
            <button onClick={addTag} className="add-btn">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Step 2: Languages
function StepLanguages({
  languages,
  toggleLanguage,
  selectAllLangs,
  clearAllLangs,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLanguages = popularLanguages.filter((lang) =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allSelected = languages.length === popularLanguages.length;

  return (
    <div
      className="step-card"
      style={{
        opacity: 0,
        animation: "fadeIn 0.6s ease forwards",
        marginBottom: "24px",
      }}
    >
      <div className="card-header">
        <div
          className="header-icon"
          style={{
            background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
          }}
        >
          🌐
        </div>
        <div className="header-content">
          <h3>Programming Languages</h3>
          <p>Select languages candidates can use to solve this problem</p>
        </div>
        <div className="header-actions">
          <button onClick={clearAllLangs} className="action-btn">
            Clear All
          </button>
          <button onClick={selectAllLangs} className="action-btn primary">
            Select All
          </button>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search programming languages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="master-checkbox">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() => (allSelected ? clearAllLangs() : selectAllLangs())}
            className="checkbox"
          />
          <span className="checkmark"></span>
          Popular Languages ({languages.length}/{popularLanguages.length})
        </label>
      </div>

      <div className="info-alert">
        ℹ️ Code stubs will be automatically generated for selected languages
      </div>

      <div className="languages-grid">
        {filteredLanguages.map((lang) => (
          <div
            key={lang.name}
            className={`language-card ${
              languages.includes(lang.name) ? "selected" : ""
            }`}
            onClick={() => toggleLanguage(lang.name)}
            style={{
              borderColor: languages.includes(lang.name)
                ? lang.color
                : "transparent",
              backgroundColor: languages.includes(lang.name)
                ? `${lang.color}08`
                : "transparent",
            }}
          >
            <div className="language-content">
              <span className="language-icon">{lang.icon}</span>
              <span className="language-name">{lang.name}</span>
              <input
                type="checkbox"
                checked={languages.includes(lang.name)}
                onChange={() => toggleLanguage(lang.name)}
                className="language-checkbox"
                style={{ accentColor: lang.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {languages.length > 0 && (
        <div className="selected-languages">
          <label>Selected Languages:</label>
          <div className="selected-tags">
            {languages.map((lang) => {
              const langInfo = popularLanguages.find((l) => l.name === lang);
              return (
                <span
                  key={lang}
                  className="selected-tag"
                  style={{
                    backgroundColor: `${langInfo?.color || "#667eea"}15`,
                    color: langInfo?.color || "#667eea",
                  }}
                >
                  {lang}
                  <button
                    onClick={() => toggleLanguage(lang)}
                    className="tag-remove"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Step 3: Code Stubs
function StepCodeStubs({ selectedLanguages = [] }) {
  const [currentLang, setCurrentLang] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [funcName, setFuncName] = useState("solution");
  const [returnType, setReturnType] = useState("int");
  const [params, setParams] = useState([]);
  const [stubs, setStubs] = useState({});

  useEffect(() => {
    const initial = {};
    selectedLanguages.forEach((lang) => {
      initial[lang] = {
        head: `// ${lang} starter code`,
        body: `// Write your solution here\nfunction ${funcName}() {\n    // Your code goes here\n    return 0;\n}`,
        tail: `// End of solution`,
      };
    });
    setStubs(initial);
    if (selectedLanguages.length > 0) {
      setCurrentLang(selectedLanguages[0]);
    }
  }, [selectedLanguages, funcName]);

  const addParam = () => setParams([...params, { type: "int", name: "" }]);
  const updateParam = (index, field, value) => {
    setParams(
      params.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };
  const removeParam = (index) =>
    setParams(params.filter((_, i) => i !== index));

  const generateStubs = () => {
    const paramStr = params.map((p) => `${p.type} ${p.name}`).join(", ");
    const updated = {};
    selectedLanguages.forEach((lang) => {
      updated[lang] = {
        head: `// Auto-generated header for ${lang}`,
        body: `${returnType} ${funcName}(${paramStr}) {\n    // Implement your solution here\n    return 0;\n}`,
        tail: `// Auto-generated footer`,
      };
    });
    setStubs(updated);
  };

  const handleStubChange = (section, value) => {
    setStubs((prev) => ({
      ...prev,
      [currentLang]: { ...prev[currentLang], [section]: value },
    }));
  };

  const tabs = ["Header", "Body", "Footer"];

  return (
    <div
      className="step-card"
      style={{
        opacity: 0,
        animation: "fadeIn 0.6s ease forwards",
        marginBottom: "24px",
      }}
    >
      <div className="card-header">
        <div
          className="header-icon"
          style={{
            background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
          }}
        >
          💻
        </div>
        <div className="header-content">
          <h3>Code Stubs</h3>
          <p>Define starter code templates for each language</p>
        </div>
      </div>

      {selectedLanguages.length === 0 ? (
        <div className="warning-alert">
          ⚠️ Please select programming languages in the previous step first.
        </div>
      ) : (
        <>
          <div className="function-signature">
            <h4>Function Signature</h4>
            <div className="signature-grid">
              <div className="form-group">
                <label>Function Name</label>
                <input
                  type="text"
                  value={funcName}
                  onChange={(e) => setFuncName(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Return Type</label>
                <select
                  value={returnType}
                  onChange={(e) => setReturnType(e.target.value)}
                  className="form-select"
                >
                  <option value="int">INT</option>
                  <option value="string">STRING</option>
                  <option value="boolean">BOOLEAN</option>
                  <option value="void">VOID</option>
                  <option value="array">ARRAY</option>
                </select>
              </div>
              <button onClick={addParam} className="add-param-btn">
                ➕ Add Parameter
              </button>
            </div>

            {params.map((param, index) => (
              <div key={index} className="param-row">
                <input
                  type="text"
                  placeholder="Type"
                  value={param.type}
                  onChange={(e) => updateParam(index, "type", e.target.value)}
                  className="param-input"
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={param.name}
                  onChange={(e) => updateParam(index, "name", e.target.value)}
                  className="param-input"
                />
                <button
                  onClick={() => removeParam(index)}
                  className="remove-param-btn"
                >
                  ❌
                </button>
              </div>
            ))}

            <button
              onClick={generateStubs}
              disabled={!funcName}
              className="generate-btn"
            >
              ✨ Generate Code Stubs
            </button>
          </div>

          <div className="code-editor-section">
            <div className="editor-header">
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="language-select"
              >
                {selectedLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {popularLanguages.find((l) => l.name === lang)?.icon} {lang}
                  </option>
                ))}
              </select>
              <div className="editor-actions">
                <button className="action-icon-btn" title="Test in IDE">
                  ▶️
                </button>
                <button className="action-icon-btn" title="View Preview">
                  👁️
                </button>
              </div>
            </div>

            <div className="tabs">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  className={`tab ${activeTab === index ? "active" : ""}`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {currentLang && stubs[currentLang] && (
              <CodeEditor
                value={stubs[currentLang][["head", "body", "tail"][activeTab]]}
                onChange={(value) =>
                  handleStubChange(["head", "body", "tail"][activeTab], value)
                }
                language={currentLang.toLowerCase()}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Enhanced Step 4: Test Cases
function StepTestCases() {
  const [testCases, setTestCases] = useState([
    { input: "", output: "", isHidden: false },
  ]);

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "", isHidden: false }]);
  };

  const updateTestCase = (index, field, value) => {
    setTestCases(
      testCases.map((tc, i) => (i === index ? { ...tc, [field]: value } : tc))
    );
  };

  const removeTestCase = (index) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  return (
    <div
      className="step-card"
      style={{
        opacity: 0,
        animation: "fadeIn 0.6s ease forwards",
        marginBottom: "24px",
      }}
    >
      <div className="card-header">
        <div
          className="header-icon"
          style={{
            background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
          }}
        >
          🧪
        </div>
        <div className="header-content">
          <h3>Test Cases</h3>
          <p>Define input/output examples and validation cases</p>
        </div>
        <button onClick={addTestCase} className="add-test-btn">
          ➕ Add Test Case
        </button>
      </div>

      {testCases.map((testCase, index) => (
        <div key={index} className="test-case-card">
          <div className="test-case-header">
            <h4>Test Case {index + 1}</h4>
            <div className="test-case-actions">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={testCase.isHidden}
                  onChange={(e) =>
                    updateTestCase(index, "isHidden", e.target.checked)
                  }
                  className="checkbox"
                />
                <span className="checkmark"></span>
                Hidden
              </label>
              <button
                onClick={() => removeTestCase(index)}
                disabled={testCases.length === 1}
                className="remove-test-btn"
              >
                🗑️
              </button>
            </div>
          </div>

          <div className="test-case-content">
            <div className="test-input">
              <label>Input</label>
              <textarea
                placeholder="Enter test input..."
                value={testCase.input}
                onChange={(e) => updateTestCase(index, "input", e.target.value)}
                className="test-textarea"
                rows={4}
              />
            </div>
            <div className="test-output">
              <label>Expected Output</label>
              <textarea
                placeholder="Enter expected output..."
                value={testCase.output}
                onChange={(e) =>
                  updateTestCase(index, "output", e.target.value)
                }
                className="test-textarea"
                rows={4}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="info-alert">
        💡 <strong>Tip:</strong> Include at least 2-3 sample test cases and
        several hidden test cases for comprehensive evaluation. Hidden test
        cases won't be visible to candidates.
      </div>
    </div>
  );
}

// Main Question Builder Component
export default function QuestionBuilder() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    languages: [],
  });
  const [descState, setDescState] = useState("");

  const handleNext = () =>
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleLanguage = (lang) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const selectAllLangs = () => {
    setFormData((prev) => ({
      ...prev,
      languages: popularLanguages.map((l) => l.name),
    }));
  };

  const clearAllLangs = () => {
    setFormData((prev) => ({ ...prev, languages: [] }));
  };

  const getStepProgress = () => ((activeStep + 1) / steps.length) * 100;

  const stepComponents = [
    <StepQuestionDetails
      key={0}
      formData={formData}
      handleChange={handleChange}
      descState={descState}
      setDescState={setDescState}
    />,
    <StepLanguages
      key={1}
      languages={formData.languages}
      toggleLanguage={toggleLanguage}
      selectAllLangs={selectAllLangs}
      clearAllLangs={clearAllLangs}
    />,
    <StepCodeStubs key={2} selectedLanguages={formData.languages} />,
    <StepTestCases key={3} />,
  ];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .question-builder {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          position: relative;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .question-builder::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .sidebar {
          width: 320px;
          background: #ffffff;
          border-right: 1px solid rgba(0,0,0,0.06);
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: auto;
          box-shadow: 4px 0 20px rgba(0,0,0,0.04);
          padding: 24px;
        }

        .sidebar h3 {
          font-weight: 700;
          margin-bottom: 24px;
          color: #1a1a2e;
          font-size: 18px;
        }

        .progress-section {
          margin-bottom: 24px;
        }

        .progress-text {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 8px;
        }

        .progress-bar {
          height: 8px;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .stepper {
          margin-bottom: 24px;
        }

        .step {
          display: flex;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .step-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          margin-right: 16px;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .step-icon.active {
          background: #667eea;
          color: white;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .step-icon.completed {
          background: #10B981;
          color: white;
        }

        .step-icon.inactive {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
        }

        .step-content h4 {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 4px 0;
          color: #1a1a2e;
        }

        .step-content p {
          font-size: 12px;
          color: #64748b;
          margin: 0;
        }

        .quick-stats {
          background: rgba(102, 126, 234, 0.05);
          border-radius: 12px;
          padding: 16px;
        }

        .quick-stats h4 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 12px;
        }

        .stat-label {
          color: #64748b;
        }

        .stat-value {
          font-weight: 600;
        }

        .main-content {
          flex: 1;
          padding: 32px;
          position: relative;
          z-index: 1;
        }

        .content-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .main-header {
          display: flex;
          align-items: center;
          margin-bottom: 32px;
        }

        .main-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          padding: 16px;
          margin-right: 24px;
          color: white;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
          font-size: 32px;
        }

        .main-title {
          font-size: 32px;
          font-weight: 800;
          color: #1a1a2e;
          margin: 0 0 4px 0;
        }

        .main-subtitle {
          font-size: 16px;
          color: #64748b;
          margin: 0;
        }

        .step-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.06);
          overflow: hidden;
        }

        .card-header {
          display: flex;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }

        .header-icon {
          border-radius: 12px;
          padding: 12px;
          margin-right: 16px;
          color: white;
          font-size: 20px;
        }

        .header-content {
          flex: 1;
        }

        .header-content h3 {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: #1a1a2e;
        }

        .header-content p {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }

        .preview-btn, .action-btn, .add-test-btn, .add-param-btn, .generate-btn {
          background: transparent;
          border: 2px solid rgba(102, 126, 234, 0.3);
          color: #667eea;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .preview-btn:hover, .action-btn:hover, .add-test-btn:hover, .add-param-btn:hover, .generate-btn:hover {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.05);
          transform: translateY(-1px);
        }

        .action-btn.primary, .generate-btn {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .action-btn.primary:hover, .generate-btn:hover {
          background: #5a67d8;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .generate-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .form-grid {
          padding: 24px;
        }

        .form-row {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .form-group {
          flex: 1;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }

        .form-input, .form-select, .search-input, .param-input, .language-select {
          width: 100%;
          padding: 12px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px;
          transition: border-color 0.2s ease;
          outline: none;
        }

        .form-input:focus, .form-select:focus, .search-input:focus, .param-input:focus, .language-select:focus {
          border-color: #667eea;
        }

        .search-container {
          padding: 0 24px 16px 24px;
        }

        .master-checkbox {
          padding: 0 24px 16px 24px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-weight: 600;
        }

        .checkbox {
          margin-right: 8px;
          accent-color: #667eea;
        }

        .checkmark {
          margin-left: 8px;
        }

        .info-alert, .warning-alert {
          margin: 0 24px 24px 24px;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
        }

        .info-alert {
          background: rgba(59, 130, 246, 0.1);
          color: #1e40af;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .warning-alert {
          background: rgba(245, 158, 11, 0.1);
          color: #92400e;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .languages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          padding: 0 24px 24px 24px;
        }

        .language-card {
          padding: 16px;
          border: 2px solid transparent;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: white;
        }

        .language-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .language-card.selected {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .language-content {
          display: flex;
          align-items: center;
        }

        .language-icon {
          font-size: 20px;
          margin-right: 12px;
        }

        .language-name {
          flex: 1;
          font-weight: 600;
        }

        .language-checkbox {
          margin-left: 8px;
        }

        .selected-languages {
          padding: 0 24px 24px 24px;
        }

        .selected-languages label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .selected-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .selected-tag, .tag {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
        }

        .tag-remove {
          background: none;
          border: none;
          margin-left: 4px;
          cursor: pointer;
          font-weight: bold;
          color: inherit;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }

        .tag {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
        }

        .tag-input-row {
          display: flex;
          gap: 8px;
        }

        .add-btn {
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          width: 40px;
          height: 40px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s ease;
        }

        .add-btn:hover {
          background: #5a67d8;
        }

        .function-signature {
          padding: 24px;
          background: rgba(59, 130, 246, 0.04);
        }

        .function-signature h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #1a1a2e;
        }

        .signature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 16px;
          margin-bottom: 16px;
        }

        .param-row {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 12px;
          margin-bottom: 12px;
        }

        .remove-param-btn, .remove-test-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: background 0.2s ease;
        }

        .remove-param-btn:hover, .remove-test-btn:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        .remove-test-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .code-editor-section {
          padding: 24px;
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .editor-actions {
          display: flex;
          gap: 8px;
        }

        .action-icon-btn {
          background: none;
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 6px;
          padding: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-icon-btn:hover {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.05);
        }

        .tabs {
          display: flex;
          border-bottom: 2px solid #e2e8f0;
          margin-bottom: 16px;
        }

        .tab {
          background: none;
          border: none;
          padding: 12px 16px;
          cursor: pointer;
          font-weight: 600;
          color: #64748b;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
        }

        .tab.active {
          color: #667eea;
          border-bottom-color: #667eea;
        }

        .tab:hover {
          color: #667eea;
        }

        .test-case-card {
          margin: 0 24px 16px 24px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }

        .test-case-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .test-case-header h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #1a1a2e;
        }

        .test-case-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .test-case-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding: 16px;
        }

        .test-input, .test-output {
          display: flex;
          flex-direction: column;
        }

        .test-input label, .test-output label {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #374151;
        }

        .test-textarea {
          width: 100%;
          padding: 12px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-family: monospace;
          font-size: 13px;
          resize: vertical;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .test-textarea:focus {
          border-color: #667eea;
        }

        .navigation-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.06);
          padding: 24px;
          margin-top: 24px;
        }

        .navigation-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid;
        }

        .nav-btn.back {
          background: transparent;
          border-color: rgba(102, 126, 234, 0.3);
          color: #667eea;
        }

        .nav-btn.back:hover {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.05);
        }

        .nav-btn.back:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .nav-btn.next {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: #667eea;
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .nav-btn.next:hover {
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          transform: translateY(-1px);
        }

        .nav-btn.create {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          border-color: #10B981;
          color: white;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .nav-btn.create:hover {
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
          transform: translateY(-1px);
        }

        .progress-dots {
          display: flex;
          gap: 4px;
        }

        .progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .progress-dot.active {
          background: #667eea;
        }

        .progress-dot.inactive {
          background: rgba(102, 126, 234, 0.2);
        }
      `,
        }}
      />

      <div className="question-builder">
        {/* Enhanced Sidebar */}
        <div className="sidebar">
          <h3>Question Setup</h3>

          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-text">
              Progress: {Math.round(getStepProgress())}%
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${getStepProgress()}%` }}
              />
            </div>
          </div>

          <div className="stepper">
            {steps.map((label, index) => (
              <div key={label} className="step">
                <div
                  className={`step-icon ${
                    index < activeStep
                      ? "completed"
                      : index === activeStep
                      ? "active"
                      : "inactive"
                  }`}
                >
                  {index < activeStep ? "✓" : index + 1}
                </div>
                <div className="step-content">
                  <h4>{label}</h4>
                  <p>
                    {index === 0 && "Define problem details"}
                    {index === 1 && "Select programming languages"}
                    {index === 2 && "Configure code templates"}
                    {index === 3 && "Add test cases"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="quick-stats">
            <h4>Quick Stats</h4>
            <div className="stat-row">
              <span className="stat-label">Languages:</span>
              <span className="stat-value">{formData.languages.length}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Title:</span>
              <span className="stat-value">{formData.title ? "✓" : "—"}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Description:</span>
              <span className="stat-value">{descState ? "✓" : "—"}</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          <div className="content-container">
            <div className="main-header">
              <div className="main-icon">📝</div>
              <div>
                <h1 className="main-title">Create Coding Question</h1>
                <p className="main-subtitle">
                  Step {activeStep + 1} of {steps.length}: {steps[activeStep]}
                </p>
              </div>
            </div>

            {stepComponents[activeStep]}

            {/* Enhanced Navigation */}
            <div className="navigation-card">
              <div className="navigation-content">
                <button
                  className="nav-btn back"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Previous Step
                </button>

                <div className="progress-dots">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`progress-dot ${
                        index <= activeStep ? "active" : "inactive"
                      }`}
                    />
                  ))}
                </div>

                {activeStep === steps.length - 1 ? (
                  <button className="nav-btn create">Create Question</button>
                ) : (
                  <button className="nav-btn next" onClick={handleNext}>
                    Next Step
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}