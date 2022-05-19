import React from 'react';


const SideNavigationBar = (props) => {
  return (
    <div className="sidenav" style={divStyle}>
      <a href="#section">About</a>
      <a href="#section">Services</a>
      <a href="#section">Clients</a>
      <a href="#section">Contact</a>
    </div >
 );
}


const divStyle = {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  alignContent: 'space-between',

  height: '350pt',
  width: '20%',
  backgroundColor: 'black',
  marginTop: '20pt',
  marginBottom: '20pt',
  
  zIndex: '1',
  top: '0',
  left: '0',
  transition: '.5s ease',
  overflowX: 'hidden',
}

export default SideNavigationBar;