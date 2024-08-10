import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from '@nextui-org/react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AcmeLogo } from './AcmeLogo.jsx';
import { useAuth } from '../context/AuthContext.js';
import { useState } from 'react';


export function Navbarhome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const nav = useNavigate();
  const handleItemClick = () => {
    setIsMenuOpen(false); // Close the menu
    // navigate(path); // Navigate to the clicked item's path
  };

  function goToHome(){
    nav("/");
  }
 
  
  const menuItems = [
    { name: 'Tournament', path: '/Tournament' },
    { name: 'Players', path: '/players' },
    { name: 'Request' , path: '/request'},
    { name: 'Friends', path: '/friends' },
    { name: 'Create Tournament' , path:'/createpost'},
    { name: 'Profile', path: '/profile' },
    { name: 'My Matches', path :'/mymatches'}
    // { name: 'Help & Feedback', path: '/help-feedback' },
    // { name: 'Login', path: '/logout' },
  ];
  console.log(isAuthenticated);

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} >
    <NavbarContent className="sm:hidden" >
      <NavbarMenuToggle />
    </NavbarContent>

    <NavbarContent className="sm:hidden pr-3" justify="center">
      <NavbarBrand>
     
            <AcmeLogo />
            <p className="font-bold text-inherit" onClick={goToHome}>NOBO AND AYU</p>
        
      </NavbarBrand>
    </NavbarContent>

    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit cursor-pointer"  onClick={goToHome}>NOBO AND AYU</p>
      </NavbarBrand>
      <NavbarItem>
        <Link to="/tournament" style={{ color: 'inherit', textDecoration: 'none' }}>
          Tournament
        </Link>
      </NavbarItem>
      <NavbarItem >
        <Link to="/players" style={{ color: 'inherit', textDecoration: 'none' }} aria-current="page">
          Players
        </Link>
      </NavbarItem>
      {/* <NavbarItem>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          Integrations
        </Link>
      </NavbarItem> */}

      <NavbarItem>
        <Link to="/request" style={{ color: 'inherit', textDecoration: 'none' }}>
          Request
        </Link>
      </NavbarItem>

      <NavbarItem>
        <Link to="/friends" style={{ color: 'inherit', textDecoration: 'none' }}>
          Friends
        </Link>
      </NavbarItem>

      <NavbarItem>
        <Link to="/createpost" style={{ color: 'inherit', textDecoration: 'none' }}>
          Create Tournament
        </Link>
      </NavbarItem>

      <NavbarItem>
        <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
          Profile
        </Link>
      </NavbarItem>

      <NavbarItem>
        <Link to="/mymatches" style={{ color: 'inherit', textDecoration: 'none' }}>
          My Matches
        </Link>
      </NavbarItem>
    </NavbarContent>

    <NavbarContent justify="end">
        {isAuthenticated ? (
          <>
            <NavbarItem className="lg:flex">
              <Button onClick={ ()=>logout(0)} color="error" variant="flat">
                Log Out
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} to="/signup" color="warning" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

    <NavbarMenu >
      {menuItems.map((item, index) => (

        <NavbarMenuItem key={index}>
          <Link
            to={item.path}
            style={{
              width: '100%'
              
            }}
            onClick={() => handleItemClick()}
          >
            {item.name}
          </Link>
        </NavbarMenuItem>
      ))}
     { isAuthenticated &&
        (<Link to = {"/"}>Logout</Link>)
     }
     {
       !isAuthenticated &&
       (<Link to = {"/login"}>Login</Link>)
     }
    </NavbarMenu>
  </Navbar>

  );
}
