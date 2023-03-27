import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./css/seeForo.css";

//Redux actions
import { getComponent } from "../../store/actions/componentSlice";


import ViewForo from "./ViewForoUser";
import { getQuestions } from "../../store/thunks/foroThunks";

const SeeComponent = ({ isAdminOrUser, setIsAdminOrUse }) => {
  if(isAdminOrUser === true){
    setIsAdminOrUse(!isAdminOrUser);
  }
  const { foro } = useSelector((state) => ({ ...state.foro }));
  const { loading } = useSelector((state) => ({ ...state.foro }));
  //Dispatch action
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(getComponent(id));
      dispatch(getQuestions(id));
    }
  }, [id]);

  useEffect(() => {
    dispatch(getQuestions(id));
  }, [loading]);

  const { componente } = useSelector((state) => ({ ...state.componente }));
  return (
    <div className="cards">
        <ViewForo foro={foro} {...componente}/>
    </div>
  );
};
export default SeeComponent;
