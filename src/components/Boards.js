import React from "react";
import Event from "./Event";
import { ActionCableProvider } from "react-actioncable-provider";
// import { UserContext } from "../App";
// import { useContext} from "react";

function Boards({ user }) {
  // const user = useContext(UserContext);
  return (
    <div>
      <p>boards page</p>
      <div>
        {/* <ActionCableProvider url="ws://localhost:3000/cable">
          <Event />
        </ActionCableProvider> */}
      </div>
    </div>
  );
}

export default Boards;
