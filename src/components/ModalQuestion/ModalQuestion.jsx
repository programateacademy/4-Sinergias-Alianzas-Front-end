import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

const ModalQuestion = ({compColor, set}) => {
const [show, setShow] = useState(setShow);
const handleClose = () => setShow(false);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar Pregunta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group mt-3">
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Autor"
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
                placeholder="Comentario de usuario"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success mt-4"
              style={{
                background: `${compColor}`,
                border: `2px solid ${compColor}`,
              }}
            >
              Modificar
            </button>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalQuestion;
