// src/components/Footer.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Tooltip,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link
            color="inherit"
            href="https://github.com/xhamera1/DiabetesPredictorApp"
          >
            Diabetes Predictor by Patryk Chamera
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Tooltip title="GitHub">
            <IconButton
              component="a"
              href="https://github.com/xhamera1"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="LinkedIn">
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/patryk-chamera-309835289/"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              <LinkedInIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Container>
    </Box>
  );
};
