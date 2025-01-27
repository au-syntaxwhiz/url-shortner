import React, { useEffect, useState } from "react";
import { fetchUserURLs } from "../services/urlService";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/token";
import { getUser } from "../services/authService";

interface URL {
  _id: string;
  originalUrl: string;
  shortSlug: string;
  visits: number;
}

const Dashboard: React.FC = () => {
  const [urls, setUrls] = useState<URL[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const backendBaseUrl = process.env.REACT_APP_BASE_URL;

  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    try {
      const data = await getUser();
      setUser(data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch user data.");
    }
  };

  useEffect(() => {
    const loadURLs = async () => {
      try {
        const data = await fetchUserURLs();
        setUrls(data?.urls);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load URLs.");
      }
    };

    loadURLs();
    fetchUser();
  }, []);

  const handleLogout = async () => {
    removeToken();
    navigate("/");
  };

  const handleUseShortener = () => {
    navigate("/");
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
      {/* Welcome message with username */}
      {user && (
        <Typography variant="h4" gutterBottom>
          Welcome, {user.username}!
        </Typography>
      )}
      <Typography variant="h5" gutterBottom>
        Your Dashboard
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        gap={2}
        mt={2}
        mb={4}
        width="100%"
        maxWidth="400px"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleUseShortener}
        >
          Use URL Shortener
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Original URL</TableCell>
            <TableCell>Short URL</TableCell>
            <TableCell>Slug</TableCell>
            <TableCell>Visits</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((url) => (
            <TableRow key={url._id}>
              <TableCell>{url.originalUrl}</TableCell>
              <TableCell>
                <a
                  href={`${backendBaseUrl}/${url.shortSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${backendBaseUrl}/${url.shortSlug}`}
                </a>
              </TableCell>
              <TableCell>{url.shortSlug}</TableCell>
              <TableCell>{url.visits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Dashboard;
