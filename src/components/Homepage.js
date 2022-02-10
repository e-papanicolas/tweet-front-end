import "../styles/Homepage.css";

function Homepage({ user }) {
  return (
    <div id="homepage-container">
      <p>homepage</p>
      <div id="welcome">
        <h1>WELCOME {user.first_name}</h1>
      </div>
    </div>
  );
}

export default Homepage;
