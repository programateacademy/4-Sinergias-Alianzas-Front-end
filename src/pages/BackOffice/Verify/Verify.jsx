// Dependencias
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// styles
import { Button } from "reactstrap";
import { RESET, verifyUser } from "../../../store/actions/auth/authSlice";

// Component
import Loader from "../../../components/Loader/Loader";



const Verify = () => {
  const dispatch = useDispatch();
  const { verificationToken } = useParams();

  const { isLoading } = useSelector((state) => state.auth);

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
  };

  return (
    <section>
      {isLoading && <Loader />}
      <div>
        <h2>Verificación de la Cuenta</h2>

        <p>Para verificar la cuenta, has clic en el siguiente botón</p>

        <Button color="success" className="mt-1" onClick={verifyAccount}>
          Verificar cuenta
        </Button>
      </div>
    </section>
  );
};

export default Verify;