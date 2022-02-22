import React from 'react'
// import { UserContext } from "../App";
// import { useContext} from "react";

function Profile({user}) {
  // const user = useContext(UserContext);
  return (
    <div>
      <p>profile page</p>
      <div>
        <h1>WELCOME {user.first_name}</h1>
      </div>
    </div>
  );
}
export default Profile;
