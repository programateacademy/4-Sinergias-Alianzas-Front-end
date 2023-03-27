// dependencies
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// Redux functions
import { validateEmail } from "../../../store/actions/auth/authService";
import { RESET, login } from "../../../store/actions/auth/authSlice";

// Components
import PasswordInput from "../../../components/Layout/PasswordInput/PasswordInput";
import Loader from "../../../components/Loader/Loader";

// styles
import { Form, FormGroup, Label, Input } from "reactstrap";
import Background from "./Assets/BackgroundLogin.png";
import LoginIlustration from "./Assets/LoginIlustration.png";
import "./login.css";
import { sendLoginCode } from "../../../store/actions/auth/authSlice";

// Initial state
const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  /* 
  - =================================
  -       COMPONENT STATES
  - =================================
  */

  //* form status
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  //* Hooks Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, isError, twoFact } = useSelector(
    (state) => state.auth
  );

  /* 
  - =================================
  -    COMPONENT FUNCTIONS
  - =================================
  */

  //* Function to capture the value of the input
  const onInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  //* Function to submit the form
  const loginUser = async (e) => {
    e.preventDefault();

    //* Input validation
    if (!email || !password) {
      return toast.error("Todos los campos son obligatorios");
    }

    if (!validateEmail(email)) {
      return toast.error("Ingresa un correo válido");
    }

    const userData = {
      email,
      password,
    };

    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/home");
    }

    if (isError && twoFact) {
      dispatch(sendLoginCode(email));

      navigate(`/loginWithCode/${email}`);
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate, isError, twoFact, email]);

  return (
    <div className="Generalcontainer" style={{ padding: "0", margin: "0" }}>
      {isLoading && <Loader />}
      <img src={Background} alt="" />

      <div className="containerLogin">
        <img src={LoginIlustration} alt="" />

        <Form className="rowLogin" onSubmit={loginUser}>
          <div className="colLogin">
            <h1>Iniciar Sesión</h1>
            <FormGroup>
              <Label className="user-label" for="email">
                Correo
              </Label>

              <Input
                className="input"
                id="email"
                name="email"
                placeholder="Correo"
                type="email"
                onChange={onInputChange}
                required
              />
            </FormGroup>
          </div>

          <div className="col-md-12">
            <FormGroup>
              <Label className="user-label" for="password">
                Contraseña
              </Label>

              <PasswordInput
                className="input"
                id="password"
                name="password"
                placeholder="Contraseña"
                onChange={onInputChange}
                type="password"
                required
              />
            </FormGroup>
          </div>

          <div className="col">
            <button type="submit" className="col_button">
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>Ingresar</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
