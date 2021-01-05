import React, { useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { CodemirrorBinding } from "y-codemirror";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/python/python";
import "codemirror/lib/codemirror.css";

const CodeMirrorEditor = () => {
  const [codeMirrorText, setCodeMirrorText] = useState("");
  const [hasLineNumber, setHasLineNumber] = useState(true);
  const codeMirrorRef = useRef();

  useEffect(() => {
    if (!codeMirrorRef.current) return;

    // A Yjs document holds the shared data
    const ydoc = new Y.Doc({
      meta: {
        cellId: 1,
      },
    });

    const wsProvider = new WebsocketProvider("ws://localhost:1234", 1, ydoc);
    // Define a shared text type on the document
    const yText = ydoc.getText(`codemirror`);

    wsProvider.awareness.setLocalStateField("user", {
      name: "naman",
      color: "#008833",
    });
    // "Bind" the codemirror editor to a Yjs text type.
    const _codemirrorBinding = new CodemirrorBinding(
      yText,
      codeMirrorRef.current,
      wsProvider.awareness
    );

    wsProvider.on("status", (event) => {
      console.log(event.status); // logs "connected" or "disconnected"
    });
  }, []);

  const handleChange = (value) => {
    console.log("inside handle change: ", value);
    setCodeMirrorText(value);
  };

  return (
    <div style={{ marginTop: "48px" }}>
      <div>Code Mirror Editor</div>
      <button
        type="button"
        onClick={() => setHasLineNumber((prevState) => !prevState)}
      >
        Toggle line number
      </button>
      <CodeMirror
        editorDidMount={(editor) => (codeMirrorRef.current = editor)}
        value={codeMirrorText}
        onBeforeChange={(_editor, _data, value) => {
          handleChange(value);
        }}
        options={{
          lineNumbers: hasLineNumber,
          mode: "python",
          extraKeys: {
            "Ctrl-Space": (cm) => {
              const { line, ch } = cm.getCursor();
              const lineOfCode = cm.getLine(line);
              // do some stuff when user hits Ctrl-Space
            },
          },
        }}
      />
    </div>
  );
};

export default CodeMirrorEditor;
