import React from "react";
import "./css/seeForo.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { motion } from "framer-motion"; //Animation library
import { Link } from "react-router-dom";
import Eye from "./assets/eye.png";
import Coment from "./assets/coment.png";
import Edit from "./assets/edit.png";
import Trash from "./assets/trash.png";
import Report from "./assets/report.png";


const ButtonsForum = ({compColor}) => {
  return (
    <div className="button-container">
    <Col md={3}>
        <motion.button
          className="button_option"
          whileHover={{ scale: 1.04 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
        >
          <img src={Coment} alt="Respuestas" />
          <p className="text_option">Respuestas</p>
        </motion.button>
      </Col>
      <Col md={3}>
        <motion.button
          className="button_option"
          whileHover={{ scale: 1.04 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
        >
          <img src={Edit} alt="Editar" />
          <p className="text_option">Editar</p>
        </motion.button>
      </Col>
      <Col md={3}>
        <motion.button
          className="button_option"
          whileHover={{ scale: 1.04 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
        >
          <img src={Trash} alt="Eliminar" />
          <p className="text_option">Eliminar</p>
        </motion.button>
      </Col>
      <Col md={3}>
        <motion.button
          className="button_option"
          whileHover={{ scale: 1.04 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
        >
          <img src={Eye} alt="Ocultar" />
          <p className="text_option">Ocultar</p>
        </motion.button>
      </Col>
    </div>
  );
};

export default ButtonsForum;
