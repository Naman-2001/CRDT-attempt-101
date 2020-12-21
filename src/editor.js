import React, { useState, useEffect, useRef } from "react";
import * as Y from "yjs";
import CodeMirror from "codemirror";
import { WebsocketProvider } from "y-websocket";
import { CodemirrorBinding } from "y-codemirror";
import "codemirror/mode/xml/xml";
const Editor = () => {
  const ydoc = new Y.Doc();

  //Websocket provider
  const provider = new WebsocketProvider(
    "wss://demos.yjs.dev",
    "codemirror-large",
    ydoc
  );

  const [textContent, settextContent] = useState("Disconnect");
  const yText = ydoc.getText("codemirror");

  const editorContainer = document.querySelector("#editor");
  const editor = CodeMirror(editorContainer, {
    mode: "javascript",
    lineNumbers: true,
  });

  const binding = new CodemirrorBinding(yText, editor, provider.awareness);

  function connect() {
    if (provider.shouldConnect) {
      provider.disconnect();
      settextContent("Connect");
    } else {
      provider.connect();
      settextContent("Disconnect");
    }
  }

  const [config, setConfig] = useState({
    mode: { name: "xml" },
    theme: "material",
    lineNumbers: true,
  });
  const [text, setText] = useState("<h1>Welcome to CodeRigade</h1>");

  return (
    <div>
      <CodeMirror
        value={text}
        className="code-editor"
        options={config}
        onBeforeChange={(editor, data, value) => {
          setText(value);
          // handleChange(value);
        }}
      />
      <button type="button" id="y-connect-btn" onClick={connect}>
        {textContent}
      </button>
    </div>
  );
};

export default Editor;
