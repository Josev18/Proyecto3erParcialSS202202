import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getTarea, reset } from "../features/notes/notaSlice";

import NoteForm from "../componentes/NoteForm";
import ListarItem from "../componentes/ListarItem";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { notes, isError, isLoading, message } = useSelector(
    (state) => state.notes
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getTarea());

    return () => {
      dispatch(reset());
    };
  }, [user, isError, navigate, dispatch, message]);

  return (
    <div className="dashboard">
      <h1> Bienvenido {user && user.name}</h1>
      <NoteForm />
      {notes.length > 0 ? (
        <div className="list">
          {notes.map((note) => {
            return <ListarItem key={note._id} note={note} />;
          })}
        </div>
      ) : (
        <div className="no-note">
          <h2>Todavia no hay notas o tareas añadidas</h2>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
