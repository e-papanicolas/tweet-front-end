import "../styles/Boards.css";

function Boards({ user }) {
  return (
    <div id="boards-container">
      <p>boards page</p>
      <div id="welcome">
        <h1>WELCOME {user.first_name}</h1>
      </div>
    </div>
  );
}

export default Boards;
