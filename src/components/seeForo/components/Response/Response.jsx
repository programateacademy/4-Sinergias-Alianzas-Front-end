import { React, useState, useEffect } from "react";
import "../../css/seeForo.css";
import { Button, Modal, Col } from "react-bootstrap";
import { motion } from "framer-motion"; //Animation library
import { useDispatch, useSelector } from "react-redux";
import response from "../../assets/response.png";
import { addAnswer} from "../../../../store/thunks/answerThunk"
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
const initialState = {
  author: "",
  description: "",
  _id: ""
};

const Response = ({ compColor, idQuestion }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const [newAnswer, setNewAnswer] = useState(initialState);
  const { id } = useParams()
  const {
    author,
    description
    } = newAnswer;
   //   Function for validation in the submission of the form
   const handleSubmit = (e) => {
    e.preventDefault();
    if (author && description) {
      const answerData = {
        ...newAnswer,
        _id: idQuestion
      };
  
      dispatch(addAnswer({ id, answerData, toast }));
      handleClear();
      handleClose();
    }
  };
  
  
  // Function to capture when the value of the input changes
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnswer({ ...newAnswer, [name]: value });
  };
  
  // Function to clear the form
  const handleClear = () => {
    setNewAnswer({
      author: "",
      description: ""
    });
  };

  useEffect(() => {
    
  }, [newAnswer])

  return (
    <>
      <motion.button
        className="button_option"
        whileHover={{ scale: 1.04 }}
        onHoverStart={(e) => {}}
        onHoverEnd={(e) => {}}
        onClick={handleShow}
      >
        <img src={response} alt="Responder" />
        <p className="text_option">Responder</p>
      </motion.button>
      <div className="model_box">
        <Modal
          show={show} 
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Agregar Comentario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Nombre"
                  name="author"
                  value={author}
                  onChange={onInputChange}
                  required
                  
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="addmovie_name"
                  aria-describedby="emailHelp"
                  placeholder="Pregunta Aqui..."
                  name="description"
                  value={description}
                  onChange={onInputChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-success mt-4"
                onClick={handleSubmit}
                style={{
                  background: `${compColor}`,
                  border: `2px solid ${compColor}`,
                }}
              >
                Agregar
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
