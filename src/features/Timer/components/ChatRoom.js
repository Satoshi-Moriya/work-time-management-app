import React, { useEffect, useState } from "react"
import {over} from "stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

const ChatRoom = () => {
  const [message, setMessage] = useState("");

  const connect = () =>{
      let Sock = new SockJS('http://localhost:8080/ws');
      stompClient = over(Sock);
      stompClient.connect({}, onConnected, onError);
  }

  const onConnected = () => {
      stompClient.subscribe('/chatroom/public', onMessageReceived);
  }

  const onMessageReceived = (payload) => {
      const payloadData = JSON.parse(payload.body);
      showGreeting(payloadData);
  }

  const showGreeting = (message) => {
    console.log(document.getElementById("greetings"));
    console.log(message);
    // document.getElementById("greetings").appendChild("<tr><td>" + JSON.parse(message) + "</td></tr>");
    const greetingsTable = document.getElementById("greetings");
    const newRow = document.createElement("tr");
    const newCell = document.createElement("td");
    const messageText = document.createTextNode(message.message);
    newCell.appendChild(messageText);
    newRow.appendChild(newCell);
    greetingsTable.appendChild(newRow);
  }

  const onError = (err) => {
      console.log(err);

  }

  const handleMessage = (event) =>{
      const { value } = event.target;
      console.log(value)
      setMessage(value);
  }

  const sendValue=()=>{
    console.log("sendValue");
    stompClient.send("/app/message", {}, JSON.stringify({"message": message}));
  }

  const registerUser=()=>{
      connect();
  }

  return (
    <>
      <div className="chat-content">
          <div className="send-message">
              <input type="text" className="input-message" placeholder="enter the message" value={message} onChange={handleMessage} />
              <button type="button" className="send-button" onClick={sendValue}>send</button>
          </div>
      </div>
      <div>
        {/* <button onClick={send} className="bg-dark-gray py-3 px-5 rounded-lg text-xl hover:opacity-50 focus:opacity-50 mx-3  disabled:opacity-50 disabled:cursor-not-allowed">業務開始</button>
        <button onClick={disconnect} className="bg-dark-gray py-3 px-5 rounded-lg text-xl hover:opacity-50 focus:opacity-50 mx-3  disabled:opacity-50 disabled:cursor-not-allowed">業務開始</button> */}
        <button onClick={registerUser} className="bg-dark-gray py-3 px-5 rounded-lg text-xl hover:opacity-50 focus:opacity-50 mx-3  disabled:opacity-50 disabled:cursor-not-allowed">業務開始</button>
      </div>
      <table>
          <thead>
            <tr>
                <th>Messages</th>
            </tr>
          </thead>
          <tbody id="greetings">
          </tbody>
      </table>
    </>
  )
}

export default ChatRoom