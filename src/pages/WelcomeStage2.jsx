import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";

export default function WelcomeStage2({ handleButtonClick }) {
  return (
    <Container sx={{ padding: 10 }}>
      <Typography variant="h6" gutterBottom>
        Hello again, this is the second part of the experiment you began one
        week ago. In this part, you will also be asked to choose between
        different products. We remind you that there are no right or wrong
        answers, and it is important that you answer candidly. Before we begin,
        let's practice. On the next screen, you'll learn about John's
        preferences and predict his choice, given the instructions.
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
