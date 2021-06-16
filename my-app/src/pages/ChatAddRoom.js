import React, { useState } from "react";
import axios from "axios";
import "./ChatAddRoom.css";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import dotenv from "dotenv";
dotenv.config();

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
      background: "white"
    },
  },
}));

const ChatAddRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [hobby, setHobby] = useState("");
  const [Images, setImages] = useState([]);
  const classes = useStyles();

  const onSubmit = async () => {
    if (!hobby || !roomName) {
      alert("Please add a task");
    }
    const accessToken = localStorage.getItem("token");
    //images: Images,
    await axios.post(
      "http://localhost:80/addroom",
      { hobby: hobby, roomName: roomName },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    setHobby("");
    setRoomName("");
  };

  return (
    <div className="form-container">
      <center>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
          <h1 className="title">Add Room</h1>
          <div>
            <TextField
              label="Text"
              type="text"
              value={hobby}
              name="hobby"
              onChange={(e) => setHobby(e.target.value)}
              variant="outlined"
            />
          </div>
          <div >
            <TextField
              label="RoomName"
              type="text"
              value={roomName}
              name="roomname"
              onChange={(e) => setRoomName(e.target.value)}
              variant="outlined"
            />
          </div>
          <div
            className="col three"
            onClick={() => {
              onSubmit();
              window.location.replace("/")
            }}
          >
            <a href="#" className="btn-login btn-sea"> Sign In </a>
          </div>

        </form>
      </center>
    </div>
  );
};

export default ChatAddRoom;
