import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { register, reset } from "../features/auth/authSlice";

import Loading from "../componentes/Loading";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Se ha registrado exitosamente");
      navigate("/");
    }

    if (user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !password2) {
      return toast.error("Porfavor llena los campos");
    }

    if (password !== password2) {
      return toast.error("Las contraseñas no coinciden");
    }

    const userData = {
      name,
      email,
      password,
    };

    dispatch(register(userData));
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="register-login">
        <h1>Signup</h1>
        <div className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={onChange}
                placeholder="nombre..."
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={onChange}
                placeholder="correo..."
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={onChange}
                placeholder="contraseña..."
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password2"
                id="password2"
                value={password2}
                onChange={onChange}
                placeholder="confirmar contraseña..."
              />
            </div>
            <div className="form-group">
              <button type="submit">Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
