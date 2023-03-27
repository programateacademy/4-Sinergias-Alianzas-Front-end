import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComponents } from "../../../store/actions/componentSlice";

/* styles & images */
import "./css/ForoA.css";
import { motion } from "framer-motion";
import searchButton from "../../../components/ListCourses/Assets/searchButton.png";
import loaded from "../../../components/ListCourses/Assets/preload.png";
import { Link } from "react-router-dom";
import CardForo from "../../../components/CardForo/CardForo";
import componentimg from "../../../components/ListCourses/Assets/component.png"



const Home = ({ isAdminOrUser, setIsAdminOrUse}) => {
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


  const dispatch = useDispatch();

  const [showPreload, setShowPreload] = useState(true); // add state to control showing preload

  useEffect(() => {
    dispatch(getComponents());

    // change showPreload after 2 seconds
    const timer = setTimeout(() => {
      setShowPreload(false);
    }, 1000);

    // cleanup
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (loading || showPreload) {
    return (
      <div className="preload">
        <img src={loaded} alt="preload" />
      </div>
    );
  }

  return (
    <>
      <div className="containerTitle2">
        <h1>FOROS</h1>
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
          <Link className="link" to={"/home"}>
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
              <CardForo key={index} {...item} />
            ))}
        </div>
      </div>
    </>
  );
};
export default Home;