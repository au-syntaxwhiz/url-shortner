import React, { useState } from "react";
import { register } from "../../services/authService";
import { TextField, Button, Alert, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      setSuccess("Account created successfully! Please log in.");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
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
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        width="100%"
        maxWidth="400px"
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
        />
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
          Register
        </Button>
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Already registered?{" "}
          <Link
            href="#"
            onClick={() => navigate("/login")}
            sx={{ cursor: "pointer" }}
          >
            Click here to login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
