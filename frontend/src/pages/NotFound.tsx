import React from "react";
import { Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "6rem", color: "error.main" }}>
        404
      </Typography>

      <Typography variant="h4" gutterBottom>
        Oops! Page not found.
      </Typography>

      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ textTransform: "none" }}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
