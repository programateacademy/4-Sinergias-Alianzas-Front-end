import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComponents } from "../../../store/actions/componentSlice";

/* styles & images */
import "./Home.css";
import { motion } from "framer-motion";
import searchButton from "../../../components/ListCourses/Assets/searchButton.png"
import uploadButton from "../../../components/ListCourses/Assets/uploadButton.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import forumimg from "../../../components/ListCourses/Assets/forum.png";
import CardComponent from "../../../components/CardComponent/CardComponent";

import { Spinner } from "reactstrap";

import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";

const Home = () => {
  //* Custom Hook to redirect user if session expires
  useRedirectLoggedOutUser("/homeUser");

  //Filter
  const [search, setSearch] = useState(""); //constant for filter

  const { componentes, loading } = useSelector((state) => ({
    ...state.componente,
  }));
  /*-----------FILTER AND SEARCH----------- */
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  //filter method by name
  const results = !search
    ? componentes
    : componentes.filter((dato) =>
        dato.compTitulo.toLowerCase().includes(search.toLocaleLowerCase())
      );

  const navigate = useNavigate(); //* React router dom use

  function addComp() {
    navigate("/addComponent");
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComponents());
  }, [dispatch]);

  if (loading) {
    return <Spinner>Cargando</Spinner>;
  }
  return (
    <>
      <div className="containerTitle">
        <h1>DASHBOARD COMPONENTES</h1>
      </div>

      <div className="containerDashboard">
        <div className="container_buttons">
          <motion.button
            className="box"
            onClick={addComp}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <img src={uploadButton} alt="" /> Añadir Componente
          </motion.button>
          <motion.button
            className="box1"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <img src={searchButton} alt="" />

            <input
              type="text"
              placeholder=" Buscar"
              value={search}
              onChange={searcher}
            />
          </motion.button>
            <Link className="link" to={"/foroAdmin"}>
            <motion.button
              className="box1"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img src={forumimg} alt="" />
              <input
                type="text"
                style={{ cursor: "pointer" }}
                placeholder="Foro"
                disabled={true}
              />
            </motion.button>
            </Link>

        </div>

        <div className="listCards">
          {results &&
            results.map((item, index) => (
              <CardComponent key={index} {...item} />
            ))}
        </div>
      </div>
    </>
  );
};
export default Home;
