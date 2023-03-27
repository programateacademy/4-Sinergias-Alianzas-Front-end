import { React, useState, useEffect } from "react";
import "../../css/seeForo.css";
import { Button, Modal, Col } from "react-bootstrap";
import { motion } from "framer-motion"; //Animation library
import { deleteQuestion } from "../../../../store/thunks/foroThunks";
import { deleteAnswer } from "../../../../store/thunks/answerThunk";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Eye from "../../assets/eye.png";
const Response = ({ compColor, idQuestion, idAnswer, eliminarOcultar, setEliminarOcultar }) => {
  const [show, setShow] = useState(false);
  const [deleteData, setDeleteData] = useState(true)
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleDelete = (e) => {
    e.preventDefault();{
      if(idQuestion){
        const visibleQuestion = {
          _id: idQuestion
        }
        setDeleteData(!deleteData);
        dispatch(deleteQuestion({ visibleQuestion, toast }));
      } if (idAnswer) {
        const idDelete = {
          _id: idAnswer
        }
        setDeleteData(!deleteData);
        dispatch(deleteAnswer({ id, idDelete, toast }));
      }
    }
  };
  setEliminarOcultar(false)
  useEffect(() => {
  }, [deleteData]);


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
        {eliminarOcultar === false? 
          <p className="text_option">Eliminar</p>
          : <p className="text_option">Ocultar</p>
        }
        
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
