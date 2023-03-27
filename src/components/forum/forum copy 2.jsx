import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getComponents } from "../../store/actions/componentSlice";

/* styles & images */
import "../../components/ListCourses/ListCourses.css";
import { motion } from "framer-motion";
import searchButton from "../../components/ListCourses/Assets/searchButton.png";
import uploadButton from "../../components/ListCourses/Assets/uploadButton.png";

import { useNavigate } from "react-router-dom";

import Forum from "../../components/forum/forum";

import { Spinner } from "reactstrap";

import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

const Home = () => {
  //* Custom Hook to redirect user if session expires
  useRedirectLoggedOutUser("/");

  //Filter
  const [search, setSearch] = useState(""); //constant for filter

  const { loading } = useSelector((state) => ({
    loading: state.componente.loading,
  }));

  /*-----------FILTER AND SEARCH----------- */
  const searcher = (e) => {
    setSearch(e.target.value);
  };

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
        <h1>FORO</h1>
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
        </div>

        <div className="forum">
          {!search && (
            <div>
              <h1>Mi Página</h1>
              <Forum /> {/* Render the Forum component inside JSX tags */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
