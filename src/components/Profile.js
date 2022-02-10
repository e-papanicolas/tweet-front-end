import "../styles/Profile.css";

function Profile({ user }) {
  return (
    <div id="profile-container">
      <p>profile page</p>
      <div id="welcome">
        <h1>WELCOME {user.first_name}</h1>
      </div>
    </div>
  );
}
export default Profile;
