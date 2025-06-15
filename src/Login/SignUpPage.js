import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

 const handleSubmit = async (event) => {
   event.preventDefault();
   const name = event.target.fullName.value;
   const email = event.target.email.value;
   const password = event.target.password.value;

   try {
     const res = await fetch("http://localhost:5000/api/auth/register", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ name, email, password }),
     });

     const data = await res.json();

     if (res.ok) {
       localStorage.setItem("token", data.token);
       localStorage.setItem("user", JSON.stringify(data.user));
       navigate("/dashboard");
     } else {
       alert(data.error || "Signup failed");
     }
   } catch (err) {
     console.error("Signup error", err);
     alert("Server error");
   }
 };


  const handleGoogleSignUpSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google User:", decoded); // Use name, email, etc.
      navigate("/");
    } catch (error) {
      console.error("Google SignUp decode failed", error);
    }
  };

  const handleGoogleSignUpError = () => {
    console.error("Google SignUp failed");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#7B1FA2" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#7B1FA2" }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" sx={{ color: "#7B1FA2" }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>

        {/* Divider and Google Signup */}
        <Divider sx={{ my: 3, width: "100%" }}>OR</Divider>
        <Box sx={{ textAlign: "center" }}>
          <GoogleLogin
            onSuccess={handleGoogleSignUpSuccess}
            onError={handleGoogleSignUpError}
            size="large"
            theme="outline"
          />
        </Box>
      </Box>
    </Container>
  );
}
