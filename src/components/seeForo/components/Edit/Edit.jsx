import { React, useState, useEffect } from "react";
import "../../css/seeForo.css";
import { Button, Modal } from "react-bootstrap";
import { motion } from "framer-motion"; //Animation library

import Edit from "../../assets/edit.png";
import { updateQuestion } from "../../../../store/thunks/foroThunks";
import { updateAnswer } from "../../../../store/thunks/answerThunk";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";


const Response = ({ compColor, authorQuestion, descriptionQuestion, id_typeQuestion, idQuestion, authorAnswer, descriptionAnswer, idAnswer}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [authorValue, setAuthorValue] = useState(authorQuestion);
  const [descriptionValue, setDescriptionValue] = useState(descriptionQuestion);
  const [authorAnswerValue, setAuthorAnswerValue] = useState(authorAnswer);
  const [descriptionAnswerValue, setDescriptionAnswerValue] = useState(descriptionAnswer);
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleAuthorChange = (e) => {
    if(authorQuestion){
      setAuthorValue(e.target.value);
    }if(authorAnswer) {
      setAuthorAnswerValue(e.target.value);
    }
  };
  const handleDescriptionChange = (e) => {
    if(authorQuestion){
      setDescriptionValue(e.target.value);
    }if(authorAnswer) {
      setDescriptionAnswerValue(e.target.value);
    }
    
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(authorQuestion) {
      const updateQuestionData = {
        author: authorValue,
        question: descriptionValue,
        id_type: id_typeQuestion,
        _id: idQuestion
      };
      dispatch(updateQuestion({ updateQuestionData, toast }));
      handleClose()
    } if(authorAnswer){
      const updateAnswersData = {
        author: authorAnswerValue,
        description: descriptionAnswerValue,
        _id: idAnswer
      };
      dispatch(updateAnswer({ id,updateAnswersData, toast }));
      handleClose()
    }
  };
  useEffect(() => {
    setAuthorValue(authorQuestion)
    setDescriptionValue(descriptionQuestion)
  }, [authorQuestion, descriptionQuestion]);

  useEffect(() => {
    setAuthorAnswerValue(authorAnswer)
    setDescriptionAnswerValue(descriptionAnswer)
  }, [authorAnswer, descriptionAnswer]);


  return (
    <>
      <motion.button
        className="button_option"
        whileHover={{ scale: 1.04 }}
        onHoverStart={(e) => {}}
        onHoverEnd={(e) => {}}
        onChange
        onClick={handleShow}
      >
        <img src={Edit} alt="Editar" />
        <p className="text_option">Editar</p>
      </motion.button>
      <div className="model_box">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar Comentario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group mt-3">
                <input
                  value={descriptionQuestion? authorValue : authorAnswerValue}
                  onChange={handleAuthorChange}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Nombre"
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  value={descriptionValue? descriptionValue : descriptionAnswerValue}
                  onChange={handleDescriptionChange}
                  type="text"
                  className="form-control"
                  id="addmovie_name"
                  aria-describedby="emailHelp"
                  placeholder="Pregunta Aqui..."
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
                Editar
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
