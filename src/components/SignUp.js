// import react and utils
import { NavLink } from "react-router-dom";
import { useState } from "react";
// Material UI Components
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import components
import Loader from "./Loader";

function Copyright(props) {
  return (
    <Typography
      backgroundColor="white"
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

function SignUp({
  handleLogin,
  onMouseEnterLogo,
  onMouseLeaveLogo,
  onMouseEnterLetter,
  onMouseLeaveLetter,
}) {
  // sets state
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  // loading spinner when state is set to true
  if (isLoading) {
    return <Loader />;
  }

  // signup form data
  const signUpData = {
    user: {
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    },
  };

  // submits form, handles success and errors
  function handleSubmit(e) {
    setLoading(!isLoading);
    e.preventDefault();
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((json) => {
          localStorage.setItem("jwt", json.jwt);
          handleLogin(json.user);
        });
      } else {
        res.json().then((json) => {
          setErrors(json.errors);
        });
      }
      setLoading(false);
    });
  }

  // render signup page
  // spans are for animation passed down through props
  return (
    <div className="signup">
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            {errors
              ? errors.map((error) => <p className="error">{error}</p>)
              : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#5b85d9" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink
                  to="/"
                  variant="body2"
                  sx={{
                    underline: {
                      borderBottom: "2px solid white",
                    },
                  }}
                >
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} />
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

export default SignUp;
