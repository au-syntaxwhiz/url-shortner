import React, { useState } from "react";
import { shortenURL } from "../../services/urlService";
import {
  TextField,
  Button,
  Alert,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const URLForm: React.FC = () => {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await shortenURL(url, customSlug);
      setShortenedUrl(result.shortUrl);
      setError("");
      setCopySuccess("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to shorten URL.");
      setShortenedUrl(null);
    }
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl).then(() => {
        setCopySuccess("Shortened URL copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 3000);
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} width="100%">
      <TextField
        label="Enter URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        label="Custom Slug (optional)"
        variant="outlined"
        fullWidth
        value={customSlug}
        onChange={(e) => setCustomSlug(e.target.value)}
        margin="normal"
      />
      <Button type="submit" variant="contained" fullWidth>
        Shorten URL
      </Button>
      {shortenedUrl && (
        <Box display="flex" alignItems="center" mt={2}>
          <Alert severity="success" sx={{ flex: 1, mr: 2 }}>
            Shortened URL: {shortenedUrl}
          </Alert>
          <Tooltip title="Copy to clipboard">
            <IconButton onClick={handleCopy} color="primary">
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      {copySuccess && (
        <Alert severity="info" sx={{ mt: 2 }}>
          {copySuccess}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default URLForm;
