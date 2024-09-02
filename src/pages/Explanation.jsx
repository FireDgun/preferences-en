import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";

export default function Explanation() {
  // Function to handle button click
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(ROUTES.TEST);
  };

  return (
    <Container sx={{ padding: 10 }}>
      <Typography variant="h6" gutterBottom>
        This experiment consists of two parts. The second part will take place
        in a week. In both parts, you will be asked to make several choices
        between different products.
      </Typography>

      <Box mt={30} sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
          sx={{ marginX: 1 }}
        >
          Continue
        </Button>
      </Box>
    </Container>
  );
}
