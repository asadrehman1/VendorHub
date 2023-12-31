import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from "../../../images/logoimg.jpg";

function Header() {
  const {isAuthenticated} = useSelector(state=>state.user);
  return (
    <Navbar expand="lg" className="bg-color">
    <Link to="/" className="navbar-brand" style={{ marginLeft: 'auto' }}>
       <img style={{ width: '12vh',marginLeft:"20%", borderRadius:"50%" }} src={logo} alt="logo-img"/>
    </Link>
    <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Link to="/" className="nav-link text-white">Home</Link>
          <Link to="/products" className="nav-link text-white">Products</Link>
          <Link to="/search" className="nav-link text-white">Search</Link>
          <Link to="/contact" className="nav-link text-white">Contact</Link>
          {!isAuthenticated && <Link to="/login" className="nav-link text-white">Login</Link>}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Header;