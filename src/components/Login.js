import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { TextField } from "@mui/material";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://elenipapanicolas.com">
        Eleni Papanicolas
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

function Login({
  onLogin,
  onMouseEnterLogo,
  onMouseLeaveLogo,
  onMouseEnterLetter,
  onMouseLeaveLetter,
}) {
  const token = localStorage.getItem("jwt");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);

  // loading spinner when state is set to true
  if (isLoading) {
    return <Loader />;
  }

  let loginData = {
    user: {
      username: username,
      password: password,
    },
  };

  function handleSubmit(e) {
    setLoading(!isLoading);
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(loginData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          localStorage.setItem("jwt", data.jwt);
          onLogin(data.user);
        });
      } else {
        res.json().then((error) => setErrors(error));
      }
      setLoading(false);
    });
    setUsername("");
    setPassword("");
  }

  return (
    <div className="login-page">
      <h1
        className="logo"
        onMouseEnter={onMouseEnterLogo}
        onMouseLeave={onMouseLeaveLogo}
      >
        <span
          onMouseEnter={onMouseEnterLetter}
          onMouseLeave={onMouseLeaveLetter}
        >
          T
        </span>
        <span
          onMouseEnter={onMouseEnterLetter}
          onMouseLeave={onMouseLeaveLetter}
        >
          w
        </span>
        <span
          onMouseEnter={onMouseEnterLetter}
          onMouseLeave={onMouseLeaveLetter}
        >
          e
        </span>
        <span
          onMouseEnter={onMouseEnterLetter}
          onMouseLeave={onMouseLeaveLetter}
        >
          e
        </span>
        <span
          onMouseEnter={onMouseEnterLetter}
          onMouseLeave={onMouseLeaveLetter}
        >
          t
        </span>
      </h1>
      <Container component="main" maxWidth="xs" sx={{ m: 0 }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            border: "2px solid #5B85d9",
            padding: "20px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#5b85d9" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors ? <p className="error">{errors.error}</p> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#5b85d9" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <NavLink
                  to="/signup"
                  variant="body2"
                  sx={{
                    textDecoration: "none",
                    underline: {
                      borderBottom: "2px solid white",
                    },
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
      <h1
        className="logo"
        onMouseEnter={onMouseEnterLogo}
        onMouseLeave={onMouseLeaveLogo}
      >
        <span
          onMouseEnter={onMouseEnterLetter}
          onMouseLeave={onMouseLeaveLetter}
        >
          S
        </span>
        <span
          onMouseEnter={onMouseEnterLetter}
          onMouseLeave={onMouseLeaveLetter}
        >
          t
        </span>
        <span
          onMouseEnter={onMouseEnterLetter}
          onMouseLeave={onMouseLeaveLetter}
        >
          r
        </span>
        <span
          onMouseEnter={onMouseEnterLetter}
          onMouseLeave={onMouseLeaveLetter}
        >
          e
        </span>
        <span
          onMouseEnter={onMouseEnterLetter}
          onMouseLeave={onMouseLeaveLetter}
        >
          a
        </span>
        <span
          onMouseEnter={onMouseEnterLetter}
          onMouseLeave={onMouseLeaveLetter}
        >
          m
        </span>
      </h1>
    </div>
  );
}

export default Login;
