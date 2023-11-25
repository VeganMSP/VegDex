"use client";
import {useState} from "react";
import {Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import "./NavMenu.css";

export const Header = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container
              light>
        <NavbarBrand to="/">VegDex</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2"/>
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink className="text-dark" href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-dark" href="/restaurants">Restaurants</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-dark" href="/shopping">Shopping</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-dark" href="/links">Groups & Links</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-dark" href="/blog">Blog</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-dark" href="/about">About</NavLink>
            </NavItem>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
};
