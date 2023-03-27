// dependencies
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// Redux
import { RESET, resetPassword } from "../../../store/actions/auth/authSlice";

// Components
import PasswordInput from "../../../components/Layout/PasswordInput/PasswordInput";
import Loader from "../../../components/Loader/Loader";

// icons
import { FaTimes, FaCheck } from "react-icons/fa";

// styles
import {
  Button,
  Form,
  FormGroup,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Container,
} from "reactstrap";

// Initial state
const initialState = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  //* Hooks Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, message } = useSelector((state) => state.auth);
  /* 
  - =================================
  -       COMPONENT STATES
  - =================================
  */

  //* form status
  const [formData, setFormData] = useState(initialState);

  const { password, confirmPassword } = formData;

  const { resetToken } = useParams();

  //* State to validate the password structure
  /*
    The password must have the following characteristics:
    Uppercase and lowercase letters
    Numbers
    Special character (!@#$...)
    Cannot be less than 8 characters
  */
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <FaCheck color="green" size={15} />;

  /* 
  - =================================
  -    COMPONENT FUNCTIONS
  - =================================
  */

  //* Function to change the icon in the password conditions
  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }

    return timesIcon;
  };

  //* Function to capture the value of the input
  const onInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  //* Render the component according to the password conditions
  useEffect(() => {
    //? Does it contain uppercase and lowercase letters?
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUpperCase(true);
    } else {
      setUpperCase(false);
    }

    //? Does it contain numbers?
    if (password.match(/([0-9])/)) {
      setNumbers(true);
    } else {
      setNumbers(false);
    }

    //? Does it contain special characters?
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,-])/)) {
      setSpecialCharacter(true);
    } else {
      setSpecialCharacter(false);
    }

    //? Does it contain at least 8 characters?
    if (password.length > 7) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);

  //* Function to submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    //* Input validation
    if (password.length < 8) {
      return toast.error("La contraseña debe ser de 8 caracteres.");
    }

    if (password !== confirmPassword) {
      return toast.error("La contraseña no coincide");
    }

    const userData = {
      password,
      confirmPassword,
    };

    await dispatch(resetPassword(userData.password, resetToken));
    await dispatch(RESET(userData));
    navigate("/");
  };

  useEffect(() => {
    if (isSuccess && message.includes("Contraseña reestablecida")) {
      navigate("/");
    }

    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);

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
        {isLoading && <Loader />}
        <Card style={{ width: "40%" }}>
          <CardHeader>Cambiar Contraseña</CardHeader>

          <Form
            className="mt-1"
            style={{ maxWidth: "100%", padding: "10px" }}
            onSubmit={handleSubmit}
          >
            <FormGroup>
              <PasswordInput
                name="password"
                placeholder="Nueva Contraseña"
                type="password"
                value={password}
                onChange={onInputChange}
              />
            </FormGroup>

            <FormGroup>
              <PasswordInput
                name="confirmPassword"
                placeholder="Confirmar Nueva Contraseña"
                type="password"
                value={confirmPassword}
                onChange={onInputChange}
              />
            </FormGroup>

            {/* password feature*/}
            <Card
              style={{
                width: "100%",
              }}
            >
              <CardHeader>La contraseña debe contener al menos:</CardHeader>
              <ListGroup flush>
                <ListGroupItem>
                  {switchIcon(upperCase)}
                  &nbsp; Una letra minúscula y mayúscula
                </ListGroupItem>

                <ListGroupItem>
                  {switchIcon(numbers)}
                  &nbsp; Un número (0-9)
                </ListGroupItem>

                <ListGroupItem>
                  {switchIcon(specialCharacter)}
                  &nbsp; Un caracter especial (!%&@#$^*?_-)
                </ListGroupItem>

                <ListGroupItem>
                  {switchIcon(passLength)}
                  &nbsp; Mínimo 8 caracteres
                </ListGroupItem>
              </ListGroup>
            </Card>

            <Button color="success" className="mt-1">
              Cambiar contraseña
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default ResetPassword;
