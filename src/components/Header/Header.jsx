// dependencies
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";

// Redux functions
import { RESET, logout } from "../../store/actions/auth/authSlice";

// Motion
import { motion } from "framer-motion";

// Components
import { UserName } from "../../pages/BackOffice/Profile/Profile";

// Icons
import { FaUsersCog, FaUserAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

// styles
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import Logosinergias from "./Assets/Logosinergias.png";
import "./Header.css";
import "./HeaderUser.css";

const Header = ({ isAdminOrUser, setIsAdminOrUse }) => {
  /* 
  - =================================
  -    COMPONENT FUNCTIONS
  - =================================
  */
  //* Hooks Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //* Function to return to the dashboard from the logo

  //* Function to log out
  const logoutUser = async () => {
    dispatch(RESET());

    await dispatch(logout());

    navigate("/");
  };
  // funcionalidad de headerUsuario

  const [showMenu, setShowMenu] = useState(false);
  const handleMenuClick = () => setShowMenu(true);
  return isAdminOrUser === false ? (
    <>
      <nav className="navigation-bar">
        <div className="logo">
          <Link to={"/"}>
            <img src={Logosinergias} alt="Logo" />
          </Link>
        </div>
        <div className="menu">
          <Link to={"/"} className="menu-button">
            Caja de herramientas
          </Link>
          <Link to={"/foroUser"} className="menu-button">
            Foro
          </Link>
          <Link to={"/login"} className="menu-button">
            Iniciar sesión
          </Link>
        </div>
        <Dropdown className="menu-button-responsive">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Menu
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Link to={"/"} >
              <Dropdown.Item href="#/action-1">Caja de herramientas</Dropdown.Item>
            </Link>
            < Link to={"/foroUser"} >
              <Dropdown.Item href="#/action-2">Foro</Dropdown.Item>
            </ Link >
            <Link to={"/login"} >
              <Dropdown.Item href="#/action-3">Iniciar sesión</Dropdown.Item>
            </Link >
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </>
  ) : (
    <>
      <header className="header_container">
        {/* Logo */}
        <img src={Logosinergias} alt="Logo Sinergias" className="header_logo" />

        {/* Navigation */}
        <nav>
          <ul className="container_btn_header">
            <motion.li
              className="buttons_header"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link to={"/users"} className="buttons_header-users">
                <div className="icon_container">
                  <FaUsersCog className="header_icon" />
                </div>

                <span>Usuarios</span>
              </Link>
            </motion.li>

            <motion.li
              className="buttons_header"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <button onClick={logoutUser} className="buttons_header-logout">
                <div className="icon_container">
                  <MdLogout className="header_icon" />
                </div>

                <span>Salir</span>
              </button>
            </motion.li>
          </ul>
        </nav>
      </header>

      {/* Navigation to go to user profile */}
      <Container>
        <Breadcrumb listTag="div">
          <UserName />

          <BreadcrumbItem tag="span" className="breadcrumb-profile">
            <FaUserAlt className="breadcrumb-icon" />
            <Link to={"/profile"} className="breadcrumb-link">
              Perfil
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Container>
    </>
  );
};

export default Header;
