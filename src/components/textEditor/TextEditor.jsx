

import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({setDescription, initialValue}) => {
  const [state, setState] = useState({ value: initialValue ? initialValue : null });
  const handleChange = value => {
    setState({ value });
    setDescription({ description: value })
  };


  useEffect(() => {
    console.log(initialValue);
    setState({ value: initialValue });
  }, [initialValue])
  
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={initialValue===null ? "Haz una descripción" : initialValue}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default TextEditor;
