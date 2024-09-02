import React, { useCallback, useState } from "react";
import { setUserOnDb } from "../auth/authService";
import { useUser } from "../providers/UserProvider";
import ROUTES from "../routes/routesModel";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleDone = useCallback(async () => {
    await setUserOnDb({
      ...user,
      feedback: feedback,
    });
    setUser((prev) => ({ ...prev, feedback: feedback }));
    navigate(ROUTES.THANK_YOU);
  }, [feedback, navigate, setUser, user]);

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleDone();
        }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        gap={3}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Do you have any comments or feedback on the experiment?
        </Typography>
        <TextField
          label="Comment"
          multiline
          rows={6}
          variant="outlined"
          fullWidth
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
}
