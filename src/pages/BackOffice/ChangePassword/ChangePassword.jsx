//* Dependencias
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//* Redux
import {
  changePassword,
  logout,
  RESET,
} from "../../../store/actions/auth/authSlice";

//* Componentes
import PasswordInput from "../../../components/Layout/PasswordInput/PasswordInput";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";

//* Iconos
import { FaTimes, FaCheck } from "react-icons/fa";

//* Estilos
import {
  Card,
  Form,
  FormGroup,
  Button,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Container,
} from "reactstrap";
import { sendAutomatedEmail } from "../../../store/actions/mail/emailSlice";

const passwordState = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  //* Hook personalizado para redireccionar el usuario si la sesión expira
  useRedirectLoggedOutUser("/");

  //* Hooks Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  /* 
  - =================================
  -       ESTADOS DEL COMPONENTE
  - =================================
  */
  //* Estado de la ventana modal
  const [modal, setModal] = useState(false);

  //* Estado del formulario para cambiar la contraseña
  const [formData, setFormData] = useState(passwordState);

  const { oldPassword, password, confirmPassword } = formData;

  //* Estado para validar la estructura de la contraseña
  /*
   La contraseña debe tener las siguientes características:
   Letras mayusculas y minusculas
   Números
   Caracter especial (!@#$...)
   No puede tener menos de 8 caracteres
  */
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <FaCheck color="green" size={15} />;

  /* 
  - =================================
  -    FUNCIONES DEL COMPONENTE
  - =================================
  */
  //* Función para mostrar u ocultar el modal
  const toggleModal = () => {
    setModal(!modal);
  };

  //* Función para cambiar el icono en las condiciones de la contraseña
  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }

    return timesIcon;
  };

  //* Función para capturar el valor del input
  const onInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  //* Función para enviar el formulario
  const updatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !confirmPassword) {
      return toast.error("Todos los campos son obligatorios");
    }

    if (password !== confirmPassword) {
      return toast.error("La contraseña no coincide");
    }

    const userData = {
      oldPassword,
      password,
    };

    const emailData = {
      subject: "Cambio de Contraseña - Fundación Sinergias",
      send_to: user.email,
      reply_to: "noreply@fundacionsinergias.com",
      template: "changePassword",
    };

    await dispatch(changePassword(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(logout());
    await dispatch(RESET(userData));

    toggleModal();
    navigate("/");
  };

  //* Renderizar el componente de acuerdo a las condiciones de la contraseña
  useEffect(() => {
    //? ¿Contiene letras mayúsculas y minúsculas?
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUpperCase(true);
    } else {
      setUpperCase(false);
    }

    //? ¿Contiene números?
    if (password.match(/([0-9])/)) {
      setNumbers(true);
    } else {
      setNumbers(false);
    }

    //? ¿Contiene caracteres especiales?
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,-])/)) {
      setSpecialCharacter(true);
    } else {
      setSpecialCharacter(false);
    }

    //? ¿Contiene mínimo 8 caracteres?
    if (password.length > 7) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);
  return (
    <>
      <Container>
        <h3>Cambiar Contraseña</h3>
        <Form onSubmit={updatePassword}>
          <FormGroup>
            <PasswordInput
              name="oldPassword"
              placeholder="Contraseña actual"
              type="password"
              value={oldPassword}
              onChange={onInputChange}
            />
          </FormGroup>

          <FormGroup>
            <PasswordInput
              name="password"
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={onInputChange}
            />
          </FormGroup>

          <FormGroup>
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirmar Contraseña"
              type="password"
              value={confirmPassword}
              onChange={onInputChange}
            />
          </FormGroup>

          {/* Característica de la contraseña */}
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
          <Button>Actualizar</Button>
        </Form>
      </Container>
    </>
  );
};

export default ChangePassword;
