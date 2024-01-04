
import React, { useEffect } from 'react'
import { Navbar, Nav, Container, DropdownButton, Dropdown } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'

const Header = () => {
    const auth=localStorage.getItem('uer-info');
    
    const navigate=useNavigate();
    const user=JSON.parse(localStorage.getItem('user-info'));
  
    function logout() {
        localStorage.clear('user-info');
        navigate('/register');

    }

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto nav_ele_wrapper">
                        {
                            localStorage.getItem('user-info')  ? <>
                            <Link to="/productlist">Product List</Link>
                                <Link to="/add">Add product</Link>
                                <Link to="/update">Update product</Link>

                            </> : <>
                                <Link to="/login"> Login</Link>
                                <Link to="/register">Register</Link>

                            </>
                        }
                    </Nav>
                    {
                        localStorage.getItem('user-info') ? <Nav>
                            <DropdownButton id="dropdown-basic-button" title={user.name}>
                                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                                <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>

                            </DropdownButton>
                        </Nav>: " "
                    }

                </Container>
            </Navbar>
        </>
    )
}

export default Header