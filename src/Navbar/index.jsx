import { useState } from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Logout from '../Session/Logout';

const MainNav = ({firstName, setFirstName}) => {
  console.log(firstName)
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
        <Navbar bg="dark" variant="dark">
            <Container>
                {!!firstName && <Navbar.Brand href="/">{firstName}'s Albums</Navbar.Brand>}
                <Nav className="me-auto">
                {!!firstName ? 
                    <Nav.Link onClick={() => setShowLogoutModal(true)}>Logout</Nav.Link> :
                    <Nav.Link href="/login">Login</Nav.Link>
                }
                </Nav>
            </Container>
        </Navbar>

        <Logout
            show={showLogoutModal}
            setShow={setShowLogoutModal}
            setFirstName={setFirstName}
        />
    </>
  );
}

export default MainNav;