import { Box, CircularProgress, Typography } from "@mui/material";

export function LoadingView({ message = "Loading..." }: { message?: string }) {
  return (
    <Box
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography>{message}</Typography>
    </Box>
  );
}
