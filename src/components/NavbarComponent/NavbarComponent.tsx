import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NavbarComponent.css";

function NavbarComponent() {
  const [expanded, setExpanded] = useState<boolean>(false);

  const navigate = useNavigate();
  const navigateTo = (subPath: string) => {
    navigate(`/${subPath}`);
  };

  function handleOnClick(subPath: string) {
    setExpanded(false);
    navigateTo(subPath);
  }

  return (
    <>
      <Navbar
        fixed="top"
        expand="lg"
        className="navbarMain"
        expanded={expanded}
      >
        <Container>
          <Navbar.Brand className="brand" onClick={() => navigateTo("")}>
            🇦🇹 Amazing Race
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                className="link"
                onClick={() => handleOnClick("viewchallenges")}
              >
                Se challenges
              </Nav.Link>
              <Nav.Link className="link" onClick={() => handleOnClick("info")}>
                Regler
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
