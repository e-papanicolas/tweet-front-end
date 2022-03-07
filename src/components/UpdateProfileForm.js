import React from "react";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import "../styles/Profile.css";
import defaultImage from "../images/default-user-image.png";

export default function UpdateProfileForm({
  setProfileData,
  profileData,
  uploadPhoto,
  setUploadPhoto,
  handleSubmitPicture,
  user,
  handleSubmitProfileEdit,
  setEditProfile,
  editProfile,
}) {
  // handles form input changes
  function handleProfileDataChange(e) {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div id="profile-container">
      <div className="profile-photo-container">
        {user.get_image === "../images/default-user-image.png" ? (
          <img src={defaultImage} alt="user" />
        ) : (
          <img src={user.get_image} alt="user" />
        )}
      </div>

      {/* <div> */}
      {/* <div className="upload-photo">
          <form onSubmit={handleSubmitPicture}>
            <label htmlFor="image">
              <input type="file" name="image" accept="image/*" />
            </label>
            <input className="submit-button" type="submit" value="Submit" />
          </form>
        </div> */}
      {/* </div> */}

      <div className="edit-profile">
        <div className="upload-photo">
          <form onSubmit={handleSubmitPicture}>
            <label htmlFor="image">
              <input type="file" name="image" accept="image/*" />
            </label>
            <input id="submit-button" type="submit" value="Submit" />
          </form>
        </div>
        <form>
          <div className="edit-profile-input">
            <label>Username/ </label>
            <input
              name="username"
              placeholder={user.username}
              onChange={handleProfileDataChange}
            ></input>
          </div>
          <div className="edit-profile-input">
            <label>First name/ </label>
            <input
              name="first_name"
              placeholder={user.first_name}
              onChange={handleProfileDataChange}
            ></input>
          </div>
          <div className="edit-profile-input">
            <label>Last name/ </label>
            <input
              name="last_name"
              placeholder={user.last_name}
              onChange={handleProfileDataChange}
            ></input>
          </div>
          <div className="edit-profile-bio-input">
            <label>Bio/ </label>

            <textarea
              name="bio"
              placeholder={user.bio}
              onChange={handleProfileDataChange}
              rows="4"
            ></textarea>
          </div>
        </form>
        <div className="upload-buttons">
          <Tooltip title="upload changes">
            <Icon
              className="icon-p"
              onClick={(e) => handleSubmitProfileEdit(e)}
            >
              upload
            </Icon>
          </Tooltip>
          <Tooltip title="close">
            <Icon className="icon-p" onClick={() => setEditProfile(false)}>
              clear
            </Icon>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
