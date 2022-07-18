import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confirm from "./Confirm";

export default function Users({ allUsers }) {
  const [data, setData] = useState([]);
  const redirect = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const currentUser = localStorage.getItem("userId");

  useEffect(() => {
    setData(allUsers);
  }, [allUsers]);

  const startChat = (user) => {
    setIsOpen(true);
    const dataType = {
      user,
      type: "chat"
    }
    redirect(`/chat/${user._id}/${user.name}`);
  };

  const startGame = (user) => {
    const dataType = {
      user,
      type: "game"
    }
    setType(dataType);
    setIsOpen(true);
  };

  const loadingStatus = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <div className="container">
      <h1>
        {" "}
        <i className="fa fa-user" aria-hidden="true"></i> ALL USERS
      </h1>
      <table className="table table-dark table-hover table-borderless mt-5">
        <thead>
          <tr>
            <th className="p-3" scope="col">#</th>
            <th className="p-3" scope="col">User Name</th>
            <th className="p-3" scope="col">
              <div className="d-flex flex-row">
                <p>Chat</p>
                <p style={{ marginLeft: 25 }}>Game</p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (user, index) =>
              currentUser !== user._id && (
                <tr key={index}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">
                    {
                      <div>
                          <i style={{ marginLeft: 10, cursor: "pointer", color:"#0DCAF0" }} className="fa fa-envelope" aria-hidden="true" onClick={() => startChat(user)} />
                          <i style={{ marginLeft: 50, cursor: "pointer", color:"#0DCAF0" }} onClick={() => startGame(user)} className="fa fa-gamepad" aria-hidden="true"></i>
                      </div>
                    }
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
      {isOpen && <Confirm type={type} loadingStatus={loadingStatus} isOpen={isOpen} />}
    </div>
  );
}
