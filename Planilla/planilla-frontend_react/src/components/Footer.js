import React from 'react'

const Footer = () => {
  return (
    <div style={divStyle}>
      <p>CI-0128 Proyecto Integrador de Ingenieria de Software y Bases de Datos</p>
      <p>&copy; Copyright: Ta' Bueno</p>
    </div>
  );
}

const divStyle = {
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  padding: '10pt',
  paddingBottom: '0pt',
  marginBottom: '0pt',
  backgroundColor: 'black',
}

export default Footer;