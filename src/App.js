// import react and utils
import { useState, useEffect, createContext } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { ActionCableProvider } from "react-actioncable-provider";

// TODO: see where or if i need this import
import ActionCable from "actioncable";

// import components
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Boards from "./components/Boards";
import Event from "./components/Event";

// import css file
import "./index.css";

// TODO: see why user context isn't working properly
export const UserContext = createContext();

function App() {
  // auth - token needs to go on every page with a protected fetch
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  // set state
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState([]);

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
  }, [token]);

  // TODO: have a loading spinner here
  if (currentUser.name === "") {
    return <p>LOADING...</p>;
  }

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
              />
            }
          />

          <Route exact path="/" element={<Login onLogin={handleLogin} />} />
          {errors ? errors.map((e) => <div>{e}</div>) : null}
        </Routes>
      </div>
    );
  }

  // pages rendered when user is logged in
  return (
    <div className="App">
      <div className="background"></div>
      <NavBar handleLogOut={handleLogOut} user={currentUser} />
      <Routes>
        <Route
          path="/me"
          element={
            <Profile
              user={currentUser}
              setUser={setCurrentUser}
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route path="/myevents" element={<Boards user={currentUser} />} />
        <Route
          path="/myevents/:eventId"
          element={<Event user={currentUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
