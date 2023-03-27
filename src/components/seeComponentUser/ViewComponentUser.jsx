import React from "react";
import "./seeComponentUser.css";

import Metodologia from "../../components/AddComponent/assest/Metodología.png";
import Formato from "../../components/AddComponent/assest/Formatos.png";
import Diagnostico from "../../components/AddComponent/assest/Diagnosticos.png";
import Herramientas from "../../components/AddComponent/assest/Herramientas.png";
import Material from "../../components/AddComponent/assest/Material.png";

const ViewComponent = ({
  compTitulo,
  compColor,
  compImgPpal,
  compDefinicion,
  compVideo,
  compDescripcion,
  compImg1,
  compImg2,
  compImg3,
  compObjetivo1,
  compObjetivo2,
  compObjetivo3,
  compLineaTrabajo1,
  compLineaTrabajo2,
  recursosMetodologia,
  recursosFormatos,
  recursosDiagnosticos,
  recursosHerramientas,
  recursosMaterial,
}) => {
  return (
    <>
      <div className="containerIcon">
        <img alt="Sample" src={compImgPpal} />
      </div>

      <div
        className="containerSeeComponent"
        style={{ border: `5px solid ${compColor}` }}
      >
        <h1 style={{ color: `${compColor}` }}>{compTitulo}</h1>
        <h3>Definición</h3>
        <p>{compDefinicion}</p>

        <iframe
          className="video"
          src={compVideo}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

        <h3>Descripción del componente</h3>
        <p>{compDescripcion}</p>

        <div className="containerImages">
          <img width="100%" alt="Sample" src={compImg1} />
          <img width="100%" alt="Sample" src={compImg2} />
          <img width="100%" alt="Sample" src={compImg3} />
        </div>

        <h3>Objetivos</h3>
        <div className="containerObjetives">
          <div
            className="objetive"
            style={{ border: `2px dashed ${compColor}` }}
          >
            <p>{compObjetivo1}</p>
          </div>

          <div
            className="objetive"
            style={{ border: `2px dashed ${compColor}` }}
          >
            <p>{compObjetivo2}</p>
          </div>

          <div
            className="objetive"
            style={{ border: `2px dashed ${compColor}` }}
          >
            <p>{compObjetivo3}</p>
          </div>
        </div>

        <h3>Líneas de trabajo </h3>
        <div className="containerLinesWork">
          <div className="lineWork" style={{ backgroundColor: `${compColor}` }}>
            <h3>{compLineaTrabajo1}</h3>
          </div>
          <div className="lineWork" style={{ backgroundColor: `${compColor}` }}>
            <h3>{compLineaTrabajo2}</h3>
          </div>
        </div>

        <h3>Recursos</h3>

        <div className="containerResources">
          <a target="_blank" href={recursosMetodologia}>
            <img alt="Sample" src={Metodologia} />
          </a>
          <a target="_blank" href={recursosFormatos}>
            <img alt="Sample" src={Formato} />
          </a>
          <a target="_blank" href={recursosDiagnosticos}>
            <img alt="Sample" src={Diagnostico} />
          </a>
          <a target="_blank" href={recursosHerramientas}>
            <img alt="Sample" src={Herramientas} />
          </a>
          <a target="_blank" href={recursosMaterial}>
            <img alt="Sample" src={Material} />
          </a>
        </div>
      </div>
    </>
  );
};

export default ViewComponent;
