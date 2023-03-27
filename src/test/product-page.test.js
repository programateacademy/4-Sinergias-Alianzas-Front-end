import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
// import './intersectionObserverMock';


jest.mock('react-redux')
jest.mock('react-router-dom')

import Footer from "../components/Footer/Footer"

// // TESTEO PARA EL TEXTO FORMA 1
// test("Prueba unitaria de texto en RowTableUsers", () => {
// const component = render(<RowTableUsers/>);
// const input = component.getByText(/nombre usuario/i)
// component.debug();
// console.log(input)
// });

//TESTEO PARA EL TEXTO FORMA 2
test("Prueba unitaria RowTableUsers frente a texto", () => {
  render(<Footer/>);
  const rta = screen.getByText(/Todos los derechos reservados - Sinergias Alianzas Estratégicas para la Salud y el Desarrollo./i);
  expect(rta).toBeInTheDocument();
  screen.debug();
})

//TESTEO PARA EL COLOR 
// test("Prueba unitaria RowTableUsers frente a color de TD", () => {
//   render(<RowTableUsers/>);
//   const rta = screen.getByText(/nombre usuario/i);
//   expect(rta).toHaveStyle({color:"green"});
//   screen.debug();
// })