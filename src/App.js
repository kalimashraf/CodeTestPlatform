import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// import MainDesign from "./NavBar/Maindesign";
import MainDesign from "./NavBar/Maindesign"
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";
import Integrations from "./pages/Integrations";
import LoginPage from "./Login/LoginPage";
import SignUpPage from "./Login/SignUpPage";
import CodingTestPage from "./TestScreen/CodingTestPage";
import TestScreen from "./pages/TestScreen";
import QuestionBuilder from "./pages/QSettings/QuestionBuilder";
// import QuestionSetter from "./pages/QSettings/QuestionSetter";
// import QuestionBuilder from "./pages/QSettings/QuestionSetter";


function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/test/:id" element={<TestScreen />} />
          {/* Coding Test Route (full-screen layout, no sidebar) */}
          <Route path="/coding-test" element={<CodingTestPage />} />
          <Route path="q-setter" element={<QuestionBuilder/>} />

          {/* Main Admin Layout with nested pages */}
          <Route path="/" element={<MainDesign />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="reports" element={<Reports />} />
            <Route path="integrations" element={<Integrations />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
