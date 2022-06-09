// Hook
import { useState, useContext } from "react";
// Bootstrap
import { Form, Button, Modal, Alert } from "react-bootstrap";
// Custom Css
import "../styles/components/auth.css";
// Import API
import { API, setAuthToken } from "../config/api";
// Context
import { UserContext } from "../context/userContext";

function Login(props) {
  // Login
  const [show, setShow] = useState(props.isOpen);
  const handleLoginClose = () => {
    setShow(false);
    props.isClose();
  };

  // Register
  const handleModalRegister = () => {
    setShow(false);
    props.isClose();
    props.isOpenRegister();
  };

  // Context
  const [state, dispatch] = useContext(UserContext);

  // message
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ketika tombol submit di tekan
  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      // Config
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Stringify
      const body = JSON.stringify(form);

      // link config
      const response = await API.post("/login", body, config);

      // jika success
      if (response.data.status == "success") {
        // ketika success
        const alert = (
          <Alert variant="success" className="py-2">
            Success
          </Alert>
        );
        setMessage(alert);

        setAuthToken(response.data.data.user.token);

        // kosongkan data
        setForm({
          email: "",
          password: "",
        });

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });

        // jika kesalahan inputan
      } else {
        const alert = (
          <Alert variant="danger" className="py-2">
            Failed
          </Alert>
        );
        setMessage(alert);
      }

      // server error
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-2">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <div>
      {/* Modal */}
      <Modal dialogClassName="info-modal" show={show} onHide={handleLoginClose}>
        <Modal.Body>
          <Modal.Title className="form-auth-h">Login</Modal.Title>
          {message && message}
          <Form onSubmit={handleOnSubmit}>
            <Form.Group>
              <Form.Control
                className="form-auth-input"
                type="email"
                name="email"
                onChange={handleOnChange}
                value={form.email}
                id="email"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="form-auth-input"
                type="password"
                name="password"
                onChange={handleOnChange}
                value={form.password}
                id="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button type="submit" className="form-auth-button">
              Login
            </Button>
          </Form>
          <span
            onClick={handleModalRegister}
            style={{ textDecoration: "none" }}
          >
            <p className="form-auth-p">Don't have an account? Click Here</p>
          </span>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Login;
