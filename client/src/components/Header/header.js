import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

const Header = (props) =>{
    


    return (
        <div>
              <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">MINI PROJEKAT</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link><Link to="/" style={{textDecoration: 'none', color: 'white'}}>HOME</Link></Nav.Link>
                        <Nav.Link><Link to="/signin" style={{textDecoration: 'none', color: 'white'}}>SIGNIN</Link></Nav.Link>
                        <Nav.Link><Link to="/register" style={{textDecoration: 'none', color: 'white'}}>REGISTER</Link></Nav.Link>
                        <Nav.Link><Link to="/logout" style={{textDecoration: 'none', color: 'white'}}>LOGOUT</Link></Nav.Link>
                    </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        </div>
    )
}
export default Header;