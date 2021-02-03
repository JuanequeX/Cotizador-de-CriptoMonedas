import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div `
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 992px) {
    column-gap: 32px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Imagen = styled.img `
  max-width: 100%;
  margin-top: -20px;
`;

const Heading = styled.h1 `
  color: #FFF;
  font-family: 'Bebas Neue', cursive;
  font-size: 50px;
  font-weight: 700px;
  margin-bottom: 50px;
  margin-top: 50px;
  text-align: left;

  &::after {
    content: '';
    background-color: #66A3FE;
    display: block;
    height: 6px;
    width: 100px;
  }
`;

function App() {
  //States para las coins, las criptocoin y los resultados.
  const [coin, safeCoin] = useState('');
  const [criptocoin, safeCriptocoin] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptocoin = async () => {
      //Evita la primera ejecucion!!!
      if(coin === '' ) return;
      //Consulta a la api para obtener la cotizacion!!!
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptocoin}&tsyms=${coin}`;
      const resultado = await axios.get(url);
      //Mostrar el spinner aqui
      guardarCargando(true);
      //Ocultar el spinner despues del uso y mostrar el resultado
      setTimeout(() => {
        //Cambiar el estado de cargando
        guardarCargando(false);
        //Acceso dinamico a la respuesta de la API
        guardarResultado(resultado.data.DISPLAY[criptocoin][coin]);
      },3000)
    }
    cotizarCriptocoin();
  }, [coin, criptocoin])

  //Mostrar spinner o el resultado al crear una nueva consulta
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado = {resultado} />

  return (
   <Contenedor>
     <div>
       <Heading>
         Cotizador por juanequeX
       </Heading>
       <Imagen
        src={imagen}
        alt="Imagen criptomonedas"
       />
     </div>
     <div>
        <Heading>
         Cotiza al instante aquí
        </Heading>
        <Formulario
          safeCoin={safeCoin}
          safeCriptocoin={safeCriptocoin}
        />
          {componente}
      </div>
    </Contenedor>
  );
}

export default App;
