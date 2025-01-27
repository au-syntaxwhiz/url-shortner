import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import URLForm from "../components/Forms/UrlForm";
import { getToken } from "../utils/token";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const token = getToken();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to the URL Shortener
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Shorten your links and manage them easily.
      </Typography>
      <URLForm />
      <Box mt={3} display="flex" gap={2}>
        {token ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>
        ) : (
          <>
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="outlined" onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
