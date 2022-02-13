import "../index.css";
import Event from "./Event";
import { ActionCableProvider } from "react-actioncable-provider";

function Boards({ user }) {
  return (
    <div className="bg-yellow-100 flex flex-col min-h-screen">
      <p>boards page</p>
      <div className="text-xl font-bold">
        <ActionCableProvider url="ws://localhost:3000/cable">
          <Event />
        </ActionCableProvider>
      </div>
    </div>
  );
}

export default Boards;
