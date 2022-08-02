import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { createNote } from "../features/notes/notaSlice";

const NoteForm = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text.length > 0) {
      return toast.error("Porfavor escribe una nota en el campo");
    }

    dispatch(createNote({ text }));

    setText("");
  };

  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="escribe una tarea o nota..."
        />
        <button type="submit" className="btn-list">
          Añadir a la lista
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
