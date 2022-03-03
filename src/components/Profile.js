// import react and utils
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import "../styles/Profile.css";
import Loader from "./Loader";
import defaultImage from "../images/default-user-image.png";

function Profile({ user, setUser, setLoggedIn }) {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  // sets state
  const [editProfile, setEditProfile] = useState(false);
  const [profilePic, setProfilePic] = useState();
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [warnDelete, setWarnDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    bio: user.bio,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
  });

  // loading spinner when state is set to true
  if (isLoading) {
    return <Loader />;
  }

  // handles form input changes
  function handleProfileDataChange(e) {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  }

  // fetch to submit profile update
  function handleSubmitProfileEdit(e) {
    setLoading(!isLoading);
    e.preventDefault();
    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUser(data.user);
          setEditProfile(!editProfile);
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
        });
      }
      setLoading(false);
    });
  }

  // separate fetch for the profile picture because body is not being stringified
  function handleSubmitPicture(e) {
    setLoading(!isLoading);
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
        });
      }
      setLoading(false);
    });
  }

  // handles account deletion
  function handleDeleteAccount(e) {
    setLoading(!isLoading);
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

  // page render
  return (
    <div className="profile-page-container">
      <div id="profile-container">
        <div className="inner-profile">
          <div className="profile-photo-container">
            {user.get_image === "../images/default-user-image.png" ? (
              <img src={defaultImage} alt="user" />
            ) : (
              <img src={profilePic || user.get_image} alt="user" />
            )}

            {uploadPhoto ? (
              <div>
                <div className="upload-photo">
                  <form onSubmit={handleSubmitPicture}>
                    <label htmlFor="image">
                      <input type="file" name="image" accept="image/*" />
                    </label>
                    <input
                      className="submit-button"
                      type="submit"
                      value="Submit"
                    />
                  </form>
                  <Tooltip title="close">
                    <Icon
                      className="icon-s"
                      onClick={() => setUploadPhoto(!uploadPhoto)}
                    >
                      clear
                    </Icon>
                  </Tooltip>
                </div>
              </div>
            ) : (
              <div className="camera-icon">
                <Tooltip title="upload profile image">
                  <Icon
                    className="icon-p"
                    onClick={() => setUploadPhoto(!uploadPhoto)}
                  >
                    add_a_photo
                  </Icon>
                </Tooltip>
              </div>
            )}
          </div>
          {editProfile ? (
            <div className="edit-profile">
              <form>
                <div className="edit-profile-input">
                  <label>Username: </label>
                  <input
                    name="username"
                    placeholder={user.username}
                    onChange={handleProfileDataChange}
                  ></input>
                </div>
                <div className="edit-profile-input">
                  <label>First name: </label>
                  <input
                    name="first_name"
                    placeholder={user.first_name}
                    onChange={handleProfileDataChange}
                  ></input>
                </div>
                <div className="edit-profile-input">
                  <label>Last name: </label>
                  <input
                    name="last_name"
                    placeholder={user.last_name}
                    onChange={handleProfileDataChange}
                  ></input>
                </div>
                <div className="edit-profile-bio-input">
                  <label>bio: </label>
                  <textarea
                    name="bio"
                    placeholder={user.bio}
                    onChange={handleProfileDataChange}
                    cols="50"
                    rows="8"
                  ></textarea>
                </div>
              </form>
              <div>
                <Tooltip title="upload changes">
                  <Icon
                    className="icon-p"
                    onClick={(e) => handleSubmitProfileEdit(e)}
                  >
                    upload
                  </Icon>
                </Tooltip>
                <Tooltip title="close">
                  <Icon
                    className="icon-p"
                    onClick={() => setEditProfile(!editProfile)}
                  >
                    clear
                  </Icon>
                </Tooltip>
              </div>
            </div>
          ) : (
            <div className="user-profile-info-container">
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
          )}

          {editProfile ? null : (
            <div className="profile-buttons">
              <Tooltip title="edit profile">
                <Icon
                  className="icon-p icon-y"
                  onClick={() => setEditProfile(!editProfile)}
                >
                  edit
                </Icon>
              </Tooltip>
              <Tooltip title="delete account">
                <Icon className="icon-p icon-r" onClick={setWarnDelete}>
                  delete_forever
                </Icon>
              </Tooltip>
            </div>
          )}
          {errors ? errors.map((error) => <p>{error}</p>) : null}
          {warnDelete ? (
            <div>
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
      </div>
    </div>
  );
}
export default Profile;
