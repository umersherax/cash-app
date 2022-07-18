const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./database/user.modal");
const Chat = require("./database/chat.modal");
const Vote = require('./database/vote.modal');

const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var myRooms = [];
var myGames = [];

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/all-users", async (req, res) => {
  const all_users = await User.find();
  res.send(all_users);
});

app.post('/vote', async (req, res) => {
  const {theVote, userName} = req.body;

  const userVoted = await Vote.create({
    name: userName,
    voteFor: theVote
  });
  if(userVoted){
    const allVotes = await Vote.find();
    res.send(allVotes);
  }
});

app.get('/getVotes', async (req, res) => {
  const allVotes = await Vote.find();
  res.send(allVotes);
});

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    var user;
    user = await User.findOne({ email: req.body.email, uniqueId: req.body?.googleId });
    
    console.log("founddddddd", user);

    if(!user){
       user = await User.create({
        name: req.body?.name,
        email: req.body?.email,
        uniqueId: req.body?.googleId,
        imageUrl: req.body?.imageUrl
      });  
    }

    console.log(user);

    const token = jwt.sign(
      { name: user.name, email: user.email },
      "secret123"
    );

    const newUser = {
      user,
      token,
    };
    res.json({ status: "ok", newUser });

  } catch (err) {
    res.json({ status: " went wrong", err });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const found = await User.findOne({ email, password });
    if (found) {
      const token = jwt.sign(
        {
          name: found.name,
          email: found.email,
        },
        "secret123"
      );
      const newUser = {
        user: found._id,
        userName: found.name,
        token,
      };
      res.json({ status: "ok", newUser });
    } else {
      res.json({ status: "User not foundzz" });
    }
  } catch (err) {
    res.json({ status: "some thing went wrong", err });
  }
});

app.get("/get-info", async (req, res) => {
  const token = req["headers"]["x-access-token"];
  try {
    const decode = jwt.verify(token, "secret123");
    const info = await User.findOne({ email: decode.email });
    res.json({ info, valid: true });
  } catch (err) {
    res.json({ valid: false, err });
  }
});

app.get("/get-inbox/:id", async (req, res) => {
  const userId = req.params.id;
  const myChats = await Chat.find({
    $or: [{ sender: userId }, { receiver: userId }],
  });
  res.send(myChats);
});

io.on("connection", (socket) => {
  socket.emit("welcome", "welcome new user");

  // game logic starts here

  socket.on("send-request", async (user) => {
    const { _id } = user;
    const checkGameStatus = myGames?.filter(
      (game) =>
        (game.currentUserId === _id || game.p2 === _id)
    );
    const len = checkGameStatus.length;
    if (len > 0) {
      socket.emit("already-playing");
    } else {
      socket.broadcast.emit("request-sent", user);
    }
  });

  socket.on("reject-request", (user) => {
    socket.broadcast.emit("reject-it", user);
  });

  socket.on("out-of-game", async (users) => {
    const {currentUserId} = users;
    const kickOut = myGames.filter((game) => game.currentUserId === currentUserId);
    const len = kickOut.length;
    if(len > 1){
      const index = myGames.indexOf(kickOut[0]);
      myGames.splice(0, index); 
    }
    if( len === 1 ){
      myGames.pop();
    }
    socket.broadcast.emit('kicked-out', users);
  });

  socket.on("request-accepted", async (user) => {
    socket.broadcast.emit("accepted", user);
  });

  socket.on("join-game", async (room) => {
    const {currentUserId, p2} = room;
    const gameRoom = {
      currentUserId,
      p2,
      id: socket.id,
    };
    var fnds;
    if (myGames?.length) {
      fnds = myGames.filter(
        (f) =>
          (f.currentUserId === currentUserId && f.p2 === p2) ||
          (f.currentUserId === p2 && f.p2 === currentUserId)
      );
    }
    if (!fnds?.length) {
      myGames.push(gameRoom);
    }
    const lastJoin = fnds?.length ? fnds[0].id : gameRoom.id;
    socket.join(lastJoin);
  })

  socket.on("new-move", (move) => {
    const found = myGames.filter(
      (f) =>
        (f.currentUserId === move.currentUserId && f.p2 === move.p2) ||
        (f.currentUserId === move.p2 && f.p2 === move.currentUserId)
    );
    io.to(found[0]?.id).emit("rec", move);
  });

  socket.on("new-game", (move) => {
    const found = myGames.filter(
      (f) =>
        (f.currentUserId === move.currentUserId && f.p2 === move.p2) ||
        (f.currentUserId === move.p2 && f.p2 === move.currentUserId)
    );
    io.to(found[0]?.id).emit("finish-it");
  });

  //game logic ends here




  // chat logic starts here
  socket.on("join-room", async (room) => {
    const msgTo = room.msgTo;
    const msgFrom = room.msgFrom;
    const myRoom = {
      msgTo,
      msgFrom,
      id: socket.id,
    };
    var fnd;
    if (myRooms?.length) {
      fnd = myRooms.filter(
        (f) =>
          (f.msgTo === msgTo && f.msgFrom === msgFrom) ||
          (f.msgTo === msgFrom && f.msgFrom === msgTo)
      );
    }
    if (!fnd?.length) {
      myRooms.push(myRoom);
    }
    const lastJoin = fnd?.length ? fnd[0].id : myRoom.id;
    socket.join(lastJoin);
    const all_chats = await Chat.find({
      $or: [
        { sender: msgFrom, receiver: msgTo },
        { sender: msgTo, receiver: msgFrom },
      ],
    });
    socket.emit("my-chats", all_chats);
  });

  socket.on("message", async (user) => {
    const chatObj = {
      currentUser: user.msgFrom,
      msg_to: user.msgTo,
      msg: user.msg,
      senderName: user.msgFromName,
    };

    const found = myRooms.filter(
      (f) =>
        (f.msgTo === user.msgTo && f.msgFrom === user.msgFrom) ||
        (f.msgTo === user.msgFrom && f.msgFrom === user.msgTo)
    );
    io.to(found[0]?.id).emit("rec", chatObj);

    var newChat = {
      currentUser: user.msgFrom,
      msg: user.msg,
      senderName: user.msgFromName,
      exactTime: Date.now(),
    };

    const findInbox = await Chat.find({
      $or: [
        { sender: user.msgFrom, receiver: user.msgTo },
        { sender: user.msgTo, receiver: user.msgFrom },
      ],
    });
    if (!findInbox.length) {
      await Chat.create({
        sender: user.msgFrom,
        receiver: user.msgTo,
        message: newChat,
      });
    } else {
      await Chat.updateOne(
        {
          $or: [
            { sender: user.msgFrom, receiver: user.msgTo },
            { sender: user.msgTo, receiver: user.msgFrom },
          ],
        },
        { $push: { message: newChat } }
      );
    }
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log("server running..."));

//  db connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected..."))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
