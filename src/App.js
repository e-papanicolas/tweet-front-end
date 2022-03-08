// import react and utils
import { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { gsap } from "gsap";

// import components
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Boards from "./components/Boards";
import Event from "./components/Event";
import Loader from "./components/Loader";

// import css file
import "./index.css";

function App() {
  // auth - token needs to go on every page with a protected fetch
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  // set state
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // dark and light mode
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // handles login and logout, sets or removes user
  function handleLogin(user) {
    setCurrentUser(user);
    setLoggedIn(true);
    navigate("/myevents");
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }

  // fetches the user from api and sets user
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setCurrentUser(data.user);
          setLoggedIn(true);
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
        });
      }
    });
    setLoading(false);
  }, [token]);

  // spinner for loading when state is true
  if (isLoading) {
    return <Loader />;
  }

  // animations for logo
  const onMouseEnterLogo = ({ currentTarget }) => {
    gsap.to(currentTarget, { color: "#f2cb05" });
  };

  const onMouseLeaveLogo = ({ currentTarget }) => {
    gsap.to(currentTarget, { color: "black" });
  };

  const onMouseEnterLetter = ({ currentTarget }) => {
    gsap.to(currentTarget, { y: -100, duration: 1 });
  };

  const onMouseLeaveLetter = ({ currentTarget }) => {
    gsap.to(currentTarget, { y: 0, duration: 1 });
  };

  // pages rendered when user is logged out
  if (loggedIn === false) {
    return (
      <div>
        <Routes>
          <Route
            path="/signup"
            element={
              <SignUp
                setCurrentUser={setCurrentUser}
                handleLogin={handleLogin}
                onMouseEnterLogo={onMouseEnterLogo}
                onMouseLeaveLogo={onMouseLeaveLogo}
                onMouseEnterLetter={onMouseEnterLetter}
                onMouseLeaveLetter={onMouseLeaveLetter}
              />
            }
          />

          <Route
            exact
            path="/"
            element={
              <Login
                onLogin={handleLogin}
                onMouseEnterLogo={onMouseEnterLogo}
                onMouseLeaveLogo={onMouseLeaveLogo}
                onMouseEnterLetter={onMouseEnterLetter}
                onMouseLeaveLetter={onMouseLeaveLetter}
              />
            }
          />
          {errors ? errors.map((e) => <div>{e}</div>) : null}
        </Routes>
      </div>
    );
  }

  // pages rendered when user is logged in
  return (
    <div>
      <div className="App" data-theme={theme}>
        <div className="background"></div>
        <NavBar
          handleLogOut={handleLogOut}
          user={currentUser}
          switchTheme={switchTheme}
          theme={theme}
        />
        <Routes>
          <Route
            path="/me"
            element={
              <Profile
                user={currentUser}
                setUser={setCurrentUser}
                setLoggedIn={setLoggedIn}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="/myevents"
            element={<Boards user={currentUser} setLoading={setLoading} />}
          />
          <Route
            path="/myevents/:eventId"
            element={<Event user={currentUser} setLoading={setLoading} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
