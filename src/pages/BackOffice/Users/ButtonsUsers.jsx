import React from 'react'

// Motion
import { motion } from "framer-motion";

// Components
import AddUser from "../../../components/AddUser/AddUser";
import ForgotPassword from "../../../components/ForgotPassword/ForgotPassword";

import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";

// styles
import "./Users.css";

const ButtonsUsers = () => {

    //* Hook personalizado para redireccionar el usuario si la sesión expira
    useRedirectLoggedOutUser("/");
    return (
        <>
            <div className="users-title">
                <h1>MÓDULO DE USUARIOS</h1>
            </div>

            <div className="border-container" style={{marginBottom:"270px"}}>
                <nav>
                    <ul className="buttons-container">
                        <motion.li className="buttons-users">
                            <AddUser />
                        </motion.li>

                        <motion.li className="buttons-users">
                            <ForgotPassword />
                        </motion.li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default ButtonsUsers