import { React, useState, useEffect } from "react";
import "../../css/seeForo.css";
import { Button, Modal, Col } from "react-bootstrap";
import { motion } from "framer-motion"; //Animation library
import { deleteAnswer } from "../../../../store/thunks/answerThunk";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Eye from "../../assets/eye.png";
const Response = ({ compColor, id }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();{
      const visibleQuestion = {
        _id: id
      }
      console.log(visibleQuestion);
      dispatch(deleteAnswer({ visibleQuestion, toast }));
    }
  };
  return (
    <>
      <motion.button
        className="button_option"
        whileHover={{ scale: 1.04 }}
        onHoverStart={(e) => {}}
        onHoverEnd={(e) => {}}
        onClick={handleShow}
      >
        <img src={Eye} alt="Eliminar" />
        <p className="text_option">Ocultar</p>
      </motion.button>
      <div className="model_box">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Ocultar Comentario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <h6>¿Estas seguro de esta acción?</h6>
              <button
                type="submit"
                className="btn btn-success mt-4"
                onClick={handleDelete}
                style={{
                  background: `${compColor}`,
                  border: `2px solid ${compColor}`,
                }}
              >
                Ocultar
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Response;
