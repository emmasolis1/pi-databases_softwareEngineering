import React from 'react';
import user_icon from '../user_icon.svg'

const Header = () => {
  return (
    <div style={divStyle}>
      <h1>Ta' Bueno</h1>
      <img src={user_icon} className="User-Icon" alt="user icon" width="80" height="80" />
    </div>
  );
}

const divStyle = {
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '20pt',
  paddingRight: '20pt',
  backgroundColor: 'black',
}

export default Header;
