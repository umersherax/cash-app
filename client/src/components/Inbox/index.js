import React, { useEffect, useState } from "react";
import "./inbox.css";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { baseUrl } from "../../common/constants";
import { useNavigate } from "react-router-dom";

var count = 0;
const Inbox = () => {
  const socket = io(baseUrl);
  const redirect = useNavigate();

  const [move, setMove] = useState([]);
  const [error, setError] = useState("");
  const { pathname } = useLocation();
  const getPath = pathname.split("/");
  const currentUser = localStorage.getItem("userName");
  const currentUserId = localStorage.getItem("userId");


  const users = [currentUser, getPath[3]];

  const random = users.sort();

  const [player, setPlayer] = useState(random[0]);


  socket.once('kicked-out',users => {
    if(currentUserId === users.p2){
      redirect('/dashboard');
    }
  });

  useEffect(() => {
    const userToJoin = { currentUserId, p2: getPath[2] };
    socket.emit("join-game", userToJoin);
  }, []);
  

  useEffect(()=>{
    return () => {
      const usersToKick = { currentUserId, p2: getPath[2] };
      socket.emit('out-of-game', usersToKick);
      
    }
  },[])

  const played = (id) => {
    if (player === "Game Over") {
      return null;
    }
    const overRideMove = move.filter((e) => e.id === id).length > 0;
    const isMyTurn = currentUser === player;

    if (!overRideMove && isMyTurn) {
      setError("");
      const myTurn = {
        currentUser,
        p2Name: getPath[3],
        currentUserId,
        id,
        tick: move.length % 2 === 0 ? "X" : "0",
        p2: getPath[2],
      };
      socket.emit("new-move", myTurn);
    } else {
      setError(overRideMove ? "Move can't be undo" : "Wait for your turn");
    }
  };

  socket.on("rec", (myTurn) => {
    console.log(myTurn);
    setPlayer(myTurn.p2Name);
    setMove((move) => [...move, myTurn]);
    checkWin();
  });

  const checkWin = () => {
    count++;
    var cnt, cnt1, cnt2, cnt3, cnt4, cnt5, cnt6, cnt7, cnt8;

    var x = '<i class="fa fa-times"></i>';
    var y = '<i class="fa fa-dot-circle-o"></i>';

    cnt = document.getElementById("1").innerHTML;
    cnt1 = document.getElementById("2").innerHTML;
    cnt2 = document.getElementById("3").innerHTML;
    cnt3 = document.getElementById("4").innerHTML;
    cnt4 = document.getElementById("5").innerHTML;
    cnt5 = document.getElementById("6").innerHTML;
    cnt6 = document.getElementById("7").innerHTML;
    cnt7 = document.getElementById("8").innerHTML;
    cnt8 = document.getElementById("9").innerHTML;

    if (
      (cnt === x && cnt1 === x && cnt2 === x) ||
      (cnt === x && cnt3 === x && cnt6 === x) ||
      (cnt1 === x && cnt4 === x && cnt7 === x) ||
      (cnt2 === x && cnt5 === x && cnt8 === x) ||
      (cnt3 === x && cnt4 === x && cnt5 === x) ||
      (cnt6 === x && cnt7 === x && cnt8 === x) ||
      (cnt2 === x && cnt5 === x && cnt8 === x) ||
      (cnt2 === x && cnt4 === x && cnt6 === x) ||
      (cnt === x && cnt4 === x && cnt8 === x)
    ) {
      setError(`${random[0]} won`);
      setPlayer("Game Over");
      count=0;
    }
    if (
      (cnt === y && cnt1 === y && cnt2 === y) ||
      (cnt === y && cnt3 === y && cnt6 === y) ||
      (cnt1 === y && cnt4 === y && cnt7 === y) ||
      (cnt2 === y && cnt5 === y && cnt8 === y) ||
      (cnt3 === y && cnt4 === y && cnt5 === y) ||
      (cnt6 === y && cnt7 === y && cnt8 === y) ||
      (cnt2 === y && cnt5 === y && cnt8 === y) ||
      (cnt2 === y && cnt4 === y && cnt6 === y) ||
      (cnt === y && cnt4 === y && cnt8 === y)
    ) {
      setError(`${random[1]} won`);
      setPlayer("Game Over");
      count=0;
    } else if (count === 9 && player !== "Game Over") {
      setPlayer("Game Over");
      setError(`DRAW !`);
    }
  };

  const refresh = () => {
    const finish = {
      currentUserId,
      p2: getPath[2],
    };
    socket.emit("new-game", finish);
  };
  socket.on("finish-it", () => {
    setMove([]);
    setPlayer(random[0]);
    setError("");
  });

  return (
    <center>
      <div className="d-flex flex-row justify-content-center mt-5">
        <h1 style={{ marginRight: 5 }}>
          <i className="fa fa-user" />
        </h1>
        <h1>
          {player} {player !== "Game Over" && "Turn"}
        </h1>
      </div>

      <table className="mt-5 custom-table">
        <tr>
          {[1, 2, 3].map((arr, index) => (
            <td className="custom-td" key={index} onClick={() => played(arr)}>
              <h1 className="text-center text-info" id={arr}>
                {move.map((s) => s.id === arr && (s.tick === 'X' ? <i className="fa fa-times" /> : <i className="fa fa-dot-circle-o"/> ))}
              </h1>
            </td>
          ))}
        </tr>
        <tr>
          {[4, 5, 6].map((arr, index) => (
            <td className="custom-td" key={index} onClick={() => played(arr)}>
              <h1 className="text-center text-info" id={arr}>
                  {move.map((s) => s.id === arr && (s.tick === 'X' ? <i className="fa fa-times" /> : <i className="fa fa-dot-circle-o"/> ))}
              </h1>
            </td>
          ))}
        </tr>
        <tr>
          {[7, 8, 9].map((arr, index) => (
            <td className="custom-td" key={index} onClick={() => played(arr)}>
              <h1 className="text-center text-info" id={arr}>
                {move.map((s) => s.id === arr && (s.tick === 'X' ? <i className="fa fa-times" /> : <i className="fa fa-dot-circle-o"/> ))}
              </h1>
            </td>
          ))}
        </tr>
      </table>
      <p className="text-danger mt-4">{error}</p>
      <br />
      <button id="result" className="st" onClick={refresh}>
        New Game
      </button>
      <br />
      <br />
    </center>
  );
};

export default Inbox;
