import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
function UserProfile({user,Logout}) {
  return (
    <Navbar variant="dark" bg="gry" expand="lg">
      <Container fluid>
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
          <img
          src={`https://www.gravatar.com/avatar/}`}
          alt="profile" style={{width: "62px",height: "60px",borderRadius: "50%"}}/>
            <NavDropdown
              id="user_name"
              title={user.name}
              menuVariant="white"
              style={{color: "#020202"}}
            >
              <NavDropdown.Item><Link style={{textDecoration:"none",color:"black"}} to="/profile">My Profile</Link></NavDropdown.Item>
              {window.location.host.split(".")[0] !== "admin" &&
              <NavDropdown.Item> 
                <Link style={{textDecoration:"none",color:"black"}} to="/address">My Address</Link>
                </NavDropdown.Item>
            }
              <NavDropdown.Divider />
              <NavDropdown.Item><Link style={{textDecoration:"none",color:"black"}} to="#" onClick={Logout}>Logout</Link></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserProfile;