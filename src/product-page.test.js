import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import Home from "./pages/Home/Home";

test("renders content", () => {
  const component = render(<Home />);
  console.log(component);
});
