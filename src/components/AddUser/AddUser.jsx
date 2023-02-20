// Dependencias
import React, { useState, useEffect } from "react";

// Componentes
import PasswordInput from "../Layout/PasswordInput/PasswordInput";

// Iconos
import { RiUserAddFill } from "react-icons/ri";
import { FaTimes, FaCheck } from "react-icons/fa";

// Estilos
import "./AddUser.css";

//Elementos de reacstrap 
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

// Estado inicial del formulario
const initialState = {
  lastName: "",
  firstName: "",
  secondName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const AddUser = () => {
  /* 
  - =================================
  -       ESTADOS DEL COMPONENTE
  - =================================
  */

  //* Estado de la ventana modal
  const [modal, setModal] = useState(false);

  //* Estado del formulario
  const [formData, setFormData] = useState(initialState);

  const { lastName, firstName, secondName, email, password, confirmPassword } =
    formData;

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

  //* Función para enviar el formulario
  const handleSubmit = () => {};

  return (
    <>
      <div className="adduser-button">
        <div className="icon_container">
          <RiUserAddFill />
        </div>
        <Button className="newUser" onClick={toggleModal}>Nuevo Usuario</Button>
      </div>

      {/* Ventana Modal */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader>Registro de Usuario</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                name="lastName"
                placeholder="Apellidos"
                type="text"
                value={lastName}
                onChange={onInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Input
                name="firstName"
                placeholder="Primer nombre"
                type="text"
                value={firstName}
                onChange={onInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Input
                name="secondName"
                placeholder="Segundo nombre"
                type="text"
                value={secondName}
                onChange={onInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Input
                name="email"
                placeholder="Correo electrónico"
                type="email"
                value={email}
                onChange={onInputChange}
                required
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

            <Button color="success" className="mt-3">
              Registrar
            </Button>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddUser;
