import React, { useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { IndexeddbPersistence } from "y-indexeddb";

const Todo = () => {
  const ydoc = new Y.Doc();
  const indexeddbProvider = new IndexeddbPersistence("todoList", ydoc);
  const yarray = this.ydoc.getArray("todoList");
  const [textContent, settextContent] = useState("Disconnect");

  const [value, setValue] = useState("");
  const provider = new WebsocketProvider(
    "wss://demos.yjs.dev",
    "todoList",
    ydoc
  );

  const [array, setArray] = useState([]);

  const demo = () => {
    yarray.observe((event) => {
      for (let i = 0; i < yarray.length; i++) {
        console.log(yarray.get(i));
      }
    });

    ydoc.on("update", (update) => {
      Y.applyUpdate(ydoc, update);
    });
  };

  function insert() {
    setArray((prev) => {
      return [...value];
    });
    ydoc.getArray("todoList").insert(0, array);
    setValue("");
    demo();
  }

  function connect() {
    if (provider.shouldConnect) {
      provider.disconnect();
      settextContent("Connect");
    } else {
      provider.connect();
      settextContent("Disconnect");
    }
  }
  return (
    <div>
      <div class="container">
        <div class="col-12">
          <h4>Add Todo</h4>
          <br />
          <div class="row mt-1" style={{ height: "80px" }}>
            <div class="col-1 d-none col-md-1 d-md-block"></div>
            <div class="col-12 col-md-10 d-flex justify-content-center align-items-center text-light h3">
              <div class="col-lg-12">
                <input type="text" class="form-control textbox" value={value} />
              </div>

              <div class="col-1"></div>

              <button onClick={insert} class="btn button">
                ADD
              </button>
            </div>

            <div class="col-3 d-none col-md-3 d-md-block"></div>
          </div>

          <h4>List of Tasks :</h4>
          {yarray.map((item) => {
            return (
              <div class="row mt-1">
                <div class="col-3 d-none col-md-3 d-md-block"></div>

                <div class="col-12 col-md-11 list-todo">
                  <p>
                    <span class="font-weight-bold">Task</span> : {item}
                  </p>
                </div>
                <div class="col-3 d-none col-md-3 d-md-block"></div>
              </div>
            );
          })}
          <br />
          <button
            style={{ marginLeft: "40%" }}
            class="btn button"
            onClick={connect}
          >
            {textContent}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
