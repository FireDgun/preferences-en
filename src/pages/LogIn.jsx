import React, { useEffect, useState } from "react";
import { postOrGetUserId } from "../auth/authService";
import { Button, Container } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { useUser } from "../providers/UserProvider";
import adminUser from "../lib/adminUser";
import { useStageTwo } from "../providers/StageTwoProvider";

export default function LogIn() {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { isStageOneOpen } = useStageTwo();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setId(searchParams.get("PROLIFIC_PID"));
    localStorage.clear();
  }, [searchParams]);

  const handleLogin = async () => {
    const userFromDb = await postOrGetUserId(id);
    setUser(userFromDb);
    if (userFromDb.id === adminUser.id) {
      navigate(ROUTES.ADMIN);
    } else if (userFromDb?.stage === 1 && !isStageOneOpen) {
      navigate(ROUTES.TEST_STAGE_ONE_CLOSED);
    } else if (userFromDb.stage === 1) {
      navigate(ROUTES.WELCOME);
    } else if (userFromDb.stage === 2) {
      navigate(ROUTES.TEST);
    } else {
      navigate(ROUTES.THANK_YOU);
    }
  };

  return (
    <Container
      sx={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      {/* <Typography variant="h6" gutterBottom>
        Please enter your ID
      </Typography> */}

      {/* <TextField
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="ID"
      /> */}
      <Button
        onClick={handleLogin}
        variant="contained"
        disabled={!!!id}
        size="large"
      >
        Start
      </Button>
    </Container>
  );
}
