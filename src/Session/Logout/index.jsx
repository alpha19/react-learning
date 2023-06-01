import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Logout = ({show, setShow, setFirstName}) => {
  const navigate = useNavigate();
  const handleClose = () => setShow(false);

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    handleClose();
    setFirstName(null);
    navigate("/");
  }

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to logout?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={logoutUser}>
            Logout
        </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default Logout;