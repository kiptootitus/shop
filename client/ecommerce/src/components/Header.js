import React from 'react'
import { Link}  from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'

function Header() {
    return(
        <>
        <Navbar className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <LinkContainer to="/">
                    <Nav.Link className="navbar-brand"> OneStep Away </Nav.Link>
                </LinkContainer>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto">

                     
                        <li className="nav-item">
                            <LinkContainer to="/login">
                                <Nav.Link className="nav-link">Login</Nav.Link>
                            </LinkContainer>
                        </li>
                        <li className="nav-item">
                            <LinkContainer to="/signup">
                                <Nav.Link className="nav-link">Signup</Nav.Link>
                            </LinkContainer>
                        </li>


                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-sm-2" type="search" placeholder="Search"/>
                        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </Navbar>

     </>

    )
}
export default Header;
