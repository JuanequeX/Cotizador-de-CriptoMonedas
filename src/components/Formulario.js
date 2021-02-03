import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Error from './Error';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import useCoin from '../hooks/useCoin';
import useCriptocoin from '../hooks/useCriptocoin';

const Boton = styled.input`
  background-color: #66a2fe;
  border-radius: 10px;
  color: #FFF;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  padding: 10px;
  transition: background-color .3s ease, font-size .3s ease;
  width: 100%;

  &:hover {
    background-color: #326Ac0;
    cursor: pointer;
    font-size: 22px;
  }
`;

const Formulario = ({safeCoin, safeCriptocoin}) => {
//State del listado de criptomonedas
//Este listadi sera llenado por la API
const [listacripto, guardarCriptocoins] = useState([]);

//State para la validacion
const [error, guardarError] = useState(false);

//Cadena con tipos de monedas
const COINS = [
  {codigo: 'USD', nombre: 'Dolar Americano'},
  {codigo: 'MXN', nombre: 'Peso Mexicano'},
  {codigo: 'EUR', nombre: 'Euro'},
  {codigo: 'GBP', nombre: 'Libra Esterlina'}
];

//uso de mi hook useCoin
const [coin, SelectCoins] = useCoin('Tipo Cambio', '', COINS);

//Utilizar useCriptoMoneda
const [criptocoin, SelectCripto] = useCriptocoin('Elije tu criptomoneda', '', listacripto );

//Ejecutar el llamado a la api
useEffect(() => {
  const consultarAPI = async () => {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    const resultado = await axios.get(url);
    guardarCriptocoins(resultado.data.Data);
  }
  consultarAPI();
},[]);

//Cuando el ususario hace submit entra aqui
const cotizarCoin = e =>{
  e.preventDefault();
  //Aqui hago la validacion si los dos campos estan llenos
  if(coin === '' || criptocoin === '') {
    guardarError(true);
    return;
  }
  //En dado caso de que si se llenen los campos pasaremos
  // los datos al componente principal
  guardarError(false);
  safeCoin(coin);
  safeCriptocoin(criptocoin);
}
  return (
    <form onSubmit={cotizarCoin}>
      {/* Ternario que verifica que los campos estan vacios */}
      {error ? <Error mensaje='Todos los campos son obligatorios'/> : null }
      <SelectCoins />
      <SelectCripto />
      <Boton type = 'submit' value = 'Calcular' />
    </form>
  );
}

Formulario.propTypes = {
  safeCoin: PropTypes.func.isRequired,
  safeCriptocoin: PropTypes.func.isRequired
}

export default Formulario;
