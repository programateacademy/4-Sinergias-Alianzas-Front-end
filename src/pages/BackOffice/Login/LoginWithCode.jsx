// dependencies
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

//* Redux
import {
  loginWithCode,
  RESET,
  sendLoginCode,
} from "../../../store/actions/auth/authSlice";

// styles
import {
  Button,
  Form,
  FormGroup,
  Input,
  Card,
  CardHeader,
  Container,
} from "reactstrap";

const LoginWithCode = () => {
  /* 
  - =================================
  -       COMPONENT STATES
  - =================================
  */

  //* form status
  const [loginCode, setLoginCode] = useState("");
  const { email } = useParams();

  //* Hooks Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, isSuccess } = useSelector((state) => state.auth);

  /* 
  - =================================
  -    COMPONENT FUNCTIONS
  - =================================
  */

  //* Function to capture the value of the input
  const onInputChange = (e) => {
    setLoginCode(e.target.value);
  };

  //* Función para reenviar el código de autenticación
  const sendUserLoginCode = async (e) => {
    await dispatch(sendLoginCode(email));
    await dispatch(RESET());

    return toast.success("Código reenviado");
  };

  //* Function to submit the form
  const loginUserWithCode = async (e) => {
    e.preventDefault();

    if (loginCode === "") {
      return toast.error("Por favor ingresa el código de acceso");
    }

    if (loginCode.length !== 6) {
      return toast.error("El código de acceso debe contener 6 caracteres");
    }

    const code = {
      loginCode,
    };

    await dispatch(loginWithCode({ code, email }));
    await dispatch(RESET());
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/home");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20%",
        }}
      >
        <Card style={{ width: "40%" }}>
          <CardHeader>Ingresar Código De Acceso</CardHeader>

          <Form
            className="mt-1"
            style={{ maxWidth: "100%", padding: "10px" }}
            onSubmit={loginUserWithCode}
          >
            <FormGroup>
              <Input
                name="accessCode"
                placeholder="Código"
                type="text"
                value={loginCode}
                onChange={onInputChange}
              />
            </FormGroup>

            <Button color="success" className="mt-1">
              Ingresar
            </Button>
            <Button
              onClick={sendUserLoginCode}
              color="secondary"
              className="mt-1"
            >
              Reenviar Código
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default LoginWithCode;
