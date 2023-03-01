// dependencies
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux functions
import { getUser, selectUser } from "../../store/actions/auth/authSlice";

// Components
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import Loader from "../../components/Loader/Loader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import Notification from "../../components/Notification/Notification";

//styles
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  BreadcrumbItem,
} from "reactstrap";

// Function to cut the user's name
const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
};

const Profile = () => {
  //* Custom Hook to redirect user if session expires
  useRedirectLoggedOutUser("/");

  //* Hooks Redux
  const dispatch = useDispatch();

  //* redux function status
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  //* Initial state
  const initialState = {
    name: `${user?.name.firstName} ${user?.name.lastName}` || "",
    email: user?.email,
    rol: user?.rol,
    isVerified: user?.isVerify,
  };

  /* 
  - =================================
  -       COMPONENT STATES
  - =================================
  */
  //* profile status
  const [profile, setProfile] = useState(initialState);
  // console.log(initialState)

  /* 
  - =================================
  -    COMPONENT FUNCTIONS
  - =================================
  */

  //* Function to capture the value of the input
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  //* Render user information
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <div className="containerTitle">
        <h1>DETALLE DE USUARIO</h1>
      </div>
      <div className="containerDashboard">
        <Notification />
        {isLoading && <Loader />}
        <Card
          style={{
            width: "18rem",
            margin: "auto",
          }}
        >
          <CardBody>
            <Form>
              <FormGroup>
                <p style={{ color: "#126a2e", fontWeight: "700" }}>Rol</p>
                <Input
                  id="rol"
                  name="rol"
                  type="text"
                  defaultValue={""}
                  value={initialState?.rol}
                  onChange={onInputChange}
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <p style={{ color: "#126a2e", fontWeight: "700" }}>Nombre</p>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={initialState?.name}
                  onChange={onInputChange}
                  disabled
                />
              </FormGroup>

              <FormGroup>
                <p style={{ color: "#126a2e", fontWeight: "700" }}> Correo</p>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={initialState?.email}
                  onChange={onInputChange}
                  disabled
                />
              </FormGroup>
            </Form>

            <ChangePassword />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

//* Export component for username
export const UserName = () => {
  const user = useSelector(selectUser);

  const userName = {
    name: `${user?.name.firstName} ${user?.name.lastName}` || "",
  };

  return (
    <BreadcrumbItem active tag="span">
      Hola, {shortenText(userName.name, 15)}
    </BreadcrumbItem>
  );
};

export default Profile;
