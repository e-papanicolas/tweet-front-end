import React from "react";
// import { UserContext } from "../App";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Icon from "@mui/material/Icon";

function Profile({ user, setUser }) {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  // const user = useContext(UserContext);

  const [editProfile, setEditProfile] = useState(false);
  const [profilePic, setProfilePic] = useState();
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [warnDelete, setWarnDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState("");

  const [profileData, setProfileData] = useState({
    bio: user.bio,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
  });

  // handles form input changes
  function handleProfileDataChange(e) {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  }

  // fetch to submit profile update
  function handleSubmitProfileEdit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setEditProfile(!editProfile);
      })
      .catch(console.error);
  }

  // separate fetch for the profile picture because body is not being stringified
  function handleSubmitPicture(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfilePic(data.user.get_image);
        setUploadPhoto(!uploadPhoto);
      })
      .catch(console.error);
  }

  // handles account deletion
  function handleDeleteAccount(e) {
    e.preventDefault();
    if (confirmDelete === user.username) {
      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.clear();
      setUser({});
      navigate("/");
    }
  }

  // page render
  return (
    <div id="profile-container">
      <div>
        <img src={profilePic || user.get_image} alt="user" />
        {uploadPhoto ? (
          <div>
            <div className="upload-photo">
              <form onSubmit={handleSubmitPicture}>
                <label htmlFor="image">
                  <input type="file" name="image" accept="image/*" />
                </label>
                <input type="submit" value="submit" />
              </form>
              <Icon
                className="icon-s"
                onClick={() => setUploadPhoto(!uploadPhoto)}
              >
                clear
              </Icon>
            </div>
          </div>
        ) : (
          <Icon className="icon-p" onClick={() => setUploadPhoto(!uploadPhoto)}>
            add_a_photo
          </Icon>
        )}
      </div>
      {editProfile ? (
        <>
          <label>username: </label>
          <input
            name="username"
            placeholder={user.username}
            onChange={handleProfileDataChange}
          ></input>
        </>
      ) : (
        <div>{user.username}</div>
      )}
      {editProfile ? (
        <div>
          <label>first name: </label>
          <input
            name="first_name"
            placeholder={user.first_name}
            onChange={handleProfileDataChange}
          ></input>
          <label>last name: </label>
          <input
            name="last_name"
            placeholder={user.last_name}
            onChange={handleProfileDataChange}
          ></input>
        </div>
      ) : (
        <h2>
          {user.first_name[0].toUpperCase() + user.first_name.slice(1)}{" "}
          {user.last_name[0].toUpperCase() + user.last_name.slice(1)}
        </h2>
      )}
      {editProfile ? (
        <div>
          <label>bio: </label>
          <textarea
            name="bio"
            placeholder={user.bio}
            onChange={handleProfileDataChange}
          ></textarea>
          <div>
            <Icon
              className="icon-p"
              onClick={(e) => handleSubmitProfileEdit(e)}
            >
              upload
            </Icon>
            <Icon
              className="icon-p"
              onClick={() => setEditProfile(!editProfile)}
            >
              clear
            </Icon>
          </div>
        </div>
      ) : user.bio === null ? (
        <div>
          <p>You haven't added a bio yet.</p>
        </div>
      ) : (
        <div>
          <p>{user.bio}</p>
        </div>
      )}
      {editProfile ? null : (
        <div>
          <Icon className="icon-p" onClick={() => setEditProfile(!editProfile)}>
            edit
          </Icon>
          <Icon className="icon-p" onClick={setWarnDelete}>
            delete_forever
          </Icon>
        </div>
      )}
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
            <button onClick={() => setWarnDelete(!warnDelete)}>Cancel</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
export default Profile;
