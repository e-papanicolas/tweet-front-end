import React from "react";
import { UserContext } from "../App";
import { useContext } from "react";

export default function NewBoardForm() {
  const user = useContext(UserContext);
  return <div>NewBoardForm</div>;
}
