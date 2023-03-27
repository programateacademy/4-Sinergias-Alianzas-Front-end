import React, { useState, useEffect } from "react";

import "./cardComponent.css";
import { motion } from "framer-motion"; //Animation library

import iconAbout from "../ListCourses/Assets/about.png";
import iconEdit from "../ListCourses/Assets/icono editar.png";
import iconDelete from "../ListCourses/Assets/icono borrar.png";

import { useNavigate, Link } from "react-router-dom";

//! REACTSTRAP IMPORTATION
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

import { useDispatch } from "react-redux";

import { deleteComponent } from "../../store/actions/componentSlice";

export default function CardComponent({
  compTitulo,
  compImgPpal,
  compColor,
  _id,
}) {
  //! MODAL
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  //!Function delete
  const dispatch = useDispatch();

  const deleteFunction = (e) => {
    dispatch(deleteComponent(_id));
    window.location.reload(true);
  };

  return (
    <>
      <div className="cardComponent">
        <h2 style={{ backgroundColor: `${compColor}` }}>{compTitulo}</h2>
        <img className="imageCard" src={compImgPpal} alt="" />
        <div className="buttons_cards">
          <Link to={`/seeComponent/${_id}`}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
            >
              <img src={iconAbout} alt="" />
            </motion.div>
          </Link>

          <Link to={`/updateComponent/${_id}`}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
            >
              <img src={iconEdit} alt="" />
            </motion.div>
          </Link>

          <motion.div
            style={{
              border: "none",
              margin: "0",
              padding: "0",
              backgroundColor: "transparent",
            }}
            className="box"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div>
              <Button style={{ padding: "0" }} color="none" onClick={toggle}>
                <img src={iconDelete} alt="" />
              </Button>
              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                  ¿Está seguro de eliminar este componente?
                </ModalHeader>

                <ModalFooter>
                  {/* button to delete */}

                  <Button
                    style={{ backgroundColor: "red", border: "none" }}
                    onClick={deleteFunction}
                  >
                    Borrar
                  </Button>
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
