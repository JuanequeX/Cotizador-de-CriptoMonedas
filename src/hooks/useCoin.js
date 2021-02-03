import React, { useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label `
  color: #FFF;
  display: block;
  font-family: 'Bebas Neue', cursive;
  font-size: 39px;
  font-weight: bold;
  margin-top: 32px;
  text-transform: uppercase;
`;

const Select = styled.select `
  -webkit-appearance: none;
  border-radius: 10px;
  display: block;
  font-size: 18px;
  padding: 16px;
  width: 100%;
`;

const useCoin = (label, stateInicial, options) => {

  //State de mi hook
  const [state, actualizarState] = useState(stateInicial);

  const Seleccionar = () => (
    <>
      <Label>{label}&nbsp;</Label>
      <Select onChange={ e => actualizarState(e.target.value)} value={state}>
        <option value=''>&nbsp; -- Seleccione --</option>
        {options.map(option => (
        <option key={option.codigo} value={option.codigo}>&nbsp;{option.nombre}</option>
        ))};
      </Select>
    </>
  );
  //Retorno de mi state, interfaz y function que modificara el state
  return [state, Seleccionar, actualizarState];
}

export default useCoin;
