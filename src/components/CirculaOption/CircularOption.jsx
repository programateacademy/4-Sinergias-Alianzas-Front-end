import { Form } from 'react-bootstrap';
import "./css/CircularOption.css"
function CircularOptions() {
  const options = ['Reportes', 'Visibles', 'Ocultos'];

  return (
    <Form.Group className="circular-options">
      {options.map((option, index) => (
        <Form.Check
          key={index}
          type="checkbox"
          label={option}
        />
      ))}
    </Form.Group>
  );
}
export default CircularOptions;
