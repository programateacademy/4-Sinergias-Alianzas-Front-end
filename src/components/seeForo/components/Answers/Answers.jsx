import { React, useState, useEffect } from "react";
import "../../css/seeForo.css";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion"; //Animation library
import Delete from "../Delete/Delete"
import Edit from "../Edit/Edit"
import { updateLikeAnswer, updateReportAnswer } from "../../../../store/thunks/answerThunk";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Answers = ({
  _id,
  author,
  description,
  likes,
  reportNumber,
  compColor,
  report,
  visible,
  idQuestion
}) => {
  const { id } = useParams();
  const [like, setLike] = useState(likes);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const [reports, setReports] = useState(reportNumber);
  const [reported, setReported] = useState(false);
  
  const updateLike = () => {
    if (!liked) {
      setLiked(true);
      dispatch(updateLikeAnswer({id, like, _id, toast}));
    }
  };
  const updateReport = () => {
    if (!reported) {
      setReported(true);
      dispatch(updateReportAnswer({id, reports, _id, toast}));
    }
  };
  useEffect(() => {
    setLike(likes);
  }, [likes]);

  useEffect(() => {
    setReports(reportNumber);
  }, [reportNumber])
  return (
    <div>
      <Container
        className="border-foro"
        style={{ border: `2px solid ${compColor}` }}
      >
        <Row className="flex-row-reverse justify-content-between">
          <Col lg={3} md={3} sm={6} xs={6}>
            <motion.button
              className="button_option"
              whileHover={{ scale: 1.04 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
              onClick={updateLike}
            >
              <h3
                className="text_option"
                style={{ color: `${compColor}`, marginRight: "10px" }}
              >
                {like}
              </h3>
              <svg
                width="35"
                height="32"
                viewBox="0 0 35 32"
                fill={liked ? `${compColor}` : "white"}
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  d="M10.9082 24.4663L15.429 27.6663C16.0124 28.1996 17.3249 28.4663 18.1999 28.4663H23.7415C25.4915 28.4663 27.3874 27.2663 27.8249 25.6663L31.3249 15.933C32.054 14.0663 30.7415 12.4663 28.554 12.4663H22.7207C21.8457 12.4663 21.1165 11.7996 21.2624 10.8663L21.9915 6.59963C22.2832 5.39963 21.4082 4.0663 20.0957 3.6663C18.929 3.2663 17.4707 3.79963 16.8874 4.59963L10.9082 12.733"
                  stroke={liked ? "white" : `${compColor}`}
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />{" "}
                <path
                  d="M3.4707 24.4662V11.3995C3.4707 9.53288 4.3457 8.86621 6.38737 8.86621H7.8457C9.88737 8.86621 10.7624 9.53288 10.7624 11.3995V24.4662C10.7624 26.3329 9.88737 26.9995 7.8457 26.9995H6.38737C4.3457 26.9995 3.4707 26.3329 3.4707 24.4662Z"
                  stroke={liked ? "white" : `${compColor}`}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
              </svg>
              <p className="text_option">Me gusta</p>
            </motion.button>
          </Col>
          <Col lg={3} md={3} sm={6} xs={6}>
            <motion.button
              className="button_option"
              whileHover={{ scale: 1.04 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
              onClick={updateReport}
            >
              <h3
                className="text_option"
                style={{ color: "#B62C2C", marginRight: "10px" }}
              >
                {reports}
              </h3>

              <svg
                width="34"
                height="35"
                viewBox="0 0 34 35"
                fill={reported ? "#9B0000" :"white" }
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.9999 13.1245V20.4162M16.9999 31.2225H8.41486C3.49903 31.2225 1.44486 27.6058 3.82486 23.187L8.24486 14.9912L12.4099 7.29121C14.9315 2.60996 19.0682 2.60996 21.5899 7.29121L25.7549 15.0058L30.1749 23.2016C32.5549 27.6204 30.4865 31.237 25.5849 31.237H16.9999V31.2225Z"
                  stroke={reported ? "white" : "#9B0000"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.9932 24.792H17.0052"
                  stroke={reported ? "white" : "#9B0000"}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p className="text_option">Reporte</p>
            </motion.button>
          </Col>
        </Row>
        <Row className="d-flex justify-content-around align-items-center">
          <Col md={12}>
            <h3 className="question">{author}</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p>{description}</p>
          </Col>
        </Row>
        <Row className="d-flex justify-content-start">
        <Col md={2} sm={4} xs={6}>
           <Edit compColor={compColor} authorAnswer={author} descriptionAnswer={description} idAnswer={_id}/>
          </Col>
          <Col md={2} sm={4} xs={12}>
          <Delete compColor={compColor} idAnswer={_id}/>
          </Col>
        </Row>
      </Container>
      <br></br>
    </div>
  );
};
export default Answers;
