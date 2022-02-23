import React from "react";
// import { UserContext } from "../App";
import { useState } from "react";
import "../App.css";
import Icon from "@mui/material/Icon";

function Profile({ user }) {
  const token = localStorage.getItem("jwt");
  // const user = useContext(UserContext);

  const [editProfile, setEditProfile] = useState(false);
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [uploadPhoto, setUploadPhoto] = useState(false);

  function handleBioChange(e) {
    setBio(e.target.value);
  }

  function handleSubmitBio(e) {
    e.preventDefault();
  }

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
  console.log(user);
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
      <div>{user.username}</div>
      <h2>
        {user.first_name[0].toUpperCase() + user.first_name.slice(1)}{" "}
        {user.last_name[0].toUpperCase() + user.last_name.slice(1)}
      </h2>
      {editProfile ? (
        <div>
          <textarea
            name="bio"
            placeholder={user.bio}
            onChange={handleBioChange}
          ></textarea>
          <div>
            <Icon className="icon-p" onClick={(e) => handleSubmitBio(e)}>
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
          <Icon className="icon-p">delete_forever</Icon>
        </div>
      )}
    </div>
  );
}
export default Profile;
