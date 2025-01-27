import React, { useState } from "react";
import { login } from "../../services/authService";
import { TextField, Button, Alert, Box, Typography, Link } from "@mui/material";
import { setToken, setUserId } from "../../utils/token";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      setToken(response?.token);
      setUserId(response?.userId);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
    >
      {/* Back Arrow Icon */}
      <Link
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowBackIcon />
      </Link>

      <Typography variant="h5" gutterBottom>
        Login
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        width="100%"
        maxWidth="400px"
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Don't have an account?{" "}
          <Link
            href="#"
            onClick={() => navigate("/register")}
            sx={{ cursor: "pointer" }}
          >
            Click here to register
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
