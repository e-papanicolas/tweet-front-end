import "../index.css";

function Boards({ user }) {
  return (
    <div className="bg-yellow-100 flex flex-col min-h-screen">
      <p>boards page</p>
      <div className="text-xl font-bold">
        <h1>WELCOME {user.first_name}</h1>
      </div>
    </div>
  );
}

export default Boards;
