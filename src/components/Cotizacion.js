import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Div = styled.div`
  color: #FFF;
  font-family: 'Bebas Neue', cursive;
`;

const Info = styled.p`
  font-size: 20px;
  span {
    font-weight: bold;
  }
`;

const Precio = styled.p`
  font-size: 30px;
  span {
    font-weight: lighter;
  }
`;

const Cotizacion = ({resultado}) => {
  if(Object.keys(resultado).length === 0) return null;
  return (
    <Div>
      <Precio>El precio es: &nbsp; <span> {resultado.PRICE}</span></Precio>
      <Info>Precio mas alto del día: &nbsp; <span> {resultado.HIGHDAY}</span></Info>
      <Info>Precio mas bajo del día: &nbsp; <span> {resultado.LOWDAY}</span></Info>
      <Info>Variación últimas 24hrs: &nbsp; <span> {resultado.CHANGEPCT24HOUR}</span></Info>
      <Info>Última actualización: &nbsp; <span> {resultado.LASTUPDATE}</span></Info>
    </Div>
  );
}

Cotizacion.propTypes = {
  resultado: PropTypes.object.isRequired
}

export default Cotizacion;
