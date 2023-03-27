import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComponents } from "../../../store/actions/componentSlice";

/* styles & images */
import "../../../components/ListCourses/ListCourses.css";
import "./css/ForoUser.css";
import { motion } from "framer-motion";
import searchButton from "../../../components/ListCourses/Assets/searchButton.png";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import componentimg from "../../../components/ListCourses/Assets/component.png"
import CardForoUser from "../../../components/CardForoUser/CardForoUser"

import { Spinner } from "reactstrap";

// import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

const Home = ({ isAdminOrUser, setIsAdminOrUse }) => {
  if(isAdminOrUser === true){
    setIsAdminOrUse(!isAdminOrUser);
  }

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
          <Link className="link" to={"/"}>
            <motion.button
              className="box1"
              style={{width:"175px" }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img src={componentimg} alt=""/>
            
              <input
                type="text"
                style={{ cursor: "pointer"}}
                placeholder="Componente"
                disabled={true}
              />
            </motion.button>
          </Link>
        </div>
        

        <div className="listCards">
          {results &&
            results.map((item, index) => (
              <CardForoUser key={index} {...item} />
            ))}
        </div>


      </div>
    </>
  );
};
export default Home;
