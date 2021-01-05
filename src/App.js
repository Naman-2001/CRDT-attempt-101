import { useState, useEffect } from "react";
import "./App.css";
import * as api from "./api";
import TextEdit from "./TextEdit";
import io from "socket.io-client";

let socket;
function App() {
  const [timeStamp, setTimeStamp] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    socket = io("localhost:8000");

    // api.subscribeToTimer((err, timestamp) => setTimeStamp(timestamp));
    socket.on("timer", (timestamp) => setTimeStamp(timestamp));
    socket.emit("subscribeToTimer", 1000);
  }, []);

  return (
    <div>
      <h2>Here's the TextEditContainer.</h2>
      <p>
        Time:{" "}
        {timeStamp
          ? new Date(timeStamp).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: true,
              timeZoneName: "short",
            })
          : "no date yet"}
      </p>
      <TextEdit text={text} />
    </div>
  );
}

export default App;
