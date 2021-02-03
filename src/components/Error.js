import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

  //Estilos para el P dinamico que nos dara el error
  const MensajeError = styled.p`
    background-color: #b7322c;
    color: #FFF;
    font-family: 'Bebas Neue', cursive;
    font-size: 30px;
    font-weight: bold;
    padding: 16px;
    text-align: center;
    text-transform: uppercase;
  `;

const Error = ({mensaje}) => {
  return(
    <MensajeError>{mensaje}</MensajeError>
  );
}

Error.propTypes = {
  mensaje: PropTypes.string.isRequired
}

export default Error;
