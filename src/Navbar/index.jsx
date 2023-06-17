import { useState } from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Chat from '../Chat';
import Logout from '../Session/Logout';

const MainNav = ({ firstName, setFirstName }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const navLinks = !!firstName ? [
    <Nav.Link key="chat" onClick={() => setShowChat(true)}>Chat</Nav.Link>,
    <Nav.Link key="logout" onClick={() => setShowLogoutModal(true)}>Logout</Nav.Link>,
  ] : [
		<Nav.Link key="login" href="/login">Login</Nav.Link>
	];

  return (
    <>
        <Navbar bg="dark" variant="dark">
            <Container>
                {!!firstName && <Navbar.Brand href="/">{firstName}'s Albums</Navbar.Brand>}
                <Nav className="me-auto">
                 {navLinks}
                </Nav>
            </Container>
        </Navbar>
				<Chat showChat={showChat} setShowChat={setShowChat} />
        <Logout
            show={showLogoutModal}
            setShow={setShowLogoutModal}
            setFirstName={setFirstName}
        />
    </>
  );
}

export default MainNav;