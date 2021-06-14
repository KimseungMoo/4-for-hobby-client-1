import React, { useState, useEffect } from "react";
import axios from "axios";
import socketio from "socket.io-client";
import dotenv from "dotenv";
import './ChattingRoom.css';

dotenv.config()

const socket = socketio.connect(`${process.env.REACT_APP_API_URL}`)

function ChattingRoom({ roomId }) {
  const [chatting, setChatting] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);

  const accessToken = localStorage.getItem('token');

  const getUserNameHandler = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/mypage`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
      .then((res) => {
        const { id, name } = res.data.data.userInfo;
        setName(name);
        setId(id);
      })
  }

  const getUserListHandler = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/getroomusers`,
      { roomId }
      , {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      .then((res) => {
        const { userNames } = res.data.data;
        setUsers(userNames);
      })
  }

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    await socket.emit('send', {
      name: name,
      message: chatting,
      id: id
    })
    setChatting("");
  }

  const getMessageHandler = async () => {
    await socket.on('sendAll', (data) => {
      // console.log(data)
      setLogs([...logs, data]);
    })
  }

  useEffect(() => {
    getUserNameHandler();
    getUserListHandler();
  }, [])

  useEffect(() => {
    getMessageHandler();
  }, [logs])


  return (
    <div>
      <div className="container">
        <div className="user-list">
          <div className="title">제목입니다</div>
          {users.map((user, index) => {
            return <div className="user" key={index}>
              내 이름은 {user.name} 입니다.
            </div>
          })}
        </div>
        <form onSubmit={sendMessageHandler} className="chatBox">
          {logs.map((e, index) => {
            if (e.id === id) {
              return <div className="my-chat" key={index}>
                {e.name} : {e.message}
              </div>
            } else {
              return <div className="chat" key={index}>
                {e.name} : {e.message}
              </div>
            }
          })}

          <input
            type="chatting"
            onChange={(e) => setChatting(e.target.value)}
            value={chatting}
          ></input>
          <button className="btn">전송</button>
        </form>
      </div>
    </div>
  )
}

export default ChattingRoom;