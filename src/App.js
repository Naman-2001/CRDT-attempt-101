// import { useRef, useState, useEffect } from "react";
// import Pusher from "pusher-js";
// import "./App.css";
// import { logToConsole } from "pusher-js";

// function App() {
//   const [value, setValue] = useState("");
//   Pusher.logToConsole = true;
//   var pusher = new Pusher("746549f3f54f38e2eca5", {
//     cluster: "ap2",
//   });
//   // 746549f3f54f38e2eca5
//   var channel = pusher.subscribe("text-edit-channel");

//   // useEffect(() => {
//   channel.bind("client-editing-event", function (html) {
//     console.log(html);
//     // setValue(html.text);
//   });
//   channel.bind("pusher:subscription_succeeded", function () {
//     console.log("hehe");
//   });
//   // }, []);

//   const handleChange = (e) => {
//     const data = { text: e.target.value };
//     console.log(data);
//     // fetch("http://localhost:5000/edit", {
//     //   method: "post",
//     //   body: JSON.stringify(data),
//     //   headers: new Headers({
//     //     "Content-Type": "application/json",
//     //   }),
//     // })
//     //   .then((res) => res.json())
//     //   .then((data) => console.log(data))
//     //   .catch((err) => console.log(err));
//     channel.trigger("client-editing-event", e.target.value);
//   };

//   return (
//     <div className="App">
//       <div id="user_list"></div>
//       <header className="header">
//         <h1 className="header__h1">Online Collab Edit</h1>
//       </header>
//       <div className="doc">
//         <div className="doc__background-ribbon"></div>
//         <textarea
//           id="doc"
//           // value={value}
//           className="doc__text-editor hidden"
//           onChange={(e) => handleChange(e)}
//         ></textarea>
//       </div>
//     </div>
//   );
// }

// export default App;
import React from "react";
import Editor from "./editor";

const App = () => {
  return <Editor />;
};

export default App;
