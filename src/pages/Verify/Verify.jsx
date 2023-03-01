// dependencies
import React from "react";

// styles
import { Button } from "reactstrap";

const Verify = () => {
  return (
    <section>
      <div>
        <h2>Verificación de la Cuenta</h2>

        <p>Para verificar la cuenta, has clic en el siguiente botón</p>

        <Button color="success" className="mt-1">
          Verificar cuenta
        </Button>
      </div>
    </section>
  );
};

export default Verify;
