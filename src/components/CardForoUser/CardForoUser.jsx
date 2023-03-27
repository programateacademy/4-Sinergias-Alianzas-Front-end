import React, { useState, useEffect } from "react";

import "./css/CardForoUser.css";
import { motion } from "framer-motion"; //Animation library
import { Link } from "react-router-dom";

//! REACTSTRAP IMPORTATION

export default function CardComponent({
  compTitulo,
  compImgPpal,
  compColor,
  _id,
}) {
  return (
      <Link className="link" to={`/seeforoUser/${_id}`}>
        <motion.div whileHover={{ scale: 1.02 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}>
          <div className="cardComponent" >
              <h2 style={{ backgroundColor: `${compColor}` }}>{compTitulo}</h2>
              <img className="imageCard" src={compImgPpal} alt="" />
          </div>
        </motion.div>
      </Link>
  );
}