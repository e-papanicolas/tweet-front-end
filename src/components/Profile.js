// import react and utils
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../styles/Profile.css";
import defaultImage from "../images/default-user-image.png";
import UpdateProfileForm from "./UpdateProfileForm";

function Profile({ user, setUser, setLoggedIn, setLoading }) {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  // sets state
  const [editProfile, setEditProfile] = useState(false);
  const [profilePic, setProfilePic] = useState();
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [warnDelete, setWarnDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState("");
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    bio: user.bio,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
  });

  // fetch to submit profile update
  function handleSubmitProfileEdit(e) {
    setLoading(true);
    e.preventDefault();
    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        res.json().then((data) => {
          setUser(data.user);
          setEditProfile(!editProfile);
        });
      } else {
        res.json().then((data) => {
          console.log(data);
          setErrors(data.errors);
          setOpen(true);
        });
      }
      setLoading(false);
    });
  }

  // separate fetch for the profile picture because body is not being stringified
  function handleSubmitPicture(e) {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          setProfilePic(data.user.get_image);
          setUploadPhoto(!uploadPhoto);
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
          setOpen(true);
        });
      }
      setLoading(false);
    });
  }

  // handles account deletion
  function handleDeleteAccount(e) {
    setLoading(true);
    e.preventDefault();
    if (confirmDelete === user.username) {
      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoggedIn(false);
      localStorage.clear();
      setLoading(false);
      navigate("/");
    }
  }

  // handles closing error messages
  function handleClose() {
    setOpen(false);
  }

  // page render
  return (
    <div className="profile-page-container">
      {editProfile ? (
        <UpdateProfileForm
          setProfileData={setProfileData}
          profileData={profileData}
          setUploadPhoto={setUploadPhoto}
          uploadPhoto={uploadPhoto}
          user={user}
          handleSubmitPicture={handleSubmitPicture}
          handleSubmitProfileEdit={handleSubmitProfileEdit}
          editProfile={editProfile}
          setEditProfile={setEditProfile}
        />
      ) : (
        <div id="profile-container">
          <div className="profile-photo-container">
            {user.get_image === "../images/default-user-image.png" ? (
              <img src={defaultImage} alt="user" />
            ) : (
              <img src={profilePic || user.get_image} alt="user" />
            )}
          </div>
          <div className="profile-info-container">
            <h2>
              <span className="at">@</span>
              {user.username}
            </h2>
            <h2>
              {user.first_name[0].toUpperCase() + user.first_name.slice(1)}{" "}
              {user.last_name[0].toUpperCase() + user.last_name.slice(1)}
            </h2>
            {user.bio === null ? (
              <div className="bio">
                <p>
                  <strong>Hello World.</strong> I'm new here & I haven't added
                  my bio yet!
                </p>
              </div>
            ) : (
              <div className="bio">
                <p>{user.bio}</p>
              </div>
            )}
          </div>
          <div className="profile-buttons">
            <Tooltip title="delete account">
              <Icon className="icon-p icon-r" onClick={setWarnDelete}>
                delete_forever
              </Icon>
            </Tooltip>
            <Tooltip title="edit profile">
              <Icon
                className="icon-p icon-y"
                onClick={() => setEditProfile(true)}
              >
                edit
              </Icon>
            </Tooltip>
          </div>

          {warnDelete ? (
            <div className="delete-profile">
              <p>
                <strong>WARNING: </strong> You are about to delete your account.
                This cannot be undone.
              </p>
              <p>Please type your username and press "I Agree" to confirm.</p>
              <form onSubmit={handleDeleteAccount}>
                <input
                  type="text"
                  placeholder={user.username}
                  onChange={(e) => setConfirmDelete(e.target.value)}
                />
                <input type="submit" value="I Agree" />
                <button onClick={() => setWarnDelete(!warnDelete)}>
                  Cancel
                </button>
              </form>
            </div>
          ) : null}
        </div>
      )}

      <div>
        {errors
          ? errors.map((error) => {
              return (
                <Snackbar
                  open={open}
                  autoHideDuration={5000}
                  onClose={handleClose}
                  message={error}
                >
                  <MuiAlert variant="filled" severity="error">
                    {error}
                  </MuiAlert>
                </Snackbar>
              );
            })
          : null}
      </div>
    </div>
  );
}
export default Profile;
