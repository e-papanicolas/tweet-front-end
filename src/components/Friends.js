import "../styles/Friends.css";

function Friends({ user }) {
  return (
    <div id="friends-container">
      <p>friends page</p>
      <div id="welcome">
        <h1>WELCOME {user.first_name}</h1>
      </div>
    </div>
  );
}

export default Friends;
